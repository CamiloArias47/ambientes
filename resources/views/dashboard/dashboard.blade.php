@extends('layouts.appDashboard')

@section('contenido')
  <h1>You are login {{ auth()->user()->name }}</h1>
  <div class="section">
    <form method="POST" action="{{ route('logout') }}">
      {{ csrf_field() }}
      <button class="btn waves-effect waves-light" type="submit" name="action">Cerrar sesión
        <i class="material-icons right">send</i>
      </button>
    </form>
  </div>
@endsection
