<?php

namespace App\Http\Controllers;

use App\Type;
use Illuminate\Http\Request;

// @TODO TypeController extends ApiController extends Controller
class TypeController extends Controller
{
    public function index($id = null)
    {
        $typesQuery = Type::withCount('items')->orderBy('items_count');
        $id && $typesQuery = $typesQuery->where('id', $id);

        return [
            'status' => 1,
            'data' => $typesQuery->get()
        ];
    }

    public function used()
    {
        $typesQuery = Type::withCount('items')->havingRaw('items_count')->orderBy('items_count');

        return [
            'status' => 1,
            'data' => $typesQuery->get()
        ];
    }
}
