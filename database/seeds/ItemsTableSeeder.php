<?php

use App\Item;
use App\ItemTag;
use App\ItemProduct;
use App\ItemType;
use App\Tag;
use App\Product;
use App\Type;
use Illuminate\Database\Seeder;

class ItemsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $items_data = [
            [
                'title' => 'Widget Title',
                'caption' => 'Customize widget title',
                'data' => '.[[app]]-widget-title{\\r\\n color: [[color]];\\r\\n}',
                'type' => 'css',
                'tags' => ['custom', 'hot'],
                'products' => ['instagram-feed', 'testimonials-slider', 'faq']
            ]
        ];

        foreach ($items_data as $data) {
            $item = Item::updateOrCreate([
                'title' => $data['title'],
                'caption' => $data['caption'],
                'data' => $data['data']
            ]);

            $type = Type::where('alias', $data['type'])->first();

            if (!empty($type)) {
                ItemType::updateOrCreate([
                    'item_id' => $item->id,
                    'type_id' => $type->id
                ]);
            }

            foreach ($data['tags'] as $tag_alias) {
                $tag = Tag::where('alias', $tag_alias)->first();

                if (!empty($tag)) {
                    ItemTag::updateOrCreate([
                        'item_id' => $item->id,
                        'tag_id' => $tag->id
                    ]);
                }
            }

            foreach ($data['products'] as $product_alias) {
                $product = Product::where('alias', $product_alias)->first();

                if (!empty($product)) {
                    ItemProduct::updateOrCreate([
                        'item_id' => $item->id,
                        'product_id' => $product->id
                    ]);
                }
            }
        }
    }
}
