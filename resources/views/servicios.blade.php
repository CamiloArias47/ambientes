@extends('layouts.app')
  @section('contenido')
  <div class="wrapper">
    <div class="page-header section-dark" style="background-image: url('assets/img/irrigation.jpg')">
        <div class="filter"></div>
      <div class="content-center">
        <div class="container">
          <div class="title-brand">
            <h1 class="presentation-title">Servicios</h1>
          </div>

          <h2 class="presentation-subtitle text-center">Nuestros servicios generan impactos ambientales positivos e incorporan buenas prácticas
              ambientales, sociales, económicas, con enfoque de ciclo de vida, contribuyendo a la
              conservación del ambiente como capital natural que soporta el desarrollo del territorio.
          </h2>
        </div>
      </div>
      <h6 class="category category-absolute">Ambientes Sostenibles think <span class="text-green">green</span> </h6>
    </div>
  </div>

  <div class="section" id="paisajismo">
    <div class="container">
      <div class="tim-title">
          <h1>Paisajismo</h1>
      </div>
      <div class="row justify-content-end">
        <div class="col-md-6 font-size-1-2em">
          <h3>Diseño</h3>
        </div>
      </div>
      <div class="row">
        <div class="col-md-6">
          <img class="img-fluid" src="{{asset('assets/img/diseno.png')}}"/>
        </div>
        <div class="col-md-6 font-size-1-2em">
          <ul class="mt-5">
            <li>Diseña fácilmente tu jardin.</li>
            <li>Visualiza tu diseño en cualquier dispositivo.</li>
            <li>Ahorra en contratar personal especializado.</li>
            <li>Identificamos rapidamente tus gustos.</li>
            <li>Asesoramos en nuevas formas de jardinería de bajo costo y sostenibles</li>
          </ul>
        </div>
      </div>
      <div class="row">
        <div class="col-12 font-size-1-2em">
          <h3>Construcción</h3>
        </div>
      </div>
      <div class="row">
        <div class="col-md-6 font-size-1-2em">
          <ul class="mt-5">
            <li>Según el diseño nos adaptamos a su presupuesto.</li>
            <li>Contratamos mano de obra calificada y bajo los parametros de ley.</li>
            <li>Llevamos seguimiento de su obra en cantidad y tiempo el cual es verificable a travéz de su celular o computador.</li>
            <li>Realizamos la administración de su proyecto si lo desea.</li>
            <li>Asesoramos en nuevas formas de jardinería de bajo costo y sostenibles</li>
          </ul>
        </div>
        <div class="col-md-6">
          <img src="{{asset('assets/img/8065.png')}}" class="img-fluid"/>
        </div>
      </div>
      <div class="row justify-content-end">
        <div class="col-md-6 font-size-1-2em">
          <h3>Mantenimiento y optimización</h3>
        </div>
      </div>
      <div class="row">
        <div class="col-md-6">
          <img src="{{asset('assets/img/164.png')}}" class="img-fluid"/>
        </div>
        <div class="col-md-6 font-size-1-2em">
          <ul class="mt-5">
            <li>Utilizamos insumos de bajo riesgo para la salud y el medio ambiente.</li>
            <li>Ofrecemos alternativas de reducción de costo en agua e insumos con implementos fáciles de usar.</li>
            <li>Seguimiento periodico dependiendo de tus necesidades.</li>
            <li>Herramientas adecuadas y de bajo ruido.</li>
          </ul>
        </div>
      </div>
    </div>
  </div>

  <div class="section" id="zonas-verdes">
    <div class="container">
      <div class="tim-title">
          <h1>Zonas verdes</h1>
      </div>
      <div class="row justify-content-center">
        <div class="col-md-10">
          <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
            <ol class="carousel-indicators">
              <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
              <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
              <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
              <li data-target="#carouselExampleIndicators" data-slide-to="3"></li>
            </ol>
            <div class="carousel-inner">
              <div class="carousel-item active">
                <img class="d-block w-100" src="{{asset('assets/img/garden1.jpg')}}" alt="First slide">
                <div class="carousel-caption d-none d-md-block">
                  <h5>Diagnostico</h5>
                  <p>Diagnostico o Levantamiento de Información para diseño o mantenimiento</p>
                </div>
              </div>
              <div class="carousel-item">
                <img class="d-block w-100" src="{{asset('assets/img/garden.jpg')}}" alt="Second slide">
                <div class="carousel-caption d-none d-md-block">
                  <h5>Construcción</h5>
                  <p>Siembra de prado y mantenimiento de Escenarios Deportivos o Recreativos, residenciales </p>
                </div>
              </div>
              <div class="carousel-item">
                <img class="d-block w-100" src="{{asset('assets/img/garden2.jpg')}}" alt="Third slide">
                <div class="carousel-caption d-none d-md-block">
                  <h5>Herramientas y equipos</h5>
                  <p>Mayor rendimiento en los mantenimientos.</p>
                </div>
              </div>
              <div class="carousel-item">
                <img class="d-block w-100" src="{{asset('assets/img/fumigacion.jpg')}}" alt="Third slide">
                <div class="carousel-caption d-none d-md-block">
                  <h5>Control de plagas</h5>
                  <p></p>
                </div>
              </div>
            </div>
            <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
              <span class="carousel-control-prev-icon" aria-hidden="true"></span>
              <span class="sr-only">Previous</span>
            </a>
            <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
              <span class="carousel-control-next-icon" aria-hidden="true"></span>
              <span class="sr-only">Next</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="section" id="arboles">
    <div class="container">
      <div class="tim-title">
        <h1>Árboles</h1>
      </div>
      <div class="row">
        <div class="col-md-6 font-size-1-2em">
          <ul class="mt-5">
            <li>Asesoría legal en procedimientos con árboles</li>
            <li>Inventarios o censo forestal</li>
            <li>Siembras o reforestación de áreas degradadas</li>
          </ul>
        </div>
        <div class="col-md-6">
          <img src="{{asset('assets/img/tree3.jpg')}}" class="img-fluid img-thumbnail"/>
        </div>
      </div>
      <div class="row">
        <div class="col-md-6">
          <img src="{{asset('assets/img/tree4.jpg')}}" class="img-fluid img-thumbnail"/>
        </div>
        <div class="col-md-6 font-size-1-2em">
          <ul class="mt-5">
            <li>Control de plagas y remediación de enfermedades</li>
            <li>Trabajo seguro de alturas – bajo estándar legal</li>
            <li>Manejo adecuado re - utilización de residuos forestales</li>
          </ul>
        </div>
      </div>
    </div>
  </div>

  <div class="section" id="residuos-vegetales">
    <div class="container">
      <div class="tim-title">
        <h1>Residuos Vegetales</h1>
      </div>
      <div class="row">
        <div class="col-md-6">
          <div class="card-no-efect">
            <img class="card-img-top" src="{{asset('assets/img/desechos.jpg')}}" alt="Card image cap">
            <div class="card-body">
              <h3>Recolección de residuos vegetales</h3>
              <p class="card-text font-size-1-2em">Recogemos su residuos vegetales de actividades de jardinería, zonas verdes, forestal.</p>
            </div>
          </div>
        </div>
        <div class="col-md-6">
          <div class="card-no-efect">
            <img class="card-img-top" src="{{asset('assets/img/compost.jpg')}}" alt="Card image cap">
            <div class="card-body">
              <h3>Manejo de Residuos o compostaje</h3>
              <p class="card-text font-size-1-2em">Tratamos los residuos y le damos el manejo adecuado, para su reutilización.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="section section-img-background-fixed" id="muros-verdes" style="background-image: url({{asset('assets/img/pared.jpg')}})">
    <div class="container">
      <div class="tim-title">
          <h1>Muros Verdes</h1>
          <br />
          <p class="font-size-1-2em">
            Buscamos soluciones en decoración de interiores y exteriores que beneficien el medio ambiente. Si quieres dotar tu lugar de trabajo de una imagen original e innovadora o tu vivienda, un jardín vertical es la mejor opción
          </p>
          <br />
          <div class="row">
            <div class="col-md-3 text-center">
               <span class="size2em"><i class="fa fa-usd"></i></span><br />
               <span class="font-size-1-2em">Revisamos tus instalaciones y generamos un presupuesto acorde a tus deseos.</span>
            </div>
            <div class="col-md-3 text-center">
              <span class="size2em"><i class="fa fa-tint"></i></span><br />
              <span class="font-size-1-2em">Impermeabilidad, Conexiones de agua, Desagües, etc.</span>
            </div>
            <div class="col-md-3 text-center">
              <span class="size2em"><i class="fa fa-shopping-basket"></i></span><br />
              <span class="font-size-1-2em">Seleccionamos el tipo de material o panel que se ajuste</span>
            </div>
            <div class="col-md-3 text-center">
              <span class="size2em"><i class="fa fa-leaf"></i></span><br />
              <span class="font-size-1-2em">Recomendamos las mejores  plantas según el tipo de espacios.</span>
            </div>
          </div>
      </div>
      <div class="row">
      </div>
    </div>
  </div>

  <div class="section" id="techos-verdes">
    <div class="container">
      <div class="row">
        <div class="col-md-8">
          <div class="tim-title">
              <h1>Techos Verdes</h1>
          </div>
          <p class="font-size-1-2em">
          Esta es una alternativa actual que permite el crecimiento de vegetación en la parte
          superior de una estructura impermeable de techos, terrazas o azoteas de edificios o
          casas, de tal modo que se utilizan especies vegetales de bajo mantenimiento,
          disminuyendo el efecto isla de calor, los riesgos de inundaciones y el uso en menor
          medida del aire acondicionado.
          </p>
        </div>
        <div class="col-md-4">
          <img src="{{asset('assets/img/Green-roof.jpg')}}" class="img-fluid img-responsive" alt="Rounded Image">
        </div>
      </div>
    </div>
  </div>

  <div class="section section-img-background-fixed" id="sistemas-de-riego" style="background-image: url({{asset('assets/img/sunset-header.jpg')}})">
    <div class="container">
      <div class="row">
        <div class="col-md-6">
          <div class="tim-title">
              <h1>Sistemas de riego</h1>
          </div>
        </div>
        <div class="col-md-6">
          <p class="text-lg font-size-1-2em">
            Ofrecemos máxima eficiencia en el empleo del recurso hídrico, la continua aplicación
            en pequeñas dosis establece condiciones óptimas para ser extraída por las
            plantas, nuestra solución permite un riego localizado por el cual se
            vierte pequeñas cantidades de agua en un lugar específico.
          </p>
        </div>
      </div>
    </div>
  </div>
  <div class="section">
    <div class="container">
      <div class="row">
        <div class="col-6">

        </div>
      </div>
    </div>
  </div>

  <div class="section pb-2 pt-0" id="paneles-solares">
    <div class="container">
      <div class="tim-title">
          <h1>Paneles solares</h1>
      </div>
      <br />
      <div class="row">
        <div class="col-md-6">
          <p class="font-size-1-2em">
            Ofrecemos soluciones de energía solar fotovoltaica para unidades residenciales, proyectos
            inmobiliarios, condominios y empresas.
          </p>
        </div>
        <div class="col-md-6 font-size-1-2em">
          <ul>
            <li>Realizamos el diseño de sistema Fotovoltaico ajustado a sus necesidades</li>
            <li>Presupuestamos con diferentes alternativas y en igualdad de condiciones</li>
            <li>Instalamos su sistema con las recomendaciones RETIE necesarias.</li>
            <li>Revisamos su sistema periódicamente como parte de nuestro servicios</li>
          </ul>
        </div>
      </div>
    </div>
  </div>

  <div class="section pt-0">
      <div class="row mx-0">
        <div class="col-4 px-0">
           <img src="{{asset('assets/img/solar-panels.jpg')}}" class="img-fluid">
        </div>
        <div class="col-4 px-0">
           <img src="{{asset('assets/img/solar.jpg')}}" class="img-fluid">
        </div>
        <div class="col-4 px-0">
           <img src="{{asset('assets/img/solar2.jpg')}}" class="img-fluid">
        </div>
      </div>
  </div>

  <div class="section section-img-background-fixed" id="iluminacion" style="background-image: url({{asset('assets/img/lights.jpg')}})">
    <div class="container">
      <div class="tim-title">
          <h1>Iluminación</h1>
      </div>
      <p class="font-size-1-2em">
        Soluciones en eficiencia energética buscando reducir consumo energético lo cual no
        significa consumir menos, sino consumir mejor y ayudar a disminuir la contaminación al
        ambiente bajo Tecnología Led inteligente.
        Servicios que ofrecemos
      </p>
      <br />
      <div class="row">
        <div class="col-md-4 text-center">
           <spam class="size2em"><i class="fa fa-arrows-alt"></i><br />
               <spam>Sensores de movimiento</spam>
           </spam>
        </div>
        <div class="col-md-4 text-center">
          <spam class="size2em"><i class="fa fa-lightbulb-o"></i><br />
              <spam>Instalación</spam>
          </spam>
        </div>
        <div class="col-md-4 text-center">
          <spam class="size2em"><i class="fa fa-area-chart"></i><br />
              <spam>Contadores de energía</spam>
          </spam>
        </div>
      </div>
    </div>
  </div>

  <div class="section" id="contenedores">
    <div class="container">
      <div class="tim-title">
          <h1>Contenedores</h1>
          <p class="font-size-1-2em">
            Brindamos soluciones en construcción modular hacia la preservación del medio ambiente
            y a un menor costo, con asesoría técnica, comercialización e instalación de modulares
            multiusos tanto definitivos, provisionales, y de avanzada para campamentos en
            operaciones mineras, petroleras, hidrocarburos, constructoras, contratistas, vivienda e
            industria en general.
          </p>
          <br />
          <div class="row">
            <div class="col-md-4">
              <div class="card" style="width: 18rem;">
                <img class="card-img-top" src="{{asset('assets/img/container2.jpg')}}" alt="Card image cap">
                <div class="card-body">
                  <p class="card-text"></p>
                </div>
              </div>
            </div>
            <div class="col-md-4">
              <div class="card" style="width: 18rem;">
                <img class="card-img-top" src="{{asset('assets/img/container3.jpg')}}" alt="Card image cap">
                <div class="card-body">
                  <p class="card-text"></p>
                </div>
              </div>
            </div>
            <div class="col-md-4">
              <div class="card" style="width: 18rem;">
                <img class="card-img-top" src="{{asset('assets/img/container4.jpg')}}" alt="Card image cap">
                <div class="card-body">
                  <p class="card-text"></p>
                </div>
              </div>
            </div>
          </div>
      </div>
      <div class="row">
      </div>
    </div>
  </div>

  <div class="section" id="educacion">
    <div class="container">
      <div class="tim-title">
          <h1>Educación</h1>
      </div>
      <div class="row">
        <div class="col-md-4">
          <div class="card" style="width: 18rem;">
            <img class="card-img-top" src="{{asset('assets/img/ecology.jpg')}}" alt="Card image cap">
            <div class="card-body">
              <h3>Jardineria</h3>
              <p class="card-text">Cursos de jardinería basados en construcción y  mantenimientos de bajo costo</p>
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="card" style="width: 18rem;">
            <img class="card-img-top" src="{{asset('assets/img/turismo.jpg')}}" alt="Card image cap">
            <div class="card-body">
              <h3>Diseño</h3>
              <p class="card-text">Introducimos conceptos y habilidades de diseño Paisajista, basados ​​en computadora, CAD, Visualización de fotografías</p>
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="card" style="width: 18rem;">
            <img class="card-img-top" src="{{asset('assets/img/horticultura.jpg')}}" alt="Card image cap">
            <div class="card-body">
              <h3>Horticultura</h3>
              <p class="card-text">Cursos de horticultura Urbana, el cual promueve la producción de hortalizas, tanto para consumo humano como para fines ornamentales</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  @endsection
