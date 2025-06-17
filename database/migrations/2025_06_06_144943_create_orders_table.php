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
            $table->decimal('amount', 12, 2); // Harga dasar jasa/paket
            $table->decimal('platform_fee_percentage', 5, 2)->default(0); // Persentase biaya platform
            $table->decimal('platform_fee', 12, 2)->default(0); // Jumlah biaya platform
            $table->decimal('tax', 12, 2)->default(0);
            $table->decimal('total_amount', 12, 2); // amount + platform_fee + tax
            $table->decimal('freelancer_earning', 12, 2); // amount - (amount * (platform_fee_percentage/100)) jika platform fee diambil dari freelancer, atau amount jika platform fee dibebankan ke client
            $table->text('requirements')->nullable();
            $table->date('due_date');
            $table->string('status')->default('pending');
            // Status options: pending, accepted, in-progress, revision-requested, delivered, completed, cancelled, disputed
            $table->string('payment_status')->default('unpaid'); // unpaid, pending, paid, failed, refunded
            $table->text('cancellation_reason')->nullable();
            $table->text('dispute_reason')->nullable();
            $table->string('dispute_status')->nullable();
            $table->json('deliverables')->nullable(); // Path ke file yang diupload freelancer
            $table->json('revisions')->nullable();
            $table->timestamp('paid_at')->nullable();
            $table->timestamp('downloadable_at')->nullable();
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
