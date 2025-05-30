<?php

namespace Database\Seeders;

use App\Models\Freelancer;
use App\Models\EducationLevel;
use App\Models\EducationalInstitution;
use App\Models\FreelancerEducation;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class FreelancerEducationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $freelancers = Freelancer::all();
        $educationLevels = EducationLevel::all();
        $educationalInstitutions = EducationalInstitution::all();
        
        if ($freelancers->isEmpty() || $educationLevels->isEmpty() || $educationalInstitutions->isEmpty()) {
            return;
        }
        
        $majors = [
            'Teknik Informatika',
            'Sistem Informasi',
            'Ilmu Komputer',
            'Teknik Elektro',
            'Manajemen Informatika',
            'Desain Komunikasi Visual',
            'Desain Produk',
            'Ilmu Komunikasi',
            'Manajemen Bisnis',
            'Ekonomi',
            'Akuntansi',
            'Bahasa Inggris',
            'Bahasa Indonesia',
            'Psikologi',
            'Kedokteran'
        ];
        
        foreach ($freelancers as $freelancer) {
            // Each freelancer gets 1-2 educational backgrounds
            $educationCount = rand(1, 2);
            
            for ($i = 0; $i < $educationCount; $i++) {
                $educationalInstitution = $educationalInstitutions->random();
                $educationLevel = $educationLevels->random();
                $major = $majors[array_rand($majors)];
                $startYear = rand(2010, 2020);
                $endYear = rand($startYear + 3, $startYear + 5);
                $isCurrent = ($endYear > date('Y')) ? true : false;
                
                // If it's the current education, set end_year to null
                if ($isCurrent) {
                    $endYear = null;
                }
                
                DB::table('freelancer_education')->insert([
                    'freelancer_id' => $freelancer->id,
                    'educational_institution_id' => $educationalInstitution->id,
                    'education_level_id' => $educationLevel->id,
                    'major' => $major,
                    'student_id' => $this->generateRandomStudentId(),
                    'start_year' => $startYear,
                    'end_year' => $endYear,
                    'is_current' => $isCurrent,
                    'is_verified' => rand(0, 1),
                    'created_at' => now(),
                    'updated_at' => now()
                ]);
            }
        }
    }
    
    /**
     * Generate random student ID
     */
    private function generateRandomStudentId(): string
    {
        $prefix = ['STD', 'A', 'B', 'C', 'D', 'F'][rand(0, 5)];
        $year = rand(10, 23); // 2-digit year
        $number = str_pad(rand(1000, 9999), 4, '0', STR_PAD_LEFT);
        
        return $prefix . $year . $number;
    }
}
