<?php

$log_file = __DIR__ . '/migration_fix.log';
file_put_contents($log_file, "===== LARAVEL MIGRATION FIX SCRIPT =====\n");
file_put_contents($log_file, "This script will fix the migration issues with the 'Class RevisionsToServicesTable not found' error\n\n", FILE_APPEND);

echo "===== LARAVEL MIGRATION FIX SCRIPT =====\n";
echo "This script will fix the migration issues with the 'Class RevisionsToServicesTable not found' error\n\n";

require __DIR__.'/vendor/autoload.php';
$app = require_once __DIR__.'/bootstrap/app.php';
$app->make(Illuminate\Contracts\Console\Kernel::class)->bootstrap();

// Step 1: Delete problematic migration files
$msg = "Step 1: Removing problematic migration files...\n";
echo $msg;
file_put_contents($log_file, $msg, FILE_APPEND);

$migrations_path = database_path('migrations');
$problem_patterns = [
    '2025_06_09_add_revisions_to_services_table.php',
    '2025_06_08_095840_add_revisions_to_services_table.php',
    '2025_06_08_095658_add_revisions_to_services_table.php',
    '2024_06_03_add_role_and_profile_photo_to_users_table.php'
];

foreach ($problem_patterns as $pattern) {
    $file_path = $migrations_path . '/' . $pattern;
    if (file_exists($file_path)) {
        unlink($file_path);
        $msg = "Removed: $pattern\n";
        echo $msg;
        file_put_contents($log_file, $msg, FILE_APPEND);
    }
}

// Step 2: Create a new properly formatted migration for revisions
echo "\nStep 2: Creating new migration file for revisions...\n";

$new_migration_content = <<<'EOF'
<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('services', function (Blueprint $table) {
            if (!Schema::hasColumn('services', 'revisions')) {
                $table->integer('revisions')->default(0)->after('delivery_time');
            }
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('services', function (Blueprint $table) {
            if (Schema::hasColumn('services', 'revisions')) {
                $table->dropColumn('revisions');
            }
        });
    }
};
EOF;

$timestamp = date('Y_m_d_His');
$new_file = $migrations_path . '/' . $timestamp . '_add_revisions_to_services_table.php';
file_put_contents($new_file, $new_migration_content);
echo "Created: " . basename($new_file) . "\n";

// Step 3: Update Service model to include 'revisions' field
echo "\nStep 3: Updating Service model to include 'revisions' field...\n";
try {
    $service_file = app_path('Models/Service.php');
    $content = file_get_contents($service_file);
    
    // Mencari property $fillable
    if (preg_match('/protected\s+\$fillable\s*=\s*\[(.*?)\];/s', $content, $matches)) {
        $current_fillable = $matches[1];
        
        // Tambahkan 'revisions' jika belum ada
        if (strpos($current_fillable, "'revisions'") === false && strpos($current_fillable, '"revisions"') === false) {
            $new_fillable = rtrim($current_fillable);
            if (substr(trim($new_fillable), -1) === "'") {
                $new_fillable .= ", 'revisions'";
            } else if (substr(trim($new_fillable), -1) === '"') {
                $new_fillable .= ', "revisions"';
            } else {
                $new_fillable .= "'revisions'";
            }
            
            $updated_content = str_replace($matches[0], "protected \$fillable = [$new_fillable];", $content);
            file_put_contents($service_file, $updated_content);
            echo "Service model updated to include 'revisions'\n";
        } else {
            echo "'revisions' field already exists in Service model\n";
        }
    } else {
        echo "Could not find \$fillable property in Service model\n";
    }
} catch (Exception $e) {
    echo "Error updating Service model: " . $e->getMessage() . "\n";
}

echo "\nStep 4: Run migrations manually with the following command:\n";
echo "php artisan migrate:fresh --seed\n\n";
echo "Process complete! Run the migration command above to finalize the process.\n";
