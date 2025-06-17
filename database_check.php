<?php

// Autoload composer packages
require_once __DIR__ . '/vendor/autoload.php';

// Load Laravel app
$app = require_once __DIR__ . '/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

try {
    // Check DB connection
    echo "Testing database connection...\n";
    $connection = \Illuminate\Support\Facades\DB::connection();
    echo "Connection established: " . $connection->getName() . "\n\n";
    
    // List all tables
    echo "Available tables:\n";
    echo "================\n";
    $tables = \Illuminate\Support\Facades\DB::select('SHOW TABLES');
    foreach ($tables as $table) {
        echo "- " . reset($table) . "\n";
    }
    
    // Check migrations table
    echo "\nMigrations status:\n";
    echo "=================\n";
    $migrations = \Illuminate\Support\Facades\DB::table('migrations')->get();
    foreach ($migrations as $migration) {
        echo "- {$migration->migration} (Batch: {$migration->batch})\n";
    }
    
    // Check if orders table exists
    echo "\nChecking orders table...\n";
    if (\Illuminate\Support\Facades\Schema::hasTable('orders')) {
        echo "Orders table exists. Columns:\n";
        $columns = \Illuminate\Support\Facades\Schema::getColumnListing('orders');
        foreach ($columns as $column) {
            echo "- " . $column . "\n";
        }
    } else {
        echo "Orders table does not exist!\n";
    }
    
} catch (Exception $e) {
    echo "Error: " . $e->getMessage() . "\n";
    echo "Trace: " . $e->getTraceAsString() . "\n";
}
