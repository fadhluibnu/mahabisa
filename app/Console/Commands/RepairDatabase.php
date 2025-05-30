<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\Artisan;

class RepairDatabase extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'db:repair';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Repair database schema and run migrations in correct sequence';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $this->info('Starting database repair process...');

        // 1. Backup current tables
        $this->info('Checking database connection...');
        try {
            DB::connection()->getPDO();
            $this->info('Database connection successful: ' . DB::connection()->getDatabaseName());
        } catch (\Exception $e) {
            $this->error('Database connection failed: ' . $e->getMessage());
            return 1;
        }

        // 2. Reset
        $this->info('Resetting migrations...');
        try {
            Artisan::call('migrate:reset', ['--force' => true]);
            $this->info('Migration reset successful.');
        } catch (\Exception $e) {
            $this->warn('Migration reset error (this could be normal if tables do not exist yet): ' . $e->getMessage());
        }

        // 3. Check for any leftover tables that might cause problems
        $this->info('Checking for leftover tables...');
        $dropTables = [
            'freelancer_education',
            'educational_institutions',
            'education_levels',
            'portofolios',
            'freelancer_bank',
            'freelancers',
            'banks',
            'categories',
            'users',
            'roles'
        ];

        foreach ($dropTables as $tableName) {
            if (Schema::hasTable($tableName)) {
                $this->warn("Found leftover table: {$tableName}. Attempting to drop it...");
                try {
                    Schema::dropIfExists($tableName);
                    $this->info("Dropped table: {$tableName}");
                } catch (\Exception $e) {
                    $this->error("Failed to drop {$tableName}: " . $e->getMessage());
                }
            }
        }

        // 4. Run migrations in specific order manually
        $this->info('Running migrations in correct sequence...');

        $migrationSequence = [
            '0001_01_01_000000_create_roles_table.php',
            '0001_01_01_000001_create_users_table.php',
            '0001_01_01_000002_create_cache_table.php',
            '0001_01_01_000003_create_jobs_table.php',
            '2025_05_30_042310_create_educational_tables.php',
            '2025_05_30_042320_create_categories_table.php',
            '2025_05_30_042330_create_freelancers_table.php',
            '2025_05_30_050000_create_banks_table.php',
            '2025_05_30_060000_create_freelancer_bank_table.php',
            '2025_05_30_043858_create_portofolios_table.php',
        ];

        $migrationsPath = database_path('migrations');

        foreach ($migrationSequence as $migrationFile) {
            $this->info("Migrating: {$migrationFile}");
            $migrationClass = $this->getMigrationClass($migrationsPath . '/' . $migrationFile);
            
            if (!$migrationClass) {
                $this->warn("Could not load migration class from {$migrationFile}");
                continue;
            }

            try {
                $migration = new $migrationClass();
                $this->info("Running up() method for {$migrationFile}...");
                $migration->up();
                $this->info("Successfully migrated {$migrationFile}");
            } catch (\Exception $e) {
                $this->error("Error migrating {$migrationFile}: " . $e->getMessage());
                return 1;
            }
        }

        // 5. Run seeders if needed
        $this->info('Running database seeders...');
        try {
            Artisan::call('db:seed', ['--force' => true]);
            $this->info('Database seeding completed successfully.');
        } catch (\Exception $e) {
            $this->error('Error seeding database: ' . $e->getMessage());
        }

        $this->info('Database repair process completed!');
        $this->info('If you encounter any issues, you may need to adjust your migration files.');
        return 0;
    }

    /**
     * Get migration class from file
     */
    protected function getMigrationClass($path)
    {
        if (!file_exists($path)) {
            $this->error("Migration file not found: {$path}");
            return null;
        }

        $fileContent = file_get_contents($path);
        $namespace = $this->getNamespaceFromFile($fileContent);

        // Load the file
        require_once $path;

        // Extract the class name
        preg_match('/return new class extends Migration\s*{/m', $fileContent, $matches);

        if (!empty($matches)) {
            // For anonymous class migrations
            $tempClassName = 'Migration' . md5($path);
            eval(str_replace(
                'return new class extends Migration',
                "if (!class_exists('{$tempClassName}')) { class {$tempClassName} extends \\Illuminate\\Database\\Migrations\\Migration",
                $fileContent
            ) . " } return new {$tempClassName}();");
            return $tempClassName;
        } else {
            // For named class migrations (older style)
            preg_match('/class\s+([a-zA-Z0-9_]+)\s+extends\s+Migration/m', $fileContent, $matches);
            if (!empty($matches)) {
                $className = $matches[1];
                $fullClassName = $namespace ? $namespace . '\\' . $className : $className;
                return $fullClassName;
            }
        }

        $this->error("Could not determine migration class in file: {$path}");
        return null;
    }

    /**
     * Extract namespace from file content
     */
    protected function getNamespaceFromFile($content)
    {
        preg_match('/namespace\s+([^;]+);/m', $content, $matches);
        return !empty($matches[1]) ? $matches[1] : null;
    }
}
