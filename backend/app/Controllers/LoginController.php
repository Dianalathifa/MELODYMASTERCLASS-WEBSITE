<?php

namespace App\Controllers;

use CodeIgniter\API\ResponseTrait;
use App\Models\UserModel;

class LoginController extends BaseController
{
    use ResponseTrait;

    protected $format = 'json';

    public function login()
    {
        $jsonData = $this->request->getJSON();
        
        $email = $jsonData->email;
        $password = $jsonData->password;

        $userModel = new UserModel();
        $user = $userModel->where('email', $email)->first();

        if ($user) {
            // Memeriksa kecocokan password dengan password yang di-hash
            if (password_verify($password, $user['password'])) {
                $response = [
                    'code' => 200,
                    'status' => 'success',
                    'messages' => 'Login successfully',
                    'data' => $user
                ];
            } else {
                $response = [
                    'code' => 402,
                    'status' => 'failed',
                    'messages' => 'Login Failed, password wrong',
                ];
            }
        } else {
            $response = [
                'code' => 401,
                'status' => 'failed',
                'message' => 'Akun belum didaftarkan',
            ];
        }

        return $this->respond($response);
    }
}