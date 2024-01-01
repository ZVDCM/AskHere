<?php

namespace App\Traits;

trait HttpResponse
{
    protected function success(array | string $data = [], string $message = "", int $code = 200)
    {
        return response()->json([
            'status' => 'success',
            'message' => $message,
            'data' => $data
        ], $code);
    }

    protected function error(array | string $data = [], string $message = "", int $code)
    {
        return response()->json([
            'status' => 'error',
            'message' => $message,
            'data' => $data
        ], $code);
    }
}
