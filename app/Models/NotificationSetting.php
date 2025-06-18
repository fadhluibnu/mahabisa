<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class NotificationSetting extends Model
{
    use HasFactory;
    
    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'user_id',
        'email_project_updates',
        'email_messages',
        'email_promotions',
        'email_newsletter',
        'site_project_updates',
        'site_messages',
        'site_promotions',
        'site_newsletter',
    ];
    
    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_project_updates' => 'boolean',
        'email_messages' => 'boolean',
        'email_promotions' => 'boolean',
        'email_newsletter' => 'boolean',
        'site_project_updates' => 'boolean',
        'site_messages' => 'boolean',
        'site_promotions' => 'boolean',
        'site_newsletter' => 'boolean',
    ];
    
    /**
     * Get the user that owns the notification settings
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
