<?php

// Autoload composer packages
require_once __DIR__ . '/vendor/autoload.php';

// Load Laravel app
$app = require_once __DIR__ . '/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

try {
    // Get the columns from the orders table
    $columns = \Illuminate\Support\Facades\Schema::getColumnListing('orders');

    echo "Columns in the orders table:\n";
    echo "==========================\n";
    foreach ($columns as $column) {
        echo "- " . $column . "\n";
    }
} catch (Exception $e) {
    echo "Error: " . $e->getMessage() . "\n";
    
    // Check if table exists
    $tables = \Illuminate\Support\Facades\DB::select('SHOW TABLES');
    echo "\nAvailable tables:\n";
    echo "================\n";
    foreach ($tables as $table) {
        echo "- " . reset($table) . "\n";
    }
}
