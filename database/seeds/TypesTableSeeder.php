<?php

use App\Type;
use Illuminate\Database\Seeder;

class TypesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $types_data = [
            [
                'alias' => 'css',
                'name' => 'CSS'
            ],
            [
                'alias' => 'js',
                'name' => 'JS'
            ],
            [
                'alias' => 'other',
                'name' => 'Other'
            ],
            [
                'alias' => 'doc',
                'name' => 'Docs'
            ],
            [
                'alias' => 'change',
                'name' => 'Change'
            ]
        ];

        foreach ($types_data as $index => $type) {
            Type::updateOrCreate(
                $type
            );
        }
    }
}
