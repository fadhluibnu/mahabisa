<?php

namespace Database\Seeders;

use App\Models\EducationLevel;
use App\Models\EducationalInstitution;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class EducationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Seeder untuk Education Levels
        $educationLevels = [
            ['name' => 'D1', 'code' => 'D1', 'description' => 'Diploma 1', 'is_active' => true],
            ['name' => 'D2', 'code' => 'D2', 'description' => 'Diploma 2', 'is_active' => true],
            ['name' => 'D3', 'code' => 'D3', 'description' => 'Diploma 3', 'is_active' => true],
            ['name' => 'D4', 'code' => 'D4', 'description' => 'Diploma 4', 'is_active' => true],
            ['name' => 'S1', 'code' => 'S1', 'description' => 'Sarjana/Strata 1', 'is_active' => true],
            ['name' => 'S2', 'code' => 'S2', 'description' => 'Magister/Strata 2', 'is_active' => true],
            ['name' => 'S3', 'code' => 'S3', 'description' => 'Doktor/Strata 3', 'is_active' => true],
        ];
        
        DB::table('education_levels')->insert($educationLevels);
        
        // Seeder untuk Educational Institutions
        $educationalInstitutions = [
            [
                'name' => 'Universitas Indonesia',
                'short_name' => 'UI',
                'location' => 'Depok, Jawa Barat',
                'address' => 'Jl. Margonda Raya, Depok, Jawa Barat',
                'website' => 'https://www.ui.ac.id',
                'logo' => 'ui-logo.png',
                'is_verified' => true,
                'is_active' => true
            ],
            [
                'name' => 'Institut Teknologi Bandung',
                'short_name' => 'ITB',
                'location' => 'Bandung, Jawa Barat',
                'address' => 'Jl. Ganesa No.10, Bandung, Jawa Barat',
                'website' => 'https://www.itb.ac.id',
                'logo' => 'itb-logo.png',
                'is_verified' => true,
                'is_active' => true
            ],
            [
                'name' => 'Universitas Gadjah Mada',
                'short_name' => 'UGM',
                'location' => 'Yogyakarta, DI Yogyakarta',
                'address' => 'Jl. Bulaksumur, Yogyakarta',
                'website' => 'https://www.ugm.ac.id',
                'logo' => 'ugm-logo.png',
                'is_verified' => true,
                'is_active' => true
            ],
            [
                'name' => 'Institut Pertanian Bogor',
                'short_name' => 'IPB',
                'location' => 'Bogor, Jawa Barat',
                'address' => 'Jl. Raya Dramaga, Bogor, Jawa Barat',
                'website' => 'https://www.ipb.ac.id',
                'logo' => 'ipb-logo.png',
                'is_verified' => true,
                'is_active' => true
            ],
            [
                'name' => 'Institut Teknologi Sepuluh Nopember',
                'short_name' => 'ITS',
                'location' => 'Surabaya, Jawa Timur',
                'address' => 'Jl. Teknik Kimia, Surabaya, Jawa Timur',
                'website' => 'https://www.its.ac.id',
                'logo' => 'its-logo.png',
                'is_verified' => true,
                'is_active' => true
            ],
            [
                'name' => 'Universitas Diponegoro',
                'short_name' => 'UNDIP',
                'location' => 'Semarang, Jawa Tengah',
                'address' => 'Jl. Prof. Soedarto, Tembalang, Semarang',
                'website' => 'https://www.undip.ac.id',
                'logo' => 'undip-logo.png',
                'is_verified' => true,
                'is_active' => true
            ],
            [
                'name' => 'Universitas Brawijaya',
                'short_name' => 'UB',
                'location' => 'Malang, Jawa Timur',
                'address' => 'Jl. Veteran, Malang, Jawa Timur',
                'website' => 'https://www.ub.ac.id',
                'logo' => 'ub-logo.png',
                'is_verified' => true,
                'is_active' => true
            ],
            [
                'name' => 'Universitas Padjadjaran',
                'short_name' => 'UNPAD',
                'location' => 'Bandung, Jawa Barat',
                'address' => 'Jl. Raya Bandung Sumedang KM.21, Jatinangor, Jawa Barat',
                'website' => 'https://www.unpad.ac.id',
                'logo' => 'unpad-logo.png',
                'is_verified' => true,
                'is_active' => true
            ],
            [
                'name' => 'Universitas Airlangga',
                'short_name' => 'UNAIR',
                'location' => 'Surabaya, Jawa Timur',
                'address' => 'Jl. Airlangga No.4, Surabaya, Jawa Timur',
                'website' => 'https://www.unair.ac.id',
                'logo' => 'unair-logo.png',
                'is_verified' => true,
                'is_active' => true
            ],
            [
                'name' => 'Universitas Hasanuddin',
                'short_name' => 'UNHAS',
                'location' => 'Makassar, Sulawesi Selatan',
                'address' => 'Jl. Perintis Kemerdekaan KM.10, Makassar, Sulawesi Selatan',
                'website' => 'https://www.unhas.ac.id',
                'logo' => 'unhas-logo.png',
                'is_verified' => true,
                'is_active' => true
            ],
        ];
        
        DB::table('educational_institutions')->insert($educationalInstitutions);
    }
}
