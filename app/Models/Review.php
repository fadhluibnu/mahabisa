<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Review extends Model
{
    use HasFactory;
    
    protected $fillable = [
        'order_id',
        'client_id',
        'freelancer_id',
        'rating',
        'comment',
        'helpful_count',
        'is_reported'
    ];
    
    protected $casts = [
        'rating' => 'integer',
        'helpful_count' => 'integer',
        'is_reported' => 'boolean'
    ];
    
    /**
     * Get the order associated with the review
     */
    public function order(): BelongsTo
    {
        return $this->belongsTo(Order::class);
    }
    
    /**
     * Get the client who wrote the review
     */
    public function client(): BelongsTo
    {
        return $this->belongsTo(Client::class);
    }
    
    /**
     * Get the freelancer who received the review
     */
    public function freelancer(): BelongsTo
    {
        return $this->belongsTo(Freelancer::class);
    }
    
    /**
     * Mark review as helpful
     */
    public function markHelpful(): void
    {
        $this->increment('helpful_count');
    }
    
    /**
     * Report review
     */
    public function reportReview(): void
    {
        $this->is_reported = true;
        $this->save();
    }
}
