<?php

namespace App\Http\Controllers;

use App\Http\Resources\ProjectResource;
use App\Models\Project;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ProjectController extends BaseController
{
    public function index()
    {
        $projects = Project::all();
        return $this->success('Projects retrieved successfully', ProjectResource::collection($projects));
    }

    public function show($id)
    {
        $project = Project::find($id);
        if (!$project) {
            return $this->error('Project not found',[], 404);
        }
        return $this->success('Project retrieved successfully', new ProjectResource($project));
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'deadline_date' => 'required',
            'status' => 'required',
            'user_id' => 'required|numeric'
        ]);

        if ($validator->fails()) {
            return $this->error('Validation Error', $validator->errors());
        }

        $project = Project::create($request->all());
        return $this->success('Project created successfully', new ProjectResource($project));
    }

    public function update(Request $request, $id)
    {
        $project = Project::find($id);
        if (!$project) {
            return $this->error('Project not found',[], 404);
        }

        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'deadline_date' => 'required',
            'status' => 'required',
            'user_id' => 'required|numeric'
        ]);

        if ($validator->fails()) {
            return $this->error('Validation Error', $validator->errors());
        }

        $project->update($request->all());
        return $this->success('Project updated successfully', new ProjectResource($project));
    }

    public function destroy($id)
    {
        $project = Project::find($id);
        if (!$project) {
            return $this->error('Project not found',[], 404);
        }

        $project->delete();
        return $this->success('Project deleted successfully');
    }

    public function searchByName(Request $request)
    {
        $name = $request->name ?? '';

        $projects = Project::where('name', 'like', '%'.$name.'%')->get();

        return $this->success('Projects retrieved successfully', ProjectResource::collection($projects));
    }

    public function searchByUser(Request $request, $userId)
    {
        $projects = Project::where('user_id', $userId)->get();

        return $this->success('Projects retrieved successfully', ProjectResource::collection($projects));
    }
}
