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
        Schema::create('freelancer_bank', function (Blueprint $table) {
            $table->id();
            $table->foreignId('freelancer_id')->constrained()->onDelete('cascade');
            $table->foreignId('bank_id')->constrained()->onDelete('cascade');
            $table->string('account_number');
            $table->string('account_name');
            $table->boolean('is_primary')->default(false);
            $table->boolean('is_active')->default(true);
            $table->timestamps();
            
            // Ensure each freelancer can only have one account per bank
            $table->unique(['freelancer_id', 'bank_id', 'account_number'], 'fr_bank_account_unique');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('freelancer_bank');
    }
};
