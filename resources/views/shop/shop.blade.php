@extends("shop.layout.app")

  @section("header")

  @endsection

  @section("contenido")

  <div id="index-banner" class="parallax-container">
    <div class="section no-pad-bot">
      <div class="container">
        <br><br><br><br>
        <h1 class="center color-green"><b>Ambientes sostenibles</b></h1>
        <div class="row center">
          <h5 class="header col s12 light">Comprometidos con tu bienestar y el de tu familia</h5>
        </div>
        <br><br>

      </div>
    </div>
    <div class="parallax"><img src="{{asset('assets/img/tienda.jpg')}}" alt="" style="transform: translate3d(-50%, 356px, 0px); display: block;"></div>
  </div>

  <center><h1>Últimos productos</h1></center>
  	<div class="row">
			  <div class="row">
						<div class="col s12 m6 l4">
							<div class="card">
								<div class="card-image waves-effect waves-block waves-light">
									<img class="activator" src="{{asset('assets/img/soup_1.jpg')}}">
								</div>
								<div class="card-content">
									<span class="card-title activator grey-text text-darken-4">Contenedores de sopa <i class="zmdi zmdi-more-vert right"></i></span>
									<p><a href="#">Más información.</a></p>
								</div>
								<div class="card-reveal">
									<span class="card-title grey-text text-darken-4">Contenedores de sopa <i class="zmdi zmdi-close right"></i></span>
									<p>Estas bandejas están hechas de Bagasse, un recurso fácilmente renovable: ¡es tallo de caña de azúcar! La calidad de estos platos superfuertes es asombrosa y lo mejor, ningún árbol se dañó para hacerlos.
<br />El tamaño del compartimento miden 10 "x 8" x 1.0 "y tienen 5 compartimentos.
                  </p>
								</div>
							</div>
						</div>

            <div class="col s12 m6 l4">
							<div class="card">
								<div class="card-image waves-effect waves-block waves-light">
									<img class="activator" src="{{asset('assets/img/bandeja.jpg')}}">
								</div>
								<div class="card-content">
									<span class="card-title activator grey-text text-darken-4">Bandejas de 5 compartimientos  <i class="zmdi zmdi-more-vert right"></i></span>
									<p><a href="#">Más información.</a></p>
								</div>
								<div class="card-reveal">
									<span class="card-title grey-text text-darken-4">Bandejas de 5 compartimientos <i class="zmdi zmdi-close right"></i></span>
									<p>Perfecto para todo, desde sopas calientes y guisos hasta helados. Las tapas planas de CPLA están disponibles para alimentos calientes y las tapas con cúpulas transparentes están disponibles para el frío.
                     <br />Los tamaños de 6oz y 8oz son 1000 / caja
                     12-32 oz tamaños son 500 / caja
                  </p>
								</div>
							</div>
						</div>

            <div class="col s12 m6 l4">
              <div class="card">
                <div class="card-image waves-effect waves-block waves-light">
                  <img class="activator" src="{{asset('assets/img/toalla.jpg')}}">
                </div>
                <div class="card-content">
                  <span class="card-title activator grey-text text-darken-4">Toallas de baño de bambú  <i class="zmdi zmdi-more-vert right"></i></span>
                  <p><a href="#">Más información.</a></p>
                </div>
                <div class="card-reveal">
                  <span class="card-title grey-text text-darken-4">Toallas de baño de bambú <i class="zmdi zmdi-close right"></i></span>
                  <p>
                    ¡Estas toallas ecológicas son increíblemente duraderas, absorbentes y increíblemente suaves al tacto, y se mantienen suaves a diferencia de algunas toallas de algodón que se vuelven ásperas y ásperas! Con una mezcla de 70% de bambú y 30% de ribete de algodón para darle forma, las toallas de BedVoyage son 3 veces más absorbentes que el algodón.
                  </p>
                </div>
              </div>
            </div>
			  </div>

        <div class="row">
          <div class="col s12 m6 l4">
            <div class="card">
              <div class="card-image waves-effect waves-block waves-light">
                <img class="activator" src="{{asset('assets/img/cubiertos.jpg')}}">
              </div>
              <div class="card-content">
                <span class="card-title activator grey-text text-darken-4">cubiertos de almidón vegetal  <i class="zmdi zmdi-more-vert right"></i></span>
                <p><a href="#">Más información.</a></p>
              </div>
              <div class="card-reveal">
                <span class="card-title grey-text text-darken-4">cubiertos de almidón vegetal <i class="zmdi zmdi-close right"></i></span>
                <p>
                  70% libre de petróleo.
                </p>
              </div>
            </div>
          </div>

          <div class="col s12 m6 l4">
            <div class="card">
              <div class="card-image waves-effect waves-block waves-light">
                <img class="activator" src="{{asset('assets/img/detergente.jpg')}}">
              </div>
              <div class="card-content">
                <span class="card-title activator grey-text text-darken-4">detergente de lavandería  <i class="zmdi zmdi-more-vert right"></i></span>
                <p><a href="#">Más información.</a></p>
              </div>
              <div class="card-reveal">
                <span class="card-title grey-text text-darken-4">detergente de lavandería <i class="zmdi zmdi-close right"></i></span>
                <p>
                  Harto de polvo sucio o detergentes líquidos para ropa sucia? Haga el cambio hoy a los paquetes de detergente para ropa de Seventh Generation.
Un producto de base biológica certificado por USDA (al menos 88%), proporcionan una limpieza profunda para su ropa sin agregar productos químicos agresivos al medio ambiente y su piel.
                </p>
              </div>
            </div>
          </div>

          <div class="col s12 m6 l4">
            <div class="card">
              <div class="card-image waves-effect waves-block waves-light">
                <img class="activator" src="{{asset('assets/img/control.jpg')}}">
              </div>
              <div class="card-content">
                <span class="card-title activator grey-text text-darken-4">Control de plagas  <i class="zmdi zmdi-more-vert right"></i></span>
                <p><a href="#">Más información.</a></p>
              </div>
              <div class="card-reveal">
                <span class="card-title grey-text text-darken-4">Control de plagas <i class="zmdi zmdi-close right"></i></span>
                <p>
                  Orange Guard es una forma segura y no tóxica de eliminar insectos de su hogar. Perfore y sature los montículos de hormigas de fuego para eliminarlos sin preocuparse por las mascotas, los humanos, el césped o el medio ambiente. Igualmente eficaz diluyó 3 partes de agua 1 parte de Orange Guard Fire Ant Control con toda su potencia. La EPA lo ha certificado como seguro para su uso cerca de alimentos, humanos o mascotas. Contiene ingredientes botánicos ecológicos.
                </p>
              </div>
            </div>
          </div>

        </div>
  	</div>

  @endsection

  @section("scripts")
      <script src="{{asset('plugins/jcarousel-master/dist/jquery.jcarousel.js')}}"></script>

      <script type="text/javascript">
        $(document).ready(function(){
            $('.jcarousel').jcarousel({animation: 'slow'});
        })

      </script>
  @endsection
