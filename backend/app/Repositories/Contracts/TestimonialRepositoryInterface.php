<?php

namespace App\Repositories\Contracts;

use App\Models\Testimonial;
use Illuminate\Database\Eloquent\Collection;

interface TestimonialRepositoryInterface
{
    public function all(): Collection;

    public function create(array $data): Testimonial;

    public function update(Testimonial $testimonial, array $data): Testimonial;

    public function delete(Testimonial $testimonial): bool;
}