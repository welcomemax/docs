const mix = require('laravel-mix');

mix.js('resources/es6/app.es6', 'public/js')
   .stylus('resources/stylus/app.styl', 'public/css');
