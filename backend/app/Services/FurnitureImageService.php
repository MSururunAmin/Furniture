<?php

namespace App\Services;

use App\Models\FurnitureImage;
use Illuminate\Database\Eloquent\Collection;
use App\Repositories\Contracts\FurnitureImageRepositoryInterface;

class FurnitureImageService
{
    public function __construct(
        protected FurnitureImageRepositoryInterface $images
    ) {}

    public function getByFurniture(int $furnitureId): Collection
    {
        return $this->images->getByFurniture($furnitureId);
    }

    public function create(array $data): FurnitureImage
    {
        return $this->images->create($data);
    }

    public function delete(FurnitureImage $image): bool
    {
        return $this->images->delete($image);
    }
}