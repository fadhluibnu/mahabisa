<?php

namespace App\Services;

use App\Models\Order;
use App\Models\Payment;
use App\Models\Setting;
use App\Models\Transaction;
use App\Models\User;
use App\Models\Wallet;
use App\Models\File;
use App\Models\Activity;
use Carbon\Carbon;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Log; // Added for logging

class OrderService
{
    /**
     * Create a new order from service
     * 
     * @param array $data Expects service_id, requirements, amount, delivery_time_days, package_id (optional)
     * @param User $client
     * @return Order
     */
    public function createOrderFromService(array $data, User $client): Order
    {
        $service = \App\Models\Service::findOrFail($data['service_id']);
        $freelancer = User::findOrFail($service->user_id);

        // Use amount and delivery_time_days from $data
        $orderAmount = $data['amount']; // This is the base price for the service/package
        $deliveryTimeDays = $data['delivery_time_days'];

        // Calculate fees based on admin settings
        $platformFeePercentage = (float) Setting::get('platform_fee_percentage', 20); // Default 20%
        $minimumCommission = (float) Setting::get('minimum_commission', 10000); // Default 10000

        $calculatedPlatformFee = ($orderAmount * $platformFeePercentage) / 100;
        $platformFee = max($calculatedPlatformFee, $minimumCommission);
        
        // Tax is currently not implemented, so it's 0
        $tax = 0; 
        
        // Total amount the client will pay
        $totalAmount = $orderAmount + $platformFee + $tax;

        // Freelancer earning is the base order amount (service/package price)
        $freelancerEarning = $orderAmount;
        
        $orderNumber = 'ORD-' . strtoupper(Str::random(8)) . '-' . time();
        
        $order = Order::create([
            'order_number' => $orderNumber,
            'client_id' => $client->id,
            'freelancer_id' => $freelancer->id,
            'service_id' => $service->id,
            'package_id' => $data['package_id'] ?? null,
            'amount' => $orderAmount, // Base price of service/package
            'platform_fee_percentage' => $platformFeePercentage,
            'platform_fee' => $platformFee,
            'tax' => $tax,
            'total_amount' => $totalAmount, // Total paid by client
            'freelancer_earning' => $freelancerEarning, // Freelancer's cut before any deductions on their end
            'requirements' => $data['requirements'] ?? null,
            'due_date' => Carbon::now()->addDays($deliveryTimeDays),
            'status' => 'pending_payment', 
            'payment_status' => 'unpaid',
            // paid_at and downloadable_at will be set later
        ]);
        
        Activity::create([
            'user_id' => $client->id,
            'type' => 'order_created',
            'description' => "Created order {$orderNumber} for service: {$service->title}",
            'subject_id' => $order->id,
            'subject_type' => Order::class,
        ]);
        
        return $order;
    }
    
    /**
     * Create payment for an order
     * 
     * @param Order $order
     * @param array $paymentData
     * @return Payment
     */
    public function createPayment(Order $order, array $paymentData)
    {
        // Create payment
        $payment = Payment::create([
            'payment_id' => 'PAY-' . strtoupper(Str::random(8)) . '-' . time(),
            'order_id' => $order->id,
            'client_id' => $order->client_id,
            'amount' => $order->total_amount,
            'payment_method' => $paymentData['payment_method'] ?? 'midtrans',
            'status' => 'pending',
            'payment_details' => $paymentData['payment_details'] ?? null,
        ]);
        
        // Record activity
        Activity::create([
            'user_id' => $order->client_id,
            'type' => 'payment_initiated',
            'description' => "Initiated payment for order {$order->order_number}",
            'subject_id' => $payment->id,
            'subject_type' => Payment::class,
        ]);
        
        return $payment;
    }
    
