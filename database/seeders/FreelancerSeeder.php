<?php

namespace Database\Seeders;

use App\Models\Freelancer;
use App\Models\User;
use App\Models\Role;
use App\Models\Category;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class FreelancerSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Get freelancer role id
        $freelancerRole = Role::where('name', 'freelancer')->first();
        
        if (!$freelancerRole) {
            return;
        }
        
        // Create 10 freelancers
        $categories = Category::all();
        
        for ($i = 1; $i <= 10; $i++) {
            // Create user first
            $user = User::create([
                'name' => 'Freelancer ' . $i,
                'email' => 'freelancer' . $i . '@example.com',
                'password' => Hash::make('password'),
                'role_id' => $freelancerRole->id,
                'profile_picture' => null,
                'is_active' => true
            ]);
            
            // Create freelancer profile
            Freelancer::create([
                'user_id' => $user->id,
                'category_id' => $categories->random()->id,
                'hourly_rate' => rand(50, 200) * 1000,
                'availability' => 'available',
                'rating' => 0.0,
                'account_balance' => 0.0,
                'total_earnings' => 0.0,
                'bio' => 'Professional freelancer with expertise in various fields. Ready to work on your projects.',
                'skills' => 'communication, teamwork, problem-solving',
                'profile_image' => null,
                'completed_projects' => 0,
                'is_verified' => rand(0, 1)
            ]);
        }
    }
}
