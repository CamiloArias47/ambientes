/**
 * @fileoverview Modelo para el manejo de datos de las subcategorias de productos
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

class SubCategory
{
  /** @constructor */
  constructor(token, routes){
    /**
   * se establewce el token y las rutas para peticiones
   * @param {string} token
   *@param {object} routes //rutas para peticiones
   */
    this.token = token
    this.routes = routes

    this.opts =  {headers: {'Accept': 'application/json',
                           'Content-Type': 'application/json',
                           'X-CSRF-TOKEN': token},
                 method:'POST'}
  }

  /**
  * hace un llamado ajax, para cargar las subcategorias de la categoria dada (id)
  * @param {int} id //id de la categoria
  * @param {function} callback //callback, se le pasara el array con las subcategorias
  * @return {void} ejecuta el callback y le pasa el array con las subcategorias pertenecientes a la categoria dada
  */
  getSubcategories(id, callback){
		$.ajax({
			type:'POST',
			url : this.routes.getSubCat,
      headers:{'X-CSRF-TOKEN': this.token},
			data:{id:id},
			dataType:'JSON',
				beforeSend:function(){

				},
				success:function(response)
        {
					callback(response.subcategories)
				}
		})
	}
}

export default SubCategory
