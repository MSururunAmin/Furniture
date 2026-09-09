<?php

namespace App\Http\Controllers\Api;

use App\Models\Furniture;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Storage;
use App\Http\Controllers\Controller;
use App\Services\FurnitureImageService;
use App\Http\Requests\StoreFurnitureImageRequest;
use App\Http\Resources\FurnitureImageResource;
use App\Models\FurnitureImage;

class FurnitureImageController extends Controller
{
    public function __construct(
        protected FurnitureImageService $service
    ) {
    }

    public function index(Furniture $furniture): JsonResponse
    {
        return response()->json([
            'success' => true,
            'data' => FurnitureImageResource::collection(
                $this->service->getByFurniture($furniture->id)
            ),
        ]);
    }

    public function store(
        StoreFurnitureImageRequest $request,
        Furniture $furniture
    ): JsonResponse {

        $images = [];

        foreach ($request->file('images') as $index => $image) {

            $path = $image->store(
                'furnitures',
                'public'
            );

            $images[] = $this->service->create([
                'furniture_id' => $furniture->id,
                'image_path' => $path,
                'is_primary' => $index === 0,
            ]);
        }

        return response()->json([
            'success' => true,
            'message' => 'Upload berhasil.',
            'data' => FurnitureImageResource::collection($images),
        ], 201);
    }

    public function destroy(FurnitureImage $image): JsonResponse
    {
        Storage::disk('public')->delete($image->image_path);

        $this->service->delete($image);

        return response()->json([
            'success' => true,
            'message' => 'Gambar berhasil dihapus.',
        ]);
    }
}