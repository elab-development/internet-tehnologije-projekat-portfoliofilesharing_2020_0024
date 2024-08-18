<?php

namespace App\Http\Controllers;

use App\Http\Resources\ProjectSharedResource;
use App\Models\ProjectShared;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ProjectSharedController extends BaseController
{
    public function sharedWithMe($userId)
    {
        $projects = ProjectShared::where('user_id', $userId)->get();

        return $this->success('Projects shared with user retrieved successfully', ProjectSharedResource::collection($projects));
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'project_id' => 'required|numeric',
            'user_id' => 'required|numeric'
        ]);

        if ($validator->fails()) {
            return $this->error('Validation Error', $validator->errors());
        }

        $projectShared = ProjectShared::create($request->all());
        return $this->success('Project shared successfully', new ProjectSharedResource($projectShared));
    }
}
