<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ItemProduct extends Model
{
    protected $table = 'item_product';

    protected $fillable = [
        'item_id',
        'product_id'
    ];

    protected $dates = [
        'created_at',
        'updated_at',
    ];

    protected $hidden = [
        'created_at',
        'updated_at'
    ];
}
