<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreTestimonialRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'client_name' => ['required', 'string', 'max:100'],

            'company_role' => [
                'nullable',
                'string',
                'max:100'
            ],

            'avatar_path' => [
                'nullable',
                'image',
                'mimes:jpg,jpeg,png,webp',
                'max:4096'
            ],

            'rating' => [
                'required',
                'integer',
                'min:1',
                'max:5'
            ],

            'review_text' => [
                'required',
                'string'
            ],

            'is_visible' => [
                'boolean'
            ],
        ];
    }
}