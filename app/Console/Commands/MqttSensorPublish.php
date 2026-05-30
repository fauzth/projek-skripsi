<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use PhpMqtt\Client\MqttClient;

class MqttSensorPublish extends Command
{
    protected $signature = 'mqtt:sensor-publish';

    protected $description = 'Publish dummy sensor data';

    public function handle()
    {
        $server = '18.234.134.211';
        $port     = 1883;
        $clientId = 'laravel-publisher';

        $mqtt = new MqttClient(
            $server,
            $port,
            $clientId
        );

        $mqtt->connect();

        for ($i = 1; $i <= 20; $i++) {

            $timestamp =
                round(microtime(true) * 1000);

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

            $mqtt->publish(
                'iot/sensor',
                json_encode($payload),
                0
            );

            $this->info(
                "Publish data ke-$i"
            );

            sleep(10);
        }

        $mqtt->disconnect();
    }
}