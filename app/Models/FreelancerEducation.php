<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class FreelancerEducation extends Model
{
    use HasFactory;
    
    protected $table = 'freelancer_education';
    
    protected $fillable = [
        'freelancer_id',
        'educational_institution_id',
        'education_level_id',
        'major',
        'student_id',
        'start_year',
        'end_year',
        'is_current',
        'verification_document',
        'is_verified'
    ];
    
    protected $casts = [
        'start_year' => 'integer',
        'end_year' => 'integer',
        'is_current' => 'boolean',
        'is_verified' => 'boolean'
    ];
    
    /**
     * Get the freelancer that owns this education
     */
    public function freelancer(): BelongsTo
    {
        return $this->belongsTo(Freelancer::class);
    }
    
    /**
     * Get the educational institution for this education
     */
    public function educationalInstitution(): BelongsTo
    {
        return $this->belongsTo(EducationalInstitution::class);
    }
    
    /**
     * Get the education level for this education
     */
    public function educationLevel(): BelongsTo
    {
        return $this->belongsTo(EducationLevel::class);
    }
}
