<?php

namespace App\Models;

use CodeIgniter\Model;

class TransaksiModel extends Model
{
    protected $table = 'transaksi';
    protected $primaryKey = 'id';
    protected $returnType = TransaksiModel::class;
    protected $useSoftDeletes = false;

    protected $allowedFields = [
        'email',
        'price',
        'payment_method',
        'tanggal_transaksi',
        'duration'
    ];

   
}