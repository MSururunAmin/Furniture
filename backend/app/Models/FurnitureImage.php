<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class FurnitureImage extends Model
{
    use HasFactory;

    protected $fillable = [
        'furniture_id',
        'image_path',
        'is_primary',
    ];

    protected $casts = [
        'is_primary' => 'boolean',
    ];

    public function furniture(): BelongsTo
    {
        return $this->belongsTo(Furniture::class);
    }
}