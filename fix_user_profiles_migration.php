<?php

// Set lokasi file log
$logFile = __DIR__ . '/migration_user_profiles_fix.log';
file_put_contents($logFile, "=== Perbaikan Migrasi user_profiles (" . date('Y-m-d H:i:s') . ") ===\n\n");

function log_message($message) {
    global $logFile;
    file_put_contents($logFile, "$message\n", FILE_APPEND);
    echo "$message\n";
}

// 1. Cari file migrasi user_profiles
$migrationsPath = __DIR__ . '/database/migrations';
$files = scandir($migrationsPath);

$userProfileFiles = [];
foreach ($files as $file) {
    if (strpos($file, 'create_user_profiles_table.php') !== false) {
        $userProfileFiles[] = $file;
    }
}

log_message("File migrasi user_profiles ditemukan: " . count($userProfileFiles));
foreach ($userProfileFiles as $file) {
    log_message("- $file");
}

// 2. Hapus file migrasi duplikat jika ada lebih dari satu
if (count($userProfileFiles) > 1) {
    // Tetap simpan file dengan nama 2025_06_06_144937_create_user_profiles_table.php
    foreach ($userProfileFiles as $file) {
        if ($file !== '2025_06_06_144937_create_user_profiles_table.php') {
            $fullPath = $migrationsPath . '/' . $file;
            if (unlink($fullPath)) {
                log_message("File dihapus: $file");
            } else {
                log_message("GAGAL menghapus: $file");
            }
        }
    }
}

// 3. Modifikasi file migrasi yang tersisa untuk menambahkan pengecekan tabel
$targetFile = $migrationsPath . '/2025_06_06_144937_create_user_profiles_table.php';
if (file_exists($targetFile)) {
    $content = file_get_contents($targetFile);
    
    // Tambahkan pengecekan tabel
    $content = str_replace(
        'public function up(): void
    {
        Schema::create(\'user_profiles\',',
        'public function up(): void
    {
        if (!Schema::hasTable(\'user_profiles\')) {
            Schema::create(\'user_profiles\',',
        $content
    );
    
    // Tutup kondisional if
    $content = str_replace(
        '            $table->timestamps();
        });',
        '            $table->timestamps();
        });
        }',
        $content
    );
    
    file_put_contents($targetFile, $content);
    log_message("File migrasi user_profiles diperbarui dengan pengecekan tabel");
} else {
    log_message("PERINGATAN: File migrasi user_profiles tidak ditemukan!");
}

// 4. Bersihkan cache Laravel jika memungkinkan
if (file_exists(__DIR__ . '/artisan')) {
    log_message("Membersihkan cache Laravel...");
    
    // Eksekusi perintah artisan dalam subprocess
    exec('cd "' . __DIR__ . '" && php artisan config:clear 2>&1', $output);
    log_message("Output config:clear: " . implode("\n", $output));
    
    exec('cd "' . __DIR__ . '" && php artisan cache:clear 2>&1', $output);
    log_message("Output cache:clear: " . implode("\n", $output));
}

log_message("\nProses perbaikan selesai. Sekarang jalankan perintah:");
log_message("cd \"" . __DIR__ . "\" && php artisan migrate:fresh --seed");
log_message("\nLog detail tersimpan di: $logFile");
