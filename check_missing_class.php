<?php

require __DIR__.'/vendor/autoload.php';

$app = require_once __DIR__.'/bootstrap/app.php';
$app->make(Illuminate\Contracts\Console\Kernel::class)->bootstrap();

// Dapatkan semua file migrasi
$migrations_path = database_path('migrations');
$files = scandir($migrations_path);

echo "Checking migration files for potential class name issues...\n\n";
$problematic_files = [];

foreach ($files as $file) {
    if ($file === '.' || $file === '..') continue;
    
    if (strpos($file, '.php') !== false) {
        $content = file_get_contents($migrations_path . '/' . $file);
        $filename = pathinfo($file, PATHINFO_FILENAME);
        
        echo "File: $file\n";
        echo "Size: " . strlen($content) . " bytes\n";
        $has_issues = false;
        
        // Cek jika file kosong atau hampir kosong
        if (strlen(trim($content)) < 10) {
            echo "WARNING: File appears to be empty or nearly empty!\n";
            $has_issues = true;
        }
        
        // Cek format timestamp
        $timestamp_pattern = '/^\d{4}_\d{2}_\d{2}_\d{6}_/';
        if (!preg_match($timestamp_pattern, $filename)) {
            echo "WARNING: File does not have the correct timestamp format (YYYY_MM_DD_HHMMSS)!\n";
            $has_issues = true;
        }
        
        if ($has_issues) {
            $problematic_files[] = $file;
        }
        
        echo "----------------------------------------\n";
    }
}

// Menampilkan file-file yang bermasalah
if (!empty($problematic_files)) {
    echo "\nProblematic files found:\n";
    foreach ($problematic_files as $file) {
        echo "- $file\n";
        // Hapus file bermasalah
        @unlink($migrations_path . '/' . $file);
    }
    echo "\nProblematic files have been deleted. Please run 'php artisan migrate:fresh --seed' again.\n";
} else {
    echo "\nNo problematic migration files found.\n";
}

echo "\nDone checking migrations.\n";
