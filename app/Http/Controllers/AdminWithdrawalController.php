<?php

namespace App\Http\Controllers;

use App\Models\Withdrawal;
use App\Services\WithdrawalService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class AdminWithdrawalController extends Controller
{
    protected $withdrawalService;

    public function __construct(WithdrawalService $withdrawalService)
    {
        $this->withdrawalService = $withdrawalService;
        $this->middleware('auth');
        $this->middleware('role:admin');
    }

    /**
     * Display a listing of the withdrawals
     */
    public function index()
    {
        $withdrawals = Withdrawal::with('user')
            ->orderBy('created_at', 'desc')
            ->paginate(10);

        return Inertia::render('Admin/Withdrawals/Index', [
            'withdrawals' => $withdrawals
        ]);
    }

    /**
     * Display the specified withdrawal
     */
    public function show($id)
    {
        $withdrawal = Withdrawal::with('user.wallet')->findOrFail($id);

        return Inertia::render('Admin/Withdrawals/Show', [
            'withdrawal' => $withdrawal
        ]);
    }

    /**
     * Approve a withdrawal request
     */
    public function approve(Request $request, $id)
    {
        $admin = Auth::user();
        $withdrawal = Withdrawal::findOrFail($id);
        
        // Validate the withdrawal status
        if ($withdrawal->status !== 'pending') {
            return redirect()->back()->with('error', 'This withdrawal has already been processed.');
        }
        
        // Process the approval
        $this->withdrawalService->processWithdrawal(
            $withdrawal,
            $admin,
            true,
            $request->notes ?? 'Approved by admin'
        );
        
        return redirect()->route('admin.withdrawals')->with('success', 'Withdrawal request approved successfully.');
    }

    /**
     * Reject a withdrawal request
     */
    public function reject(Request $request, $id)
    {
        $request->validate([
            'notes' => 'required|string|min:3|max:255',
        ]);
        
        $admin = Auth::user();
        $withdrawal = Withdrawal::findOrFail($id);
        
        // Validate the withdrawal status
        if ($withdrawal->status !== 'pending') {
            return redirect()->back()->with('error', 'This withdrawal has already been processed.');
        }
        
        // Process the rejection
        $this->withdrawalService->processWithdrawal(
            $withdrawal,
            $admin,
            false,
            $request->notes
        );
        
        return redirect()->route('admin.withdrawals')->with('success', 'Withdrawal request rejected.');
    }
}
