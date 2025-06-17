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
        Schema::create('files', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->morphs('fileable'); // Polymorphic relationship with orders, services, etc.
            $table->string('original_name');
            $table->string('file_name');
            $table->string('file_path');
            $table->string('file_type');
            $table->bigInteger('file_size');
            $table->boolean('is_public')->default(false);
            $table->string('status')->default('pending'); // e.g., 'pending', 'active', 'deliverable', 'deleted'
            $table->timestamp('activated_at')->nullable(); // When the file becomes downloadable (especially for deliverables)
            $table->unsignedInteger('download_count')->default(0);
            $table->timestamp('last_download_at')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('files');
    }
};
