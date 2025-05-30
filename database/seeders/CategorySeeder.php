<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Category;
use Illuminate\Support\Facades\DB;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = [
            [
                'name' => 'Web Development', 
                'slug' => 'web-development', 
                'description' => 'Web development services including frontend and backend',
                'icon' => 'code',
                'is_active' => true
            ],
            [
                'name' => 'Mobile App Development', 
                'slug' => 'mobile-app-development', 
                'description' => 'Mobile application development for iOS and Android',
                'icon' => 'mobile',
                'is_active' => true
            ],
            [
                'name' => 'Graphic Design', 
                'slug' => 'graphic-design', 
                'description' => 'Graphic design services including logo design, branding, etc.',
                'icon' => 'palette',
                'is_active' => true
            ],
            [
                'name' => 'Content Writing', 
                'slug' => 'content-writing', 
                'description' => 'Content writing services for blogs, articles, etc.',
                'icon' => 'edit',
                'is_active' => true
            ],
            [
                'name' => 'Digital Marketing', 
                'slug' => 'digital-marketing', 
                'description' => 'Digital marketing services including SEO, SEM, etc.',
                'icon' => 'bullhorn',
                'is_active' => true
            ],
            [
                'name' => 'Video Editing', 
                'slug' => 'video-editing', 
                'description' => 'Video editing and production services',
                'icon' => 'video',
                'is_active' => true
            ],
            [
                'name' => 'UI/UX Design', 
                'slug' => 'ui-ux-design', 
                'description' => 'User interface and user experience design services',
                'icon' => 'desktop',
                'is_active' => true
            ],
            [
                'name' => 'Data Entry', 
                'slug' => 'data-entry', 
                'description' => 'Data entry and processing services',
                'icon' => 'database',
                'is_active' => true
            ],
            [
                'name' => 'Translation', 
                'slug' => 'translation', 
                'description' => 'Translation services for various languages',
                'icon' => 'language',
                'is_active' => true
            ],
            [
                'name' => 'Photography', 
                'slug' => 'photography', 
                'description' => 'Photography services for various purposes',
                'icon' => 'camera',
                'is_active' => true
            ]
        ];

        DB::table('categories')->insert($categories);
    }
}
