<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Portfolio extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'title',
        'slug',
        'description',
        'client_name',
        'location',
        'year',
        'category',
        'before_image_path',
        'after_image_path',
    ];

    public function images(): HasMany
    {
        return $this->hasMany(PortfolioImage::class);
    }
}