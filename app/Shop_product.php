<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Shop_product extends Model
{
    protected $fillable=['name','description','meta_description','shop_brand_id','price','shop_subcategory_id','showproduct','showprice'];
    protected $table   = 'shop_products';

    public function shop_subcategory(){
    	return $this->belongsTo('App\Shop_subcategory');
    }

    public function shop_brand(){
    	return $this->belongsTo('App\Shop_brand');
    }

    public function shop_images(){
    	return $this->hasMany('App\Shop_image');
    }

    public function shop_tags()
    {
        return $this->belongsToMany('App\Shop_tag','shop_product_shop_tag');
    } 

    public function shop_accessories()
    {
        return $this->belongsToMany('App\Shop_accessory','shop_accessory_shop_product');
    }

    //::::::::: Scope ::::::::::::::::
    public function scopeProduct($query, $search)
    {
        if(trim($search) != ''){
            return $query->where('name', 'like', '%'.$search.'%');
        }
        
    }
}
