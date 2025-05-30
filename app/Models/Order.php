<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Order extends Model
{
    use HasFactory;
    
    protected $fillable = [
        'client_id',
        'freelancer_id',
        'category_id',
        'title',
        'description',
        'status',
        'price',
        'deadline',
        'delivery_date',
        'revision_count',
        'requirements',
        'notes',
        'is_featured',
        'attachment'
    ];
    
    protected $casts = [
        'price' => 'double',
        'deadline' => 'datetime',
        'delivery_date' => 'datetime',
        'revision_count' => 'integer',
        'is_featured' => 'boolean'
    ];
    
    /**
     * Get the client that owns the order
     */
    public function client(): BelongsTo
    {
        return $this->belongsTo(Client::class);
    }
    
    /**
     * Get the freelancer that fulfills the order
     */
    public function freelancer(): BelongsTo
    {
        return $this->belongsTo(Freelancer::class);
    }
    
    /**
     * Get the category of the order
     */
    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }
    
    /**
     * Get the review for the order
     */
    public function review(): HasOne
    {
        return $this->hasOne(Review::class);
    }
    
    /**
     * Get the deliveries for the order
     */
    public function deliveries(): HasMany
    {
        return $this->hasMany(Delivery::class);
    }
    
    /**
     * Get the revisions for the order
     */
    public function revisions(): HasMany
    {
        return $this->hasMany(Revision::class);
    }
}
