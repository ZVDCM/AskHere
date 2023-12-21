<?php

namespace App\Contracts\Questions;

class DeleteQuestionContract
{   
    public string $user_id;
    public string $question_id;

    public function __construct(string $user_id, string $question_id)
    {
        $this->user_id = $user_id;
        $this->question_id = $question_id;
    }
}
