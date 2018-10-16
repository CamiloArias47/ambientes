/**
 * @fileoverview controlador para el manejo de marcas
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

import Brand from '../models/marcaModel.js'

class BrandController
{
  /**@constructor*/
  constructor(token, routes){
    /**
    *establece el token para poder realizar peticiones a laravel y lasrutas de peticiones
    * @param {string} token
    * @param {object} routes
    */

    this.token = token
    this.routes = routes
    this.brand = new Brand(token, routes)
  }

  /**
  *pide al modelo las marcas y las fetorna
  * @param {function} callback
  */
  getBrands( callback){
    this.brand.getBrands( data=>{
      callback(data)
    })
  }

}

export default BrandController
