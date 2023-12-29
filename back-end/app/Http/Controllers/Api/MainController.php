<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Student;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use Illuminate\Support\Carbon;

class MainController extends Controller
{
    public function index()
    {
        // Ambil data mahasiswa
        $data = Student::where('status', '<>', 0)->get();

        // Respon berhasil
        return response()->json([
            "status" => 200,
            "message" => "Get Data",
            "data" => $data
        ]);
    }
    public function create()
    {
        // Ambil input data
        $name = htmlspecialchars(request()->input('name'), true);
        $gender = htmlspecialchars(request()->input('gender'), true);
        $major = htmlspecialchars(request()->input('major'), true);
        $address = htmlspecialchars(request()->input('address'), true);

        // Aturan validasi
        $validator = Validator::make(
            request()->all(),
            [
                'name'     => 'required',
                'gender'     => 'required',
                'major'     => 'required',
                'address'     => 'required',
                'image'     => 'required|mimes:jpeg,jpg,png|max:2048',
            ],
            [
                'name.required' => 'Nama wajib diisi',
                'gender.required' => 'Jenis kelamin wajib diisi',
                'major.required' => 'Jurusan wajib diisi',
                'address.required' => 'Alamat wajib diisi',
                'image.required' => 'Gambar wajib diisi',
                'image.mimes' => 'Gambar harus format (JPEG, JPG, PNG)',
                'image.max' => 'Ukuran file gambar terlalu besar (Maksimal 2 MB)',
            ]
        );

        // Validasi
        if ($validator->fails()) {
            return response()->json([
                "status" => 422,
                "message" => "Errors",
                "validator" => $validator->errors(),
            ]);
        }

        // Logika membuat nirm
        $tahun = date('Y');
        $bulan = date('m');
        $tanggal = date('d');
        if (Student::all()->count() > 0) {
            $infoterakhir = Student::orderBy('id', 'desc')->first();
            $tahunterakhir = Carbon::parse($infoterakhir->created_at)->format('Y') ?? 0;
            $bulanterakhir = Carbon::parse($infoterakhir->created_at)->format('m') ?? 0;
            $nomor = $infoterakhir->id;

            if ($tahun != $tahunterakhir || $bulan != $bulanterakhir) {
                $nomor = 0;
            }
        } else {
            $nomor = 0;
        }

        // Membuat nirm
        $nirm = sprintf('%04d%02d%02d%03d', $tahun, $bulan, $tanggal, $nomor + 1);

        // Upload foto
        $image = "http://127.0.0.1:8000/profile/" . $nirm . "." .  request()->file('image')->getClientOriginalExtension();;
        $file = request()->file('image');
        $tujuan_upload = 'profile';
        $file->move($tujuan_upload, $image);

        // Masukkan data
        $post = Student::create([
            'nirm' => $nirm,
            'name' => Str::upper($name),
            'gender' => Str::title($gender),
            'major' => Str::title($major),
            'address' => Str::title($address),
            'image' => $image
        ]);

        if ($post) {
            // Respon berhasil memasukkan data
            return response()->json([
                "status" => 201,
                "message" => "Create Data",
            ]);
        }
    }
    public function show($id)
    {
        // Logika ketika data mahasiswa ada di table database
        if (Student::where('id', $id)->exists()) {
            // Respon berhasil
            return response()->json([
                "status" => 200,
                "message" => "Get Data ID: " . $id,
                "data" => Student::find($id)
            ]);
        }

        // Respon halaman tidak ditemukan
        return response()->json([
            "status" => 404,
            "message" => "Opps. halaman tidak ditemukan",
        ]);
    }
    public function update($id)
    {
        // Ambil data mahasiswa
        $data = Student::find($id);

        if (request()->file('image') == null) {
            $rule_image = '';
        } else {
            $rule_image = 'mimes:jpeg,jpg,png|max:2048';
        }

        // Ambil input data
        $name = htmlspecialchars(request()->input('name'), true);
        $gender = htmlspecialchars(request()->input('gender'), true);
        $major = htmlspecialchars(request()->input('major'), true);
        $address = htmlspecialchars(request()->input('address'), true);

        // Aturan validasi
        $validator = Validator::make(
            request()->all(),
            [
                'name'     => 'required',
                'gender'     => 'required',
                'major'     => 'required',
                'address'     => 'required',
                'image'     => $rule_image,
            ],
            [
                'name.required' => 'Nama wajib diisi',
                'gender.required' => 'Jenis kelamin wajib diisi',
                'major.required' => 'Jurusan wajib diisi',
                'address.required' => 'Alamat wajib diisi',
                'image.mimes' => 'Gambar harus format (JPEG, JPG, PNG)',
                'image.max' => 'Ukuran file gambar terlalu besar (Maksimal 2 MB)',
            ]
        );

        // Validasi
        if ($validator->fails()) {
            return response()->json([
                "status" => 422,
                "message" => "Errors",
                "validator" => $validator->errors(),
            ]);
        }

        // Logika ketika gambar ingin di update atau tidak
        if (request()->file('image') == null) {
            $image = $data->image;
        } else {
            $endFormat = explode("/", $data->image);
            $cutEnd = end($endFormat);
            if (file_exists('profile/' . $data->nirm . substr($cutEnd, -4))) {
                unlink('profile/' . $data->nirm . substr($cutEnd, -4));
            }
            // Upload foto
            $image = "http://127.0.0.1:8000/profile/" . $data->nirm . "." . request()->file('image')->getClientOriginalExtension();
            $file = request()->file('image');
            $tujuan_upload = 'profile';
            $file->move($tujuan_upload, $image);
        }

        // Update data
        $update = Student::where('id', $id)->update([
            'name' => Str::upper($name),
            'gender' => Str::title($gender),
            'major' => Str::title($major),
            'address' => Str::title($address),
            'image' => $image
        ]);

        if ($update) {
            // Respon berhasil update data
            return response()->json([
                "status" => 201,
                "message" => "Update Data",
            ]);
        }
    }
    public function destroy($id)
    {
        // Destroy data
        $destroy = Student::where('id', $id)->update([
            'status' => 0
        ]);

        if ($destroy) {
            // Respon berhasil destroy data
            return response()->json([
                "status" => 201,
                "message" => "Destroy Data",
            ]);
        }
    }
}
