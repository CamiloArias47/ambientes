/**
 * @fileoverview Modelo para manejo de usuarios
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

class User{

    /** @constructor */
  constructor(token, routes){
    /**
   * establece las rutas de peticiones y el token
   * @param {string} token
   * @param {string} routes //rutas para peticiones
   */
    this.opts =  {headers: {'Accept': 'application/json',
                           'Content-Type': 'application/json',
                           'X-CSRF-TOKEN': token},
                 method:'POST'}

    this.routes = routes;

    /**
   * Realiza una petición para obtener la información del usuario logeado
   */
    this.getUser = new Promise( (resolve, reject) => {
        fetch(this.routes.getuser, this.opts)
            .then(res => res.json() )
            .then(data => resolve(data) )
            .catch(e => reject(e) )
    })
  }

  
  
                    
    
}

export default User