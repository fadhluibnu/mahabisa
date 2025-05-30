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
        Schema::create('skills', function (Blueprint $table) {
            $table->id();
            $table->string('skill_name')->unique();
            $table->foreignId('category_id')->nullable()->constrained()->onDelete('set null');
            $table->boolean('is_verified')->default(false); // Untuk skills yang diverifikasi admin
            $table->timestamps();
        });

        Schema::create('freelancer_skill', function (Blueprint $table) {
            $table->id();
            $table->foreignId('freelancer_id')->constrained()->onDelete('cascade');
            $table->foreignId('skill_id')->constrained()->onDelete('cascade');
            $table->integer('proficiency_level')->default(1); // Level keahlian (1-5)
            $table->timestamps();
            
            // Seorang freelancer hanya bisa memiliki satu entry untuk setiap skill
            $table->unique(['freelancer_id', 'skill_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('freelancer_skill');
        Schema::dropIfExists('skills');
    }
};
