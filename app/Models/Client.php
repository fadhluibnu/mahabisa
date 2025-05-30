<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Client extends Model
{
    /** @use HasFactory<\Database\Factories\ClientFactory> */
    use HasFactory;
    
    protected $fillable = [
        'user_id',
        'budget',
        'payment_method',
        'company',
        'company_website',
        'industry',
        'position',
        'bio',
        'profile_image',
        'is_verified',
        'completed_projects',
        'total_spent'
    ];
    
    protected $casts = [
        'budget' => 'float',
        'total_spent' => 'float',
        'is_verified' => 'boolean',
        'completed_projects' => 'integer'
    ];
    
    /**
     * Get the user associated with the client
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
    
    /**
     * Get the projects posted by this client
     */
    public function projects(): HasMany
    {
        return $this->hasMany(Project::class);
    }

    /**
     * Get the orders created by this client
     */
    public function orders(): HasMany
    {
        return $this->hasMany(Order::class);
    }

    /**
     * Get the reviews submitted by this client
     */
    public function reviews(): HasMany
    {
        return $this->hasMany(Review::class);
    }

    /**
     * Create a new order
     */
    public function createOrder($data)
    {
        return $this->orders()->create($data);
    }

    /**
     * Review a freelancer for a completed order
     */
    public function reviewFreelancer($orderId, $data)
    {
        $order = $this->orders()->findOrFail($orderId);
        return Review::create([
            'order_id' => $order->id,
            'client_id' => $this->id,
            'freelancer_id' => $order->freelancer_id,
            'rating' => $data['rating'],
            'comment' => $data['comment'] ?? null,
        ]);
    }

    /**
     * Add payment method for client
     */
    public function addPaymentMethod($method)
    {
        $this->payment_method = $method;
        $this->save();
    }

    /**
     * Cancel an order
     */
    public function cancelOrder($orderId)
    {
        $order = $this->orders()->findOrFail($orderId);
        $order->status = 'cancelled';
        $order->save();
        return $order;
    }

    /**
     * Extend order deadline
     */
    public function extendOrderDeadline($orderId, $newDeadline)
    {
        $order = $this->orders()->findOrFail($orderId);
        $order->deadline = $newDeadline;
        $order->save();
        return $order;
    }
}
