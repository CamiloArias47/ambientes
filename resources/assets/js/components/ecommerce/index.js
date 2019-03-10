import React  from 'react'
//import Cropper from 'cropperjs'

import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';

import {Category,
				FatherCategory,
				Brand,
				Product,
				SubCategory,
				Tag as TagModel} from '../../models'

var Helpers = require('../helpers.js'); //incluir el archivo que contine funciones peara diferentes fines
var helper  = new Helpers;

const maxImage          = {maxWidth:"100%"},
      startProgressBar  = {width: "0%"},
      closeX            = {cursor: "pointer",
                           float: "right",
                           fontSize: "16px",
                           lineHeight: "32px",
													 paddingLeft: "8px"},
		  cropperPreview  =  {width: '100%', float: 'left', height: 300, overflow:'hidden'};

class Ecommerce extends React.Component
{
	constructor(props){
		super(props)

    const routesFatherCat = {getFatherCat : this.props.routes.getFatherCategories},
          routesCategory  = {getCategories: this.props.routes.getCategories},
          routesSubCat    = {getSubCat: this.props.routes.getSubcategories},
          routesTags      = {getTags:this.props.routes.getTags},
          routesBrands    = {getBrands:this.props.routes.getBrands},
          routeProducts   = {storage:this.props.routes.storage,
                             storageImg:this.props.routes.storageImage,
                             getProducts:this.props.routes.getProducts,
                             getProduct:this.props.routes.getProduct,
                             deleteTag:this.props.routes.deleteTag,
                             editProduct: this.props.routes.editProduct,
														 filterProducts: this.props.routes.filterProducts,
														 editImg : this.props.routes.editImg,
													   delete : this.props.routes.delete}

		this.state = {pageForm           :'first', //renderiza un formulario, "first" los datos iniciales, "second" para agregar imagenes
                  productCreated     : false, //almacenara el id del producto creado, para pasarlo a la  arga de imagenes
                  products           : this.props.products, //productos a mostrar en la pestaña productos
                  productEdit        : null, //informacion del producto a editar
									productDelete      : null, //informacion del producto a eliminar
                  pageFormEdit       : 'first', //formulario de edicion de
                  productEditing     : false, //id del producto en edicion
                  typeEdit           : "", //indicara el tipo de producto que se edito (como quedo despues de la edicion) sirve para el ajax que refresca el producto que se esta editando
                  optCategories      : [], //donde se almacenara los option de las categorias
                  optSubCatego       : [], //donde se guardaran la info para contruir los option de subcategorias
                  prev               : this.props.prev, //indica si debe mostrar el boton de anterior
                  next               : false, //indica si debe mostrar el boton de siguiente (mas actuales)
                  gifFilter          : false, //cuando es true muestra un gif para el filtrador por nombre
                  newTags            : [], //tags nuevos a crear
                  fatherCategories   : [], //categorias padre
                  productDetail      : {name:"",
                                        shop_subcategory: {shop_category : {shop_fathercategory:{name:""}}},
                                        shop_category:"",
                                        shop_images: [],
                                        shop_tags:[],
                                        shop_brand:{name:""}
                                       }, //producto que e muestra en el modal de detalles
                 }

    this.fatherModel = new FatherCategory(this.props.token, routesFatherCat); //modelo categorias padres
    this.categoryModel = new Category(this.props.token, routesCategory);
    this.subCategory = new SubCategory(this.props.token, routesSubCat);
    this.tagModel = new TagModel(this.props.token, routesTags);
    this.brandModel = new Brand(this.props.token, routesBrands);
    this.productModel = new Product(this.props.token, routeProducts);

		this.submitForm      = this.submitForm.bind(this);
		this.finishCreate    = this.finishCreate.bind(this);
		this.showModalEdit   = this.showModalEdit.bind(this); //maneja el onCLick de los botones de editar, para mostrar el modal
		this.showModalDelete = this.showModalDelete.bind(this);
	  this.submitEdit      = this.submitEdit.bind(this); //maneja el onSubmit del formulario de editar
	  this.finishUpdate    = this.finishUpdate.bind(this); //cambia el state pageFormEdit a firsdt
	  this.filter          = this.filter.bind(this); //maneja el onChange de los filtros de productos
	  this.handlerPrev     = this.handlerPrev.bind(this); //maneja el onClick del boton prev
    this.onTagAdd        = this.onTagAdd.bind(this); //callback cuando se agrega un tag
    this.onTagDelete     = this.onTagDelete.bind(this); //callback que se ejecuta cuando se elimina un tag del input de tags
    this.showModalView   = this.showModalView.bind(this); //función que abre el modal para ver un proiducto en detalle
		this.dellProduct     = this.dellProduct.bind(this);
	}


	//manja el evento onSubmit del formulario que crea un nuevo producto
	submitForm(ev){
		ev.preventDefault()
		$('#createProductPrice').val($('#createProductPrice').val().replace(/[.]/gi,"")) //quitarle los puntos al precio
		var formData = new FormData(document.getElementById('formCreateProduct'))
    formData.append('agregarTagsCrearProducto',JSON.stringify(this.state.newTags))

    this.productModel.save(formData, response =>{
      if(response.saved){

        helper.showMessage("success","Datos almacenados", "Debes agregar fotos a el producto")
        this.setState({pageForm           : "second",
                      productCreated     : response.product.id});
      }
      else{
        response.errors.forEach( error => {
          helper.showMessage("error","Algo salió mal", error)
        })
      }
    });
	}

	//maneja el onSubmit del formuñlario que edita un producto
	submitEdit(ev){
		ev.preventDefault()
		$('#editProductPrice').val($('#editProductPrice').val().replace(/[.]/gi,"")) //quitarle los puntos al precio
		var formData = new FormData(document.getElementById('formEditProduct'))
    formData.append('agregarTagsCrearProducto',JSON.stringify(this.state.newTags))

    this.productModel.edit(formData, response => {
        if(response.saved){
          helper.showMessage("success","Datos editados", "Editar fotos")
          this.setState({pageFormEdit:'second',
                         typeEdit:response.product.type,
                         productEditing:response.product.id})
        }
        else{
          response.errors.forEach( error => {
            helper.showMessage("error","Algo salió mal",error)
          })
        }
    })
	}

	//renderiza uno de los formulario
	renderAForm(){
		if(this.state.pageForm == "first"){
			return <FormCreate fatherCategories={this.state.fatherCategories}
                         routeGetCategories={this.props.routes.getCategories}
                         routeGetSubCategories={this.props.routes.getSubcategories}
                         routeProductsOfAccessory={this.props.routes.productsOfAccessory}
                         routeQuitTag={this.props.routes.routeQuitTag}
                         routeGetBrands={this.props.routes.getBrands}
                         quitProductOfAccessory={this.props.routes.quitProductOfAccessory}
                         quitAccessoryOfProduct={this.props.routes.quitAccessoryOfProduct}
                         getAccessories={this.props.routes.getAccessories}
                         maxUpload={this.props.maxUpload}
                         submitForm={this.submitForm}
                         defaultImg={this.props.defaultImg}
                         routeSubmit={this.props.routes.storage}
                         idFieldDescription="descripcionCrearProducto"
                         idFielTags="createProductTags"
                         idAccesories="createProductSelectAccessories"
                         idSelectCategory="createProductCategory"
                         idProductsOfAccesories="createProductSelectProducts"
                         formId="formCreateProduct"
                         switchShowPriceId="createProductShowPrice"
                         switchMoreTagsId="createProductAddTag"
                         switchAccessory="createProductAccesory"
                         switchHaveAccesories="createProductHaveAccesories"
                         editOrCreate="create"
                         productEdit={null}
                         token={this.props.token}
                         onChipAdd={this.onTagAdd}
                         onChipDelete={this.onTagDelete}
                         categoryModel={this.categoryModel}
                         subCategory={this.subCategory}
                         tagModel={this.tagModel}
                         brandModel={this.brandModel}
                         productModel={this.productModel}/>
		}
		else if(this.state.pageForm == "second"){
			return <FormImages defaultImg={this.props.defaultImg}
                         routeSubmit={this.props.routes.storageImage}
                         routeDeleteImg={this.props.routes.deleteImg}
                         maxUpload={this.props.maxUpload}
                         productCreated={this.state.productCreated}
                         token={this.props.token}
                         finishCreate={this.finishCreate}
                         productModel={this.productModel}/>
		}
	}

  /**
  * Callback cuando se agrega un tag al input de nuevos tags
  * actualiza el state newTags que contiene los tags que se crearan
  */
  onTagAdd(){
    var elm = M.Chips.getInstance(document.getElementById('newTags') ); //acceder al input de tags
    this.setState({newTags: elm.chipsData})
  }

  /**
  * Callback que se ejecutara ciuando se elimine un tag del input de nuevos tags
  * actualiza el state newTags que contiene los tags que se crearan
  */
  onTagDelete(){
    var elm = M.Chips.getInstance(document.getElementById('newTags') ); //acceder al input de tags
    this.setState({newTags: elm.chipsData})
  }

	//maneja el evento onClick del boton que finaliza la carga de fotos
	finishCreate(ev){
		ev.preventDefault()
    this.productModel.getProducts( data => {
      this.setState({pageForm:'first',
                    products:data.products,
                    prev:data.prev})
    })
	}

	//cambia el state pageFormEdit a first, se usa cuando se cierra el modal de editar, por si vuelve a abrir otra vez
	//no muetsre el formulario de edicion de fotos
	//hace un llamado ajax para refrescar la información del producto que se estaba editando en el modal
	finishUpdate(){
		var id = this.state.pageFormEdit == "first" ? this.state.productEdit.id : this.state.productEditing
    this.productModel.getProduct(id, response => {
      if(response.exist){
        var newProd = [];
        this.state.products.forEach( prod => {
          if(this.state.productEdit.id == prod.id && prod.type == this.state.productEdit.type){
            newProd.push(response.product)
          }
          else{
            newProd.push(prod)
          }
        })
          this.setState({products :newProd})
      }

      this.setState({pageFormEdit:'first'});
    })
	}

