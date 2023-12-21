<?php

namespace App\Jobs;

use App\Contracts\Answers\AnswerQuestionContract;
use App\Models\Answer;
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
        $this->onQueue('users');
        $this->data = $data;
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        Answer::create([
            'user_id' => $this->data->user_id,
            'username' => $this->data->username,
            'question_id' => $this->data->question_id,
            'value' => $this->data->value,
        ]);
    }
}
