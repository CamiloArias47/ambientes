let mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.react('resources/assets/js/components/dashboard/index.js', 'public/assets/js/components/dashboard/compiled.min.js');
//mix.react('resources/assets/js/components/shop/containers/index.js', 'public/assets/js/components/shop/compiled.min.js');
