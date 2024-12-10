<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ProjectSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faker = \Faker\Factory::create();

        $projectNames = [
            'Raketa logo design',
            'Raketa website design',
            'Raketa mobile app design',
            'Raketa branding',
            'Raketa marketing',
            'Raketa SEO',
            'Savez logo design',
            'Savez website design',
            'Savez mobile app design',
            'Savez branding',
            'Savez marketing',
            'Savez SEO',
            'Klub logo design',
            'Klub website design',
            'Klub mobile app design',
            'Klub branding',
            'Klub marketing',
            'Klub SEO',
            'Klub logo design',
            'Klub website design',
            'Klub mobile app design',
            'Klub branding',
        ];
        //'name', 'deadline_date', 'status', 'user_id'
        foreach ($projectNames as $projectName) {
            \App\Models\Project::create([
                'name' => $projectName,
                'deadline_date' => $faker->dateTimeBetween('now', '+1 year')->format('Y-m-d'),
                'status' => \App\Models\Project::STATUS_PENDING,
                'user_id' => rand(1, 10),
            ]);
        }
    }
}