	//muestra el modal de editar producto
	showModalEdit(e){
	  e.preventDefault()

	  var id = e.target.getAttribute("data-id")
	  this.state.products.forEach( product => {
	  	 if(product.id == id){
	  	 	this.setState({productEdit:product}); //establecer el producto cliqueado para editar en el state productEdit
	  	 }
	  })

    console.log(`[deug] modal: ${document.getElementById('modalEditProduct')}`, document.getElementById('modalEditProduct'));

    var instance = M.Modal.getInstance(document.getElementById('modalEditProduct'));
    instance.open();
	  //abrir el modal
	}

	//muestra el modal de eliminar producto
	showModalDelete(e){
		e.preventDefault()

		var id = e.target.getAttribute("data-id")
		this.state.products.forEach( product => {
			 if(product.id == id){
				this.setState({productDelete:product}); //establecer el producto cliqueado para eliminar en el state productDelete
			 }
		})

		console.log(`[deug] modal: ${document.getElementById('modalDeleteProduct')}`, document.getElementById('modalDeleteProduct'));

		var instance = M.Modal.getInstance(document.getElementById('modalDeleteProduct'));
		instance.open();
		//abrir el modal
	}

  /**
  *Muestra el modal donde se ve el produto
  */
  showModalView(e){
    e.preventDefault()
    var id = e.target.getAttribute("data-id")
    console.log(`[debug] modal data-id: ${id}`);
    this.productModel.getProduct(id, product => {
      console.log(`[debug] este es producto: ${product}`, product);
      this.setState({productDetail:product.product})
    });
    var instance = M.Modal.getInstance(document.getElementById('modalViewProduct'));
    instance.open();
  }

	//renderiza los option de las categorias padres
	renderOptFatherCategories(){
		var opt = [];
		this.state.fatherCategories.forEach( fat => {
			opt.push(<option value={fat.id} key={"optFath-"+fat.id}>{fat.name}</option>)
		})
		return opt;
	}

	//renderiza los options con categorias, dependiendo de la categoria padre que elija
	renderOptCategories(){
		var opt = []
		this.state.optCategories.forEach( cat => {
			opt.push(<option value={cat.id} key={"optCate-"+cat.id}>{cat.name}</option>)
		})
		return opt;
	}

	//renderiza los option con subCategorias, dependiendo de la categoria que se seleccione
	renderOptSubCategories(){
		var opt = [];
		this.state.optSubCatego.forEach( sub => {
			opt.push(<option value={sub.id} key={"optSub-"+sub.id}>{sub.name}</option>)
		})
		return opt;
	}

	//realiza una peticion ajax para cargar las categorias de una categoria padre
	ajaxGetCategories(id){

    this.categoryModel.getCategories(id, data=>{
      this.setState({optCategories:data,
                     optSubCatego:[]})
    })

	}

	//realiza una peticion ajax para cargar las sub-categorias de una categoria
	ajaxGetSubCategories(id){
    this.subCategory.getSubcategories(id, data=>{
      this.setState({optSubCatego:data})
    })
	}

	//maneja el onChange de los filtros de productos
	filter(ev){
		var input  = ev.target.getAttribute('name'),
		    father = document.getElementById('filterFather').value,
		    catego = document.getElementById('filterCategory').value,
		    subcat = document.getElementById('filterSubCate').value,
		    name   = document.getElementById('filterName').value

		if(input == "filterFather" && father != ""){
			this.ajaxGetCategories(father)
			catego = ""
			subcat = ""
		}

		if(input == "filterCategory" && catego != ""){
			this.ajaxGetSubCategories(catego)
			subcat = ""
		}


		if(father != "" || catego != "" || subcat != "" ||name != "" ){
			$.ajax({
				url:this.props.routes.filterProducts,
        headers:{'X-CSRF-TOKEN': this.props.token},
				type:"POST",
				data:{father:father,catego:catego,subcat:subcat,name:name},
				dataType:"JSON",
				 beforeSend:function(){
				 	if(name == "" && (father != "" || catego != "" || subcat != "") ){
				 		$("#BlockRequestAjax").fadeIn();
				 	}
				 	if(name != ""){
				 		this.setState({gifFilter:true})
				 	}
				 }.bind(this),
				 success:function(response){
				 	$("#BlockRequestAjax").fadeOut();
				 	this.setState({gifFilter:false})

				 	this.setState({products:response.father,
				 	               next:false,
				 	               prev:false})
				 }.bind(this)
			})
		}
		else{
			$.ajax({
				url:this.props.routes.getProducts,
				type:'POST',
        headers:{'X-CSRF-TOKEN': this.props.token},
				dataType:'JSON',
				 beforeSend:function(){
				 	$("#BlockRequestAjax").fadeIn();
				 }.bind(this),
				 success:function(response){
				 	$("#BlockRequestAjax").fadeOut();
				 	this.setState({products:response.products,
				 	               prev:response.prev})
				 }.bind(this)
			})
		}
	}

	//maneja el onClick de el boton prev
	handlerPrev(ev){
		ev.preventDefault()
		var date  = ev.target.getAttribute('data-position'),
		    order = ev.target.getAttribute('data-order')

		$.ajax({
			url:this.props.routes.nextPrev,
			type:"POST",
			dataType:"JSON",
			data:{date:date,order:order},
			 beforeSend:function(){

			 }.bind(this),
			 success:function(response){
			 	this.setState({products:response.products,
			 	               prev:response.prev,
			 	               next:response.next})
			 }.bind(this)
		})
	}

	//elimina un producto de la lista de Productos
	dellProduct(id){
		products = []
		this.state.products.forEach( product =>{
			if(product.id != id) products.push(product)
		})

		this.setState({products:products});
	}

  componentDidMount(){

    this.fatherModel.getFatherCategories( data => {
      this.setState({fatherCategories:data})
    })

    var el = document.getElementById('tabsProducto')
    var instance = M.Tabs.init(el, {swipeable : false});
    this.props.setTitleModule("Ecommerce") //pone el titulo a la barra superior
  }

	render(){
		return(<div className="row">
      				<div className="col s12 p-0">
                <ul className="tabs z-depth-2" id="tabsProducto">
                    <li className="tab col s3"><a href="#tProducts" className="active"> Productos</a></li>
                    <li className="tab col s3"><a href="#tCreateProduct">Crear producto</a></li>
                </ul>
        			</div>
              <div id="tProducts" className="col s12">
                  <div className="panel-body">

                      <div className="row">

                          <div className="col m12 m-b">
                            <div className="row">
                              <div className="col m3">
                                <select className="browser-default" name="filterFather" id="filterFather" onChange={this.filter}>
                                  <option value="">Categoria padre</option>
                                  {this.renderOptFatherCategories()}
                                </select>
                              </div>

                              <div className="col m3">
                                <select className="browser-default" name="filterCategory" id="filterCategory" onChange={this.filter}>
                                  <option value="">Categoria</option>
                                  {this.renderOptCategories()}
                                </select>
                              </div>

                              <div className="col m3">
                                <select className="browser-default" name="filterSubCate" id="filterSubCate" onChange={this.filter}>
                                  <option value="">Subcategoria</option>
                                  {this.renderOptSubCategories()}
                                </select>
                              </div>

                              <div className="col m3">
                                <div className="row">
                                  <div className="col s8">
                                    <input type="text" className="input form-control" name="filterName" id="filterName" onChange={this.filter}/>
                                  </div>
                                  <div className="col s4">
                                      <button type="button" id="btn-ir" className="waves-effect waves-light btn">
                                        <i className="material-icons right">search</i>
                                      </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>

                          <ProducPanel products={this.state.products}
                                       defaultImg={this.props.defaultImg}
                                       showModalEdit={this.showModalEdit}
                                       showModalView={this.showModalView}
																			 showModalDelete={this.showModalDelete}/>

                          <div className="col m12 m-t">
                              <div className="col-md-4 col-md-offset-5">
                               {this.state.next == true ? <button className="btn btn-default" data-order="next" data-position={this.state.products[0]["created_at"]} onClick={this.handlerPrev}>{"<"}</button> : ""}
                               {this.state.prev == true ? <button className="btn btn-default" data-order="prev" data-position={this.state.products[this.state.products.length - 1]["created_at"]} onClick={this.handlerPrev}>></button> : ""}
                              </div>
                          </div>

                      </div>

                  </div>
              </div>
              <div id="tCreateProduct" className="col s12">
                  <div className="panel-body">
                      {this.renderAForm()}
                  </div>
              </div>

      			<ModalEdit fatherCategories={this.state.fatherCategories}
                         routeGetCategories={this.props.routes.getCategories}
                         routeGetSubCategories={this.props.routes.getSubCategories}
                         routeProductsOfAccessory={this.props.routes.productsOfAccessory}
                         routeQuitTag={this.props.routes.routeQuitTag}
                         routeGetBrands={this.props.routes.getBrands}
                         quitProductOfAccessory={this.props.routes.quitProductOfAccessory}
                         quitAccessoryOfProduct={this.props.routes.quitAccessoryOfProduct}
                         getAccessories={this.props.routes.getAccessories}
                         maxUpload={this.props.maxUpload}
                         submitForm={this.submitEdit}
                         defaultImg={this.props.defaultImg}
                         routeSubmit={this.props.routes.storage}
                         routeUpImge={this.props.routes.storageImage}
                         productEdit={this.state.productEdit}
                         pageFormEdit={this.state.pageFormEdit}
                         routeEditImg={this.props.routes.routeEditImg}
                         finishUpdate={this.finishUpdate}
                         routeDeleteImg={this.props.routes.deleteImg}
                         token={this.props.token}
                         tagModel={this.tagModel}
                         subCategory={this.subCategory}
                         categoryModel={this.categoryModel}
                         brandModel={this.brandModel}
                         productModel={this.productModel}
                         onChipAdd={this.onTagAdd}
                         onChipDelete={this.onTagDelete}
                         />


            <ModalViewProduct product={this.state.productDetail}/>
						<ModalDelete product={this.state.productDelete}
												 productModel={this.productModel}
												 dellProduct={this.dellProduct}/>
  			   </div>)
	}

}

