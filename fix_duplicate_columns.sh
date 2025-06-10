#!/bin/bash

# Simplified script to fix migration error "Duplicate column name 'role'"
echo "=== Laravel Migration Fix for Duplicate Columns ==="

# 1. Create a log file for output
LOG_FILE="migration_error_fix.log"
echo "Log file will be created at: $LOG_FILE"
echo "Starting migration fix at $(date)" > "$LOG_FILE"

# 2. Delete the duplicate migration file
echo "Checking for duplicate migration files..."
if [ -f "database/migrations/2024_06_03_add_role_and_profile_photo_to_users_table.php" ]; then
    rm -f "database/migrations/2024_06_03_add_role_and_profile_photo_to_users_table.php"
    echo "Deleted duplicate file: 2024_06_03_add_role_and_profile_photo_to_users_table.php" | tee -a "$LOG_FILE"
else
    echo "No duplicate migration file found" | tee -a "$LOG_FILE"
fi

# 3. Clear Laravel cache
echo "Clearing Laravel cache..."
php artisan config:clear >> "$LOG_FILE" 2>&1
php artisan cache:clear >> "$LOG_FILE" 2>&1
php artisan route:clear >> "$LOG_FILE" 2>&1

# 4. Run migrations with output captured to log
echo "Running migrations..."
php artisan migrate:fresh --seed -v >> "$LOG_FILE" 2>&1
RESULT=$?

if [ $RESULT -eq 0 ]; then
    echo "Migration completed successfully!" | tee -a "$LOG_FILE"
    echo "You can check the full output in $LOG_FILE"
else
    echo "Migration encountered errors. Check $LOG_FILE for details." | tee -a "$LOG_FILE"
    echo "Last 10 lines of log:" | tee -a "$LOG_FILE"
    tail -n 10 "$LOG_FILE" | tee -a "$LOG_FILE"
fi
