<?php

namespace App\Models;

use CodeIgniter\Model;

class CoachModel extends Model
{
    protected $table = 'coach';
    protected $primaryKey = 'id';
    protected $returnType = CoachModel::class;
    protected $useSoftDeletes = false;

    protected $allowedFields = [
        'username',
        'email',
        'password'
    ];
}
