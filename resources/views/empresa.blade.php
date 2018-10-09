@extends('layouts.app')
  @section('contenido')
  <div class="wrapper">
    <div class="page-header section-dark" style="background-image: url('assets/img/startup.jpg')">
          <div class="filter"></div>
      <div class="content-center">
        <div class="container">
          <div class="title-brand">
            <h1 class="presentation-title">Empresa</h1>
          </div>

          <h2 class="presentation-subtitle text-center">
            Proponemos formas de desarrollo de proyectos con enfoques que integren la diversidad, productividad, protección de los recursos renovables y no renovables para satisfacer las necesidades de empresas y particulares.
          </h2>
        </div>
      </div>
      <h6 class="category category-absolute">Ambientes Sostenibles think green </h6>
    </div>
  </div>

  <div class="section">
    <div class="container">
      <div class="row">
        <div class="col-md-6" id="mision">
          <h1>Misión</h1>
          <p class="font-size-1-2em">
            Ser una empresa pionera en integrar profesionales y empresas del sector ambiental y de la salud para mejorar, proteger, cuidar el medio ambiente y la sociedad a través de sus productos y servicios
          </p>
        </div>
        <div class="col-md-6" id="vision">
          <h1>Visión</h1>
          <p class="font-size-1-2em">
            Ser un punto de referencia en el 2020  para la  seguridad, comodidad, y accesibilidad en la consecución de Productos y servicios donde predomine el respeto por el medio ambiente y la sociedad.
          </p>
        </div>
      </div>
      <hr />
      <div class="row">
        <div class="col-md-7" id="valores-corporativos">
          <h1>Valores corporativos</h1>
          <ul class="font-size-1-2em mt-3">
            <li>Compromiso por el medio ambiente</li>
            <li>Respeto</li>
            <li>Seriedad</li>
            <li>Ética y profesionalismo</li>
            <li>Transparencia</li>
            <li>Economía Solida</li>
            <li>Uso eficiente y sostenible</li>
          </ul>
        </div>
        <div class="col-md-5">
          <img src="{{asset('assets/img/shart.png')}}" class="img-fluid"/>
        </div>
      </div>
      <hr />
      <div class="row">
        <div class="col-md-12" id="quienes-somos">
          <div class="tim-title">
              <h1>Quienes somos</h1>
          </div>
        </div>
        <div class="col-md-6">
            <p class="font-size-1-2em">
              Somos un grupo interdisciplinario de profesionales con amplia trayectoria que busca diferentes alternativas que <strong>desafíen los hábitos de consumo tradicional donde se  permita informar al consumidor y brindar herramientas que puedan ejercer su derecho a un consumo responsable</strong>, proponiendo formas de desarrollo de proyectos o actividades con un enfoque que integre aspectos como la biodiversidad, productividad, protección de los recursos renovables y no renovables.
            </p>
        </div>
        <div class="col-md-6">
          <img class="img-fluid" src="{{asset('assets/img/startup2.jpg')}}"/>
        </div>
      </div>

      <div class="p-5"></div>

      <div class="row">
        <div class="col-md-6">
          <img class="img-fluid" src="{{asset('assets/img/escritorio.jpg')}}"/>
        </div>
        <div class="col-md-6 font-size-1-2em">
          Una importante fortaleza que estamos alcanzando es que a través de un solo proveedor
          los clientes reciben un servicio integral con los más altos estándares de calidad,
          <strong>excediendo expectativas y desarrollando proyectos innovadores</strong>, esforzándonos por
          cumplir lo establecido en los doce criterios de los Negocios Verdes, la cual incorporamos
          como parte integral de nuestra estrategia corporativa.
        </div>
      </div>
      <br />
      <div class="row">
        <div class="col-md-6">
          <h5 class="title"><span class="border border-dark rounded p-1"><i class="fa fa-usd"></i></span> Viabilidad economica</h5>
          <h5 class="title"><span class="border border-dark rounded p-1"><i class="fa fa-pagelines"></i></span> Impacto ambiental positivo del bien o servicio</h5>
          <h5 class="title"><span class="border border-dark rounded p-1"><i class="fa fa-repeat"></i></span> Enfoque de ciclo de vida del bien o servicio</h5>
          <h5 class="title"><span class="border border-dark rounded p-1"><i class="fa fa-battery-half"></i></span> Vida útil</h5>
          <h5 class="title"><span class="border border-dark rounded p-1"><i class="fa fa-exclamation "></i></span> No uso de sustancias o materiales peligrosos</h5>
          <h5 class="title"><span class="border border-dark rounded p-1"><i class="fa fa-recycle "></i></span> Reciclabilidad de los materiales y/o uso de materiales reciclados</h5>
          <h5 class="title"><span class="border border-dark rounded p-1"><i class="fa fa-leaf"></i></span> Uso eficiente y sostenible de recursos para la producción del bien o servicio</h5>
        </div>
        <div class="col-md-6">
          <h5 class="title"><span class="border border-dark rounded p-1"><i class="fa fa-sign-in"></i></span> Responsabilidad social al interior de la empresa</h5>
          <h5 class="title"><span class="border border-dark rounded p-1"><i class="fa fa-long-arrow-right"></i></span> Responsabilidad social y ambiental en la cadena de valor de la empresa</h5>
          <h5 class="title"><span class="border border-dark rounded p-1"><i class="fa fa-arrows-alt"></i></span> Responsabilidad social y ambiental al exterior de la empresa</h5>
          <h5 class="title"><span class="border border-dark rounded p-1"><i class="fa fa-microphone "></i></span> Comunicación de atributos sociales o ambientales asociados al bien o servicio.</h5>
          <h5 class="title"><span class="border border-dark rounded p-1"><i class="fa fa-trophy "></i></span> Esquemas, programas o reconocimientos ambientales o sociales implementados o recibidos</h5>
        </div>
      </div>
    </div>
  </div>
  @endsection
