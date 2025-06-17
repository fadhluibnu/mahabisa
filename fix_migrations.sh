#!/bin/bash

echo "===== LARAVEL MIGRATION FIX SCRIPT ====="
echo "This script will fix the migration issues with the 'Class RevisionsToServicesTable not found' error"
echo

# Step 1: Check and delete problematic migration files
echo "Step 1: Removing problematic migration files..."
php check_missing_class.php
echo

# Step 2: Fix Service model to include 'revisions' field
echo "Step 2: Fixing Service model..."
php fix_services_table.php
echo

# Step 3: Running migrations
echo "Step 3: Running fresh migration and seed..."
php artisan migrate:fresh --seed

echo
echo "Process complete! Check for any errors above."
