<?php

namespace App\Http\Controllers;

use App\Http\Requests\UserLoginRequest;
use App\Http\Requests\UserRegisterRequest;
use App\Models\User;
use App\Traits\HttpResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    use HttpResponse;

    public function login(UserLoginRequest $request)
    {
        $data = $request->safe()->only(['email', 'password']);

        if (!Auth::attempt($data)) {
            return $this->error('', 'Unauthorized', 401);
        }

        return $this->success([
            'user' => Auth::user(),
            'token' => Auth::user()->createToken('AskHere Token')->plainTextToken
        ]);
    }

    public function logout()
    {
        Auth::user()->currentAccessToken()->delete();

        return $this->success(code: 204);
    }

    public function register(UserRegisterRequest $request)
    {
        $data = $request->safe()->only(['username', 'email', 'password']);

        $user = User::create([
            'username' => $data['username'],
            'email' => $data['email'],
            'password' => Hash::make($data['password'])
        ]);

        return $this->success([
            'user' => $user,
            'token' => $user
                ->createToken('AskHere Token')
                ->plainTextToken
        ], code: 201);
    }
}
