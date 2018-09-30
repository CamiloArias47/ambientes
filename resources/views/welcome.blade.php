@extends('layouts.app')
  @section('head')

  @endsection
  @section('contenido')
    <div class="wrapper">
      <div class="page-header section-dark" style="background-image: url('assets/img/homePage3.jpg')">
            <div class="filter"></div>
    		<div class="content-center">
    			<div class="container">
    				<div class="title-brand">
    					<h1 class="presentation-title">Ambientes Sostenibles</h1>
    				</div>

    				<h2 class="presentation-subtitle text-center">Comprometidos con tu bienestar y el de tu familia.</h2>
    			</div>
    		</div>
        <div class="moving-clouds" style="background-image: url('assets/img/clouds.png'); ">

        </div>
    		<h6 class="category category-absolute">Ambientes Sostenibles think green </h6>
    	</div>
	  </div>

    <div class="section bg-light">
      <div class="container">
        <div class="tim-title">
            <h1>Servicios</h1>
        </div>
        <div class="row justify-content-center scroll-animation" data-av-animation="fadeInUp">
          <div class="col-sm-6 col-md-4">
            <div class="home-sections-item">
              <div class="makeBg home-sections-pic" style="background-image: url({{asset('assets/img/ecology.jpg')}});">
                <div class="home-section-head">
                  <h2 class="home-section-boxtitle">Paisajismo</h2>
                </div>
              </div>
              <div class="home-section-box">
                    <ul class="list-unstyled home-section-list">
                      <li><a href="{{url('servicios-ambientales')}}#paisajismo">Paisajismo</a></li>
                      <li><a href="{{url('servicios-ambientales')}}#zonas-verdes">Zonas verdes</a></li>
                      <li><a href="{{url('servicios-ambientales')}}#arboles">Arboles</a></li>
                      <li><a href="{{url('servicios-ambientales')}}#residuos-vegetales">Manejo de residuos vegetales</a></li>
                    </ul>
              </div>
            </div>
          </div>
          <div class="col-sm-6 col-md-4">
            <div class="home-sections-item">
              <div class="makeBg home-sections-pic" style="background-image: url({{asset('assets/img/irrigation2.jpg')}});">
                <div class="home-section-head">
                  <h2 class="home-section-boxtitle">Construcciones <i class="fa fa-wrench" aria-hidden="true"></i></h2>
                </div>
              </div>
              <div class="home-section-box">
                    <ul class="list-unstyled home-section-list">
                      <li><a href="{{url('servicios-ambientales')}}#muros-verdes">Muros verdes</a></li>
                      <li><a href="{{url('servicios-ambientales')}}#techos-verdes">Techos verdes</a></li>
                      <li>Exteriores</li>
                      <li><a href="{{url('servicios-ambientales')}}#sistemas-de-riego">Sistemas de riego</a></li>
                      <li><a href="{{url('servicios-ambientales')}}#contenedores">Contenedores</a></li>
                    </ul>
              </div>
            </div>
          </div>
          <div class="col-sm-6 col-md-4">
            <div class="home-sections-item">
              <div class="makeBg home-sections-pic" style="background-image: url({{asset('assets/img/solar-panels.jpg')}});">
                <div class="home-section-head">
                  <h2 class="home-section-boxtitle">Energias renovables </h2>
                </div>
              </div>
              <div class="home-section-box">
                    <ul class="list-unstyled home-section-list">
                      <li><a href="{{url('servicios-ambientales')}}#paneles-solares">Paneles solares</a></li>
                    </ul>
              </div>
            </div>
          </div>
        </div>

        <div class="row justify-content-center scroll-animation" data-av-animation="fadeInUp">
          <div class="col-sm-6 col-md-4">
            <div class="home-sections-item">
              <div class="makeBg home-sections-pic" style="background-image: url({{asset('assets/img/educacion.jpg')}});">
                <div class="home-section-head">
                  <h2 class="home-section-boxtitle">Educación <i class="fa fa-pencil" aria-hidden="true"></i> </h2>
                </div>
              </div>
              <div class="home-section-box">
                    <ul class="list-unstyled home-section-list">
                      <li><a href="{{url('servicios-ambientales')}}#educacion">Software diseño de jardines</a></li>
                      <li><a href="{{url('servicios-ambientales')}}#educacion">Horticultura urbana</a></li>
                      <li><a href="{{url('servicios-ambientales')}}#educacion">Jardinería de bajo mantenimiento</a></li>
                    </ul>
              </div>
            </div>
          </div>
          <div class="col-sm-6 col-md-4">
            <div class="home-sections-item">
              <div class="makeBg home-sections-pic" style="background-image: url({{asset('assets/img/seguridadTrabajo.jpg')}});">
                <div class="home-section-head" style="bottom:188px">
                  <h2 class="home-section-boxtitle">Sistema de gestión seguridad y salud en el trabajo</h2>
                </div>
              </div>
              <div class="home-section-box">
                    <ul class="list-unstyled home-section-list">
                      <li class="card-text">Investigaciones de AT</li>
                      <li class="card-text">cumplimiento resolución 1111 de 2017</li>
                    </ul>
              </div>
            </div>
          </div>
        </div>
        <!--
        <div class="row justify-content-center">
          <div class="col-md-2">
            <div class="card2 scroll-animation-100" data-av-animation="fadeInUp">
              <div class="card2-header">
                  <img src="{{asset('assets/img/plant.png')}}" class="img-fluid"/>
              </div>
              <div class="card2-body">
                Paisajismo<br />
                Jardineria<br/>
                Zonas verdes<br/>
                Arboles<br/>
                Manejo integral de residuos vegetales<br/>
              </div>
            </div>
          </div>
          <div class="col-md-2">
            <div class="card2 scroll-animation-200" data-av-animation="fadeInUp">
              <div class="card2-header">
                  <img src="{{asset('assets/img/hammer.png')}}" class="img-fluid"/>
              </div>
              <div class="card2-body">
                Construcciones sostenibles<br />
                Muros verdes<br/>
                Techos verdes<br/>
                Exteriores, Sistemas de riego<br/>
                Contenedores<br/>
              </div>
            </div>
          </div>
          <div class="col-md-2">
            <div class="card2 scroll-animation-300" data-av-animation="fadeInUp">
              <div class="card2-header">
                  <img src="{{asset('assets/img/plug.png')}}" class="img-fluid"/>
              </div>
              <div class="card2-body">
                Energias renovables<br />
                Paneles solares<br/>
                Hidro turbinas<br/>
                Eficiencia energética<br/>
              </div>
            </div>
          </div>
          <div class="col-md-2">
            <div class="card2 scroll-animation-400" data-av-animation="fadeInUp">
              <div class="card2-header">
                  <img src="{{asset('assets/img/books.png')}}" class="img-fluid"/>
              </div>
              <div class="card2-body">
                Educación<br />
                Software diseño de jardines<br/>
                Jardinería de bajo mantenimiento<br/>
                Horticultura urbana<br/>
              </div>
            </div>
          </div>
          <div class="col-md-2">
            <div class="card2 scroll-animation-500" data-av-animation="fadeInUp">
              <div class="card2-header">
                  <img src="{{asset('assets/img/helmet.png')}}" class="img-fluid"/>
              </div>
              <div class="card2-body">
                Sistema de gestión seguridad y salud en el trabajo<br />
                investigación de AT, auditoria, cumplimiento de resoluciín 1111 de 2017<br/>
              </div>
            </div>
          </div>
        </div>
        -->
      </div>
    </div>

    <div class="section bg-gray">
      <div class="container">
        <div class="tim-title">
            <h1>Productos</h1>
        </div>
        <div class="row justify-content-center">
          <div class="col-md-4 scroll-animation" data-av-animation="fadeIn">
            <a href="{{url('productos')}}">
              <div class="card" style="width: 20rem;">
                <img class="card-img-top" src="{{asset('assets/img/ecology.jpg')}}" alt="Card image cap">
                <div class="card-body">
                  <p class="card-text font-size-1-2em">Comercializa tu producto.</p>
                </div>
              </div>
            </a>
          </div>
          <div class="col-md-4 scroll-animation" data-av-animation="fadeIn">
            <a href="{{url('productos')}}">
              <div class="card" style="width: 20rem;">
                <img class="card-img-top" src="{{asset('assets/img/tienda.jpg')}}" alt="Card image cap">
                <div class="card-body">
                  <p class="card-text font-size-1-2em">Acceder a la tienda virtual.</p>
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>

    <!-- ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::.::::-->
    <!-- :::::::::::::::::::::::::::::::::::::::Ultimas Noticias::::::::::::::::::::::::::::::::::::::::-->
    <!-- ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::.::::-->
    <!--<div class="section section-noticias">
      <div class="container">
        <div class="tim-title">
            <h3>Noticias</h3>
        </div>
        <div class="row">
          <div class="col-sm-4">
            <div class="card" style="width: 18rem;">
              <img class="card-img-top" src="{{asset('assets/img/login-image.jpg')}}" alt="Card image cap">
              <div class="card-body">
                <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
              </div>
            </div>
          </div>
          <div class="col-sm-4">
            <div class="card" style="width: 18rem;">
              <img class="card-img-top" src="{{asset('assets/img/login-image.jpg')}}" alt="Card image cap">
              <div class="card-body">
                <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
              </div>
            </div>
          </div>
          <div class="col-sm-4">
            <div class="card" style="width: 18rem;">
              <img class="card-img-top" src="{{asset('assets/img/login-image.jpg')}}" alt="Card image cap">
              <div class="card-body">
                <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    -->

    <!-- ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::.::::-->
    <!-- :::::::::::::::::::::::::::::::::::::::Equipo::::::::::::::::::::::::::::::::::::::::::::::::::-->
    <!-- ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::.::::-->
    <div class="section">
        <div class="container">
            <div class="tim-title">
                <h3>Equipo</h3>
            </div>
            <div class="row">
                <div class="col-6 col-sm-3 col-md-2 mr-auto  ml-auto">
                    <h4 class="images-title">Joe Gardner</h4>
                    <img src="{{asset('assets/img/faces/kaci-baum-2.jpg')}}" class="img-circle img-no-padding img-responsive" alt="Rounded Image">
                    <p class="text-center">Diseño</p>
                </div>
                <div class="col-6 col-sm-3 col-md-2 mr-auto  ml-auto">
                    <h4 class="images-title">Zoé Hernandez</h4>
                    <img src="{{asset('assets/img/faces/joe-gardner-2.jpg')}}" class="img-circle img-no-padding img-responsive" alt="Rounded Image">
                    <p class="text-center">Proyectos</p>
                </div>
                <div class="col-6 col-sm-3 col-md-2 mr-auto  ml-auto">
                    <h4 class="images-title">Camilo Arias</h4>
                    <img src="{{asset('assets/img/faces/clem-onojeghuo-2.jpg')}}" class="img-circle img-no-padding img-responsive" alt="Rounded Image">
                    <p class="text-center">Programación</p>
                </div>
            </div>
        </div>
    </div>
  @endsection

  @section('scripts')
    <script src="{{asset('assets/js/jquery.aniview.js')}}" type="text/javascript"></script>
    <script>
      $(document).ready( function(){

        $('.scroll-animation-100').AniView({animateThreshold: 100});
        $('.scroll-animation-200').AniView({animateThreshold: 200});
        $('.scroll-animation-300').AniView({animateThreshold: 300});
        $('.scroll-animation-400').AniView({animateThreshold: 400});
        $('.scroll-animation-500').AniView({animateThreshold: 500});
        $('.scroll-animation').AniView({animateThreshold: 100});

      })
    </script>
  @endsection
