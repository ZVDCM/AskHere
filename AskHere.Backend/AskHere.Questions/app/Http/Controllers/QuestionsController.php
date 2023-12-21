<?php

namespace App\Http\Controllers;

use App\Http\Resources\AnswerResource;
use App\Http\Resources\QuestionResource;
use App\Models\Question;

class QuestionsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $questions = Question::all();
        return QuestionResource::collection($questions);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $question = Question::findOrFail($id);
        return new QuestionResource($question);
    }

    public function answers(string $id)
    {
        $answers = Question::findOrFail($id)->answers;
        return AnswerResource::collection($answers);
    }
}
