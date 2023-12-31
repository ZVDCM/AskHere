<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class AnswerResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'userId' => $this->user_id,
            'userUsername' => $this->user_username,
            'questionId' => $this->question_id,
            'value' => $this->value,
            'createdAt' => $this->created_at,
            'updatedAt' => $this->updated_at
        ];
    }
}
