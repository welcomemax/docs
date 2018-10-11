<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Item extends Model
{
    protected $table = 'items';

    protected $fillable = [
        'title',
        'caption',
        'data',
        'type_id',
        'product_id',
    ];

    protected $dates = [
        'created_at',
        'updated_at'
    ];

    public function type() {
        return $this->belongsTo('App\Type');
    }

    public function product() {
        return $this->belongsTo('App\Product');
    }

    public function tags() {
        return $this->hasMany('App\Tag');
    }
}
