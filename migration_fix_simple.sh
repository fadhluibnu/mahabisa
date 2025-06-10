#!/bin/bash

# Merupakan solusi utama untuk masalah "Class RevisionsToServicesTable not found"
# Perhatikan baris-baris terminal di bawah terhadap log atau error yang ditampilkan
# Jalankan dengan ./migration_fix_simple.sh > output.log 2>&1 untuk mencatat semua output

echo "=== Laravel Migration Fix Script ==="
echo "Memulai proses perbaikan..."

# 1. Hapus file migrasi yang bermasalah
echo -e "\n1. Menghapus file migrasi yang bermasalah..."
rm -f database/migrations/2025_06_09_add_revisions_to_services_table.php
rm -f database/migrations/2025_06_08_095840_add_revisions_to_services_table.php
rm -f database/migrations/2025_06_08_095658_add_revisions_to_services_table.php
rm -f database/migrations/2024_06_03_add_role_and_profile_photo_to_users_table.php

# 2. Buat file migrasi baru dengan format timestamp yang benar
echo -e "\n2. Membuat file migrasi baru untuk revisions..."
TIMESTAMP=$(date +%Y_%m_%d_%H%M%S)
NEW_FILE="database/migrations/${TIMESTAMP}_add_revisions_to_services_table.php"

cat > "$NEW_FILE" << 'EOF'
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
EOF

echo "File migrasi baru dibuat: $NEW_FILE"

# 3. Pindahkan file user_profiles dari direktori yang salah
echo -e "\n3. Memindahkan file yang salah lokasi..."
if [ -f "database/2025_06_06_144914_create_user_profiles_table.php" ]; then
    mv "database/2025_06_06_144914_create_user_profiles_table.php" "database/migrations/"
    echo "File user_profiles dipindahkan ke direktori migrations"
fi

# 4. Bersihkan cache Laravel
echo -e "\n4. Membersihkan cache Laravel..."
php artisan config:clear
php artisan cache:clear
php artisan view:clear

# 5. Instruksi menjalankan migrasi
echo -e "\n5. Proses selesai! Silakan jalankan perintah berikut:"
echo -e "   php artisan migrate:fresh --seed"
echo -e "\nJika masih muncul error, pastikan tidak ada file migrasi lain yang bermasalah."
