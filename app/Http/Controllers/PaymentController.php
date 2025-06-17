<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\Payment;
use App\Models\Setting;
use App\Services\MidtransService;
use App\Services\OrderService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class PaymentController extends Controller
{
    protected $midtransService;
    protected $orderService;

    public function __construct(MidtransService $midtransService, OrderService $orderService)
    {
        $this->midtransService = $midtransService;
        $this->orderService = $orderService;
    }

    /**
     * Show payment page
     */
    public function showPayment($orderId)
    {
        $user = Auth::user();
        $order = Order::findOrFail($orderId);

        // Check if the order belongs to the user
        if ($order->client_id !== $user->id) {
            return redirect()->route('client.dashboard')
                ->with('error', 'You do not have permission to pay for this order.');
        }

        // Check if the order is already paid
        if ($order->status !== 'pending_payment') {
            return redirect()->route('client.orders.show', $order->id)
                ->with('error', 'This order has already been paid or is no longer in pending payment status.');
        }

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
            'order' => $order->load('service', 'freelancer'),
            'paymentSettings' => $paymentSettings,
            'user' => $user,
        ]);
    }

    /**
     * Generate Midtrans snap token
     */
    public function generateSnapToken(Request $request, $orderId)
    {
        $user = Auth::user();
        $order = Order::findOrFail($orderId);

        // Check if the order belongs to the user
        if ($order->client_id !== $user->id) {
            return response()->json([
                'success' => false,
                'message' => 'You do not have permission to pay for this order.',
            ], 403);
        }

        // Check if the order is already paid
        if ($order->status !== 'pending_payment') {
            return response()->json([
                'success' => false,
                'message' => 'This order has already been paid or is no longer in pending payment status.',
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
     * Handle Midtrans notification callback
     */
    public function handleMidtransNotification(Request $request)
    {
        // Log the raw notification for debugging purposes
        \Illuminate\Support\Facades\Log::info('Midtrans notification received', [
            'payload' => $request->all(),
            'raw' => $request->getContent()
        ]);

        $notificationJson = $request->getContent();
        $notification = $this->midtransService->handleNotification($notificationJson);

        if (!$notification['success']) {
            \Illuminate\Support\Facades\Log::error('Failed to process Midtrans notification', [
                'error' => $notification['error'] ?? 'Unknown error'
            ]);
            return response()->json(['status' => 'error', 'message' => $notification['error'] ?? 'Failed to process notification'], 400);
        }

        $orderId = $notification['order_id'];
        $order = Order::where('order_number', $orderId)->first();
        
        if (!$order) {
            \Illuminate\Support\Facades\Log::error('Order not found in notification handler', [
                'order_number' => $orderId
            ]);
            return response()->json(['status' => 'error', 'message' => 'Order not found'], 404);
        }

        $payment = Payment::where('order_id', $order->id)
            ->orderBy('created_at', 'desc')
            ->first();
        
        if (!$payment) {
            \Illuminate\Support\Facades\Log::error('Payment not found in notification handler', [
                'order_id' => $order->id,
                'order_number' => $orderId
            ]);
            return response()->json(['status' => 'error', 'message' => 'Payment not found'], 404);
        }

        // Process payment based on status
        if ($notification['status'] === 'success') {
            // Process successful payment
            $this->orderService->processSuccessfulPayment($payment, [
                'transaction_id' => $notification['transaction_id'],
                'payment_type' => $notification['payment_type'],
                'gross_amount' => $notification['gross_amount'],
                'status' => 'success',
                'receipt_url' => null, // Add receipt URL if available from notification
                'notification_data' => $notification['original_notification'],
            ]);
            
            // Get notification service
            $notificationService = app(\App\Services\NotificationService::class);
            
            // Notify admin about the payment
            $notificationService->notifyAdminsPayment($payment);
            
            // Notify freelancer about payment received
            $notificationService->notifyFreelancerPaymentReceived(
                $order->freelancer, 
                $order, 
                $payment
            );
            
            // Activate files for download
            $this->orderService->activateDeliverableFiles($order);
            
        } elseif ($notification['status'] === 'pending') {
            // Update payment to pending
            $payment->status = 'pending';
            $payment->payment_details = array_merge($payment->payment_details ?? [], [
                'transaction_id' => $notification['transaction_id'],
                'payment_type' => $notification['payment_type'],
                'status' => 'pending',
                'notification_data' => $notification['original_notification'],
            ]);
            $payment->save();
            
            // Log the pending payment
            \Illuminate\Support\Facades\Log::info('Payment marked as pending', [
                'payment_id' => $payment->id,
                'order_id' => $order->id,
                'payment_type' => $notification['payment_type']
            ]);
            
        } elseif (in_array($notification['status'], ['failed', 'expire', 'cancel', 'deny'])) {
            // Update payment to failed
            $payment->status = 'failed';
            $payment->payment_details = array_merge($payment->payment_details ?? [], [
                'transaction_id' => $notification['transaction_id'],
                'payment_type' => $notification['payment_type'],
                'status' => 'failed',
                'failure_reason' => $notification['status'],
                'notification_data' => $notification['original_notification'],
            ]);
            $payment->save();
            
            // Log the failed payment
            \Illuminate\Support\Facades\Log::error('Payment failed', [
                'payment_id' => $payment->id,
                'order_id' => $order->id,
                'status' => $notification['status'],
                'payment_type' => $notification['payment_type']
            ]);
        }

        return response()->json(['status' => 'success']);
    }

    /**
     * Handle Midtrans callback
     */
    public function handleMidtransCallback(Request $request)
    {
        \Illuminate\Support\Facades\Log::info('Midtrans callback received', ['payload' => $request->all()]);
        
        $response = $this->midtransService->handleNotification($request->getContent());
        
        if (!$response['success']) {
            \Illuminate\Support\Facades\Log::error('Failed to handle Midtrans notification', ['error' => $response['error']]);
            return response('Failed to handle notification', 500);
        }
        
        // Find order by order number
        $order = Order::where('order_number', $response['order_id'])->first();
        
        if (!$order) {
            \Illuminate\Support\Facades\Log::error('Order not found', ['order_id' => $response['order_id']]);
            return response('Order not found', 404);
        }
        
        // Find payment
        $payment = Payment::where('order_id', $order->id)
            ->orderBy('created_at', 'desc')
            ->first();
        
        if (!$payment) {
            \Illuminate\Support\Facades\Log::error('Payment not found', ['order_id' => $order->id]);
            return response('Payment not found', 404);
        }
        
        // Update payment status based on Midtrans response
        if ($response['status'] === 'success') {
            // Process successful payment
            $this->orderService->processSuccessfulPayment($payment, [
                'transaction_id' => $response['transaction_id'],
                'payment_type' => $response['payment_type'],
                'gross_amount' => $response['gross_amount'],
                'status' => 'success',
            ]);
            
            // Notify admin and freelancer
            $notificationService = app(\App\Services\NotificationService::class);
            $notificationService->notifyAdminsPayment($payment);
            $notificationService->notifyFreelancerPaymentReceived(
                $order->freelancer, 
                $order, 
                $payment
            );
        } else if ($response['status'] === 'pending') {
            // Update payment to pending
            $payment->status = 'pending';
            $payment->payment_details = array_merge($payment->payment_details ?? [], [
                'transaction_id' => $response['transaction_id'],
                'payment_type' => $response['payment_type'],
                'status' => 'pending',
            ]);
            $payment->save();
        } else {
            // Payment failed or was denied
            $payment->status = 'failed';
            $payment->payment_details = array_merge($payment->payment_details ?? [], [
                'transaction_id' => $response['transaction_id'] ?? null,
                'payment_type' => $response['payment_type'] ?? null,
                'status' => 'failed',
                'failure_reason' => $response['original_notification']->status_message ?? 'Payment failed',
            ]);
            $payment->save();
        }
        
        return response('OK', 200);
    }
    
    /**
     * Admin page to view and manage all payments
     */
    public function adminPayments()
    {
        $user = Auth::user();
        
        // Check if user is admin
        if (!$user->isAdmin()) {
            return redirect()->route('dashboard')->with('error', 'Unauthorized access');
        }
        
        // Get all payments with pagination
        $pendingPayments = Payment::with(['order', 'order.client', 'order.freelancer'])
            ->where('status', 'pending')
            ->orderBy('created_at', 'desc')
            ->paginate(10, ['*'], 'pending_page');
            
        $completedPayments = Payment::with(['order', 'order.client', 'order.freelancer'])
            ->whereIn('status', ['completed', 'failed'])
            ->orderBy('created_at', 'desc')
            ->paginate(10, ['*'], 'completed_page');
        
        return Inertia::render('Admin/Payments', [
            'pendingPayments' => $pendingPayments,
            'completedPayments' => $completedPayments,
        ]);
    }
    
    /**
     * Check payment status manually from Midtrans API
     */
    public function checkMidtransStatus($paymentId)
    {
        $payment = Payment::findOrFail($paymentId);
        $order = $payment->order;
        
        // Check transaction status from Midtrans API
        $response = $this->midtransService->checkTransactionStatus($order->order_number);
        
        if (!$response['success']) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to check payment status: ' . ($response['error_message'] ?? 'Unknown error'),
            ], 500);
        }
        
        // If payment is successful but our record shows it's still pending
        if ($response['status'] === 'success' && $payment->status !== 'completed') {
            // Process successful payment
            $this->orderService->processSuccessfulPayment($payment, [
                'transaction_id' => $response['transaction_id'],
                'payment_type' => $response['payment_type'],
                'status' => 'success',
                'response' => $response['response'],
            ]);
            
            // Notify admin and freelancer
            $notificationService = app(\App\Services\NotificationService::class);
            $notificationService->notifyAdminsPayment($payment);
            $notificationService->notifyFreelancerPaymentReceived(
                $order->freelancer, 
                $order, 
                $payment
            );
            
            return response()->json([
                'success' => true,
                'status' => 'completed',
                'message' => 'Payment verification successful! Payment has been marked as completed.',
            ]);
        }
        
        // Return the current status
        return response()->json([
            'success' => true,
            'status' => $payment->status,
            'midtrans_status' => $response['status'],
            'payment_type' => $response['payment_type'] ?? null,
            'message' => 'Payment status: ' . ucfirst($payment->status),
        ]);
    }
    
    /**
     * Show invoice page for client payment
     */
    public function showInvoicePage($orderId)
    {
        $user = Auth::user();
        $order = Order::with(['freelancer', 'service', 'files'])->findOrFail($orderId);

        // Check if the user is the client for this order
        if ($order->client_id !== $user->id) {
            return redirect()->route('client.orders.index')->with('error', 'Anda tidak memiliki akses untuk melihat invoice ini.');
        }

        // Check if the order is in a state where payment is applicable
        if ($order->status !== 'delivered') {
            return redirect()->route('client.orders.show', $order->id)->with('error', 'Order ini belum siap untuk pembayaran.');
        }

        // Check if there is already a completed payment
        if ($order->isPaymentCompleted()) {
            return redirect()->route('client.orders.show', $order->id)->with('info', 'Order ini sudah dibayar.');
        }

        // Get any existing pending payment
        $pendingPayment = $order->payments()->where('status', 'pending')->latest()->first();
        
        // Get files that are deliverables
        $deliverableFiles = $order->files()->where('status', 'deliverable')->get();
        
        // Prepare customer details for Midtrans
        $customerDetails = [
            'first_name' => explode(' ', $user->name)[0],
            'last_name' => count(explode(' ', $user->name)) > 1 ? explode(' ', $user->name)[1] : '',
            'email' => $user->email,
            'phone' => $user->profile->phone ?? '',
        ];
        
        // Generate new payment if none exists or re-use existing one
        if (!$pendingPayment) {
            $payment = $this->orderService->createPayment($order, [
                'payment_method' => 'midtrans',
                'payment_details' => [
                    'customer' => $customerDetails,
                ],
            ]);
        } else {
            $payment = $pendingPayment;
        }
        
        // Generate Midtrans snap token
        $midtransResult = $this->midtransService->createSnapToken($order, $customerDetails);

        if (!$midtransResult['success']) {
            \Illuminate\Support\Facades\Log::error('Failed to generate Midtrans token', [
                'order_id' => $order->id,
                'error' => $midtransResult['error'] ?? 'Unknown error',
                'user_id' => $user->id
            ]);
            
            return redirect()->route('client.orders.show', $order->id)
                ->with('error', 'Gagal memproses pembayaran. Silakan coba lagi nanti.');
        }
        
        return Inertia::render('Client/Invoice', [
            'order' => $order,
            'payment' => $payment,
            'deliverableFiles' => $deliverableFiles,
            'midtransToken' => $midtransResult['token'],
            'midtransUrl' => $midtransResult['redirect_url'],
            'user' => $user,
            'paymentSettings' => [
                'enableMidtrans' => true,
                'midtransClientKey' => Setting::get('midtrans_client_key', ''),
                'midtransSandbox' => Setting::get('midtrans_sandbox', true),
            ]
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
                'message' => 'Anda tidak memiliki akses untuk memeriksa status pembayaran ini.',
            ], 403);
        }

        // Check with Midtrans for latest status if transaction_id exists
        if ($payment->transaction_id) {
            $midtransStatus = $this->midtransService->checkTransactionStatus($payment->transaction_id);
            
            // Update payment status if needed
            if ($midtransStatus && $midtransStatus['success']) {
                // Map Midtrans status to our status
                $newStatus = $payment->status;
                if (in_array($midtransStatus['status'], ['settlement', 'capture'])) {
                    $newStatus = 'completed';
                } else if ($midtransStatus['status'] === 'pending') {
                    $newStatus = 'pending';
                } else if (in_array($midtransStatus['status'], ['deny', 'cancel', 'expire', 'failure'])) {
                    $newStatus = 'failed';
                }
                
                if ($payment->status !== $newStatus) {
                    $payment->status = $newStatus;
                    $payment->payment_details = array_merge($payment->payment_details ?? [], [
                        'midtrans' => $midtransStatus
                    ]);
                    $payment->save();
                    
                    // If payment is completed, update order status and activate files
                    if ($payment->status === 'completed') {
                        $payment->completed_at = now();
                        $payment->save();
                        
                        $order = $payment->order;
                        $order->status = 'completed';
                        $order->payment_completed_at = now();
                        $order->save();
                        
                        // Activate deliverable files
                        $this->orderService->activateDeliverableFiles($order);
                        
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
}
