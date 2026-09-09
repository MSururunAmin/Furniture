<?php

namespace App\Repositories\Contracts;

use App\Models\Furniture;
use Illuminate\Database\Eloquent\Collection;

interface FurnitureRepositoryInterface
{
    public function getAll(): Collection;

    public function find(int $id): ?Furniture;

    public function create(array $data): Furniture;

    public function update(Furniture $furniture, array $data): bool;

    public function delete(Furniture $furniture): bool;
}