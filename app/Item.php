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
        'type_id'
    ];

    protected $dates = [
        'created_at',
        'updated_at'
    ];

    protected $hidden = [
        'pivot'
    ];

    protected $casts = [
        'created_at' => 'datetime:d.m.y H:00',
        'updated_at' => 'datetime:d.m.y H:00'
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

    public function params() {
        return $this->belongsToMany('App\Param');
    }

    public function views() {
        return $this->hasMany('App\View');
    }
}
