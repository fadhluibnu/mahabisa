<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Create regular users
        User::factory(5)->create([
            'role' => 'client',
        ]);
        
        User::factory(5)->create([
            'role' => 'freelancer',
        ]);

        // Create admin user
        User::factory()->create([
            'name' => 'Admin User',
            'email' => 'admin@mahabisa.com',
            'role' => 'admin',
            'profile_photo_url' => 'https://randomuser.me/api/portraits/men/1.jpg',
        ]);
        
        // Create test client user
        User::factory()->create([
            'name' => 'Client Demo',
            'email' => 'client@mahabisa.com',
            'role' => 'client',
            'profile_photo_url' => 'https://randomuser.me/api/portraits/women/2.jpg',
        ]);
        
        // Create test freelancer user
        User::factory()->create([
            'name' => 'Freelancer Demo',
            'email' => 'freelancer@mahabisa.com',
            'role' => 'freelancer',
            'profile_photo_url' => 'https://randomuser.me/api/portraits/men/3.jpg',
        ]);
    }
}
