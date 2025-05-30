<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Chat extends Model
{
    use HasFactory;
    
    protected $fillable = [
        'sender_id',
        'receiver_id',
        'message',
        'is_read',
        'attachment',
    ];
    
    protected $casts = [
        'is_read' => 'boolean',
    ];
    
    /**
     * Get the user that sent the message
     */
    public function sender(): BelongsTo
    {
        return $this->belongsTo(User::class, 'sender_id');
    }
    
    /**
     * Get the user that received the message
     */
    public function receiver(): BelongsTo
    {
        return $this->belongsTo(User::class, 'receiver_id');
    }
    
    /**
     * Read message
     */
    public function readMessage(): void
    {
        $this->is_read = true;
        $this->save();
    }
    
    /**
     * Delete message
     */
    public function deleteMessage(): void
    {
        $this->delete();
    }
    
    /**
     * Attach file to message
     */
    public function attachFile($file): void
    {
        // File attachment logic
        $this->attachment = $file;
        $this->save();
    }
    
    /**
     * Mark message as read
     */
    public function markAsRead(): void
    {
        $this->is_read = true;
        $this->save();
    }
}