    /**
     * Process a successful payment
     * 
     * @param Payment $payment
     * @param array $transactionData
     * @return Payment
     */
    public function processSuccessfulPayment(Payment $payment, array $transactionData)
    {
        if ($payment->status === 'completed') {
            Log::info("Payment {$payment->payment_id} already processed.");
            return $payment;
        }
        
        $payment->status = 'completed';
        $payment->paid_at = now();
        $payment->receipt_url = $transactionData['receipt_url'] ?? null;
        $payment->payment_details = array_merge($payment->payment_details ?? [], $transactionData);
        $payment->save();
        
        $order = $payment->order;
        
        if ($order->status !== 'in-progress' && $order->payment_status !== 'paid') {
            $order->status = 'in-progress';
            $order->payment_status = 'paid';
            $order->paid_at = $payment->paid_at; // Use payment's paid_at time
            // downloadable_at will be set by activateDeliverableFiles if/when files are activated
            $order->save();
        } else {
            Log::warning("Order {$order->order_number} status or payment_status already updated.", ['current_status' => $order->status, 'payment_status' => $order->payment_status]);
        }
        
        $transactionId = $transactionData['transaction_id'] ?? ('TRX-' . strtoupper(Str::random(8)) . '-' . time());
        
        Transaction::create([
            'transaction_id' => $transactionId,
            'user_id' => $payment->client_id,
            'reference_id' => $payment->id,
            'reference_type' => Payment::class,
            'type' => 'payment',
            'amount' => $payment->amount, // This is order->total_amount
            'fee' => 0, 
            'net_amount' => $payment->amount,
            'description' => "Payment for order {$order->order_number}",
            'status' => 'success',
            'payment_method' => $payment->payment_method,
            'metadata' => $transactionData,
        ]);
        
        $freelancer = User::findOrFail($order->freelancer_id);
        $freelancerWallet = Wallet::firstOrCreate(
            ['user_id' => $freelancer->id],
            [
                'balance' => 0,
                'pending_balance' => 0,
                'total_earned' => 0,
                'total_withdrawn' => 0,
            ]
        );
        
        // Use freelancer_earning from the order for pending funds
        $freelancerWallet->addPendingFunds($order->freelancer_earning); 
        
        Transaction::create([
            'transaction_id' => 'FEE-' . strtoupper(Str::random(8)) . '-' . time(),
            'user_id' => null, 
            'reference_id' => $payment->id,
            'reference_type' => Payment::class,
            'type' => 'fee',
            'amount' => $order->platform_fee,
            'fee' => 0,
            'net_amount' => $order->platform_fee,
            'description' => "Platform fee for order {$order->order_number}",
            'status' => 'success',
            'payment_method' => $payment->payment_method,
            'metadata' => [
                'order_id' => $order->id,
                'order_number' => $order->order_number,
            ],
        ]);
        
        Activity::create([
            'user_id' => $payment->client_id,
            'type' => 'payment_completed',
            'description' => "Payment completed for order {$order->order_number}",
            'subject_id' => $payment->id,
            'subject_type' => Payment::class,
        ]);
        
        $client = User::findOrFail($order->client_id);
        
        if (class_exists(\App\Notifications\PaymentCompleted::class)) {
            $client->notify(new \App\Notifications\PaymentCompleted($order, $payment));
        }
        if (class_exists(\App\Notifications\PaymentReceived::class)) {
            $freelancer->notify(new \App\Notifications\PaymentReceived($order, $payment));
        }
        
        // Activate deliverable files now that payment is successful
        $this->activateDeliverableFiles($order);
        
        return $payment;
    }
    
