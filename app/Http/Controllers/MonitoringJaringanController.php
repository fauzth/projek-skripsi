<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
// use Illuminate\Http\Request;
use App\Models\Gateway;

class MonitoringJaringanController extends Controller
{
    //


public function index()
{
    $gateway = Gateway::find(1);

    if (!$gateway) {
        return Inertia::render('MonitorJaringan', [
            'avgQoS' => null,
            'qosLogs' => []
        ]);
    }

    $latestLogs = $gateway->qosLogs()
        ->orderBy('tested_at', 'desc')
        ->take(10)
        ->get();

    $avgQoS = [
        'throughput' => round($latestLogs->avg('throughput'), 2),
        'delay' => round($latestLogs->avg('delay'), 2),
        'jitter' => round($latestLogs->avg('jitter'), 2),
        'packet_loss' => round($latestLogs->avg('packet_loss'), 2),
    ];

    return Inertia::render('MonitorJaringan', [
        'avgQoS' => $avgQoS,
        'qosLogs' => $latestLogs
    ]);
}

}
