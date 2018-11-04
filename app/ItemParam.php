<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ItemParam extends Model
{
    protected $table = 'item_param';

    protected $fillable = [
        'item_id',
        'param_id'
    ];

    public $timestamps = false;
}
