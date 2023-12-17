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

    public function Login(UserLoginRequest $request)
    {
        $credentials = $request->only(['email', 'password']);

        $request->validated($credentials);

        if (!Auth::attempt($credentials)) {
            return $this->error('', 'Unauthorized', 401);
        }

        return $this->success([
            'user' => Auth::user(),
            'token' => Auth::user()->createToken('AskHere Token')->plainTextToken
        ]);
    }

    public function Logout()
    {
        Auth::user()->currentAccessToken()->delete();

        return $this->success(code: 204);
    }

    public function Register(UserRegisterRequest $request)
    {
        $values = $request->only(['name', 'email', 'password']);

        $request->validated($values);

        $user = User::create([
            'name' => $values['name'],
            'email' => $values['email'],
            'password' => Hash::make($values['password'])
        ]);

        return $this->success([
            'user' => $user,
            'token' => $user->createToken('AskHere Token')->plainTextToken
        ], 201);
    }
}
