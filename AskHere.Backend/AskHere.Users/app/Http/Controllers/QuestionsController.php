<?php

namespace App\Http\Controllers;

use App\Contracts\Questions\CreateQuestionContract;
use App\Contracts\Questions\DeleteQuestionContract;
use App\Contracts\Questions\UpdateQuestionContract;
use App\Http\Requests\CreateQuestionRequest;
use App\Http\Requests\UpdateQuestionRequest;
use App\Jobs\CreateQuestionJob;
use App\Jobs\DeleteQuestionJob;
use App\Jobs\UpdateQuestionJob;
use App\Traits\HttpResponse;
use Illuminate\Support\Facades\Auth;

class QuestionsController extends Controller
{
    use HttpResponse;

    /**
     * Store a newly created resource in storage.
     */
    public function store(CreateQuestionRequest $request)
    {
        $data = $request->safe()->only(['value']);
        $user = Auth::user();

        CreateQuestionJob::dispatch(
            new CreateQuestionContract(
                $user->id,
                $user->username,
                $data['value']
            )
        );

        return $this->success(code: 204);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateQuestionRequest $request, string $id)
    {
        $data = $request->safe()->only(['value']);
        $user = Auth::user();

        UpdateQuestionJob::dispatch(
            new UpdateQuestionContract(
                $id,
                $user->id,
                $data['value']
            )
        );

        return $this->success(code: 204);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $user = Auth::user();

        DeleteQuestionJob::dispatch(
            new DeleteQuestionContract(
                $id,
                $user->id
            )
        );

        return $this->success(code: 204);
    }
}