    /**
     * Complete an order and release funds to freelancer
     * 
     * @param Order $order
     * @return Order
     */
    public function completeOrder(Order $order)
    {
        // More robust check: order must be paid and in a suitable state
        if ($order->payment_status !== 'paid') {
            Log::error("Attempt to complete unpaid order {$order->order_number}.");
            throw new \Exception("Order cannot be completed because it is not paid. Payment status: {$order->payment_status}");
        }

        if (!in_array($order->status, ['in-progress', 'delivered', 'revision'])) {
            Log::error("Attempt to complete order {$order->order_number} with unsuitable status: {$order->status}.");
            throw new \Exception("Order cannot be completed. Current status: {$order->status}");
        }

        $order->status = 'completed';
        $order->completed_at = now(); // Add completed_at timestamp
        $order->save();
        
        $freelancer = User::findOrFail($order->freelancer_id);
        $wallet = Wallet::firstOrCreate(
            ['user_id' => $freelancer->id],
            [
                'balance' => 0,
                'pending_balance' => 0,
                'total_earned' => 0,
                'total_withdrawn' => 0,
            ]
        );
        
        // Release funds using freelancer_earning from the order
        $wallet->releasePendingFunds($order->freelancer_earning);
        
        Transaction::create([
            'transaction_id' => 'EARN-' . strtoupper(Str::random(8)) . '-' . time(),
            'user_id' => $freelancer->id,
            'reference_id' => $order->id,
            'reference_type' => Order::class,
            'type' => 'earning',
            'amount' => $order->freelancer_earning, 
            'fee' => 0, 
            'net_amount' => $order->freelancer_earning, 
            'description' => "Earnings for completed order {$order->order_number}",
            'status' => 'success',
            'payment_method' => null,
        ]);
        
        $this->activateDeliverableFiles($order); 
        
        Activity::create([
            'user_id' => $order->client_id,
            'type' => 'order_completed',
            'description' => "Order {$order->order_number} marked as completed",
            'subject_id' => $order->id,
            'subject_type' => Order::class,
        ]);
        
        Activity::create([
            'user_id' => $freelancer->id,
            'type' => 'order_completed',
            'description' => "Order {$order->order_number} marked as completed, earnings credited",
            'subject_id' => $order->id,
            'subject_type' => Order::class,
        ]);

        // Notify client and freelancer about order completion
        // if (class_exists(\App\Notifications\OrderCompletedClient::class)) {
        //     $client = User::findOrFail($order->client_id);
        //     $client->notify(new \App\Notifications\OrderCompletedClient($order));
        // }
        // if (class_exists(\App\Notifications\OrderCompletedFreelancer::class)) {
        //     $freelancer->notify(new \App\Notifications\OrderCompletedFreelancer($order));
        // }
        
        return $order;
    }
    
    /**
     * Activate deliverable files for the client.
     * This should typically be called after successful payment.
     * 
     * @param Order $order
     * @return void
     */
    public function activateDeliverableFiles(Order $order): void
    {
        // Ensure order is in completed state or has payment completed
        if (!$order->isPaymentCompleted() && $order->status !== 'completed') {
            Log::warning("Attempted to activate files for unpaid order {$order->order_number}.");
            return;
        }

        $filesToActivate = File::where('fileable_id', $order->id)
            ->where('fileable_type', Order::class)
            ->where('status', 'deliverable') // Files uploaded by freelancer awaiting activation
            ->whereNull('activated_at')      // Only activate those not yet activated
            ->get();
            
        if ($filesToActivate->isEmpty()) {
            // Log::info("No new deliverable files found to activate for order {$order->order_number}.");
            // If there are already active files, ensure downloadable_at is set.
            // This handles cases where activateDeliverableFiles might be called multiple times or if files were activated by another process.
            if ($order->files()->where('fileable_type', Order::class)->whereNotNull('activated_at')->exists() && is_null($order->downloadable_at)) {
                 // Find the earliest activation time among all already active files for this order
                $earliestActivation = $order->files()
                                        ->where('fileable_type', Order::class)
                                        ->whereNotNull('activated_at')
                                        ->min('activated_at');
                if ($earliestActivation) {
                    $order->downloadable_at = $earliestActivation;
                    $order->save();
                }
            }
            return;
        }
            
        $activationTime = now();
        foreach ($filesToActivate as $file) {
            $file->activate($activationTime); // activate() method in File model sets status and activated_at
            Log::info('File activated for download', [
                'file_id' => $file->id,
                'file_name' => $file->original_name,
                'order_id' => $order->id,
                'activated_at' => $file->activated_at->toIso8601String()
            ]);
        }

        // Set or update downloadable_at on the order to the current activation time
        // This ensures that if files are added and activated in batches, downloadable_at reflects the first time any deliverable became available.
        if (is_null($order->downloadable_at) || $activationTime < new Carbon($order->downloadable_at)) {
            $order->downloadable_at = $activationTime;
            $order->save();
        }
        
        Activity::create([
            'user_id' => $order->client_id, // Or system user if preferred
            'type' => 'files_unlocked',
            'description' => "Deliverable files ({$filesToActivate->count()}) unlocked for order {$order->order_number}",
            'subject_id' => $order->id,
            'subject_type' => Order::class,
        ]);
        
        $client = User::findOrFail($order->client_id);
        
        // Modern Notification for files available
        if (class_exists(\App\Notifications\FilesAvailable::class)) {
            $client->notify(new \App\Notifications\FilesAvailable($order, $filesToActivate->count()));
        }
        
        // Legacy notification (if still used)
        // $notificationService = app(\App\Services\NotificationService::class);
        // $notificationService->create(...); 
    }
    
