<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\SensorData;

class DashboardController extends Controller
{
    public function index()
    {
        $sensorData = SensorData::latest('received_at')
            ->take(10)
            ->get();

        return Inertia::render('Dashboard', [
            'sensorData' => $sensorData
        ]);
    }
}
