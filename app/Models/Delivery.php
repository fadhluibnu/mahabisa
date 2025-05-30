<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Delivery extends Model
{
    use HasFactory;
    
    protected $fillable = [
        'order_id',
        'freelancer_id',
        'message',
        'file_path',
        'is_final',
        'is_accepted',
    ];
    
    protected $casts = [
        'is_final' => 'boolean',
        'is_accepted' => 'boolean',
    ];
    
    /**
     * Get the order that this delivery belongs to
     */
    public function order(): BelongsTo
    {
        return $this->belongsTo(Order::class);
    }
    
    /**
     * Get the freelancer that created this delivery
     */
    public function freelancer(): BelongsTo
    {
        return $this->belongsTo(Freelancer::class);
    }
}
