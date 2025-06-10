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
        Schema::create('projects', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade'); // Client
            $table->unsignedBigInteger('category_id')->nullable();
            $table->string('title');
            $table->text('description');
            $table->decimal('budget', 12, 2)->nullable();
            $table->string('budget_type')->default('fixed'); // fixed, hourly, range
            $table->decimal('min_budget', 12, 2)->nullable(); // For range budget
            $table->decimal('max_budget', 12, 2)->nullable(); // For range budget
            $table->integer('duration')->nullable(); // In days
            $table->date('deadline')->nullable();
            $table->string('status')->default('open'); // open, in-progress, completed, cancelled
            $table->json('attachments')->nullable(); // Store files related to project
            $table->json('skills_required')->nullable(); // Store IDs of required skills
            $table->boolean('is_featured')->default(false);
            $table->integer('view_count')->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('projects');
    }
};
