/**
 * @fileoverview Modelo para el manejo de ŕpductos
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

class Product
{
  /**@constructor*/
  constructor(token, routes){
    /**
    *@param {string} token //token para realizar peticiones al framework Laravel
    *@param {objet} routes //rutas para peticiones
    */

    this.token = token
    this.routes = routes
    this.opts =  {headers: {'Accept': 'application/json',
                           'Content-Type': 'application/json',
                           'X-CSRF-TOKEN': token},
                 method:'POST'}
  }

  /**
  *Obtine los productos
  *@param {function} callBack //callback a la que se le pasan los productos
  */
  getProducts( callBack ){
    fetch(this.routes.getProducts, this.opts)
      .then( res => res.json() )
      .then( data => callBack(data) )
      .catch( e => console.error(`[request] ${this.routes.getProducts}`) )
  }

  /**
  *Envia los datos para guardar un nuevo producto
  * @param {FormData} formData //Formulario de creacion de producto
  * @param {function} success //función que se ejecuta cuando responde el servidor con los los datos de respuesta
  */
   save(formData, success){
     $.ajax({
 			url:this.routes.storage,
 			type:'POST',
      headers:{'X-CSRF-TOKEN': this.token},
 			data: formData,
 			dataType:"JSON",
 			cache: false,
 			contentType: false,
 			processData: false,
 				beforeSend:function(){
 					console.log(`[debug] enviando formulario...`);
 				},
 				success: function(response){
          success(response)
        }
 		})
   }


   /**
   *envia la imagen de un producto
   *@param {Formdata} formData
   *@param {function} progress //funcion que se ejecuta durante el envio
   *@param {function} success //funcion que se ejuta cuando temina el envio dedatos
   *@param {function} error //funcion que se ejecuta en caso de error
   */
   saveImg(formData, progress, success, error){
     $.ajax({
       url:this.routes.storageImg,
       method: "POST",
       headers:{'X-CSRF-TOKEN': this.token},
       data: formData,
       processData: false,
       contentType: false,
       xhr: function() { //esta funcion permite la comunicación con el servidor durante la carga
           var xhr = new window.XMLHttpRequest();
           xhr.upload.addEventListener("progress", function(evt) {
               if (evt.lengthComputable) {
                   progress(evt);
               }
          }, false);

          return xhr;
       },
       success: function (response) {
         success(response)
       },
       error: function () {
         error()
       }
     });
   }


   /**
   *Hace una petición y envia el id de un producto y el id de un tag, el servidor elimina este tag del producto
   *@param {int} id //id del producto al que se le quitara el tag
   *@param {int} tag //id del tag que se va a quitar
   *@param {function} success //callbak que se ejecuta cuando el servidor response, se le pasan la respuesta del sevidor
   */
   dellTag(id,tag, success){
     $.ajax({
 			url:this.routes.deleteTag,
      headers:{'X-CSRF-TOKEN': this.token},
 			type:"POST",
 			data:{product_id:id, tag_id:tag},
 			dataType:"JSON",
 			 beforeSend:function(){

 			 },
 			 success:function(response){
 				success(response)
 			 }
 		})
   }


}


export default Product
