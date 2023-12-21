<?php

namespace App\Contracts\Questions;

class UpdateQuestionContract
{
    public int $question_id;
    public int $user_id;
    public string $value;

    public function __construct(int $question_id, int $user_id, string $value)
    {
        $this->question_id = $question_id;
        $this->user_id = $user_id;
        $this->value = $value;
    }
}
