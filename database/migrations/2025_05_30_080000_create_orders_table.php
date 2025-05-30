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
        Schema::create('orders', function (Blueprint $table) {
            $table->id(); // orderId
            $table->foreignId('client_id')->constrained()->onDelete('cascade');
            $table->foreignId('freelancer_id')->constrained()->onDelete('cascade');
            $table->foreignId('category_id')->nullable()->constrained()->onDelete('set null');
            $table->string('title');
            $table->text('description');
            $table->enum('status', [
                'pending', // Baru dibuat, belum dikonfirmasi freelancer
                'accepted', // Dikonfirmasi freelancer, proses pengerjaan
                'rejected', // Ditolak oleh freelancer
                'in_progress', // Sedang dikerjakan
                'delivered', // Hasil kerja dikirim ke client
                'revision', // Client meminta revisi
                'completed', // Pesanan selesai
                'cancelled' // Pesanan dibatalkan
            ])->default('pending');
            $table->double('price');
            $table->datetime('deadline');
            $table->datetime('delivery_date')->nullable();
            $table->integer('revision_count')->default(0);
            $table->text('requirements')->nullable();
            $table->text('notes')->nullable();
            $table->boolean('is_featured')->default(false);
            $table->string('attachment')->nullable(); // File lampiran dari client
            $table->timestamps(); // creationDate
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('orders');
    }
};