//Componente para mostrar los productos
//Props: products       -> object    Productos a mostrar
//       defaultImg     -> string    ruta de la imagen default
//       showModalEdit  -> function
//       showModalDelete -> funcion   muestra el modal de confirmar eliminar producto
//       showModalView  -> funcion    muestra el modal de productos
class ProducPanel extends React.Component
{
	buildProducts(){
		var productos  = [],
		    iteracion  = 1,
		    row        = [];

		this.props.products.forEach( product => {

			row.push(<Produt product={product}
                       defaultImg={this.props.defaultImg}
                       key={"content-product"+product.id}
                       showModalEdit={this.props.showModalEdit}
											 showModalDelete={this.props.showModalDelete}
                       showModalView={this.props.showModalView}/>)

			iteracion++;
			if(iteracion == 5){
				productos.push(<div className="row" key={"rowProduct-"+iteracion+"-"+product.id}>{row}</div>)
				iteracion = 1
				row = []
			}
		})

		if(iteracion <= 4){ //si no se completo la fila
			productos.push(<div className="row" key={"rowProduct-"+iteracion+"-lastIncomplete"}>{row}</div>)
		}


		return productos
	}


	render(){
		return(<div>
          		{this.buildProducts()}
           </div>)
	}
}



//tarjeta de un producto
//props: product        -> object    Información del producto
//       defaultImg     -> string    Ruta de la imagen default
//       showModalEdit  -> function
//       showModalDelete -> funcion  muetsra el model de confirmar eliminar producto
//       showModalView  -> funcion   muestra el modal de detalles
class Produt extends React.Component
{
	componentDidMount(){
		$('#full-height-scroll-'+this.props.product.id).slimscroll({
	  		height: '100%'
	  	})
	}

	render(){
		var images = this.props.product.type == "product" ? "shop_images" : "shop_accessoryimages";
		return(<div className="col m3">
                <div className="card">
                    <div className="card-image">
                      <img className="responsive-img" src={this.props.product[images].length > 0 ? this.props.product[images][0].route : this.props.defaultImg}/>
                      <span className="card-title">
                        <a className="product-name modal-trigger" href="#modalViewProduct" data-id={this.props.product.id} onClick={this.props.showModalView}> {this.props.product.name}</a>
                      </span>
                      <a className="btn-floating halfway-fab waves-effect waves-light red modal-trigger" href="#modalViewProduct" data-id={this.props.product.id} onClick={this.props.showModalView}>
                        <i className="material-icons" data-id={this.props.product.id}>add</i>
                      </a>
                    </div>
                    <div className="card-content">
                      <span className="product-price">
                          <small className="text-muted">{this.props.product.shop_subcategory.shop_category.shop_fathercategory.name+" / "+this.props.product.shop_subcategory.shop_category.name+" / "+this.props.product.shop_subcategory.name}</small>
                          <br></br>
                          ${helper.formatoNumero(this.props.product.price)}<br></br>

                          <div className="m-t text-righ">
                              <a className="waves-effect waves-light btn modal-trigger" data-id={this.props.product.id} onClick={this.props.showModalEdit} href="#modalEditProduct"><i className="material-icons" data-id={this.props.product.id}>edit</i></a>
															<a className="waves-effect waves-light btn modal-trigger red derken-1" data-id={this.props.product.id} onClick={this.props.showModalDelete} href="#modalDeleteProduct"><i className="material-icons" data-id={this.props.product.id}>delete</i></a>
                        </div>
                      </span>
                    </div>
                </div>
           </div>)
	}
}






/**
*Formulario de creación de productos
*       Props:
*       @prop {array} fatherCategories         ->            Contiene las categorias padre de la base de datos
*       @prop {string} routeGetCategories       ->           Ruta donde se hara la petición ajax que retorne las categorias de una supercategoria
*       @prop {string} routeGetSubCategories    ->           Rota donde se hacen las peticiones ajax para traer las subcategorias de una categoria
*       @prop {string} routeProductsOfAccessory ->           Ruta donde se hacen las peticiones d elos productos para el accesorio que se este creando
*       @prop {string} routeQuitTag             ->           Ruta donde se hacen la peticiones ajax para quitar un tag a un producto o accesorio en edición
        @prop {string} routeGetBrands           ->           Ruta para peticiones de marcas
*       @prop {string} quitProductOfAccessory   ->           Ruta donde se hacen las peticiones ajx para eliminar un producto que se le asigno a un accesorio
*       @prop {string} quitAccessoryOfProduct   ->           Ruta doince se hacen la petciones post-ajax para quitar un accesorio a un producto
*       @prop {string} getAccessories           ->           Ruta para traer los accesorios
*       @prop {int} maxUpload                  ->              Numero de carga maxima de archivos al servidor
*       @prop {string} defaultImg               ->           Ruta de la imagen por defaulr
*       @prop {string} idFieldDescription       ->           id del campo de descripcion
*       @prop {string} idFielTags               ->           id de el select de tags
*       @prop {string} idAccesories             ->           id del select de accesories
*       @prop {string} idSelectCategory         ->           id del select de categorias
*       @prop {string} idProductsOfAccesories   ->           id del select multiple de productos
*       @prop {string} formId                   ->           id del formulario
*       @prop {string}  switchShowPriceId        ->           id del switch mostrar precio
*       @prop {string} switchMoreTagsId         ->           id del switch para agregar mas tags
*       @prop {string} switchAccessory          ->           id del switch que define si es un accesorio
*       @prop {string} switchHaveAccesories     ->           id del switch que que presunta si el producto tiene accessorios
*       @prop {string} editOrCreate             ->           indica si se debe comportar como que tipo de formulario
*       @prop {object||null} productEdit        ->     Informacion del producto a editar
*       @prop {string}  token                   ->           token de la app Laravel
*       @prop {function} onChipAdd              -> callback cuando se agrega un tag al input de nuevos tags
*       @prop {function} onChipDelete           -> callback cuando se elimina un tag del input de nuevos tags
*       @prop {instance} categoryModel     -> instancia del controlador de categorias
*       @prop {instance} tagModel          -> instancia de el controlador de tags
*       @prop {instance} brandModel        -> instancia del controlador de marcas
*       @prop {instance} productModel      -> instancia del controlador de productos
*/
class FormCreate extends React.Component
{
	constructor(props){
		super(props)
		this.state = {'type'                 : this.props.productEdit != null ? this.props.productEdit.type : "",
		              'valueFathercate'      : this.props.productEdit != null && this.props.editOrCreate == "edit" ? this.props.productEdit.shop_subcategory.shop_category.shop_fathercategory.id : "",  //el valor del value del delect de father category
		              'fatherModel'       : "",  //el id de la categoria padre seleccionada, cuando cambie, genera un llamado ajax para contruir sus categorias
		              'otherFather'          : false, //si es true renderiza un input para poner una categoria padre
		              'categories'           : [],
		              'valCategory'          : "", //el valor selecionado para el select categoria
		              'otherCategory'        : false, //si es true renderiza un input para poner otra categoria
		              'subcategories'        : [], //los option de subcategorias, cuando se seleccione una categori, se realiza una petición ajax que establece este estado
		              'valsubcategory'       : "", //valor que tomara la subcategoria,
		              'otherSubCategory'     : false, //si es true renderiza un campo para establecer una nueva subcategoria
		              'otherBrand'           : false, //si es true renderiza un input para establecer otra marca
		              'valueTags'            : [],
		              'tags'                 : [], //los tags del producto a editar, al establecerlos aqui se renderizan como tags y permite eliminarlos
		              'moreTags'             : false, //si es tur muestra un input para agregar tags
		              'valMoreTags'          : false, //el estado del checkbox-switch de agregar más tags
		              'valueMetaDescription' : this.props.productEdit != null && this.props.editOrCreate == "edit" ? this.props.productEdit.meta_description : "",
		              'valueName'            : "", //nombre del producto, valor del value
		              'valueDescription'     : "",
		              'valueMarca'           : "",
		              'valuePrice'           : "",
		              'valueCheckPrice'      : false,
		              'valAccessory'         : false, //value que indica si el producto es un accesorio
		              'productEditId'        : "", //id del producto a ser editado
		              'valHaveAccessory'     : false, //indica si tiene accesorrios el producto
		              'valueAccesories'      : [],
		              'accessories'          : [], //donde se estableceran los accesorios de una categoria
		              'productsToAccesory'   : [], //productos para mostrar en el select (cuando se esta creando un accesorio se muestran productos de la categoria para elegir a cuales le sirve este accesorio)
		              'currentCategory'      : "", //aca se establece el id de la categoria seleccionada
		              'renderProductsAttach' : false, //si es true renderiza los productos que se le han añadido al accesorio, debe estar en el formulario de edicion
		              'shop_products'        : [], //donde se pondran los productos relacionados con un accesorio
		              'shop_accessories'     : [], //los accesorios de un producto, permite renderizar los tags, para poder eliminarlos
                  selects                : {},
                  selectsInstances       : {},
                  brands                 : [], //marcas
                  allTags                : [], //tags de la base de datos se setea haciendo una petición
		             };

		  this.handlerChangeFatherCategory  = this.handlerChangeFatherCategory.bind(this) //funcion que maneja el onChange del input #createProductFatherCategory para mostrar el campo de otra categoria padre
	    this.handlerChangeCategory        = this.handlerChangeCategory.bind(this) //maneja el onCHange del select de categorias
	    this.handlerChangeSubCategory     = this.handlerChangeSubCategory.bind(this) //maneja en onChange del select de subcategorias
	    this.handlerChangeBrand           = this.handlerChangeBrand.bind(this) //maneja el onChange del select de marcas
	    this.handlerChangeMoreTags        = this.handlerChangeMoreTags.bind(this) //maneja el onCHange del option más tags
	    this.handlerChangeMetaDescription = this.handlerChangeMetaDescription.bind(this)
	    this.handlerChangeName            = this.handlerChangeName.bind(this) //maneja el onChange de input nombre
	    this.handlerChangePrice           = this.handlerChangePrice.bind(this) //maneja el onChange del input de precio

	    this.handlerChangeHaveAccessory   = this.handlerChangeHaveAccessory.bind(this) //maneja el onClick del switch que indica si el producto tiene accesorios
	    this.ajaxDeleteProductOfAccessory = this.ajaxDeleteProductOfAccessory.bind(this) //maneja peticiones ajax para quitar un producto que se le asigno a un accesorio
      this.ajaxQuitTag                  = this.ajaxQuitTag.bind(this) //realiza peticiones ajax-post para eliminar un tag de un producto o accesorio
	    this.ajaxQuitAccessory            = this.ajaxQuitAccessory.bind(this) //realiza peticiones post-ajax para quitar un accesorio de un producto
	}

