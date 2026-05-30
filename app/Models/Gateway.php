<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Gateway extends Model
{
    use HasFactory;

    protected $fillable = [
        'gateway_name',
        'gateway_eui',
        'ip_address',
        'status',
        'last_seen_at',
    ];

    protected $casts = [
        'last_seen_at' => 'datetime',
    ];

    public function getIsOnlineAttribute()
    {
        if (!$this->last_seen_at) return false;

        return $this->last_seen_at->diffInMinutes(now()) < 5;
    }



    // ======================
    // RELATIONS
    // ======================

    public function qosLogs()
    {
        return $this->hasMany(QosLog::class);
    }
}
