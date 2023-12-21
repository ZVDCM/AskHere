<?php

namespace App\Contracts\Answers;

class AnswerQuestionContract
{
    public string $answer_id;
    public string $user_id;
    public string $user_username;
    public string $question_id;
    public string $value;

    public function __construct(string $answer_id, string $user_id, string $user_username, string $question_id, string $value)
    {
        $this->answer_id = $answer_id;
        $this->user_id = $user_id;
        $this->user_username = $user_username;
        $this->question_id = $question_id;
        $this->value = $value;
    }
}
