<?php
require __DIR__ . '/vendor/autoload.php';

// Check if Pusher class is available
if (class_exists('Pusher\Pusher')) {
    echo "Pusher class is available!\n";
    
    // Try to instantiate Pusher
    try {
        $pusher = new Pusher\Pusher(
            env('PUSHER_APP_KEY', '3742518f5054c170856c'),
            env('PUSHER_APP_SECRET', '1b84af8969fddf601f4a'), 
            env('PUSHER_APP_ID', '1459001'), 
            [
                'cluster' => env('PUSHER_APP_CLUSTER', 'mt1'),
                'useTLS' => true
            ]
        );
        echo "Pusher instance created successfully!\n";
    } catch (\Exception $e) {
        echo "Error creating Pusher instance: " . $e->getMessage() . "\n";
    }
} else {
    echo "Pusher class is NOT available!\n";
}

// Function to mimic Laravel's env() helper
function env($key, $default = null) {
    return $_ENV[$key] ?? $default;
}
