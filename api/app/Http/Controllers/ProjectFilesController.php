<?php

namespace App\Http\Controllers;

use App\Models\ProjectFiles;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class ProjectFilesController extends BaseController
{

    public function index()
    {
        $projectFiles = ProjectFiles::all();
        return $this->success('Project files retrieved successfully', $projectFiles);
    }

    public function show($id)
    {
        $projectFile = ProjectFiles::find($id);
        if (!$projectFile) {
            return $this->error('Project file not found',[], 404);
        }
        return $this->success('Project file retrieved successfully', $projectFile);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'project_id' => 'required|numeric',
            'project_file' => 'required|file',
            'description' => 'required'
        ]);

        if ($validator->fails()) {
            return $this->error('Validation Error', $validator->errors());
        }

        $file = $request->file('project_file');

        $file_name = time() . '.' . $file->getClientOriginalExtension();

        $file->move(public_path('uploads'), $file_name);

        $project_file = ProjectFiles::create([
            'project_id' => $request->project_id,
            'file_name' => $file_name,
            'url' => url('uploads/' . $file_name),
            'description' => $request->description
        ]);

        return $this->success('Project file uploaded successfully', $project_file);
    }

    public function destroy($id)
    {
        $projectFile = ProjectFiles::find($id);
        if (!$projectFile) {
            return $this->error('Project file not found',[], 404);
        }

        $projectFile->delete();
        return $this->success('Project file deleted successfully');
    }

    public function findByProject($projectId)
    {
        $projectFiles = ProjectFiles::where('project_id', $projectId)->get();
        return $this->success('Project files retrieved successfully', $projectFiles);
    }

    public function paginateFiles(Request $request)
    {
        $files = DB::table('projects_files')
            ->join('projects', 'projects.id', '=', 'projects_files.project_id')
            ->select('projects_files.*', 'projects.name as project_name')
            ->paginate($request->get('per_page', 5));

        return $this->success('Project files retrieved successfully', $files);
    }
}
