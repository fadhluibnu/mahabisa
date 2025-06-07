<?php

namespace Database\Seeders;

use App\Models\Setting;
use Illuminate\Database\Seeder;

class SettingsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // General settings
        Setting::set('allow_registration', true, 'general', 'boolean', 'Allow new user registrations');
        Setting::set('maintenance_mode', false, 'general', 'boolean', 'Put the site in maintenance mode');
        
        // Fee settings
        Setting::set('platform_fee_percentage', 20, 'fee', 'integer', 'Platform fee percentage');
        Setting::set('minimum_commission', 10000, 'fee', 'integer', 'Minimum commission amount');
        Setting::set('withdraw_fee', 5000, 'fee', 'integer', 'Fee for withdrawals');
        Setting::set('minimum_withdraw', 50000, 'fee', 'integer', 'Minimum withdrawal amount');
        Setting::set('automatic_withdrawal', true, 'fee', 'boolean', 'Enable automatic withdrawals');
        
        // Security settings
        Setting::set('password_min_length', 8, 'security', 'integer', 'Minimum password length');
        Setting::set('password_require_letters_numbers', true, 'security', 'boolean', 'Require passwords to contain letters and numbers');
        Setting::set('password_require_special_chars', false, 'security', 'boolean', 'Require passwords to contain special characters');
        Setting::set('password_expiry_days', 90, 'security', 'integer', 'Days until password expiry (0 = never)');
        
        // Payment settings
        Setting::set('enable_midtrans', true, 'payment', 'boolean', 'Enable Midtrans payment gateway');
        Setting::set('midtrans_client_key', 'SB-Mid-client-xxxxxxxxxxxxxxxx', 'payment', 'string', 'Midtrans client key');
        Setting::set('midtrans_server_key', 'SB-Mid-server-xxxxxxxxxxxxxxxx', 'payment', 'string', 'Midtrans server key');
        Setting::set('midtrans_sandbox', true, 'payment', 'boolean', 'Use Midtrans sandbox mode');
        Setting::set('enable_qris', true, 'payment', 'boolean', 'Enable QRIS payments');
        
        // Payment methods (stored as JSON)
        $paymentMethods = [
            'bank_transfer' => true,
            'credit_card' => true,
            'e_wallet' => true,
            'qris' => true,
            'paylater' => false,
            'retail' => true,
        ];
        Setting::set('payment_methods', json_encode($paymentMethods), 'payment', 'array', 'Enabled payment methods');
    }
}
