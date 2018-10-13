<?php

namespace App\Http\Controllers;

use App\Product;

// @TODO ProductController extends ApiController extends Controller
class ProductController extends Controller
{
    public function index($id = null)
    {
        $productsQuery = $id ? Product::where('id', $id) : Product::orderBy('id', 'asc');
        $products = $productsQuery->get();

        return [
            'status' => 1,
            'data' => $products
        ];
    }
}
