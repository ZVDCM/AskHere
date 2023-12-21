<?php

namespace App\Contracts\Questions;

class UpdateQuestionContract
{
    public string $user_id;
    public string $question_id;
    public string $value;

    public function __construct(string $user_id, string $question_id, string $value)
    {
        $this->user_id = $user_id;
        $this->question_id = $question_id;
        $this->value = $value;
    }
}
