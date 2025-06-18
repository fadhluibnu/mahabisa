<?php

require_once __DIR__ . '/vendor/autoload.php';

$app = require_once __DIR__ . '/bootstrap/app.php';
$app->make(\Illuminate\Contracts\Console\Kernel::class)->bootstrap();

// Enable query logging
\Illuminate\Support\Facades\DB::enableQueryLog();

// Setup a fake request to test the update profile method
$user = \App\Models\User::where('role', 'client')->first();
if (!$user) {
    echo "No client user found. Please create a client user first.\n";
    exit;
}

echo "Testing with user: {$user->name} (ID: {$user->id})\n\n";

// Log in as this user
\Illuminate\Support\Facades\Auth::login($user);

// Create a fake request with profile data
$request = new \Illuminate\Http\Request();
$request->merge([
    'name' => 'Test User Updated',
    'email' => $user->email, // Keep the same email to avoid unique constraint
    'phone' => '08123456789',
    'title' => 'Test Title',
    'location' => 'Jakarta, Indonesia',
    'bio' => 'This is a test bio for debugging purposes.',
    'company' => 'Test Company',
    'position' => 'Test Position',
    'website' => 'https://example.com',
    '_method' => 'put',
]);

// Create controller instance and call the updateProfile method
$controller = app(\App\Http\Controllers\ClientController::class);

try {
    echo "Attempting to update profile...\n";
    $response = $controller->updateProfile($request);
    
    echo "Response type: " . get_class($response) . "\n";
    
    if ($response instanceof \Illuminate\Http\RedirectResponse) {
        echo "Redirect to: " . $response->getTargetUrl() . "\n";
        echo "Session has 'success': " . ($response->getSession()->has('success') ? 'Yes' : 'No') . "\n";
        if ($response->getSession()->has('success')) {
            echo "Success message: " . $response->getSession()->get('success') . "\n";
        }
    }
    
    // Check if user profile was updated
    $user->refresh();
    $user->load('profile');
    
    echo "\nUpdated user data:\n";
    echo "Name: {$user->name}\n";
    echo "Email: {$user->email}\n";
    
    if ($user->profile) {
        echo "Profile exists: Yes\n";
        echo "Phone: {$user->profile->phone}\n";
        echo "Title: {$user->profile->title}\n";
        echo "Location: {$user->profile->location}\n";
        echo "Bio: {$user->profile->bio}\n";
        echo "Company: {$user->profile->company}\n";
        echo "Position: {$user->profile->position}\n";
        echo "Website: {$user->profile->website}\n";
    } else {
        echo "Profile exists: No\n";
    }
    
    // Output SQL queries
    echo "\nSQL Queries:\n";
    foreach (\Illuminate\Support\Facades\DB::getQueryLog() as $query) {
        echo $query['query'] . "\n";
        echo "Bindings: " . json_encode($query['bindings']) . "\n\n";
    }
    
} catch (\Exception $e) {
    echo "Error: " . $e->getMessage() . "\n";
    echo "File: " . $e->getFile() . ":" . $e->getLine() . "\n";
    echo "Trace:\n" . $e->getTraceAsString() . "\n";
}

echo "\nDebug complete.\n";
