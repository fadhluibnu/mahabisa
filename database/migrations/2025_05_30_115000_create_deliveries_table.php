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
        Schema::create('deliveries', function (Blueprint $table) {
            $table->id();
            $table->foreignId('order_id')->constrained()->onDelete('cascade');
            $table->foreignId('freelancer_id')->constrained()->onDelete('cascade');
            $table->text('message')->nullable();
            $table->string('file_path')->nullable(); // File yang dikirimkan oleh freelancer
            $table->boolean('is_final')->default(false); // Penanda apakah ini pengiriman final
            $table->boolean('is_accepted')->nullable(); // Apakah client menerima delivery
            $table->timestamp('accepted_at')->nullable(); // Kapan delivery diterima
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('deliveries');
    }
};
