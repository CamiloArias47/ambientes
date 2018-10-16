/**
 * @fileoverview Modelo para el manejo de datos de la categoria de productos
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

class Category
{
  /** @constructor */
  constructor(token, routes){
    /**
   * se establewce el token y la ruta para obtener categorias padre
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
  * Realiza una petición por las categorias pertenecientes a una categoria padre
  * @param {int} id //id de la categoria padre
  * @param {function} callback //callback, se le pasa un array con los objetos de categorias
  * @return {void} ejecuta la callback y le pasa el array
  */
	getCategories(id, callback ){
    var opts = [];
		$.ajax({
			type:'POST',
      headers:{'X-CSRF-TOKEN': this.token},
			url:this.routes.getCategories,
			data:{id:id},
			dataType:'JSON',
				beforeSend:function(){

				},
				success:function(response){
					callback(response.categories);
				}
		})
	}
}

export default Category
