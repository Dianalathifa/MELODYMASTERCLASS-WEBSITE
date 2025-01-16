<?php

namespace App\Controllers;

use App\Models\CoachModel;
use CodeIgniter\RESTful\ResourceController;

class CoachController extends ResourceController
{
    protected $format = 'json';

    public function index()
    {
        $model = new \App\Models\CoachModel();
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
        $coachModel = new CoachModel();
        $data = $coachModel->find($id);

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
        $coachModel = new CoachModel();
        $coachModel->save($data);
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
            $coachModel = new CoachModel();
            $coach = $coachModel->find($id);
            
            if ($coach) {
                $data = [
                    'id' => $id,
                    'username' => $this->request->getVar('username'),
                    'email' => $this->request->getVar('email'),
                    'password' => password_hash($this->request->getVar('password'), PASSWORD_DEFAULT),
            ];
            $proses = $coachModel->save($data);
            
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
            $coachModel = new CoachModel();
            $coach = $coachModel->find($id);
        if($coach){
            $proses = $coachModel->delete($id);
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

            $coachModel = new CoachModel();
            $existingCoach = $coachModel->where('email', $email)->first();

            if ($existingCoach) {
                if ( $password != $existingCoach->password) {
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
                'data' => $existingCoach
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
