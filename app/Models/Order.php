<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Order extends Model
{
    use HasFactory;
    
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'order_number',
        'client_id',
        'freelancer_id',
        'project_id',
        'service_id',
        'proposal_id',
        'amount',
        'platform_fee',
        'platform_fee_percentage', // Add if you added this column
        'tax',
        'total_amount',
        'freelancer_earning', // Add this line
        'requirements',
        'due_date',
        'status',
        'cancellation_reason',
        'dispute_reason',
        'dispute_status',
        'deliverables',
        'revisions',
        'payment_completed_at',
    ];
    
    /**
     * The attributes that should be cast.
     *
     * @var array
     */
    protected $casts = [
        'amount' => 'decimal:2',
        'platform_fee' => 'decimal:2',
        'tax' => 'decimal:2',
        'total_amount' => 'decimal:2',
        'due_date' => 'date',
        'deliverables' => 'json',
        'revisions' => 'json',
        'payment_completed_at' => 'datetime',
    ];
    
    /**
     * Get the client who placed the order.
     */
    public function client(): BelongsTo
    {
        return $this->belongsTo(User::class, 'client_id');
    }
    
    /**
     * Get the freelancer who fulfills the order.
     */
    public function freelancer(): BelongsTo
    {
        return $this->belongsTo(User::class, 'freelancer_id');
    }
    
    /**
     * Get the project associated with this order.
     */
    public function project(): BelongsTo
    {
        return $this->belongsTo(Project::class);
    }
    
    /**
     * Get the service associated with this order.
     */
    public function service(): BelongsTo
    {
        return $this->belongsTo(Service::class);
    }
    
    /**
     * Get the proposal that led to this order.
     */
    public function proposal(): BelongsTo
    {
        return $this->belongsTo(Proposal::class);
    }
    
    /**
     * Get the payments associated with this order.
     */
    public function payments(): HasMany
    {
        return $this->hasMany(Payment::class);
    }
    
    /**
     * Get the files attached to this order
     */
    public function files()
    {
        return $this->morphMany(File::class, 'fileable');
    }
    
    /**
     * Get deliverable files for this order
     */
    public function deliverables()
    {
        return $this->morphMany(File::class, 'fileable')->where('status', 'deliverable');
    }
    
    /**
     * Get the main payment associated with this order.
     */
    public function payment(): HasOne
    {
        return $this->hasOne(Payment::class);
    }
    
    /**
     * Get the review associated with this order.
     */
    public function review(): HasOne
    {
        return $this->hasOne(Review::class);
    }
    
    /**
     * Get messages associated with this order.
     */
    public function messages(): HasMany
    {
        return $this->hasMany(Message::class);
    }
    
    /**
     * Check if payment has been completed for this order
     *
     * @return bool
     */
    public function isPaymentCompleted(): bool
    {
        // Check if payment_completed_at is set
        if ($this->payment_completed_at !== null) {
            return true;
        }
        
        // Otherwise check if there's a completed payment
        return $this->payments()->where('status', 'completed')->exists();
    }
    
    /**
     * Mark payment as completed
     *
     * @return bool
     */
    public function markPaymentCompleted(): bool
    {
        if ($this->payment_completed_at === null) {
            $this->payment_completed_at = now();
            return $this->save();
        }
        
        return true;
    }
    
    /**
     * Generate a unique order number
     */
    public static function generateOrderNumber()
    {
        $prefix = 'ORD';
        $date = now()->format('ymd');
        $suffix = mt_rand(100, 999);
        
        $orderNumber = $prefix . $date . $suffix;
        
        // Check if the order number already exists
        while (self::where('order_number', $orderNumber)->exists()) {
            $suffix = mt_rand(100, 999);
            $orderNumber = $prefix . $date . $suffix;
        }
        
        return $orderNumber;
    }
    
    /**
     * Get deliverable files only
     */
    public function deliverableFiles()
    {
        return $this->files()->where('file_type', 'deliverable');
    }
    
    /**
     * Get attachment files only
     */
    public function attachmentFiles()
    {
        return $this->files()->where('file_type', 'attachment');
    }
}
