<?php

namespace App\Services;

use App\Models\Portfolio;
use Illuminate\Database\Eloquent\Collection;
use App\Repositories\Contracts\PortfolioRepositoryInterface;

class PortfolioService
{
    public function __construct(
        protected PortfolioRepositoryInterface $portfolios
    ) {
    }

    public function all(): Collection
    {
        return $this->portfolios->all();
    }

    public function find(int $id): ?Portfolio
    {
        return $this->portfolios->find($id);
    }

    public function create(array $data): Portfolio
    {
        return $this->portfolios->create($data);
    }

    public function update(Portfolio $portfolio, array $data): Portfolio
    {
        return $this->portfolios->update($portfolio, $data);
    }

    public function delete(Portfolio $portfolio): bool
    {
        return $this->portfolios->delete($portfolio);
    }
}