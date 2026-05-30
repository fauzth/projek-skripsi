<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use PhpMqtt\Client\MqttClient;
use PhpMqtt\Client\ConnectionSettings;

class MqttSensorSubscribe extends Command
{
    protected $signature =
        'mqtt:sensor-subscribe';

    protected $description =
        'Subscribe MQTT sensor dummy';

    private $counter = 0;

    public function handle()
    {
        // =====================================================
        // MQTT CONFIG
        // =====================================================

        $server =
            '18.234.134.211';

        $port =
            1883;

        $clientId =
            'laravel-sensor-subscriber-'
            . uniqid();

        // =====================================================
        // MQTT CLIENT
        // =====================================================

        $mqtt = new MqttClient(
            $server,
            $port,
            $clientId
        );

        // =====================================================
        // SETTINGS
        // =====================================================

        $settings =
            (new ConnectionSettings)

            ->setKeepAliveInterval(60)

            ->setConnectTimeout(10);

        $mqtt->connect(
            $settings,
            true
        );

        $this->info(
            'Connected to MQTT broker'
        );

        $this->info(
            'Waiting for sensor data...'
        );

        // =====================================================
        // SUBSCRIBE
        // =====================================================

        $mqtt->subscribe(

            'iot/sensor',

            function (
                string $topic,
                string $message
            ) {

                $this->counter++;

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
                // JSON DECODE
                // =====================================================

                $payload =
                    json_decode(
                        $message,
                        true
                    );

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
                // PAYLOAD DATA
                // =====================================================

                $publishTimestamp =
                    $payload['timestamp']
                    ?? null;

                $publishTime =
                    $payload['publish_time']
                    ?? null;

                $temperature_1 =
                    $payload['temperature_1']
                    ?? null;
                $temperature_2 =
                    $payload['temperature_2']
                    ?? null;

                $humidity_1 =
                    $payload['humidity_1']
                    ?? null;
                $humidity_2 =
                    $payload['humidity_2']
                    ?? null;

                $light =
                    $payload['light']
                    ?? null;

                // =====================================================
                // DELAY
                // =====================================================

                $delay =
                    $receiveTime
                    - $publishTimestamp;

                // =====================================================
                // PAYLOAD SIZE
                // =====================================================

                $payloadSize = strlen($message) ;

                // =====================================================
                // OUTPUT
                // =====================================================

                $this->info(
                    "================================="
                );

                $this->info(
                    "DATA KE-"
                    . $this->counter
                );

                $this->info(
                    "TOPIC: "
                    . $topic
                );

                $this->info(
                    "Publish Time: "
                    . $publishTime
                );

                $this->info(
                    "Receive Time: "
                    . $receiveFormatted
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
                    "Payload Size: "
                    . $payloadSize
                    . " Byte"
                );

                $this->info(
                    "Temperature_1: "
                    . $temperature_1
                );
                $this->info(
                    "Temperature_2: "
                    . $temperature_2
                );

                $this->info(
                    "Humidity_1: "
                    . $humidity_1
                );
                $this->info(
                    "Humidity_2: "
                    . $humidity_2
                );

                $this->info(
                    "Light: "
                    . $light
                );

                $this->info(
                    "Status: SUCCESS"
                );

                $this->info(
                    "=================================\n"
                );

            },

            1
        );

        // =====================================================
        // LOOP
        // =====================================================

        $mqtt->loop(true);
    }
}