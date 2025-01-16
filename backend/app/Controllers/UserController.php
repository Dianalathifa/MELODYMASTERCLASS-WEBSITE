<?php

namespace App\Controllers;

use App\Models\UserModel;
use CodeIgniter\RESTful\ResourceController;

class UserController extends ResourceController
{
    protected $format = 'json';

    public function index()
    {
        $model = new \App\Models\UserModel();
        $data = $model->findAll();

        if (!empty($data)) {
            $response = [
                'status' => 'success',
                'message' => 'Data retrieved successfully',
                'data' => $data
            ];
        } else {
            $response = [
                'status' => 'error',
                'message' => 'No data found',
                'data' => []
            ];
        }

        return $this->respond($response);
    }
    public function create() {
        $data = [
            'nama' => $this->request->getVar('nama'),
            'email' => $this->request->getVar('email'),
            'password' => password_hash($this->request->getVar('password'), PASSWORD_DEFAULT),
        ];
        $userModel = new UserModel();
        $userModel->save($data);
        $response = [
            'status' => 'success',
            'messages' => 'Data berhasil ditambahkan',
            'data' => $data,
        ];
    return $this->respond($response);
    }
    // function untuk mengedit data
    public function update($id = null)
    {
            $userModel = new UserModel();
            $user = $userModel->find($id);
            
            if ($user) {
                $data = [
                    'id' => $id,
                    'nama' => $this->request->getVar('nama'),
                    'email' => $this->request->getVar('email'),
                    'password' => password_hash($this->request->getVar('password'), PASSWORD_DEFAULT),
                ];
            $proses = $userModel->save($data);
            
            if ($proses) {
            $response = [
                'status' => 200,
                'messages' => 'Data berhasil diubah',
                'data' => $data
            ];
            }else {
            $response = [
                'status' => 402,
                'messages' => 'Gagal diubah',
        ];
    }
        return $this->respond($response);
    }
        return $this->failNotFound('Data tidak ditemukan');
    }

    // function untuk menghapus data
    public function delete($id = null){
            $userModel = new UserModel();
            $user = $userModel->find($id);
        if($user){
            $proses = $userModel->delete($id);
        if ($proses) {
            $response = [
            'status' => 200,
            'messages' => 'Data berhasil dihapus',
        ];
        }else {
            $response = [
            'status' => 402,
            'messages' => 'Gagal menghapus data',
        ];
        }
            return $this->respond($response);
        }else{
            return $this->failNotFound('Data tidak ditemukan');
        }
    }
    


public function login($id = null)
    {
        $email = $this->request->getVar('email');
        $password = $this->request->getVar('password');

            $userModel = new UserModel();
            $existingUser = $userModel->where('email', $email)->first();

            if ($existingUser) {
                if ( $password != $existingUser->password) {
            // return $this->failUnauthorized('Login Failed, Invalid email or password');
            $response = [
                'code' => 402,
                'status'=> 'failed',
                'messages' => 'Login Failed, password wrong',
            ];
                }else{
                    $response = [
                'code' => 200,
                'status'=> 'success',
                'messages' => 'Login successfully',
                'data' => $existingUser
            ];

                }
            } else {
                $response = [
                    'status' => 401,
                    'message' => 'Akun belum didaftarkan',
                ];
            }
        

        return $this->respond($response);
    }
    

}
