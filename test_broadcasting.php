<?php
// This script tests the broadcast configuration and service provider

require __DIR__ . '/vendor/autoload.php';

// Bootstrap the application
$app = require_once __DIR__ . '/bootstrap/app.php';

// Get the broadcast manager from the container
$broadcastManager = $app->make(\Illuminate\Broadcasting\BroadcastManager::class);

// Check what driver is being used
$driver = $app['config']->get('broadcasting.default');
echo "Default broadcast driver: $driver\n";

// Get the connections configuration
$connections = $app['config']->get('broadcasting.connections');
echo "Available broadcast connections: " . implode(', ', array_keys($connections)) . "\n";

// Check if Pusher is configured
if (isset($connections['pusher'])) {
    echo "Pusher configuration found.\n";
    
    // Check if key is configured
    $key = $connections['pusher']['key'];
    echo "Pusher key: " . ($key ? "Configured (" . substr($key, 0, 5) . "...)" : "Missing") . "\n";
    
    // Check if secret is configured
    $secret = $connections['pusher']['secret'];
    echo "Pusher secret: " . ($secret ? "Configured" : "Missing") . "\n";
    
    // Check if app_id is configured
    $appId = $connections['pusher']['app_id'];
    echo "Pusher app ID: " . ($appId ? "Configured ($appId)" : "Missing") . "\n";
}

try {
    // Try to get the broadcaster
    $broadcaster = $broadcastManager->driver();
    echo "Successfully created broadcaster instance of class: " . get_class($broadcaster) . "\n";
} catch (\Exception $e) {
    echo "Error creating broadcaster: " . $e->getMessage() . "\n";
}

echo "Test completed.\n";
