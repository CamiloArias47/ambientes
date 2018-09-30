<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\View;

class ShopServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap services.
     *
     * @return void
     */
    public function boot()
    {
      View::composer(['shop.layout.menu'], 'App\Http\Controllers\ComposerShopController');  //solo se e pasan a esas vistas las que extiendan de ella no tienen estas variable
    }

    /**
     * Register services.
     *
     * @return void
     */
    public function register()
    {
        //
    }
}
