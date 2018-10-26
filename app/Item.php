<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Item extends Model
{
    protected $table = 'items';

    protected $fillable = [
        'title',
        'caption',
        'data'
    ];

    protected $dates = [
        'created_at',
        'updated_at'
    ];

    protected $hidden = [
        'id',
        'created_at',
        'pivot'
    ];

    protected $casts = [
        'updated_at' => 'datetime:d.m.y H:00',
    ];

    public function type() {
        return $this->belongsTo('App\Type');
    }

    public function products() {
        return $this->belongsToMany('App\Product');
    }

    public function tags() {
        return $this->belongsToMany('App\Tag');
    }

    public function views() {
        return $this->hasMany('App\View');
    }
}
