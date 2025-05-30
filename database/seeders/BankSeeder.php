<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class BankSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Common banks in Indonesia
        $banks = [
            [
                'name' => 'Bank Central Asia (BCA)',
                'type' => 'bank',
                'code' => 'BCA',
                'swift_code' => 'CENAIDJA',
                'logo' => 'bca.png',
                'account_number_format' => '[0-9]{10}',
                'branches' => json_encode(['Jakarta', 'Surabaya', 'Bandung', 'Medan', 'Makassar']),
                'is_active' => true
            ],
            [
                'name' => 'Bank Rakyat Indonesia (BRI)',
                'type' => 'bank',
                'code' => 'BRI',
                'swift_code' => 'BRINIDJA',
                'logo' => 'bri.png',
                'account_number_format' => '[0-9]{15}',
                'branches' => json_encode(['Jakarta', 'Surabaya', 'Bandung', 'Semarang', 'Yogyakarta']),
                'is_active' => true
            ],
            [
                'name' => 'Bank Mandiri',
                'type' => 'bank',
                'code' => 'MANDIRI',
                'swift_code' => 'BMRIIDJA',
                'logo' => 'mandiri.png',
                'account_number_format' => '[0-9]{13}',
                'branches' => json_encode(['Jakarta', 'Bandung', 'Surabaya', 'Denpasar', 'Palembang']),
                'is_active' => true
            ],
            [
                'name' => 'Bank Negara Indonesia (BNI)',
                'type' => 'bank',
                'code' => 'BNI',
                'swift_code' => 'BNINIDJA',
                'logo' => 'bni.png',
                'account_number_format' => '[0-9]{10}',
                'branches' => json_encode(['Jakarta', 'Makassar', 'Medan', 'Surabaya', 'Balikpapan']),
                'is_active' => true
            ],
            [
                'name' => 'Bank CIMB Niaga',
                'type' => 'bank',
                'code' => 'CIMB',
                'swift_code' => 'BNIAIDJA',
                'logo' => 'cimb.png',
                'account_number_format' => '[0-9]{13}',
                'is_active' => true
            ],
            [
                'name' => 'Bank Syariah Indonesia (BSI)',
                'type' => 'bank',
                'code' => 'BSI',
                'swift_code' => 'BSMDIDJA',
                'logo' => 'bsi.png',
                'account_number_format' => '[0-9]{10}',
                'is_active' => true
            ],
            // E-Wallets
            [
                'name' => 'GoPay',
                'type' => 'e-wallet',
                'code' => 'GOPAY',
                'swift_code' => null,
                'logo' => 'gopay.png',
                'account_number_format' => '[0-9]{10,12}',
                'is_active' => true
            ],
            [
                'name' => 'OVO',
                'type' => 'e-wallet',
                'code' => 'OVO',
                'swift_code' => null,
                'logo' => 'ovo.png',
                'account_number_format' => '[0-9]{10,12}',
                'is_active' => true
            ],
            [
                'name' => 'DANA',
                'type' => 'e-wallet',
                'code' => 'DANA',
                'swift_code' => null,
                'logo' => 'dana.png',
                'account_number_format' => '[0-9]{10,12}',
                'is_active' => true
            ],
            [
                'name' => 'LinkAja',
                'type' => 'e-wallet',
                'code' => 'LINKAJA',
                'swift_code' => null,
                'logo' => 'linkaja.png',
                'account_number_format' => '[0-9]{10,12}',
                'is_active' => true
            ],
            [
                'name' => 'ShopeePay',
                'type' => 'e-wallet',
                'code' => 'SHOPEEPAY',
                'swift_code' => null,
                'logo' => 'shopeepay.png',
                'account_number_format' => '[0-9]{10,12}',
                'is_active' => true
            ]
        ];

        DB::table('banks')->insert($banks);
    }
}
