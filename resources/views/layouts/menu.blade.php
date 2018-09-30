<nav class="navbar navbar-expand-md fixed-top navbar-transparent" color-on-scroll="500">
    <div class="container">
        <div class="navbar-translate">
            <button class="navbar-toggler navbar-toggler-right navbar-burger" type="button" data-toggle="collapse" data-target="#navbarToggler" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-bar"></span>
                <span class="navbar-toggler-bar"></span>
                <span class="navbar-toggler-bar"></span>
            </button>
            <a class="navbar-brand" href="{{url('/')}}">Ambientes Sostenibles</a>
        </div>
        <div class="collapse navbar-collapse" id="navbarToggler">
            <ul class="navbar-nav ml-auto">
                <li class="nav-item">
                    <a href="{{url('empresa')}}" class="nav-link">Empresa</a>
                </li>
                <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" data-toggle="dropdown" id="navBarServicios" href="#pk" role="button" aria-haspopup="true" aria-expanded="false">Servicios</a>
                    <ul class="dropdown-menu dropdown-menu-left dropdown-info" aria-labelledby="navBarServicios">
                        <li class="dropdown-header"></li>
                        <a class="dropdown-item" href="{{url('servicios-ambientales')}}#paisajismo">Paisajismo</a>
                        <a class="dropdown-item" href="{{url('servicios-ambientales')}}#zonas-verdes">Zonas verdes</a>
                        <a class="dropdown-item" href="{{url('servicios-ambientales')}}#arboles">Arboles</a>
                        <a class="dropdown-item" href="{{url('servicios-ambientales')}}#residuos-vegetales">Manejo de residuos vegetales</a>
                        <div class="dropdown-divider"></div>
                        <a class="dropdown-item" href="{{url('servicios-ambientales')}}#muros-verdes">Muros verdes</a>
                        <a class="dropdown-item" href="{{url('servicios-ambientales')}}#techos-verdes">Techos verdes</a>
                        <a class="dropdown-item" href="{{url('servicios-ambientales')}}#sistemas-de-riego">Sistemas de riego</a>
                        <a class="dropdown-item" href="{{url('servicios-ambientales')}}#contenedores">Contenedores</a>
                        <div class="dropdown-divider"></div>
                        <a class="dropdown-item" href="{{url('servicios-ambientales')}}#paneles-solares">Paneles solares</a>
                        <div class="dropdown-divider"></div>
                        <a class="dropdown-item" href="{{url('servicios-ambientales')}}#educacion">Educación</a>
                    </ul>
                </li>
                <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" data-toggle="dropdown" id="navBarProductos" href="#pk" role="button" aria-haspopup="true" aria-expanded="false">Productos</a>
                    <ul class="dropdown-menu dropdown-menu-left dropdown-info" aria-labelledby="navBarProductos">
                        <li class="dropdown-header"></li>
                        <a class="dropdown-item" href="{{url('ecotienda')}}">Tienda virtual</a>
                        <a class="dropdown-item" href="{{url('productos')}}">Comercializar productos</a>
                    </ul>
                </li>
                <li class="nav-item">
                    <a class="nav-link" rel="tooltip" title="Danos like en Facebook" data-placement="bottom" href="#" target="_blank">
                        <i class="fa fa-facebook-square"></i>
                        <p class="d-lg-none">Facebook</p>
                    </a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" rel="tooltip" title="Susbcribete a nuestro canal de Youtube" data-placement="bottom" href="#" target="_blank">
                        <i class="fa fa-youtube"></i>
                        <p class="d-lg-none">Youtube</p>
                    </a>
                </li>
            </ul>
        </div>
    </div>
</nav>
