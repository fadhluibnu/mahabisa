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
        Schema::create('clients', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->double('budget')->default(0.0);
            $table->string('payment_method')->nullable();
            $table->string('company_name')->nullable();
            $table->string('company_website')->nullable();
            $table->string('industry')->nullable();
            $table->string('position')->nullable();
            $table->text('bio')->nullable();
            $table->string('profile_image')->nullable();
            $table->boolean('is_verified')->default(false);
            $table->integer('completed_projects')->default(0);
            $table->double('total_spent')->default(0.0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('clients');
    }
};
