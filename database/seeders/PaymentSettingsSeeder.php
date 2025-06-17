<?php

namespace Database\Seeders;

use App\Models\Setting;
use Illuminate\Database\Seeder;

class PaymentSettingsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // Midtrans settings
        Setting::updateOrCreate(
            ['key' => 'enable_midtrans'],
            ['value' => true, 'group' => 'payment']
        );
        
        Setting::updateOrCreate(
            ['key' => 'midtrans_client_key'],
            ['value' => 'SB-Mid-client-WntGntyuU5ryOlW7', 'group' => 'payment']
        );
        
        Setting::updateOrCreate(
            ['key' => 'midtrans_server_key'],
            ['value' => 'SB-Mid-server-q5DTSIlBs3rH0Oem2daMIoWe', 'group' => 'payment']
        );
        
        Setting::updateOrCreate(
            ['key' => 'midtrans_sandbox'],
            ['value' => true, 'group' => 'payment']
        );
        
        // Platform fee settings
        Setting::updateOrCreate(
            ['key' => 'platform_fee_percentage'],
            ['value' => 20, 'group' => 'payment']
        );
        
        Setting::updateOrCreate(
            ['key' => 'minimum_commission'],
            ['value' => 10000, 'group' => 'payment']
        );
        
        // Withdrawal settings
        Setting::updateOrCreate(
            ['key' => 'minimum_withdraw'],
            ['value' => 50000, 'group' => 'payment']
        );
        
        Setting::updateOrCreate(
            ['key' => 'withdraw_fee'],
            ['value' => 5000, 'group' => 'payment']
        );
        
        Setting::updateOrCreate(
            ['key' => 'withdrawal_processing_days'],
            ['value' => 3, 'group' => 'payment'] // 3 days processing
        );
        
        // Tax settings
        Setting::updateOrCreate(
            ['key' => 'enable_tax'],
            ['value' => true, 'group' => 'payment']
        );

        Setting::updateOrCreate(
            ['key' => 'tax_percentage'],
            ['value' => 11, 'group' => 'payment'] // 11% PPN in Indonesia
        );

        // File upload settings
        Setting::updateOrCreate(
            ['key' => 'max_file_size_mb'],
            ['value' => 50, 'group' => 'file'] // Max 50MB upload
        );

        Setting::updateOrCreate(
            ['key' => 'allowed_file_types'],
            [
                'value' => json_encode([
                    'image/*',
                    'application/pdf',
                    'application/zip',
                    'application/x-rar-compressed',
                    'application/x-tar',
                    'application/x-gzip',
                    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
                    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                    'application/vnd.openxmlformats-officedocument.presentationml.presentation',
                    'text/plain',
                    'application/msword',
                    'application/vnd.ms-excel',
                    'application/vnd.ms-powerpoint',
                ]),
                'group' => 'file',
                'type' => 'array'
            ]
        );
        
        // Available payment methods
        Setting::updateOrCreate(
            ['key' => 'payment_methods'],
            [
                'value' => json_encode([
                    'bank_transfer' => true,
                    'credit_card' => true,
                    'e_wallet' => true,
                    'qris' => true,
                    'paylater' => false,
                    'retail' => true,
                ]),
                'group' => 'payment',
                'type' => 'array'
            ]
        );
    }
}
