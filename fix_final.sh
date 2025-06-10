#!/bin/bash

echo "===== Laravel Migration Fix for 'Class RevisionsToServicesTable not found' ====="
echo "Starting the fix process..."

# 1. Check for empty migration files and remove them
echo -e "\n1. Removing empty migration files..."
find database/migrations -type f -size 0 -exec rm {} \;

# 2. Check for improperly named files
echo -e "\n2. Checking for improperly named migration files..."
for file in database/migrations/*_add_revisions_to_services_table.php; do
  if [[ $file != *[0-9][0-9][0-9][0-9][0-9][0-9]_* ]]; then
    echo "Removing incorrectly formatted file: $file"
    rm -f "$file"
  fi
done

# 3. Ensure no conflicts with duplicate migration purposes
echo -e "\n3. Ensuring no duplicate migration purposes..."
if [ $(find database/migrations -name "*add_revisions_to_services_table.php" | wc -l) -gt 1 ]; then
  echo "Found multiple revisions migrations, keeping only the latest..."
  ls -t database/migrations/*add_revisions_to_services_table.php | tail -n +2 | xargs rm -f
fi

# 4. Clear Laravel cache
echo -e "\n4. Clearing Laravel cache..."
php artisan config:clear
php artisan cache:clear
php artisan view:clear
php artisan route:clear

# 5. Run migrations
echo -e "\n5. Running fresh migrations with seed..."
php artisan migrate:fresh --seed

# 6. Show migration status
echo -e "\n6. Migration status:"
php artisan migrate:status

echo -e "\nProcess completed!"
echo "If you still encounter issues, check manually for any remaining problematic migration files."
