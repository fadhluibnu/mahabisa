<?php

// Load composer dependencies
require __DIR__ . '/../vendor/autoload.php';

// Set headers for JSON response
header('Content-Type: application/json');

// Initialize Pusher
$pusher = new Pusher\Pusher(
    '3742518f5054c170856c', // PUSHER_APP_KEY
    '1b84af8969fddf601f4a', // PUSHER_APP_SECRET
    '1459001',              // PUSHER_APP_ID
    [
        'cluster' => 'mt1',
        'useTLS' => true
    ]
);

// Create a test message
$message = [
    'message' => 'This is a test message',
    'sender' => 'Server',
    'timestamp' => date('Y-m-d H:i:s')
];

// Send the message to the test-channel
$result = $pusher->trigger('test-channel', 'test-event', $message);

// Return result
echo json_encode([
    'success' => true,
    'message' => 'Test message sent',
    'result' => $result,
    'data' => $message
]);
