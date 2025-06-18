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
        Schema::create('notification_settings', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->boolean('email_project_updates')->default(true);
            $table->boolean('email_messages')->default(true);
            $table->boolean('email_promotions')->default(false);
            $table->boolean('email_newsletter')->default(true);
            $table->boolean('site_project_updates')->default(true);
            $table->boolean('site_messages')->default(true);
            $table->boolean('site_promotions')->default(true);
            $table->boolean('site_newsletter')->default(false);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('notification_settings');
    }
};
