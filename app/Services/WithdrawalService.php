<?php

namespace App\Services;

use App\Models\User;
use App\Models\Wallet;
use App\Models\Withdrawal;
use App\Models\Transaction;
use App\Models\Activity;
use App\Models\Setting;
use Illuminate\Support\Str;

class WithdrawalService
{
    /**
     * Request a withdrawal for a freelancer
     * 
     * @param User $user
     * @param float $amount
     * @param string $paymentMethod
     * @param array $paymentDetails
     * @return Withdrawal|array
     */
    public function requestWithdrawal(User $user, float $amount, string $paymentMethod, array $paymentDetails)
    {
        // Get user wallet
        $wallet = Wallet::where('user_id', $user->id)->first();
        
        if (!$wallet) {
            return [
                'success' => false,
                'message' => 'Wallet not found for this user.'
            ];
        }
        
        // Check if the user has enough balance
        if (!$wallet->hasEnoughBalance($amount)) {
            return [
                'success' => false,
                'message' => 'Insufficient balance for withdrawal.'
            ];
        }
        
        // Calculate withdrawal fee
        $withdrawFee = Setting::get('withdraw_fee', 5000);
        $netAmount = $amount - $withdrawFee;
        
        // Check minimum withdrawal amount
        $minimumWithdraw = Setting::get('minimum_withdraw', 50000);
        if ($amount < $minimumWithdraw) {
            return [
                'success' => false,
                'message' => "Minimum withdrawal amount is {$minimumWithdraw}."
            ];
        }
        
        // Create withdrawal request
        $withdrawal = Withdrawal::create([
            'user_id' => $user->id,
            'amount' => $amount,
            'fee' => $withdrawFee,
            'net_amount' => $netAmount,
            'status' => 'pending',
            'payment_method' => $paymentMethod,
            'payment_details' => $paymentDetails,
        ]);
        
        // Deduct amount from wallet
        $wallet->withdraw($amount);
        
        // Record transaction
        Transaction::create([
            'transaction_id' => 'WTH-' . strtoupper(Str::random(8)) . '-' . time(),
            'user_id' => $user->id,
            'reference_id' => $withdrawal->id,
            'reference_type' => Withdrawal::class,
            'type' => 'withdrawal',
            'amount' => $amount,
            'fee' => $withdrawFee,
            'net_amount' => $netAmount,
            'description' => "Withdrawal request via {$paymentMethod}",
            'status' => 'pending',
            'payment_method' => $paymentMethod,
        ]);
        
        // Record activity
        Activity::create([
            'user_id' => $user->id,
            'type' => 'withdrawal_requested',
            'description' => "Requested withdrawal of {$amount}",
            'subject_id' => $withdrawal->id,
            'subject_type' => Withdrawal::class,
        ]);
        
        return [
            'success' => true,
            'withdrawal' => $withdrawal,
        ];
    }
    
    /**
     * Process a withdrawal request (approve or reject)
     * 
     * @param Withdrawal $withdrawal
     * @param User $admin
     * @param bool $isApproved
     * @param string $notes
     * @return Withdrawal
     */
    public function processWithdrawal(Withdrawal $withdrawal, User $admin, bool $isApproved, string $notes)
    {
        // Update withdrawal status
        $withdrawal->status = $isApproved ? 'approved' : 'rejected';
        $withdrawal->notes = $notes;
        $withdrawal->processed_at = now();
        $withdrawal->processed_by = $admin->id;
        $withdrawal->save();
        
        // Get user
        $user = User::findOrFail($withdrawal->user_id);
        
        if ($isApproved) {
            // Update transaction status
            $transaction = Transaction::where('reference_id', $withdrawal->id)
                ->where('reference_type', Withdrawal::class)
                ->where('type', 'withdrawal')
                ->where('status', 'pending')
                ->first();
                
            if ($transaction) {
                $transaction->status = 'success';
                $transaction->save();
            }
            
            // Record activity
            Activity::create([
                'user_id' => $admin->id,
                'type' => 'withdrawal_approved',
                'description' => "Approved withdrawal #{$withdrawal->id} for {$user->name}",
                'subject_id' => $withdrawal->id,
                'subject_type' => Withdrawal::class,
            ]);
            
            // Notify the user
            $notificationService = app(NotificationService::class);
            $notificationService->create(
                $user,
                'withdrawal_approved',
                'Withdrawal Approved',
                "Your withdrawal request for {$withdrawal->amount} has been approved.",
                [
                    'withdrawal_id' => $withdrawal->id,
                    'amount' => $withdrawal->amount,
                    'net_amount' => $withdrawal->net_amount
                ]
            );
            
        } else {
            // Rejected - return funds to wallet
            $wallet = Wallet::where('user_id', $user->id)->first();
            
            if ($wallet) {
                // Add the funds back to the wallet
                $wallet->addFunds($withdrawal->amount);
                $wallet->save();
            }
            
            // Update transaction status
            $transaction = Transaction::where('reference_id', $withdrawal->id)
                ->where('reference_type', Withdrawal::class)
                ->where('type', 'withdrawal')
                ->where('status', 'pending')
                ->first();
                
            if ($transaction) {
                $transaction->status = 'failed';
                $transaction->save();
            }
            
            // Record activity
            Activity::create([
                'user_id' => $admin->id,
                'type' => 'withdrawal_rejected',
                'description' => "Rejected withdrawal #{$withdrawal->id} for {$user->name}",
                'subject_id' => $withdrawal->id,
                'subject_type' => Withdrawal::class,
            ]);
            
            // Notify the user
            $notificationService = app(NotificationService::class);
            $notificationService->create(
                $user,
                'withdrawal_rejected',
                'Withdrawal Rejected',
                "Your withdrawal request for {$withdrawal->amount} has been rejected: {$notes}",
                [
                    'withdrawal_id' => $withdrawal->id,
                    'amount' => $withdrawal->amount,
                    'reason' => $notes
                ]
            );
        }
        
        return $withdrawal;
    }
}
