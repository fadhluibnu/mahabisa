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
        Schema::table('orders', function (Blueprint $table) {
            $table->timestamp('payment_completed_at')->nullable()->after('updated_at');
            $table->index(['status', 'payment_completed_at']);
        });
    }

    /**
     * Reverse the migrations.
     * 
    **/
     public function down(): void
    {
        Schema::table('orders', function (Blueprint $table) {
            $table->dropIndex(['status', 'payment_completed_at']);
            $table->dropColumn('payment_completed_at');
        });
    }
};
