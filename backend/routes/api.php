<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\CategoryController;
use App\Http\Controllers\Api\FurnitureController;
use App\Http\Controllers\Api\FurnitureImageController;
use App\Http\Controllers\Api\PortfolioController;
use App\Http\Controllers\Api\PortfolioImageController;
use App\Http\Controllers\Api\BlogController;
use App\Http\Controllers\Api\TestimonialController;
use App\Http\Controllers\Api\ContactController;
use Illuminate\Support\Facades\Route;


/*
|--------------------------------------------------------------------------
| PUBLIC ROUTES
|--------------------------------------------------------------------------
*/

// Auth
Route::post('/login', [AuthController::class, 'login'])
    ->middleware('throttle:login');


// Categories - public read
Route::get('/categories', [CategoryController::class, 'index']);
Route::get('/categories/{category}', [CategoryController::class, 'show']);


// Furnitures - public read
Route::get('/furnitures', [FurnitureController::class, 'index']);
Route::get('/furnitures/{furniture}', [FurnitureController::class, 'show']);


// Furniture Images - public read
Route::get(
    '/furnitures/{furniture}/images',
    [FurnitureImageController::class, 'index']
);


// Portfolios - public read
Route::get('/portfolios', [PortfolioController::class, 'index']);
Route::get('/portfolios/{portfolio}', [PortfolioController::class, 'show']);


// Portfolio Images - public read
Route::get(
    '/portfolios/{portfolio}/images',
    [PortfolioImageController::class, 'index']
);


// Blogs - public read
Route::get('/blogs', [BlogController::class, 'index']);
Route::get('/blogs/{blog}', [BlogController::class, 'show']);


// Testimonials - public read
Route::get('/testimonials', [TestimonialController::class, 'index']);
Route::get('/testimonials/{testimonial}', [TestimonialController::class, 'show']);


// Contact - public create
Route::post('/contacts', [ContactController::class, 'store']);


/*
|--------------------------------------------------------------------------
| AUTHENTICATED ROUTES
|--------------------------------------------------------------------------
*/

Route::middleware('auth:sanctum')->group(function () {

    // Authentication
    Route::get('/me', [AuthController::class, 'me']);
    Route::post('/logout', [AuthController::class, 'logout']);


    /*
    |--------------------------------------------------------------------------
    | Categories
    |--------------------------------------------------------------------------
    */

    Route::post('/categories', [CategoryController::class, 'store']);
    Route::put('/categories/{category}', [CategoryController::class, 'update']);
    Route::patch('/categories/{category}', [CategoryController::class, 'update']);
    Route::delete('/categories/{category}', [CategoryController::class, 'destroy']);


    /*
    |--------------------------------------------------------------------------
    | Furnitures
    |--------------------------------------------------------------------------
    */

    Route::post('/furnitures', [FurnitureController::class, 'store']);
    Route::put('/furnitures/{furniture}', [FurnitureController::class, 'update']);
    Route::patch('/furnitures/{furniture}', [FurnitureController::class, 'update']);
    Route::delete('/furnitures/{furniture}', [FurnitureController::class, 'destroy']);


    /*
    |--------------------------------------------------------------------------
    | Furniture Images
    |--------------------------------------------------------------------------
    */

    Route::post(
        '/furnitures/{furniture}/images',
        [FurnitureImageController::class, 'store']
    );

    Route::delete(
        '/furniture-images/{image}',
        [FurnitureImageController::class, 'destroy']
    );


    /*
    |--------------------------------------------------------------------------
    | Portfolios
    |--------------------------------------------------------------------------
    */

    Route::post('/portfolios', [PortfolioController::class, 'store']);
    Route::put('/portfolios/{portfolio}', [PortfolioController::class, 'update']);
    Route::patch('/portfolios/{portfolio}', [PortfolioController::class, 'update']);
    Route::delete('/portfolios/{portfolio}', [PortfolioController::class, 'destroy']);


    /*
    |--------------------------------------------------------------------------
    | Portfolio Images
    |--------------------------------------------------------------------------
    */

    Route::post(
        '/portfolios/{portfolio}/images',
        [PortfolioImageController::class, 'store']
    );

    Route::delete(
        '/portfolio-images/{image}',
        [PortfolioImageController::class, 'destroy']
    );


    /*
    |--------------------------------------------------------------------------
    | Blogs
    |--------------------------------------------------------------------------
    */

    Route::post('/blogs', [BlogController::class, 'store']);
    Route::put('/blogs/{blog}', [BlogController::class, 'update']);
    Route::patch('/blogs/{blog}', [BlogController::class, 'update']);
    Route::delete('/blogs/{blog}', [BlogController::class, 'destroy']);


    /*
    |--------------------------------------------------------------------------
    | Testimonials
    |--------------------------------------------------------------------------
    */

    Route::post('/testimonials', [TestimonialController::class, 'store']);
    Route::put('/testimonials/{testimonial}', [TestimonialController::class, 'update']);
    Route::patch('/testimonials/{testimonial}', [TestimonialController::class, 'update']);
    Route::delete('/testimonials/{testimonial}', [TestimonialController::class, 'destroy']);


    /*
    |--------------------------------------------------------------------------
    | Contacts
    |--------------------------------------------------------------------------
    */

    Route::get('/contacts', [ContactController::class, 'index']);
    Route::get('/contacts/{contact}', [ContactController::class, 'show']);
    Route::put('/contacts/{contact}', [ContactController::class, 'update']);
    Route::patch('/contacts/{contact}', [ContactController::class, 'update']);
    Route::delete('/contacts/{contact}', [ContactController::class, 'destroy']);

    Route::patch(
        '/contacts/{contact}/read',
        [ContactController::class, 'markAsRead']
    );
});