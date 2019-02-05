<!doctype html>
<html lang="es">

<head>
    <meta charset="utf-8" />
    <link rel="icon" type="image/png" href="{{asset('assets/img/favicon.ico')}}">
    <link rel="apple-touch-icon" sizes="76x76" href="{{asset('assets/img/apple-icon.png')}}">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />

    <title>Ambientes Sostenibles</title>

    <meta content='width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0' name='viewport' />
    <meta name="viewport" content="width=device-width" />

    <!-- Bootstrap core CSS     -->
	<link href="{{asset('assets/css/bootstrap.min.css')}}" rel="stylesheet" />
	<link href="{{asset('assets/css/paper-kit.css?v=2.1.0')}}" rel="stylesheet"/>

  <link href="{{asset('assets/css/animate.css')}}" rel="stylesheet"/>

	<!--  CSS for Demo Purpose, don't include it in your project     -->
	<link href="{{asset('assets/css/demo.css')}}" rel="stylesheet" />

    <!--     Fonts and icons     -->
    <link href='http://fonts.googleapis.com/css?family=Montserrat:400,300,700' rel='stylesheet' type='text/css'>

    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.2.0/css/all.css">
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.2.0/css/v4-shims.css">
    <link href="{{asset('assets/css/nucleo-icons.css')}}" rel="stylesheet" />
    @yield('head')
</head>

<body>
    @include('layouts.menu')

    @yield('contenido')

    @include('layouts.footer')
</body>

<!-- Core JS Files -->
<script src="{{asset('assets/js/jquery-3.2.1.js')}}" type="text/javascript"></script>
<script src="{{asset('assets/js/jquery-ui-1.12.1.custom.min.js')}}" type="text/javascript"></script>
<script src="{{asset('assets/js/popper.js')}}" type="text/javascript"></script>
<script src="{{asset('assets/js/bootstrap.min.js')}}" type="text/javascript"></script>

<!-- Switches -->
<script src="{{asset('assets/js/bootstrap-switch.min.js')}}"></script>

<!--  Plugins for Slider -->
<script src="{{asset('assets/js/nouislider.js')}}"></script>

<!--  Plugins for DateTimePicker -->
<script src="{{asset('assets/js/moment.min.js')}}"></script>
<script src="{{asset('assets/js/bootstrap-datetimepicker.min.js')}}"></script>

<!--  Paper Kit Initialization and functons -->
<script src="{{asset('assets/js/paper-kit.js?v=2.1.0')}}"></script>
@yield('scripts')
</html>
