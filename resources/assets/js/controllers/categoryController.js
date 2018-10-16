/**
 * @fileoverview Controllador para categorias
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
import Category from '../models/categoryModel.js'

class CategoryController
{
  /** @constructor */
  constructor(token, routes){
   /**
   * se establece el token y la ruta para obtener categorias
   * @param {string} token
   * @param {object} routes //rutas para peticiones
   */
    this.token  = token
    this.routes = routes
    this.category = new Category(token, routes);
  }

  /**
  *Pide al modelo un array con las categorias
  *@param {int} id //id de la categoria padre de la que se quiere obtener las categorias
  *@param {function} callback //callback a la que se le pasaran las categorias
  */
  setCategories( id, callback ){
    this.category.getCategories( id, data => {  callback(data) })
  }

}

export default CategoryController
