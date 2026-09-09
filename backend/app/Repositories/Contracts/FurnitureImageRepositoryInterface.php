<?php

namespace App\Repositories\Contracts;

use App\Models\FurnitureImage;
use Illuminate\Database\Eloquent\Collection;

interface FurnitureImageRepositoryInterface
{
    public function getByFurniture(int $furnitureId): Collection;

    public function create(array $data): FurnitureImage;

    public function delete(FurnitureImage $image): bool;
}