<?php

namespace App\Controllers;

use App\Models\AdminModel;
use CodeIgniter\RESTful\ResourceController;

class AdminController extends ResourceController
{
    protected $format = 'json';

    public function index()
    {
        $model = new \App\Models\AdminModel();
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

    public function show($id = null)
    {
        $adminModel = new AdminModel();
        $data = $adminModel->find($id);

        if ($data) {
            $response = [
                'status' => 200,
                'messages' => 'Data retrieved successfully',
                'data' => $data
            ];
        } else {
            $response = [
                'status' => 404,
                'messages' => 'Data not found',
                'data' => []
            ];
        }

        return $this->respond($response);
    }

    public function create() {
        $data = [
            'username' => $this->request->getVar('username'),
            'email' => $this->request->getVar('email'),
            'password' => password_hash($this->request->getVar('password'), PASSWORD_DEFAULT),
        ];
        $adminModel = new AdminModel();
        $adminModel->save($data);
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
            $adminModel = new AdminModel();
            $admin = $adminModel->find($id);
            
            if ($admin) {
                $data = [
                    'id' => $id,
                    'username' => $this->request->getVar('username'),
                    'email' => $this->request->getVar('email'),
                    'password' => password_hash($this->request->getVar('password'), PASSWORD_DEFAULT),
            ];
            $proses = $adminModel->save($data);
            
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
            $adminModel = new AdminModel();
            $admin = $adminModel->find($id);
        if($admin){
            $proses = $adminModel->delete($id);
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

            $adminModel = new AdminModel();
            $existingAdmin = $adminModel->where('email', $email)->first();

            if ($existingAdmin) {
                if ( $password != $existingAdmin->password) {
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
                'data' => $existingAdmin
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
