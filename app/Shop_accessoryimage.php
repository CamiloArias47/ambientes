<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Shop_accessoryimage extends Model
{
    protected $fillable = ["route","shop_accessory_id"];
    protected $table   = 'shop_accessoryimages';

    //:::::::: Relaciones ::::::::
    public function shop_image(){
    	return $this->belongsTo("App\Shop_accessory");
    }
}
