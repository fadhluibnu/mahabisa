<?php

// Script to test the client orders functionality

namespace Tests;

use App\Models\User;
use App\Models\Order;
use Illuminate\Support\Facades\Auth;

require __DIR__ . '/vendor/autoload.php';

// Create test client user
$client = User::where('role', 'client')->first();
if (!$client) {
    echo "No client users found in the database.\n";
    exit(1);
}

echo "Found client user: " . $client->name . " (ID: " . $client->id . ")\n";

// Test the clientOrders relationship
$orders = $client->clientOrders;
echo "Client has " . count($orders) . " orders\n";

// Check order fields
if (count($orders) > 0) {
    $order = $orders->first();
    echo "First order details:\n";
    echo "- Order ID: " . $order->id . "\n";
    echo "- Client ID: " . $order->client_id . "\n";
    echo "- Freelancer ID: " . $order->freelancer_id . "\n";
    echo "- Status: " . $order->status . "\n";
    echo "- Created: " . $order->created_at . "\n";
}

// Check route registration
echo "\nVerifying routes...\n";
echo "Run the following command to check client order routes:\n";
echo "php artisan route:list | grep 'client.*orders'\n";

echo "\nDebugging suggestions:\n";
echo "1. Check the log file at storage/logs/laravel.log after accessing /client/orders\n";
echo "2. Make sure the 'client.orders' and 'client.orders.show' routes are properly registered\n";
echo "3. Verify the ClientController@orders and ClientController@showOrder methods are being called\n";
echo "4. Check for JavaScript console errors in the browser\n";

echo "\nImportant Note:\n";
echo "If there are no errors in the logs and the routes seem correct, the issue might be in the frontend\n";
echo "component or the Inertia rendering process.\n";
