<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class FurnitureResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'category' => $this->category?->name,
            'category_id' => $this->category_id,
            'name' => $this->name,
            'slug' => $this->slug,
            'description' => $this->description,
            'material' => $this->material,
            'dimensions' => $this->dimensions,
            'starting_price' => $this->starting_price,
            'is_featured' => $this->is_featured,
            'images' => $this->images,
            'created_at' => $this->created_at,
        ];
    }
}