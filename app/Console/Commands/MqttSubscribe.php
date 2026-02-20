<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use PhpMqtt\Client\MqttClient;
use PhpMqtt\Client\ConnectionSettings;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;

class MqttSubscribe extends Command
{
    protected $signature = 'mqtt:subscribe';
    protected $description = 'Subscribe MQTT ChirpStack and cache latest sensor data';

    public function handle()
    {
        $server   = '34.128.77.93';
        $port     = 1883;
        $clientId = 'laravel-subscriber-' . uniqid();

        $mqtt = new MqttClient($server, $port, $clientId);

        $settings = (new ConnectionSettings)
            ->setKeepAliveInterval(60)
            ->setConnectTimeout(10);

        $mqtt->connect($settings, true);

        $this->info('Connected to MQTT broker');

        $mqtt->subscribe('#', function (string $topic, string $message) {

            $payload = json_decode($message, true);

            if (!$payload) {
                return;
            }

            // Ambil data dummy
            $data = [
                'temperature' => $payload['temperature'] ?? null,
                'humidity'    => $payload['humidity'] ?? null,
                'received_at' => now()->toDateTimeString()
            ];

            // Simpan ke cache (bukan database)
            // Cache::put('latest_sensor_data', $data, 120);
            DB::table('sensor_data')->insert([
                'device_id' => 1,
                'temperature' => $payload['temperature'] ?? null,
                'humidity' => $payload['humidity'] ?? null,
                'distance' => $payload['distance'] ?? null,
                'received_at' => now(),
                'created_at' => now(),
                'updated_at' => now(),
            ]);


            $this->info('Data cached: ' . json_encode($data));
        }, 0);

        // Loop terus (wajib)
        $mqtt->loop(true);
    }
}
