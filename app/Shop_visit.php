<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Shop_visit extends Model
{
    protected $fillable = ["product_id",
                           "type"];
}
