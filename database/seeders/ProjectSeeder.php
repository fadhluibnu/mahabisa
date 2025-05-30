<?php

namespace Database\Seeders;

use App\Models\Project;
use App\Models\Client;
use App\Models\Category;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ProjectSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $clients = Client::all();
        $categories = Category::all();
        
        if ($clients->isEmpty()) {
            return;
        }
        
        $projectTitles = [
            'Website Development for Local Restaurant',
            'E-commerce Platform Development',
            'Mobile App for Fitness Tracking',
            'Logo and Brand Identity Design',
            'Content Writing for Company Blog',
            'Digital Marketing Campaign',
            'UI/UX Design for Financial App',
            'Video Editing for Product Promotion',
            'Database Migration and Optimization',
            'Custom CRM System Development',
            'Social Media Management',
            'Illustration for Children\'s Book',
            'SEO Optimization for E-commerce',
            'Corporate Website Redesign'
        ];
        
        $projectDescriptions = [
            'Looking for an experienced developer to create a modern and responsive website for our restaurant. The website should include online reservation, menu display, and contact information.',
            'We need an e-commerce platform with product catalog, shopping cart, payment integration, and admin dashboard. Should be responsive and user-friendly.',
            'Develop a mobile app for tracking fitness activities, workout routines, and nutrition. Should include user authentication and data visualization.',
            'Create a unique and professional logo and brand identity for our startup. Deliverables include logo in different formats, color palette, and basic brand guidelines.',
            'Write high-quality and engaging blog posts for our company website. Topics will be provided, and articles should be SEO-optimized.',
            'Plan and execute a digital marketing campaign to increase our brand visibility and customer acquisition. Should include strategy, execution, and performance reporting.'
        ];
        
        $skillsRequired = [
            'HTML, CSS, JavaScript, Responsive Design, PHP, MySQL',
            'React, Node.js, MongoDB, Express.js, Payment API Integration',
            'React Native or Flutter, Firebase, RESTful APIs',
            'Adobe Illustrator, Photoshop, Brand Design, Typography',
            'Content Writing, SEO, Copywriting, Research',
            'Digital Marketing, Social Media, SEO, Google Ads',
            'Figma, Adobe XD, User Research, Wireframing, Prototyping'
        ];
        
        foreach ($clients as $client) {
            // Each client gets 1-3 projects
            $projectCount = rand(1, 3);
            
            for ($i = 0; $i < $projectCount; $i++) {
                $title = $projectTitles[array_rand($projectTitles)];
                $description = $projectDescriptions[array_rand($projectDescriptions)];
                $skills = $skillsRequired[array_rand($skillsRequired)];
                $budgetType = rand(0, 1) ? 'fixed' : 'hourly';
                $status = ['draft', 'open', 'in_progress', 'review', 'completed', 'cancelled'][rand(0, 5)];
                
                Project::create([
                    'client_id' => $client->id,
                    'category_id' => $categories->random()->id,
                    'title' => $title,
                    'description' => $description,
                    'status' => $status,
                    'budget' => $budgetType == 'fixed' ? rand(500000, 5000000) : rand(50000, 300000),
                    'budget_type' => $budgetType,
                    'deadline' => now()->addDays(rand(7, 60)),
                    'skills_required' => $skills,
                    'is_featured' => rand(0, 10) > 8 // 20% chance of being featured
                ]);
            }
        }
    }
}
