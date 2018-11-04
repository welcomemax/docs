<?php

use App\Param;
use App\ParamValue;
use Illuminate\Database\Seeder;

class ParamsSeeder extends Seeder
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
                'values' => [

                ]
            ],
            [
                'alias' => 'color',
                'name' => 'Color',
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
            ]
        ];

        foreach ($params_data as $data) {
            $item_param = Param::updateOrCreate([
                'alias' => $data['alias'],
                'name' => $data['name'],
                'default_value' => $data['default_value']
            ]);

            if (!empty($data['values'])) {
                foreach ($data['values'] as $param_value) {
                    ParamValue::updateOrCreate([
                        'param_id' => $item_param->id,
                        'name' => $param_value['name'],
                        'value' => $param_value['value']
                    ]);
                }
            }
        }
    }
}
