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
    {        Schema::create('banks', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->enum('type', ['bank', 'e-wallet'])->default('bank');
            $table->string('code')->unique()->nullable();
            $table->string('swift_code')->nullable();
            $table->string('logo')->nullable();
            $table->string('account_number_format')->nullable()->comment('Format for account number validation');
            $table->text('branches')->nullable()->comment('JSON array of branches if applicable');
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('banks');
    }
};
