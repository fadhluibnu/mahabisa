<?php

namespace Database\Seeders;

use App\Models\Tag;
use App\Models\Portofolio;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class TagSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */    public function run(): void
    {
        $tags = [
            ['name' => 'Website', 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'Mobile App', 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'Web Design', 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'UI/UX', 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'E-commerce', 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'Logo', 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'Branding', 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'Frontend', 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'Backend', 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'Full-stack', 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'Responsive', 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'WordPress', 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'Laravel', 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'React', 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'Bootstrap', 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'JavaScript', 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'PHP', 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'API', 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'Database', 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'Animation', 'created_at' => now(), 'updated_at' => now()]
        ];
        
        DB::table('tags')->insert($tags);
        
        // Assign tags to portfolios
        $portfolios = Portofolio::all();
        $allTags = Tag::all();
        
        foreach ($portfolios as $portfolio) {
            // Get random 2-5 tags for each portfolio
            $tagCount = rand(2, 5);
            $randomTags = $allTags->random($tagCount);
            
            foreach ($randomTags as $tag) {
                DB::table('portofolio_tag')->insert([
                    'portofolio_id' => $portfolio->id,
                    'tag_id' => $tag->id,
                    'created_at' => now(),
                    'updated_at' => now()
                ]);
            }
        }
    }
}
