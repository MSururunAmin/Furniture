<?php

namespace App\Services;

use App\Models\User;
use App\Repositories\Contracts\UserRepositoryInterface;
use Illuminate\Support\Facades\Hash;
use Laravel\Sanctum\PersonalAccessToken;

class AuthService
{
    public function __construct(
        protected UserRepositoryInterface $users
    ) {
    }

    public function login(array $credentials)
    {
        $user = $this->users->findByEmail($credentials['email']);

        if (! $user) {
            return null;
        }

        if (! Hash::check($credentials['password'], $user->password)) {
            return null;
        }

        $token = $user->createToken('auth-token')->plainTextToken;

        return [
            'token' => $token,
            'user' => $user,
        ];
    }

   public function logout(User $user): void
{
    /** @var PersonalAccessToken|null $token */
    $token = $user->currentAccessToken();

    if ($token) {
        $token->delete();
    }
}
}