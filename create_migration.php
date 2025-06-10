<?php

require __DIR__.'/vendor/autoload.php';

$app = require_once __DIR__.'/bootstrap/app.php';
$app->make(Illuminate\Contracts\Console\Kernel::class)->bootstrap();

// Buat file migrasi baru dengan nama yang benar
$timestamp = date('Y_m_d_His');
$filepath = database_path("migrations/{$timestamp}_fix_revisions_to_services_table.php");

$content = <<<'EOF'
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
            // Cek jika kolom revisions belum ada
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
EOF;

file_put_contents($filepath, $content);

echo "File migrasi baru dibuat: " . basename($filepath) . PHP_EOL;
