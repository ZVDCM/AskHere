<?php

use App\Http\Controllers\AuthController;
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

// public routes
Route::post('login', [AuthController::class, 'login']);
Route::post('register', [AuthController::class, 'register']);

// private routes
Route::group(['middleware' => 'auth:sanctum'], function () {

    Route::post('questions', [QuestionsController::class, 'store']);
    Route::patch('questions/{question_id}', [QuestionsController::class, 'update']);
    Route::delete('questions/{question_id}', [QuestionsController::class, 'destroy']);

    Route::post('questions/{question_id}/answer', [QuestionsController::class, 'answer']);

    Route::post('logout', [AuthController::class, 'logout']);
});
