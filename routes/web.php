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

Route::post('login', 'Auth\LoginController@login')->name('login');
Route::post('logout', 'Auth\LoginController@logout')->name('logout');

//Mapea todas las rutas para /dashboard, el rooteo lo maneja react-router
Route::get('/dashboard/{path?}', [
    'uses' => 'ProductsController@index',
    'as' => 'dashboard',
    'where' => ['path' => '.*'],
    'middleware' => 'auth'
]);

Route::group( ["prefix" => "products"], function(){
  Route::post('fathercategories', 'ProductsController@responseFatherCategories')->name('fathercategories');
  Route::post('categories', 'ProductsController@responseGetCategories')->name('getcategories');
  Route::post('subcategories', 'ProductsController@responseGetSubCategories')->name('getsubcategories');
  Route::post('storage', 'ProductsController@storage')->name('products.storage');
  Route::post('brands','ProductsController@responseGetBrands')->name('products.brands');
  Route::post('tags', 'ProductsController@responseGetTags')->name('products.tags');
  Route::post('storageImg', 'ProductsController@storageImage')->name('products.storageimg');
  Route::post('getProducts', 'ProductsController@getProducts')->name('products.getproducts');
  Route::post('deleteTag', 'ProductsController@deleteTag')->name('products.deleteTag');
  Route::post('edit', 'ProductsController@editProduct')->name('products.edit');
  Route::post('getProduct', 'ProductsController@responseGetProduct')->name('products.getProduct');
  Route::post('filter', 'ProductsController@filterProducts')->name('products.filter');
  Route::post('editImg', 'ProductsController@ajaxEditImg')->name('product.editimg');
});

Route::group( ["prefix" => "user"], function(){
  Route::post('getuser', 'DashboardController@getUserAuth')->name('user.getuser');
});

//___________________________Ecommerce_public__________________________________
  //Mapea todas las rutas para /ecotienda, el rooteo lo maneja react-router
  Route::get('/ecotienda/{path?}', [
      'uses' => 'ShopController@index',
      'as' => 'shop',
      'where' => ['path' => '.*']
  ]);

  /*
  Route::group(["prefix"=>"ecotienda"],function(){
    Route::get('/',                       'ShopController@index')->name('shop');//Retorna a la página principal
    Route::get('search',                  'EcommerceController@search')->name('shop.busqueda');//Maneja la busqueda y retorna a la vista del resultado
    Route::get('show.product/{id}',       'EcommerceController@details')->name('shop.showproduct');
    Route::get('accesorio/{id}',          'EcommerceController@detailsAccessory')->name('shop.showAccessory');
    Route::get('allproducts/{id}',        'EcommerceController@allProducts')->name('shop.allproducts');
    Route::get('allproducts_brand/{id}',  'EcommerceController@brands')->name('shop.allproducts_brand');
    Route::get('fathercategory/{id}',     'EcommerceController@father_categories')->name('shop.fathercategory');
    Route::post('email',                  'EcommerceController@mails')->name('shop.email');
  });
  */

Auth::routes();

Route::get('/home', 'HomeController@index')->name('home');
