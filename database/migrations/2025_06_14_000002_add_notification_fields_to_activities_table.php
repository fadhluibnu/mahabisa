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
        Schema::table('activities', function (Blueprint $table) {
            if (!Schema::hasColumn('activities', 'type')) {
                $table->string('type')->after('user_id')->nullable();
            }
            if (!Schema::hasColumn('activities', 'action')) {
                $table->string('action')->after('type')->nullable();
            }
            if (!Schema::hasColumn('activities', 'title')) {
                $table->string('title')->after('action')->nullable();
            }
            if (!Schema::hasColumn('activities', 'data')) {
                $table->json('data')->after('description')->nullable();
            }
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('activities', function (Blueprint $table) {
            $table->dropColumn(['type', 'action', 'title', 'data']);
        });
    }
};
