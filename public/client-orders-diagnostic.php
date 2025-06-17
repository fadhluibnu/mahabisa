<?php

// Client Controller Diagnostic
// Place this file in the public directory and access it via browser at /client-orders-diagnostic.php

// 1. Import necessary files and bootstrap the application
require __DIR__ . '/../vendor/autoload.php';
$app = require_once __DIR__ . '/../bootstrap/app.php';
$app->make(\Illuminate\Contracts\Console\Kernel::class)->bootstrap();

// 2. Get a user and check if orders work
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use App\Models\Order;

echo "<h1>Client Orders Diagnostic</h1>";
echo "<pre>";

// Find a client user
$client = User::where('role', 'client')->first();
if (!$client) {
    echo "No client users found in the database.\n";
    exit(1);
}

echo "Found client user: " . $client->name . " (ID: " . $client->id . ")\n\n";

// Test the clientOrders relationship
try {
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
} catch (\Exception $e) {
    echo "Error accessing clientOrders: " . $e->getMessage() . "\n";
    echo $e->getTraceAsString() . "\n";
}

// 3. Check if the ClientController methods are defined
echo "\n<h2>Controller Method Check</h2>\n";

$reflector = new ReflectionClass('App\\Http\\Controllers\\ClientController');
$methods = $reflector->getMethods(ReflectionMethod::IS_PUBLIC);

$hasOrdersMethod = false;
$hasShowOrderMethod = false;

foreach ($methods as $method) {
    if ($method->getName() === 'orders') {
        $hasOrdersMethod = true;
        echo "orders() method exists in ClientController.\n";
    }
    if ($method->getName() === 'showOrder') {
        $hasShowOrderMethod = true;
        echo "showOrder() method exists in ClientController.\n";
    }
}

if (!$hasOrdersMethod) {
    echo "WARNING: orders() method is missing in ClientController!\n";
}

if (!$hasShowOrderMethod) {
    echo "WARNING: showOrder() method is missing in ClientController!\n";
}

// 4. Check if the routes are registered
echo "\n<h2>Route Check</h2>\n";

$routes = collect(\Illuminate\Support\Facades\Route::getRoutes());

$clientOrdersRoute = $routes->first(function ($route) {
    return $route->getName() === 'client.orders';
});

$clientShowOrderRoute = $routes->first(function ($route) {
    return $route->getName() === 'client.orders.show';
});

if ($clientOrdersRoute) {
    echo "client.orders route is registered and points to " . $clientOrdersRoute->getActionName() . "\n";
} else {
    echo "WARNING: client.orders route is not found!\n";
}

if ($clientShowOrderRoute) {
    echo "client.orders.show route is registered and points to " . $clientShowOrderRoute->getActionName() . "\n";
} else {
    echo "WARNING: client.orders.show route is not found!\n";
}

echo "</pre>";

echo "<h2>Diagnostic Links</h2>";
echo "<ul>";
echo "<li><a href='/client/orders' target='_blank'>Test Client Orders Page</a></li>";
if (count($orders) > 0) {
    echo "<li><a href='/client/orders/{$order->id}' target='_blank'>Test Order Detail Page</a></li>";
}
echo "</ul>";

echo "<h2>Recommendations</h2>";
echo "<ul>";
echo "<li>Check the routes.php file to ensure client.orders and client.orders.show are correctly defined</li>";
echo "<li>Make sure the ClientController has correctly implemented orders() and showOrder() methods</li>";
echo "<li>Ensure the clientOrders relationship is properly defined in the User model</li>";
echo "<li>Check for JavaScript console errors in the browser when accessing the orders page</li>";
echo "<li>Verify that the order templates exist: resources/js/Pages/Client/Orders.jsx and OrderDetail.jsx</li>";
echo "</ul>";
