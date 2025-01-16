<?php

namespace App\Models;

use CodeIgniter\Model;

class MateriModel extends Model
{
    protected $table = 'materi';
    protected $primaryKey = 'id';
    protected $returnType = MateriModel::class;
    protected $useSoftDeletes = false;

    protected $allowedFields = [
        'judul',
        'deskripsi',
        'gambar',
        'jenis_materi'

    ];
}
