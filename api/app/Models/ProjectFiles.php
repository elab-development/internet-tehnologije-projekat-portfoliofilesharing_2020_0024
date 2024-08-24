<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProjectFiles extends Model
{
    use HasFactory;

    protected $table = 'projects_files';

    protected $fillable = ['project_id', 'file_name', 'url', 'description'];

    public function project()
    {
        return $this->belongsTo(Project::class);
    }

}
