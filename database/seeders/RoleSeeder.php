<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        \App\Models\Role::create([
            'name' => 'admin',
            'description' => 'Administrator with full access'
        ]);
        
        \App\Models\Role::create([
            'name' => 'freelancer',
            'description' => 'Freelancer user who can offer services'
        ]);
        
        \App\Models\Role::create([
            'name' => 'client',
            'description' => 'Client user who can request services'
        ]);
    }
}
