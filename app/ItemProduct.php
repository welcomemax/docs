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

    public $timestamps = false;
}
