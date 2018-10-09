<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Shop_brand extends Model
{
    
    protected $fillable=['name'];

    public function shop_products(){
    	return $this->hasMany('App\Shop_product');
    }

    public function shop_accessories()
    {
    	return $this->hasMany("App\Shop_accessory");
    }

}
