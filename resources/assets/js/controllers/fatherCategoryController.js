/**
 * @fileoverview Conteollador para el manejo de las categorias padre
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
import FatherCategory from '../models/fatherCategoryModel.js'

class FatherCategoryController
{
  /** @constructor */
  constructor(token, routes){
    /**
   * se establece el token y la ruta para obtener categorias padre
   * @param {string} token
   * @param {object} routes //rutas para peticiones
   */
    this.token = token
    this.routes = routes
    this.fatherCategory = new FatherCategory(token, routes);
  }

  /**
  *Pide al modelo las categorias padres
  *@param {function} callback //callback a la que se le pasaran las categorias padre
  */
  setfatherCategoriesOptions( callback ){
    this.fatherCategory.getFatherCategories( data => {  callback(data) })
  }

}

export default FatherCategoryController
