<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\MorphTo;

class Notification extends Model
{
    use HasFactory;
    
    protected $fillable = [
        'user_id',
        'title',
        'message',
        'type',
        'link',
        'is_read'
    ];
    
    protected $casts = [
        'is_read' => 'boolean',
    ];
    
    /**
     * Get the user that owns the notification
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
    
    /**
     * Get the owning notifiable model
     */
    public function notifiable(): MorphTo
    {
        return $this->morphTo();
    }
    
    /**
     * Mark notification as read
     */
    public function markAsRead(): void
    {
        $this->is_read = true;
        $this->save();
    }
}