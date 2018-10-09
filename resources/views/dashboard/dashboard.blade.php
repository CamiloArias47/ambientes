<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8"/>
    <link type="text/css" rel="stylesheet" href="{{asset('assets/css/dashboard/style.css')}}"/>
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <link type="text/css" rel="stylesheet" href="{{asset('assets/plugins/materialize_1/css/materialize.css')}}"  media="screen,projection"/>
    <link rel="stylesheet" type="text/css" href="{{asset('assets/css/shop/main.css')}}">
    <link rel="stylesheet" type="text/css" href="{{asset('assets/css/shop/material-design-iconic-font.min.css')}}">

    <link rel="stylesheet" type="text/css" href="{{ asset('assets/plugins/summernote-master/dist/summernote.css') }}">
    <link rel="stylesheet" type="text/css" href="{{ asset('assets/plugins/summernote-master/dist/summernote-bs3.css') }}">
    <link rel="stylesheet" type="text/css" href="{{ asset('assets/plugins/chosen/bootstrap-chosen.css') }}">
    <link rel="stylesheet" type="text/css" href="{{ asset('assets/plugins/bootstrap-tagsinput-latest/src/bootstrap-tagsinput.css') }}">
    <link rel="stylesheet" type="text/css" href="{{ asset('assets/plugins/cropperjs-master/src/css/cropper.css') }}">

    <title> Ambietes Sostenibles | Dashboard</title>
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

    <script src="{{asset('assets/js/jquery-3.2.1.js')}}"></script>

    <script type="text/javascript" src="{{asset('assets/plugins/materialize_1/js/materialize.js')}}"></script>
    <script src="{{asset('assets/js/dashboard.js')}}"></script>

    <script type="text/javascript" src="{{ asset('assets/plugins/summernote-master/dist/summernote.js') }}"></script>
    <script type="text/javascript" src="{{ asset('assets/plugins/summernote-master/dist/lang/summernote-es-ES.js') }}"></script>
    <script type="text/javascript" src="{{ asset('assets/plugins/chosen/chosen.jquery.js') }}"></script>
    <script type="text/javascript" src="{{ asset('assets/plugins/bootstrap-tagsinput-latest/src/bootstrap-tagsinput.js') }}"></script>

    <script type="text/javascript">
      var user   = {name:"{!! auth()->user()->name !!}",
                    email:"{!! auth()->user()->email !!}",
                    profileImg:"{!! asset('assets/img/camilo.jpg') !!}"},
          images = {backgroundMenu : "{!! asset('assets/img/lines.jpg') !!}"},
          token  = "{!! csrf_token() !!}",
          routes = {logout : "{!! route('logout') !!}"};

          //estas variables es mejor setearlas cuando se cargue el componente con un ajax o un fetch
          var fatherCategories = {!!$fatherCategories!!},
              brands           = {!!$brands!!},
              tags             = {!!$tags!!},
              maxUpload        = "{{$maxUpload}}",
              products         = {!!$products!!},
              defaultImg       = "{{ asset('image/ecommerce/products/default.png') }}",
              prev       			 = "{!!$prev!!}",
              routes = {logout : "{!! route('logout')!!}" }
    </script>

    <script src="{{asset('assets/js/components/dashboard/compiled.min.js')}}"></script>
  </body>
</html>
