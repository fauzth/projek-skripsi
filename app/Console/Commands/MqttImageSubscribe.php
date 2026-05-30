<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use PhpMqtt\Client\MqttClient;
use PhpMqtt\Client\ConnectionSettings;

class MqttImageSubscribe extends Command
{
    private $counter = 0;
    protected $signature = 'mqtt:image-subscribe';

    protected $description =
        'Subscribe MQTT image payload from ESP32-CAM';

    public function handle()
    {
        // =====================================================
        // MQTT CONFIG
        // =====================================================

        $server   = '18.234.134.211';

        $port     = 1883;

        $clientId =
            'laravel-image-subscriber-' . uniqid();

        // =====================================================
        // MQTT CLIENT
        // =====================================================

        $mqtt = new MqttClient(
            $server,
            $port,
            $clientId
        );

        // =====================================================
        // CONNECTION SETTINGS
        // =====================================================

        $settings = (new ConnectionSettings)
            ->setKeepAliveInterval(60)
            ->setConnectTimeout(10);

        $mqtt->connect($settings, true);

        $this->info('Connected to MQTT broker');
        $this->info('Waiting for MQTT messages...');
        // =====================================================
        // SUBSCRIBE IMAGE TOPIC
        // =====================================================

        $mqtt->subscribe('iot/image',

            function (
                string $topic,
                string $message
            ) {
                $this->counter++;

                $this->info(
                    "================================="
                );
                $this->info(
                    "DATA KE-" . $this->counter
                );
                $this->info(
                    "TOPIC: " . $topic
                );

                // =====================================================
                // RECEIVE TIMESTAMP
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
                $this->info(
                    "Receive Time: "
                    . $receiveFormatted
                );
                // =====================================================
                // JSON DECODE
                // =====================================================

                $payload =
                    json_decode($message, true);

                if (
                    json_last_error()
                    !== JSON_ERROR_NONE
                ) {

                    $this->error(
                        "JSON ERROR: "
                        . json_last_error_msg()
                    );

                    return;
                }

                // =====================================================
                // GET PAYLOAD DATA
                // =====================================================

                $publishTimestamp =
                    $payload['timestamp']
                    ?? null;

                $publishTime =
                    $payload['publish_time']
                    ?? null;

                $imageSize =
                    $payload['image_size_kb']
                    ?? null;

                $base64Image =
                    $payload['image']
                    ?? null;

                // =====================================================
                // VALIDATION
                // =====================================================

                if (
                    !$publishTimestamp
                    || !$base64Image
                ) {

                    $this->error(
                        "Payload tidak lengkap"
                    );

                    return;
                }

                // =====================================================
                // DELAY CALCULATION
                // =====================================================

                $delay =
                    $receiveTime
                    - $publishTimestamp;

                // =====================================================
                // BASE64 SIZE
                // =====================================================

                $base64SizeKB =
                    round(
                        strlen($base64Image)
                        / 1024,
                        2
                    );

                // =====================================================
                // OUTPUT TERMINAL
                // =====================================================

                $this->info(
                    "Publish Time: "
                    . $publishTime
                );

                $this->info(
                    "Publish Timestamp: "
                    . $publishTimestamp
                );

                $this->info(
                    "Receive Timestamp: "
                    . $receiveTime
                );

                $this->info(
                    "Delay: "
                    . $delay
                    . " ms"
                );

                $this->info(
                    "Image Size: "
                    . $imageSize
                    . " KB"
                );

                $this->info(
                    "Base64 Size: "
                    . $base64SizeKB
                    . " KB"
                );

                $this->info(
                    "Status: SUCCESS"
                );

                $this->info(
                    "=================================\n"
                );

            },

        1);

        // =====================================================
        // MQTT LOOP
        // =====================================================

        $mqtt->loop(true);
    }
}