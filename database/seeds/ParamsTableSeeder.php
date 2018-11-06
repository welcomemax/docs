<?php

use App\Param;
use App\ParamValue;
use App\Product;
use Illuminate\Database\Seeder;

class ParamsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $params_data = [
            [
                'alias' => 'app',
                'name' => 'App',
                'default_value' => '',
                'values' => []
            ],
            [
                'alias' => 'color',
                'name' => 'Font Color',
                'default_value' => 'red',
                'values' => [
                    [
                        'name' => 'Red',
                        'value' => 'red'
                    ],
                    [
                        'name' => 'Green',
                        'value' => 'green'
                    ]
                ]
            ],
            [
                'alias' => 'font-family',
                'name' => 'Font Family',
                'default_value' => 'apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";',
                'values' => [
                    [
                        'name' => 'System',
                        'value' => 'apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";'
                    ]
                ]
            ]
        ];

        foreach ($params_data as $data) {
            $param = Param::updateOrCreate([
                'alias' => $data['alias'],
                'name' => $data['name'],
                'default_value' => $data['default_value']
            ]);

            if ($data['alias'] === 'app') {
                $products = Product::get();

                foreach ($products as $product) {
                    if ($product['alias'] === 'any' || $product['alias'] === 'many') {
                        continue;
                    }

                    $data['values'][] = [
                        'name' => $product['name'],
                        'value' => $product['alias']
                    ];
                }
            }

            if (!empty($data['values'])) {
                foreach ($data['values'] as $param_value) {
                    ParamValue::updateOrCreate([
                        'param_id' => $param->id,
                        'name' => $param_value['name'],
                        'value' => $param_value['value']
                    ]);
                }
            }
        }
    }
}
