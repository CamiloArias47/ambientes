<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Shop_image extends Model
{
    protected $fillable=['route','shop_product_id'];

    public function shop_product(){
    	return $this->belongsTo('App\Shop_product');
    }

}