    /**
     * Cancel an order
     * 
     * @param Order $order
     * @param string $reason
     * @return Order
     */
    public function cancelOrder(Order $order, string $reason, ?int $cancellerId = null)
    {
        // Update order status
        $order->status = 'cancelled';
        $order->cancellation_reason = $reason;
        $order->cancelled_at = now(); // Add cancelled_at timestamp
        if ($cancellerId) {
            $order->cancelled_by = $cancellerId;
        }
        $order->save();
        
        // If the order was paid, handle refund logic
        if ($order->payment_status === 'paid') {
            // Refund logic would go here (this is a placeholder, actual refund processing via payment gateway is complex)
            Log::info("Order {$order->order_number} was paid. Initiating refund process (placeholder).");

            // For now, we will reverse the pending funds if any
            $freelancer = User::findOrFail($order->freelancer_id);
            $wallet = Wallet::where('user_id', $freelancer->id)->first();
            
            if ($wallet && $wallet->pending_balance >= $order->freelancer_earning) {
                $wallet->pending_balance -= $order->freelancer_earning;
                // Potentially add a transaction log for this reversal from pending
                Log::info("Reversed pending funds for freelancer {$freelancer->id} for order {$order->order_number}", [
                    'amount' => $order->freelancer_earning
                ]);
                $wallet->save();
            } elseif($wallet) {
                Log::warning("Not enough pending balance to reverse for freelancer {$freelancer->id} for order {$order->order_number}", [
                    'pending_balance' => $wallet->pending_balance,
                    'required_reversal' => $order->freelancer_earning
                ]);
            }
            
            // Record a refund transaction (placeholder - actual refund to client needs gateway integration)
            Transaction::create([
                'transaction_id' => 'REF-' . strtoupper(Str::random(8)) . '-' . time(), // Changed prefix to REF
                'user_id' => $order->client_id,
                'reference_id' => $order->id,
                'reference_type' => Order::class,
                'type' => 'refund',
                'amount' => $order->total_amount, // Amount client paid
                'fee' => 0,
                'net_amount' => $order->total_amount,
                'description' => "Refund for cancelled order {$order->order_number}. Reason: {$reason}",
                'status' => 'pending', // Or 'success' if refund is immediate, 'processing' if it takes time
                'payment_method' => null, // Or the method used for refund
            ]);
        }
        
        Activity::create([
            'user_id' => $cancellerId, // Use the provided cancellerId or null if system
            'type' => 'order_cancelled',
            'description' => "Order {$order->order_number} cancelled. Reason: {$reason}",
            'subject_id' => $order->id,
            'subject_type' => Order::class,
        ]);
        
        // TODO: Notify relevant parties (client, freelancer, admin) about cancellation
        // $client = User::findOrFail($order->client_id);
        // $freelancer = User::findOrFail($order->freelancer_id);
        // $client->notify(new \App\Notifications\OrderCancelledClient($order, $reason));
        // $freelancer->notify(new \App\Notifications\OrderCancelledFreelancer($order, $reason));

        return $order;
    }
}
