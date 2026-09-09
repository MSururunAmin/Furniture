<?php

namespace App\Http\Controllers\Api;

use App\Models\Testimonial;
use App\Services\TestimonialService;
use App\Http\Controllers\Controller;
use App\Http\Requests\StoreTestimonialRequest;
use App\Http\Requests\UpdateTestimonialRequest;
use App\Http\Resources\TestimonialResource;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Storage;

class TestimonialController extends Controller
{
    public function __construct(
        protected TestimonialService $service
    ) {}

    public function index(): JsonResponse
    {
        return response()->json([
            'success' => true,
            'data' => TestimonialResource::collection(
                $this->service->all()
            ),
        ]);
    }

    public function store(StoreTestimonialRequest $request): JsonResponse
    {
        $data = $request->validated();

        if ($request->hasFile('avatar_path')) {
            $data['avatar_path'] = $request
                ->file('avatar_path')
                ->store('testimonials', 'public');
        }

        $testimonial = $this->service->create($data);

        return response()->json([
            'success' => true,
            'message' => 'Testimonial berhasil ditambahkan.',
            'data' => new TestimonialResource($testimonial),
        ], 201);
    }

    public function show(Testimonial $testimonial): JsonResponse
    {
        return response()->json([
            'success' => true,
            'data' => new TestimonialResource($testimonial),
        ]);
    }

    public function update(
        UpdateTestimonialRequest $request,
        Testimonial $testimonial
    ): JsonResponse {

        $data = $request->validated();

        if ($request->hasFile('avatar_path')) {

            if ($testimonial->avatar_path) {
                Storage::disk('public')->delete($testimonial->avatar_path);
            }

            $data['avatar_path'] = $request
                ->file('avatar_path')
                ->store('testimonials', 'public');
        }

        $testimonial = $this->service->update(
            $testimonial,
            $data
        );

        return response()->json([
            'success' => true,
            'message' => 'Testimonial berhasil diperbarui.',
            'data' => new TestimonialResource($testimonial),
        ]);
    }

    public function destroy(Testimonial $testimonial): JsonResponse
    {
        if ($testimonial->avatar_path) {
            Storage::disk('public')->delete(
                $testimonial->avatar_path
            );
        }

        $this->service->delete($testimonial);

        return response()->json([
            'success' => true,
            'message' => 'Testimonial berhasil dihapus.',
        ]);
    }
}