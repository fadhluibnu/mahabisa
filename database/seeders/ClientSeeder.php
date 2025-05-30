<?php

namespace Database\Seeders;

use App\Models\Client;
use App\Models\User;
use App\Models\Role;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class ClientSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Get client role id
        $clientRole = Role::where('name', 'client')->first();
        
        if (!$clientRole) {
            return;
        }
        
        // Create 5 clients
        for ($i = 1; $i <= 5; $i++) {
            // Create user first
            $user = User::create([
                'name' => 'Client ' . $i,
                'email' => 'client' . $i . '@example.com',
                'password' => Hash::make('password'),
                'role_id' => $clientRole->id,
                'profile_picture' => null,
                'is_active' => true
            ]);
            
            // Create client profile
            Client::create([
                'user_id' => $user->id,
                'budget' => rand(1000000, 10000000),
                'payment_method' => ['Credit Card', 'Bank Transfer', 'PayPal', 'E-wallet'][rand(0, 3)],
                'company_name' => 'Company ' . $i,
                'company_website' => 'https://company' . $i . '.com',
                'industry' => ['Technology', 'Education', 'Healthcare', 'Finance', 'E-commerce'][rand(0, 4)],
                'position' => ['CEO', 'Manager', 'Director', 'Project Manager', 'Team Lead'][rand(0, 4)],
                'bio' => 'Looking for talented freelancers to help with our projects.',
                'profile_image' => null,
                'is_verified' => rand(0, 1),
                'completed_projects' => rand(0, 5),
                'total_spent' => rand(0, 5000000)
            ]);
        }
    }
}
