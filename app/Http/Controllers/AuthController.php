<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;

class AuthController extends Controller
{
    //
    public function saveFcmToken(Request $request)
{
    $request->validate([
        'user_id' => 'required',
        'fcm_token' => 'required',
    ]);

    $user = User::find($request->user_id);

    if (!$user) {
        return response()->json([
            'message' => 'User tidak ditemukan'
        ], 404);
    }

    $user->update([
        'fcm_token' => $request->fcm_token,
    ]);

    return response()->json([
        'message' => 'Token berhasil disimpan'
    ]);
}
}
