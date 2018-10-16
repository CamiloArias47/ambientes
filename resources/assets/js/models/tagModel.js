/**
 * @fileoverview Modelo para el manejo de tags
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
class Tag
{

  /** @constructor */
  constructor(token, routes){
    /**
   * establece las rutas de peticiones y el token
   * @param {string} token
   * @param {string} routes //ruts para peticiones
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
  getTags( callback ){

    fetch(this.routes.getTags, this.opts)
      .then( res => res.json() )
      .then( data => { callback(data.tags) })
      .catch(e => console.error(`[request] ${this.routes.getTags}`) )
  }

}

export default Tag
