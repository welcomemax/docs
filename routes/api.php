<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});



Route::group(
    [
        'prefix' => '/items',
        // 'middleware' => '' // @TODO middleware for private methods
    ],
    function () {
        Route::post('/{id?}/', 'ItemController@save');
        Route::delete('/{id}/', 'ItemController@destroy');
    }
);

Route::group(['prefix' => '/items'], function () {
    Route::get('/{id?}', 'ItemController@index');
});


Route::group(['prefix' => '/types'], function () {
    Route::get('/used', 'TypeController@used');
    Route::get('/{id?}', 'TypeController@index');
});

Route::group(['prefix' => '/products'], function () {
    Route::get('/used', 'ProductController@used');
    Route::get('/{id?}', 'ProductController@index');
});

Route::group(['prefix' => '/tags'], function () {
    Route::get('/used', 'TagController@used');
    Route::get('/{id?}', 'TagController@index');
});

