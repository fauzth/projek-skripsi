<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Pond;

class MonitoringKolamController extends Controller
{


public function index()
{
    $ponds = Pond::with([
        'devices.sensorData' => function ($query) {
            $query->latest('received_at')->limit(1);
        }
    ])->get();

    $poolsData = $ponds->map(function ($pond) {

        $device = $pond->devices->first();
        $latest = $device?->sensorData->first();

        return [
            'id' => $pond->id,
            'name' => $pond->pond_name,
            'temperature' => $latest?->temperature,
            'humidity' => $latest?->humidity,
            'received_at' => $latest?->received_at,
        ];
    })->values(); // penting supaya jadi array bersih

    return Inertia::render('MonitorKolam', [
        'poolsData' => $poolsData
    ]);
}


}
