<?php

use App\Http\Controllers\LoginController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\ProjectFilesController;
use App\Http\Controllers\ProjectSharedController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::post('login', [LoginController::class, 'login']);
Route::post('register', [LoginController::class, 'register']);

Route::middleware('auth:sanctum')->group(function(){
    Route::post('projects', [ProjectController::class, 'store']);
    Route::put('projects/{id}', [ProjectController::class, 'update']);
    Route::delete('projects/{id}', [ProjectController::class, 'destroy']);
    Route::get('projects/user/{userId}', [ProjectController::class, 'searchByUser']);
    Route::get('projects/search', [ProjectController::class, 'searchByName']);
    Route::post('logout', [LoginController::class, 'logout']);
    Route::apiResource('project-files', ProjectFilesController::class)->only(['index', 'show', 'store', 'destroy']);
    Route::get('project-files/project/{projectId}', [ProjectFilesController::class, 'findByProject']);
    Route::get('paginate-files', [ProjectFilesController::class, 'paginateFiles']);
    Route::get('shared-with-me/{userId}', [ProjectSharedController::class, 'sharedWithMe']);
    Route::post('project-shared', [ProjectSharedController::class, 'store']);
    Route::get('projects', [ProjectController::class, 'index']);
    Route::get('projects/{id}', [ProjectController::class, 'show']);
    Route::get('paginate-projects', [ProjectController::class, 'paginateProjects']);
    Route::get('chart', [ProjectController::class, 'chartData']);
});
