<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Revision extends Model
{
    use HasFactory;
    
    protected $fillable = [
        'order_id',
        'client_id',
        'freelancer_id',
        'delivery_id',
        'message',
        'status',
        'deadline_extension', // dalam hari
    ];
    
    protected $casts = [
        'deadline_extension' => 'integer',
    ];
    
    /**
     * Get the order that this revision belongs to
     */
    public function order(): BelongsTo
    {
        return $this->belongsTo(Order::class);
    }
    
    /**
     * Get the client that requested this revision
     */
    public function client(): BelongsTo
    {
        return $this->belongsTo(Client::class);
    }
    
    /**
     * Get the freelancer that needs to do this revision
     */
    public function freelancer(): BelongsTo
    {
        return $this->belongsTo(Freelancer::class);
    }
    
    /**
     * Get the delivery that this revision is for
     */
    public function delivery(): BelongsTo
    {
        return $this->belongsTo(Delivery::class);
    }
}
