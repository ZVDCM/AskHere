<?php

namespace App\Jobs;

use App\Contracts\Answers\AnswerQuestionContract;
use App\Models\Question;
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
        $question = Question::find(
            $this->data->question_id
        );
        $question->answers()->create([
            'id' => $this->data->answer_id,
            'user_id' => $this->data->user_id,
            'user_username' => $this->data->user_username,
            'value' => $this->data->value,
        ]);
    }
}
