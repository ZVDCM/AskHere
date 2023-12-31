<?php

namespace App\Http\Controllers;

use App\Contracts\Users\RegisterUserContract;
use App\Http\Requests\UserLoginRequest;
use App\Http\Requests\UserRegisterRequest;
use App\Jobs\RegisterUserJob;
use App\Models\User;
use App\Traits\HttpResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Ramsey\Uuid\Uuid;

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
        $password = Hash::make($data['password']);

        if (User::where('email', $data['email'])->exists()) {
            return $this->error('', 'User with this email already exists', 409);
        }
        
        if (User::where('username', $data['username'])->exists()) {
            return $this->error('', 'User with this username already exists', 409);
        }

        $user = User::create([
            'id' => (string) Uuid::uuid4(),
            'username' => $data['username'],
            'email' => $data['email'],
            'password' => $password
        ]);

        RegisterUserJob::dispatch(
            new RegisterUserContract(
                $user->id,
                $user->username,
                $user->email,
                $password
            )
        );

        return $this->success([
            'token' => $user
                ->createToken('AskHere Token')
                ->plainTextToken
        ], code: 201);
    }
}
