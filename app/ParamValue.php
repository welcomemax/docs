<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ParamValue extends Model
{
    protected $table = 'params_values';

    protected $fillable = [
        'param_id',
        'name',
        'value'
    ];

    protected $hidden = [
        'id'
    ];

    public $timestamps = false;
}
