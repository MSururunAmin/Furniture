<?php

namespace App\Repositories\Eloquent;

use App\Models\PortfolioImage;
use Illuminate\Database\Eloquent\Collection;
use App\Repositories\Contracts\PortfolioImageRepositoryInterface;

class PortfolioImageRepository implements PortfolioImageRepositoryInterface
{
    public function getByPortfolio(int $portfolioId): Collection
    {
        return PortfolioImage::where('portfolio_id', $portfolioId)->get();
    }

    public function create(array $data): PortfolioImage
    {
        return PortfolioImage::create($data);
    }

    public function delete(PortfolioImage $image): bool
    {
        return $image->delete();
    }
}