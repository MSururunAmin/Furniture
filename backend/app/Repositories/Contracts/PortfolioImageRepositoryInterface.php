<?php

namespace App\Repositories\Contracts;

use App\Models\PortfolioImage;
use Illuminate\Database\Eloquent\Collection;

interface PortfolioImageRepositoryInterface
{
    public function getByPortfolio(int $portfolioId): Collection;

    public function create(array $data): PortfolioImage;

    public function delete(PortfolioImage $image): bool;
}