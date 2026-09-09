<?php

namespace App\Repositories\Eloquent;

use App\Models\Portfolio;
use Illuminate\Database\Eloquent\Collection;
use App\Repositories\Contracts\PortfolioRepositoryInterface;

class PortfolioRepository implements PortfolioRepositoryInterface
{
    public function all(): Collection
{
    return Portfolio::with('images')->latest()->get();
}

    public function find(int $id): ?Portfolio
    {
        return Portfolio::with('images')->find($id);
    }

    public function create(array $data): Portfolio
    {
        return Portfolio::create($data);
    }

    public function update(Portfolio $portfolio, array $data): Portfolio
    {
        $portfolio->update($data);

        return $portfolio;
    }

    public function delete(Portfolio $portfolio): bool
    {
        return $portfolio->delete();
    }
}