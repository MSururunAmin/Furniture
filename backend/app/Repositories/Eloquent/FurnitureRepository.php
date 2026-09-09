<?php

namespace App\Repositories\Eloquent;

use App\Models\Furniture;
use Illuminate\Database\Eloquent\Collection;
use App\Repositories\Contracts\FurnitureRepositoryInterface;

class FurnitureRepository implements FurnitureRepositoryInterface
{
    public function getAll(): Collection
    {
        return Furniture::with([
            'category',
            'images'
        ])
        ->latest()
        ->get();
    }

    public function find(int $id): ?Furniture
    {
        return Furniture::with([
            'category',
            'images'
        ])->find($id);
    }

    public function create(array $data): Furniture
    {
        return Furniture::create($data);
    }

    public function update(Furniture $furniture, array $data): bool
    {
        return $furniture->update($data);
    }

    public function delete(Furniture $furniture): bool
    {
        return $furniture->delete();
    }
}