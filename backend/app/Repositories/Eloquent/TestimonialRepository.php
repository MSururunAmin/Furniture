<?php

namespace App\Repositories\Eloquent;

use App\Models\Testimonial;
use Illuminate\Database\Eloquent\Collection;
use App\Repositories\Contracts\TestimonialRepositoryInterface;

class TestimonialRepository implements TestimonialRepositoryInterface
{
    public function all(): Collection
    {
        return Testimonial::latest()->get();
    }

    public function create(array $data): Testimonial
    {
        return Testimonial::create($data);
    }

    public function update(Testimonial $testimonial, array $data): Testimonial
    {
        $testimonial->update($data);

        return $testimonial;
    }

    public function delete(Testimonial $testimonial): bool
    {
        return $testimonial->delete();
    }
}