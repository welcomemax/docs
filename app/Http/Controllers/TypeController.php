<?php

namespace App\Http\Controllers;

use App\Type;

// @TODO TypeController extends ApiController extends Controller
class TypeController extends Controller
{
    public function index($id = null)
    {
        $typesQuery = $id ? Type::where('id', $id) : Type::orderBy('id', 'asc');
        $types = $typesQuery->get();

        return [
            'status' => 1,
            'data' => $types
        ];
    }
}
