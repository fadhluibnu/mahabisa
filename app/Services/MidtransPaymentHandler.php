<?php

namespace App\Services;

use App\Models\Payment;
use App\Models\Order;
use App\Models\User;
use App\Models\Activity;
use Illuminate\Support\Facades\Log;

class MidtransPaymentHandler
{
    protected $midtransService;
    protected $orderService;
    
    /**
     * Constructor
     */
    public function __construct(MidtransService $midtransService, OrderService $orderService)
    {
        $this->midtransService = $midtransService;
        $this->orderService = $orderService;
    }
    
    /**
     * Process payment status for a given payment
     * 
     * @param Payment $payment
     * @param User $user
     * @return array
     */
    public function processPaymentStatus(Payment $payment, User $user)
    {
        Log::info('Processing payment status', [
            'payment_id' => $payment->id,
            'payment_status' => $payment->status,
            'order_id' => $payment->order_id,
            'transaction_id' => $payment->transaction_id,
            'user_id' => $user->id
        ]);
        
        $midtransStatus = null;
        $order = $payment->order;
        
        // Check with Midtrans for latest status
        if ($payment->transaction_id) {
            // If we have a transaction_id, check using that
            $midtransStatus = $this->midtransService->checkTransactionStatus($payment->transaction_id);
            Log::info('Checked status with transaction_id', [
                'transaction_id' => $payment->transaction_id,
                'result' => $midtransStatus
            ]);
        } 
        
        // If that didn't work or we don't have transaction_id, try with order number
        if (!$midtransStatus || !($midtransStatus['success'] ?? false)) {
            $midtransStatus = $this->midtransService->checkTransactionStatus($order->order_number);
            Log::info('Checked status with order_number', [
                'order_number' => $order->order_number,
                'result' => $midtransStatus
            ]);
            
            // If successful and transaction_id was found, save it to the payment record
            if ($midtransStatus && isset($midtransStatus['success']) && $midtransStatus['success'] && isset($midtransStatus['transaction_id'])) {
                $payment->transaction_id = $midtransStatus['transaction_id'];
                $payment->save();
                
                Log::info('Updated payment with transaction_id', [
                    'payment_id' => $payment->id,
                    'transaction_id' => $midtransStatus['transaction_id']
                ]);
            }
        }
        
        // Update payment status if needed
        if ($midtransStatus && isset($midtransStatus['success']) && $midtransStatus['success']) {
            // Map Midtrans status to our status
            $newStatus = $payment->status;
            if (in_array($midtransStatus['status'], ['settlement', 'capture', 'success'])) {
                $newStatus = 'completed';
            } else if ($midtransStatus['status'] === 'pending') {
                $newStatus = 'pending';
            } else if (in_array($midtransStatus['status'], ['deny', 'cancel', 'expire', 'failed'])) {
                $newStatus = 'failed';
            }
            
            Log::info('Mapped status', [
                'midtrans_status' => $midtransStatus['status'],
                'mapped_status' => $newStatus,
                'current_status' => $payment->status
            ]);
            
            if ($payment->status !== $newStatus) {
                $payment->status = $newStatus;
                $payment->payment_details = array_merge($payment->payment_details ?? [], [
                    'midtrans' => $midtransStatus
                ]);
                $payment->save();
                
                Log::info('Updated payment status', [
                    'payment_id' => $payment->id,
                    'new_status' => $newStatus
                ]);
                
                // If payment is completed, update order status and activate files
                if ($payment->status === 'completed') {
                    $payment->completed_at = now();
                    $payment->save();
                    
                    $order->status = 'completed';
                    $order->payment_completed_at = now();
                    $order->save();
                    
                    Log::info('Marked order as completed', [
                        'order_id' => $order->id
                    ]);
                    
                    // Activate deliverable files
                    $this->orderService->activateDeliverableFiles($order);
                    
                    // Record activity
                    Activity::create([
                        'user_id' => $user->id,
                        'type' => 'payment_completed',
                        'description' => "Payment completed for order #{$order->order_number}",
                        'subject_id' => $payment->id,
                        'subject_type' => get_class($payment),
                    ]);
                }
            }
        }
        
        $isCompleted = $payment->status === 'completed';
        
        return [
            'success' => true,
            'status' => $payment->status,
            'order_status' => $order->status,
            'can_download' => $isCompleted || $order->isPaymentCompleted(),
            'payment' => $payment,
            'debug_info' => [
                'midtrans_status' => $midtransStatus ?? null,
                'checked_at' => now()->toDateTimeString()
            ]
        ];
    }
}
