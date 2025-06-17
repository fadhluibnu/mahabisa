<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\Payment;
use App\Models\Setting;
use App\Models\User;
use App\Models\Wallet;
use App\Services\MidtransService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class PaymentGatewayController extends Controller
{
    protected $midtransService;

    public function __construct(MidtransService $midtransService)
    {
        $this->midtransService = $midtransService;
    }

    /**
     * Show the payment page for an order
     *
     * @param int $orderId
     * @return \Inertia\Response
     */
    public function showPaymentPage($orderId)
    {
        $user = Auth::user();
        $order = Order::with(['freelancer', 'service', 'files'])
            ->where('client_id', $user->id)
            ->findOrFail($orderId);

        // Check if payment is already completed
        if ($order->payment_completed_at) {
            return redirect()->route('client.orders.show', $order->id)
                ->with('info', 'Pembayaran untuk pesanan ini telah selesai.');
        }

        // Check if order status is appropriate for payment
        if ($order->status !== 'delivered') {
            return redirect()->route('client.orders.show', $order->id)
                ->with('error', 'Pesanan harus berstatus terkirim untuk melakukan pembayaran.');
        }

        // Get payment methods from settings
        $paymentMethods = [
            'credit_card' => Setting::get('payment_credit_card', true),
            'bank_transfer' => Setting::get('payment_bank_transfer', true),
            'gopay' => Setting::get('payment_gopay', true),
            'shopeepay' => Setting::get('payment_shopeepay', true),
        ];

        return Inertia::render('Client/Payment', [
            'order' => $order,
            'paymentMethods' => $paymentMethods,
        ]);
    }

    /**
     * Process payment request
     *
     * @param Request $request
     * @param int $orderId
     * @return \Illuminate\Http\JsonResponse
     */
    public function processPayment(Request $request, $orderId)
    {
        $user = Auth::user();
        $order = Order::where('client_id', $user->id)->findOrFail($orderId);

        // Check if payment is already completed
        if ($order->payment_completed_at) {
            return response()->json([
                'success' => false, 
                'message' => 'Pembayaran untuk pesanan ini telah selesai.'
            ]);
        }

        try {
            // Create payment record
            $payment = Payment::create([
                'order_id' => $order->id,
                'user_id' => $user->id,
                'amount' => $order->total_amount,
                'payment_method' => $request->input('payment_method', 'midtrans'),
                'status' => 'pending',
                'transaction_id' => 'TRX-' . time() . rand(10000, 99999),
                'payment_details' => json_encode([
                    'payment_type' => $request->input('payment_type'),
                    'customer_details' => [
                        'name' => $user->name,
                        'email' => $user->email,
                        'phone' => $user->phone,
                    ],
                ]),
            ]);

            // Get Midtrans snap token
            $snapToken = $this->midtransService->createSnapToken(
                $order, 
                [
                    'first_name' => $user->name,
                    'email' => $user->email,
                    'phone' => $user->phone,
                ]
            );

            if (!$snapToken['success']) {
                return response()->json([
                    'success' => false,
                    'message' => 'Failed to generate payment token'
                ]);
            }

            // Update payment with token
            $payment->update([
                'token' => $snapToken['token'],
            ]);

            return response()->json([
                'success' => true,
                'token' => $snapToken['token'],
                'payment_id' => $payment->id,
            ]);

        } catch (\Exception $e) {
            Log::error('Payment processing error: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Terjadi kesalahan saat memproses pembayaran'
            ]);
        }
    }

    /**
     * Handle payment notification from Midtrans
     *
     * @param Request $request
     * @return \Illuminate\Http\Response
     */
    public function notificationHandler(Request $request)
    {
        try {
            $notification = $this->midtransService->handleNotification($request);
            
            if (!$notification) {
                return response('Invalid notification', 400);
            }

            // Get the order and payment
            $payment = Payment::where('transaction_id', $notification['order_id'])->first();

            if (!$payment) {
                Log::error('Payment not found for transaction: ' . $notification['order_id']);
                return response('Payment not found', 404);
            }

            $order = $payment->order;

            // Process based on transaction status
            switch ($notification['transaction_status']) {
                case 'capture':
                case 'settlement':
                    // Handle successful payment
                    $this->handleSuccessfulPayment($payment, $order);
                    break;
                    
                case 'pending':
                    // Update status to pending
                    $payment->update([
                        'status' => 'pending',
                        'payment_details' => json_encode($notification),
                    ]);
                    break;
                    
                case 'deny':
                case 'cancel':
                case 'expire':
                    // Update status to failed
                    $payment->update([
                        'status' => 'failed',
                        'payment_details' => json_encode($notification),
                    ]);
                    break;
            }

            return response('OK', 200);
            
        } catch (\Exception $e) {
            Log::error('Notification handler error: ' . $e->getMessage());
            return response('Error processing notification', 500);
        }
    }

    /**
     * Check payment status
     *
     * @param int $paymentId
     * @return \Illuminate\Http\JsonResponse
     */
    public function checkPaymentStatus($paymentId)
    {
        $user = Auth::user();
        $payment = Payment::with('order')->findOrFail($paymentId);
        
        // Check if the payment belongs to the user
        if ($payment->order->client_id !== $user->id && !$user->isAdmin()) {
            return response()->json([
                'success' => false, 
                'message' => 'Unauthorized'
            ], 403);
        }
        
        // Check payment status on Midtrans if still pending
        if ($payment->status === 'pending' && $payment->token) {
            $status = $this->midtransService->getStatus($payment->transaction_id);
            
            if ($status['success'] && isset($status['data'])) {
                if ($status['data']['transaction_status'] === 'settlement' || 
                    $status['data']['transaction_status'] === 'capture') {
                    
                    // Update payment status
                    $this->handleSuccessfulPayment($payment, $payment->order);
                    $payment->refresh();
                }
            }
        }
        
        return response()->json([
            'success' => true,
            'payment' => [
                'id' => $payment->id,
                'status' => $payment->status,
                'transaction_id' => $payment->transaction_id,
                'amount' => $payment->amount,
                'created_at' => $payment->created_at,
                'updated_at' => $payment->updated_at,
            ],
            'order_status' => $payment->order->status,
        ]);
    }

    /**
     * Handle successful payment
     *
     * @param Payment $payment
     * @param Order $order
     * @return void
     */
    private function handleSuccessfulPayment(Payment $payment, Order $order)
    {
        // Update payment status
        $payment->update([
            'status' => 'completed',
        ]);

        // Mark order payment as completed if not already
        if (!$order->payment_completed_at) {
            $order->update([
                'payment_completed_at' => now(),
                'status' => 'completed',
            ]);

            // Add funds to freelancer wallet
            $freelancer = User::find($order->freelancer_id);
            $wallet = Wallet::firstOrCreate(
                ['user_id' => $freelancer->id],
                ['balance' => 0]
            );

            // Add the freelancer's earning to their balance
            $wallet->update([
                'balance' => $wallet->balance + $order->freelancer_earning,
            ]);

            // Record transaction for the freelancer
            $freelancer->transactions()->create([
                'type' => 'payment',
                'amount' => $order->freelancer_earning,
                'reference_id' => $order->id,
                'reference_type' => Order::class,
                'description' => 'Payment received for Order #' . $order->order_number,
                'status' => 'completed',
            ]);

            // Notify freelancer about payment
            $freelancer->notify(new \App\Notifications\PaymentReceived($order, $order->freelancer_earning));
        }
    }

    /**
     * Admin: Manual payment confirmation
     *
     * @param Request $request
     * @param int $paymentId
     * @return \Illuminate\Http\RedirectResponse
     */
    public function adminConfirmPayment(Request $request, $paymentId)
    {
        $user = Auth::user();
        
        // Check if user is admin
        if (!$user->hasRole('admin')) {
            return redirect()->back()->with('error', 'Unauthorized');
        }
        
        $payment = Payment::with('order')->findOrFail($paymentId);
        
        // Handle the payment as successful
        $this->handleSuccessfulPayment($payment, $payment->order);
        
        return redirect()->back()->with('success', 'Pembayaran berhasil dikonfirmasi');
    }
}
