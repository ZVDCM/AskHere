<?php

namespace App\Jobs;

use App\Contracts\Questions\UpdateQuestionContract;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldBeUnique;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

class UpdateQuestionJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    private UpdateQuestionContract $data;

    /**
     * Create a new job instance.
     */
    public function __construct(UpdateQuestionContract $data)
    {
        $this->onQueue('questions');
        $this->data = $data;
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        //
    }
}
