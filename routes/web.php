<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {return view('welcome');});
Route::get('servicios-ambientales', function () {return view('servicios'); });
Route::get('empresa', function(){return view('empresa'); });
Route::get('productos', function(){return view('productos'); });

Route::get('intranet', 'Auth\LoginController@ShowLoginForm')->name('intranet');

Route::post('login', 'Auth\LoginController@login')->name('login');
Route::post('logout', 'Auth\LoginController@logout')->name('logout');
Route::get('dashboard', 'DashboardController@index')->name('dashboard');

//___________________________Ecommerce___________________________________
  Route::group(["prefix"=>"ecotienda"],function(){
    Route::get('/',                       'ShopController@index')->name('shop');//Retorna a la página principal
    Route::get('search',                  'EcommerceController@search')->name('shop.busqueda');//Maneja la busqueda y retorna a la vista del resultado
  /*   Route::get('show.product/{id}',       'EcommerceController@details')->name('shop.showproduct');
    Route::get('accesorio/{id}',          'EcommerceController@detailsAccessory')->name('shop.showAccessory');
    Route::get('allproducts/{id}',        'EcommerceController@allProducts')->name('shop.allproducts');
    Route::get('allproducts_brand/{id}',  'EcommerceController@brands')->name('shop.allproducts_brand');
    Route::get('fathercategory/{id}',     'EcommerceController@father_categories')->name('shop.fathercategory');
    Route::post('email',                  'EcommerceController@mails')->name('shop.email'); */
  });
