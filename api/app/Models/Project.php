<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    use HasFactory;

    const STATUS_PENDING = 'pending';
    const STATUS_ONGOING = 'ongoing';
    const STATUS_COMPLETED = 'completed';
    const STATUS_CANCELLED = 'cancelled';

    protected $table = 'projects';

    protected $fillable = ['name', 'deadline_date', 'status', 'user_id'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function projectFiles()
    {
        return $this->hasMany(ProjectFiles::class);
    }

    public function projectShares()
    {
        return $this->hasMany(ProjectShared::class);
    }
}
