<?php

namespace Database\Seeders;

use App\Models\Freelancer;
use App\Models\Project;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Proposal;
use Illuminate\Support\Facades\DB;

class ProposalSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $freelancers = Freelancer::all();
        $openProjects = Project::where('status', 'open')->get();
        
        if ($freelancers->isEmpty() || $openProjects->isEmpty()) {
            return;
        }
        
        $coverLetterTemplates = [
            "Saya sangat tertarik dengan proyek ini karena sesuai dengan keahlian yang saya miliki. Saya memiliki pengalaman {years} tahun di bidang ini dan siap memberikan hasil terbaik untuk Anda.",
            "Sebagai seorang profesional di bidang ini, saya dapat memberikan solusi yang sesuai dengan kebutuhan Anda. Saya telah menyelesaikan beberapa proyek serupa yang dapat menjadi referensi kualitas kerja saya.",
            "Setelah membaca deskripsi proyek Anda, saya yakin dapat menyelesaikannya dengan baik. Saya memiliki pengalaman dan keterampilan yang dibutuhkan untuk menyelesaikan proyek ini tepat waktu dan sesuai harapan."
        ];
        
        foreach ($openProjects as $project) {
            // Each project gets 1-3 proposals
            $proposalCount = rand(1, 3);
            
            // Get random freelancers for this project
            $projectFreelancers = $freelancers->random($proposalCount);
            
            foreach ($projectFreelancers as $freelancer) {
                // Calculate a bid amount around the project budget
                $bidAmount = $project->budget_type == 'fixed' 
                    ? $project->budget * (rand(80, 120) / 100) // 80-120% of the budget
                    : $project->budget * (rand(90, 110) / 100); // 90-110% of hourly rate
                
                $coverLetter = str_replace("{years}", rand(1, 8), $coverLetterTemplates[array_rand($coverLetterTemplates)]);
                $status = ['pending', 'accepted', 'rejected', 'withdrawn'][rand(0, 3)];
                
                DB::table('proposals')->insert([
                    'freelancer_id' => $freelancer->id,
                    'project_id' => $project->id,
                    'cover_letter' => $coverLetter,
                    'bid_amount' => $bidAmount,
                    'delivery_time' => rand(1, 30), // 1-30 days
                    'status' => $status,
                    'notes' => $status == 'accepted' ? 'Proposal diterima, silahkan mulai pekerjaan' : null,
                    'is_read_by_client' => $status != 'pending',
                    'created_at' => now()->subDays(rand(1, 10)),
                    'updated_at' => now()->subDays(rand(0, 5))
                ]);
                
                // Update projects proposals count
                $project->proposals_count = $project->proposals_count + 1;
                $project->save();
            }
        }
    }
}
