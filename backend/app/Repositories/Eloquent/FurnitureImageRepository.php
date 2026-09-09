<?php

namespace App\Repositories\Eloquent;

use App\Models\FurnitureImage;
use Illuminate\Database\Eloquent\Collection;
use App\Repositories\Contracts\FurnitureImageRepositoryInterface;

class FurnitureImageRepository implements FurnitureImageRepositoryInterface
{
    public function getByFurniture(int $furnitureId): Collection
    {
        return FurnitureImage::where('furniture_id', $furnitureId)->get();
    }

    public function create(array $data): FurnitureImage
    {
        return FurnitureImage::create($data);
    }

    public function delete(FurnitureImage $image): bool
    {
        return $image->delete();
    }
}