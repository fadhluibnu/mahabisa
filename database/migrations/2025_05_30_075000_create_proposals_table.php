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
            $table->foreignId('freelancer_id')->constrained()->onDelete('cascade');
            $table->foreignId('project_id')->constrained()->onDelete('cascade');
            $table->text('cover_letter');
            $table->double('bid_amount');
            $table->integer('delivery_time')->comment('in days');
            $table->enum('status', ['pending', 'accepted', 'rejected', 'withdrawn'])->default('pending');
            $table->string('attachment')->nullable();
            $table->text('notes')->nullable();
            $table->boolean('is_read_by_client')->default(false);
            $table->timestamps();
            
            // Ensure each freelancer can only submit one proposal per project
            $table->unique(['freelancer_id', 'project_id'], 'freelancer_project_unique');
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
