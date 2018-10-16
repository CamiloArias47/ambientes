/**
 * @fileoverview Modelo para el manejo de marcas
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

class Brand
{
    /**@constructor*/
    constructor(token, routes){
      /**
      * establece el token para que laravel le permita realizar peticiones
      * establece las rutas para hacer peticiones
      * @param {string} token
      * @param {object} routes
      */

      this.token = token
      this.routes = routes
      this.opts =  {headers: {'Accept': 'application/json',
                             'Content-Type': 'application/json',
                             'X-CSRF-TOKEN': token},
                   method:'POST'}
     }

     /**
     *Realiza una petición post que obtine las marcas
     * @param {function} callback //callback se le pasa un array con las marcas
     * @return {void} ejecuta el callback y le pasa las marcas
     */
     getBrands( callback ){
       fetch(this.routes.getBrands, this.opts)
        .then( res => res.json() )
        .then( data => callback(data.brands) )
        .catch(e => console.error(`[request] ${this.routes.getBrands}`) )
     }
}

export default Brand
