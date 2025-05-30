<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Skill extends Model
{
    use HasFactory;
    
    protected $fillable = [
        'skill_name',
        'category_id',
    ];
    
    /**
     * Get the freelancers who have this skill
     */
    public function freelancers(): BelongsToMany
    {
        return $this->belongsToMany(Freelancer::class)
                    ->withPivot('proficiency_level')
                    ->withTimestamps();
    }
    
    /**
     * Get the category of this skill
     */
    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }
    
    /**
     * Get the name of the skill
     */
    public function getSkillName(): string
    {
        return $this->skill_name;
    }
    
    /**
     * Set the name of the skill
     */
    public function setSkillName(string $name): void
    {
        $this->skill_name = $name;
        $this->save();
    }
}