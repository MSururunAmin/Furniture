<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Furniture extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'furnitures';

    protected $fillable = [
        'category_id',
        'name',
        'slug',
        'description',
        'material',
        'dimensions',
        'starting_price',
        'is_featured',
    ];

    protected $casts = [
        'starting_price' => 'decimal:2',
        'is_featured' => 'boolean',
    ];

    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }

    public function images(): HasMany
    {
        return $this->hasMany(FurnitureImage::class);
    }
}