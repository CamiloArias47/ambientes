<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Shop_fathercategory;

class ShopController extends Controller
{
    public function index(){
      return view('shop.index')->with(["products" => [],
                                       "productalt" => [],
                                       "fatherC" => json_encode($this->getFatherCategories()) ]);
    }

    /**
    * Obtine las categorias padre y las recorre para obtener las marcas que contiene
    * @return {object}
    */
    public function getFatherCategories(){
      $fatherC = Shop_fathercategory::orderBy("name", "asc")->get();
      foreach ($fatherC as $father) {
          $marcas = [];
          $infobrands = [];
          foreach ($father->shop_categories as $category) {
              foreach ($category->shop_subcategories as $subcategory) {
                  foreach ($subcategory->shop_products as $product) {
                      if (!in_array($product->shop_brand_id, $marcas)) {
                          $marcas[] = $product->shop_brand_id;
                          $infobrands[] = $product->shop_brand;
                      }
                  }
              }
          }
          $father->marcas=$infobrands;
      }
      return $fatherC;
    }
}
