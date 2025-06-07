<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'role',
        'profile_photo_url',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }
    
    /**
     * Check if the user is an admin
     */
    public function isAdmin(): bool
    {
        return $this->role === 'admin';
    }
    
    /**
     * Check if the user is a freelancer
     */
    public function isFreelancer(): bool
    {
        return $this->role === 'freelancer';
    }
    
    /**
     * Check if the user is a client
     */
    public function isClient(): bool
    {
        return $this->role === 'client';
    }
    
    /**
     * Get the profile associated with the user
     */
    public function profile(): HasOne
    {
        return $this->hasOne(UserProfile::class);
    }
    
    /**
     * Get the user's education history
     */
    public function educations(): HasMany
    {
        return $this->hasMany(Education::class);
    }
    
    /**
     * Get the user's work experience
     */
    public function experiences(): HasMany
    {
        return $this->hasMany(Experience::class);
    }
    
    /**
     * Get the user's portfolio items
     */
    public function portfolios(): HasMany
    {
        return $this->hasMany(Portfolio::class);
    }
    
    /**
     * Get the user's skills
     */
    public function skills(): BelongsToMany
    {
        return $this->belongsToMany(Skill::class, 'user_skills')
                    ->withPivot('proficiency_level')
                    ->withTimestamps();
    }
    
    /**
     * Get the services offered by the user (as freelancer)
     */
    public function services(): HasMany
    {
        return $this->hasMany(Service::class);
    }
    
    /**
     * Get the projects created by the user (as client)
     */
    public function projects(): HasMany
    {
        return $this->hasMany(Project::class);
    }
    
    /**
     * Get the proposals submitted by the user (as freelancer)
     */
    public function proposals(): HasMany
    {
        return $this->hasMany(Proposal::class);
    }
    
    /**
     * Get orders where the user is a client
     */
    public function clientOrders(): HasMany
    {
        return $this->hasMany(Order::class, 'client_id');
    }
    
    /**
     * Get orders where the user is a freelancer
     */
    public function freelancerOrders(): HasMany
    {
        return $this->hasMany(Order::class, 'freelancer_id');
    }
    
    /**
     * Get reviews received by the user (as freelancer)
     */
    public function receivedReviews(): HasMany
    {
        return $this->hasMany(Review::class, 'freelancer_id');
    }
    
    /**
     * Get reviews given by the user (as client)
     */
    public function givenReviews(): HasMany
    {
        return $this->hasMany(Review::class, 'client_id');
    }
    
    /**
     * Get messages sent by the user
     */
    public function sentMessages(): HasMany
    {
        return $this->hasMany(Message::class, 'sender_id');
    }
    
    /**
     * Get messages received by the user
     */
    public function receivedMessages(): HasMany
    {
        return $this->hasMany(Message::class, 'recipient_id');
    }
    
    /**
     * Get withdrawals made by the user (as freelancer)
     */
    public function withdrawals(): HasMany
    {
        return $this->hasMany(Withdrawal::class);
    }
    
    /**
     * Get activities performed by the user
     */
    public function activities(): HasMany
    {
        return $this->hasMany(Activity::class);
    }
}
