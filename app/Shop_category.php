<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Shop_category extends Model
{
    protected $fillable=['shop_fathercategory_id','name'];

    public function shop_fathercategory(){
    	return $this->belongsTo('App\Shop_fathercategory');
    } 

    public function shop_subcategories(){
    	return $this->hasMany('App\Shop_subcategory');
    }  
}
