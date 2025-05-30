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
        Schema::create('reviews', function (Blueprint $table) {
            $table->id(); // reviewId
            $table->foreignId('order_id')->constrained()->onDelete('cascade');
            $table->foreignId('client_id')->constrained()->onDelete('cascade');
            $table->foreignId('freelancer_id')->constrained()->onDelete('cascade');
            $table->integer('rating'); // 1-5 scale
            $table->text('comment')->nullable();
            $table->integer('helpful')->default(0);
            $table->boolean('is_public')->default(true);
            $table->boolean('is_reported')->default(false);
            $table->timestamps(); // date included here
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('reviews');
    }
};