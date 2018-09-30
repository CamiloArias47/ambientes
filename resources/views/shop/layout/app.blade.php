<!DOCTYPE html>
<html lang="es">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title>Ambientes sotenibles</title>
	<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
	<link rel="stylesheet" type="text/css" href="{{asset('assets/plugins/materialize/css/materialize.css')}}">
	<link rel="stylesheet" type="text/css" href="{{asset('assets/css/shop/main.css')}}">
	<link rel="stylesheet" type="text/css" href="{{asset('assets/css/shop/material-design-iconic-font.min.css')}}">


	<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.2.0/css/all.css">
	<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.2.0/css/v4-shims.css">
	<!--<link rel="shortcut icon" href="{{asset('C:/xampp/htdocs/tienda/images/favicons/favicon.ico')}}">-->
	@yield("head")
</head>

<body>

	<!--:::::::::::::::Social Bar::::::::::::::::::::-->

	@include("shop.layout.socialbar")

    <!--:::::::::::::::NavBar::::::::::::::::::::-->

    @include("shop.layout.navbar")

	<!--:::::::::::::MENÚ LATERAL IZQUIERDO::::::::::::-->

	@include("shop.layout.menu")

	<!--Contenido-->

	<header>
		@yield("header")
	</header>



	<main>
		@yield("contenido")
	</main>


<!--::::::::::::::::::::Footer:::::::::::::::::::::-->

@include("shop.layout.footer")


	<!-- ↓↓↓↓↓ SCRIPTS ↓↓↓↓↓ -->

		<script src="{{asset('assets/js/jquery-3.2.1.js')}}"></script>
		<script src="{{asset('assets/plugins/materialize/js/materialize.js')}}"></script>
		<script src="{{asset('assets/js/shop.js')}}"></script>
		<script type="text/javascript">
			$(document).ready(function(){

			//:::::::::::::::BARRA DE NAVEGACION::::::::::::


				  $('.button-collapse').sideNav({
				      menuWidth: 300, // Default is 300
				      edge: 'left', // Choose the horizontal origin
				      closeOnClick: true, // Closes side-nav on <a> clicks, useful for Angular/Meteor
				      draggable: true, // Choose whether you can drag to open on touch screens

				    });
				  $(".button-collapse").sideNav();
				  $('.collapsible').collapsible();

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

		@yield("scripts")

	<!-- ↑↑↑↑↑ SCRIPTS ↑↑↑↑↑ -->

</body>
</html>
