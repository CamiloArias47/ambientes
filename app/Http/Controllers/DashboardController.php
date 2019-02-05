<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function __construct(){
        $this->middleware('auth');
    }

    public function index(){
      return view('dashboard.dashboard');
    }

    public function getUserAuth(Request $request){
        return response()->json(["name" => auth()->user()->name, "email" => auth()->user()->email]);
    }
}
