<?php

namespace App\Contracts\Answers;

class AnswerQuestionContract
{
    public int $user_id;
    public string $username;
    public int $question_id;
    public string $value;

    public function __construct(int $user_id, string $username, int $question_id, string $value)
    {
        $this->user_id = $user_id;
        $this->username = $username;
        $this->question_id = $question_id;
        $this->value = $value;
    }
}
