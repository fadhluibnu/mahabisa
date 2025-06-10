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
        Schema::create('proposals', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade'); // Freelancer
            $table->foreignId('project_id')->constrained()->onDelete('cascade');
            $table->decimal('bid_amount', 12, 2);
            $table->string('bid_type')->default('fixed'); // fixed, hourly
            $table->integer('delivery_time')->comment('In days');
            $table->text('cover_letter');
            $table->json('attachments')->nullable();
            $table->string('status')->default('pending'); // pending, accepted, rejected, withdrawn
            $table->text('rejection_reason')->nullable();
            $table->boolean('is_read')->default(false);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('proposals');
    }
};
