<?php

use App\Product;
use Illuminate\Database\Seeder;

class ProductsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $products_data = [
            [
                'alias' => 'any',
                'name' => 'Any'
            ],
            [
                'alias' => 'instagram-feed',
                'name' => 'Instagram Feed',
                'public_id' => 'a8d5792d-915e-4549-9b08-8ffcbc590b0c'
            ],
            [
                'alias' => 'instagram-widget',
                'name' => 'Instagram Widget',
                'public_id' => '95358386-3e5d-4376-adb6-4956194a82c3'
            ],
            [
                'alias' => 'instagram-testimonials',
                'name' => 'Instagram Testimonials',
                'public_id' => '9499c4dd-b050-4078-8163-8d92275bda7b'
            ],
            [
                'alias' => 'youtube-gallery',
                'name' => 'YouTube Gallery',
                'public_id' => '3cd3f119-4d97-41d0-ba10-59d5f4e8a7d3'
            ],
            [
                'alias' => 'form-builder',
                'name' => 'Form Builder',
                'public_id' => 'fdebbd9c-9771-4dfc-a2ce-f0e78cdcf8ae'
            ],
            [
                'alias' => 'contact-form',
                'name' => 'Contact Form',
                'public_id' => '93108abb-a44c-45a6-9f1d-f6f627478112'
            ],
            [
                'alias' => 'pricing-table',
                'name' => 'Pricing Table',
                'public_id' => '1f971228-aa13-4dee-9018-08d7a8d75f6c'
            ],
            [
                'alias' => 'social-share-buttons',
                'name' => 'Social Share Buttons',
                'public_id' => '516db1ef-369a-4073-bf3f-2aa58d93e775'
            ],
            [
                'alias' => 'social-icons',
                'name' => 'Social Media Icons',
                'public_id' => '842986db-2adb-4c93-a453-8f6436f6ab8d'
            ],
            [
                'alias' => 'google-maps',
                'name' => 'Google Maps',
                'public_id' => '19454de8-614e-11e7-907b-a6006ad3dba0'
            ],
            [
                'alias' => 'facebook-feed',
                'name' => 'Facebook Feed',
                'public_id' => '57f695e3-6132-4fa7-b876-70fa1ac8b1a2'
            ],
            [
                'alias' => 'faq',
                'name' => 'FAQ',
                'public_id' => '0e12a13e-5195-4cd3-8743-8483d58b5bd4'
            ],
            [
                'alias' => 'testimonials-slider',
                'name' => 'Testimonials Slider',
                'public_id' => '9bb8a85e-7339-490c-8781-2f5e560b1de1'
            ],
            [
                'alias' => 'twitter-feed',
                'name' => 'Twitter Feed',
                'public_id' => ''
            ]
        ];

        foreach ($products_data as $product) {
            Product::updateOrCreate(
                $product
            );
        }
    }
}
