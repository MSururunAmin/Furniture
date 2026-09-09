<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TestimonialResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'client_name' => $this->client_name,
            'company_role' => $this->company_role,
            'avatar_path' => $this->avatar_path,
            'rating' => $this->rating,
            'review_text' => $this->review_text,
            'is_visible' => $this->is_visible,
            'created_at' => $this->created_at,
        ];
    }
}