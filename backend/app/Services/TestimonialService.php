<?php

namespace App\Services;

use App\Models\Testimonial;
use Illuminate\Database\Eloquent\Collection;
use App\Repositories\Contracts\TestimonialRepositoryInterface;

class TestimonialService
{
    public function __construct(
        protected TestimonialRepositoryInterface $testimonials
    ) {}

    public function all(): Collection
    {
        return $this->testimonials->all();
    }

    public function create(array $data): Testimonial
    {
        return $this->testimonials->create($data);
    }

    public function update(Testimonial $testimonial, array $data): Testimonial
    {
        return $this->testimonials->update($testimonial, $data);
    }

    public function delete(Testimonial $testimonial): bool
    {
        return $this->testimonials->delete($testimonial);
    }
}