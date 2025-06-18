<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Payment;
use App\Services\MidtransPaymentHandler;
use Illuminate\Support\Facades\Auth;

class PaymentStatusController extends Controller
{
    protected $paymentHandler;
    
    public function __construct(MidtransPaymentHandler $paymentHandler)
    {
        $this->paymentHandler = $paymentHandler;
    }
    
    /**
     * Check payment status with enhanced handling
     */
    public function checkStatus($paymentId)
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
        
        // Process payment status with enhanced handler
        $result = $this->paymentHandler->processPaymentStatus($payment, $user);
        
        return response()->json($result);
    }
}
