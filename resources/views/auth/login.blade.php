<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8"/>
    <link type="text/css" rel="stylesheet" href="{{asset('assets/css/dashboard/style.css')}}"/>
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <link type="text/css" rel="stylesheet" href="{{asset('assets/plugins/materialize_1.0.0/css/materialize.css')}}"  media="screen,projection"/>
    <title></title>
  </head>
  <body>
    <div class="container">
      <div class="row">
        <div class="col s10 m6 offset-s1 offset-m3">
          <h1 class="center-align">Login</h1>
        </div>
        <div class="col s10 m6 offset-s1 offset-m3 center-align">
          <div class="section z-depth-2 white">
            <form method="POST" action="{{route('login')}}">
                {{ csrf_field() }}
                <div class="input-field col s12">
                  <input id="email" name="email" type="text" class="validate">
                  <label for="email">Email</label>
                </div>
                <div>
                  {!! $errors->first('email', '<spam>:message</spam>') !!}
                </div>
                <div class="input-field col s12">
                  <input id="password" name="password" type="password" class="validate">
                  <label for="password">Contraseña</label>
                </div>
                <div>
                  {!! $errors->first('pass', '<spam>:message</spam>') !!}
                </div>

                <button class="btn waves-effect waves-light btn-large" type="submit" name="action">Entrar</button>
            </form>
          </div>
        </div>
      </div>
    </div>
    <script type="text/javascript" src="{{asset('assets/plugins/materialize_1.0.0/js/materialize.js')}}"></script>
  </body>
</html>
