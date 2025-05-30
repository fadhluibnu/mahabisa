<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Portofolio extends Model
{
    /** @use HasFactory<\Database\Factories\PortofolioFactory> */
    use HasFactory;
    
    protected $fillable = [
        'freelancer_id',
        'category_id',
        'title',
        'description',
        'file_url',
        'project_url',
        'completed_date',
        'client_name',
        'technologies_used',
        'is_featured',
        'views'
    ];
    
    protected $casts = [
        'completed_date' => 'date',
        'technologies_used' => 'array',
        'is_featured' => 'boolean',
        'views' => 'integer'
    ];
    
    /**
     * Get the freelancer that owns the portfolio
     */
    public function freelancer(): BelongsTo
    {
        return $this->belongsTo(Freelancer::class);
    }
    
    /**
     * Get the category that the portfolio belongs to
     */
    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }
    
    /**
     * Get the tags associated with this portfolio
     */
    public function tags(): BelongsToMany
    {
        return $this->belongsToMany(Tag::class)->withTimestamps();
    }
    
    /**
     * Add a new portfolio item
     */
    public function addItem()
    {
        // Create new portfolio item logic
        // This method is typically handled at the controller level
    }
    
    /**
     * Remove a portfolio item
     */
    public function removeItem()
    {
        return $this->delete();
    }
    
    /**
     * Update a portfolio item
     */
    public function updateItem($data)
    {
        $this->update($data);
    }
    
    /**
     * Get the number of views for this portfolio
     */
    public function getViews()
    {
        return $this->views;
    }
    
    /**
     * Increment the view count
     */
    public function incrementViews()
    {
        $this->increment('views');
    }
}
