<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Contact;
use App\Services\ContactService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use App\Http\Requests\Contact\StoreContactRequest;
use App\Http\Resources\ContactResource;

class ContactController extends Controller
{
    public function __construct(
        protected ContactService $contactService
    ) {}

    /**
     * Menampilkan semua pesan contact.
     */
    public function index(): JsonResponse
    {
        return response()->json([
            'success' => true,
            'data' => ContactResource::collection(
                $this->contactService->all()
            ),
        ]);
    }

    /**
     * Menyimpan pesan contact baru.
     */
    public function store(StoreContactRequest $request): JsonResponse
    {
        $contact = $this->contactService->create(
            $request->validated()
        );

        return response()->json([
            'success' => true,
            'message' => 'Pesan berhasil dikirim.',
            'data' => new ContactResource($contact),
        ], 201);
    }

    /**
     * Menampilkan detail pesan.
     */
    public function show(Contact $contact): JsonResponse
    {
        return response()->json([
            'success' => true,
            'data' => new ContactResource($contact),
        ]);
    }

    /**
     * Memperbarui pesan/contact.
     */
    public function update(
        Request $request,
        Contact $contact
    ): JsonResponse {
        $data = $request->validate([
            'name' => ['sometimes', 'string', 'max:100'],
            'email' => ['sometimes', 'email', 'max:150'],
            'phone' => ['nullable', 'string', 'max:20'],
            'subject' => ['sometimes', 'string', 'max:150'],
            'message' => ['sometimes', 'string'],
            'is_read' => ['sometimes', 'boolean'],
        ]);

        if (
            isset($data['is_read']) &&
            $data['is_read'] === true &&
            !$contact->is_read
        ) {
            $data['read_at'] = now();
        }

        $contact = $this->contactService->update(
            $contact,
            $data
        );

        return response()->json([
            'success' => true,
            'message' => 'Pesan berhasil diperbarui.',
            'data' => new ContactResource($contact),
        ]);
    }

    /**
     * Menghapus pesan.
     */
    public function destroy(Contact $contact): JsonResponse
    {
        $this->contactService->delete($contact);

        return response()->json([
            'success' => true,
            'message' => 'Pesan berhasil dihapus.',
        ]);
    }

    /**
     * Menandai pesan sebagai sudah dibaca.
     */
    public function markAsRead(Contact $contact): JsonResponse
    {
        if (!$contact->is_read) {
            $contact = $this->contactService->update(
                $contact,
                [
                    'is_read' => true,
                    'read_at' => now(),
                ]
            );
        }

        return response()->json([
            'success' => true,
            'message' => 'Pesan ditandai sudah dibaca.',
            'data' => new ContactResource($contact),
        ]);
    }
}