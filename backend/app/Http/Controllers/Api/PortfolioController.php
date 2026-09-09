<?php

namespace App\Http\Controllers\Api;

use App\Models\Portfolio;
use Illuminate\Http\JsonResponse;
use App\Services\PortfolioService;
use App\Http\Controllers\Controller;
use App\Http\Resources\PortfolioResource;
use App\Http\Requests\StorePortfolioRequest;
use App\Http\Requests\UpdatePortfolioRequest;

class PortfolioController extends Controller
{
    public function __construct(
        protected PortfolioService $service
    ) {}

    public function index(): JsonResponse
    {
        return response()->json([
            'success' => true,
            'data' => PortfolioResource::collection(
                $this->service->all()
            ),
        ]);
    }

    public function store(StorePortfolioRequest $request): JsonResponse
    {
        $portfolio = $this->service->create($request->validated());

        return response()->json([
            'success' => true,
            'message' => 'Portfolio berhasil ditambahkan.',
            'data' => new PortfolioResource($portfolio),
        ], 201);
    }

    public function show(Portfolio $portfolio): JsonResponse
    {
        $portfolio->load('images');

        return response()->json([
            'success' => true,
            'data' => new PortfolioResource($portfolio),
        ]);
    }

    public function update(
        UpdatePortfolioRequest $request,
        Portfolio $portfolio
    ): JsonResponse {
        $portfolio = $this->service->update(
            $portfolio,
            $request->validated()
        );

        return response()->json([
            'success' => true,
            'message' => 'Portfolio berhasil diperbarui.',
            'data' => new PortfolioResource($portfolio),
        ]);
    }

    public function destroy(Portfolio $portfolio): JsonResponse
    {
        $this->service->delete($portfolio);

        return response()->json([
            'success' => true,
            'message' => 'Portfolio berhasil dihapus.',
        ]);
    }
}