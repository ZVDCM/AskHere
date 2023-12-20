<?php

namespace App\Contracts;

class CreateQuestionContract
{

    public int $user_id;
    public string $username;
    public string $value;

    public function __construct(int $user_id, string $username, string $value)
    {
        $this->user_id = $user_id;
        $this->username = $username;
        $this->value = $value;
    }
}
