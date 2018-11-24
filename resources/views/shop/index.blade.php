<!DOCTYPE html>
<html lang="es">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title>Ambientes sotenibles</title>
	<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
  <link type="text/css" rel="stylesheet" href="{{asset('assets/plugins/materialize_1/css/materialize.css')}}"  media="screen,projection"/>

	<link rel="stylesheet" type="text/css" href="{{asset('assets/css/shop/main.css')}}">
	<link rel="stylesheet" type="text/css" href="{{asset('assets/css/shop/material-design-iconic-font.min.css')}}">


	<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.2.0/css/all.css">
	<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.2.0/css/v4-shims.css">
  <link rel="stylesheet" type="text/css" href="{{asset('assets/css/shop/font.css')}}">
  <link rel="stylesheet" type="text/css" href="{{asset('assets/css/shop/main.css')}}">
</head>

<body>

  <div id="ReactRoot">
    <div style="text-align:center; margin-top:5em;">
      <div class="preloader-wrapper big active">
        <div class="spinner-layer spinner-blue">
          <div class="circle-clipper left">
            <div class="circle"></div>
          </div><div class="gap-patch">
            <div class="circle"></div>
          </div><div class="circle-clipper right">
            <div class="circle"></div>
          </div>
        </div>

        <div class="spinner-layer spinner-red">
          <div class="circle-clipper left">
            <div class="circle"></div>
          </div><div class="gap-patch">
            <div class="circle"></div>
          </div><div class="circle-clipper right">
            <div class="circle"></div>
          </div>
        </div>

        <div class="spinner-layer spinner-yellow">
          <div class="circle-clipper left">
            <div class="circle"></div>
          </div><div class="gap-patch">
            <div class="circle"></div>
          </div><div class="circle-clipper right">
            <div class="circle"></div>
          </div>
        </div>

        <div class="spinner-layer spinner-green">
          <div class="circle-clipper left">
            <div class="circle"></div>
          </div><div class="gap-patch">
            <div class="circle"></div>
          </div><div class="circle-clipper right">
            <div class="circle"></div>
          </div>
        </div>
      </div>
    </div>
  </div>



	<!-- ↓↓↓↓↓ SCRIPTS ↓↓↓↓↓ -->

		<script src="{{asset('assets/js/jquery-3.2.1.js')}}"></script>
    <script type="text/javascript" src="{{asset('assets/plugins/materialize_1/js/materialize.js')}}"></script>
		<script src="{{asset('assets/js/shop.js')}}"></script>
		<script type="text/javascript">

      var props = {logo: "{!! asset('assets/img/ambientesTienda.png') !!}",
                   routes: {shop: "{!! route('shop') !!}",
                            busqueda: "#"},
                   fatherC: {!! $fatherC !!},
									 bannerImg : "{!! asset('assets/img/tienda.jpg') !!}",
									 token : "{!! csrf_token() !!}",
									 routes : {getProducts : "{!! route('products.getproducts') !!}"},
									 imgDefaultProduct : "{!! asset('assets/img/products/default.jpg')!!}",
									 }

      $(document).ready(function(){
			//:::::::::::::::BARRA DE NAVEGACION::::::::::::


			//::::::::::::::::::::::::::::::::::::::::::::::

			$("#search").on("focusin",function(){
				$("#search").parent().addClass("focused")
			})

			$("#search").on("focusout",function(){
				$("#search").parent().removeClass("focused")
			})

			$('.carousel').carousel({dist: 0, padding:30});

			setInterval(function(){ $('.carousel').carousel('next'); }, 5000);
			  $('.slider').slider();
			  $('.parallax').parallax();
			})

			//scrollSpy
			$('.scrollspy').scrollSpy();

		</script>
    <script src="{{asset('assets/js/components/shop/compiled.min.js')}}"></script>

	<!-- ↑↑↑↑↑ SCRIPTS ↑↑↑↑↑ -->

</body>
</html>
