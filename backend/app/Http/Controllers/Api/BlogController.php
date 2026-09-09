<?php

namespace App\Http\Controllers\Api;

use App\Models\Blog;
use Illuminate\Support\Str;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Storage;
use App\Http\Controllers\Controller;
use App\Services\BlogService;
use App\Http\Requests\Blog\StoreBlogRequest;
use App\Http\Requests\Blog\UpdateBlogRequest;
use App\Http\Resources\BlogResource;

class BlogController extends Controller
{
    public function __construct(
        protected BlogService $service
    ) {}

    public function index(): JsonResponse
    {
        return response()->json([
            'success' => true,
            'data' => BlogResource::collection(
                $this->service->all()
            )
        ]);
    }

    public function store(StoreBlogRequest $request): JsonResponse
    {
        $data = $request->validated();

        // User yang sedang login
        $data['user_id'] = $request->user()->id;

        // Buat slug otomatis dari title
        $data['slug'] = Str::slug($data['title']);

        // Upload cover image jika ada
        if ($request->hasFile('cover_image')) {
            $data['cover_image'] = $request
                ->file('cover_image')
                ->store('blogs', 'public');
        }

        $blog = $this->service->create($data);

        return response()->json([
            'success' => true,
            'message' => 'Blog berhasil ditambahkan.',
            'data' => new BlogResource($blog)
        ], 201);
    }

    public function show(Blog $blog): JsonResponse
    {
        return response()->json([
            'success' => true,
            'data' => new BlogResource($blog)
        ]);
    }

    public function update(
        UpdateBlogRequest $request,
        Blog $blog
    ): JsonResponse {

        $data = $request->validated();

        if (isset($data['title'])) {
            $data['slug'] = Str::slug($data['title']);
        }

        // Upload cover image baru
        if ($request->hasFile('cover_image')) {

            if ($blog->cover_image) {
                Storage::disk('public')->delete($blog->cover_image);
            }

            $data['cover_image'] = $request
                ->file('cover_image')
                ->store('blogs', 'public');
        }

        $blog = $this->service->update($blog, $data);

        return response()->json([
            'success' => true,
            'message' => 'Blog berhasil diperbarui.',
            'data' => new BlogResource($blog)
        ]);
    }

    public function destroy(Blog $blog): JsonResponse
    {
        if ($blog->cover_image) {
            Storage::disk('public')->delete($blog->cover_image);
        }

        $this->service->delete($blog);

        return response()->json([
            'success' => true,
            'message' => 'Blog berhasil dihapus.'
        ]);
    }
}