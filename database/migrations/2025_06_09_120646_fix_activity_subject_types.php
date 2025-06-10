<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;
use App\Models\Service;
use App\Models\Proposal;
use App\Models\Order;
use App\Models\Withdrawal;
use App\Models\Education;
use App\Models\Experience;
use App\Models\Portfolio;

return new class extends Migration
{
    /**
     * Run the migrations to fix existing activity records with string subject_types.
     * Convert string subject_type values to fully qualified class names.
     */
    public function up(): void
    {
        // Map of string subject_types to their fully qualified class names
        $typeMapping = [
            'service' => Service::class,
            'proposal' => Proposal::class,
            'order' => Order::class,
            'withdrawal' => Withdrawal::class,
            'education' => Education::class,
            'experience' => Experience::class,
            'portfolio' => Portfolio::class,
        ];

        // Update each type of activity record
        foreach ($typeMapping as $oldType => $newType) {
            DB::table('activities')
                ->where('subject_type', $oldType)
                ->update(['subject_type' => $newType]);
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // Map of fully qualified class names to their string representation
        $reverseMapping = [
            Service::class => 'service',
            Proposal::class => 'proposal',
            Order::class => 'order',
            Withdrawal::class => 'withdrawal',
            Education::class => 'education',
            Experience::class => 'experience',
            Portfolio::class => 'portfolio',
        ];

        // Revert each type of activity record
        foreach ($reverseMapping as $newType => $oldType) {
            DB::table('activities')
                ->where('subject_type', $newType)
                ->update(['subject_type' => $oldType]);
        }
    }
};
