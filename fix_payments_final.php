<?php

// Autoload composer packages
require_once __DIR__ . '/vendor/autoload.php';

// Load Laravel app
$app = require_once __DIR__ . '/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

try {
    echo "Starting final database fixes...\n";
    
    // Get PDO connection directly for raw SQL statements
    $pdo = \Illuminate\Support\Facades\DB::connection()->getPdo();
    
    // Step 1: Check if the orders table exists and create it if not
    echo "Checking orders table...\n";
    $ordersExists = \Illuminate\Support\Facades\Schema::hasTable('orders');
    
    if (!$ordersExists) {
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
            $table->timestamp('delivered_at')->nullable();
            $table->timestamp('payment_completed_at')->nullable();
            $table->timestamps();
            
            // Add combined index for status and payment_completed_at
            $table->index(['status', 'payment_completed_at']);
        });
        echo "Orders table created successfully.\n";
    } else {
        // Check if payment_completed_at column exists
        if (!\Illuminate\Support\Facades\Schema::hasColumn('orders', 'payment_completed_at')) {
            echo "Adding payment_completed_at column to orders table...\n";
            
            // Use raw SQL for more control
            try {
                $pdo->exec("ALTER TABLE orders ADD COLUMN payment_completed_at TIMESTAMP NULL AFTER updated_at");
                echo "Added payment_completed_at column successfully.\n";
            } catch (\Exception $e) {
                echo "Error adding column: " . $e->getMessage() . "\n";
            }
        }
        
        // Check if delivered_at column exists
        if (!\Illuminate\Support\Facades\Schema::hasColumn('orders', 'delivered_at')) {
            echo "Adding delivered_at column to orders table...\n";
            
            try {
                $pdo->exec("ALTER TABLE orders ADD COLUMN delivered_at TIMESTAMP NULL AFTER updated_at");
                echo "Added delivered_at column successfully.\n";
            } catch (\Exception $e) {
                echo "Error adding column: " . $e->getMessage() . "\n";
            }
        }
        
        // Add index if it doesn't exist
        try {
            $pdo->exec("CREATE INDEX orders_status_payment_completed_at_index ON orders (status, payment_completed_at)");
            echo "Added index on status and payment_completed_at.\n";
        } catch (\Exception $e) {
            echo "Index may already exist: " . $e->getMessage() . "\n";
        }
    }
    
    // Step 2: Check if files table exists and add the activated_at column if needed
    echo "\nChecking files table...\n";
    $filesExists = \Illuminate\Support\Facades\Schema::hasTable('files');
    
    if (!$filesExists) {
        echo "Files table doesn't exist, creating it...\n";
        \Illuminate\Support\Facades\Schema::create('files', function ($table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->morphs('fileable');
            $table->string('original_name');
            $table->string('file_name');
            $table->string('file_path');
            $table->string('file_type');
            $table->bigInteger('file_size');
            $table->boolean('is_public')->default(false);
            $table->string('status')->default('pending');
            $table->timestamp('activated_at')->nullable();
            $table->integer('download_count')->default(0);
            $table->timestamp('last_download_at')->nullable();
            $table->timestamps();
            
            // Index for status
            $table->index('status');
        });
        echo "Files table created successfully.\n";
    } else {
        // Check if activated_at column exists
        if (!\Illuminate\Support\Facades\Schema::hasColumn('files', 'activated_at')) {
            echo "Adding activated_at column to files table...\n";
            
            // Use raw SQL
            try {
                $pdo->exec("ALTER TABLE files ADD COLUMN activated_at TIMESTAMP NULL AFTER status");
                echo "Added activated_at column successfully.\n";
            } catch (\Exception $e) {
                echo "Error adding column: " . $e->getMessage() . "\n";
            }
        }
        
        // Make sure we have a status index
        try {
            $pdo->exec("CREATE INDEX files_status_index ON files (status)");
            echo "Added index on status.\n";
        } catch (\Exception $e) {
            echo "Index may already exist: " . $e->getMessage() . "\n";
        }
    }
    
    echo "\nVerifying order model compatibility...\n";
    if (class_exists('\App\Models\Order')) {
        $order = new \App\Models\Order();
        echo "Order model loaded successfully.\n";
        $fillable = $order->getFillable();
        echo "Fillable attributes: " . implode(', ', $fillable) . "\n";
    } else {
        echo "Order model not found.\n";
    }
    
    echo "\nVerifying file model compatibility...\n";
    if (class_exists('\App\Models\File')) {
        $file = new \App\Models\File();
        echo "File model loaded successfully.\n";
        $fillable = $file->getFillable();
        echo "Fillable attributes: " . implode(', ', $fillable) . "\n";
    } else {
        echo "File model not found.\n";
    }
    
    echo "\nDatabase fixes completed successfully.\n";
    
} catch (Exception $e) {
    echo "Error: " . $e->getMessage() . "\n";
    echo "Trace: " . $e->getTraceAsString() . "\n";
}
