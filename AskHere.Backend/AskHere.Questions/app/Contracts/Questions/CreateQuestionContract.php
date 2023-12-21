<?php

namespace App\Contracts\Questions;

class CreateQuestionContract
{
    public string $question_id;
    public string $user_id;
    public string $user_username;
    public string $value;

    public function __construct(string $question_id, string $user_id, string $user_username, string $value)
    {
        $this->question_id = $question_id;
        $this->user_id = $user_id;
        $this->user_username = $user_username;
        $this->value = $value;
    }
}
