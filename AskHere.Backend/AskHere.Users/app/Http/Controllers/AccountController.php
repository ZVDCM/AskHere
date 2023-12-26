<?php

namespace App\Http\Controllers;

use App\Contracts\Answers\AnswerQuestionContract;
use App\Contracts\Questions\CreateQuestionContract;
use App\Contracts\Questions\DeleteQuestionContract;
use App\Contracts\Questions\UpdateQuestionContract;
use App\Http\Requests\AnswerQuestionRequest;
use App\Http\Requests\CreateQuestionRequest;
use App\Http\Requests\UpdateQuestionRequest;
use App\Jobs\AnswerQuestionJob;
use App\Jobs\CreateQuestionJob;
use App\Jobs\DeleteQuestionJob;
use App\Jobs\UpdateQuestionJob;
use App\Traits\HttpResponse;
use Illuminate\Support\Facades\Auth;
use Ramsey\Uuid\Uuid;

class AccountController extends Controller
{
    use HttpResponse;

    /**
     * Store a newly created resource in storage.
     */
    public function createQuestion(CreateQuestionRequest $request)
    {
        $data = $request->safe()->only(['value']);
        $user = Auth::user();

        $question = $user
            ->questions()
            ->create([
                'id' => (string) Uuid::uuid4(),
                'user_username' => $user->username,
                'value' => $data['value'],
            ]);

        CreateQuestionJob::dispatch(
            new CreateQuestionContract(
                $question->id,
                $question->user_id,
                $question->user_username,
                $question->value
            )
        );

        return $this->success([
            'question' => $question
        ], code: 201);
    }

    public function answerQuestion(AnswerQuestionRequest $request, string $question_id)
    {
        $data = $request->safe()->only(['value']);
        $user = Auth::user();

        $question = $user
            ->questions()
            ->find($question_id);
        if (!$question) {
            return $this->error(
                message: 'Question not found',
                code: 404
            );
        }

        $answer = $question
            ->answers()
            ->create([
                'id' => (string) Uuid::uuid4(),
                'user_id' => $user->id,
                'user_username' => $user->username,
                'value' => $data['value'],
            ]);

        AnswerQuestionJob::dispatch(
            new AnswerQuestionContract(
                $answer->id,
                $answer->user_id,
                $answer->user_username,
                $question->id,
                $answer->value
            )
        );

        return $this->success([
            'answer' => $answer
        ], code: 201);
    }

    /**
     * Update the specified resource in storage.
     */
    public function updateQuestion(UpdateQuestionRequest $request, string $question_id)
    {
        $data = $request->safe()->only(['value']);

        $question = Auth::user()
            ->questions()
            ->find($question_id);
        if (!$question) {
            return $this->error(
                message: 'Question not found',
                code: 404
            );
        }

        $question->update([
            'value' => $data['value'],
        ]);

        UpdateQuestionJob::dispatch(
            new UpdateQuestionContract(
                $question->user_id,
                $question->id,
                $question->value
            )
        );

        return $this->success([
            'question' => $question
        ], code: 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function deleteQuestion(string $question_id)
    {
        $question = Auth::user()
            ->questions()
            ->find($question_id);
        if (!$question) {
            return $this->error(
                message: 'Question not found',
                code: 404
            );
        }

        $question->delete();

        DeleteQuestionJob::dispatch(
            new DeleteQuestionContract(
                $question->user_id,
                $question->id
            )
        );

        return $this->success([
            'question' => $question
        ], code: 200);
    }
}
