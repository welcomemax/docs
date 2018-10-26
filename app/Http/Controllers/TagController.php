<?php

namespace App\Http\Controllers;

use App\Tag;
use Illuminate\Http\Request;

// @TODO TagController extends ApiController extends Controller
class TagController extends Controller
{
    public function index($id = null)
    {
        $tagsQuery = Tag::withCount('items')->orderBy('items_count');
        $id && $tagsQuery = $tagsQuery->where('id', $id);

        return [
            'status' => 1,
            'data' => $tagsQuery->get()
        ];
    }

    public function used()
    {
        $tagsQuery = Tag::withCount('items')->havingRaw('items_count')->orderBy('items_count');

        return [
            'status' => 1,
            'data' => $tagsQuery->get()
        ];
    }
}
