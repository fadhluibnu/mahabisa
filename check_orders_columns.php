<?php require 'vendor/autoload.php'; require 'bootstrap/app.php'; $app->make(\Illuminate\Contracts\Console\Kernel::class)->bootstrap(); echo json_encode(Schema::getColumnListing('orders')); ?>
