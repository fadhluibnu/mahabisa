<?php
require __DIR__ . '/vendor/autoload.php';
$app = require_once __DIR__ . '/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

$columns = DB::getSchemaBuilder()->getColumnListing('users');
echo 'Users table columns:' . PHP_EOL;
foreach ($columns as $column) {
    echo "- {$column}" . PHP_EOL;
}

