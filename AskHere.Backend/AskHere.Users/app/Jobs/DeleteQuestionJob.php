<?php

namespace App\Jobs;

use App\Contracts\Questions\DeleteQuestionContract;
use App\Models\Question;
use App\Models\User;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldBeUnique;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

class DeleteQuestionJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    private DeleteQuestionContract $data;

    /**
     * Create a new job instance.
     */
    public function __construct(DeleteQuestionContract $data)
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
        $question = $user->questions()->find(
            $this->data->question_id
        );
        $question->delete();
    }
}
