<?php

namespace App\Repositories\Eloquent;

use App\Models\Blog;
use Illuminate\Database\Eloquent\Collection;
use App\Repositories\Contracts\BlogRepositoryInterface;

class BlogRepository implements BlogRepositoryInterface
{
    public function all(): Collection
    {
        return Blog::latest()->get();
    }

    public function create(array $data): Blog
    {
        return Blog::create($data);
    }

    public function update(Blog $blog, array $data): Blog
    {
        $blog->update($data);

        return $blog;
    }

    public function delete(Blog $blog): bool
    {
        return $blog->delete();
    }
}