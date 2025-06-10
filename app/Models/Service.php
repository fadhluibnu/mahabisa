<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Service extends Model
{
    use HasFactory;
    
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'user_id',
        'category_id',
        'title',
        'description',
        'price',
        'price_type',
        'delivery_time',
        'revisions',
        'requirements',
        'thumbnail',
        'gallery',
        'is_active',
        'view_count',
    ];
    
    /**
     * The attributes that should be cast.
     *
     * @var array
     */
    protected $casts = [
        'price' => 'decimal:2',
        'gallery' => 'json',
        'is_active' => 'boolean',
    ];
    
    /**
     * Get the user (freelancer) who created this service.
     */
    public function freelancer(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id');
    }
    
    /**
     * Alias for freelancer relationship
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
    
    /**
     * Get the category that the service belongs to.
     */
    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }
    
    /**
     * Get formatted price
     */
    public function getFormattedPriceAttribute()
    {
        return 'Rp ' . number_format($this->price, 0, ',', '.');
    }
    
    /**
     * Get average rating
     */
    public function getAvgRatingAttribute()
    {
        return $this->reviews()->avg('rating') ?: 0;
    }
    
    /**
     * Get the orders associated with this service.
     */
    public function orders(): HasMany
    {
        return $this->hasMany(Order::class);
    }
    
    /**
     * Get the reviews associated with this service.
     */
    public function reviews(): HasMany
    {
        return $this->hasMany(Review::class);
    }
    
    /**
     * Get the skills associated with this service.
     */
    public function skills()
    {
        return $this->belongsToMany(Skill::class, 'service_skill');
    }

    /**
     * Get the packages associated with this service.
     */
    public function packages()
    {
        return $this->hasMany(ServicePackage::class);
    }

    /**
     * Get the requirements associated with this service.
     */
    public function requirement_s()
    {
        return $this->hasMany(ServiceRequirement::class, 'service_id');
    }

    /**
     * Get the FAQs associated with this service.
     */
    public function faqs()
    {
        return $this->hasMany(ServiceFaq::class);
    }
}
