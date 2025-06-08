<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Proposal extends Model
{
    use HasFactory;
    
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'user_id',
        'project_id',
        'bid_amount',
        'bid_type',
        'delivery_time',
        'cover_letter',
        'attachments',
        'status',
        'rejection_reason',
        'is_read',
    ];
    
    /**
     * The attributes that should be cast.
     *
     * @var array
     */
    protected $casts = [
        'bid_amount' => 'decimal:2',
        'attachments' => 'json',
        'is_read' => 'boolean',
    ];
    
    /**
     * Get the user (freelancer) who submitted this proposal.
     */
    public function freelancer(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id');
    }
    
    /**
     * Get the project that this proposal is for.
     */
    public function project(): BelongsTo
    {
        return $this->belongsTo(Project::class);
    }
    
    /**
     * Get the order associated with this proposal.
     */
    public function order(): HasOne
    {
        return $this->hasOne(Order::class);
    }
}
