<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\SensorController;
use App\Http\Controllers\Api\QosController;
use App\Http\Controllers\Api\SensorHttpController;



use App\Http\Controllers\Api\CameraController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\NotificationController;

Route::prefix('sensor')->group(function () {

    // 🔥 SIMPAN DATA (optional, kalau masih dipakai)
    Route::post('/', [SensorController::class, 'store']);

    // 🔥 DATA TERBARU (GLOBAL)
    Route::get('/latest', [SensorController::class, 'latest']);

    // 🔥 DATA TERBARU PER KOLAM
    Route::get('/latest/{pondId}', [SensorController::class, 'latestByPond']);

    // 🔥 HISTORY
    Route::get('/history', [SensorController::class, 'history']);

    // 🔥 AVERAGE (optional)
    Route::get('/average/{pondId}', [SensorController::class, 'average']);
});

// IMAGE ANALYSIS
Route::post('/upload-image', [CameraController::class, 'upload']);



// QOS
Route::post('/qos', [QosController::class, 'store']);
// Route::post('/qos', function () {
//     return response()->json(['ok' => true]);
// });

Route::get('/qos-test', function () {
    return response()->json([
        'status' => 'ok',
        'timestamp' => now()
    ]);
});



Route::post('/save-fcm-token', [AuthController::class, 'saveFcmToken']);

Route::post('/send-sensor-alert', [NotificationController::class, 'send']);







Route::post(
    '/sensor-http',
    [SensorHttpController::class, 'store']
);

?>
