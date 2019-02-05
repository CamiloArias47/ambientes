<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use Auth;

class LoginController extends Controller
{
  public function __construct(){
      $this->middleware('guest',['except'=>'logout']);
  }

  public function login(){

    $credentials = $this->validate(request(), [
      $this->UserName() => 'required',
      'password' => 'required'
    ]);

    if (Auth::attempt($credentials) ){
      return redirect()->route('shop');
    }

    return back()->withErrors([$this->UserName() => "credenciales incorrectas"]);
  }

  public function ShowLoginForm(){
    return view('auth.login');
  }

  public function logout(){
    Auth::logout();

    return redirect('/ecotienda');
  }

  public function UserName(){
    return "email";
  }
}
