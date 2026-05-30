<?php

namespace App\Http\Controllers\Api;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Log;
use App\Models\Capture;

class CameraController extends Controller
{
    //
 public function upload(Request $request)
{
    \Log::info('UPLOAD HIT');

    $deviceId = $request->query('device_id');
    Log::info($deviceId);

    $imageData = $request->getContent();

    if (!$imageData) {
        return response()->json([
            'status' => false,
            'message' => 'No image data'
        ], 400);
    }

    $filename = now()->format('Ymd_His') . '.jpg';
    $relativePath = 'maggot/' . $filename;
    $fullPath = storage_path(
        'app/public/' . $relativePath
    );

    file_put_contents($fullPath, $imageData);

    // =====================================================
    // PYTHON PROCESS
    // =====================================================

    $python = "/home/ubuntu/projek-skripsi/venv/bin/python";
    $script = "/home/ubuntu/projek-skripsi/python/detect.py";

    $command = "$python $script \"$fullPath\"";

    Log::info($command);

    $output = shell_exec($command . ' 2>&1');

    Log::info($output);

    $result = json_decode($output, true);
    
    Capture::create([
        'device_id' => $deviceId,
        'image_path' => $relativePath,
        'density' => $result['density'],
        'category' => $result['category'],
        'method' => $result['method']
    ]);

    return response()->json([
        'upload' => true,
        'image' => $relativePath,
        'python_result' => $result
    ]);
}
}
