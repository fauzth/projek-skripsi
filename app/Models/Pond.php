<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
class Pond extends Model
{
    protected $fillable = ['pond_name', 'description'];

    public function devices()
    {
        return $this->hasMany(Device::class);
    }
}
