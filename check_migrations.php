<?php 
require __DIR__ . '/vendor/autoload.php';
$app = require_once __DIR__ . '/bootstrap/app.php';
$app->make('Illuminate\Contracts\Console\Kernel')->bootstrap();

use Illuminate\Support\Facades\DB;
try {
    $migrations = DB::table('migrations')->get();
    echo "Migrations in database:\n";
    foreach ($migrations as $migration) {
        echo "- $migration->id: $migration->migration (Batch: $migration->batch)\n";
    }
} catch (\Exception $e) {
    echo "Error: " . $e->getMessage();
}

