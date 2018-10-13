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
        $types_data = [[
            'name' => 'Instagram Feed'
        ], [
            'name' => 'YouTube Gallery'
        ]];

        foreach ($types_data as $index => $type) {
            Product::updateOrCreate(
                $type
            );
        }
    }
}
