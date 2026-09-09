<?php

namespace App\Services;

use App\Models\Furniture;
use Illuminate\Database\Eloquent\Collection;
use App\Repositories\Contracts\FurnitureRepositoryInterface;

class FurnitureService
{
    public function __construct(
        protected FurnitureRepositoryInterface $furnitures
    ) {
    }

    public function getAll(): Collection
    {
        return $this->furnitures->getAll();
    }

    public function find(int $id): ?Furniture
    {
        return $this->furnitures->find($id);
    }

    public function create(array $data): Furniture
    {
        return $this->furnitures->create($data);
    }

    public function update(Furniture $furniture, array $data): bool
    {
        return $this->furnitures->update($furniture, $data);
    }

    public function delete(Furniture $furniture): bool
    {
        return $this->furnitures->delete($furniture);
    }
}