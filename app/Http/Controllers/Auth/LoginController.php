<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use Auth;

class LoginController extends Controller
{
  public function __construct(){
      $this->middleware('guest', ['only'=>'ShowLoginForm']);
  }

  public function login(){

    $credentials = $this->validate(request(), [
      $this->UserName() => 'required',
      'password' => 'required'
    ]);

    if (Auth::attempt($credentials) ){
      return redirect()->route('dashboard');
    }

    return back()->withErrors([$this->UserName() => "credenciales incorrectas"]);
  }

  public function ShowLoginForm(){
    return view('auth.login');
  }

  public function logout(){
    Auth::logout();

    return redirect('/');
  }

  public function UserName(){
    return "email";
  }
}
