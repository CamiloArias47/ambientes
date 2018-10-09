<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Shop_subcategory extends Model
{
    protected $fillable=['shop_category_id','name'];

    public function shop_category(){
    	return $this->belongsTo('App\Shop_category');
    }

    public function shop_products(){
    	return $this->hasMany('App\Shop_product');
    }

    public function shop_accessories(){
    	return $this->hasMany('App\Shop_accessory');
    }
}
