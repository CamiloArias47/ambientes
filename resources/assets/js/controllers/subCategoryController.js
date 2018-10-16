/**
 * @fileoverview Controlador para el manejo de las subcategorias
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
import SubCategory from '../models/subCategoryModel.js'

class SubCategoryController
{
  /** @constructor */
  constructor(token, routes){
    /**
   * se establece el token y la ruta para obtener sub-categorias
   * @param {string} token
   * @param {object} routes //rutas para peticiones
   */
    this.token = token
    this.routes = routes
    this.subCategory = new SubCategory(token, routes);
  }

  /**
  *Pide al modelo las sub-categorias
  *@param {int} id //ide de la categoria que se quiere obtener sus subcategorias
  *@param {function} callback //callback a la que se le pasaran las sub-categorias
  */
  getSubcategories(id, callback ){
    this.subCategory.getSubcategories(id, data => {  callback(data) })
  }

}

export default SubCategoryController
