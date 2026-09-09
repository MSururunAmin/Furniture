<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;

use App\Repositories\Contracts\UserRepositoryInterface;
use App\Repositories\Eloquent\UserRepository;

use App\Repositories\Contracts\CategoryRepositoryInterface;
use App\Repositories\Eloquent\CategoryRepository;

use App\Repositories\Contracts\FurnitureRepositoryInterface;
use App\Repositories\Eloquent\FurnitureRepository;

use App\Repositories\Contracts\FurnitureImageRepositoryInterface;
use App\Repositories\Eloquent\FurnitureImageRepository;

use App\Repositories\Contracts\PortfolioRepositoryInterface;
use App\Repositories\Eloquent\PortfolioRepository;

use App\Repositories\Contracts\PortfolioImageRepositoryInterface;
use App\Repositories\Eloquent\PortfolioImageRepository;

use App\Repositories\Contracts\BlogRepositoryInterface;
use App\Repositories\Eloquent\BlogRepository;

use App\Repositories\Contracts\TestimonialRepositoryInterface;
use App\Repositories\Eloquent\TestimonialRepository;

use App\Repositories\Contracts\ContactRepositoryInterface;
use App\Repositories\Eloquent\ContactRepository;
class RepositoryServiceProvider extends ServiceProvider
{
    public function register(): void
    {
        $this->app->bind(
            UserRepositoryInterface::class,
            UserRepository::class
        );

        $this->app->bind(
            CategoryRepositoryInterface::class,
            CategoryRepository::class
        );

        $this->app->bind(
            FurnitureRepositoryInterface::class,
            FurnitureRepository::class
        );

        $this->app->bind(
    FurnitureImageRepositoryInterface::class,
    FurnitureImageRepository::class
    );

    $this->app->bind(
    PortfolioRepositoryInterface::class,
    PortfolioRepository::class
);

$this->app->bind(
    PortfolioImageRepositoryInterface::class,
    PortfolioImageRepository::class
);

$this->app->bind(
    BlogRepositoryInterface::class,
    BlogRepository::class
);
$this->app->bind(
    TestimonialRepositoryInterface::class,
    TestimonialRepository::class
);

$this->app->bind(
    ContactRepositoryInterface::class,
    ContactRepository::class
);
    }

    
    public function boot(): void
    {
        //
    }
}