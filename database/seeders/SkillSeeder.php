<?php

namespace Database\Seeders;

use App\Models\Skill;
use App\Models\Freelancer;
use App\Models\Category;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class SkillSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $webDevCategory = Category::where('name', 'Web Development')->first();
        $mobileCategory = Category::where('name', 'Mobile App Development')->first();
        $designCategory = Category::where('name', 'Graphic Design')->first();
        $uiuxCategory = Category::where('name', 'UI/UX Design')->first();
          $skills = [
            // Web Development Skills
            ['skill_name' => 'HTML', 'category_id' => $webDevCategory ? $webDevCategory->id : null, 'is_verified' => true, 'created_at' => now(), 'updated_at' => now()],
            ['skill_name' => 'CSS', 'category_id' => $webDevCategory ? $webDevCategory->id : null, 'is_verified' => true, 'created_at' => now(), 'updated_at' => now()],
            ['skill_name' => 'JavaScript', 'category_id' => $webDevCategory ? $webDevCategory->id : null, 'is_verified' => true, 'created_at' => now(), 'updated_at' => now()],
            ['skill_name' => 'PHP', 'category_id' => $webDevCategory ? $webDevCategory->id : null, 'is_verified' => true, 'created_at' => now(), 'updated_at' => now()],
            ['skill_name' => 'Laravel', 'category_id' => $webDevCategory ? $webDevCategory->id : null, 'is_verified' => true, 'created_at' => now(), 'updated_at' => now()],
            ['skill_name' => 'React', 'category_id' => $webDevCategory ? $webDevCategory->id : null, 'is_verified' => true, 'created_at' => now(), 'updated_at' => now()],
            ['skill_name' => 'Vue.js', 'category_id' => $webDevCategory ? $webDevCategory->id : null, 'is_verified' => true, 'created_at' => now(), 'updated_at' => now()],
            ['skill_name' => 'Node.js', 'category_id' => $webDevCategory ? $webDevCategory->id : null, 'is_verified' => true, 'created_at' => now(), 'updated_at' => now()],
            ['skill_name' => 'Express.js', 'category_id' => $webDevCategory ? $webDevCategory->id : null, 'is_verified' => true, 'created_at' => now(), 'updated_at' => now()],
            ['skill_name' => 'MySQL', 'category_id' => $webDevCategory ? $webDevCategory->id : null, 'is_verified' => true, 'created_at' => now(), 'updated_at' => now()],
            
            // Mobile App Development Skills
            ['skill_name' => 'React Native', 'category_id' => $mobileCategory ? $mobileCategory->id : null, 'is_verified' => true, 'created_at' => now(), 'updated_at' => now()],
            ['skill_name' => 'Flutter', 'category_id' => $mobileCategory ? $mobileCategory->id : null, 'is_verified' => true, 'created_at' => now(), 'updated_at' => now()],
            ['skill_name' => 'Swift', 'category_id' => $mobileCategory ? $mobileCategory->id : null, 'is_verified' => true, 'created_at' => now(), 'updated_at' => now()],
            ['skill_name' => 'Kotlin', 'category_id' => $mobileCategory ? $mobileCategory->id : null, 'is_verified' => true, 'created_at' => now(), 'updated_at' => now()],
            ['skill_name' => 'Java for Android', 'category_id' => $mobileCategory ? $mobileCategory->id : null, 'is_verified' => true, 'created_at' => now(), 'updated_at' => now()],
            
            // Graphic Design Skills
            ['skill_name' => 'Adobe Photoshop', 'category_id' => $designCategory ? $designCategory->id : null, 'is_verified' => true, 'created_at' => now(), 'updated_at' => now()],
            ['skill_name' => 'Adobe Illustrator', 'category_id' => $designCategory ? $designCategory->id : null, 'is_verified' => true, 'created_at' => now(), 'updated_at' => now()],
            ['skill_name' => 'Logo Design', 'category_id' => $designCategory ? $designCategory->id : null, 'is_verified' => true, 'created_at' => now(), 'updated_at' => now()],
            ['skill_name' => 'Brand Identity', 'category_id' => $designCategory ? $designCategory->id : null, 'is_verified' => true, 'created_at' => now(), 'updated_at' => now()],
            
            // UI/UX Design Skills
            ['skill_name' => 'Figma', 'category_id' => $uiuxCategory ? $uiuxCategory->id : null, 'is_verified' => true, 'created_at' => now(), 'updated_at' => now()],
            ['skill_name' => 'Adobe XD', 'category_id' => $uiuxCategory ? $uiuxCategory->id : null, 'is_verified' => true, 'created_at' => now(), 'updated_at' => now()],
            ['skill_name' => 'Sketch', 'category_id' => $uiuxCategory ? $uiuxCategory->id : null, 'is_verified' => true, 'created_at' => now(), 'updated_at' => now()],
            ['skill_name' => 'User Research', 'category_id' => $uiuxCategory ? $uiuxCategory->id : null, 'is_verified' => true, 'created_at' => now(), 'updated_at' => now()],
            ['skill_name' => 'Wireframing', 'category_id' => $uiuxCategory ? $uiuxCategory->id : null, 'is_verified' => true, 'created_at' => now(), 'updated_at' => now()],
            ['skill_name' => 'Prototyping', 'category_id' => $uiuxCategory ? $uiuxCategory->id : null, 'is_verified' => true, 'created_at' => now(), 'updated_at' => now()],
        ];
        
        DB::table('skills')->insert($skills);
        
        // Assign skills to freelancers
        $freelancers = Freelancer::all();
        $allSkills = Skill::all();
        
        foreach ($freelancers as $freelancer) {
            // Get random 3-6 skills
            $skillCount = rand(3, 6);
            $randomSkills = $allSkills->random($skillCount);
            
            foreach ($randomSkills as $skill) {
                DB::table('freelancer_skill')->insert([
                    'freelancer_id' => $freelancer->id,
                    'skill_id' => $skill->id,
                    'proficiency_level' => rand(3, 5),
                    'created_at' => now(),
                    'updated_at' => now()
                ]);
            }
        }
    }
}
