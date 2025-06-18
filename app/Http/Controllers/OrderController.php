<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\File;
use App\Models\Activity;
use App\Models\Message;
use App\Models\Setting;
use App\Models\Payment;
use App\Models\User;
use App\Services\OrderService;
use App\Services\FileService;
use App\Services\MidtransService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Carbon\Carbon;

class OrderController extends Controller
{
    protected $orderService;
    protected $fileService;
    protected $midtransService;

    public function __construct(OrderService $orderService, FileService $fileService, MidtransService $midtransService)
    {
        $this->orderService = $orderService;
        $this->fileService = $fileService;
        $this->midtransService = $midtransService;
    }

    /**
     * Accept an order as a freelancer
     */
    public function acceptOrder(Request $request, $orderId)
    {
        $user = Auth::user();
        $order = Order::findOrFail($orderId);

        // Check if the user is the freelancer for this order
        if ($order->freelancer_id !== $user->id) {
            return redirect()->back()->with('error', 'You do not have permission to accept this order.');
        }

        // Check if the order is in the correct state
        if ($order->status !== 'pending') {
            return redirect()->back()->with('error', 'This order cannot be accepted in its current state.');
        }

        // Update order status - use consistent status format with underscore
        $order->status = 'in_progress';
        $order->save();

        // Create activity record
        Activity::create([
            'user_id' => $user->id,
            'type' => 'order_accepted',
            'description' => "Accepted order #{$order->order_number}",
            'subject_id' => $order->id,
            'subject_type' => Order::class,
        ]);

        // Send message to client
        Message::create([
            'sender_id' => $user->id,
            'recipient_id' => $order->client_id,
            'order_id' => $order->id,
            'message' => "I've accepted your order and will start working on it right away!",
            'is_read' => false,
        ]);

        return redirect()->back()->with('success', 'Order accepted successfully. You can now begin working on it.');
    }

    /**
     * Mark order as completed by freelancer (deliverable submission)
     */
    public function completeOrder(Request $request, $orderId)
    {
        $user = Auth::user();
        $order = Order::findOrFail($orderId);

        try {
            // Check if the user is the freelancer for this order
            if ($order->freelancer_id !== $user->id) {
                return response()->json([
                    'success' => false,
                    'message' => 'Anda tidak memiliki izin untuk menyelesaikan pesanan ini.'
                ], 403);
            }
            
            // Status check removed as requested
    
            // Validate request
            $validator = \Illuminate\Support\Facades\Validator::make($request->all(), [
                'files' => 'required|array',
                'files.*' => 'file|max:50000', // 50MB max
                'message' => 'required|string|min:10',
            ]);
    
            if ($validator->fails()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Validasi gagal: ' . implode(', ', $validator->errors()->all())
                ], 422);
            }
    
            // Update order status
            $order->status = 'delivered';
            // Removed delivered_at since it doesn't exist in the database
            $order->save();
    
            // Upload deliverable files
            $uploadedFiles = [];
            foreach ($request->file('files') as $file) {
                $uploadedFile = $this->fileService->uploadFile($file, $user, $order, 'deliverable', false, 'deliverables');
                $uploadedFiles[] = $uploadedFile;
            }
    
            // Create activity record
            Activity::create([
                'user_id' => $user->id,
                'type' => 'order_delivered',
                'description' => "Delivered order #{$order->order_number}",
                'subject_id' => $order->id,
                'subject_type' => Order::class,
            ]);
    
            // Send message to client
            Message::create([
                'sender_id' => $user->id,
                'recipient_id' => $order->client_id,
                'order_id' => $order->id,
                'message' => $request->input('message'),
                'is_read' => false,
            ]);
            
            // Get the client to send notifications
            $client = User::findOrFail($order->client_id);
            
            // Send notification to client that order is delivered and payment is needed
            $client->notify(new \App\Notifications\OrderDelivered($order, count($uploadedFiles)));
            
            // Notify client that files are delivered and payment is required
            $notificationService = app(\App\Services\NotificationService::class);
            $notificationService->notifyClientOrderDelivered($client, $order);
    