  /**
  * Realiza una petición post que le retorna las marcas
  */
  getBrands(){
    var opts = {headers: {'Accept': 'application/json',
                           'Content-Type': 'application/json',
                           'X-CSRF-TOKEN': this.props.token},
                method:'POST'};

    fetch(this.props.routeGetBrands, opts)
      .then( res => res.json() )
      .then( data => {this.setState({brands: data.brands})} )
      .catch(e => console.error(`[request] ${this.props.routeGetBrands}`) )
  }

  /**
  *Pide los tags y los establece en el state
  */
  getTags(){
    this.props.tagModel.getTags( data=>{
      this.setState({allTags:data});
    })
  }

	//maneja el onChange del input #createProductFatherCategory si este es otro, muestra
	//cambia el state 'otherFather' por true para mostrar el  input que permite  agregar
	//una  nueva  categoria  padre;  Si  no  es  otro  toma su value y lo pasa al metodo
	//this.ajaxGetCategories(id)
	handlerChangeFatherCategory(ev){
		var optSelected = ev.target.value
		if(optSelected != "otro" && optSelected != ""){ //si el valor seleccionano no es "otro" o ninguno
			this.ajaxGetCategories(optSelected)//realixamos el llamado ajax que cambia las categorias
		}
		else{
			this.setState({categories:[],
			               subcategories:[]})
		}

		this.setState({'valueFathercate' : optSelected,
			             'otherFather'     : optSelected == "otro" ? true : false,
	                 'valCategory'     : optSelected == "otro" ? "otro" : "",
	                 'otherCategory'   : optSelected == "otro" ? true : false,
	                 'otherSubCategory': optSelected == "otro" ? true : false});
	}

	//evalua el state otherFather, si es true,retorna un input, para establecer el nombre
	//de la nueva categoria padre
	inputOtherFatherCategory(){
		if( this.state.otherFather ){
			return  <div className="row m-t-xs">
                <div className="input-field col s12">
                      <input name="nuevaCategoriaPadreCrearProducto" id="createProductNewFatherCategory" type="text" className="validate" required />
                      <label htmlFor="nuevaCategoriaPadreCrearProducto">Nombre categoria padre</label>
    						</div>
              </div>
		}
	}

  //renderiza el select de categoria
  renderSelectCategory(){
    if(!this.state.otherFather){
      console.log(`[debug] renderizar categorias, state.categories: ${this.state.categories.length}`);
      return <div className="row m-t-xs">
              <div className="input-field col s12">
                <select className="browser-default" name="categoriaCrearProducto" id={this.props.idSelectCategory} value={this.state.valCategory} onChange={this.handlerChangeCategory}>
                  <option value="" disabled defaultValue>Categoria</option>
                  {this.state.categories}
                  <option value="otro">Otra categoria</option>
                </select>
              </div>
        	  </div>
    }
  }

	//retorna un array con los <options> por cada una de las categorias padres en la base de datos
	renderOptionsFatherCategories(){
		var opts = [];
		this.props.fatherCategories.forEach( father => {
			opts.push(<option value={father.id} key={"optFatherCategory-"+father.id}>{father.name}</option>)
		})
		return opts
	}

	/**
  * hace una peticion post que retorna las categorias de una categoriPadre
  * crea los option y los establece en el state.categories, generando un re-render
  * @param {int} id //id de la categoria padre.
  * @return {void} realisa un setState que genera una actualización el los selects de categorias
  */
	ajaxGetCategories(id){
    var opts = [];
    this.props.categoryModel.getCategories(id, data => {
      data.forEach( cate => {
        opts.push(<option value={cate.id} key={"categoryOpt-"+cate.id}>{cate.name}</option>)
      })
      this.setState({categories:opts,
                     subcategories:[]})
    });
	}

	//maneja el onCHange del input de categorias
	handlerChangeCategory(ev){
		var sel = ev.target.value
		if(sel != "" && sel != "otro"){
			this.ajaxGetSubcategories(sel)
			this.setState({currentCategory:sel})
		}
		else{
			this.setState({subcategories:[]})
		}
		this.setState({'otherCategory': sel == "otro" ? true : false,
	                   'valCategory'  : ev.target.value,
	                   'otherSubCategory': sel == "otro" ? true : false});
	}

	//hace un llamado ajax, para cargar las subcategorias
	ajaxGetSubcategories(id){
    console.log(`[debug] subcategorias en FormCreate`);
    this.props.subCategory.getSubcategories(id, data=>{
      var opts = []
      data.forEach( sub =>{
        opts.push(<option value={sub.id} key={"optSubCat-"+sub.id}>{sub.name}</option>)
      })
      this.setState({subcategories:opts})
    })
	}

	//evalua el state otherCategory, si es true,retorna un input, para establecer el nombre
	//de la nueva categoria
	toggleInputOtherCategory(){
		if( this.state.otherCategory ){
			return <div className="row m-t-xs">
                <div className="input-field col s12">
                  <input placeholder="Nombre categoria" type="text" className="validate" name="nuevaCategoriaCrearProducto" id="createProductNewCategory" required/>
                  <label htmlFor="nuevaCategoriaCrearProducto">Nombre categoria</label>
                </div>
  				   </div>
		}
	}

	//maneja el onChange del select de subcategorias
	handlerChangeSubCategory(ev){
		var sel = ev.target.value
		this.setState({'otherSubCategory' : sel == "otro" ? true : false,
	                   'valsubcategory'   : ev.target.value});
	}

	//muestra el select de subcategoria
	renderSelectSubCategory(){
		if(!this.state.otherCategory){
			return <div className="row m-t-xs">
    						<div className="input-field col s12">
    							<select className="browser-default" value={this.state.valsubcategory} name="subCategoriaCrearProducto" id="createProductSubCategory" onChange={this.handlerChangeSubCategory}>
    								<option value="" disabled defaultValue>Sub-categoria</option>
    								{this.state.subcategories}
    								<option value="otro">Otro</option>
    							</select>
    						</div>
    					</div>
		}
	}

	//evalua el state otherSubCategory, si es true,retorna un input, para establecer el nombre
	//de la nueva sub-categoria
	toggleInputOtherSubCategory(){
		if( this.state.otherSubCategory ){
			return <div className="row m-t-xs">
  						<div className="input-field col s12">
                <input className="validate" name="nuevaSubCategoriaCrearProducto" id="createProductNewSubCategory" required/>
  							<label className="active" htmlFor="nuevaSubCategoriaCrearProducto">Nombre sub-categoria</label>
  						</div>
  				   </div>
		}
	}

	//maneja el onChage del texttarea meta descripciomn
	handlerChangeMetaDescription(ev){
		var val = ev.target.value
		this.setState({valueMetaDescription:val})
	}

	//renderizar los options de marcas
	renderOptionsBrands(){
		var opts = []
		this.state.brands.forEach( brand => {
      if(this.state.valueMarca == brand.id){
          opts.push(<option value={brand.id} key={"optBrand-"+brand.id} defaultValue >{brand.name}</option>)
      }
      else{
          opts.push(<option value={brand.id} key={"optBrand-"+brand.id}>{brand.name}</option>)
      }

		})
		return opts
	}

	//maneja el onChange del select de marcas
	handlerChangeBrand(ev){
		var sel = ev.target.value
		this.setState({otherBrand: sel == "otra" ? true : false,
	                   valueMarca: sel})

	}

	//renderiza un input para agregar una nueva marca si el state otherBrand es true
	toogleNewBrand(){
		if(this.state.otherBrand){
			return <div className="row m-t-xs">
						<div className="input-field col s12">
              <input className="form-control" name="nombreMarcaCrearProducto" id="createProductNewBrand" required/>
							<label htmlFor="nombreMarcaCrearProducto" className="active">Nueva marca</label>
						</div>
					</div>
		}
	}

	//renderiza los options de los tag
	buildOptsTags(){
		var opt = []
		this.state.allTags.forEach(tag => {
			opt.push(<option value={tag.id} key={"tagOpt-"+tag.id}>{tag.name}</option>)
		})
		return opt
	}

	//maneja el onChange del option agregar tags
	handlerChangeMoreTags(ev){
		var opt = document.getElementById(this.props.switchMoreTagsId),
		    sel = opt.checked
		this.setState({moreTags: sel,
		               valMoreTags : sel})
	}

	//maneja el onChange del input del nombre del del producto
	handlerChangeName(ev){
		var name = ev.target.value
		this.setState({valueName:name})
	}

	//maneja el onChange del input precio
	handlerChangePrice(ev){
		var val = ev.target.value
		this.setState({valuePrice:val})
	}

	//renderiza un input para agregar más tags
	toogleMoreTags(){
		if(this.state.moreTags){
			return <InputTag onChipAdd={this.props.onChipAdd}
                       onChipDelete={this.props.onChipDelete}/>
		}
	}

