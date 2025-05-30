<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class EducationLevel extends Model
{
    use HasFactory;
    
    protected $fillable = [
        'name',
        'description'
    ];
    
    /**
     * Get the freelancer educations for this level
     */
    public function freelancerEducations(): HasMany
    {
        return $this->hasMany(FreelancerEducation::class);
    }
}
