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
        Schema::create('transactions', function (Blueprint $table) {
            $table->id();
            $table->string('transaction_id')->unique(); // External transaction ID
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->morphs('reference'); // Polymorphic relation (order, withdrawal)
            $table->string('type'); // deposit, withdrawal, refund, etc.
            $table->decimal('amount', 12, 2);
            $table->decimal('fee', 12, 2)->default(0);
            $table->decimal('net_amount', 12, 2);
            $table->string('description')->nullable();
            $table->string('status'); // pending, success, failed, etc.
            $table->string('payment_method')->nullable(); // bank_transfer, credit_card, etc.
            $table->json('metadata')->nullable(); // Additional data
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('transactions');
    }
};
