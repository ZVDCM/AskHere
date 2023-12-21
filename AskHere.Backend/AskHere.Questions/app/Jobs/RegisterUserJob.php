<?php

namespace App\Jobs;

use App\Contracts\Users\RegisterUserContract;
use App\Models\User;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldBeUnique;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

class RegisterUserJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    private RegisterUserContract $data;

    /**
     * Create a new job instance.
     */
    public function __construct(RegisterUserContract $data)
    {
        $this->onQueue('users');
        $this->data = $data;
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        User::create([
            'id' => $this->data->id,
            'username' => $this->data->username,
            'email' => $this->data->email,
            'password' => $this->data->password,
        ]);
    }
}
