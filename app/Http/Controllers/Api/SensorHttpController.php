<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class SensorHttpController extends Controller
{
    


    public function store(Request $request)
    {
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
        // RECEIVE TIME
        // =====================================================

        $receiveTime =
            round(
                microtime(true)
                * 1000
            );

        $seconds =
            floor(
                $receiveTime / 1000
            );

        $milliseconds =
            $receiveTime % 1000;

        $receiveFormatted =
            date(
                'H:i:s',
                $seconds
            ) . '.' .
            str_pad(
                $milliseconds,
                3,
                '0',
                STR_PAD_LEFT
            );

        // =====================================================
        // REQUEST DATA
        // =====================================================

        $publishTimestamp =
            $request->timestamp;

        $temperature1 =
            $request->temperature_1;

        $temperature2 =
            $request->temperature_2;

        $humidity1 =
            $request->humidity_1;

        $humidity2 =
            $request->humidity_2;

        $light =
            $request->light;


        $publishSeconds =
            floor(
                $publishTimestamp / 1000
            );

        $publishMilliseconds =
            $publishTimestamp % 1000;

        $publishFormatted =
            date(
                'H:i:s',
                $publishSeconds
            ) . '.' .
            str_pad(
                $publishMilliseconds,
                3,
                '0',
                STR_PAD_LEFT
            );

        // =====================================================
        // DELAY
        // =====================================================


        $delay =
            $receiveTime
            - $publishTimestamp;

        // =====================================================
        // PAYLOAD SIZE
        // =====================================================

        $payloadSize =
            round(strlen(
                $request->getContent()
            )/1024,2);

        // =====================================================
        // LOG
        // =====================================================

        Log::info(
            "================================="
        );

        Log::info(
            "DATA KE-"
            . $counter
        );

        Log::info(
            "Publish Time: "
            . $publishFormatted
        );

        Log::info(
            "Receive Time: "
            . $receiveFormatted
        );

        Log::info(
            "Delay: "
            . $delay
            . " ms"
        );

        Log::info(
            "Payload Size: "
            . $payloadSize
            . " Byte"
        );

        Log::info(
            "Temperature 1: "
            . $temperature1
        );

        Log::info(
            "Temperature 2: "
            . $temperature2
        );

        Log::info(
            "Humidity 1: "
            . $humidity1
        );

        Log::info(
            "Humidity 2: "
            . $humidity2
        );

        Log::info(
            "Light: "
            . $light
        );

        Log::info(
            "Status: SUCCESS"
        );

        Log::info(
            "=================================\n"
        );

        return response()->json([

            'status' => true,

            'delay_ms' => $delay,

            'payload_size' => $payloadSize

        ]);
    }
}