<?php

// Tentukan file log
$logFile = __DIR__ . '/duplikat_kolom_fix.log';
file_put_contents($logFile, "=== Perbaikan Migrasi untuk Kolom Duplikat ===\n");

function log_message($message) {
    global $logFile;
    $timestamp = date('Y-m-d H:i:s');
    $logMessage = "[$timestamp] $message\n";
    file_put_contents($logFile, $logMessage, FILE_APPEND);
    echo $logMessage;
}

log_message("Mulai proses perbaikan");

// 1. Perbaiki file migrasi role yang terduplikasi
$duplicateMigration = __DIR__ . '/database/migrations/2024_06_03_add_role_and_profile_photo_to_users_table.php';
if (file_exists($duplicateMigration)) {
    unlink($duplicateMigration);
    log_message("File duplikat yang dihapus: " . basename($duplicateMigration));
} else {
    log_message("File duplikat tidak ditemukan");
}

// 2. Perbaiki file migrasi yang ada dengan menambahkan pengecekan kolom
$correctMigration = __DIR__ . '/database/migrations/2024_06_03_000000_add_role_and_profile_photo_to_users_table.php';
if (file_exists($correctMigration)) {
    $content = file_get_contents($correctMigration);
    
    // Perbaiki metode up()
    $pattern = '/public function up\(\): void\s*{.*?Schema::table\(\'users\', function \(Blueprint \$table\) {(.*?)}\);.*?}/s';
    $replacement = 'public function up(): void
    {
        Schema::table(\'users\', function (Blueprint $table) {
            if (!Schema::hasColumn(\'users\', \'role\')) {
                $table->string(\'role\')->default(\'client\')->after(\'email\');
            }
            if (!Schema::hasColumn(\'users\', \'profile_photo_url\')) {
                $table->string(\'profile_photo_url\')->nullable()->after(\'remember_token\');
            }
        });
    }';
    
    $newContent = preg_replace($pattern, $replacement, $content);
    
    // Perbaiki metode down()
    $pattern = '/public function down\(\): void\s*{.*?Schema::table\(\'users\', function \(Blueprint \$table\) {(.*?)}\);.*?}/s';
    $replacement = 'public function down(): void
    {
        Schema::table(\'users\', function (Blueprint $table) {
            if (Schema::hasColumn(\'users\', \'role\')) {
                $table->dropColumn(\'role\');
            }
            if (Schema::hasColumn(\'users\', \'profile_photo_url\')) {
                $table->dropColumn(\'profile_photo_url\');
            }
        });
    }';
    
    $newContent = preg_replace($pattern, $replacement, $newContent);
    
    // Simpan perubahan
    file_put_contents($correctMigration, $newContent);
    log_message("File migrasi diperbaiki untuk menambahkan pengecekan kolom");
} else {
    log_message("File migrasi tidak ditemukan: " . basename($correctMigration));
}

log_message("\nProses perbaikan selesai. Silakan jalankan perintah berikut:");
log_message("php artisan migrate:fresh --seed");

log_message("\nJika masih mengalami error, pastikan untuk memeriksa file log: duplikat_kolom_fix.log");
