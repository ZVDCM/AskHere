<?php

use App\Http\Controllers\QuestionsController;
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

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});


Route::get('questions', [QuestionsController::class, 'index']);
Route::get('questions/{id}', [QuestionsController::class, 'show']);
Route::get('questions/{id}/answers', [QuestionsController::class, 'answers']);
