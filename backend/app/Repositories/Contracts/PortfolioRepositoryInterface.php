<?php

namespace App\Repositories\Contracts;

use App\Models\Portfolio;
use Illuminate\Database\Eloquent\Collection;

interface PortfolioRepositoryInterface
{
    public function all(): Collection;

    public function find(int $id): ?Portfolio;

    public function create(array $data): Portfolio;

    public function update(Portfolio $portfolio, array $data): Portfolio;

    public function delete(Portfolio $portfolio): bool;
}