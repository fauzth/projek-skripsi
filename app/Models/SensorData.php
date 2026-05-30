<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SensorData extends Model
{
    protected $table = 'sensor_data';

    protected $fillable = [
        'device_id',
        'temperature',
        'humidity',
        'distance',
        'battery_voltage',
        'rssi',
        'snr',
        'received_at'
    ];

    public function device()
    {
        return $this->belongsTo(Device::class);
    }
}