	//retorna un input con el id del producto a editar en caso de ser establecido como el formulario de edicion
	renderInputId(){
		if(this.props.editOrCreate == "edit"){
			return <input type="hidden" name="editProduct_id" id="editProduct_id" value={this.state.productEditId} required/>
		}
	}

	//retorna el switch para seleccionar si mostar el producto o no
	renderSwitchShowProduct(){
		if(this.props.editOrCreate == "edit"){
			return <div className="row m-t-xs">
                <div className="col s12">
                  <label>Mostrar producto: </label>
                  <div className="switch">
                    <label>
                      { /*Off*/}
                      <input type="checkbox" name="mostrarProducto" id="switchShowProdutEdit"/>
                      <span className="lever"></span>
                      { /*On*/}
                    </label>
                  </div>
                </div>
              </div>
		}
	}

	//maneja el onChange del switch que establece si el producto tiene accesorios
	handlerChangeHaveAccessory(ev){
		var opt = document.getElementById(this.props.switchHaveAccesories),
		    sel = opt.checked
		this.setState({valHaveAccessory : !sel})
	}

	//renderiza un input oculto en caso de ser el formulario de edición, para indicar si es un producto o un accesorio
	renderInputType(){
		if(this.props.editOrCreate == "edit"){
			return <input type="hidden" defaultValue={this.state.type} id="editTypeElement" name="editTypeElement"/>
		}
	}

	//realiza peticiones ajax para eliminar un tag de un producto
	ajaxQuitTag(ev){
		ev.preventDefault()
		var tag = ev.target.getAttribute('data-id')
    this.props.productModel.dellTag(this.state.productEditId,tag, (response) =>{
      if(response.detach){
        this.setState({tags:response.tags})
      }
    });
	}

	//renderiza los tags de un producto o accesorio, para permitir quitarlos
	renderTags(){
		if(this.state.tags.length > 0){ //si hay tags, los renderizamos
			var tags = [];
			this.state.tags.forEach( tag =>{
				tags.push(<Tag key={"liTag-"+tag.id} id={tag.id} name={tag.name} ajaxQuitTag={this.ajaxQuitTag} />)
			})

			return tags
		}
	}

	//realiza peticiones post-ajax para eliminar un producto que se le asigno a un accesorio
	ajaxDeleteProductOfAccessory(ev){
		ev.preventDefault()
		var product = ev.target.getAttribute('data-id')
		$.ajax({
			url:this.props.quitProductOfAccessory,
			type:"POST",
			data:{product_id:product,accessory_id:this.state.productEditId},
			dataType:"JSON",
				beforeSend:function(){

				}.bind(this),
				success:function(response){
					if(response.detach){
						this.setState({shop_products: response.shop_products})
					}
				}.bind(this)
		})
	}

	//realiza peticiones post-ajax para eliminar un accesorio que se le asigno a un producto
	ajaxQuitAccessory(ev){
		ev.preventDefault()
		var accessory = ev.target.getAttribute('data-id')
		$.ajax({
			url:this.props.quitAccessoryOfProduct,
			type:"POST",
			data:{product_id:this.state.productEditId,accessory_id:accessory},
			dataType:"JSON",
				beforeSend:function(){

				}.bind(this),
				success:function(response){
					if(response.detach){
						this.setState({shop_accessories: response.shop_accessories})
					}
				}.bind(this)
		})
	}

  /**
  * Inicializa los selects de materialize
  */
  initSelects(){
    this.state.selects = document.querySelectorAll('select');
    this.state.selectsInstances = M.FormSelect.init(this.state.selects, {});
  }

	componentDidMount(){

    this.getBrands() //cargar las marcas

    //obtener los tags para renderizarlos en el select de tags
    this.props.tagModel.getTags( data=>{
      this.setState({allTags:data});
      setTimeout( ()=>{ //Una espera a que se rendericen los opts
        this.initSelects(); ////inicializar los selects de materialize
      },500)
    })

    this.props.brandModel.getBrands( data=>{
      this.setState({brands:data})
      setTimeout( ()=>{ //Una espera a que se rendericen los opts
        this.initSelects(); //inicializar los selects de materialize
      },500)
    })

    M.updateTextFields();



		//:::::::::::::Sumernote:::::::::::::::::::
		$('#'+this.props.idFieldDescription).summernote({
			minHeight: 200,
			lang: 'es-ES',
			disableDragAndDrop: true,
			toolbar: [
						// [groupName, [list of button]]
						// ['Paragraph style',['style']],
						 ['style', ['bold', 'italic', 'underline', 'clear']],
						// ['Font Style',['fontname','fontsize','color']],
						// ['para', ['ul', 'ol', 'paragraph']],
						 //['insert',['link','video','table']],
						]
		});

		helper.ponerPuntosEnNumeros()
	}

	componentWillReceiveProps(nextProps){
		if(nextProps.productEdit != null && nextProps.editOrCreate == "edit"){
		   var tags = []
		       //acce = document.getElementById('editAccesory')

		   this.ajaxGetCategories(nextProps.productEdit.shop_subcategory.shop_category.shop_fathercategory.id) //traer las categorias de la categoria padre
		   this.ajaxGetSubcategories(nextProps.productEdit.shop_subcategory.shop_category.id) //traer las subcategorias

		   nextProps.productEdit.shop_tags.forEach( tag => {
		   	 tags.push(String(tag.id));
		   })

		   this.setState({'type'                 : nextProps.productEdit.type,
		   				        'otherFather'          : false,
                      'otherCategory'        : false,
                      'otherSubCategory'     : false,
                      'valueFathercate'      : nextProps.productEdit.shop_subcategory.shop_category.shop_fathercategory.id, //el valor del value del delect de father category
		                  'valCategory'          : nextProps.productEdit.shop_subcategory.shop_category.id, //categoria del producto, establecerlo en el select
		                  'currentCategory'      : nextProps.productEdit.shop_subcategory.shop_category.id,
		                  'valsubcategory'       : nextProps.productEdit.shop_subcategory.id, //subcategoria del producto
		                  'valueMetaDescription' : nextProps.productEdit.meta_description, //descripcion meta
		                  'valueTags'            : tags,
		                  'tags'                 : nextProps.productEdit.shop_tags, //los tags del producto a editar, esto los renderiza como etiquetas y permite eliminarlos
		                  'valueName'            : nextProps.productEdit.name,
		                  'valueDescription'     : nextProps.productEdit.description,
		                  'valueMarca'           : nextProps.productEdit.shop_brand_id,
		                  'valuePrice'           : helper.formatoNumero(nextProps.productEdit.price),
		                  'valueCheckPrice'      : nextProps.productEdit.showprice == "si" ? true : false,
		                  'productEditId'        : nextProps.productEdit.id,
		                  'shop_products'        : nextProps.productEdit.shop_products,
		                  'shop_accessories'     : nextProps.productEdit.type == "product" ? nextProps.productEdit.shop_accessories : [], //accessorios del producto
		                 })

		   if(nextProps.productEdit.type == "accessory" && nextProps.productEdit.shop_products.length > 0){
		   		this.setState({'valAccessory'         : true,
		   	                   'renderProductsAttach' : true});
		   }else{
		   		this.setState({'valAccessory' : false});
		   }

		   if(nextProps.productEdit.type == "product" && nextProps.productEdit.shop_accessories.length > 0){
		   	    this.setState({'valHaveAccessory':true});
		   }
		   else{
		   		this.setState({'valHaveAccessory':false});
		   }


		   document.getElementById('switchShowProdutEdit').checked = nextProps.productEdit.showproduct == "si" ? true : false;
		   $('#'+this.props.idFieldDescription).summernote('code', nextProps.productEdit.description); //mostrar la descripcon en el summernote

		}
	}

	render(){
    var brandOptTitle;

    if(this.props.editOrCreate == "edit"){
      brandOptTitle = <option value="" disabled >Marca</option>
    }
    else{
      brandOptTitle = <option value="" disabled defaultValue>Marca</option>
    }

    if(this.state.tags.length > 0){ //si hay tags, los renderizamos
			var tags = [];
			this.state.tags.forEach( tag =>{
				tags.push(<Tag key={"liTag-"+tag.id} id={tag.id} name={tag.name} ajaxQuitTag={this.ajaxQuitTag} />)
			})
		}

		return(<form id={this.props.formId} onSubmit={this.props.submitForm} encType="multipart/form-data">
    				<div className="row">
    					<div className="col s12 m4">

    						{this.renderInputType()}

    						<div className="row">
                    <div className="input-field col s12">
                       <select className="browser-default" name="categoriaPadreCrearProducto" id="createProductFatherCategory" value={this.state.valueFathercate} onChange={this.handlerChangeFatherCategory}>
                         <option value="" disabled defaultValue>Categoria padre</option>
                         {this.renderOptionsFatherCategories()}
                         <option value="otro">Otro</option>
                       </select>
                    </div>
    						</div>

    						{this.inputOtherFatherCategory()}

                {this.renderSelectCategory()}

    						{this.toggleInputOtherCategory()}

    						{this.renderSelectSubCategory()}

    						{this.toggleInputOtherSubCategory()}

    						<div className="row m-t-xs">
    							<div className="input-field col s12">
    								<textarea className="materialize-textarea" name="metaDescripcionCrearProducto" id="createProductDescriptionMeta" value={this.state.valueMetaDescription} onChange={this.handlerChangeMetaDescription} required></textarea>
                    <label htmlFor="metaDescripcionCrearProducto" className={ this.props.editOrCreate == "edit" ? "active" : ""} >Meta descripción</label>
                </div>
    						</div>

                <div>
    						    { tags }
                </div>

    						<div className="row m-t-xs">
    							<div className="input-field col s12">
    								    <select className="" multiple id={this.props.idFielTags} name="tagsCrearProducto[]" defaultValue={this.state.valueTags} >
    						            {this.buildOptsTags()}
    						        </select>
                        <label htmlFor="metaDescripcionCrearProducto">Tags:</label>
    							</div>
    						</div>

    						<div className="row m-t-xs">
    							<div className="col s12">
    								<label>Agregar tags: </label>
                    <div className="switch">
                      <label>
                        { /*Off*/}
                        <input type="checkbox" name="crearTagsCrearProducto" id={this.props.switchMoreTagsId} defaultChecked={this.state.valMoreTags} onClick={this.handlerChangeMoreTags}/>
                        <span className="lever"></span>
                        { /*On*/}
                      </label>
                    </div>
                  </div>
    						</div>

    						{this.toogleMoreTags()}


    					</div>

    					<div className="col s12 m8">

    						<div className="row m-t-xs">
    							<div className="input-field col s12">
    								<input name="nombreCrearProducto" id="createProductName" value={this.state.valueName} onChange={this.handlerChangeName} required/>
                    <label htmlFor="createProductName" className="active">Nombre</label>
                  </div>
    						</div>

    						<div className="row m-t-xs">
    							<div className="col s12">
    								<textarea name="descripcionCrearProducto" id={this.props.idFieldDescription} required></textarea>
                    <label htmlFor={this.props.idFieldDescription}></label>
    						</div>
    						</div>

    						<div className="row m-t-xs">
    							<div className="input-field col s12">
                    <select className="browser-default" name="marcaCrearProducto" id="createProductMarca" value={this.state.valueMarca} onChange={this.handlerChangeBrand}>
    									{brandOptTitle}
    									{this.renderOptionsBrands()}
    									<option value="otra">Otra</option>
    								</select>
    							</div>
    						</div>

    						{this.toogleNewBrand()}

    						<div className="row m-t-xs">
    							<div className="input-field col s12">
                    <i className ="material-icons prefix">attach_money</i>
                    <input className="form-control ponerPuntos" name="precioCrearProducto" id={this.props.editOrCreate == "create" ? "createProductPrice" : "editProductPrice"} value={this.state.valuePrice} onChange={this.handlerChangePrice} required/>
                    <label className="active" htmlFor={this.props.editOrCreate == "create" ? "createProductPrice" : "editProductPrice"}>Precio</label>
                  </div>
    						</div>

    						{this.renderInputId()}
    						{this.renderSwitchShowProduct()}

    					</div>

    				</div>
    				<div className="row m-t">
    					<div className="col-md-12">
    						<input type="submit" className="btn btn-primary pull-right" value="Guardar"/>
    					</div>
    				</div>
			   </form>)
	}
}



