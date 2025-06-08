<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UsersSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create admin user if it doesn't exist
        if (!User::where('email', 'admin@mahabisa.com')->exists()) {
            User::create([
                'name' => 'Admin MahaBisa',
                'email' => 'admin@mahabisa.com',
                'password' => Hash::make('password'),
                'email_verified_at' => now(),
                'role' => 'admin',
                'profile_photo_url' => 'https://ui-avatars.com/api/?name=Admin&background=8b5cf6&color=fff'
            ]);
        }
        
        // Create sample freelancers
        $freelancers = [
            [
                'name' => 'Budi Santoso',
                'email' => 'budi@example.com',
                'password' => Hash::make('password'),
                'email_verified_at' => now()->subDays(rand(1, 60)),
                'role' => 'freelancer',
            ],
            [
                'name' => 'Ani Wijaya',
                'email' => 'ani@example.com',
                'password' => Hash::make('password'),
                'email_verified_at' => now()->subDays(rand(1, 60)),
                'role' => 'freelancer',
            ],
            [
                'name' => 'Dian Pratama',
                'email' => 'dian@example.com',
                'password' => Hash::make('password'),
                'email_verified_at' => now()->subDays(rand(1, 60)),
                'role' => 'freelancer',
            ],
        ];
        
        foreach ($freelancers as $freelancer) {
            if (!User::where('email', $freelancer['email'])->exists()) {
                User::create($freelancer);
            }
        }
        
        // Create sample clients
        $clients = [
            [
                'name' => 'PT Maju Bersama',
                'email' => 'pt.maju@example.com',
                'password' => Hash::make('password'),
                'email_verified_at' => now()->subDays(rand(1, 60)),
                'role' => 'client',
            ],
            [
                'name' => 'CV Jaya Abadi',
                'email' => 'jaya.abadi@example.com',
                'password' => Hash::make('password'),
                'email_verified_at' => now()->subDays(rand(1, 60)),
                'role' => 'client',
            ],
            [
                'name' => 'Startup Indonesia',
                'email' => 'startup@example.com',
                'password' => Hash::make('password'),
                'email_verified_at' => now()->subDays(rand(1, 30)),
                'role' => 'client',
            ],
        ];
        
        foreach ($clients as $client) {
            if (!User::where('email', $client['email'])->exists()) {
                User::create($client);
            }
        }
        
        // Create some new users (less than 30 days old)
        $newUsers = [
            [
                'name' => 'Rudi Permana',
                'email' => 'rudi@example.com',
                'password' => Hash::make('password'),
                'email_verified_at' => now()->subDays(rand(1, 10)),
                'role' => 'freelancer',
            ],
            [
                'name' => 'PT Digital Kreasi',
                'email' => 'digital@example.com',
                'password' => Hash::make('password'),
                'email_verified_at' => now()->subDays(rand(1, 10)),
                'role' => 'client',
            ],
        ];
        
        foreach ($newUsers as $newUser) {
            if (!User::where('email', $newUser['email'])->exists()) {
                User::create($newUser);
            }
        }
        
        // Create unverified users
        $unverifiedUsers = [
            [
                'name' => 'Siti Rahayu',
                'email' => 'siti@example.com',
                'password' => Hash::make('password'),
                'role' => 'freelancer',
            ],
            [
                'name' => 'PT Belum Verifikasi',
                'email' => 'belum@example.com',
                'password' => Hash::make('password'),
                'role' => 'client',
            ],
        ];
        
        foreach ($unverifiedUsers as $unverifiedUser) {
            if (!User::where('email', $unverifiedUser['email'])->exists()) {
                User::create($unverifiedUser);
            }
        }
    }
}
