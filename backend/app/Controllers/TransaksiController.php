<?php

namespace App\Controllers;

use CodeIgniter\RESTful\ResourceController;
use App\Models\TransaksiModel;

class TransaksiController extends ResourceController
{
    protected $format = 'json';

    public function index()
    {
        $model = new TransaksiModel();
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

    public function create()
    {
        $data = [
            'email' => $this->request->getVar('email'),
            'price' => $this->request->getVar('price'),
            'payment_method' => $this->request->getVar('payment_method'),
            'tanggal_transaksi' => date('Y-m-d H:i:s'),
            'duration' => $this->request->getVar('duration'),
        ];

        $transaksiModel = new TransaksiModel();
        $transaksiModel->insert($data);

        $response = [
            'status' => 'success',
            'messages' => 'Transaction data added successfully!',
            'data' => $data,
        ];

        return $this->respond($response);
    }

    public function update($id = null)
    {
        $data = [
            'email' => $this->request->getVar('email'),
            'price' => $this->request->getVar('price'),
            'payment_method' => $this->request->getVar('payment_method'),
            'tanggal_transaksi' => date('Y-m-d H:i:s'),
            'duration' => $this->request->getVar('duration'),
        ];

        $transaksiModel = new TransaksiModel();
        $transaksiModel->update($id, $data);

        $response = [
            'status' => 'success',
            'messages' => 'Transaction data updated successfully!',
            'data' => $data,
        ];

        return $this->respond($response);
    }

    public function delete($id = null)
    {
        $transaksiModel = new TransaksiModel();
        $transaksiModel->delete($id);

        $response = [
            'status' => 'success',
            'messages' => 'Transaction data deleted successfully',
        ];

        return $this->respond($response);
    }
}
