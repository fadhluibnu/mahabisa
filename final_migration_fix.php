<?php

// Set up error reporting for debugging
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Define log file
$logFile = __DIR__ . '/migration_fix.log';
file_put_contents($logFile, "=== Laravel Migration Fix Log (" . date('Y-m-d H:i:s') . ") ===\n\n");

function log_message($message) {
    global $logFile;
    $timestamp = date('Y-m-d H:i:s');
    $message = "[$timestamp] $message\n";
    file_put_contents($logFile, $message, FILE_APPEND);
    echo $message;
}

log_message("Starting Laravel migration fix for 'Class RevisionsToServicesTable not found'");

// Bootstrap Laravel
try {
    require __DIR__.'/vendor/autoload.php';
    $app = require_once __DIR__.'/bootstrap/app.php';
    $app->make(\Illuminate\Contracts\Console\Kernel::class)->bootstrap();
    log_message("Laravel bootstrapped successfully");
} catch (Exception $e) {
    log_message("ERROR: Could not bootstrap Laravel: " . $e->getMessage());
    exit(1);
}

// Step 1: Find and fix problematic migration files
log_message("\nStep 1: Finding problematic migration files");
$migrationsPath = database_path('migrations');

// List of known problematic files (potentially with wrong format)
$problematicFiles = [
    '2025_06_09_add_revisions_to_services_table.php',
    '2024_06_03_add_role_and_profile_photo_to_users_table.php'
];

$allFiles = scandir($migrationsPath);
$filesRemoved = 0;
$filesFixed = 0;

foreach ($allFiles as $file) {
    if ($file === '.' || $file === '..') continue;
    
    // Check if file is in the problematic list
    if (in_array($file, $problematicFiles)) {
        $fullPath = $migrationsPath . '/' . $file;
        log_message("Removing problematic file: $file");
        unlink($fullPath);
        $filesRemoved++;
        continue;
    }
    
    // Check if file is empty
    $fullPath = $migrationsPath . '/' . $file;
    $content = file_get_contents($fullPath);
    if (empty(trim($content))) {
        log_message("Removing empty file: $file");
        unlink($fullPath);
        $filesRemoved++;
        continue;
    }
    
    // Check if file contains actual class
    if (strpos($content, 'class') !== false && strpos($content, 'RevisionsToServicesTable') !== false) {
        log_message("Found reference to problematic class in: $file");
        unlink($fullPath);
        $filesRemoved++;
        continue;
    }
    
    // Check if file has correct timestamp format
    $filename = pathinfo($file, PATHINFO_FILENAME);
    if (strpos($filename, '_add_revisions_to_services') !== false) {
        $pattern = '/^\d{4}_\d{2}_\d{2}_\d{6}_/';
        if (!preg_match($pattern, $filename)) {
            log_message("Fixing timestamp format for: $file");
            unlink($fullPath);
            $filesRemoved++;
        }
    }
}

log_message("Removed $filesRemoved problematic files");

// Step 2: Create a new properly formatted migration for revisions
log_message("\nStep 2: Creating new migration file for revisions");

$timestamp = date('Y_m_d_His');
$newMigrationFileName = $timestamp . '_add_revisions_to_services_table.php';
$newMigrationPath = $migrationsPath . '/' . $newMigrationFileName;

$migrationContent = <<<'EOD'
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
EOD;

file_put_contents($newMigrationPath, $migrationContent);
log_message("Created new migration file: $newMigrationFileName");

// Step 3: Check the Service model
log_message("\nStep 3: Verifying Service model has 'revisions' field");
try {
    $model = new \App\Models\Service();
    $fillable = $model->getFillable();
    if (in_array('revisions', $fillable)) {
        log_message("Service model already has 'revisions' in fillable array");
    } else {
        log_message("ERROR: 'revisions' field not found in Service model fillable array!");
    }
} catch (Exception $e) {
    log_message("ERROR checking Service model: " . $e->getMessage());
}

// Step 4: Instructions for next steps
log_message("\nFix completed! Please run the following command to finish the process:");
log_message("php artisan migrate:fresh --seed");
log_message("\nIf you still encounter issues, check the log file at: $logFile");
