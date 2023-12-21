<?php

namespace App\Jobs;

use App\Contracts\Questions\CreateQuestionContract;
use App\Models\Question;
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
        $this->onQueue('users');
        $this->data = $data;
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        Question::create([
            'user_id' => $this->data->user_id,
            'username' => $this->data->username,
            'value' => $this->data->value,
        ]);
    }
}
