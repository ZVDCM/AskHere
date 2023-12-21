<?php

namespace App\Contracts\Questions;

class DeleteQuestionContract
{
    public int $question_id;
    public int $user_id;

    public function __construct(int $question_id, int $user_id)
    {
        $this->question_id = $question_id;
        $this->user_id = $user_id;
    }
}
