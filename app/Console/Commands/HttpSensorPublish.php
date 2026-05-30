<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Http;

class HttpSensorPublish extends Command
{
    protected $signature =
        'http:sensor-publish';

    protected $description =
        'Publish sensor via HTTP';

    public function handle()
    {
        for ($i = 1; $i <= 20; $i++) {

            $timestamp =
                round(
                    microtime(true) * 1000
                );

            $payload = [

                'timestamp' => $timestamp,

                'temperature_1' =>
                    rand(270, 320) / 10,

                'temperature_2' =>
                    rand(270, 320) / 10,

                'humidity_1' =>
                    rand(700, 900) / 10,

                'humidity_2' =>
                    rand(700, 900) / 10,

                'light' =>
                    rand(300, 700)

            ];

            $response = Http::post(

                'http://18.234.134.211:8000/api/sensor-http',

                $payload

            );

            $this->info(
                "Send data ke-$i"
            );

            sleep(10);
        }
    }
}