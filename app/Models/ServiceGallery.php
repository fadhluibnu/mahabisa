<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ServiceGallery extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'service_id',
        'image_path',
        'order'
    ];

    /**
     * Get the service that owns the gallery image.
     */
    public function service(): BelongsTo
    {
        return $this->belongsTo(Service::class);
    }
}
