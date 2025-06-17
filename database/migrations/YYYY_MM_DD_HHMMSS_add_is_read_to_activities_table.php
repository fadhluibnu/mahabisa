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
        if (!Schema::hasColumn('activities', 'is_read')) {
            Schema::table('activities', function (Blueprint $table) {
                $table->boolean('is_read')->default(false)->after('description'); // Adjust 'after' if needed
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasColumn('activities', 'is_read')) {
            Schema::table('activities', function (Blueprint $table) {
                $table->dropColumn('is_read');
            });
        }
    }
};
