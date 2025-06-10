#!/bin/bash

# Fix database migrations
echo "Fixing Laravel migration issues..."

# Pastikan nama file migrasi mengikuti konvensi Laravel
echo "Checking migration files..."

# Hapus file migrasi yang kosong
find database/migrations -type f -empty -delete
echo "Removed empty migration files"

# Hapus secara spesifik file migrasi yang bermasalah
rm -f database/migrations/2024_06_03_add_role_and_profile_photo_to_users_table.php
rm -f database/migrations/2025_06_09_add_revisions_to_services_table.php
rm -f database/migrations/2025_06_08_095840_add_revisions_to_services_table.php 
rm -f database/migrations/2025_06_08_095658_add_revisions_to_services_table.php
rm -f database/2025_06_06_144914_create_user_profiles_table.php
echo "Removed problematic migration files"

# Jalankan migrasi dari awal
echo "Running fresh migrations..."
php artisan migrate:fresh --seed

# Tampilkan status migrasi
echo "Migration status:"
php artisan migrate:status

echo "Process completed!"