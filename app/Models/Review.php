<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Review extends Model
{
    use HasFactory;
    
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'order_id',
        'client_id',
        'freelancer_id',
        'project_id',
        'service_id',
        'rating',
        'review_text',
        'is_public',
        'response',
        'is_featured',
    ];
    
    /**
     * The attributes that should be cast.
     *
     * @var array
     */
    protected $casts = [
        'rating' => 'integer',
        'is_public' => 'boolean',
        'is_featured' => 'boolean',
    ];
    
    /**
     * Get the order associated with this review.
     */
    public function order(): BelongsTo
    {
        return $this->belongsTo(Order::class);
    }
    
    /**
     * Get the client who wrote this review.
     */
    public function client(): BelongsTo
    {
        return $this->belongsTo(User::class, 'client_id');
    }
    
    /**
     * Get the freelancer who received this review.
     */
    public function freelancer(): BelongsTo
    {
        return $this->belongsTo(User::class, 'freelancer_id');
    }
    
    /**
     * Get the project associated with this review.
     */
    public function project(): BelongsTo
    {
        return $this->belongsTo(Project::class);
    }
    
    /**
     * Get the service associated with this review.
     */
    public function service(): BelongsTo
    {
        return $this->belongsTo(Service::class);
    }
}
