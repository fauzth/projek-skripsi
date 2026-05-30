<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use PhpMqtt\Client\MqttClient;
use PhpMqtt\Client\ConnectionSettings;
use Illuminate\Support\Facades\DB;

class MqttSubscribe extends Command
{
    protected $signature = 'mqtt:subscribe';
    protected $description = 'Subscribe MQTT ChirpStack and store sensor data';

    public function handle()
    {
        $server   = '18.234.134.211';
        $port     = 1883;
        $clientId = 'laravel-subscriber-' . uniqid();

        $mqtt = new MqttClient($server, $port, $clientId);

        $settings = (new ConnectionSettings)
            ->setKeepAliveInterval(60)
            ->setConnectTimeout(10);

        $mqtt->connect($settings, true);

        $this->info('Connected to MQTT broker');

        $mqtt->subscribe('application/+/device/+/event/up', function (string $topic, string $message) {

            $this->info("TOPIC: " . $topic);

            // 🔥 DEV EUI dari topic (source of truth)
            $parts = explode('/', $topic);
            $devEui = strtolower(trim($parts[3] ?? ''));

            if (!$devEui) {
                $this->error("devEui kosong");
                return;
            }

            // Decode payload
            $payload = json_decode($message, true);

            if (json_last_error() !== JSON_ERROR_NONE) {
                $this->error("JSON ERROR: " . json_last_error_msg());
                return;
            }

            if (empty($payload)) {
                $this->warn("Payload kosong");
                return;
            }

            $object = $payload['object'] ?? null;

            if (!$object) {
                $this->warn("Object kosong");
                return;
            }

            // 🔥 Mapping sesuai codec baru
            $temp_pakan         = $object['temp_pakan'] ?? null;
            $hum_pakan          = $object['hum_pakan'] ?? null;
            $temp_udara         = $object['temp_udara'] ?? null;
            $hum_udara          = $object['hum_udara'] ?? null;
            $intensitas_cahaya  = $object['intensitas_cahaya'] ?? null;

            $battery_voltage = $object['battery_voltage'] ?? null;

            $rssi = $payload['rxInfo'][0]['rssi'] ?? null;
            $snr  = $payload['rxInfo'][0]['snr'] ?? null;

            // 🔥 Mapping device
            $device = DB::table('devices')
                ->whereRaw('LOWER(TRIM(dev_eui)) = ?', [$devEui])
                ->first();

            if (!$device) {
                $this->error("Device tidak ditemukan: [" . $devEui . "]");
                return;
            }

            $deviceId = $device->id;

            // 🔥 Update last seen
            DB::table('devices')
                ->where('id', $deviceId)
                ->update([
                    'last_seen_at' => now(),
                    'updated_at'   => now()
                ]);

            $data = [
                'device_id'           => $deviceId,
                'temp_pakan'          => $temp_pakan,
                'hum_pakan'           => $hum_pakan,
                'temp_udara'          => $temp_udara,
                'hum_udara'           => $hum_udara,
                'intensitas_cahaya'   => $intensitas_cahaya,
                'battery_voltage'     => $battery_voltage,
                'rssi'                => $rssi,
                'snr'                 => $snr,
                'received_at'         => now(),
                'created_at'          => now(),
                'updated_at'          => now(),
            ];

            try {
                DB::table('sensor_data')->insert($data);
                $this->info("Inserted: " . json_encode($data));
            } catch (\Exception $e) {
                $this->error("DB ERROR: " . $e->getMessage());
            }

        }, 1);

        $mqtt->loop(true);
    }
}