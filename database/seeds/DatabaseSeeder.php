<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
         $this->call(TypesTableSeeder::class);
         $this->call(TagsTableSeeder::class);
         $this->call(ProductsTableSeeder::class);
         $this->call(ParamsTableSeeder::class);
         $this->call(ItemsTableSeeder::class);
    }
}
