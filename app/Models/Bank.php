<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Bank extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'type',
        'code',
        'swift_code',
        'logo',
        'account_number_format',
        'branches',
        'is_active',
    ];

    protected $casts = [
        'branches' => 'array',
        'is_active' => 'boolean',
    ];

    /**
     * Get the freelancers that use this bank
     */    
    public function freelancers(): BelongsToMany
    {
        return $this->belongsToMany(Freelancer::class)
                    ->using(FreelancerBank::class)
                    ->withPivot('account_number', 'account_name', 'is_primary', 'is_active')
                    ->withTimestamps();
    }
}
