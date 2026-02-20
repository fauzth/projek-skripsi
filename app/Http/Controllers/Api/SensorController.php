<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\SensorData;

class SensorController extends Controller
{
    // POST: Simpan data sensor (dari ESP / MQTT)
    public function store(Request $request)
    {
        $request->validate([
            'device_id' => 'required|exists:devices,id',
            'pond_id' => 'required|exists:ponds,id',
            'temperature' => 'nullable|numeric',
            'humidity' => 'nullable|numeric',
            'distance' => 'nullable|numeric',
        ]);

        $data = SensorData::create([
            'device_id' => $request->device_id,
            'pond_id' => $request->pond_id,
            'temperature' => $request->temperature,
            'humidity' => $request->humidity,
            'distance' => $request->distance,
            'received_at' => now(),
        ]);

        return response()->json([
            'message' => 'Sensor data saved',
            'data' => $data
        ], 201);
    }

    // GET: Data terbaru per kolam
    public function latest()
    {
        $data = SensorData::latest('received_at')
            ->take(10)
            ->get();

        return response()->json($data);
    }


    // GET: Rata-rata per kolam
    public function average($pondId)
    {
        $avg = SensorData::where('pond_id', $pondId)
            ->selectRaw('
                AVG(temperature) as avg_temp,
                AVG(humidity) as avg_humidity,
                AVG(distance) as avg_distance
            ')
            ->first();

        return response()->json($avg);
    }
}
