<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Freelancer extends Model
{
    /** @use HasFactory<\Database\Factories\FreelancerFactory> */
    use HasFactory;
    
    protected $fillable = [
        'user_id',
        'category_id',
        'hourly_rate',
        'availability',
        'rating',
        'total_earnings',
        'account_balance',
        'bank_info',
        'bio',
        'skills',
        'profile_image',
        'completed_projects',
        'is_verified'
    ];
    
    protected $casts = [
        'hourly_rate' => 'float',
        'rating' => 'float',
        'total_earnings' => 'float',
        'account_balance' => 'float',
        'skills' => 'array',
        'is_verified' => 'boolean'
    ];
    
    /**
     * Get the user associated with the freelancer
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
    
    /**
     * Get the category associated with the freelancer
     */
    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }
    
    /**
     * Get the banks associated with the freelancer
     */
    public function banks(): BelongsToMany
    {
        return $this->belongsToMany(Bank::class)
                   ->using(FreelancerBank::class)
                   ->withPivot('account_number', 'account_name', 'is_primary', 'is_active')
                   ->withTimestamps();
    }
    
    /**
     * Get the primary bank account for this freelancer
     */
    public function primaryBank()
    {
        return $this->belongsToMany(Bank::class)
                   ->using(FreelancerBank::class)
                   ->withPivot('account_number', 'account_name', 'is_primary', 'is_active')
                   ->wherePivot('is_primary', true)
                   ->first();
    }
    
    /**
     * Get the portfolios associated with the freelancer
     */
    public function portofolios(): HasMany
    {
        return $this->hasMany(Portofolio::class);
    }

    /**
     * Get the orders associated with this freelancer
     */
    public function orders(): HasMany
    {
        return $this->hasMany(Order::class);
    }

    /**
     * Get the reviews for this freelancer
     */
    public function reviews(): HasMany
    {
        return $this->hasMany(Review::class);
    }
    
    /**
     * Get the educations for this freelancer
     */
    public function educations(): HasMany
    {
        return $this->hasMany(FreelancerEducation::class);
    }
    
    /**
     * Get the current education for this freelancer
     */
    public function currentEducation(): HasOne
    {
        return $this->hasOne(FreelancerEducation::class)->where('is_current', true);
    }
    
    /**
     * Edit freelancer profile
     */
    public function editProfile($data)
    {
        $this->update($data);
    }
    
    /**
     * Add a portfolio item
     */
    public function addPortfolio($data)
    {
        return $this->portofolios()->create($data);
    }
    
    /**
     * Remove a portfolio item
     */
    public function removePortfolio($portfolioId)
    {
        return $this->portofolios()->where('id', $portfolioId)->delete();
    }
    
    /**
     * Update freelancer skills
     */
    public function updateSkills($skills)
    {
        $this->skills = $skills;
        $this->save();
    }
    
    /**
     * Withdraw funds from account balance
     */
    public function withdrawFunds($amount)
    {
        if ($this->account_balance >= $amount) {
            $this->account_balance -= $amount;
            $this->save();
            return true;
        }
        return false;
    }
    
    /**
     * Set freelancer availability status
     */
    public function setAvailability($status)
    {
        $this->availability = $status;
        $this->save();
    }
}
