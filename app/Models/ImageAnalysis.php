<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ImageAnalysis extends Model
{
    //
    protected $fillable = [
    'pond_id',
    'image_path',
    'prediction',
    'confidence',
    'analyzed_at',
];

}
