@extends('layouts.menuLogin')

@section('content')
    <div class="container">
        <div class="row">
            <div class="col s12 m8 l6 offset-m2 offset-l3">
                <div class="card">
                    <div class="card-content">
                        <span class="card-title">Registro</span>
                        <form method="POST" action="{{ route('register') }}">
                            @csrf

                            <div class="row">
                                <div class="input-field col s12">
                                <input value="{{ old('name') }}" id="name" type="text" name="name" class="validate"/>
                                <label for="name">Nombre</label>
                                </div>
                                @if ($errors->has('name'))
                                    <span class="invalid-feedback" role="alert">
                                        <strong>{{ $errors->first('name') }}</strong>
                                    </span>
                                @endif
                            </div>

                            <div class="row">
                                <div class="input-field col s12">
                                <input value="{{ old('email') }}" id="email" type="email" name="email" class="validate" required/>
                                <label for="email">Email</label>
                                </div>
                            </div>

                            <div class="row">
                                <div class="input-field col s12">
                                <input  id="password" type="password" name="password" class="validate" required/>
                                <label for="password">Contraseña</label>
                                </div>
                            </div>

                            <div class="row">
                                <div class="input-field col s12">
                                <input  id="password_confirmation" type="password" name="password_confirmation" class="validate" required/>
                                <label for="password_confirmation">Confirmar contraseña</label>
                                </div>
                            </div>
        
                            <div class="form-group row mb-0">
                                <div class="col-md-6 offset-md-4">
                                    <button type="submit" class="btn btn-primary">
                                        Registrarse
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

@section('scripts')
    <script>

        @if ($errors->has('password'))
            var toastHTML = '<span>{!!$errors->first("password")!!}</span><button class="btn-flat toast-action">Cerrar</button>';
            M.toast({html: toastHTML});
        @endif()

        @if ($errors->has('email'))
            var toastHTML = '<span>{!!$errors->first("email")!!}</span><button class="btn-flat toast-action">Cerrar</button>';
            M.toast({html: toastHTML});
        @endif()

    </script>
@endsection()
