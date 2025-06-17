<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddDeliveryColumnsToOrdersTable extends Migration
{
    public function up()
    {
        Schema::table('orders', function (Blueprint $table) {
            $table->string('delivery_file')->nullable()->after('deliverables');
            $table->boolean('is_delivery_locked')->default(true)->after('delivery_file');
            $table->timestamp('delivery_unlocked_at')->nullable()->after('is_delivery_locked');
        });
    }

    public function down()
    {
        Schema::table('orders', function (Blueprint $table) {
            $table->dropColumn(['delivery_file', 'is_delivery_locked', 'delivery_unlocked_at']);
        });
    }
}
