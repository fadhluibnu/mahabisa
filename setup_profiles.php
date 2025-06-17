<?php

require_once __DIR__ . '/vendor/autoload.php';

$app = require_once __DIR__ . '/bootstrap/app.php';
$app->make(\Illuminate\Contracts\Console\Kernel::class)->bootstrap();

use App\Models\User;
use App\Models\UserProfile;

// Get all users
$users = User::all();

foreach ($users as $user) {
    // Check if the user already has a profile
    if (!$user->profile) {
        echo "Creating profile for user {$user->name}\n";
        
        // Create a basic profile
        UserProfile::create([
            'user_id' => $user->id,
            'bio' => 'This is a default bio for ' . $user->name,
            'phone' => '08123456789',
            'title' => 'Default Title',
            'location' => 'Default City, Indonesia',
            'company' => 'Default Company',
            'position' => 'Default Position',
            'website' => 'https://example.com',
            'phone_number' => '08123456789', // This is also set to ensure backward compatibility
            'city' => 'Default City',
            'province' => 'Default Province',
        ]);
    } else {
        echo "Updating profile for user {$user->name}\n";
        
        // Update the existing profile with the new fields
        $user->profile->update([
            'phone' => $user->profile->phone_number ?? '08123456789',
            'title' => $user->profile->title ?? 'Default Title',
            'location' => $user->profile->city ? ($user->profile->city . ', ' . ($user->profile->province ?? 'Indonesia')) : 'Default City, Indonesia',
            'company' => $user->profile->company ?? 'Default Company',
            'position' => $user->profile->position ?? 'Default Position',
        ]);
    }
}

echo "Profile setup complete!\n";
