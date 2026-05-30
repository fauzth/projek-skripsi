<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Device extends Model
{
    protected $fillable = [
        'pond_id',
        'device_name',
        'dev_eui',
        'status',
        'last_seen_at'
    ];

    public function pond()
    {
        return $this->belongsTo(Pond::class);
    }

    public function sensorData()
    {
        return $this->hasMany(SensorData::class);
    }
}