            return response()->json([
                'success' => true,
                'message' => 'Pesanan berhasil ditandai sebagai terkirim.',
                'uploadedFiles' => $uploadedFiles
            ]);
            
        } catch (\Exception $e) {
            \Illuminate\Support\Facades\Log::error('Error delivering order: ' . $e->getMessage(), [
                'order_id' => $orderId,
                'user_id' => $user->id,
                'trace' => $e->getTraceAsString()
            ]);
            
            // Check for common database errors
            if (strpos($e->getMessage(), 'SQLSTATE') !== false) {
                \Illuminate\Support\Facades\Log::error('Database error in order delivery: ' . $e->getMessage());
                
                // Give more user-friendly message instead of raw SQL error
                return response()->json([
                    'success' => false,
                    'message' => 'Terjadi kesalahan database. Tim kami akan memperbaikinya segera.'
                ], 500);
            }
            
            return response()->json([
                'success' => false,
                'message' => 'Terjadi kesalahan saat mengirim file: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Show payment page for client
     */
    public function showPaymentPage($orderId)
    {
        $user = Auth::user();
        $order = Order::with(['freelancer', 'service', 'files'])->findOrFail($orderId);

        // Check if the user is the client for this order
        if ($order->client_id !== $user->id) {
            return redirect()->back()->with('error', 'You do not have permission to pay for this order.');
        }

        // Check if the order is in a state where payment is applicable
        if ($order->status !== 'delivered') {
            return redirect()->back()->with('error', 'Payment is not available for this order at its current state.');
        }

        // Get files that are deliverables
        $deliverableFiles = $order->files()->where('status', 'deliverable')->get();
        
        // Get payment settings
        $paymentSettings = [
            'enableMidtrans' => Setting::get('enable_midtrans', true),
            'midtransClientKey' => Setting::get('midtrans_client_key', ''),
            'midtransSandbox' => Setting::get('midtrans_sandbox', true),
            'availableMethods' => Setting::get('payment_methods', [
                'bank_transfer' => true,
                'credit_card' => true,
                'e_wallet' => true,
                'qris' => true,
                'paylater' => false,
                'retail' => true,
            ]),
        ];

        return Inertia::render('Client/Payment', [
            'order' => $order,
            'deliverableFiles' => $deliverableFiles,
            'paymentSettings' => $paymentSettings,
            'user' => $user,
        ]);
    }
    
    /**
     * Process payment for an order
     */
    public function processPayment(Request $request, $orderId)
    {
        $user = Auth::user();
        $order = Order::findOrFail($orderId);

        // Check if the user is the client for this order
        if ($order->client_id !== $user->id) {
            return response()->json([
                'success' => false, 
                'message' => 'You do not have permission to pay for this order.'
            ], 403);
        }

        // Check if the order is in a state where payment is applicable
        if ($order->status !== 'delivered') {
            return response()->json([
                'success' => false, 
                'message' => 'Payment is not available for this order at its current state.'
            ], 400);
        }

        // Prepare customer details for Midtrans
        $customerDetails = [
            'first_name' => explode(' ', $user->name)[0],
            'last_name' => count(explode(' ', $user->name)) > 1 ? explode(' ', $user->name)[1] : '',
            'email' => $user->email,
            'phone' => $user->profile->phone ?? '',
            'billing_address' => [
                'address' => $user->profile->address ?? '',
                'city' => $user->profile->city ?? '',
                'postal_code' => $user->profile->postal_code ?? '',
                'country_code' => 'IDN',
            ],
        ];

        // Create payment record
        $payment = $this->orderService->createPayment($order, [
            'payment_method' => 'midtrans',
            'payment_details' => [
                'customer' => $customerDetails,
            ],
        ]);

        // Generate Midtrans snap token
        $result = $this->midtransService->createSnapToken($order, $customerDetails);

        if (!$result['success']) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to generate payment token: ' . ($result['error'] ?? 'Unknown error'),
            ], 500);
        }

        return response()->json([
            'success' => true,
            'token' => $result['token'],
            'redirect_url' => $result['redirect_url'],
            'payment_id' => $payment->id,
        ]);
    }
    
    /**
     * Check payment status
     */
    public function checkPaymentStatus($paymentId)
    {
        $user = Auth::user();
        $payment = Payment::with('order')->findOrFail($paymentId);

        // Check if the payment belongs to the user
        if ($payment->order->client_id !== $user->id && !$user->isAdmin()) {
            return response()->json([
                'success' => false,
                'message' => 'You do not have permission to check this payment.',
            ], 403);
        }

        // Get payment status
        $order = $payment->order;
        
        $isCompleted = $payment->status === 'completed';
        
        if ($isCompleted) {
            // If payment is completed, make deliverable files available
            $this->orderService->activateDeliverableFiles($order);
        }

        return response()->json([
            'success' => true,
            'status' => $payment->status,
            'order_status' => $order->status,
            'can_download' => $isCompleted,
            'payment' => $payment,
        ]);
    }

    /**
     * Simple check payment status
     */
    public function simpleCheckPaymentStatus($paymentId)
    {
        \Illuminate\Support\Facades\Log::info('Checking payment status', [
            'payment_id' => $paymentId,
            'user' => Auth::id(),
            'timestamp' => now()->toDateTimeString()
        ]);
        
        $user = Auth::user();
        $payment = \App\Models\Payment::with('order')->findOrFail($paymentId);

        // Check if the payment belongs to the user
        if ($payment->order->client_id !== $user->id && !$user->isAdmin()) {
            return response()->json([
                'success' => false,
                'message' => 'You do not have permission to check this payment.',
            ], 403);
        }

        // Get Midtrans service
        $midtransService = app(\App\Services\MidtransService::class);
        
        // Check with Midtrans for latest status
        if ($payment->transaction_id) {
            // If we have a transaction_id, check using that
            $midtransStatus = $midtransService->checkTransactionStatus($payment->transaction_id);
        } else {
            // If no transaction_id yet, try using the order number
            $midtransStatus = $midtransService->checkTransactionStatus($payment->order->order_number);
            
            // If successful and transaction_id was found, save it to the payment record
            if ($midtransStatus && $midtransStatus['success'] && isset($midtransStatus['transaction_id'])) {
                $payment->transaction_id = $midtransStatus['transaction_id'];
                $payment->save();
            }
        }                // Update payment status if needed
        if ($midtransStatus && $midtransStatus['success']) {
                // Map Midtrans status to our status
                $newStatus = $payment->status;
                if (in_array($midtransStatus['status'], ['settlement', 'capture', 'success'])) {
                    $newStatus = 'completed';
                } else if ($midtransStatus['status'] === 'pending') {
                    $newStatus = 'pending';
                } else if (in_array($midtransStatus['status'], ['deny', 'cancel', 'expire', 'failed'])) {
                    $newStatus = 'failed';
                }
                
                if ($payment->status !== $newStatus) {
                    $payment->status = $newStatus;
                    $payment->payment_details = array_merge($payment->payment_details ?? [], [
                        'midtrans' => $midtransStatus,
                        'last_checked' => now()->toDateTimeString()
                    ]);
                    $payment->save();
                    
                    \Illuminate\Support\Facades\Log::info('Payment status updated', [
                        'payment_id' => $payment->id,
                        'old_status' => $payment->getOriginal('status'),
                        'new_status' => $newStatus,
                        'midtrans_status' => $midtransStatus['status'] ?? null
                    ]);
                    
                    // If payment is completed, update order status and activate files
                    if ($payment->status === 'completed') {
                        $payment->completed_at = now();
                        $payment->save();
                        
                        $order = $payment->order;
                        $order->status = 'completed';
                        $order->payment_completed_at = now();
                        $order->save();
                        
                        // Activate deliverable files
                        $orderService = app(\App\Services\OrderService::class);
                        $orderService->activateDeliverableFiles($order);
                        
                        // Record activity
                        \App\Models\Activity::create([
                            'user_id' => $user->id,
                            'type' => 'payment_completed',
                            'description' => "Payment completed for order #{$order->order_number}",
                            'subject_id' => $payment->id,
                            'subject_type' => get_class($payment),
                        ]);
                    }
                }
        }
        
        $order = $payment->order;
        $isCompleted = $payment->status === 'completed';
        
        return response()->json([
            'success' => true,
            'status' => $payment->status,
            'order_status' => $order->status,
            'can_download' => $isCompleted || $order->isPaymentCompleted(),
            'payment' => $payment,
        ]);
    }

    /**
     * Admin confirmation of payment
     */
    public function adminConfirmPayment(Request $request, $paymentId)
    {
        $user = Auth::user();
        
        // Check if user is admin
        if (!$user->isAdmin()) {
            return redirect()->back()->with('error', 'You do not have permission to confirm payments.');
        }
        
        $payment = Payment::with('order')->findOrFail($paymentId);
        
        // Process the payment as successful
        $this->orderService->processSuccessfulPayment($payment, [
            'transaction_id' => 'ADMIN-'.time(),
            'payment_type' => 'admin_confirmation',
            'gross_amount' => $payment->amount,
            'status' => 'success',
        ]);
        
        // Create activity
        Activity::create([
            'user_id' => $user->id,
            'type' => 'payment_admin_confirmed',
            'description' => "Admin confirmed payment #{$payment->payment_id} for order #{$payment->order->order_number}",
            'subject_id' => $payment->id,
            'subject_type' => Payment::class,
        ]);
        
        return redirect()->back()->with('success', 'Payment confirmed successfully.');
    }
    
    /**
     * Cancel an order by freelancer
     * 
     * @param Request $request
     * @param int $orderId
     * @return \Illuminate\Http\RedirectResponse
     */
    public function cancelOrder(Request $request, $orderId)
    {
        $user = Auth::user();
        $order = Order::findOrFail($orderId);

        // Check if the user is the freelancer for this order
        if ($order->freelancer_id !== $user->id) {
            return redirect()->back()->with('error', 'You do not have permission to cancel this order.');
        }

        // Check if the order is in a state where cancellation is possible
        if (!in_array($order->status, ['pending', 'in_progress'])) {
            return redirect()->back()->with('error', 'This order cannot be cancelled in its current state.');
        }

        // Validate request
        $validated = $request->validate([
            'cancellation_reason' => 'required|string|min:10',
        ]);

        // Update order status
        $order->status = 'cancelled';
        $order->cancellation_reason = $validated['cancellation_reason'];
        $order->cancelled_at = now();
        $order->cancelled_by = $user->id;
        $order->save();

        // Create activity record
        Activity::create([
            'user_id' => $user->id,
            'type' => 'order_cancelled',
            'description' => "Cancelled order #{$order->order_number}",
            'subject_id' => $order->id,
            'subject_type' => Order::class,
        ]);

        // Send message to client about cancellation
        Message::create([
            'sender_id' => $user->id,
            'recipient_id' => $order->client_id,
            'order_id' => $order->id,
            'message' => "I have cancelled this order for the following reason: " . $validated['cancellation_reason'],
            'is_read' => false,
        ]);
        
        // Get the client to send notifications
        $client = User::findOrFail($order->client_id);
        
        // Notify client that order has been cancelled
        $notificationService = app(\App\Services\NotificationService::class);
        $notificationService->notifyClientOrderCancelled($client, $order);

        return redirect()->back()->with('success', 'Order cancelled successfully.');
    }

    /**
     * Request revision from client
     * 
     * @param Request $request
     * @param int $orderId
     * @return \Illuminate\Http\RedirectResponse
     */
    public function requestRevision(Request $request, $orderId)
    {
        $user = Auth::user();
        $order = Order::findOrFail($orderId);

        // Check if the user is the freelancer for this order
        if ($order->freelancer_id !== $user->id) {
            return redirect()->back()->with('error', 'You do not have permission to request revisions for this order.');
        }

        // Check if the order is in a state where revision request is possible
        if ($order->status !== 'in_progress' && $order->status !== 'in-progress') {
            return redirect()->back()->with('error', 'You can only request revisions for orders that are in progress.');
        }

        // Validate request
        $validated = $request->validate([
            'revision_request' => 'required|string|min:10',
        ]);

        // Send message to client about revision request
        Message::create([
            'sender_id' => $user->id,
            'recipient_id' => $order->client_id,
            'order_id' => $order->id,
            'message' => "I need additional information or clarification: " . $validated['revision_request'],
            'is_read' => false,
            'message_type' => 'revision_request',
        ]);
        
        // Create activity record
        Activity::create([
            'user_id' => $user->id,
            'type' => 'revision_requested',
            'description' => "Requested clarification on order #{$order->order_number}",
            'subject_id' => $order->id,
            'subject_type' => Order::class,
        ]);
        
        // Get the client to send notifications
        $client = User::findOrFail($order->client_id);
        
        // Notify client that a revision has been requested
        $notificationService = app(\App\Services\NotificationService::class);
        $notificationService->notifyClientRevisionRequested($client, $order);

        return redirect()->back()->with('success', 'Revision request sent to client successfully.');
    }

    /**
     * Cancel an order by client.
     *
     */
    public function clientCancelOrder(Request $request, $orderId)
    {
        $user = Auth::user();
        $order = Order::findOrFail($orderId);

        // Pastikan order milik klien yang sedang login
        if ($order->client_id !== $user->id) {
            return redirect()->back()->with('error', 'Anda tidak memiliki izin untuk membatalkan pesanan ini.');
        }

        // Validasi status order untuk pembatalan
        if (!in_array($order->status, ['pending', 'pending_payment', 'in_progress', 'delivered', 'revision'])) {
            return redirect()->back()->with('error', 'Pesanan tidak dapat dibatalkan dalam status saat ini.');
        }

        $validated = $request->validate([
            'cancellation_reason' => 'required|string|min:10',
        ]);

        // Panggil OrderService untuk logika pembatalan terpusat
        try {
            $this->orderService->cancelOrder($order, $validated['cancellation_reason'], $user->id);
        } catch (\Exception $e) {
            Log::error('Error cancelling order by client: ' . $e->getMessage(), ['order_id' => $order->id, 'user_id' => $user->id]);
            return redirect()->back()->with('error', 'Terjadi kesalahan saat membatalkan pesanan.');
        }

        // Kirim pesan otomatis kepada freelancer
        Message::create([
            'sender_id' => $user->id,
            'recipient_id' => $order->freelancer_id,
            'order_id' => $order->id,
            'message' => "Pesanan #{$order->order_number} telah dibatalkan oleh klien. Alasan: " . $validated['cancellation_reason'],
            'is_read' => false,
        ]);

        // Catat aktivitas
        Activity::create([
            'user_id' => $user->id,
            'type' => 'order_cancelled_by_client',
            'description' => "Client cancelled order #{$order->order_number}",
            'subject_id' => $order->id,
            'subject_type' => Order::class,
        ]);

        return redirect()->back()->with('success', 'Pesanan berhasil dibatalkan dan freelancer telah diberi tahu.');
    }

    /**
     * Show a simple invoice page for order
     */
    public function showSimpleInvoice($orderId)
    {
        $user = Auth::user();
        $order = Order::with(['freelancer', 'service', 'files'])->findOrFail($orderId);

        // Check if the user is the client for this order
        if ($order->client_id !== $user->id) {
            return redirect()->route('client.orders.index')->with('error', 'You do not have permission to view this invoice.');
        }

        // Check if the order is in a state where payment is applicable
        if ($order->status !== 'delivered') {
            return redirect()->route('client.orders.show', $order->id)->with('error', 'Payment is not available for this order at its current state.');
        }
        
        // Get files that are deliverables
        $deliverableFiles = $order->files()->where('status', 'deliverable')->get();
        
        // Get or create payment
        $pendingPayment = $order->payments()->where('status', 'pending')->latest()->first();
        
        if (!$pendingPayment) {
            // Prepare customer details
            $customerDetails = [
                'first_name' => explode(' ', $user->name)[0],
                'last_name' => count(explode(' ', $user->name)) > 1 ? explode(' ', $user->name)[1] : '',
                'email' => $user->email,
                'phone' => $user->profile->phone ?? '',
            ];
            
            // Create payment through service
            $orderService = app(\App\Services\OrderService::class);
            $payment = $orderService->createPayment($order, [
                'payment_method' => 'midtrans',
                'payment_details' => [
                    'customer' => $customerDetails,
                ],
            ]);
        } else {
            $payment = $pendingPayment;
        }
        
        // Generate snap token
        $midtransService = app(\App\Services\MidtransService::class);
        $customerDetails = [
            'first_name' => explode(' ', $user->name)[0],
            'last_name' => count(explode(' ', $user->name)) > 1 ? explode(' ', $user->name)[1] : '',
            'email' => $user->email,
            'phone' => $user->profile->phone ?? '',
        ];
        
        // Define the return URL for redirect-based payment
        $returnUrl = route('client.order.simple-invoice', $orderId);
        
        $midtransResult = $midtransService->createSnapToken($order, $customerDetails, $returnUrl);
        
        if (!$midtransResult['success']) {
            \Illuminate\Support\Facades\Log::error('Failed to generate Midtrans token', [
                'order_id' => $order->id,
                'error' => $midtransResult['error'] ?? 'Unknown error',
                'user_id' => $user->id
            ]);
            
            return redirect()->route('client.orders.show', $order->id)
                ->with('error', 'Failed to process payment. Please try again later.');
        }
        
        // Get payment settings
        $paymentSettings = [
            'enableMidtrans' => \App\Models\Setting::get('enable_midtrans', true),
            'midtransClientKey' => \App\Models\Setting::get('midtrans_client_key', ''),
            'midtransSandbox' => \App\Models\Setting::get('midtrans_sandbox', true),
        ];

        return Inertia::render('Client/Invoice', [
            'order' => $order,
            'payment' => $payment,
            'deliverableFiles' => $deliverableFiles,
            'midtransToken' => $midtransResult['token'],
            'midtransUrl' => $midtransResult['redirect_url'],
            'paymentSettings' => $paymentSettings,
            'user' => $user,
        ]);
    }
}
