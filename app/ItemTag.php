<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ItemTag extends Model
{
    protected $table = 'item_tag';

    protected $fillable = [
        'item_id',
        'tag_id'
    ];

    protected $dates = [
        'created_at',
        'updated_at',
    ];

    protected $hidden = [
        'created_at',
        'updated_at'
    ];

    public function products() {
        return $this->belongsToMany('App\Coupons', 'item_tag', 'item_id', 'tag_id');
    }
}