/**
* Tag de un producto
*@prop {int} id //id del tag
*@prop {string} name //nombre a mostrar
*@prop {function} ajaxQuitTag //evento que se ejuta cuando se clikea la x
*/
class Tag extends React.Component
{
  render(){
    return(<div className="chip">
                  {this.props.name}
                  <i className="material-icons" data-id={this.props.id} onClick={this.props.ajaxQuitTag} style={closeX}>close</i>
           </div>)
  }
}





class TagInput extends React.Component
{
	componentDidMount(){
		$('#createProductAgregarTags').tagsinput();
	}

	render(){
		return(<div className="row m-t-xs">
					<div className="col-md-12">
						<select multiple data-role="tagsinput" className="form-control" name="agregarTagsCrearProducto[]" id="createProductAgregarTags" tabIndex="-1"></select>
					</div>
				</div>)
	}
}

//props: idAccesories   ->  string   Id del select
//       category       ->  int      Id de la categoria en la cual buscar los accesorios
//       getAccessories ->  string   Ruta donde se hacen las peticiones ajax de los accesorios
class AccessoriesInput extends React.Component
{
	constructor(props){
		super(props)
		this.state = {  accessories     : [],
			            valueAccesories : [],
			            category        : this.props.category,
					 }
	}

	//realiza llamados ajax para cargar los option de accesorios
	ajaxGetAccessories(){
		if(this.state.category != "" && this.state.category != "otro"){
			$.ajax({
				url:this.props.getAccessories,
				type:"POST",
				data:{category:this.state.category},
				dataType:"JSON",
				 beforeSend:function(){

				 }.bind(this),
				 success:function(response){
				 	var opt = []
					response.accessories.forEach( accessory => {
						opt.push(<option value={accessory.id} key={"optAccessory-"+accessory.id}>{accessory.name}</option>)
					})
				 	this.setState({accessories:opt});
				 	this.refreshSelect()
				 }.bind(this)
			})
		}
		else{
			helper.showMessage("error","Selecciona una categoria","Debes seleccionar una categoria para cargar los accesorios")
		}
	}


	refreshSelect(){
			$('#'+this.props.idAccesories).trigger("chosen:updated")
	}

	componentDidMount(){
		//::::::::::::::::::::Chosen select:::::::::::::::::::::::::::::
		$("#"+this.props.idAccesories).chosen({width: "100%"})
		this.ajaxGetAccessories()

		//poner listener al onchange
		$("#"+this.props.idAccesories).chosen().change( () =>{
			var tag = $("#"+this.props.idAccesories).val()
			console.log("ejecutado", tag)
			this.setState({valueAccesories:tag})
		});
	}

	componentWillReceiveProps(nextProps){
		this.setState({category:nextProps.category})
		this.ajaxGetAccessories()
	}

	render(){
		return(<div className="row m-t-xs">
						<div className="col-md-12">
							<label htmlFor="selectAccessoriesCrearProducto">Accesorios:</label>
							<select id={this.props.idAccesories} name="AccessoriesProducto[]" defaultValue={this.state.valueAccesories} className="chosen-select" data-placeholder="Selcciona los accesorios" multiple>
					            {this.state.accessories}
					        </select>
						</div>
					</div>)
	}
}

//props: idProductsOfAccesories   -> string  Id del select multiple
//       idSelectCategory         -> string  Id del select de categorias
//       routeProductsOfAccessory -> string  Ruta donde se hacen las peticiones de los productos
//       category                 -> int     Id de la categoria, de donde se tomaran los productos
class ProductsOfAccessory extends React.Component
{
	constructor(props){
		super(props)
		this.state = {products        : [],
		              valueProducts   : [],
		              category        : this.props.category}
	}

	//realiza peticiones post-ajax para cargar los productos de esat categorio
	ajaxGetProductsOfAccesory(){
		if(this.state.category != "" && this.state.category != "otro"){
			$.ajax({
				url:this.props.routeProductsOfAccessory,
				type:"POST",
				data:{category:this.state.category},
				dataType:"JSON",
				 beforeSend:function(){

				 }.bind(this),
				 success:function(response){
				 	var opt = []
				 	response.productsToAccesory.forEach( product => {
				 		opt.push(<option value={product.id} key={"optProduct-"+product.id}>{product.name}</option>)
				 	})
				 	this.setState({products:opt})
				 	this.refreshSelect()
				 	//this.setState({products:response.productsToAccesory});
				 }.bind(this)
			})
		}
		else if(this.state.category == "" ){
			helper.showMessage("error","Selecciona una categoria","Debes seleccionar una categoria para cargar los productos")
		}

		return false;
	}

	refreshSelect(){
			$('#'+this.props.idProductsOfAccesories).trigger("chosen:updated")
	}

	componentDidMount(){
		$("#"+this.props.idProductsOfAccesories).chosen({width: "100%"})
		this.ajaxGetProductsOfAccesory()

		//poner listener al select multiple de productos que al que pertenece el accesorio
		$("#"+this.props.idProductsOfAccesories).chosen().change( () =>{
			var tag = $("#"+this.props.idProductsOfAccesories).val()
			this.setState({valueProducts:tag})
		});
	}

	componentWillReceiveProps(nextProps){
		//console.log("entre aca")
		var sel = document.getElementById(nextProps.idProductsOfAccesories)
		if(sel){
			//console.log("y existe")
			this.setState({category:nextProps.category})
			this.ajaxGetProductsOfAccesory()
		}
	}

	render(){
		return(<div className="row m-t-xs">
					<div className="col-md-12">
						<label htmlFor="selectAccessoriesCrearProducto">Asignar productos:</label>
						<select id={this.props.idProductsOfAccesories} name="ProductosDeAccesorio[]" defaultValue={this.state.valueProducts} className="chosen-select" data-placeholder="Selcciona los productos" multiple>
				            { this.state.products }
				        </select>
					</div>
				</div>)
	}
}

//formulario para agregar imagenes a un producto
class FormImages extends React.Component
{
	constructor(props){
		super(props)

		this.state = {'fieldsPic'     :['input-0'], //cundo se agrega un nuevo elemnto a este array, igulmente se renderizaran inputs para fotos
	                'showBtnFinish' :false, //si es true renderiza un boton para
	               }

	    this.appendInputPic   = this.appendInputPic.bind(this) //maneja el onClik de el boton que agrega campos para poner más fotos
	    this.deleteFieldInput = this.deleteFieldInput.bind(this) //se encarga de eliminar un input de foto
	    this.showBtnFinish    = this.showBtnFinish.bind(this) //establee el state showBtnFinish en true
	}

	//maneja el evento del clic al boton quitar foto,
  //recorre  la variable de estado fieldsPic y quita el indice de la fila seleccionada
  deleteFieldInput(e){
    	e.preventDefault()
    	var fila    = e.target.getAttribute('data-row'),
    	    letRows = []

    	this.state.fieldsPic.forEach( (field) => {
            if(field.indexOf(fila) == -1){
            	letRows.push(field)
            }
    	})

    	this.setState({fieldsPic:letRows})
    }

    //muestra el boton de finalizar cuando se termine de subir una foto
    renderBtnFinish(){
    	if(this.state.showBtnFinish){
    		return <button className="btn btn-default pull-right" onClick={this.props.finishCreate}>Finalizar</button>
    	}
    }

    //establece el state showBtnFinish en true
    showBtnFinish(){
    	this.setState({showBtnFinish:true});
    }

    //agrega un elemnto al state fieldsPic, y renderiza inputs de acuerdo a la cantidd de elemntos de este state

