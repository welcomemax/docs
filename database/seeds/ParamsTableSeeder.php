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
                'values' => []
            ],
            [
                'alias' => 'color',
                'name' => 'Font Color',
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
                'values' => [
                    [
                        'name' => 'Helvetica',
                        'value' => 'Helvetica'
                    ],
                    [
                        'name' => 'Arial',
                        'value' => 'Arial'
                    ]
                ]
            ]
        ];

        foreach ($params_data as $data) {
            $param_data = [
                'alias' => $data['alias'],
                'name' => $data['name']
            ];

            isset($data['default']) && $param_data['default'] = $data['default'];
            isset($data['control']) && $param_data['control'] = $data['control'];

            $param = Param::updateOrCreate($param_data);

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
