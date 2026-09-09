<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Services\AuthService;
use Illuminate\Http\JsonResponse;
use App\Http\Resources\UserResource;
use Illuminate\Http\Request;

class AuthController extends Controller
{
    public function __construct(
        protected AuthService $authService
    ) {
    }

   public function login(LoginRequest $request): JsonResponse
{
    $result = $this->authService->login($request->validated());

    if (!$result) {
        return response()->json([
            'success' => false,
            'message' => 'Email atau password salah.',
        ], 401);
    }

    return response()->json([
        'success' => true,
        'message' => 'Login berhasil.',
        'data' => [
            'token' => $result['token'],
            'user' => new UserResource($result['user']),
        ]
    ]);
}
public function logout(Request $request): JsonResponse
{
    $this->authService->logout($request->user());

    return response()->json([
        'success' => true,
        'message' => 'Logout berhasil.'
    ]);
}

public function me(Request $request): JsonResponse
{
    return response()->json([
        'success' => true,
        'data' => new UserResource($request->user()),
    ]);
}
}