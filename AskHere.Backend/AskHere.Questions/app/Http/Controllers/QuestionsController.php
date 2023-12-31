<?php

namespace App\Http\Controllers;

use App\Http\Resources\AnswerResource;
use App\Http\Resources\QuestionResource;
use App\Models\Question;
use App\Traits\HttpResponse;

class QuestionsController extends Controller
{
    use HttpResponse;

    public function index()
    {
        $questions = Question::all();
        return  $this->success(['questions' => QuestionResource::collection($questions)]);
    }

    public function show(string $id)
    {
        $question = Question::findOrFail($id);
        return $this->success(['question' => new QuestionResource($question)]);
    }

    public function answers(string $id)
    {
        $answers = Question::findOrFail($id)->answers;
        return  $this->success(['questions' => AnswerResource::collection($answers)]);
    }
}
