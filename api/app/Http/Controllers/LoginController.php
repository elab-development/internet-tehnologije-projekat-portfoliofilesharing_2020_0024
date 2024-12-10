<?php

namespace App\Http\Controllers;

use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class LoginController extends BaseController
{
    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required'
        ]);

        if ($validator->fails()) {
            return $this->error('Validation failed', $validator->errors());
        }

        $credentials = $request->only('email', 'password');

        if (!auth()->attempt($credentials)) {
            return $this->error('Email or password was not correct', [], 401);
        }

        $user = auth()->user();
        $token = $user->createToken('authToken')->plainTextToken;

        return $this->success('Login successful', [
            'token' => $token,
            'user' => new UserResource($user)
        ]);
    }

    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();
        return $this->success('Logout successful');
    }

    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required',
            'name' => 'required',
        ]);

        if ($validator->fails()) {
            return $this->error('Validation failed', $validator->errors());
        }

        $user = User::create([
            'email' => $request->email,
            'password' => bcrypt($request->password),
            'name' => $request->name,
            'role' => 'user'
        ]);

        return $this->success('User registrated', new UserResource($user));
    }
}
