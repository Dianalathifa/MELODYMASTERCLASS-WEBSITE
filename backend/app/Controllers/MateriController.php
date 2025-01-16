<?php

namespace App\Controllers;

use CodeIgniter\RESTful\ResourceController;
use App\Models\MateriModel;

class MateriController extends ResourceController
{
    public function index()
    {
        $model = new MateriModel();
        $data['materi'] = $model->findAll();
        return $this->respond($data);
    }

    public function show($id = null)
    {
        $model = new MateriModel();
        $materi = $model->find($id);

        if ($materi) {
            return $this->respond($materi);
        } else {
            return $this->failNotFound('Materi not found.');
        }
    }

    public function create()
    {
        if ($this->request->getMethod() === 'options') {
            // Handle OPTIONS request (no validation or data storage needed)
            return $this->response->setStatusCode(200);
        }

        helper(['form']);
        $rules = [
            'judul' => 'required',
            'deskripsi' => 'required',
            'gambar' => 'uploaded[gambar]|max_size[gambar,1024]|is_image[gambar]|mime_in[gambar,image/jpg,image/jpeg,image/png]',
            'jenis_materi' => 'required',
        ];

        if (!$this->validate($rules)) {
            return $this->response->setStatusCode(400)->setJSON(['error' => $this->validator->getErrors()]);
        }

        $gambar = $this->request->getFile('gambar');
        $namaGambar = $gambar->getRandomName();
        $gambar->move('gambar', $namaGambar);

        $data = [
            'judul' => $this->request->getVar('judul'),
            'deskripsi' => $this->request->getVar('deskripsi'),
            'gambar' => $namaGambar,
            'jenis_materi' => $this->request->getVar('jenis_materi'),
        ];

        $model = new MateriModel();
        $model->insert($data);

        $response = [
            'status' => 200,
            'error' => null,
            'messages' => [
                'success' => 'Data berhasil ditambahkan!'
            ]
        ];

        return $this->response->setJSON($response);
    }
    
    
    public function update($id = null)
    {
        // Handle OPTIONS request (no validation or data storage needed)
        if ($this->request->getMethod() === 'options') {
            return $this->response->setStatusCode(200);
        }

        helper(['form']);

        $rules = [
            'judul' => 'required',
            'deskripsi' => 'required',
            'gambar' => 'max_size[gambar,4096]|is_image[gambar]|mime_in[gambar,image/jpg,image/jpeg,image/png]',
            'jenis_materi' => 'required',
        ];

        if (!$this->validate($rules)) {
            $errors = $this->validator->getErrors();

            // Tambahkan pernyataan untuk mencetak tipe MIME hanya jika file diunggah
            $uploadedFile = $this->request->getFile('gambar');
            if ($uploadedFile) {
                $fileMimeType = $uploadedFile->getMimeType();
                echo "MIME Type: " . $fileMimeType;
            }

            return $this->response->setStatusCode(400)->setJSON(['error' => $errors]);
        }

        $materiModel = new MateriModel();
        $materi = $materiModel->find($id);

        if (!$materi) {
            return $this->failNotFound('Materi not found.');
        }

        $gambar = $this->request->getFile('gambar');
        if ($gambar->isValid() && !$gambar->hasMoved()) {
            // Hapus gambar lama jika ada
            if ($materi['gambar'] && file_exists('gambar/' . $materi['gambar'])) {
                unlink('gambar/' . $materi['gambar']);
            }

            // Pindahkan gambar baru
            $namaGambar = $gambar->getRandomName();
            $gambar->move('gambar', $namaGambar);
            $data['gambar'] = $namaGambar;
        }

        $data['judul'] = $this->request->getVar('judul');
        $data['deskripsi'] = $this->request->getVar('deskripsi');
        $data['jenis_materi'] = $this->request->getVar('jenis_materi');

        $materiModel->update($id, $data);

        $response = [
            'status' => 200,
            'error' => null,
            'messages' => [
                'success' => 'Data berhasil diubah!'
            ]
        ];

        return $this->respond($response);
    }

    


    public function delete($id = null)
    {
        $materiModel = new MateriModel();
        $materi = $materiModel->find($id);

        if ($materi) {
            $proses = $materiModel->delete($id);

            if ($proses) {
                $response = [
                    'status' => 200,
                    'messages' => 'Data berhasil dihapus',
                ];
            } else {
                $response = [
                    'status' => 402,
                    'messages' => 'Gagal menghapus data',
                ];
            }

            return $this->respond($response);
        } else {
            return $this->failNotFound('Data tidak ditemukan');
        }
    }
}
