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
        // First, let's check if the service_galleries table exists
        if (Schema::hasTable('service_galleries')) {
            // Drop it if it exists with issues
            Schema::dropIfExists('service_galleries');
        }
        
        // Recreate the table with proper structure
        Schema::create('service_galleries', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('service_id');
            $table->string('image_path');
            $table->integer('order')->default(0);
            $table->timestamps();
            
            // Add the foreign key constraint
            $table->foreign('service_id')
                ->references('id')
                ->on('services')
                ->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('service_galleries');
    }
};
