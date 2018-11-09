/**
 * @fileoverview controlador para el manejo de productos
 *
 * @version  1.0
 *
 * @author Camilo Arias <CamiloArias47>
 * @copyright null
 * History
 * v1.0 – inicial
 * ----
 *
*/

import Product from '../models/productModel.js'

class ProductController
{
  /**@constructor*/
  constructor(token, routes){
    /**
    *Establece el token para realizar petiones a Laravel
    *Ëstablece las rutas de peteciones
    */
    this.token = token
    this.routes = routes
    this.product = new Product(token, routes);
  }

  /**
  *Obtiene los productos
  *@param {function} callBack //callback a la que se le entregaran los productos
  */
  getProducts( callBack ){
    this.product.getProducts( data => callBack(data) )
  }

  /**
  * Guarda en un producto en la base de datos
  * @param {FormData} formData //Formulario de creacion de producto
  * @param {function} success //función que se ejecuta cuando responde el servidor con los los datos de respuesta
  */
  saveProduct(formData, success){
    this.product.save(formData, response => {success(response)} )
  }

  /**
  *envia la imagen de un producto
  *@param {Formdata} formData
  *@param {function} progress //funcion que se ejecuta durante el envio
  *@param {function} success //funcion que se ejuta cuando temina el envio dedatos
  *@param {function} error //funcion que se ejecuta en caso de error
  */
  saveImg(formData, progress, success, error){
    this.product.saveImg(formData, (evt)=>{progress(evt)}, (response)=>{success(response)}, ()=>{error()});
  }

  /**
  *Pide al modelo eliminar un tag de un producto
  *@param {int} id //id del producto al que se le quitara el tag
  *@param {int} tag //id del tag que se va a quitar
  *@param {function} success //callbak que se ejecuta cuando el servidor response, se le pasan la respuesta del sevidor
  */
  dellTag(id,tag, success){
    this.product.dellTag(id,tag, response => success(response) )
  }

  /**
  *Pide al modelo editar un producto
  *@param {Formdata} formData //datos a modifica
  *@param {function} success //callback que se ejecuta cuando el servidor responde, se le pasa la respuesta del servior.
  *@return {void} ejecuta una callbak en el success
  */
  edit(formData, success){
    this.product.edit(formData, response => success(response) );
  }

  /**
  *Obtine un producto
  *@param {int} id //id del producto a obtener
  *@param {function} callback //funcion que se ejecuta cuando el servidor responde
  */
  getProduct(id, callback){
    this.product.getProduct(id, data => callback(data));
  }

}

export default ProductController
