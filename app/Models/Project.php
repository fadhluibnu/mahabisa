<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Project extends Model
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
        'budget_min',
        'budget_max',
        'budget_type',
        'deadline',
        'status',
        'skills_required',
        'attachments',
        'is_featured',
        'visibility',
        'view_count',
    ];
    
    /**
     * The attributes that should be cast.
     *
     * @var array
     */
    protected $casts = [
        'budget_min' => 'decimal:2',
        'budget_max' => 'decimal:2',
        'deadline' => 'date',
        'skills_required' => 'json',
        'attachments' => 'json',
        'is_featured' => 'boolean',
    ];
    
    /**
     * Get the user (client) who created this project.
     */
    public function client(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id');
    }
    
    /**
     * Get the category that the project belongs to.
     */
    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }
    
    /**
     * Get the proposals for this project.
     */
    public function proposals(): HasMany
    {
        return $this->hasMany(Proposal::class);
    }
    
    /**
     * Get the orders associated with this project.
     */
    public function orders(): HasMany
    {
        return $this->hasMany(Order::class);
    }
    
    /**
     * Get the reviews associated with this project.
     */
    public function reviews(): HasMany
    {
        return $this->hasMany(Review::class);
    }
}
