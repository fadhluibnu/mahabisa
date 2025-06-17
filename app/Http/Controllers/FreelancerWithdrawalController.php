<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\User;
use App\Models\Wallet;
use App\Models\Withdrawal;
use App\Services\WithdrawalService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class FreelancerWithdrawalController extends Controller
{
    protected $withdrawalService;

    public function __construct(WithdrawalService $withdrawalService)
    {
        $this->withdrawalService = $withdrawalService;
        $this->middleware('auth');
        $this->middleware('role:freelancer');
    }

    /**
     * Display the withdrawal page
     */
    public function index()
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
        
        // Get withdrawal history
        $withdrawals = Withdrawal::where('user_id', $user->id)
            ->orderBy('created_at', 'desc')
            ->paginate(10);
        
        // Get earnings breakdown (last 6 months)
        $sixMonthsAgo = now()->subMonths(6);
        $completedOrders = Order::where('freelancer_id', $user->id)
            ->where('status', 'completed')
            ->where('updated_at', '>=', $sixMonthsAgo)
            ->get();
            
        // Group earnings by month
        $monthlyEarnings = [];
        foreach ($completedOrders as $order) {
            $month = $order->updated_at->format('F Y');
            if (!isset($monthlyEarnings[$month])) {
                $monthlyEarnings[$month] = 0;
            }
            $monthlyEarnings[$month] += $order->amount;
        }
        
        // Get settings for withdrawal
        $minimumWithdraw = (float)Setting::get('minimum_withdraw', 50000);
        $withdrawalFee = (float)Setting::get('withdraw_fee', 5000);
        
        return Inertia::render('Freelancer/Withdrawals/Index', [
            'wallet' => $wallet,
            'withdrawals' => $withdrawals,
            'monthlyEarnings' => $monthlyEarnings,
            'settings' => [
                'minimumWithdraw' => $minimumWithdraw,
                'withdrawalFee' => $withdrawalFee,
                'availableMethods' => [
                    'bank_transfer' => true,
                    'paypal' => true,
                    'payoneer' => false,
                ],
            ],
        ]);
    }
    
    /**
     * Submit a withdrawal request
     */
    public function request(Request $request)
    {
        $request->validate([
            'amount' => 'required|numeric|min:1',
            'payment_method' => 'required|string|in:bank_transfer,paypal',
            'account_name' => 'required|string|max:255',
            'account_number' => 'required|string|max:255',
            'bank_name' => $request->payment_method === 'bank_transfer' ? 'required|string|max:255' : 'nullable',
            'paypal_email' => $request->payment_method === 'paypal' ? 'required|email|max:255' : 'nullable',
        ]);
        
        $user = Auth::user();
        $amount = (float)$request->amount;
        $paymentMethod = $request->payment_method;
        
        // Prepare payment details based on method
        $paymentDetails = [
            'account_name' => $request->account_name,
            'account_number' => $request->account_number,
        ];
        
        if ($paymentMethod === 'bank_transfer') {
            $paymentDetails['bank_name'] = $request->bank_name;
        } elseif ($paymentMethod === 'paypal') {
            $paymentDetails['paypal_email'] = $request->paypal_email;
        }
        
        // Process withdrawal request
        $result = $this->withdrawalService->requestWithdrawal($user, $amount, $paymentMethod, $paymentDetails);
        
        if (!$result['success']) {
            return back()->withErrors(['amount' => $result['message']]);
        }
        
        return redirect()->route('freelancer.withdrawals.history')
            ->with('success', 'Withdrawal request submitted successfully.');
    }
    
    /**
     * Show withdrawal history
     */
    public function history()
    {
        $user = Auth::user();
        
        $withdrawals = Withdrawal::where('user_id', $user->id)
            ->orderBy('created_at', 'desc')
            ->paginate(10);
        
        return Inertia::render('Freelancer/Withdrawals/History', [
            'withdrawals' => $withdrawals
        ]);
    }
    
    /**
     * Show specific withdrawal details
     */
    public function show($id)
    {
        $user = Auth::user();
        
        $withdrawal = Withdrawal::where('id', $id)
            ->where('user_id', $user->id)
            ->firstOrFail();
        
        return Inertia::render('Freelancer/Withdrawals/Show', [
            'withdrawal' => $withdrawal
        ]);
    }
    
    /**
     * Cancel a pending withdrawal request
     */
    public function cancel($id)
    {
        $user = Auth::user();
        
        $withdrawal = Withdrawal::where('id', $id)
            ->where('user_id', $user->id)
            ->where('status', 'pending')
            ->firstOrFail();
        
        // Process cancellation (using the withdrawal service to handle it as rejection)
        $this->withdrawalService->processWithdrawal(
            $withdrawal,
            $user,
            false,
            'Cancelled by user'
        );
        
        return redirect()->route('freelancer.withdrawals.history')
            ->with('success', 'Withdrawal request cancelled successfully.');
    }
}
