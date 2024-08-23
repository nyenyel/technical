<?php

namespace Database\Seeders;

use App\Models\LibGenre;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        LibGenre::upsert([
            ['desc' => 'Horror'],
            ['desc' => 'Action'],
            ['desc' => 'Comedy'],
            ['desc' => 'Romance'],
            ['desc' => 'Drama'],
            ['desc' => 'Thriller'],
            ['desc' => 'School'],
            ['desc' => 'Fantasy'],
        ], ['desc']);
        // User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        // ]);
    }
}
