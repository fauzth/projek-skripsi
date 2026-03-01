<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\SensorController;
use App\Http\Controllers\Api\QosController;
use App\Http\Controllers\Api\ImageAnalysisController;



// SENSOR
Route::post('/sensor', [SensorController::class, 'store']);
// Route::get('/sensor/latest', [SensorController::class, 'latest']);
Route::prefix('sensor')->group(function () {
    Route::get('/latest', [SensorController::class, 'latest']);
});
Route::get('/sensor/average/{pondId}', [SensorController::class, 'average']);
Route::get('/sensor/history', [SensorController::class, 'history']);


// IMAGE ANALYSIS
Route::get('/analysis', [ImageAnalysisController::class, 'index']);



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


?>
