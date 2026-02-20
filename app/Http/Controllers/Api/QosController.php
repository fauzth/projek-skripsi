<?php
namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\QoSLog;

class QosController extends Controller
{
    public function store(Request $request)
    {
        QoSLog::create([
            'gateway_id' => 1,
            'throughput' => $request->throughput,
            'delay' => $request->delay,
            'jitter' => $request->jitter,
            'packet_loss' => $request->packet_loss,
            'tested_at' => now(),
        ]);

        return response()->json([
            'message' => 'QoS data stored successfully'
        ], 201);
    }
}

