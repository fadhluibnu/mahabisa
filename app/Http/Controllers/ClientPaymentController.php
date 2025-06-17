<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\Payment;
use App\Models\Setting;
use App\Services\MidtransService;
use App\Services\OrderService;
use App\Services\NotificationService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class ClientPaymentController extends Controller
{
    protected $midtransService;
    protected $orderService;

    public function __construct(MidtransService $midtransService, OrderService $orderService)
    {
        $this->midtransService = $midtransService;
        $this->orderService = $orderService;
    }
    
    /**
     * Show payment history
     */
    public function index()
    {
        $user = Auth::user();
        $payments = Payment::where('client_id', $user->id)
            ->with('order')
            ->orderBy('created_at', 'desc')
            ->paginate(10);
            
        return Inertia::render('Client/Payments/Index', [
            'payments' => $payments
        ]);
    }
    
    /**
     * Show single payment details
     */
    public function show($id)
    {
        $user = Auth::user();
        $payment = Payment::where('id', $id)
            ->where('client_id', $user->id)
            ->with('order.freelancer', 'order.service')
            ->firstOrFail();
            
        return Inertia::render('Client/Payments/Show', [
            'payment' => $payment,
            'paymentSettings' => [
                'enableMidtrans' => Setting::get('enable_midtrans', true),
                'midtransClientKey' => Setting::get('midtrans_client_key', ''),
                'midtransSandbox' => Setting::get('midtrans_sandbox', true),
            ]
        ]);
    }
    
    /**
     * Create a new payment for an order
     */
    public function create($orderId)
    {
        $user = Auth::user();
        $order = Order::findOrFail($orderId);
        
        // Check if the order belongs to the user
        if ($order->client_id !== $user->id) {
            return redirect()->route('client.dashboard')
                ->with('error', 'You do not have permission to pay for this order.');
        }
        
        // Check if the order is in pending payment status
        if ($order->status !== 'pending_payment') {
            return redirect()->route('client.orders.show', $order->id)
                ->with('error', 'This order is not awaiting payment.');
        }
        
        return Inertia::render('Client/Payments/Create', [
            'order' => $order->load('service', 'freelancer'),
            'paymentSettings' => [
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
            ]
        ]);
    }
}
