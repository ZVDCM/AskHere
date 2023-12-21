<?php

namespace App\Jobs;

use App\Contracts\Answers\AnswerQuestionContract;
use App\Models\User;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldBeUnique;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

class AnswerQuestionJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    private AnswerQuestionContract $data;

    /**
     * Create a new job instance.
     */
    public function __construct(AnswerQuestionContract $data)
    {
        $this->onQueue('questions');
        $this->data = $data;
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        $user = User::find($this->data->user_id);
        $question = $user->question()->find(
            $this->data->question_id
        );
        $question->answers()->create([
            'id' => $this->data->answer_id,
            'user_id' => $this->data->user_id,
            'user_username' => $user->username,
            'value' => $this->data->value,
        ]);
    }
}
