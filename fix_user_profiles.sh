#!/bin/bash

# Script untuk memperbaiki masalah migrasi user_profiles dan menjalankan migrasi ulang
echo "=== Perbaikan Migrasi user_profiles ==="

# Lokasi workspace
WORKSPACE_DIR="/media/iybnuw/SATA/KULIAH/SEMESTER 4/RPL/mahabisa"
cd "$WORKSPACE_DIR" || { echo "Gagal mengakses direktori workspace"; exit 1; }

# Hapus file migrasi duplikat
echo "1. Menghapus file migrasi user_profiles duplikat..."
find database/migrations -name "*create_user_profiles_table.php" ! -name "2025_06_06_144937_create_user_profiles_table.php" -delete

# Tambahkan pengecekan tabel ke file migrasi yang tersisa
echo "2. Modifikasi file migrasi yang tersisa..."
USER_PROFILES_FILE="database/migrations/2025_06_06_144937_create_user_profiles_table.php"

if [ -f "$USER_PROFILES_FILE" ]; then
    # Gunakan sed untuk mengedit file
    sed -i 's/public function up(): void.*Schema::create/public function up(): void\n    {\n        if (!Schema::hasTable('\''user_profiles'\'')) {\n            Schema::create/g' "$USER_PROFILES_FILE"
    sed -i 's/$table->timestamps();\n[ ]*});\s*}/$table->timestamps();\n            });\n        }\n    }/g' "$USER_PROFILES_FILE"
    
    echo "File migrasi diperbarui"
else
    echo "PERINGATAN: File migrasi $USER_PROFILES_FILE tidak ditemukan!"
fi

# Bersihkan cache Laravel
echo "3. Membersihkan cache Laravel..."
php artisan config:clear
php artisan cache:clear
php artisan route:clear
php artisan view:clear

# Jalankan migrasi
echo "4. Menjalankan migrasi ulang..."
php artisan migrate:fresh --seed

echo "Proses selesai!"
