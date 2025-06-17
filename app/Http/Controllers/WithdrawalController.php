<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Wallet;
use App\Models\Withdrawal;
use App\Models\Transaction;
use App\Models\Setting;
use App\Models\Activity;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Carbon\Carbon;

class WithdrawalController extends Controller
{
    /**
     * Show withdrawal page for freelancers
     */
    public function showWithdrawalPage()
    {
        $user = Auth::user();

        // Get user wallet
        $wallet = Wallet::firstOrCreate(
            ['user_id' => $user->id],
            [
                'balance' => 0,
                'pending_balance' => 0,
                'total_earned' => 0,
                'total_withdrawn' => 0,
            ]
        );

        // Get withdrawal settings
        $withdrawalSettings = [
            'minimumWithdrawalAmount' => Setting::get('minimum_withdrawal', 100000),
            'withdrawalFeePercentage' => Setting::get('withdrawal_fee_percentage', 1),
            'withdrawalFeeFixed' => Setting::get('withdrawal_fee_fixed', 2500),
            'availableMethods' => Setting::get('withdrawal_methods', [
                'bank_transfer' => true,
                'e_wallet' => true,
            ]),
        ];

        // Get recent withdrawals
        $recentWithdrawals = $user->withdrawals()
            ->orderBy('created_at', 'desc')
            ->take(5)
            ->get();

        return Inertia::render('Freelancer/Withdrawal', [
            'wallet' => $wallet,
            'withdrawalSettings' => $withdrawalSettings,
            'recentWithdrawals' => $recentWithdrawals,
        ]);
    }
    
    /**
     * Request a withdrawal
     */
    public function requestWithdrawal(Request $request)
    {
        $user = Auth::user();
        $wallet = Wallet::where('user_id', $user->id)->firstOrFail();

        // Validate request
        $validated = $request->validate([
            'amount' => 'required|numeric|min:1',
            'payment_method' => 'required|string|in:bank_transfer,e_wallet',
            'payment_details' => 'required|array',
            'payment_details.account_name' => 'required|string',
            'payment_details.account_number' => 'required|string',
            'payment_details.bank_name' => 'required_if:payment_method,bank_transfer|string|nullable',
            'payment_details.wallet_type' => 'required_if:payment_method,e_wallet|string|nullable',
        ]);

        // Check minimum withdrawal amount
        $minimumWithdrawal = Setting::get('minimum_withdrawal', 100000);
        if ($validated['amount'] < $minimumWithdrawal) {
            return redirect()->back()->with('error', "Minimum withdrawal amount is {$minimumWithdrawal}");
        }

        // Check if user has enough balance
        if ($wallet->balance < $validated['amount']) {
            return redirect()->back()->with('error', 'Insufficient balance for this withdrawal');
        }

        // Calculate withdrawal fee
        $feePercentage = Setting::get('withdrawal_fee_percentage', 1);
        $feeFixed = Setting::get('withdrawal_fee_fixed', 2500);
        
        $feeAmount = ($validated['amount'] * $feePercentage / 100) + $feeFixed;
        $netAmount = $validated['amount'] - $feeAmount;

        // Create withdrawal record
        $withdrawal = Withdrawal::create([
            'user_id' => $user->id,
            'amount' => $validated['amount'],
            'fee' => $feeAmount,
            'net_amount' => $netAmount,
            'status' => 'pending',
            'payment_method' => $validated['payment_method'],
            'payment_details' => $validated['payment_details'],
        ]);

        // Reduce wallet balance
        $wallet->withdraw($validated['amount']);

        // Create transaction record
        Transaction::create([
            'transaction_id' => 'WDR-' . strtoupper(Str::random(8)) . '-' . time(),
            'user_id' => $user->id,
            'reference_id' => $withdrawal->id,
            'reference_type' => Withdrawal::class,
            'type' => 'withdrawal',
            'amount' => $validated['amount'],
            'fee' => $feeAmount,
            'net_amount' => $netAmount,
            'description' => "Withdrawal request {$withdrawal->id}",
            'status' => 'pending',
            'payment_method' => $validated['payment_method'],
        ]);

        // Record activity
        Activity::create([
            'user_id' => $user->id,
            'type' => 'withdrawal_requested',
            'description' => "Requested withdrawal of {$validated['amount']} via {$validated['payment_method']}",
            'subject_id' => $withdrawal->id,
            'subject_type' => Withdrawal::class,
        ]);

        return redirect()->back()->with('success', 'Withdrawal request submitted successfully. It will be processed within 1-3 business days.');
    }

