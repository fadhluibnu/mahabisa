<?php

// Autoload composer packages
require_once __DIR__ . '/vendor/autoload.php';

// Load Laravel app
$app = require_once __DIR__ . '/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

try {
    echo "Testing database operations...\n";
    
    // Check if we can use the Orders model
    echo "Fetching orders from database...\n";
    $orders = \App\Models\Order::all();
    echo "Found " . count($orders) . " orders.\n";
    
    // Check if we can use the Files model
    echo "\nFetching files from database...\n";
    $files = \App\Models\File::all();
    echo "Found " . count($files) . " files.\n";
    
    // Check if payment_completed_at can be updated
    echo "\nTesting payment_completed_at update...\n";
    if (count($orders) > 0) {
        $order = $orders->first();
        $order->payment_completed_at = now();
        $order->save();
        echo "Updated payment_completed_at for order ID: " . $order->id . "\n";
    } else {
        echo "Creating test order...\n";
        // Find users for the order
        $users = \App\Models\User::take(2)->get();
        if (count($users) >= 2) {
            $client = $users[0];
            $freelancer = $users[1];
            
            $order = new \App\Models\Order();
            $order->order_number = 'TEST-' . time();
            $order->client_id = $client->id;
            $order->freelancer_id = $freelancer->id;
            $order->amount = 100.00;
            $order->platform_fee = 10.00;
            $order->tax = 0;
            $order->total_amount = 110.00;
            $order->due_date = now()->addDays(7);
            $order->status = 'completed';
            $order->payment_completed_at = now();
            $order->save();
            
            echo "Created test order with ID: " . $order->id . "\n";
        } else {
            echo "Not enough users found to create a test order.\n";
        }
    }
    
    // Check if activated_at can be updated
    echo "\nTesting activated_at update...\n";
    if (count($files) > 0) {
        $file = $files->first();
        $file->activated_at = now();
        $file->save();
        echo "Updated activated_at for file ID: " . $file->id . "\n";
    } else {
        echo "No files found to update.\n";
    }
    
    echo "\nDatabase operations test completed.\n";
    
} catch (Exception $e) {
    echo "Error: " . $e->getMessage() . "\n";
    echo "Trace: " . $e->getTraceAsString() . "\n";
}
