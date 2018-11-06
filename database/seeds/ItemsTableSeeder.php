<?php

use App\Item;
use App\ItemTag;
use App\ItemProduct;
use App\ItemType;
use App\ItemParam;
use App\Tag;
use App\Product;
use App\Type;
use App\Param;
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
                'title' => 'Widget Font',
                'caption' => 'Customize widget font family',
                'data' => '.eapps-[[app]]{'.PHP_EOL.'    font-family: [[font-family]];'.PHP_EOL.'}',
                'type' => 'css',
                'tags' => ['custom', 'hot'],
                'products' => ['any']
            ],
            [
                'title' => 'Widget Title color',
                'caption' => 'Customize widget title color',
                'data' => '.eapps-[[app]] .eui-widget-title{'.PHP_EOL.'    color: [[color]];'.PHP_EOL.'}',
                'type' => 'css',
                'tags' => ['custom', 'hot'],
                'products' => ['testimonials-slider', 'faq', 'twitter-feed']
            ],
            [
                'title' => 'Widget Title font family',
                'caption' => 'Customize widget title font family',
                'data' => '.eapps-[[app]] .eui-widget-title{'.PHP_EOL.'    font-family: [[font-family]];'.PHP_EOL.'}',
                'type' => 'css',
                'tags' => ['custom', 'hot'],
                'products' => ['testimonials-slider', 'faq', 'twitter-feed']
            ],
            [
                'title' => 'Widget edges',
                'caption' => 'Make the edges of your widget sharp',
                'data' => '.eapps-[[app]]-inner{'.PHP_EOL.'    border-radius: 0px !important;'.PHP_EOL.'}',
                'type' => 'css',
                'tags' => ['custom'],
                'products' => ['facebook-feed', 'twitter-feed']
            ],
            [
                'title' => 'Instagram Feed Widget Title',
                'caption' => 'Customize Instagram Feed widget title color (temporary, widget title class will be changed to common)',
                'data' => '.eapps-[[app]] .eapps-[[app]]-title{'.PHP_EOL.'    color: [[color]];'.PHP_EOL.'}',
                'type' => 'css',
                'tags' => ['custom', 'hot'],
                'products' => ['instagram-feed']
            ],
            [
                'title' => 'Instagram Feed Widget Title',
                'caption' => 'Customize Instagram Feed widget title font family (temporary, widget title class will be changed to common)',
                'data' => '.eapps-[[app]] .eapps-[[app]]-title{'.PHP_EOL.'    font-family: [[font-family]];'.PHP_EOL.'}',
                'type' => 'css',
                'tags' => ['custom', 'hot'],
                'products' => ['instagram-feed']
            ],
            [
                'title' => 'Youtube Gallery menu navigation padding fix',
                'caption' => '',
                'data' => 'li.yottie-widget-nav-list-item a{'.PHP_EOL.'    padding: 18px 16px 26px !important;'.PHP_EOL.'}',
                'type' => 'css',
                'tags' => ['fix'],
                'products' => ['youtube-gallery']
            ],
            [
                'title' => 'Instagram Widget profile picture fix',
                'caption' => '',
                'data' => '.instalink-header-pic{'.PHP_EOL.'    width: 34px !important;'.PHP_EOL.'}',
                'type' => 'css',
                'tags' => ['fix'],
                'products' => ['instagram-widget']
            ],
            [
                'title' => 'Instagram Feed disable hover effects',
                'caption' => '',
                'data' => '.eapps-instagram-feed-posts-item:hover.eapps-instagram-feed-posts-item-template-tile .eapps-instagram-feed-posts-item-overlay{'.PHP_EOL.'    visibility: hidden !important;'.PHP_EOL.'}'.PHP_EOL.'.eapps-instagram-feed-posts-item:hover.eapps-instagram-feed-posts-item-template-tile .eapps-instagram-feed-posts-item-image {'.PHP_EOL.'    transform: scale(1) translate(-50%, -50%) !important;'.PHP_EOL.'    transform-origin: 0 0 !important;'.PHP_EOL.'    filter: grayscale(0) !important;'.PHP_EOL.'}',
                'type' => 'css',
                'tags' => ['custom'],
                'products' => ['instagram-feed']
            ]
        ];

        foreach ($items_data as $data) {
            $item_data = [
                'title' => $data['title'],
                'caption' => $data['caption'],
                'data' => $data['data']
            ];

            $type = Type::where('alias', $data['type'])->first();
            !empty($type) && $item_data['type_id'] = $type->id;

            $item = Item::updateOrCreate($item_data);

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

            preg_match_all('#\[\[(.*?)\]\]#m', $data['data'], $matches);

            if (!empty($matches) && $matches[1]) {
                foreach ($matches[1] as $match) {
                    $param = Param::where('alias', $match)->first();

                    if (!empty($param)) {
                        ItemParam::updateOrCreate([
                            'item_id' => $item->id,
                            'param_id' => $param->id
                        ]);
                    }
                }
            }
        }
    }
}
