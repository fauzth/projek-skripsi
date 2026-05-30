<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Capture extends Model
{
    //
    protected $fillable = [
        'image_path',
        'density',
        'category',
        'method'
    ];
}
