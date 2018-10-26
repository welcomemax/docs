<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $table = 'products';

    protected $fillable = [
        'alias',
        'name',
        'icon',
        'public_id'
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
