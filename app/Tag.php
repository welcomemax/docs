<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Tag extends Model
{
    protected $table = 'tags';

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
