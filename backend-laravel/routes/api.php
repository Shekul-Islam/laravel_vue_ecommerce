<?php


use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TopbarController;

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

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });

Route::get('/posts', function(){
    return response()->json([
        ['id'=>1, 'title'=>'laravel api', 'content' => 'laravel api using json'],
        ['id'=>2, 'title'=>'data fetch', 'content'=> 'call data using vue']
    ]);
});


Route::get('/topbar', [TopbarController::class, 'index']);


