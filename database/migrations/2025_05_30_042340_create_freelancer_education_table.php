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
    {        Schema::create('freelancer_education', function (Blueprint $table) {
            $table->id();
            $table->foreignId('freelancer_id')->constrained()->onDelete('cascade');
            $table->foreignId('educational_institution_id')->constrained()->onDelete('cascade');
            $table->foreignId('education_level_id')->constrained()->onDelete('cascade');
            $table->string('major');
            $table->string('student_id')->nullable();
            $table->integer('start_year')->nullable();
            $table->integer('end_year')->nullable();
            $table->boolean('is_current')->default(false);
            $table->string('verification_document')->nullable();
            $table->boolean('is_verified')->default(false);
            $table->timestamps();
            
            // Each freelancer can have only one entry for a specific institution and level
            $table->unique(['freelancer_id', 'educational_institution_id', 'education_level_id'], 'fr_edu_inst_level_unique');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('freelancer_education');
    }
};
