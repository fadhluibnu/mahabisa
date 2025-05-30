<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Relations\Pivot;

class FreelancerBank extends Pivot
{
    protected $table = 'freelancer_bank';

    protected $fillable = [
        'freelancer_id',
        'bank_id',
        'account_number',
        'account_name',
        'is_primary',
        'is_active'
    ];

    protected $casts = [
        'is_primary' => 'boolean',
        'is_active' => 'boolean'
    ];
}
