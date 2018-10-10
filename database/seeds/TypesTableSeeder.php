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
        $types_data = [[
            'name' => 'css'
        ], [
            'name' => 'js'
        ]];

        $types = Type::all();

        foreach ($types_data as $index => $type) {
            Type::updateOrCreate(
                $type
            );
        }
    }
}
