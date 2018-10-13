<?php

namespace App\Http\Controllers;

use App\Item;
use Illuminate\Http\Request;

// @TODO ItemController extends ApiController extends Controller
class ItemController extends Controller
{
    public function index($id = null)
    {
        $itemsQuery = $id ? Item::where('id', $id) : Item::orderBy('id', 'asc');
        $items = $itemsQuery->with(['product', 'type'])->get();

        foreach($items as $item) {

        }

        return [
            'status' => 1,
            'data' => $items
        ];
    }

    public function save(Request $request, $id = null)
    {
        $data = $request->input();
        $data->id = $id;

        Item::updateOrCreate($data);

        return [
            'status' => 1,
            'message' => "Success updating item #" . $id
        ];
    }

    public function destroy($id)
    {
        if ($id) {
            Item::find($id)->delete();

            return [
                'status' => 1,
                'message' => "Item record successfully deleted #" . $id
            ];
        }
    }
}
