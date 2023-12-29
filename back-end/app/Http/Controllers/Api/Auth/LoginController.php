<?php

namespace App\Http\Controllers\Api\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class LoginController extends Controller
{
    public function login()
    {
        // Aturan validasi
        $validator = Validator::make(request()->all(), [
            'email'     => 'required',
            'password'  => 'required'
        ], [
            'email.required' => 'Email wajib diisi',
            'password.required' => 'Password wajib diisi',
        ]);

        // Validasi
        if ($validator->fails()) {
            return response()->json([
                "status" => 422,
                "message" => "Email atau Password Anda salah"
            ]);
        }

        $credentials = request()->only('email', 'password');

        if (!$token = auth()->guard('api')->attempt($credentials)) {
            // Respon gagal memasukkan data
            return response()->json([
                "status" => 401,
                "message" => "Email atau Password Anda salah"
            ]);
        }

        // Respon berhasil memasukkan data
        return response()->json([
            'success' => true,
            'user'    => auth()->guard('api')->user(),
            'token'   => $token
        ], 200);
    }
}
