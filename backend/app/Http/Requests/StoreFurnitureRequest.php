<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreFurnitureRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'category_id' => 'required|exists:categories,id',
            'name' => 'required|string|max:255',
            'slug' => 'required|string|max:255|unique:furnitures,slug',
            'description' => 'nullable|string',
            'material' => 'required|string|max:255',
            'dimensions' => 'nullable|string|max:255',
            'starting_price' => 'required|numeric|min:0',
            'is_featured' => 'boolean',
        ];
    }
}