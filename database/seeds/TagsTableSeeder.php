<?php

use App\Tag;
use Illuminate\Database\Seeder;

class TagsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $tags_data = [
            [
                'alias' => 'fix',
                'name' => 'Fix'
            ],
            [
                'alias' => 'custom',
                'name' => 'Custom'
            ],
            [
                'alias' => 'conflict',
                'name' => 'Conflict'
            ],
            [
                'alias' => 'rtl',
                'name' => 'RTL'
            ],
            [
                'alias' => 'hot',
                'name' => 'Hot'
            ]
        ];

        foreach ($tags_data as $index => $tag) {
            Tag::updateOrCreate(
                $tag
            );
        }
    }
}
