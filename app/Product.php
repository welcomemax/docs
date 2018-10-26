<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $table = 'products';

    protected $fillable = [
        'alias',
        'name',
        'public_id'
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
