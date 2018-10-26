<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Type extends Model
{
    protected $table = 'types';

    protected $fillable = [
        'alias',
        'name'
    ];

    protected $hidden = [
        'id',
        'pivot'
    ];

    public $timestamps = false;

    public function items() {
        return $this->belongsToMany('App\Item');
    }
}
