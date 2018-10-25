'use strict';

module.exports = class Helpers {

	constructor()
	{
		//this.showMessage = this.showMessage.bind(this)
		this.monthString      = {0:"enero",1:"febrero",2:"marzo",3:"abril",4:"mayo",5:"junio",6:"julio",7:"agosto",8:"septiembre",9:"octubre",10:"noviembre",11:"diciembre"}
		this.monthShortString = {0:"ene",1:"feb",2:"mar",3:"abr",4:"may",5:"jun",6:"jul",7:"ago",8:"sep",9:"oct",10:"nov",11:"dic"}
	    this.dayString        = {0:"domingo",1:"lunes",2:"martes",3:"miércoles",4:"jueves",5:"viernes",6:"sabado"}
	}

    //Muestra alertas toast.tr
	//showMessage(type,title,message) -> void "Genera un mensaje en pantalla tipo toast"
	//type                            =  string ['success','error','warning','info'] "Tipo de mensaje"
	//title                           =  string "Titulo de la alerta"
	//message                         =  string "Mensaje que se mostrara en la alerta"
	showMessage(type,title,message){
		setTimeout(function() {
			var html = message;
						if(type == "error"){
							var html = '<span style="color:#ef5350;">'+message+'</span>'
						}
						M.toast({html: html})
        }, 1000);
	}


	//retorna un string de una parte de la url, si se le pasa "id" buscara el strng siguiente del = en la url
	//getParameterByUrlName(name) -> string
	//name                        == string
	//ejemplo: url: www.decorplantasforestal.com/cotizaciones?id=23
	//        getParameterByUrlName("id") -> "23"
	getParameterByUrlName(name) {
	    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
	    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
	    results = regex.exec(location.search);
	    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));

	    // console.log(this.getParameterByUrlName('cotizacion_id')) how work
	    // https://es.stackoverflow.com/questions/445/c%C3%B3mo-obtener-valores-de-la-url-get-en-javascript
	}



	//pone listeners tipo change y keyup a los inputs con class "ponerPuntos" y lo que hace es separar
	//el número con puntos.
	ponerPuntosEnNumeros()
	{
		    var message = this.showMessage //meter la fincion en una variable para poder usarla dentro de formatInputNumber()

			var formatearNumero = function formatInputNumber()
		    {
		      var invalid = false,
		          num     = this.value.replace(/\./g,''),
		          numArr  = num.split('')

              if(numArr[0] == '-'){
              	if(numArr.length > 1 && isNaN(num)){
              		invalid = true
              	}else{
              		numArr.shift()
		      		num = numArr.join('')
		      		num = num.toString().split('').reverse().join('').replace(/(?=\d*\.?)(\d{3})/g,'$1.');
		            num = num.split('').reverse().join('').replace(/^[\.]/,'');
		            this.value = '-'+num;
              	}
              }else{
              	if(!isNaN(num)){
			    	num = num.toString().split('').reverse().join('').replace(/(?=\d*\.?)(\d{3})/g,'$1.');
			        num = num.split('').reverse().join('').replace(/^[\.]/,'');
			        this.value = num;
			    }else{
			    	invalid = true
			    }
              }

              if(invalid){
              	message('error','Invalido','No es un numero valido')
              	if(numArr[0] == '-'){
              		var value = this.value.replace(/[^\d\.]*/g,'');
              		this.value = '-'+value
              	}else{
              		this.value = this.value.replace(/[^\d\.]*/g,'');
              	}
              }

		    }

		  //quitar los listener de este tipo en los inputs existentes, para evitar que se agrege otro listener de este tipo
		  $( ".ponerPuntos" ).unbind( "change.ponerPuntosEnNumeros" );
		  $( ".ponerPuntos" ).unbind( "keyup.ponerPuntosEnNumeros" );

		  //agregar los listener
		  $(".ponerPuntos").on('change.ponerPuntosEnNumeros',formatearNumero)
		  $(".ponerPuntos").on('keyup.ponerPuntosEnNumeros',formatearNumero)
	}

	//pone puntos en las centenas
	//aplica para mostrar numeros como pesos.
	formatoNumero(nStr) {
	    nStr += '';
	    var x = nStr.split('.');
	    var x1 = x[0];
	    var x2 = x.length > 1 ? ',' + x[1] : '';
	    var rgx = /(\d+)(\d{3})/;
	    while (rgx.test(x1)) {
	            x1 = x1.replace(rgx, '$1' + '.' + '$2');
	    }
	    return x1 + x2;
	}

	//retorna una fecha tipo "viernes 23 junio 2017" dada una fecha javascript new Date()
	//toDateColombiaString(date) -> string
	//date                       == Date
	toDateColombiaString(date){
		var diaSemana = this.dayString[date.getDay()],
		    mes       = this.monthString[date.getMonth()]
		return diaSemana+" "+date.getDate()+" "+mes+" "+date.getFullYear()
	}

	//retorna una fecha tipo julio 31 2017
	//toDateColombiaShortString(date) -> string format 'julio 31 2017'
	//date                            == string format="2017-12-31"
	toDateColombiaShortString(date){
		var dateSplit = date.split('-')
		return this.getFullMonthName(dateSplit[1]-1)+" "+dateSplit[2]+" "+dateSplit[0]
	}

	//retorna una fecha tipo -> "ago 22 2017"
	//toDateColombiaExtraShortString(date) -> string format 'ago 22 2017'
	//date                                 == string format="2017-12-31"
	toDateColombiaExtraShortString(date){
		var dateSplit = date.split('-')
		return this.getShortMonthName(dateSplit[1]-1)+" "+dateSplit[2]+" "+dateSplit[0]
	}

	//retorna las tres primeras letras del nombre de un mes
	//getShortMonthName(month) -> string ["ene","feb","mar","abr","may","jun","jul","ago","sep","oct","nov","dic"]
	//month                    == int [0,1,2,3,4,5,6,7,8,9,10,11]
	//0 = "ene"
	getShortMonthName(month)
	{
		return this.monthShortString[month]
	}

	//retorna el nombre completo de un mes
	//getFullMonthName(month) -> string ["enero","febrero","marzo","abril","mayo","junio","julio","agosto","septiembre","octubre","noviembre","diciembre"]
	//month                    == int [0,1,2,3,4,5,6,7,8,9,10,11]
	//0 = "enero"
	getFullMonthName(month)
	{
		return this.monthString[month]
	}


	//cambia de lugar los valores de un array,
	//swapArrayIndices(myArr, indexOne, indexTwo) -> array
	//myArr                                       == array   Array que se desea modifica
	//indexOne                                    == int     Numero de indice, donde se movera el indexTwo
	//indexTwo                                    == int     Pocision donde se movera el indexOne
 	swapArrayIndices(myArr, indexOne, indexTwo){
	  var tmpVal = myArr[indexOne];
	  myArr[indexOne] = myArr[indexTwo];
	  myArr[indexTwo] = tmpVal;
	  return myArr;
	}

    /*
	//algoritmo de ordenamiento borbuja, ordenar lista
	bubbleSort(myArr, sort){
	  var size = myArr.length;

	  for( var pass = 1; pass < size; pass++ ){ // outer loop
	    for( var left = 0; left < (size - pass); left++){ // inner loop
	      var right = left + 1;

	      var objectLeft  = (myArr[left].storage == 'existente')  ? myArr[left].clients[0].name : myArr[left].quotationsnewclients[0].name
	      var objectRight = (myArr[right].storage == 'existente') ? myArr[right].clients[0].name : myArr[right].quotationsnewclients[0].name

	      if(sort == 'asc'){
	      	 if( objectLeft > objectRight ){
		        this.swap(myArr, left, right);
		      }
	      }else{
		  	 if( objectLeft < objectRight ){
		        this.swap(myArr, left, right);
		      }
		  }
	    }
	  }

	  return myArr;
	}
    */

    //crea un listener para los paneles ibox con boton para contrar y expandir
    collapseIbox(){
        $( ".collapse-link" ).unbind( "click.collapseIbox" ); //quitar previos listeneers de este tipo, para que no se carge doble
    	// Collapse ibox function
	    $('.collapse-link').on('click.collapseIbox', function () {
	        var ibox = $(this).closest('div.ibox');
	        var button = $(this).find('i');
	        var content = ibox.find('div.ibox-content');
	        content.slideToggle(200);
	        button.toggleClass('fa-chevron-up').toggleClass('fa-chevron-down');
	        ibox.toggleClass('').toggleClass('border-bottom');
	        setTimeout(function () {
	            ibox.resize();
	            ibox.find('[id^=map-]').resize();
	        }, 50);
	    });
    }

}
