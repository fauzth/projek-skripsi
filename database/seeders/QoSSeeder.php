<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class QoSSeeder extends Seeder
{
    public function run(): void
    {
        for ($i = 0; $i < 20; $i++) {
            DB::table('qos_logs')->insert([
                'gateway_id' => 1,
                'throughput' => rand(800, 1200) / 100,   // 8 - 12 Mbps
                'delay' => rand(10, 80),                 // ms
                'jitter' => rand(1, 15),                 // ms
                'packet_loss' => rand(0, 2),             // %
                'tested_at' => Carbon::now()->subMinutes(20 - $i),
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}
