<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Message extends Model
{
    use HasFactory;
    
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'sender_id',
        'recipient_id',
        'order_id',
        'project_id',
        'message',
        'attachments',
        'is_read',
        'read_at',
    ];
    
    /**
     * The attributes that should be cast.
     *
     * @var array
     */
    protected $casts = [
        'attachments' => 'json',
        'is_read' => 'boolean',
        'read_at' => 'datetime',
    ];
    
    /**
     * Get the user who sent the message.
     */
    public function sender(): BelongsTo
    {
        return $this->belongsTo(User::class, 'sender_id');
    }
    
    /**
     * Get the user who received the message.
     */
    public function recipient(): BelongsTo
    {
        return $this->belongsTo(User::class, 'recipient_id');
    }
    
    /**
     * Get the order associated with this message.
     */
    public function order(): BelongsTo
    {
        return $this->belongsTo(Order::class);
    }
    
    /**
     * Get the project associated with this message.
     */
    public function project(): BelongsTo
    {
        return $this->belongsTo(Project::class);
    }
}
