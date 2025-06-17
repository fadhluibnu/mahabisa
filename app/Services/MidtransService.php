<?php

namespace App\Services;

use App\Models\Order;
use App\Models\Setting;
use Exception;
use Midtrans\Config;
use Midtrans\Snap;
use Midtrans\Transaction;
use Midtrans\Notification;

class MidtransService
{
    /**
     * Initialize Midtrans configuration
     */
    public function __construct()
    {
        $this->initConfig();
    }

    /**
     * Initialize Midtrans configuration with settings from DB
     */
    private function initConfig()
    {
        $isProduction = !Setting::get('midtrans_sandbox', true);
        $serverKey = Setting::get('midtrans_server_key', 'SB-Mid-server-q5DTSIlBs3rH0Oem2daMIoWe');
        $clientKey = Setting::get('midtrans_client_key', 'SB-Mid-client-WntGntyuU5ryOlW7');

        Config::$serverKey = $serverKey;
        Config::$clientKey = $clientKey;
        Config::$isProduction = $isProduction;
        Config::$isSanitized = true;
        Config::$is3ds = true;

        return $this;
    }

    /**
     * Create Midtrans Snap token for payment
     * 
     * @param Order $order
     * @param array $customerDetails
     * @return array
     */
    public function createSnapToken(Order $order, array $customerDetails) 
    {
        // Force refresh config to ensure we always use the latest settings
        $this->initConfig();

        try {
            // Build transaction params
            $params = [
                'transaction_details' => [
                    'order_id' => $order->order_number,
                    'gross_amount' => (int) $order->total_amount,
                ],
                'item_details' => [
                    [
                        'id' => $order->service_id ? 'service-'.$order->service_id : 'project-'.$order->project_id,
                        'name' => $order->service_id ? 'Freelance Service' : 'Custom Project',
                        'price' => (int) $order->amount,
                        'quantity' => 1,
                    ],
                    [
                        'id' => 'fee',
                        'name' => 'Platform Fee',
                        'price' => (int) $order->platform_fee,
                        'quantity' => 1,
                    ]
                ],
                'customer_details' => $customerDetails,
            ];

            // Add tax item if applicable
            if ($order->tax > 0) {
                $params['item_details'][] = [
                    'id' => 'tax',
                    'name' => 'Tax',
                    'price' => (int) $order->tax,
                    'quantity' => 1,
                ];
            }

            // Get enabled payment methods
            $enabledMethods = Setting::get('payment_methods', [
                'bank_transfer' => true,
                'credit_card' => true,
                'e_wallet' => true,
                'qris' => true,
                'paylater' => false,
                'retail' => true,
            ]);

            // Filter enabled payment channels
            $enabledChannels = [];
            
            if ($enabledMethods['bank_transfer'] ?? true) {
                $enabledChannels[] = 'bank_transfer';
            }
            if ($enabledMethods['credit_card'] ?? true) {
                $enabledChannels[] = 'credit_card';
            }
            if ($enabledMethods['e_wallet'] ?? true) {
                $enabledChannels[] = 'gopay';
                $enabledChannels[] = 'shopeepay';
            }
            if ($enabledMethods['qris'] ?? true) {
                $enabledChannels[] = 'qris';
            }
            if ($enabledMethods['paylater'] ?? false) {
                $enabledChannels[] = 'kredivo';
            }
            if ($enabledMethods['retail'] ?? true) {
                $enabledChannels[] = 'indomaret';
                $enabledChannels[] = 'alfamart';
            }

            // Set enabled payment methods
            if (!empty($enabledChannels)) {
                $params['enabled_payments'] = $enabledChannels;
            }

            // Create Snap Token
            $snapToken = Snap::createTransaction($params);

            return [
                'success' => true,
                'token' => $snapToken->token,
                'redirect_url' => $snapToken->redirect_url,
                'error' => null,
            ];
        } catch (\Exception $e) {
            return [
                'success' => false,
                'token' => null,
                'redirect_url' => null,
                'error' => $e->getMessage(),
            ];
        }
    }

    /**
     * Handle Midtrans notification callback
     * 
     * @param string $notificationJson
     * @return array
     */
    public function handleNotification($notificationJson = null)
    {
        try {
            $notification = $notificationJson 
                ? new Notification(json_decode($notificationJson)) 
                : new Notification();

            $transactionStatus = $notification->transaction_status;
            $paymentType = $notification->payment_type;
            $orderId = $notification->order_id;
            $fraudStatus = $notification->fraud_status;
            $grossAmount = $notification->gross_amount;

            $status = $this->mapTransactionStatus($transactionStatus, $fraudStatus);

            return [
                'success' => true,
                'order_id' => $orderId,
                'status' => $status,
                'transaction_id' => $notification->transaction_id,
                'payment_type' => $paymentType,
                'gross_amount' => $grossAmount,
                'original_notification' => $notification,
            ];
        } catch (\Exception $e) {
            return [
                'success' => false,
                'error' => $e->getMessage()
            ];
        }
    }

    /**
     * Check transaction status from Midtrans API
     * 
     * @param string $orderId
     * @return array
     */
    public function checkTransactionStatus($orderId)
    {
        $this->initConfig();

        try {
            $response = Transaction::status($orderId);
            
            $transactionStatus = $response->transaction_status;
            $fraudStatus = isset($response->fraud_status) ? $response->fraud_status : null;
            
            $status = $this->mapTransactionStatus($transactionStatus, $fraudStatus);
            
            return [
                'success' => true,
                'status' => $status,
                'original_status' => $transactionStatus,
                'transaction_id' => $response->transaction_id,
                'payment_type' => $response->payment_type,
                'fraud_status' => $fraudStatus,
                'response' => $response,
            ];
        } catch (\Exception $e) {
            return [
                'success' => false,
                'status' => 'error',
                'error_message' => $e->getMessage(),
            ];
        }
    }

    /**
     * Map Midtrans transaction status to our system status
     * 
     * @param string $transactionStatus
     * @param string|null $fraudStatus
     * @return string
     */
    private function mapTransactionStatus($transactionStatus, $fraudStatus = null)
    {
        $status = 'pending';
        
        if ($transactionStatus == 'capture') {
            if ($fraudStatus == 'challenge') {
                $status = 'challenge';
            } else if ($fraudStatus == 'accept') {
                $status = 'success';
            }
        } else if ($transactionStatus == 'settlement') {
            $status = 'success';
        } else if ($transactionStatus == 'pending') {
            $status = 'pending';
        } else if ($transactionStatus == 'deny' || $transactionStatus == 'cancel' || $transactionStatus == 'expire') {
            $status = 'failed';
        } else if ($transactionStatus == 'refund') {
            $status = 'refunded';
        }
        
        return $status;
    }
}
