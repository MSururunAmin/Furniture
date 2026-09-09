<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreFurnitureRequest;
use App\Http\Requests\UpdateFurnitureRequest;
use App\Http\Resources\FurnitureResource;
use App\Services\FurnitureService;
use Illuminate\Http\JsonResponse;

class FurnitureController extends Controller
{
    public function __construct(
        protected FurnitureService $service
    ) {
    }

    public function index(): JsonResponse
    {
        return response()->json([
            'success' => true,
            'data' => FurnitureResource::collection(
                $this->service->getAll()
            ),
        ]);
    }

    public function store(StoreFurnitureRequest $request): JsonResponse
    {
        $furniture = $this->service->create(
            $request->validated()
        );

        return response()->json([
            'success' => true,
            'message' => 'Furniture berhasil ditambahkan.',
            'data' => new FurnitureResource($furniture),
        ], 201);
    }

    public function show(int $id): JsonResponse
    {
        $furniture = $this->service->find($id);

        if (!$furniture) {
            return response()->json([
                'success' => false,
                'message' => 'Furniture tidak ditemukan.',
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => new FurnitureResource($furniture),
        ]);
    }

    public function update(UpdateFurnitureRequest $request, int $id): JsonResponse
    {
        $furniture = $this->service->find($id);

        if (!$furniture) {
            return response()->json([
                'success' => false,
                'message' => 'Furniture tidak ditemukan.',
            ], 404);
        }

        $this->service->update(
            $furniture,
            $request->validated()
        );

        return response()->json([
            'success' => true,
            'message' => 'Furniture berhasil diperbarui.',
            'data' => new FurnitureResource($furniture->fresh()),
        ]);
    }

    public function destroy(int $id): JsonResponse
    {
        $furniture = $this->service->find($id);

        if (!$furniture) {
            return response()->json([
                'success' => false,
                'message' => 'Furniture tidak ditemukan.',
            ], 404);
        }

        $this->service->delete($furniture);

        return response()->json([
            'success' => true,
            'message' => 'Furniture berhasil dihapus.',
        ]);
    }
}