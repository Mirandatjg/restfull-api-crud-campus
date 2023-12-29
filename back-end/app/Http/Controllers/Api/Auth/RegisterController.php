<?php

namespace App\Http\Controllers\Api\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Validator;

class RegisterController extends Controller
{
    public function create()
    {
        // Ambil input data
        $name = htmlspecialchars(request()->input('name'), true);
        $email = htmlspecialchars(request()->input('email'), true);

        // Aturan validasi
        $validator = Validator::make(request()->all(), [
            'name'      => 'required',
            'email'     => 'required|email|unique:users',
            'password'  => 'required|min:8|confirmed'
        ], [
            'name.required' => 'Nama wajib diisi',
            'email.required' => 'Email wajib diisi',
            'email.email' => 'Email tidak valid',
            'email.unique' => 'Email sudah terdaftar',
            'password.required' => 'Kata sandi wajib diisi',
            'password.min' => 'Kata sandi minimal 8 karakter',
            'password.confirmed' => 'Konfirmasi kata sandi salah',
        ]);

        // Validasi
        if ($validator->fails()) {
            return response()->json([
                "status" => 422,
                "message" => "Errors",
                "validator" => $validator->errors(),
            ]);
        }

        // Masukkan data
        $user = User::create([
            'name'      => Str::title($name),
            'email'     => Str::lower($email),
            'password'  => bcrypt(request()->password)
        ]);

        if ($user) {
            // Respon berhasil memasukkan data
            return response()->json([
                'success' => true,
                'user'    => $user,
            ], 201);
        }

        // Respon gagal memasukkan data
        return response()->json([
            'success' => false,
        ], 409);
    }
}
