<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class QosLog extends Model
{
    //
    protected $fillable = [
        'gateway_id',
        'throughput',
        'delay',
        'jitter',
        'packet_loss',
        'tested_at',
    ];
}
