@extends('layouts.menuLogin')
 
 @section('content')
    <div class="container">
        <div class="row">
            <div class="col s12 m8 l6 offset-m2 offset-l3">
                <div class="card">
                    <div class="card-content">
                        <span class="card-title">Iniciar sessión</span>
                        <form method="POST" action="{{ route('login') }}">
                            @csrf

                            <div class="row">
                                <div class="input-field col s12">
                                  <input id="email" name="email" type="text" class="validate" required/>
                                  <label for="email">Email</label>
                                </div>
                                {!! $errors->first('email', '<spam>:message</spam>') !!}
                            </div>

                            <div class="row">
                              <div class="input-field col s12">
                                <input id="password" name="password" type="password" class="validate">
                                <label for="password">Contraseña</label>
                              </div>
                                {!! $errors->first('pass', '<spam>:message</spam>') !!}
                            </div>
                            
                            <div class="form-group row mb-0">
                                <div class="col-md-6 offset-md-4">
                                    <button type="submit" class="btn btn-primary">
                                        Entrar
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>

@endsection()
