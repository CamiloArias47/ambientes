<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Shop_fathercategory;
use App\Shop_category;
use App\Shop_subcategory;
use App\Shop_brand;
use App\Shop_tag;
use App\Shop_product;
use App\Shop_image;
use App\Shop_accessory;
use App\Shop_accessoryimage;
use Validator;
use Storage;

class ProductsController extends Controller
{
    public function __construct(){
        $this->middleware('auth');
    }

    public function index()
    {
        $fatherCategories = Shop_fathercategory::orderBy('name','asc')->get();
        $brands           = Shop_brand::orderBy('name','asc')->get();
        $tags             = Shop_tag::orderBy('name','asc')->get();
        $products         = $this->getLastProducts();
        $lastP            = end($products);


       // dd($products, $ProductsL, $lastP);
      return view('dashboard.dashboard')->with(['fatherCategories' => json_encode($fatherCategories),
                                                'brands'           => json_encode($brands),
                                                'tags'             => json_encode($tags),
                                                'products'         => json_encode($products),
                                                'prev'             => $this->thereIsMorePrevNext($lastP["created_at"],"<"),
                                                'maxUpload'        => 20,
                                                ]);
    }


    //retorna los ultimos productos y accesorios creados
    public function getLastProducts()
    {
        $products    = Shop_product::orderBy("created_at","desc")->take('20')->get(); //tomamos los ultimos 20 productos
        $accessories = Shop_accessory::orderBy("created_at","desc")->take('20')->get(); //tomamos los ultimos 20 accesorios

        $products    = $this->formatProducts($products);
        $accessories = $this->formatAccessories($accessories);

        $productos = $this->joinProductsAccessoriesOrder($products, $accessories, "<");

        if( count($productos) > 20){
            $productos = array_slice($productos,0,20);
        }

        return $productos;
    }

    //retorna true si existen más productos antes o despues de la fecha que se le de por parametro
    //tambien se le debe pasar el oreden
    //thereIsMorePrevNext($created_at, $order) -> boolean   True indica que si hay más
    //$order                                   == string    "<",">"  Para indicar si queremos los que sean mayores o menores
    //$created_at                              == string format "2017-12-31 24:60:60"
    public function thereIsMorePrevNext($created_at, $order)
    {

        /*$prevP = Shop_product::where("created_at",$order,$created_at)->get()->count();
        $prevA = Shop_accessory::where("created_at",$order,$created_at)->get()->count();

        if($prevP > 0 || $prevA > 0){
            return true;
        } */

        return false;
    }

    //formatea los producto para ser utilizado por la vista react.js
    public function formatProducts($products){
        foreach ($products as $product) {
            $product->type = "product";
            $product->shop_images;
            $product->shop_subcategory->shop_category->shop_fathercategory;
            $product->shop_tags;
            $product->shop_accessories;

            $product->detail = route('ecommerce.detail',$product->id);

            if(count($product->shop_images) > 0){
                foreach ($product->shop_images as $image) {
                    $image->route = asset("image/ecommerce/products/".$image->route);
                }
            }
        }
        return $products;
    }

    //formatea los accesorios para ser utilizados por la vista react.js
    public function formatAccessories($accessories){
        foreach ($accessories as $accessory) {
            $accessory->type = "accessory";
            $accessory->shop_accessoryimages;
            $accessory->shop_subcategory->shop_category->shop_fathercategory;
            $accessory->shop_tags;
            $accessory->shop_products;

            $accessory->detail = route('ecommerce.accesory.detail',$accessory->id);

            if(count($accessory->shop_accessoryimages) > 0){
                foreach ($accessory->shop_accessoryimages as $image) {
                    $image->route = asset("image/ecommerce/products/".$image->route);
                }
            }
        }
        return $accessories;
    }

    //une un array de productos y uno de accesorios y los ordena por la fecha de creaccion
    //|($products, $accessories, $order)  -> array
    //$products                                                      == array de Shop_product
    //$accessories                                                   == array de Shop_accessory
    //$order                                                         == string "<",">"
    public function joinProductsAccessoriesOrder($products, $accessories, $order)
    {
        $elementos = [];

        foreach ($products as $product) {
            $elementos[] = $product;
        }

        foreach ($accessories as $accessory) {
            $elementos[] = $accessory;
        }

        return $this->burbuja($elementos, $order);
    }

    //ordenamiento burbuja
  //retorna un array de productos o accesorios ordenados por el campo created_at
  //burbuja($array, $order) -> array
  //$array                  == array  Shop_product || Shop_accessory
  //$order                  == string "<",">"
  public function burbuja($array, $order)
  {
      for($i=1; $i<count($array); $i++)
      {
          for($j=0; $j < count($array)-$i; $j++)
          {
              if($order == "<"){
                  if($array[$j]["created_at"] < $array[$j+1]["created_at"]) {
                      $k=$array[$j+1];
                      $array[$j+1]=$array[$j];
                      $array[$j]=$k;
                  }
              }
              else{
                  if($array[$j]["created_at"] > $array[$j+1]["created_at"]) {
                      $k=$array[$j+1];
                      $array[$j+1]=$array[$j];
                      $array[$j]=$k;
                  }
              }

          }
      }

      return $array;
  }
}
