<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Shop_tag extends Model
{
    protected $fillable=['name','id'];

    public function shop_products()
    {
        return $this->belongsToMany('App\Shop_product');
    }

    public function shop_accessories()
    {
        return $this->belongsToMany('App\Shop_accessory','shop_accessory_shop_tag');
    }

    //::::::::: Scope ::::::::::::::::
    public function scopeTag($query, $search)
    {
        if(trim($search) != ''){
            return $query->where('name', 'like', '%'.$search.'%');
        }
        
    }
}
