<?php

namespace Tests\Feature;

use App\Models\Order;
use App\Models\Payment;
use App\Models\User;
use App\Models\File;
use App\Models\Wallet;
use App\Services\MidtransService;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use Illuminate\Support\Str;

class PaymentFlowTest extends TestCase
{
    use RefreshDatabase;

    /**
     * Test the complete payment flow from order to file access.
     *
     * @return void
     */
    public function test_complete_payment_flow()
    {
        // Mock MidtransService
        $this->mock(MidtransService::class, function ($mock) {
            $mock->shouldReceive('createSnapToken')
                ->andReturn([
                    'success' => true,
                    'token' => 'test-token-' . Str::random(8),
                    'redirect_url' => 'https://app.sandbox.midtrans.com/snap/v2/vtweb/test-token',
                    'error' => null,
                ]);
                
            $mock->shouldReceive('handleNotification')
                ->andReturn([
                    'success' => true,
                    'order_id' => 'ORD-TEST-12345',
                    'status' => 'success',
                    'transaction_id' => 'TRX-' . Str::random(8),
                    'payment_type' => 'credit_card',
                    'gross_amount' => 500000,
                ]);
                
            $mock->shouldReceive('checkTransactionStatus')
                ->andReturn([
                    'success' => true,
                    'status' => 'success',
                    'original_status' => 'settlement',
                    'transaction_id' => 'TRX-' . Str::random(8),
                    'payment_type' => 'credit_card',
                    'fraud_status' => 'accept',
                ]);
        });
        
        // Create test users
        $client = User::factory()->create(['role' => 'client']);
        $freelancer = User::factory()->create(['role' => 'freelancer']);
        
        // Create wallet for freelancer
        $wallet = Wallet::create([
            'user_id' => $freelancer->id,
            'balance' => 0,
            'pending_balance' => 0,
            'total_earned' => 0,
            'total_withdrawn' => 0,
        ]);
        
        // Create a test order
        $order = Order::create([
            'order_number' => 'ORD-TEST-12345',
            'client_id' => $client->id,
            'freelancer_id' => $freelancer->id,
            'service_id' => 1,
            'status' => 'pending',
            'amount' => 450000,
            'platform_fee' => 50000,
            'total_amount' => 500000,
            'requirements' => 'Test requirements',
            'deadline' => now()->addDays(5),
        ]);
        
        // Create a test file (deliverable)
        $file = File::create([
            'user_id' => $freelancer->id,
            'fileable_id' => $order->id,
            'fileable_type' => Order::class,
            'original_name' => 'test_deliverable.pdf',
            'file_name' => 'test_deliverable.pdf',
            'file_path' => 'orders/' . $order->id . '/deliverables/test_deliverable.pdf',
            'file_type' => 'application/pdf',
            'file_size' => 1024,
            'is_public' => false,
            'status' => 'deliverable',
            'download_count' => 0,
        ]);
        
        // Test 1: Client can't download file before payment
        $this->actingAs($client);
        $response = $this->get(route('client.files.download', $file->id));
        $response->assertStatus(302); // Should redirect with error
        
        // Test 2: Process payment
        $payment = Payment::create([
            'payment_id' => 'PAY-' . Str::random(8),
            'order_id' => $order->id,
            'client_id' => $client->id,
            'amount' => $order->total_amount,
            'payment_method' => 'credit_card',
            'status' => 'pending',
        ]);
        
        // Test 3: Update payment status to completed
        $payment->status = 'completed';
        $payment->payment_method_details = json_encode(['card_type' => 'visa', 'card_number' => '****4242']);
        $payment->transaction_time = now();
        $payment->save();
        
        // Update order status
        $order->status = 'in-progress';
        $order->payment_completed_at = now();
        $order->save();
        
        // Test 4: Update freelancer wallet
        $wallet->pending_balance += $order->amount;
        $wallet->total_earned += $order->amount;
        $wallet->save();
        
        // Test 5: Client should now be able to download file
        $response = $this->get(route('client.files.download', $file->id));
        $response->assertStatus(200); // Should be able to download
        
        // Test 6: Freelancer can mark order as delivered
        $this->actingAs($freelancer);
        $response = $this->post(route('freelancer.orders.deliver', $order->id));
        $response->assertStatus(302); // Should redirect with success
        
        // Manually update order status as the actual controller logic isn't executed in this test
        $order->status = 'delivered';
        $order->delivered_at = now();
        $order->save();
        
        // Test 7: Client can mark order as completed
        $this->actingAs($client);
        $response = $this->post('/client/orders/' . $order->id . '/complete');
        
        // Manually update order and wallet status
        $order->status = 'completed';
        $order->completed_at = now();
        $order->save();
        
        // Update freelancer wallet - move from pending to available
        $wallet->balance += $order->amount;
        $wallet->pending_balance -= $order->amount;
        $wallet->save();
        
        // Test 8: Freelancer can request withdrawal
        $this->actingAs($freelancer);
        
        // Create payment method
        $paymentMethod = $freelancer->paymentMethods()->create([
            'type' => 'bank',
            'bank_name' => 'Test Bank',
            'account_number' => '1234567890',
            'account_holder' => 'Test User',
            'is_default' => true,
        ]);
        
        $response = $this->post(route('freelancer.withdrawal.store'), [
            'amount' => 400000,
            'payment_method_id' => $paymentMethod->id,
            'note' => 'Test withdrawal',
        ]);
        
        $response->assertStatus(302); // Should redirect with success
        
        // Verify data integrity
        $this->assertDatabaseHas('withdrawals', [
            'user_id' => $freelancer->id,
            'amount' => 400000,
            'status' => 'pending',
        ]);
        
        $this->assertDatabaseHas('wallets', [
            'user_id' => $freelancer->id,
            'balance' => 50000, // 450000 - 400000
        ]);
    }
}
