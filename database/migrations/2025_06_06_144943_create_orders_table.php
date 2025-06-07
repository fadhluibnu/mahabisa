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
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->string('order_number')->unique();
            $table->foreignId('client_id')->constrained('users')->onDelete('cascade');
            $table->foreignId('freelancer_id')->constrained('users')->onDelete('cascade');
            $table->foreignId('project_id')->nullable()->constrained()->nullOnDelete();
            $table->foreignId('service_id')->nullable()->constrained()->nullOnDelete();
            $table->foreignId('proposal_id')->nullable()->constrained()->nullOnDelete();
            $table->decimal('amount', 12, 2);
            $table->decimal('platform_fee', 12, 2);
            $table->decimal('tax', 12, 2)->default(0);
            $table->decimal('total_amount', 12, 2);
            $table->text('requirements')->nullable();
            $table->date('due_date');
            $table->string('status')->default('pending');
            // Status options: pending, in-progress, revision-requested, delivered, completed, cancelled, disputed
            $table->text('cancellation_reason')->nullable();
            $table->text('dispute_reason')->nullable();
            $table->string('dispute_status')->nullable();
            $table->json('deliverables')->nullable();
            $table->json('revisions')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('orders');
    }
};
