<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Project extends Model
{
    use HasFactory;
    
    protected $fillable = [
        'client_id',
        'category_id',
        'title',
        'description',
        'status',
        'budget',
        'budget_type',
        'deadline',
        'attachment',
        'skills_required',
        'proposals_count',
        'is_featured'
    ];
    
    protected $casts = [
        'budget' => 'float',
        'deadline' => 'date',
        'skills_required' => 'array',
        'proposals_count' => 'integer',
        'is_featured' => 'boolean'
    ];
    
    /**
     * Get the client that owns the project
     */
    public function client(): BelongsTo
    {
        return $this->belongsTo(Client::class);
    }
    
    /**
     * Get the category of the project
     */
    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }
    
    /**
     * Get the proposals for this project
     */
    public function proposals(): HasMany
    {
        return $this->hasMany(Proposal::class);
    }
}
