<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class View extends Model
{
    protected $table = 'views';

    protected $fillable = [
        'item_id'
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
