<?php

namespace App\Http\Controllers;

use App\View;
use Illuminate\Http\Request;

// @TODO ItemController extends ApiController extends Controller
class ViewController extends Controller
{
    public function view($id)
    {
        $data = [
            'item_id' => $id
        ];

        View::create($data);

        return [
            'status' => 1,
            'data' => "Viewed item #" . $id
        ];
    }
}
