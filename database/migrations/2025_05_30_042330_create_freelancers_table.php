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
        Schema::create('freelancers', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->foreignId('category_id')->nullable()->constrained()->onDelete('set null');
            $table->double('hourly_rate')->default(0.0);
            $table->string('availability')->default('available');
            $table->double('rating')->default(0.0);
            $table->double('account_balance')->default(0.0);
            $table->double('total_earnings')->default(0.0);
            $table->text('bio')->nullable();
            $table->text('skills')->nullable();
            $table->string('profile_image')->nullable();
            $table->integer('completed_projects')->default(0);
            $table->boolean('is_verified')->default(false);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('freelancers');
    }
};
