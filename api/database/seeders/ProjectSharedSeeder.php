<?php

namespace Database\Seeders;

use App\Models\Project;
use App\Models\ProjectShared;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ProjectSharedSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $projects = Project::all();
        $users = User::all();

        foreach ($projects as $project) {
            ProjectShared::create([
                'project_id' => $project->id,
                'user_id' => $users->random()->id,
            ]);
        }
    }
}
