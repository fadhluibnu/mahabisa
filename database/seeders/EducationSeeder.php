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
            ['name' => 'D1', 'description' => 'Diploma 1'],
            ['name' => 'D2', 'description' => 'Diploma 2'],
            ['name' => 'D3', 'description' => 'Diploma 3'],
            ['name' => 'D4', 'description' => 'Diploma 4'],
            ['name' => 'S1', 'description' => 'Sarjana/Strata 1'],
            ['name' => 'S2', 'description' => 'Magister/Strata 2'],
            ['name' => 'S3', 'description' => 'Doktor/Strata 3'],
        ];
        
        DB::table('education_levels')->insert($educationLevels);
        
        // Seeder untuk Educational Institutions
        $educationalInstitutions = [
            [
                'name' => 'Universitas Indonesia',
                'type' => 'Universitas',
                'city' => 'Depok',
                'province' => 'Jawa Barat',
                'website' => 'https://www.ui.ac.id',
                'is_verified' => true
            ],
            [
                'name' => 'Institut Teknologi Bandung',
                'type' => 'Institut',
                'city' => 'Bandung',
                'province' => 'Jawa Barat',
                'website' => 'https://www.itb.ac.id',
                'is_verified' => true
            ],
            [
                'name' => 'Universitas Gadjah Mada',
                'type' => 'Universitas',
                'city' => 'Yogyakarta',
                'province' => 'DI Yogyakarta',
                'website' => 'https://www.ugm.ac.id',
                'is_verified' => true
            ],
            [
                'name' => 'Institut Pertanian Bogor',
                'type' => 'Institut',
                'city' => 'Bogor',
                'province' => 'Jawa Barat',
                'website' => 'https://www.ipb.ac.id',
                'is_verified' => true
            ],
            [
                'name' => 'Institut Teknologi Sepuluh Nopember',
                'type' => 'Institut',
                'city' => 'Surabaya',
                'province' => 'Jawa Timur',
                'website' => 'https://www.its.ac.id',
                'is_verified' => true
            ],
            [
                'name' => 'Universitas Diponegoro',
                'type' => 'Universitas',
                'city' => 'Semarang',
                'province' => 'Jawa Tengah',
                'website' => 'https://www.undip.ac.id',
                'is_verified' => true
            ],
            [
                'name' => 'Universitas Brawijaya',
                'type' => 'Universitas',
                'city' => 'Malang',
                'province' => 'Jawa Timur',
                'website' => 'https://www.ub.ac.id',
                'is_verified' => true
            ],
            [
                'name' => 'Universitas Padjadjaran',
                'type' => 'Universitas',
                'city' => 'Bandung',
                'province' => 'Jawa Barat',
                'website' => 'https://www.unpad.ac.id',
                'is_verified' => true
            ],
            [
                'name' => 'Universitas Airlangga',
                'type' => 'Universitas',
                'city' => 'Surabaya',
                'province' => 'Jawa Timur',
                'website' => 'https://www.unair.ac.id',
                'is_verified' => true
            ],
            [
                'name' => 'Universitas Hasanuddin',
                'type' => 'Universitas',
                'city' => 'Makassar',
                'province' => 'Sulawesi Selatan',
                'website' => 'https://www.unhas.ac.id',
                'is_verified' => true
            ],
        ];
        
        DB::table('educational_institutions')->insert($educationalInstitutions);
    }
}
