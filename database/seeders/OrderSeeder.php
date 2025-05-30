<?php

namespace Database\Seeders;

use App\Models\Client;
use App\Models\Freelancer;
use App\Models\Category;
use App\Models\Project;
use App\Models\Proposal;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class OrderSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Get accepted proposals to create orders from them
        $acceptedProposals = Proposal::where('status', 'accepted')->get();
        $categories = Category::all();
        
        if ($acceptedProposals->isEmpty()) {
            // If there are no accepted proposals, create random orders
            $clients = Client::all();
            $freelancers = Freelancer::all();
            
            if ($clients->isEmpty() || $freelancers->isEmpty()) {
                return;
            }
            
            $orderCount = 10; // Create 10 random orders
            
            for ($i = 0; $i < $orderCount; $i++) {
                $client = $clients->random();
                $freelancer = $freelancers->random();
                $category = $categories->random();
                $status = ['pending', 'accepted', 'in_progress', 'delivered', 'revision', 'completed', 'cancelled'][rand(0, 6)];
                
                $this->createOrder($client->id, $freelancer->id, $category->id, $status);
            }
        } else {
            // Create orders from accepted proposals
            foreach ($acceptedProposals as $proposal) {
                $project = $proposal->project;
                
                $this->createOrder(
                    $project->client_id,
                    $proposal->freelancer_id,
                    $project->category_id,
                    'in_progress',
                    $proposal->bid_amount,
                    $project->title,
                    $project->description
                );
            }
        }
    }
    
    /**
     * Create an order with the provided parameters
     */
    private function createOrder($clientId, $freelancerId, $categoryId, $status, $price = null, $title = null, $description = null)
    {
        // Generate random data if not provided
        if (is_null($price)) {
            $price = rand(500000, 5000000);
        }
        
        if (is_null($title)) {
            $titles = [
                'Website Development',
                'Logo Design',
                'Content Writing',
                'Mobile App Development',
                'SEO Optimization',
                'Social Media Campaign',
                'UI/UX Design',
                'Video Editing',
                'Data Analysis',
                'Wordpress Development'
            ];
            $title = $titles[array_rand($titles)];
        }
        
        if (is_null($description)) {
            $descriptions = [
                'Create a professional website with responsive design and modern UI.',
                'Design a unique and memorable logo that represents our brand identity.',
                'Write engaging content for our blog about technology and innovation.',
                'Develop a mobile app for Android and iOS with user authentication.',
                'Optimize our website for search engines to increase organic traffic.',
                'Create and manage a social media campaign to increase brand awareness.',
                'Design intuitive user interfaces for our web application.',
                'Edit and produce a promotional video for our new product.',
                'Analyze customer data and create visualizations for decision making.',
                'Create a custom Wordpress site with e-commerce functionality.'
            ];
            $description = $descriptions[array_rand($descriptions)];
        }
        
        // Calculate dates
        $createdAt = now()->subDays(rand(10, 60));
        $deadline = $createdAt->copy()->addDays(rand(7, 30));
        
        // For completed orders, set delivery date
        $deliveryDate = null;
        if (in_array($status, ['delivered', 'revision', 'completed'])) {
            $deliveryDate = $createdAt->copy()->addDays(rand(1, 20));
        }
        
        DB::table('orders')->insert([
            'client_id' => $clientId,
            'freelancer_id' => $freelancerId,
            'category_id' => $categoryId,
            'title' => $title,
            'description' => $description,
            'status' => $status,
            'price' => $price,
            'deadline' => $deadline,
            'delivery_date' => $deliveryDate,
            'revision_count' => in_array($status, ['revision', 'completed']) ? rand(0, 3) : 0,
            'requirements' => 'Please follow the provided guidelines and deliver high-quality work.',
            'notes' => 'Contact me if you have any questions.',
            'is_featured' => rand(0, 10) > 8, // 20% chance of being featured
            'created_at' => $createdAt,
            'updated_at' => now()->subDays(rand(0, 5))
        ]);
    }
}
