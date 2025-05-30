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
            $table->foreignId('client_id')->constrained()->onDelete('cascade');
            $table->foreignId('category_id')->nullable()->constrained()->onDelete('set null');
            $table->string('title');
            $table->text('description');
            $table->enum('status', ['draft', 'open', 'in_progress', 'review', 'completed', 'cancelled'])->default('draft');
            $table->double('budget')->default(0.0);
            $table->enum('budget_type', ['fixed', 'hourly'])->default('fixed');
            $table->date('deadline')->nullable();
            $table->string('attachment')->nullable();
            $table->text('skills_required')->nullable();
            $table->integer('proposals_count')->default(0);
            $table->boolean('is_featured')->default(false);
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
