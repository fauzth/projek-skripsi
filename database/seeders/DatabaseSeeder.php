<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Carbon\Carbon;
use App\Models\Pond;
use App\Models\Device;
use App\Models\Gateway;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // ======================
        // USERS
        // ======================
        // DB::table('users')->insert([
        //     [
        //         'name' => 'Admin',
        //         'email' => 'admin@maggot.com',
        //         'password' => Hash::make('password'),
        //         'role' => 'admin',
        //         'created_at' => now(),
        //         'updated_at' => now(),
        //     ],
        //     [
        //         'name' => 'Operator',
        //         'email' => 'operator@maggot.com',
        //         'password' => Hash::make('password'),
        //         'role' => 'operator',
        //         'created_at' => now(),
        //         'updated_at' => now(),
        //     ]
        // ]);

        // ======================
        // PONDS (6 Kolam)
        // ======================
        $ponds = [];

        for ($i = 1; $i <= 6; $i++) {
            $ponds[$i] = Pond::create([
                'pond_name' => "Kolam $i",
                'description' => "Kolam budidaya maggot $i"
            ]);
        }

        // ======================
        // DEVICES (1 per pond)
        // ======================
        $devices = [];

        foreach ($ponds as $pond) {
            $devices[$pond->id] = Device::create([
                'pond_id' => $pond->id,
                'device_name' => "Node Kolam {$pond->id}",
                'dev_eui' => "DEV-EUI-{$pond->id}",
                'status' => 'active',
                'last_seen_at' => now()
            ]);
        }

        // ======================
        // SENSOR DATA (Simulasi 50 record)
        // ======================
        for ($i = 0; $i < 50; $i++) {

            $randomPond = rand(1, 6);
            $device = $devices[$randomPond];

            DB::table('sensor_data')->insert([
                'device_id' => $device->id,
                'temperature' => rand(270, 320) / 10,  // 27.0 - 32.0
                'humidity' => rand(600, 800) / 10,     // 60 - 80
                'distance' => rand(5, 30),
                'battery_voltage' => rand(35, 42) / 10, // 3.5 - 4.2 V
                'rssi' => rand(-120, -80),
                'snr' => rand(5, 15),
                'received_at' => Carbon::now()->subMinutes(50 - $i),
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }

        // ======================
        // IMAGE ANALYSIS (Opsional)
        // ======================
        for ($i = 0; $i < 10; $i++) {

            DB::table('image_analysis')->insert([
                'pond_id' => rand(1, 6),
                'image_path' => 'images/sample_' . $i . '.jpg',
                'prediction' => rand(0, 1) ? 'normal' : 'abnormal',
                'confidence' => rand(700, 990) / 100,
                'analyzed_at' => Carbon::now()->subDays(10 - $i),
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }

        DB::table('gateways')->insert([
            'gateway_name' => 'Gateway LoRa',
            'gateway_eui' => 'GW-001',
            'ip_address' => '192.168.1.10',
            'status' => 'active',
            'last_seen_at' => now(),
        ]);
    }
}
