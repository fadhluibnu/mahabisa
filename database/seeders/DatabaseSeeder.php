<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Run role seeder first to create admin role
        $this->call([
            RoleSeeder::class,
        ]);
        
        // Get admin role ID
        $adminRole = \App\Models\Role::where('name', 'admin')->first();
        
        // Create admin user
        User::create([
            'name' => 'Admin User',
            'email' => 'admin@mahabisa.com',
            'password' => Hash::make('password'),
            'role_id' => $adminRole ? $adminRole->id : null,
            'is_active' => true,
        ]);
        
        // Run all seeders in correct order
        $this->call([
            CategorySeeder::class,
            BankSeeder::class,
            EducationSeeder::class,
            // Run client and freelancer seeders after roles and categories
            ClientSeeder::class,
            FreelancerSeeder::class,
            FreelancerEducationSeeder::class,
            FreelancerBankSeeder::class,
            // Run skills and tags seeder first (they don't depend on other seeders)
            SkillSeeder::class,
            TagSeeder::class,
            // Run project seeder after clients
            ProjectSeeder::class,
            // Run proposal seeder after projects
            ProposalSeeder::class,
            // Run order seeder after proposals
            OrderSeeder::class,
            // Run portfolio seeder after freelancers
            PortofolioSeeder::class,
        ]);
    }
}
