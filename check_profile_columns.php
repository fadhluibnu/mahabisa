<?php

require_once __DIR__ . '/vendor/autoload.php';

$app = require_once __DIR__ . '/bootstrap/app.php';
$app->make(\Illuminate\Contracts\Console\Kernel::class)->bootstrap();

// Get the schema information for the user_profiles table
$columns = \Illuminate\Support\Facades\Schema::getColumnListing('user_profiles');
echo "Columns in user_profiles table:\n";
print_r($columns);

// Get a sample user profile if exists
$profile = \App\Models\UserProfile::first();
if ($profile) {
    echo "\n\nSample user profile data:\n";
    print_r($profile->toArray());
} else {
    echo "\n\nNo user profile records found.";
}
