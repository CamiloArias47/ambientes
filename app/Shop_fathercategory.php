<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Shop_fathercategory extends Model
{
    protected $fillable=['name'];

    public function shop_categories(){
    	return $this->hasMany('App\Shop_category');
    }
}
