<?php

namespace App\Jobs;

use App\Contracts\Questions\CreateQuestionContract;
use App\Models\Question;
use App\Models\User;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldBeUnique;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

class CreateQuestionJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    private CreateQuestionContract $data;

    /**
     * Create a new job instance.
     */
    public function __construct(CreateQuestionContract $data)
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
        $user->questions()->create([
            'id' => $this->data->question_id,
            'user_username' => $user->username,
            'value' => $this->data->value,
        ]);
    }
}
