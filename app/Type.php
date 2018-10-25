<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Type extends Model
{
    protected $table = 'types';

    protected $fillable = [
        'alias',
        'name',
        'color'
    ];

    protected $dates = [
        'created_at',
        'updated_at'
    ];

    protected $hidden = [
        'created_at',
        'updated_at'
    ];
}