    /**
     * Admin: Show withdrawals that need approval
     */
    public function adminWithdrawals()
    {
        $user = Auth::user();

        // Ensure user is admin
        if (!$user->isAdmin()) {
            return redirect()->route('dashboard')->with('error', 'Unauthorized access');
        }

        $pendingWithdrawals = Withdrawal::with('user')
            ->where('status', 'pending')
            ->orderBy('created_at', 'asc')
            ->paginate(10);

        $processedWithdrawals = Withdrawal::with(['user', 'processedBy'])
            ->whereIn('status', ['approved', 'rejected'])
            ->orderBy('processed_at', 'desc')
            ->paginate(10);

        return Inertia::render('Admin/Withdrawals', [
            'pendingWithdrawals' => $pendingWithdrawals,
            'processedWithdrawals' => $processedWithdrawals,
        ]);
    }

    /**
     * Admin: Process a withdrawal request
     */
    public function processWithdrawal(Request $request, $id)
    {
        $admin = Auth::user();

        // Ensure user is admin
        if (!$admin->isAdmin()) {
            return redirect()->route('dashboard')->with('error', 'Unauthorized access');
        }

        $validated = $request->validate([
            'action' => 'required|string|in:approve,reject',
            'notes' => 'nullable|string|max:500',
        ]);

        $withdrawal = Withdrawal::findOrFail($id);

        // Ensure withdrawal is pending
        if ($withdrawal->status !== 'pending') {
            return redirect()->back()->with('error', 'This withdrawal has already been processed');
        }

        // Process withdrawal
        if ($validated['action'] === 'approve') {
            $withdrawal->status = 'approved';
            $withdrawal->notes = $validated['notes'];
            $withdrawal->processed_at = now();
            $withdrawal->processed_by = $admin->id;
            $withdrawal->save();

            // Update corresponding transaction
            $transaction = Transaction::where('reference_id', $withdrawal->id)
                ->where('reference_type', Withdrawal::class)
                ->where('type', 'withdrawal')
                ->first();

            if ($transaction) {
                $transaction->status = 'success';
                $transaction->save();
            }

            // Record activity
            Activity::create([
                'user_id' => $admin->id,
                'type' => 'withdrawal_approved',
                'description' => "Approved withdrawal #{$withdrawal->id} for {$withdrawal->user->name}",
                'subject_id' => $withdrawal->id,
                'subject_type' => Withdrawal::class,
            ]);

            // Notify the user
            // NotificationService::notifyUser($withdrawal->user, 'withdrawal_approved', $withdrawal);

            return redirect()->back()->with('success', 'Withdrawal request approved');
        } else {
            // Reject the withdrawal - return funds to wallet
            $wallet = Wallet::where('user_id', $withdrawal->user_id)->first();

            if ($wallet) {
                $wallet->addFunds($withdrawal->amount);
            }

            $withdrawal->status = 'rejected';
            $withdrawal->notes = $validated['notes'];
            $withdrawal->processed_at = now();
            $withdrawal->processed_by = $admin->id;
            $withdrawal->save();

            // Update corresponding transaction
            $transaction = Transaction::where('reference_id', $withdrawal->id)
                ->where('reference_type', Withdrawal::class)
                ->where('type', 'withdrawal')
                ->first();

            if ($transaction) {
                $transaction->status = 'failed';
                $transaction->save();
            }

            // Record activity
            Activity::create([
                'user_id' => $admin->id,
                'type' => 'withdrawal_rejected',
                'description' => "Rejected withdrawal #{$withdrawal->id} for {$withdrawal->user->name}",
                'subject_id' => $withdrawal->id,
                'subject_type' => Withdrawal::class,
            ]);

            // Notify the user
            // NotificationService::notifyUser($withdrawal->user, 'withdrawal_rejected', $withdrawal);

            return redirect()->back()->with('success', 'Withdrawal request rejected. Funds have been returned to user\'s wallet.');
        }
    }
}
