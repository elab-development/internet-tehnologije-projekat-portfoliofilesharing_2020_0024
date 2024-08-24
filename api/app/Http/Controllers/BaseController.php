<?php

namespace App\Http\Controllers;

class BaseController extends Controller
{
    public function success($message = '', $data = [])
    {
        return response()->json([
            'success' => true,
            'message' => $message,
            'data' => $data
        ]);
    }

    public function error($message = '', $errors = [], $code = 400)
    {
        return response()->json([
            'success' => false,
            'message' => $message,
            'errors' => $errors
        ], $code);
    }
}
