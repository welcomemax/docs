<?php

namespace App\Http\Controllers;

use App\Tag;

// @TODO TagController extends ApiController extends Controller
class TagController extends Controller
{
    public function index($id = null)
    {
        $tagsQuery = $id ? Tag::where('id', $id) : Tag::orderBy('id', 'asc');
        $tags = $tagsQuery->get();

        return [
            'status' => 1,
            'data' => $tags
        ];
    }
}
