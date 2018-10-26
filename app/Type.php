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

    protected $dates = [
        'created_at',
        'updated_at'
    ];

    protected $hidden = [
        'id',
        'created_at',
        'updated_at',
        'pivot'
    ];

    public function items() {
        return $this->belongsToMany('App\Item');
    }
}
