<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use PhpMqtt\Client\MqttClient;

class MqttImagePublish extends Command
{
    protected $signature = 'mqtt:image-publish';

    protected $description =
        'Publish image via MQTT';

    public function handle()
    {
        $server = '18.234.134.211';
        $port = 1883;

        $clientId =
            'laravel-image-publisher';

        $mqtt = new MqttClient(
            $server,
            $port,
            $clientId
        );

        $mqtt->connect();

        for ($i = 1; $i <= 20; $i++) {

            $timestamp =
                round(
                    microtime(true) * 1000
                );

            $imagePath =
                storage_path(
                    'app/test.jpg'
                );

            $imageData =
                file_get_contents(
                    $imagePath
                );

            $base64 =
                base64_encode(
                    $imageData
                );

            $payload = [

                'timestamp' => $timestamp,

                'image' => $base64

            ];

            $mqtt->publish(
                'iot/image',
                json_encode($payload),
                0
            );

            $this->info(
                "Publish image ke-$i"
            );

            sleep(10);
        }

        $mqtt->disconnect();
    }
}