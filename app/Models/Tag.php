<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Tag extends Model
{
    use HasFactory;
    
    protected $fillable = [
        'name',
    ];
    
    /**
     * Get the portfolios that are tagged with this tag
     */
    public function portofolios(): BelongsToMany
    {
        return $this->belongsToMany(Portofolio::class)->withTimestamps();
    }
    
    /**
     * Get the name of the tag
     */
    public function getName(): string
    {
        return $this->name;
    }
    
    /**
     * Set the name of the tag
     */
    public function setName(string $name): void
    {
        $this->name = $name;
        $this->save();
    }
}