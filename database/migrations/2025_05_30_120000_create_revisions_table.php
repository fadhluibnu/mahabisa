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
        Schema::create('revisions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('order_id')->constrained()->onDelete('cascade');
            $table->foreignId('client_id')->constrained()->onDelete('cascade');
            $table->foreignId('freelancer_id')->constrained()->onDelete('cascade');
            $table->foreignId('delivery_id')->constrained()->onDelete('cascade');
            $table->text('message'); // Detail permintaan revisi dari client
            $table->enum('status', ['requested', 'in_progress', 'completed', 'rejected'])->default('requested');
            $table->integer('deadline_extension')->default(0); // Perpanjangan deadline dalam hari
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('revisions');
    }
};
