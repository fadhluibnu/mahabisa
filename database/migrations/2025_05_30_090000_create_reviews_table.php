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
            $table->integer('rating'); // Rating 1-5
            $table->text('comment')->nullable();
            $table->integer('helpful_count')->default(0); // Jumlah pengguna yang menandai review sebagai helpful
            $table->boolean('is_reported')->default(false); // Apakah review dilaporkan oleh pengguna
            $table->timestamps(); // Termasuk created_at sebagai date

            // Memastikan tiap order hanya memiliki satu review
            $table->unique('order_id', 'order_review_unique');
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
