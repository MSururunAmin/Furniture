<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PortfolioResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'slug' => $this->slug,
            'client_name' => $this->client_name,
            'location' => $this->location,
            'year' => $this->year,
            'category' => $this->category,
            'description' => $this->description,

            'images' => PortfolioImageResource::collection(
                $this->whenLoaded('images')
            ),

            'created_at' => $this->created_at,
        ];
    }
}