<?php

namespace Database\Seeders;

use App\Models\Portofolio;
use App\Models\Freelancer;
use App\Models\Category;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PortofolioSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $freelancers = Freelancer::all();
        $categories = Category::all();
        
        if ($freelancers->isEmpty()) {
            return;
        }
        
        $projectTitles = [
            'E-commerce Website Development',
            'Corporate Brand Identity Design',
            'Mobile App UI/UX Design',
            'Content Management System',
            'Social Media Marketing Campaign',
            'Custom CRM Development',
            'Product Photography',
            'Educational Video Production',
            'Technical Documentation',
            'Data Visualization Dashboard'
        ];
        
        foreach ($freelancers as $freelancer) {
            // Each freelancer gets 1-3 portofolios
            $portofolioCount = rand(1, 3);
            
            for ($i = 0; $i < $portofolioCount; $i++) {
                $title = $projectTitles[array_rand($projectTitles)];
                
                Portofolio::create([
                    'freelancer_id' => $freelancer->id,
                    'category_id' => $categories->random()->id,
                    'title' => $title,
                    'description' => 'This is a sample project showcasing my skills in ' . $title,
                    'image_url' => 'portfolio-' . rand(1, 10) . '.jpg',
                    'project_url' => 'https://project' . rand(1, 100) . '.example.com',
                    'completed_date' => now()->subDays(rand(10, 365)),
                    'client_name' => 'Client ' . rand(1, 20),
                    'technologies_used' => 'HTML, CSS, JavaScript, PHP, Laravel',
                    'views' => rand(5, 200),
                    'is_featured' => rand(0, 10) > 8 // 20% chance of being featured
                ]);
            }
        }
    }
}
