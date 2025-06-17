<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\Payment;
use App\Models\Wallet;
use App\Models\Transaction;
use App\Models\Withdrawal;
use App\Models\User;
use App\Models\Setting;
use App\Models\Activity;
use App\Services\MidtransService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;
use Inertia\Inertia;

class FreelancerPaymentController extends Controller
{
    protected $midtransService;

    public function __construct(MidtransService $midtransService)
    {
        $this->midtransService = $midtransService;
    }

    /**
     * Show the freelancer's payments page with transaction history
     *
     * @return \Inertia\Response
     */
    public function payments()
    {
        $user = Auth::user();
        
        // Get wallet
        $wallet = Wallet::firstOrCreate(
            ['user_id' => $user->id],
            [
                'balance' => 0,
                'pending_balance' => 0,
                'total_earned' => 0,
                'total_withdrawn' => 0,
            ]
        );
        
        // Get transactions - payments received and withdrawals made
        $transactions = Transaction::where('user_id', $user->id)
            ->whereIn('type', ['payment', 'withdrawal'])
            ->orderBy('created_at', 'desc')
            ->paginate(15);
            
        // Get pending orders for income projection
        $pendingOrders = Order::where('freelancer_id', $user->id)
            ->whereIn('status', ['in-progress', 'revision', 'delivered'])
            ->with('service', 'client')
            ->get();
            
        return Inertia::render('Freelancer/Payments', [
            'user' => $user,
            'wallet' => $wallet,
            'transactions' => $transactions,
            'pendingOrders' => $pendingOrders,
            'stats' => [
                'total_earned' => $wallet->total_earned,
                'pending_balance' => $wallet->pending_balance,
                'available_balance' => $wallet->balance,
                'total_withdrawn' => $wallet->total_withdrawn,
            ],
        ]);
    }

    /**
     * Show the withdrawal form
     *
     * @return \Inertia\Response
     */
    public function withdrawal()
    {
        $user = Auth::user();
        
        // Get wallet
        $wallet = Wallet::firstOrCreate(
            ['user_id' => $user->id],
            [
                'balance' => 0,
                'pending_balance' => 0,
                'total_earned' => 0,
                'total_withdrawn' => 0,
            ]
        );
        
        // Get payment methods
        $paymentMethods = $user->paymentMethods()->get();
        
        // Get recent withdrawals
        $withdrawals = Withdrawal::where('user_id', $user->id)
            ->orderBy('created_at', 'desc')
            ->limit(5)
            ->get();
            
        // Get withdrawal settings
        $settings = [
            'withdraw_fee' => Setting::get('withdraw_fee', 5000),
            'minimum_withdraw' => Setting::get('minimum_withdraw', 50000),
            'withdrawal_fee_percentage' => Setting::get('withdrawal_fee_percentage', 1),
            'withdrawal_fee_fixed' => Setting::get('withdrawal_fee_fixed', 2500),
        ];
        
        return Inertia::render('Freelancer/Withdrawal', [
            'user' => $user,
            'wallet' => $wallet,
            'paymentMethods' => $paymentMethods,
            'withdrawalHistory' => $withdrawals,
            'settings' => $settings,
        ]);
    }
    
    /**
     * Process withdrawal request
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function storeWithdrawal(Request $request)
    {
        $user = Auth::user();
        
        $validated = $request->validate([
            'amount' => 'required|numeric|min:1',
            'payment_method_id' => 'required|exists:payment_methods,id,user_id,'.$user->id,
            'note' => 'nullable|string|max:255',
        ]);
        
        // Get wallet
        $wallet = Wallet::where('user_id', $user->id)->firstOrFail();
        
        // Check if the user has sufficient balance
        if ($wallet->balance < $validated['amount']) {
            return redirect()->back()->withErrors(['amount' => 'Insufficient balance for withdrawal.']);
        }
        
        // Get withdrawal settings
        $minWithdraw = Setting::get('minimum_withdraw', 50000);
        if ($validated['amount'] < $minWithdraw) {
            return redirect()->back()->withErrors(['amount' => "Minimum withdrawal amount is {$minWithdraw}."]);
        }
        
        // Get the payment method
        $paymentMethod = $user->paymentMethods()->findOrFail($validated['payment_method_id']);
        $paymentDetails = $paymentMethod->toArray();
        
        // Calculate fee
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
            'payment_method' => $paymentMethod->type,
            'payment_details' => $paymentDetails,
            'notes' => $validated['note'],
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
            'payment_method' => $paymentMethod->type,
        ]);

        // Record activity
        Activity::create([
            'user_id' => $user->id,
            'type' => 'withdrawal_requested',
            'description' => "Requested withdrawal of {$validated['amount']} via {$paymentMethod->type}",
            'subject_id' => $withdrawal->id,
            'subject_type' => Withdrawal::class,
        ]);

        return redirect()->route('freelancer.payments')->with('success', 'Withdrawal request submitted successfully. It will be processed within 1-3 business days.');
    }
    
    /**
     * Store a new payment method
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function storePaymentMethod(Request $request)
    {
        $user = Auth::user();
        
        // Validate based on payment method type
        if ($request->type === 'bank') {
            $validated = $request->validate([
                'type' => 'required|in:bank,ewallet',
                'bank_name' => 'required|string|max:100',
                'account_number' => 'required|string|max:50',
                'account_holder' => 'required|string|max:100',
                'is_default' => 'boolean',
            ]);
        } else {
            $validated = $request->validate([
                'type' => 'required|in:bank,ewallet',
                'provider' => 'required|string|max:100',
                'phone_number' => 'required|string|max:20',
                'is_default' => 'boolean',
            ]);
        }
        
        // If this is set as default, remove default from other payment methods
        if (!empty($validated['is_default']) && $validated['is_default']) {
            $user->paymentMethods()->update(['is_default' => false]);
        }
        
        // Create payment method
        $paymentMethod = $user->paymentMethods()->create($validated);
        
        // If this is the first payment method, make it default
        if ($user->paymentMethods()->count() === 1) {
            $paymentMethod->update(['is_default' => true]);
        }
        
        return redirect()->back()->with('success', 'Payment method added successfully.');
    }
    
    /**
     * Delete a payment method
     *
     * @param  int  $id
     * @return \Illuminate\Http\RedirectResponse
     */
    public function deletePaymentMethod($id)
    {
        $user = Auth::user();
        $paymentMethod = $user->paymentMethods()->findOrFail($id);
        
        // Check if this is the default payment method
        if ($paymentMethod->is_default) {
            // Find another payment method to set as default
            $newDefault = $user->paymentMethods()->where('id', '!=', $id)->first();
            if ($newDefault) {
                $newDefault->update(['is_default' => true]);
            }
        }
        
        $paymentMethod->delete();
        
        return redirect()->back()->with('success', 'Payment method removed successfully.');
    }
    
