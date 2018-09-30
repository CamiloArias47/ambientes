<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\View\View;

class ComposerShopController extends Controller
{
  /*---esta funcion es la que llama el ComposerServiceProvider, que pasa los permisos a las vistas ---*/
    public function compose(View $view)
    {

            $view->with([
                         'categories'=>[],
                         'brands'=>[],
                         'fatherC'=>[]
                        ]);
    }
}
