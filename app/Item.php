<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Item extends Model
{
    protected $table = 'items';

    protected $fillable = [
        'title',
        'caption',
        'data'
    ];

    protected $dates = [
        'created_at',
        'updated_at'
    ];
}
