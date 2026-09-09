<?php

namespace App\Services;

use App\Models\Blog;
use Illuminate\Database\Eloquent\Collection;
use App\Repositories\Contracts\BlogRepositoryInterface;

class BlogService
{
    public function __construct(
        protected BlogRepositoryInterface $blogs
    ) {}

    public function all(): Collection
    {
        return $this->blogs->all();
    }

    public function create(array $data): Blog
    {
        return $this->blogs->create($data);
    }

    public function update(Blog $blog, array $data): Blog
    {
        return $this->blogs->update($blog, $data);
    }

    public function delete(Blog $blog): bool
    {
        return $this->blogs->delete($blog);
    }
}