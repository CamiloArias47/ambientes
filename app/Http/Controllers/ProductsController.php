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


      return view('dashboard.dashboard')->with(['fatherCategories' => json_encode($fatherCategories),
                                                'brands'           => json_encode($brands),
                                                'tags'             => json_encode($tags),
                                                'products'         => json_encode($products),
                                                'prev'             => $this->thereIsMorePrevNext($lastP[0]["created_at"],"<"),
                                                'maxUpload'        => 20,
                                                ]);
    }


    //retorna los ultimos productos y accesorios creados
    public function getLastProducts()
    {
        $products    = Shop_product::orderBy("created_at","desc")->take('20')->get(); //tomamos los ultimos 20 productos
        $products    = $this->formatProducts($products);

        if( count($products) > 20){
            $products = array_slice($products,0,20);
        }

        return $products;
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
            $product->shop_brand;
            $product->shop_subcategory->shop_category->shop_fathercategory;
            $product->shop_tags;
            $product->shop_accessories;

            $product->detail = "#";

            if(count($product->shop_images) > 0){
                foreach ($product->shop_images as $image) {
                    $image->route = asset("assets/img/products/".$image->route);
                }
            }
        }
        return $products;
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

    //se encarga de validar la informacion del formulario que crea un producto
    //validateStorage($request)  -> boolean || response()
    public function validateStorage(Request $request)
    {
        $validator = Validator::make($request->all(), ["categoriaPadreCrearProducto"      => "required",
                                                       "metaDescripcionCrearProducto"     => "required",
                                                       "tagsCrearProducto.*"              => "numeric",
                                                       "agregarTagsCrearProducto"         => "required_if:crearTagsCrearProducto,on",
                                                       "nombreCrearProducto"              => "required",
                                                       "descripcionCrearProducto"         => "required",
                                                       "marcaCrearProducto"               => "required",
                                                       "nombreMarcaCrearProducto"         => "required_if:marcaCrearProducto,otra",
                                                       "precioCrearProducto"              => "required|numeric",
                                                   ]);

        $validator->after(function ($validator) use ($request){
            if($request->categoriaPadreCrearProducto == "otro"){
                if(!($request->categoriaPadreCrearProducto == "otro" && ($request->nuevaCategoriaPadreCrearProducto != "" && $request->nuevaCategoriaCrearProducto != "" && $request->nuevaSubCategoriaCrearProducto != ""))){
                    $validator->errors()->add('Completa las categorias', 'Verifica que estableciste una nueva categoria padre, categoria y subcategoria');
                }

                if($request->nuevaCategoriaPadreCrearProducto != ""){
                    if( Shop_fathercategory::where('name','=',$request->nuevaCategoriaPadreCrearProducto)->count() > 0 ){
                        $validator->errors()->add('Categoria padre existente', 'Ya existe una categoria padre con ese nombre');
                    }
                }
            }

            //verificar si establecio subcategoria
            if($request->subCategoriaCrearProducto == "" && $request->nuevaSubCategoriaCrearProducto == ""){
                if($request->editProduct_id != ""){
                    $message = "El producto debe tener subcategoria, intenta cambiar la categoria por otra diferente y nuevamente seleciona la categoria a la que pertenece asi se cargaran las subcategorias";
                }
                else{
                    $message = "El producto debe tener una subcategoria";
                }

                $validator->errors()->add('No se establecio una subcategoria', $message);
            }


            //$haveAccesories = false;

            //si esta editando un producto,
            if($request->editProduct_id != ""){
                $product = Shop_product::find($request->editProduct_id); //si es un producto el que esta editando
                $haveTags = (count($product->shop_tags) > 0) ? true : false; //si tiene tags le ponemos true
            }
            else{
                $haveTags = false; //en caso de que esta creando un producto o accesorio entonces no tiene tags aún, le ponemos false
            }

            if(!$haveTags && $request->crearTagsCrearProducto == "" && count($request->tagsCrearProducto) == 0){
                $validator->errors()->add('Agrega tags', 'Debes agregar tags al producto');
            }
        });

        if($validator->fails()){
            return response()->json(["saved" => false, "errors" => $validator->errors()->all()]);
        }

        return true;
    }

    //maneja el guardado de categorias, si agrega una nueva, si no retorna la que selecciono
    //handlerStorageClasification($request) -> array       ["subcategoria_id" => null||int, "errors" => array]     Si es null, no guardo alguna clasificacion
    //$request                              == Request     Información enviada en la peticion, (formulario)
    public function handlerStorageClasification(Request $request)
    {
        $save_father       = ($request->categoriaPadreCrearProducto == "otro") ? true : false; //indica si se debe guardar la categoria padre
        $save_category     = false; //indicara si se debe giuardar la categoria
        $save_subcategory  = false; //indica si se debe guardar la subcategoria
        $errors            = ["ok"];
        $subcategoria_id   = null;

        if($request->categoriaCrearProducto == "otro"){ //si selecciono otra categoria
             $save_category = true; //indica que debemos guardar la categoria
             $father_id = $request->categoriaPadreCrearProducto; //convetimos esta variable en el id que el usuario selecciono
        }

        if($request->subCategoriaCrearProducto == "otro"){ //si selecciono agregar otra subcategoria
             $save_subcategory = true; //se le indica que se debe crear una subcategoria
             $categoria_id     = $request->categoriaCrearProducto; //esta es la categoria que selecciono el usuario
        }
        else{
            $subcategoria_id = $request->subCategoriaCrearProducto;
        }

        if($save_father){ //verificamos si debemos guardar la categoria padre
            $saveFather = $this->storageFatherCategory($request->nuevaCategoriaPadreCrearProducto);
            if($saveFather["saved"]){ //si guardo la categoria padre
                $father_id = $saveFather["fatherCategory"]["id"];
                $save_category = true;
            }
            else{ //si no guardo la categoria padre
                $errors = ["No fue posible guardar la categoria padre"];
            }
        }

        if($save_category){
            if( !$this->categoryExist($father_id, $request->nuevaCategoriaCrearProducto) ){
                $saveCate = $this->storageCategoria($father_id, $request->nuevaCategoriaCrearProducto);
                if($saveCate["saved"]){ //si guarda la categoria
                    $save_subcategory = true;
                    $categoria_id = $saveCate["category"]["id"];
                }
                else{
                    $errors = ["No fue posible guardar la categoria"];
                }
            }
            else{
                $errors = ["Ya existe una categoria con ese nombre"];
            }
        }

        if($save_subcategory){
            if( !$this->subcategoryExist($categoria_id, $request->nuevaSubCategoriaCrearProducto) ){
                $saveSub = $this->storageSubCategory($categoria_id, $request->nuevaSubCategoriaCrearProducto);
                if( $saveSub["saved"]){ //si guarda la subcategoria
                    $subcategoria_id = $saveSub["subcategory"]["id"]; //guardamos el id de la subcategoria creada
                }
                else{
                    $errors = ["No fue posible guardar la subcategoria"];
                }
            }
            else{
                $errors = ["Ya existe una sub-categoria con ese nombre"];
            }
        }

        return array("subcategoria_id" => $subcategoria_id, "errors" =>  $errors);
    }

    //crea una categoria padre
    //storageFatherCategory($name) -> array     ["saved" => boolean, "fatherCategory" => Shop_fathercategory || null]
    //$name                        == string    Nombre de la categoria padre
    public function storageFatherCategory($name){
        $fatherCategory = new Shop_fathercategory;
        $fatherCategory->name = $name;
        if( $fatherCategory->save() ){
            return array("saved" => true, "fatherCategory" => $fatherCategory);
        }

        return array("saved" => false, "fatherCategory" => null);
    }

    //valida si existe una categoria de una categoria padre con ese nombre
    //categoryExist($fatherCate_id, $name) -> boolean  Retorna true si existe.
    //$fatherCate_id                       == int      id de la categoria padre
    //$name                                == string   Nombre de la categoria
    public function categoryExist($fatherCate_id, $name){
        if(Shop_category::where("shop_fathercategory_id","=",$fatherCate_id)->where("name","=",$name)->count() > 0){
            return true;
        }

        return false;
    }

    //guarda una categoria
    //storageCategoria($fatherCate_id, $name) -> array     ["saved" => boolean, "category" => Shop_category || null]    True si guarda la
    //$fatherCate_id                          == int       Id de la categoria padre
    //$name                                   == string    Nombre de la categoria a crear
    public function storageCategoria($fatherCate_id, $name)
    {
        $categoria = new Shop_category;
        $categoria->shop_fathercategory_id = $fatherCate_id;
        $categoria->name                   = $name;
        if( $categoria->save() ){
            return array("saved" => true, "category" => $categoria);
        }

        return array("saved" => false, "category" => null);
    }

    //valida si existe una sub-categoria de una categoria con ese nombre
    //subcategoryExist($cate_id, $name) -> boolean  Retorna true si existe.
    //$cate_id                          == int      id de la categoria padre
    //$name                             == string   Nombre de la categoria
    public function subcategoryExist($cate_id, $name){
        if(Shop_subcategory::where("shop_category_id","=",$cate_id)->where("name","=",$name)->count() > 0){
            return true;
        }

        return false;
    }

    //guarda una subcategoria
    //storageSubCategory($category_id, $name)  -> Array   ["saved" => boolean, "subcategory" => Shop_subcategory || null]  True si lo guarda
    //$category_id                             == int     Id de la categoria padre
    //$name                                    == string  Nombre de la subcategoria
    public function storageSubCategory($category_id, $name)
    {
        $sub = new Shop_subcategory;
        $sub->shop_category_id = $category_id;
        $sub->name             = $name;

        if( $sub->save() ){
          return array("saved" => true, "subcategory" => $sub);
        }

        return array("saved" => false, "subcategory" => null);
    }

    //maneja el guardado de las marcas si el usuario agrega una nuevA, de lo contrario retorna el id de la marca
    //handlerStorageBrands($request) -> array   ["marca_id" => int||null, "errors" => array]   marca_id si es null, es por que no guarda la marca
    public function handlerStorageBrands(Request $request)
    {
        $save_brand = ($request->marcaCrearProducto == "otra") ? true : false; //indica si se debe guardar la marca
        $errors     = ["Ok"];
        $marca_id   = null;

        if($save_brand){ //si hay que crear una nueva marca
            $saveBrand = $this->storageBrand($request->nombreMarcaCrearProducto);
            if($saveBrand["saved"]){
                $marca_id = $saveBrand["brand"]["id"];
            }
            else{
                $errors = ["No fue posible guardar la marca"];
            }
        }
        else{
            $marca_id = $request->marcaCrearProducto;
        }

        return array("marca_id" => $marca_id, "errors" => $errors);
    }

    //guarda marcas
    //storageBrand($name) -> array  ["saved" => boolean, "brand" => Shop_brand || null]
    //$name               == string Nombre de la marca
    public function storageBrand($name)
    {
        $brand = new Shop_brand;
        $brand->name = $name;
        if( $brand->save() ){
            return array("saved" => true, "brand" => $brand);
        }

        return array("saved" => false, "brand" => null);
    }

    //guarda tags, si encuentra uno igual, lo agrega al array de retorno
    //saveTags($tags) -> Array  [Shop_tag]
    //$tags           == Array  ["string"]  Nombres de los nuevos tag
    public function saveTags($tags)
    {
        $tagsSave = [];
        if( count($tags) > 0 ){
            for( $i = 0; $i < count($tags); $i++) {

              if(Shop_tag::where("name","=",$tags[$i]->{'tag'})->count() == 0){
                $newTag = new Shop_tag;
                $newTag->name = $tags[$i]->{'tag'};
                if( $newTag->save() ){
                  $tagsSave[] = $newTag;
                }
              }
              else{
                $tagsSave[] = Shop_tag::where("name","=",$tags[$i]->{'tag'})->first();
              }
            }
        }

        return $tagsSave;
    }

    //se encarga de guardar un producto en la base de datos
    //saveProduct($request, $marca_id, $subcategoria_id, $tags) -> array    ["saved" => boolean, "product" => Shop_product||null]
    //$request                                                  == Request
    //$marca_id                                                 == int      Id de la marca del producto
    //$subgategoria_id                                          == int      Id de la subcategoria
    //$tags                                                     == array    tags nuevos creados por el usuario, si no se pasa null
    public function saveProduct(Request $request, $marca_id, $subcategoria_id, $tags)
    {
        $saved = false;
        $product = "";

        $product =  new Shop_product;
        $product->name                = $request->nombreCrearProducto;
        $product->description         = $request->descripcionCrearProducto;
        $product->meta_description    = $request->metaDescripcionCrearProducto;
        $product->shop_brand_id       = $marca_id;
        $product->price               = $request->precioCrearProducto;
        $product->shop_subcategory_id = $subcategoria_id;
        $product->showproduct         = "no";

        if( $product->save() ){
            if( count($request->tagsCrearProducto) > 0 ){ //relacionamos los tags que selecciono
                foreach ($request->tagsCrearProducto as $tag) {
                    $product->shop_tags()->attach($tag); //creamos el registro en la table pivot
                }
            }

            if( $tags !== null ){  //adjuntamos los tags que creeo
                foreach ($tags as $newTag) {
                    $product->shop_tags()->attach($newTag["id"]); //creamos el registro en la table pivot
                }
            }

            if($request->AccessoriesProducto != ""){  //adjuntamos los accesorios que eligó
                foreach ($request->AccessoriesProducto as $accessory) {
                    $product->shop_accessories()->attach($accessory);
                }
            }

            $product->type = "product";
            $saved = true;
        }

        return array("saved" => $saved, "product" => $product);
    }


    /**
    *Quita vocales con tildes, ñ y espacios de un string.
    * @param {string} $nombre //cadena a quitar caracteres
    */
    public function sinCaracteresRaros($nombre)
    {
        $raros = array(" ", "ñ", "Ñ", "á", "é", "í", "ó", "ú", "Á", "É", "Í", "Ó", "Ú");
        $norma = array("", "n", "N", "a", "e", "i", "o", "u", "A", "E", "I", "O", "U");
        $nameespacios       = str_replace($raros, $norma, $nombre);
        return $nameespacios;
    }

    //Se encarga de revisar si los tags que envio en la edicion ya existen en la base de datos, si no existe crea
    //la relacion
    //addMoreTags($product, $tags) -> void
    //$product                     == Shop_product
    //$tags                        -> array       Array con los tags que se enviaron el el formulario de edicion
    public function addMoreTags($product, $tags){
        foreach ($tags as $newTag ) {
            $exist = false;
            foreach ($product->shop_tags as $oldTag) {
                if($newTag == $oldTag->id){
                    $exist = true;
                }
            }

            if(!$exist){
               $product->shop_tags()->attach($newTag); //agregarlo
            }
        }
    }


    /**retorna los productos de una categoria padre
    * @param {int} $id  Id de la categoria padre
    * @return {array}
    */
    public function getProductsFilterByFather($id)
    {
        $products    = [];
        $accessories = [];
        $father = Shop_fathercategory::find($id);

        foreach ($father->shop_categories as $category) {
            $category->shop_subcategories;
            foreach ($category->shop_subcategories as $subcategory) {
                $subcategory->shop_products;
                foreach ($subcategory->shop_products as $product) {
                    $products[] = $product;
                }
            }
        }

        $products = $this->formatProducts($products);

        return $products;
    }



    /**retorna los productos de una categoria
    * @param {int} $id  Id de la categoria
    * @return {array}
    */
    public function getProductsFilterByCategory($id)
    {
        $products = [];
        $category = Shop_category::find($id);

            $category->shop_subcategories;
            foreach ($category->shop_subcategories as $subcategory) {
                $subcategory->shop_products;
                foreach ($subcategory->shop_products as $product) {
                    $products[] = $product;
                }
            }

        $products    = $this->formatProducts($products);

        return $products;
    }


    /**retorna los productos de una sub-categoria
    * @param {int} $id  Id de la sub-categoria
    * @return {array}
    */
    public function getProductsFilterBySubCategory($id)
    {
        $products    = [];
        $subcategory = Shop_subcategory::find($id);

        $subcategory->shop_products;
        foreach ($subcategory->shop_products as $product) {
            $products[] = $product;
        }

        $products    = $this->formatProducts($products);

        return $products;
    }


    /**filtra los productos dados, por el nombre
    * @param {array} $products  Productos a evaluar
    * @param {atring} $name  Nombre que se usara de filtro
    * @return {array}
    */
    public function getProductsWhereName($products, $name)
    {
        $reProducts = [];
        $name = strtolower($name);
        foreach ($products as $product) {
            $productName = strtolower($product['name']);
            $pos = strrpos($productName, $name);
            if ($pos !== false) {
               $reProducts[] = $product;
            }
        }

        return $reProducts;
    }









  /*
  |--------------------------------------------------------------------------
  | API aplication software interface, peticiones.
  |--------------------------------------------------------------------------
  |
  | Peticiones http
  |
  */

  /**
  * maneja peticiones post, retorna unjson con los ultimos productos creados
  */
  public function getProducts(Request $request)
  {
      $products = $this->getLastProducts();
      $lastP    = end($products);

      return response()->json(["products" => $products,
                               "prev"     => $this->thereIsMorePrevNext($lastP[0]["created_at"],"<")]);
  }

  public function responseFatherCategories(Request $request)
  {
    $fatherCategories = Shop_fathercategory::orderBy('name','asc')->get();
    return response()->json(["fathercategories" => $fatherCategories]);
  }

  //maneja peticiones post y retorna las categorias de un categoria padre
  public function responseGetCategories(Request $request)
  {
    $categories = Shop_category::where('shop_fathercategory_id',$request->id)->orderBy('name','asc')->get();
    return response()->json(["categories" => $categories]);
  }

  //maneja peticiones post, retorna las subcategorias de la categoria pedida
  public function responseGetSubCategories(Request $request)
  {
      $subcategories = Shop_subcategory::where('shop_category_id','=',$request->id)->orderBy('name','asc')->get();
      return response()->json(["subcategories" => $subcategories]);
  }

  /**
  * Maneja peticiones post y responde con las marcas
  */
  public function responseGetBrands(Request $request){
    $brands = Shop_brand::orderBy('name','asc')->get();
    return response()->json(['brands' => $brands]);
  }

  /**
  * Maneja peticiones post y responde con los tags
  */
  public function responseGetTags(Request $request){
    $tags = Shop_tag::orderBy('name','asc')->get();
    return response()->json(['tags' => $tags]);
  }

  /**
  *maneja peticiones post para almacenar un producto
  */
  public function storage(Request $request)
  {
      $saved = false;

      if( !is_bool($this->validateStorage($request)) ){ //validar la información, si no retorna un boleano, la validacion falló
          return $this->validateStorage($request);
      }

      $errors = ["Ok"];
      $save_tags        = ($request->crearTagsCrearProducto == "on") ? true : false;
      $productoCreated  = false;

      $clasifications = $this->handlerStorageClasification($request); //metodo que se encarga de las catgorias, de crearlas, si es necesario o solo retorna la subcategoria seleccionada
      if($clasifications["subcategoria_id"] != null){
          $subcategoria_id = $clasifications["subcategoria_id"];
      }
      else{
          $errors = $clasifications["errors"];
      }

      $brands = $this->handlerStorageBrands($request);
      if($brands["marca_id"] != null){
          $marca_id = $brands["marca_id"];
      }
      else{
          $errors = $brands["errors"];
      }

      if($save_tags){
          $tags = $this->saveTags( json_decode($request->agregarTagsCrearProducto));
      }

      if( isset($subcategoria_id) && isset($marca_id) ){

              $storage = $this->saveProduct($request, $marca_id, $subcategoria_id, ( isset($tags) )?$tags:null);
              $saved = $storage["saved"];
              if($storage["saved"]){
                  $productoCreated = $storage["product"];
              }
              else{
                  $errors = ["No sue posible guardar el producto"];
              }
      }



      return response()->json(["saved" => $saved, "errors" => $errors, "product" => $productoCreated

    ]);

  }

  /**
  * se encarga de guardas las fotos de un producto
  */
  public function storageImage(Request $request)
  {
      $validator = Validator::make($request->all(),["croppedImage" => 'image|dimensions:min_width=420,min_height=420'],
                                                   ["croppedImage.dimensions" => "La imagen debe tener como minimo 420px de ancho por 420px de alto"]);

      if($validator->fails()){
          return response()->json(["saved" => false, "errors" => $validator->errors()->all()]);
      }

      $saved = false;
      $img        = $request->file('croppedImage');
      $nombreFoto = time().'-'.$this->sinCaracteresRaros($img->getClientOriginalName()).'.'.$img->getClientOriginalExtension();
      Storage::disk('ecommerceProducts')->put($nombreFoto, file_get_contents($img->getRealPath() ) );

      $image = new Shop_image;
      $image->route           = $nombreFoto;
      $image->shop_product_id = $request->producto_id;

      if( $image->save() ){
         $product = Shop_product::find($request->producto_id);
         $product->showproduct = "si";
         $product->save();
         $saved = true;
      }

      return response()->json(["saved" => $saved]);
  }


  /**
  *Elimina un tag de un producto, maneja peticiones post
  */
  public function deleteTag(Request $request)
  {
      $detach = false;
      $product = Shop_product::find($request->product_id);


      $detach = ($product->shop_tags()->detach($request->tag_id)) ? true : false;

      return response()->json(["detach" => $detach, "tags" => $product->shop_tags]);
  }


  /**
  *Maneja peticiones post para editar un producto
  *@param {Request} $request //datos enviados en la peticion
  *@return {json}
  */
  public function editProduct(Request $request)
  {
      $saved  = false;
      $errors = ["Ok"];

      if( !is_bool($this->validateStorage($request)) ){ //validar la información, si no retorna un boleano, la validacion falló
          return $this->validateStorage($request);
      }

      $save_tags        = ($request->crearTagsCrearProducto == "on") ? true : false;
      $productUpdated   = false;

      $clasifications = $this->handlerStorageClasification($request); //metodo que se encarga de las catgorias, de crearlas, si es necesario o solo retorna la subcategoria seleccionada
      if($clasifications["subcategoria_id"] != null){
          $subcategoria_id = $clasifications["subcategoria_id"];
      }
      else{
          $errors = $clasifications["errors"];
      }

      $brands = $this->handlerStorageBrands($request);

      if($brands["marca_id"] != null){
          $marca_id = $brands["marca_id"];
      }
      else{
          $errors = $brands["errors"];
      }

      if($save_tags){
          $tags = $this->saveTags(json_decode($request->agregarTagsCrearProducto));
      }

      if( isset($subcategoria_id) && isset($marca_id) ){
           //:::::::::::::::::EDITAR PRODUCTO:::::::::::::::::::::::
          if($request->accesorioCrearProducto != "" && $request->accesorioCrearProducto == "on"){ //si lo cambio a accesorio
              $update  = "change";
          }
          else{ //si continua siendo un producto
              $update = "normal"; //establecemos update como normal para que haga una actualizacion normal
          }


          $product =  Shop_product::find($request->editProduct_id);

          $product->name                = $request->nombreCrearProducto;
          $product->description         = $request->descripcionCrearProducto;
          $product->meta_description    = $request->metaDescripcionCrearProducto;
          $product->shop_brand_id       = $marca_id;
          $product->price               = $request->precioCrearProducto;
          $product->shop_subcategory_id = $subcategoria_id;
          $product->showproduct         = ($request->mostrarProducto == "on") ? "si" : "no";

          if( $product->save() ){

              if( $request->tagsCrearProducto != null && count($request->tagsCrearProducto) > 0 ){ //relacionamos los tags que selecciono
                  $this->addMoreTags($product, $request->tagsCrearProducto);
              }

              if( isset($tags) ){
                  foreach ($tags as $newTag) {
                      $product->shop_tags()->attach($newTag["id"]); //creamos el registro en la table pivot
                  }
              }

              $product->type  = "product";
              $saved          = true;
              $productUpdated = $product;
          }
      }



      return response()->json(["saved" => $saved, "errors" => $errors, "product" => $productUpdated ]);
  }



  /**
  *Maneja peticiones post y retorna un producto
  *@param {Request} $request //datos enviados en la petición
  *@return {json}
  */
  public function responseGetProduct(Request $request)
  {
      $product = Shop_product::find($request->id);
      $exist = ( $product ) ? true : false;


      if($exist){
              $product->type = "product";
              $product->shop_tags;
              $product->shop_images;
              $product->shop_subcategory->shop_category->shop_fathercategory;
              $product->shop_brand;
              $product->shop_accessories;
              $product->detail = "ruta detalles";

              foreach ($product->shop_images as $image) {
                  $image->route = asset("assets/img/products/".$image->route);
              }
      }
      else{
          $exist = false;
      }

      return response()->json(["product" => $product, "exist" => $exist]);
  }



  /**
  * maneja peticiones post retorna los productos de una categoria padre
  */
  public function filterProducts(Request $request)
  {
      //father, catego, subcat, name
      //si solo eligio una categoria padre
      if($request->father != "" && $request->catego == "" && $request->subcat == ""){
          $products = $this->getProductsFilterByFather($request->father);
      }
      //si eligio una categoria (descartamos la categoria padre)
      else if($request->catego != "" && $request->subcat == ""){
          $products = $this->getProductsFilterByCategory($request->catego);
      }
      //si selecciona una subcategoria (ahora no nos interesa ni la categoria, ni la categoria padre)
      else if($request->subcat != ""){
          $products = $this->getProductsFilterBySubCategory($request->subcat);
      }

      if($request->name != "" && ($request->father != "" || $request->catego != "" || $request->subcat != "") ){
          $products = $this->getProductsWhereName($products, $request->name);
      }

      if($request->name != "" && ($request->father == "" && $request->catego == "" && $request->subcat == "") ){

          $products    = Shop_product::where("name","LIKE","%".$request->name."%")->orderBy("name","asc")->get();

          $products    = $this->formatProducts($products);
      }


      return response()->json(["father" => $products]);
  }


}
