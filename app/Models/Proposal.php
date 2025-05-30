<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Proposal extends Model
{
    use HasFactory;
    
    protected $fillable = [
        'freelancer_id',
        'project_id',
        'cover_letter',
        'bid_amount',
        'delivery_time',
        'status',
        'attachment',
        'notes',
        'is_read_by_client'
    ];
    
    protected $casts = [
        'bid_amount' => 'float',
        'delivery_time' => 'integer',
        'is_read_by_client' => 'boolean'
    ];
    
    /**
     * Get the freelancer that submitted this proposal
     */
    public function freelancer(): BelongsTo
    {
        return $this->belongsTo(Freelancer::class);
    }
    
    /**
     * Get the project this proposal is for
     */
    public function project(): BelongsTo
    {
        return $this->belongsTo(Project::class);
    }
}
