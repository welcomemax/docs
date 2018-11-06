<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Param extends Model
{
    protected $table = 'params';

    protected $fillable = [
        'alias',
        'name',
        'default',
        'control'
    ];

    protected $hidden = [
        'id',
        'pivot'
    ];

    public $timestamps = false;

    public function values() {
        return $this->hasMany('App\ParamValue');
    }
}
