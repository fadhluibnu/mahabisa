<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    /** @use HasFactory<\Database\Factories\CategoryFactory> */
    use HasFactory;
    
    protected $fillable = [
        'name',
        'slug',
        'description',
        'icon',
        'is_active'
    ];
    
    protected $casts = [
        'is_active' => 'boolean'
    ];
    
    /**
     * Get the freelancers that belong to this category
     */
    public function freelancers()
    {
        return $this->hasMany(Freelancer::class);
    }
    
    /**
     * Get the portfolios that belong to this category
     */
    public function portofolios()
    {
        return $this->hasMany(Portofolio::class);
    }
    
    /**
     * Get the projects that belong to this category
     */
    public function projects()
    {
        return $this->hasMany(Project::class);
    }
}
