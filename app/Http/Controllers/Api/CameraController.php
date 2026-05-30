<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class CameraController extends Controller
{
    public function upload(Request $request)
    {
        Log::info('UPLOAD HIT');

        // =====================================================
        // RECEIVE TIME
        // =====================================================

        $receiveTime =
            round(microtime(true) * 1000);

        $seconds =
            floor($receiveTime / 1000);

        $milliseconds =
            $receiveTime % 1000;

        $receiveFormatted =
            date(
                'H:i:s',
                $seconds
            ) . ':' .
            str_pad(
                $milliseconds,
                3,
                '0',
                STR_PAD_LEFT
            );

        // =====================================================
        // REQUEST DATA
        // =====================================================

        $deviceId =
            $request->query('device_id');

        $requestTimestamp =
            $request->query('timestamp');

        $requestTime =
            $request->query('request_time');

        $imageSize =
            $request->query('image_size');

        // =====================================================
        // DELAY
        // =====================================================

        $delay =
            $receiveTime
            - $requestTimestamp;

        // =====================================================
        // COUNTER
        // =====================================================

        $counterFile =
        storage_path('app/http_counter.txt');

        if (!file_exists($counterFile)) {

            file_put_contents(
                $counterFile,
                0
            );
        }

        $counter =
        (int) file_get_contents($counterFile);

        $counter++;

        file_put_contents(
            $counterFile,
            $counter
        );

        // =====================================================
        // IMAGE DATA
        // =====================================================

        $imageData =
            $request->getContent();

        if (!$imageData) {

            return response()->json([

                'status' => false,

                'message' => 'No image data'

            ], 400);
        }

        // =====================================================
        // TERMINAL LOG
        // =====================================================

        Log::info("=================================");

        Log::info("DATA KE-$counter");

        Log::info(
            "Request Time: "
            . $requestTime
        );

        Log::info(
            "Receive Time: "
            . $receiveFormatted
        );

        Log::info(
            "Request Timestamp: "
            . $requestTimestamp
        );

        Log::info(
            "Receive Timestamp: "
            . $receiveTime
        );

        Log::info(
            "Delay: "
            . $delay
            . " ms"
        );

        Log::info(
            "Image Size: "
            . $imageSize
            . " KB"
        );

        Log::info(
            "Status: SUCCESS"
        );

        Log::info("=================================");

        // =====================================================
        // SAVE IMAGE
        // =====================================================

        $filename =
            now()->format('Ymd_His_v')
            . '.jpg';

        $relativePath =
            'maggot/' . $filename;

        $fullPath =
            storage_path(
                'app/public/' . $relativePath
            );

        // =====================================================
        // CREATE FOLDER IF NOT EXISTS
        // =====================================================

        if (
            !file_exists(
                storage_path('app/public/maggot')
            )
        ) {

            mkdir(
                storage_path('app/public/maggot'),
                0777,
                true
            );
        }

        // =====================================================
        // SAVE FILE
        // =====================================================

        file_put_contents(
            $fullPath,
            $imageData
        );

        // =====================================================
        // RESPONSE
        // =====================================================

        return response()->json([

            'upload' => true,

            'device_id' => $deviceId,

            'delay_ms' => $delay,

            'image_size_kb' => $imageSize,

            'image_path' => $relativePath

        ], 200);
    }
}