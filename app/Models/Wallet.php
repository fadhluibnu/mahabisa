<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Wallet extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'user_id',
        'balance',
        'pending_balance',
        'total_earned',
        'total_withdrawn',
        'last_withdrawal_at',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array
     */
    protected $casts = [
        'balance' => 'decimal:2',
        'pending_balance' => 'decimal:2',
        'total_earned' => 'decimal:2',
        'total_withdrawn' => 'decimal:2',
        'last_withdrawal_at' => 'datetime',
    ];

    /**
     * Get the user that owns the wallet.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Add funds to the wallet balance
     *
     * @param float $amount
     * @return self
     */
    public function addFunds(float $amount): self
    {
        $this->balance += $amount;
        $this->total_earned += $amount;
        $this->save();

        return $this;
    }

    /**
     * Add funds to pending balance
     *
     * @param float $amount
     * @return self
     */
    public function addPendingFunds(float $amount): self
    {
        $this->pending_balance += $amount;
        $this->save();

        return $this;
    }

    /**
     * Release funds from pending to available balance
     *
     * @param float $amount
     * @return self
     */
    public function releasePendingFunds(float $amount): self
    {
        // Make sure we don't release more than what's pending
        $releaseAmount = min($this->pending_balance, $amount);
        
        $this->pending_balance -= $releaseAmount;
        $this->balance += $releaseAmount;
        $this->total_earned += $releaseAmount;
        $this->save();

        return $this;
    }

    /**
     * Withdraw funds from the wallet
     *
     * @param float $amount
     * @return self
     */
    public function withdraw(float $amount): self
    {
        // Make sure we don't withdraw more than what's available
        $withdrawAmount = min($this->balance, $amount);
        
        $this->balance -= $withdrawAmount;
        $this->total_withdrawn += $withdrawAmount;
        $this->last_withdrawal_at = now();
        $this->save();

        return $this;
    }

    /**
     * Check if the wallet has enough balance
     *
     * @param float $amount
     * @return bool
     */
    public function hasEnoughBalance(float $amount): bool
    {
        return $this->balance >= $amount;
    }
}
