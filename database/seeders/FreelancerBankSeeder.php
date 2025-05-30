<?php

namespace Database\Seeders;

use App\Models\Freelancer;
use App\Models\Bank;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class FreelancerBankSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $freelancers = Freelancer::all();
        $banks = Bank::all();
        
        if ($freelancers->isEmpty() || $banks->isEmpty()) {
            return;
        }
        
        foreach ($freelancers as $freelancer) {
            // Each freelancer gets 1-2 bank accounts
            $bankCount = rand(1, 2);
            $selectedBanks = $banks->random($bankCount);
            $isPrimary = true;
            
            foreach ($selectedBanks as $bank) {
                DB::table('freelancer_bank')->insert([
                    'freelancer_id' => $freelancer->id,
                    'bank_id' => $bank->id,
                    'account_number' => $this->generateRandomAccountNumber($bank->code),
                    'account_name' => strtoupper($freelancer->user->name),
                    'is_primary' => $isPrimary,
                    'is_active' => true,
                    'created_at' => now(),
                    'updated_at' => now()
                ]);
                
                // Only the first bank account is primary
                $isPrimary = false;
            }
        }
    }
    
    /**
     * Generate random bank account number based on bank code
     */
    private function generateRandomAccountNumber(string $bankCode = null): string
    {
        switch ($bankCode) {
            case 'BCA':
                return rand(1, 9) . str_pad(rand(0, 999999999), 9, '0', STR_PAD_LEFT);
            case 'BRI':
                return rand(1, 9) . str_pad(rand(0, 99999999999999), 14, '0', STR_PAD_LEFT);
            case 'MANDIRI':
                return rand(1, 9) . str_pad(rand(0, 999999999999), 12, '0', STR_PAD_LEFT);
            case 'BNI':
                return rand(1, 9) . str_pad(rand(0, 999999999), 9, '0', STR_PAD_LEFT);
            default:
                return rand(1, 9) . str_pad(rand(0, 9999999999), 10, '0', STR_PAD_LEFT);
        }
    }
}
