<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Shop_accessory extends Model
{
    protected $fillable=['name','description','meta_description','shop_brand_id','price','shop_subcategory_id','showproduct','showprice'];
    protected $table   = 'shop_accessories';

    public function shop_products()
    {
        return $this->belongsToMany('App\Shop_product','shop_accessory_shop_product'); 
    } 

    public function shop_subcategory()
    {
        return $this->belongsTo('App\Shop_subcategory'); 
    } 

    public function shop_tags()
    {
        return $this->belongsToMany('App\Shop_tag','shop_accessory_shop_tag');
    }

    public function shop_accessoryimages()
    {
    	return $this->hasMany("App\Shop_accessoryimage");
    }

    public function shop_brand()
    {
        return $this->belongsTo("App\Shop_brand");
    }

    //::::::::: Scope ::::::::::::::::
    public function scopeAccessory($query, $search)
    {
        if(trim($search) != ''){
            return $query->where('name', 'like', '%'.$search.'%');
        }
        
    }

}
