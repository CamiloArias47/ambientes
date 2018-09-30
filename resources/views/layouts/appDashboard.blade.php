<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8"/>
    <link type="text/css" rel="stylesheet" href="{{asset('assets/css/dashboard/style.css')}}"/>
    <link rel="stylesheet" type="text/css" href="{{asset('assets/css/shop/main.css')}}">
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <link type="text/css" rel="stylesheet" href="{{asset('assets/plugins/materialize_1.0.0/css/materialize.css')}}"  media="screen,projection"/>
    <title>Ambietes Sostenibles</title>
    @yield('head')
  </head>
  <body>
    <nav>
      <div class="nav-wrapper">
        <a href="#" class="brand-logo">Logo</a>
        <ul id="nav-mobile" class="right hide-on-med-and-down">
          <li><a href="sass.html">Sass</a></li>
          <li><a href="badges.html">Components</a></li>
          <li><a href="collapsible.html">JavaScript</a></li>
        </ul>
      </div>
    </nav>

    <ul id="slide-out" class="side-nav fixed">
	    	<li id="logoMain">
  	    	<div class="user-view">
  			      <div class="responsive-img">
  			        <center><a href="{{route('shop')}}"><img src="{{ asset('assets/img/ambientesTienda.png') }}" style="width:100%"></a><br></center>
  			      </div>
  		    </div>
        </li>
        <li>
        	<span class="tittles rem1-5 tittlee">Ambientes sostenibles</span>
        </li>

    		<ul class="container_menu">
    				<li class="no-padding">
    				   <ul class="collapsible " data-collapsible="expandable">

    						    <li class="bold"><a class="collapsible-header waves-effect waves-orange list"><b class="list"><i class="material-icons">nature</i>Item</b></a>
    						    	<div class="collapsible-body">
    							      	<ul class="collapsible " data-collapsible="expandable">
    							      		<li><a href="#" class="collapsible-header waves-effect waves-orange"><i class="tiny material-icons">play_arrow</i>Categorias</a></li>
    							      		<li><a class="collapsible-header waves-effect waves-orange"><i class="tiny material-icons">add</i>Marcas</a>
    							      			<div class="collapsible-body">
    								      			<ul>

    										      			<li>
    										      				<a href="#" class="collapsible-header waves-effect waves-orange">
    										      					<i class="tiny material-icons material-icon-mrg">play_arrow</i>Marca nombre
    										      				</a>
    										      			</li>

    								      			</ul>
    							       			</div>
    								      	</li>
    							      	</ul>
    							    </div>
    							</li>

    					</ul>
    				</li>

    				<li class="no-padding">
    				   <ul class="collapsible " data-collapsible="expandable">
    					    <li class="bold" id="menuProducts"><a class="collapsible-header waves-effect waves-orange "><b class="list"><i class="material-icons">shopping_cart</i>Productos</b></a>
    					    	<div class="collapsible-body" id="collapsible-body-products">
    						      	<ul class="collapsible" data-collapsible="expandable">

    							      		<li class="bold" id="liCategory-1}">
    							      			<a class="collapsible-header waves-effect waves-orange">
    							      				<i class="tiny material-icons list">add</i>category name
    							      			</a>
    							      			<div class="collapsible-body" id="collapsible-body-category-1">
    							      				<ul>

    							      						<li>
    							      							<a href="#" class="collapsible-header waves-effect waves-orange">
    							      								<i class="tiny material-icons material-icon-mrg">play_arrow</i>Subcategory name
    							      							</a>
    							      						</li>

    							      				</ul>
    							      			</div>
    							      		</li>

    						      	</ul>
    						    </div>
    						</li>
    					</ul>
    				</li>

    				<li class="no-padding">
    				   <ul class="collapsible " data-collapsible="expandable">
    					    <li class="bold" id="menuBrands"><a class="collapsible-header waves-effect waves-orange list"><b class="list"><i class="material-icons">book</i>Marcas</b></a>
    					    	<div class="collapsible-body" id="collapsible-body-brands">
    						      	<ul class="collapsible " data-collapsible="expandable">
    							      		<li><a href="#" class="collapsible-header waves-effect waves-orange"><i class="tiny material-icons">play_arrow</i>marca name</a></li>
    						      	</ul>
    						    </div>
    						</li>
    					</ul>
    				</li>

    		</ul>
    </ul>

    <div class="container">
      @yield('contenido')

    </div>
    <script type="text/javascript" src="{{asset('assets/plugins/materialize_1.0.0/js/materialize.js')}}"></script>
    @yield('scripts')
  </body>
</html>
