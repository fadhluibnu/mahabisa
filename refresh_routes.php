<?php

// A simple script to refresh Ziggy routes
// This is useful for debugging route issues

use Illuminate\Support\Facades\Artisan;

require __DIR__ . '/vendor/autoload.php';
$app = require_once __DIR__ . '/bootstrap/app.php';
$app->make(Illuminate\Contracts\Console\Kernel::class)->bootstrap();

// Clear route cache
Artisan::call('route:clear');
echo "Route cache cleared.\n";

// Generate route cache
Artisan::call('route:cache');
echo "Routes cached successfully.\n";

// Generate Ziggy routes
Artisan::call('ziggy:generate');
echo "Ziggy routes generated successfully.\n";

echo "All route caches refreshed.\n";
