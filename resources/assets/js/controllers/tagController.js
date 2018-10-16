/**
 * @fileoverview Controlador para el manejo de las categorias padre
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
import Tag from '../models/tagModel.js'

class TagController {
  /** @constructor */
  constructor(token, routes) {
    /**
    *@param {string} token //token para peticiones a Laravel
    *@param {object} routes //rutas para peticiones
    */

    this.token = token
    this.routes = routes
    this.tag = new Tag(token, routes)
  }

  /**
  *Obtine los tags
  *@param {function} callback //callback que se ejecuta al final, se le pasa el array con los tags
  */
  getTags( callback){
    this.tag.getTags( data=>{
      callback(data);
    })
  }
}

export default TagController
