<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\MorphTo;
use Carbon\Carbon;
use Illuminate\Support\Facades\Log;

class File extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'user_id',
        'fileable_id',
        'fileable_type',
        'original_name',
        'file_name',
        'file_path',
        'file_type',
        'file_size',
        'is_public',
        'status', // e.g., 'pending', 'active', 'deliverable', 'deleted'
        'activated_at',
        'download_count',
        'last_download_at',
    ];
    
    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'activated_at' => 'datetime',
        'last_download_at' => 'datetime',
        'is_public' => 'boolean',
        'file_size' => 'integer',
        'download_count' => 'integer',
    ];

    /**
     * Get the user that owns the file.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the parent fileable model (Order, Service, etc).
     */
    public function fileable(): MorphTo
    {
        return $this->morphTo();
    }

    /**
     * Check if file is visible to a specific user
     */
    public function isVisibleTo(User $user): bool
    {
        // Admin can see all files
        if ($user->isAdmin()) {
            return true;
        }

        // File owner can always see their files
        if ($this->user_id === $user->id) {
            return true;
        }

        // Public files are visible to everyone
        if ($this->is_public) {
            return true;
        }

        // For order deliverables, check if the user is part of the order
        if ($this->fileable_type === Order::class) {
            $order = $this->fileable; // Eager load if possible, or fetch
            if (!$order) {
                $order = Order::find($this->fileable_id);
            }
            
            if ($order && ($order->client_id === $user->id || $order->freelancer_id === $user->id)) {
                // If it's a deliverable, client can see metadata but might not download yet
                // Freelancer can always see.
                return true; 
            }
        }

        return false;
    }

    /**
     * Activate the file (make it available for download, set status to 'active')
     * This is typically called after payment is completed or when explicitly activated.
     *
     * @param \Carbon\Carbon|null $activationTime
     * @return bool
     */
    public function activate(Carbon $activationTime = null): bool
    {
        $this->status = 'active';
        $this->activated_at = $activationTime ?? now();
        
        // Log file activation for audit trail
        Log::info('File activated', [
            'file_id' => $this->id,
            'file_name' => $this->original_name,
            'fileable_type' => $this->fileable_type,
            'fileable_id' => $this->fileable_id,
            'activated_at' => $this->activated_at
        ]);
        
        return $this->save();
    }

    /**
     * Check if a specific user can download this file
     * 
     * @param User $user
     * @return bool
     */
    public function canBeDownloadedBy(User $user): bool
    {
        // Admin can download all files
        if ($user->isAdmin()) {
            return true;
        }
        
        // File owner can always download their own files
        if ($this->user_id === $user->id) {
            return true;
        }
        
        // Public files are downloadable by anyone
        if ($this->is_public) {
            return true;
        }
        
        // For order-related files
        if ($this->fileable_type === Order::class) {
            $order = $this->fileable;
            if (!$order) {
                $order = Order::find($this->fileable_id);
            }
            
            if ($order) {
                // Freelancer can download all client files for their orders
                if ($order->freelancer_id === $user->id && $this->user_id === $order->client_id) {
                    return true;
                }
                
                // Freelancers can always download their own deliverables
                if ($order->freelancer_id === $user->id && $this->user_id === $user->id) {
                    return true;
                }
                
                // Client can download deliverables only if payment is completed or order is completed
                if ($order->client_id === $user->id && $this->status === 'deliverable') {
                    // Check if order is completed
                    if ($order->status === 'completed') {
                        return true;
                    }
                    
                    // Check for successful payment using the isPaymentCompleted helper method
                    return $order->isPaymentCompleted();
                }
                
                // Client can always download their own files
                if ($order->client_id === $user->id && $this->user_id === $user->id) {
                    return true;
                }
            }
        }
        
        // Active files are downloadable according to order relationships
        if ($this->status === 'active') {
            // For order files, check the relationship
            if ($this->fileable_type === Order::class) {
                $order = $this->fileable;
                if (!$order) {
                    $order = Order::find($this->fileable_id);
                }
                
                if ($order && ($order->client_id === $user->id || $order->freelancer_id === $user->id)) {
                    return true;
                }
            }
        }
        
        return false;
    }

    /**
     * Make the file public
     */
    public function makePublic(): self
    {
        $this->is_public = true;
        $this->save();
        return $this;
    }

    /**
     * Make the file private
     */
    public function makePrivate(): self
    {
        $this->is_public = false;
        $this->save();
        return $this;
    }
}
