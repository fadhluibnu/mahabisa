<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ServiceRequirement extends Model
{
    use HasFactory;

    protected $table = 'service_requirements';

    protected $fillable = [
        'service_id',
        'question',
        'required',
        'description'
    ];

    /**
     * Get the service that owns the requirement.
     */
    public function service(): BelongsTo
    {
        return $this->belongsTo(Service::class, 'service_id');
    }
    
    /**
     * Get the description attribute
     * For backward compatibility with front-end
     */
    public function getDescriptionAttribute()
    {
        return $this->question;
    }
}