    /**
     * Set a payment method as default
     *
     * @param  int  $id
     * @return \Illuminate\Http\RedirectResponse
     */
    public function setDefaultPaymentMethod($id)
    {
        $user = Auth::user();
        
        // Remove default status from all payment methods
        $user->paymentMethods()->update(['is_default' => false]);
        
        // Set the selected payment method as default
        $paymentMethod = $user->paymentMethods()->findOrFail($id);
        $paymentMethod->update(['is_default' => true]);
        
        return redirect()->back()->with('success', 'Default payment method updated successfully.');
    }
    
    /**
     * Show freelancer's orders with filtering and search capabilities
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Inertia\Response
     */
    public function orders(Request $request)
    {
        $user = Auth::user();
        $status = $request->query('status', 'all');
        $search = $request->query('search', '');
        
        $query = Order::where('freelancer_id', $user->id)
            ->with(['client.profile', 'service', 'project', 'files']);
            
        // Filter by status
        if ($status !== 'all') {
            // Standarisasi format status (menangani baik in-progress maupun in_progress)
            if ($status === 'in_progress' || $status === 'in-progress') {
                $query->where(function($q) {
                    $q->where('status', 'in_progress')
                      ->orWhere('status', 'in-progress');
                });
            } else {
                $query->where('status', $status);
            }
        }
        
        // Search functionality
        if (!empty($search)) {
            $query->where(function($q) use ($search) {
                $q->where('order_number', 'like', "%{$search}%")
                  ->orWhereHas('service', function($q) use ($search) {
                      $q->where('title', 'like', "%{$search}%");
                  })
                  ->orWhereHas('client', function($q) use ($search) {
                      $q->where('name', 'like', "%{$search}%");
                  })
                  ->orWhereHas('client.profile', function($q) use ($search) {
                      $q->where('company', 'like', "%{$search}%");
                  });
            });
        }
        
        $orders = $query->orderBy('created_at', 'desc')
            ->paginate(15)
            ->withQueryString();
            
        // Standardize status format for frontend
        $orders->each(function ($order) {
            if ($order->status === 'in-progress') {
                $order->status = 'in_progress';
            }
        });
            
        // Get order counts by status for displaying in tabs
        $orderCounts = [
            'all' => Order::where('freelancer_id', $user->id)->count(),
            'pending' => Order::where('freelancer_id', $user->id)->where('status', 'pending')->count(),
            'in_progress' => Order::where('freelancer_id', $user->id)
                           ->where(function($q) {
                               $q->where('status', 'in_progress')
                                 ->orWhere('status', 'in-progress');
                           })->count(),
            'delivered' => Order::where('freelancer_id', $user->id)->where('status', 'delivered')->count(),
            'completed' => Order::where('freelancer_id', $user->id)->where('status', 'completed')->count(),
            'cancelled' => Order::where('freelancer_id', $user->id)->where('status', 'cancelled')->count(),
            'revision' => Order::where('freelancer_id', $user->id)->where('status', 'revision')->count(),
                        ];
        
        return Inertia::render('Freelancer/Orders', [
            'orders' => $orders,
            'filters' => [
                'status' => $status,
                'search' => $search,
            ],
            'orderCounts' => $orderCounts,
        ]);
    }
}
