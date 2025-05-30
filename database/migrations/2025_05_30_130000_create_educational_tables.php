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
        Schema::create('educational_institutions', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('type'); // universitas, politeknik, dll
            $table->string('city')->nullable();
            $table->string('province')->nullable();
            $table->string('website')->nullable();
            $table->string('logo')->nullable();
            $table->boolean('is_verified')->default(false);
            $table->timestamps();
        });

        Schema::create('education_levels', function (Blueprint $table) {
            $table->id();
            $table->string('name'); // S1, D3, D4, S2, dll
            $table->string('description')->nullable();
            $table->timestamps();
        });

        Schema::create('freelancer_education', function (Blueprint $table) {
            $table->id();
            $table->foreignId('freelancer_id')->constrained()->onDelete('cascade');
            $table->foreignId('educational_institution_id')->constrained()->onDelete('cascade');
            $table->foreignId('education_level_id')->constrained()->onDelete('cascade');
            $table->string('major'); // Jurusan/program studi
            $table->string('student_id')->nullable(); // NIM
            $table->year('start_year')->nullable();
            $table->year('end_year')->nullable();
            $table->boolean('is_current')->default(false);
            $table->string('verification_document')->nullable(); // Dokumen verifikasi seperti KTM
            $table->boolean('is_verified')->default(false);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('freelancer_education');
        Schema::dropIfExists('education_levels');
        Schema::dropIfExists('educational_institutions');
    }
};
