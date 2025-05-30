<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Relations\HasOne;

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
        'profile_picture',
        'last_login',
        'is_active'
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
            'last_login' => 'datetime',
            'is_active' => 'boolean'
        ];
    }
    
    /**
     * Get the freelancer profile associated with the user
     */
    public function freelancer(): HasOne
    {
        return $this->hasOne(Freelancer::class);
    }
    
    /**
     * Get the client profile associated with the user
     */
    public function client(): HasOne
    {
        return $this->hasOne(Client::class);
    }
    
    /**
     * Get the messages sent by this user
     */
    public function sentMessages()
    {
        return $this->hasMany(Chat::class, 'sender_id');
    }
    
    /**
     * Get the messages received by this user
     */
    public function receivedMessages()
    {
        return $this->hasMany(Chat::class, 'receiver_id');
    }
    
    /**
     * Update user's last login time
     */
    public function login()
    {
        $this->last_login = now();
        $this->save();
    }
    
    /**
     * Handle logout logic
     */
    public function logout()
    {
        // Handle logout logic
    }
    
    /**
     * Update user profile
     */
    public function updateProfile($data)
    {
        $this->update($data);
    }
    
    /**
     * Change user password
     */
    public function changePassword($newPassword)
    {
        $this->password = bcrypt($newPassword);
        $this->save();
    }
    
    /**
     * Deactivate user account
     */
    public function deactivateAccount()
    {
        $this->is_active = false;
        $this->save();
    }
}
