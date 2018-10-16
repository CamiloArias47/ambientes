/**
 * @fileoverview Modelo para el manejo de datos de la categoria padre
 *
 * @version  1.0
 *
 * @author Camilo Arias <CamiloArias47>
 * @copyright null
 * History
 * v1.0 – inicial
 * ----
 * Creo que el modelo debe conocer las rutas y no se le deben pasar por el contructor
*/
class FatherCategory
{

  /** @constructor */
  constructor(token, routes){
    /**
   * se establewce el token y la ruta para obtener categorias padre
   * @param {string} token
   *@param {string} routes //ruta que responde con las categorias padre
   */
    this.opts =  {headers: {'Accept': 'application/json',
                           'Content-Type': 'application/json',
                           'X-CSRF-TOKEN': token},
                 method:'POST'}

    this.routes = routes;
  }

  /**
  *realiza una petición para cargar las categorias padres
  */
  getFatherCategories( callback ){

    fetch(this.routes.getFatherCat, this.opts)
      .then( res => res.json() )
      .then( data => { callback(data.fathercategories) })
      .catch(e => console.error(`[request] ${this.routes.getFatherCat}`) )
  }

}

export default FatherCategory
