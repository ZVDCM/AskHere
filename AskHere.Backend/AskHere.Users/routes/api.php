<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\AccountController;
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
Route::post('auth/login', [AuthController::class, 'login']);
Route::post('auth/register', [AuthController::class, 'register']);

// private routes
Route::group(['middleware' => 'auth:sanctum'], function () {

    Route::post('account/questions', [AccountController::class, 'createQuestion']);
    Route::patch('account/questions/{question_id}', [AccountController::class, 'updateQuestion']);
    Route::delete('account/questions/{question_id}', [AccountController::class, 'deleteQuestion']);

    Route::post('account/answer/questions/{question_id}', [AccountController::class, 'answerQuestion']);

    Route::post('auth/logout', [AuthController::class, 'logout']);
});
