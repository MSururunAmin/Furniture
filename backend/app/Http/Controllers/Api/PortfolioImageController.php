<?php

namespace App\Http\Controllers\Api;

use App\Models\Portfolio;
use App\Models\PortfolioImage;
use App\Services\PortfolioImageService;
use App\Http\Controllers\Controller;
use App\Http\Requests\StorePortfolioImageRequest;
use App\Http\Resources\PortfolioImageResource;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Storage;

class PortfolioImageController extends Controller
{
    public function __construct(
        protected PortfolioImageService $service
    ) {}

    public function index(Portfolio $portfolio): JsonResponse
    {
        return response()->json([
            'success' => true,
            'data' => PortfolioImageResource::collection(
                $this->service->getByPortfolio($portfolio->id)
            ),
        ]);
    }

    public function store(
        StorePortfolioImageRequest $request,
        Portfolio $portfolio
    ): JsonResponse {

        $images = [];

        foreach ($request->file('images') as $index => $file) {

            $path = $file->store('portfolios', 'public');

            $images[] = $this->service->create([
                'portfolio_id' => $portfolio->id,
                'image_path' => $path,
                'is_primary' => $index === 0,
            ]);
        }

        return response()->json([
            'success' => true,
            'message' => 'Gambar portfolio berhasil diupload.',
            'data' => PortfolioImageResource::collection($images),
        ], 201);
    }

    public function destroy(PortfolioImage $image): JsonResponse
    {
        Storage::disk('public')->delete($image->image_path);

        $this->service->delete($image);

        return response()->json([
            'success' => true,
            'message' => 'Gambar berhasil dihapus.',
        ]);
    }
}