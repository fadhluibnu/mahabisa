<?php

// Autoload composer packages
require_once __DIR__ . '/vendor/autoload.php';

// Load Laravel app
$app = require_once __DIR__ . '/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

try {
    // Use schema builder to add columns directly
    echo "Attempting to add columns directly...\n";
    
    // Check if files table exists and create if not
    if (!\Illuminate\Support\Facades\Schema::hasTable('files')) {
        echo "Creating files table...\n";
        \Illuminate\Support\Facades\Schema::create('files', function ($table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->foreignId('order_id')->nullable()->constrained()->nullOnDelete();
            $table->string('name');
            $table->string('path');
            $table->string('mime_type');
            $table->integer('size');
            $table->string('status')->default('active');
            $table->timestamp('activated_at')->nullable();
            $table->timestamps();
            $table->index('status');
        });
        echo "Files table created successfully.\n";
    } else {
        // Add activated_at column if it doesn't exist
        if (!\Illuminate\Support\Facades\Schema::hasColumn('files', 'activated_at')) {
            echo "Adding activated_at column to files table...\n";
            \Illuminate\Support\Facades\Schema::table('files', function ($table) {
                $table->timestamp('activated_at')->nullable()->after('status');
            });
            echo "Added activated_at column successfully.\n";
        } else {
            echo "activated_at column already exists in files table.\n";
        }
        
        // Add status index if not exists
        echo "Adding status index to files table...\n";
        try {
            \Illuminate\Support\Facades\Schema::table('files', function ($table) {
                $table->index('status');
            });
            echo "Added status index successfully.\n";
        } catch (\Exception $e) {
            echo "Status index may already exist: " . $e->getMessage() . "\n";
        }
    }
    
    // Check if orders table exists and create if not
    if (!\Illuminate\Support\Facades\Schema::hasTable('orders')) {
        echo "Creating orders table...\n";
        \Illuminate\Support\Facades\Schema::create('orders', function ($table) {
            $table->id();
            $table->string('order_number')->unique();
            $table->foreignId('client_id')->constrained('users')->onDelete('cascade');
            $table->foreignId('freelancer_id')->constrained('users')->onDelete('cascade');
            $table->foreignId('project_id')->nullable()->constrained()->nullOnDelete();
            $table->foreignId('service_id')->nullable()->constrained()->nullOnDelete();
            $table->foreignId('proposal_id')->nullable()->constrained()->nullOnDelete();
            $table->decimal('amount', 12, 2);
            $table->decimal('platform_fee', 12, 2);
            $table->decimal('tax', 12, 2)->default(0);
            $table->decimal('total_amount', 12, 2);
            $table->text('requirements')->nullable();
            $table->date('due_date');
            $table->string('status')->default('pending');
            $table->text('cancellation_reason')->nullable();
            $table->text('dispute_reason')->nullable();
            $table->string('dispute_status')->nullable();
            $table->json('deliverables')->nullable();
            $table->json('revisions')->nullable();
            $table->timestamp('payment_completed_at')->nullable();
            $table->timestamps();
            $table->index(['status', 'payment_completed_at']);
        });
        echo "Orders table created successfully.\n";
    } else {
        // Add payment_completed_at column if it doesn't exist
        if (!\Illuminate\Support\Facades\Schema::hasColumn('orders', 'payment_completed_at')) {
            echo "Adding payment_completed_at column to orders table...\n";
            \Illuminate\Support\Facades\Schema::table('orders', function ($table) {
                $table->timestamp('payment_completed_at')->nullable()->after('updated_at');
            });
            echo "Added payment_completed_at column successfully.\n";
        } else {
            echo "payment_completed_at column already exists in orders table.\n";
        }
        
        // Add combined index if not exists
        echo "Adding status and payment_completed_at index to orders table...\n";
        try {
            \Illuminate\Support\Facades\Schema::table('orders', function ($table) {
                $table->index(['status', 'payment_completed_at']);
            });
            echo "Added combined index successfully.\n";
        } catch (\Exception $e) {
            echo "Combined index may already exist: " . $e->getMessage() . "\n";
        }
    }
    
    echo "Operation completed.\n";
    
} catch (Exception $e) {
    echo "Error: " . $e->getMessage() . "\n";
    echo "Trace: " . $e->getTraceAsString() . "\n";
}
