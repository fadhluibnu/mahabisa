<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class EducationalInstitution extends Model
{
    use HasFactory;
    
    protected $fillable = [
        'name',
        'type',
        'city',
        'province',
        'website',
        'logo',
        'is_verified'
    ];
    
    protected $casts = [
        'is_verified' => 'boolean'
    ];
    
    /**
     * Get the freelancer educations for this institution
     */
    public function freelancerEducations(): HasMany
    {
        return $this->hasMany(FreelancerEducation::class);
    }
}
