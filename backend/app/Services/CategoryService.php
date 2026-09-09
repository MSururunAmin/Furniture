<?php

namespace App\Services;
use Illuminate\Support\Str;
use App\Models\Category;
use App\Repositories\Contracts\CategoryRepositoryInterface;
use Illuminate\Database\Eloquent\Collection;

class CategoryService
{
    public function __construct(
        protected CategoryRepositoryInterface $categories
    ) {
    }

    public function getAll(): Collection
    {
        return $this->categories->getAll();
    }

    public function find(int $id): ?Category
    {
        return $this->categories->findById($id);
    }

    public function create(array $data): Category
{
    $data['slug'] = Str::slug($data['name']);

    return $this->categories->create($data);
}

   public function update(Category $category, array $data): bool
{
    $data['slug'] = Str::slug($data['name']);

    return $this->categories->update($category, $data);
}

    public function delete(Category $category): bool
    {
        return $this->categories->delete($category);
    }
}