	appendInputPic(ev) {
		ev.preventDefault()
		if(this.state.fieldsPic.length < this.props.maxUpload){
			var newInput = (this.state.fieldsPic.length == 0) ? "input-0" : "input-"+(parseInt(this.state.fieldsPic[this.state.fieldsPic.length - 1].substring(6))+1)
            this.setState({ fieldsPic: this.state.fieldsPic.concat([newInput]) });
		}
		else{
			helper.showMessage("warning","Cantidad maxima de archivos alcanzada","Has alcanzado la cantidad maxima de archivos permitidas para cargar por el servidor")
		}

        return false;
    }

	render(){
		return(<form>
			    <div className="row m-t-xs">
					{this.state.fieldsPic.map(input => <RowInputPic row={input}
						                                            deleteFieldInput={this.deleteFieldInput}
						                                            key={input}
						                                            defaultImg={this.props.defaultImg}
						                                            routeSubmit={this.props.routeSubmit}
						                                            routeDeleteImg={this.props.routeDeleteImg}
						                                            productCreated={this.props.productCreated}
						                                            showBtnFinish={this.showBtnFinish}
						                                            update={false}
                                                        token={this.props.token}
						                                            imgId={false}
                                                        productModel={this.props.productModel}/>)}

					<div className="col-md-12">
						<button className="btn btn-default pull-right" onClick={this.appendInputPic}>Agregar foto</button>
						{this.renderBtnFinish()}
					</div>


				</div>
			   </form>)
	}
}

//props : row                   -> string      Se usa para contruir ids unicos
//        deleteFieldInput      -> funcion     Para quitar una imagen
//        defaultImg            -> string      Ruta a la imagen por defecto
//        routeSubmit           -> string      Ruta donde se hace la peticion ajax que se encarga de almacenar la imagen
//        routeDeleteImg        -> string      Ruta a la que se hara la peticion ajax para eliminar una imagen
//        productCreated        -> int         Id del producto al qiue perteneceran las imagenes editadas aqui
//        showBtnFinish         -> funcion     Debe encargar se de mostrar un boton para terminar de editar foto y volver al formulario 1
//        update                -> boolean     True si es para editar una foto.
//        imgId                 -> int||bool   id de la imagen a editar, si no es un update se le pasa false
//        token                 -> string      token para poder realizar peticiones ajax a laravel
class RowInputPic extends React.Component
{
	constructor(props){
		super(props)

		this.state = { src : this.props.defaultImg,
			             options:{aspectRatio: 1 / 1,
  			                    viewMode: 1,
        						        dragMode: 'move',
        						        autoCropArea: 0.65,
        						        restore: false,
        						        guides: true,
        						        highlight: true,
        						        cropBoxMovable: true,
        						        cropBoxResizable: false,
        						        preview: "#preview-img-"+this.props.row},
                   			 		image : this.props.row,
					        }

			this.deleteImg 				= this.deleteImg.bind(this)
			this.fileInput 				 = React.createRef();
			this.changeImage 			 = this.changeImage.bind(this)
			this.uploadImg 				 = this.uploadImg.bind(this)
			this.updateBarProgress = this.updateBarProgress.bind(this)
			this.finishUpload 		 = this.finishUpload.bind(this)
			this.finishWhirError   = this.finishWhirError.bind(this)
	}

	//retorna un boton de eliminar si, esta en modo edicion
	renderBtnDelete(){
		if(this.props.update){
			return <button className="btn btn-danger" onClick={this.deleteImg} >Eliminar</button>
		}
	}

	//eliminar image
	deleteImg(ev){
		ev.preventDefault()
		$.ajax({
			url:this.props.routeDeleteImg,
			type:"POST",
			data:{producto_id:this.props.productCreated,img_id:this.props.imgId},
			dataType:"JSON",
			 beforeSend:function(){

			 }.bind(this),
			 success:function(response){
			 	if(response.deleted){

			 	}
			 	else{
			 		response.errors.forEach( error => {
			 			helper.showMessage("error","Algo salió mal",error)
			 		})
			 	}
			 }.bind(this)
		})
	}

	componentDidMount(){
		var $inputImage = $("#inputImage-"+this.props.row)

        if (window.FileReader) {

        }
        else
        {
              $inputImage.addClass("hide");
        }
	}

	/**
	 * actualiza la barra de progreso de imagenes
	 * @param {object} evt
	 */
	updateBarProgress(evt){
		var percent = (evt.loaded / evt.total) * 100;
		var width = Math.round(percent)+'%'
		console.log(`[debug] send img: ${width}`);
		document.getElementById("barProgress"+this.props.row).style.width = width;
	}

	finishUpload(response){
		if(response.saved){
			helper.showMessage("success","Imagen guardada","Imagen guardada")
			this.props.showBtnFinish();
		}
		else{
			document.getElementById("barProgress"+this.props.row).style.width = 0;
			response.errors.forEach( error => {
				helper.showMessage("error","Algo salió mal",error)
			})
		}
	}

	finishWhirError(){
		document.getElementById("barProgress"+this.props.row).style.width = width;
		helper.showMessage("error","Algo salió mal","La carga de la imagen falló")
	}

	uploadImg(e){
		e.preventDefault()

		if (typeof this.cropper.getCroppedCanvas() === 'undefined') {
			console.log(`[debug] cropImage: no existe`)
      return;
		}

		this.cropper.getCroppedCanvas().toBlob(blob => {
							var formData = new FormData();

    				  formData.append('croppedImage', blob);
    				  formData.append('producto_id', this.props.productCreated);

    				  if(this.props.update){
    				  	formData.append('img_id',this.props.imgId);
    				  }

							if(this.props.update){
								  console.log(`[debug] estoy actualizando la imagen`)
									this.props.productModel.editImg(formData, this.updateBarProgress, this.finishUpload, this.finishWhirError)
							}
							else{
								console.log(`[debug] creando una nueva imagen`)
									this.props.productModel.saveImg(formData, this.updateBarProgress, this.finishUpload, this.finishWhirError)
							}
		})
	}

	changeImage(e){
		e.preventDefault()
		let file = e.target.files;
		console.log(`[debug] file: ${file}`,file.length, file[0])
		console.log(`[debug] e.target: ${e.target}`,e.target)
		//console.log(`[debug] this.fileInput.current.files[0].name: ${this.fileInput.current.files[0].name}`,this.fileInput.current.files[0].name)
		const reader = new FileReader();

    reader.onload = () => {
      this.setState({ src: reader.result });
		};

    reader.readAsDataURL(file[0]);
	}

	render(){
			 return(
				 			<div className="row">
							 		<div className="col s12 m8">
									 <Cropper ref={cropper => { this.cropper = cropper; }}
														src={this.state.src}
														style={{height: 400, width: '100%'}}
														preview={"#grap"+this.props.row}
														// Cropper.js options
														aspectRatio={1 / 1}
														viewMode={1}
														dragMode="move"
														guides={true}
														highlight={true}
														cropBoxMovable={true}
														cropBoxResizable={false}
														 />
									 </div>
									 <div className="col s12 m4">
											<div id={"grap"+this.props.row} style={cropperPreview}></div>

											<div className="btn-group m-t-xs m-b-xs">
														{this.renderBtnDelete()}
														<label title="Upload image file" htmlFor={"inputImage-"+this.props.row} className="btn btn-primary">
															<input type="file" accept="image/*" name="file" id={"inputImage-"+this.props.row} ref={this.fileInput} className="hide" onChange={this.changeImage}/>
															Selecionar imagen
														</label>


													<button className="btn btn-primary" id={"btnLoad-"+this.props.row} onClick={this.uploadImg}>Cargar <i className="fa fa-upload" aria-hidden="true"></i></button>
											</div>
											<div className="progress">
												<div className="determinate" id={"barProgress"+this.props.row} style={startProgressBar}></div>
											</div>
									 </div>
							</div>)
    }
}





//modal para editar un producto
class ModalEdit extends React.Component
{
	constructor(props){
		super(props)
		this.closeModal = this.closeModal.bind(this)
	}

	renderAForm(){
		if(this.props.pageFormEdit == "first"){
			return  <FormCreate fatherCategories={this.props.fatherCategories}
                          routeGetCategories={this.props.routeGetCategories}
                          routeGetSubCategories={this.props.routeGetSubCategories}
                          routeProductsOfAccessory={this.props.routeProductsOfAccessory}
                          routeGetBrands={this.props.routeGetBrands}
                          quitProductOfAccessory={this.props.quitProductOfAccessory}
                          quitAccessoryOfProduct={this.props.quitAccessoryOfProduct}
                          routeQuitTag={this.props.routeQuitTag}
                          getAccessories={this.props.getAccessories}
                          maxUpload={this.props.maxUpload}
                          submitForm={this.props.submitForm}
                          defaultImg={this.props.defaultImg}
                          routeSubmit={this.props.routeSubmit}
                          idFieldDescription="editarDescripcion"
                          idFielTags="editProductTags"
                          idAccesories="editProductSelectAccessories"
                          idSelectCategory="editProductCategory"
                          idProductsOfAccesories="editProductSelectProducts"
                          formId="formEditProduct"
                          switchShowPriceId="editShowPrice"
                          switchMoreTagsId="editAddMoreTags"
                          switchAccessory="editAccesory"
                          switchHaveAccesories="editHaveAccesories"
                          editOrCreate="edit"
                          productEdit={this.props.productEdit}
                          token={this.props.token}
                          tagModel={this.props.tagModel}
                          subCategory={this.props.subCategory}
                          categoryModel={this.props.categoryModel}
                          brandModel={this.props.brandModel}
                          productModel={this.props.productModel}
                          onChipAdd={this.props.onChipAdd}
                          onChipDelete={this.props.onChipDelete}/>
		}
		else{
			return <FormEditImages productEdit={this.props.productEdit}
			                       routeEditImg={this.props.routeEditImg}
			                       defaultImg={this.props.defaultImg}
			                       routeSubmit={this.props.routeUpImge}
                             token={this.props.token}
			                       routeDeleteImg={this.props.routeDeleteImg}
                             productModel={this.props.productModel}/>
		}
	}

