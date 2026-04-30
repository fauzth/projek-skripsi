<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\SensorData;

class SensorController extends Controller
{
    // POST: Simpan data sensor (dari ESP / MQTT)
   public function latest()
{
    // 🔥 Ambil data udara terbaru (yang valid)
    $latestUdara = SensorData::whereNotNull('temp_udara')
        ->whereNotNull('hum_udara')
        ->orderByDesc('received_at')
        ->first();

    // 🔥 Ambil data terbaru tiap device (kolam)
    $devices = \App\Models\Device::all();

    $kolam = $devices->map(function ($device) {

        $latest = SensorData::where('device_id', $device->id)
            ->orderByDesc('received_at')
            ->first();

        return [
            'device_id' => $device->id,
            'name' => $device->device_name,

            'temp_pakan' => $latest->temp_pakan ?? 0,
            'hum_pakan' => $latest->hum_pakan ?? 0,

            'updated_at' => $latest->received_at ?? null,
        ];
    });

    return response()->json([
        'temp_udara' => $latestUdara->temp_udara ?? 0,
        'hum_udara' => $latestUdara->hum_udara ?? 0,
        'kolam' => $kolam
    ]);
}
}
