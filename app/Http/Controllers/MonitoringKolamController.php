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

                // 🔥 FIX FIELD BARU
                'temp_pakan' => $latest?->temp_pakan,
                'hum_pakan' => $latest?->hum_pakan,

                'temp_udara' => $latest?->temp_udara,
                'hum_udara' => $latest?->hum_udara,

                'intensitas_cahaya' => $latest?->intensitas_cahaya,

                'received_at' => $latest?->received_at,
            ];
        })->values();

        return Inertia::render('MonitorKolam', [
            'poolsData' => $poolsData
        ]);
    }
}