  closeModal(){
		this.props.finishUpdate();
    var instance = M.Modal.getInstance(document.getElementById('modalEditProduct'));
    instance.close();
  }

	renderBtnFinish(){
		if(this.props.pageFormEdit == "second"){
	        return <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={this.closeModal}>Finalizar</button>
		}
	}

	componentDidMount(){
    var elems = document.querySelectorAll('.modal');
    var instances = M.Modal.init(elems, {onCloseStart:this.props.finishUpdate});

		var finishUpdate = this.props.finishUpdate
	}

	render(){
		return(<div id="modalEditProduct" className="modal modal-xl">
              <div className="mod-content">

				        <h4 className="modal-title" id="exampleModalLabel">Editar producto {this.props.productEdit != null ? this.props.productEdit.name : ""}</h4>

                {this.renderAForm()}

              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-default" data-dismiss="modal" onClick={this.closeModal}>Cancelar</button>
				        {this.renderBtnFinish()}
              </div>
            </div>)
	}
}

/**
*Modal de confiermación para eliminar un producto
* @param {object} product //producto a eliminar
* @param {productModel} productModel //modelo para peticiones a productos
* @param {function} dellProduct //quita el producto eliminada
*/
class ModalDelete extends React.Component{
	constructor(props){
		super(props)
		this.closeModal = this.closeModal.bind(this)
		this.deleteProduct = this.deleteProduct.bind(this)
	}

	closeModal(){
    var instance = M.Modal.getInstance(document.getElementById('modalDeleteProduct'));
    instance.close();
  }

	deleteProduct(){
		var {productModel, product, dellProduct} = this.props;
		productModel.desactivate(product.id)
			.then(data => { if(data.deleted){
												dellProduct(product.id)
												this.closeModal();
												helper.showMessage("info","Eliminado","Producto eliminado")
										  }
										})
			.catch(console.error(`[DEBUG] error en la petición`));
	}

	render(){
		return(<div id="modalDeleteProduct" className="modal">
              <div className="mod-content">

			        <h4 className="modal-title" id="exampleModaDelete">¿Eliminar {this.props.product != null ? this.props.product.name : ""}?</h4>

              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-default" data-dismiss="modal" onClick={this.closeModal}>Cancelar</button>
				        <button type="button" className="btn btn-default red darken-1" data-dismiss="modal" onClick={this.deleteProduct}>Eliminar</button>
              </div>
            </div>)
	}
}




//formulario para editar las fotos de un producto
//props: productEdit         -> object    Informacion del producto a editar
//       routeEditImg        -> string    Ruta ajax donde se manejara la actualizacion de la imagen
//       defaultImg          -> string    Ruta de la imagen por defecto
//       routeSubmit         -> string    Ruta para subir nuevas imagenes
//       token               -> string    Token para realizar peticiones ajax
//       routeDeleteImg      -> string   ruta para eliminar imagen
//       productModel   -> Product controlador de productos
class FormEditImages extends React.Component
{
	constructor(props){
		super(props)
		this.state = {fieldsPic   :[],
		              shop_images :(this.props.productEdit.type == "product")?this.props.productEdit.shop_images:this.props.productEdit.shop_accessoryimages}

		this.appendInputPic   = this.appendInputPic.bind(this) //maneja el onClik de el boton que agrega campos para poner más fotos
	    this.deleteFieldInput = this.deleteFieldInput.bind(this)
	    this.showBtnFinish    = this.showBtnFinish.bind(this)
	}

	 //agrega un elemnto al state fieldsPic, y renderiza inputs de acuerdo a la cantidd de elemntos de este state
	appendInputPic(ev) {
		ev.preventDefault()
		var newInput = (this.state.fieldsPic.length == 0) ? "inputEditAdd-0" : "inputEditAdd-"+(parseInt(this.state.fieldsPic[this.state.fieldsPic.length - 1].substring(13))+1)
        this.setState({ fieldsPic: this.state.fieldsPic.concat([newInput]) });

        return false;
    }

	buildImage(){
		var images     = [],
		    iteracion  = 1,
		    row        = [];

		this.props.productEdit.shop_images.forEach( product => {

			row.push()

			iteracion++;
			if(iteracion == 5){
				images.push(<div className="row" key={"rowProduct-"+iteracion+"-"+product.id}>{row}</div>)
				iteracion = 1
				row = []
			}
		})

		return images
	}

	deleteFieldInput(){

	}

	showBtnFinish(){

	}

	componentWillReceiveProps(nextProps){

		this.setState({shop_images:(nextProps.productEdit.type == "product")?nextProps.productEdit.shop_images : nextProps.productEdit.shop_accessoryimages})
	}

	renderFieldsImges(){
		var render = []
		this.state.shop_images.forEach( img => {

			render.push(<RowInputPic row={"inputEdit-"+img.id}
                               deleteFieldInput={this.deleteFieldInput}
                               key={"inputEdit-"+img.id}
                               defaultImg={img.route}
                               routeSubmit={this.props.routeEditImg}
                               routeDeleteImg={this.props.routeDeleteImg}
                               productCreated={this.props.productEdit.id}
                               showBtnFinish={this.showBtnFinish}
                               update={true}
                               token={this.props.token}
                               imgId={img.id}
                               productModel={this.props.productModel}/>)
		})
		return render
	}

	render(){
		return(<div className="row">

			 	    {this.renderFieldsImges()}

			 	    {this.state.fieldsPic.map(input => <RowInputPic row={input}
						                                            deleteFieldInput={this.deleteFieldInput}
						                                            key={input}
						                                            defaultImg={this.props.defaultImg}
						                                            routeSubmit={this.props.routeSubmit}
						                                            routeDeleteImg={this.props.routeDeleteImg}
						                                            productCreated={this.props.productEdit.id}
						                                            showBtnFinish={this.showBtnFinish}
						                                            update={false}
                                                        token={this.props.token}
						                                            imgId={false}
                                                        productModel={this.props.productModel}/>)}

			 		<div className="col-md-12">
						<button className="btn btn-default pull-right" onClick={this.appendInputPic}>Agregar foto</button>

					</div>
			 	</div>)
	}
}




/**
* Modal que muestra la información de un producto
* @prop {object} product objeto con la infomación del producto a mostrar
*/
class ModalViewProduct extends React.Component
{
  constructor(props){
      super(props)

      this.state = { fotos : []}
  }

  componentDidMount(){
    var elems = document.querySelectorAll('.modal');
    var instances = M.Modal.init(elems, {});
	}

  /**
  * Renderiza los tags del producto
  * @return {array} un array con los tags
  */
  renderTags(){
    var tags = []
    this.props.product.shop_tags.forEach( tag => {
      tags.push(<div className="chip" key={tag.name}>{tag.name}</div>)
    })
    return tags;
  }

  componentWillReceiveProps(nextProps){
    console.log(`[debug] recibi nuevos props ${nextProps}`, nextProps);
    console.log(`[debug] nextProps.product.shop_images = ${nextProps.product.shop_images}`, nextProps.product.shop_images);
    let carrousel = []
    if(nextProps.product.shop_images){
      nextProps.product.shop_images.forEach( image => {
        carrousel.push(<a className="carousel-item" key={image.route}><img src={image.route}/></a>)
        console.log(`[debug] foto ruta: ${image.route}`);
      })
      this.setState({fotos:carrousel})
    }
  }

  render(){
		return(<div id="modalViewProduct" className="modal modal-xl">
              <div className="mod-content">

				        <h4 className="modal-title center-align" id="viewproduct">{this.props.product.name}</h4>
                <div className="row">
                  <div className="col s12 m6">

                    <Carousel fotos={this.props.product.shop_images}/>

                  </div>
                  <div className="col s12 m6">
                      <small className="text-muted">{this.props.product.shop_subcategory.shop_category.shop_fathercategory.name+" / "+this.props.product.shop_subcategory.shop_category.name+" / "+this.props.product.shop_subcategory.name}</small>
                      <br/>
                      {this.props.product.meta_description}
                      <br/>
                      <div dangerouslySetInnerHTML={{__html: this.props.product.description}}></div>
                      <br/>
                      {this.renderTags()}
                      <br/>
                      {this.props.product.shop_brand.name}
                      <br/>
                      ${helper.formatoNumero(this.props.product.price)}
                </div>
                </div>
              </div>
              <div className="modal-footer">

              </div>
            </div>)
	}
}

/**
* Componente, Carousel con las fotos del producto
* @prop {array} fotos //array con las fotos del producto
*/
class Carousel extends React.Component
{
  renderImgs(){
    var renderimg = []
    if(this.props.fotos){
      this.props.fotos.forEach( img => {
        renderimg.push(<a className="carousel-item" key={img.route}><img src={img.route}/></a>)
      })
    }

    return renderimg;
  }

  componentDidMount(){

  }

  componentWillReceiveProps(nextProps){
    setTimeout( () => {
      var elemCar = document.querySelectorAll('#carouselProduct');
      var instanceCar = M.Carousel.init(elemCar,{indicators:true})
    }, 1000);
  }

  render(){
    return(<div className="carousel" id="carouselProduct">
              {this.renderImgs()}
           </div>)
  }
}




/**
 * Componente para crear tags
 * @prop {function} onChipAdd //callback que se ejecuta cuando se agrega un tag
 * @prop {function} onChipDelete // callback que se ejecuta cuando de elimina un tag
 */
 class InputTag extends React.Component
 {
   componentDidMount(){
     //:::::::::::::Tags:::::::::::::::::::::::::
     var inputTag = document.querySelectorAll('.chips');
     var inputTagInstance = M.Chips.init(inputTag, {placeholder:"agregar tags",
                                                    secondaryPlaceholder:"+ tag",
                                                    onChipAdd: this.props.onChipAdd,
                                                    onChipDelete: this.props.onChipDelete});
   }

   render(){
     return(<div className="chips" id="newTags"></div>)
   }
 }

export default Ecommerce
