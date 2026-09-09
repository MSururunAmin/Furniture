<?php

namespace App\Services;

use App\Models\PortfolioImage;
use Illuminate\Database\Eloquent\Collection;
use App\Repositories\Contracts\PortfolioImageRepositoryInterface;

class PortfolioImageService
{
    public function __construct(
        protected PortfolioImageRepositoryInterface $images
    ) {}

    public function getByPortfolio(int $portfolioId): Collection
    {
        return $this->images->getByPortfolio($portfolioId);
    }

    public function create(array $data): PortfolioImage
    {
        return $this->images->create($data);
    }

    public function delete(PortfolioImage $image): bool
    {
        return $this->images->delete($image);
    }
}