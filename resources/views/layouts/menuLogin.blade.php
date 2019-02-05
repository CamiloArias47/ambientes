<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <link rel="icon" type="image/png" href="{{asset('assets/img/favicon.ico')}}">
    <link rel="apple-touch-icon" sizes="76x76" href="{{asset('assets/img/apple-icon.png')}}">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
    <title>Ecotienda</title>
    <meta content='width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0' name='viewport' />
    <meta name="viewport" content="width=device-width" />
    <link type="text/css" rel="stylesheet" href="{{asset('assets/css/dashboard/style.css')}}"/>
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <link type="text/css" rel="stylesheet" href="{{asset('assets/plugins/materialize_1/css/materialize.css')}}"  media="screen,projection"/>
  </head>
  <body>

        <nav>
            <div class="nav-wrapper">
            <a href="{{ route('shop') }}" class="brand-logo">Ecotienda</a>
            <a href="#" data-target="mobile-nav" class="sidenav-trigger"><i class="material-icons">menu</i></a>
            <ul id="nav-mobile" class="right hide-on-med-and-down">
                <li><a href="{{ route('login') }}">Inicio sessión</a></li>
                <li><a href="{{ route('register') }}">Registro</a></li>
            </ul>
            </div>
        </nav>

        <ul class="sidenav" id="mobile-nav">
          <li><a href="{{ route('login') }}">Inicio sessión</a></li>
          <li><a href="{{ route('register') }}">Registro</a></li>
        </ul>

        @yield('content')

    <script src="{{asset('assets/js/jquery-3.2.1.js')}}"></script>
    <script type="text/javascript" src="{{asset('assets/plugins/materialize_1/js/materialize.js')}}"></script>
    <script>
      document.addEventListener('DOMContentLoaded', function() {
        var elems = document.querySelectorAll('.sidenav');
        var instances = M.Sidenav.init(elems, {});
      });
    </script>
    @yield('scripts')
  </body>
</html>
