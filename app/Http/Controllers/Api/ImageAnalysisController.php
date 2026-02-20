<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\ImageAnalysis;

class ImageAnalysisController extends Controller
{
    public function index()
    {
        $data = ImageAnalysis::with('pond')
            ->latest('analyzed_at')
            ->take(20)
            ->get();

        return response()->json($data);
    }
}
