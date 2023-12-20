<?php

namespace App\Http\Controllers;

use App\Jobs\CreateQuestionJob;
use App\Traits\HttpResponse;
use Illuminate\Http\Request;

class QuestionsController extends Controller
{
    use HttpResponse;

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        CreateQuestionJob::dispatch('asd');

        return $this->success(code: 204);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
