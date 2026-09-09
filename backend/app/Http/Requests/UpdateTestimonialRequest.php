<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateTestimonialRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'client_name' => [
                'sometimes',
                'string',
                'max:100'
            ],

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
                'sometimes',
                'integer',
                'min:1',
                'max:5'
            ],

            'review_text' => [
                'sometimes',
                'string'
            ],

            'is_visible' => [
                'boolean'
            ],
        ];
    }
}