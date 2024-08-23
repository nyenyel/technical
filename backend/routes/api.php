<?php

use App\Http\Controllers\BookController;
use App\Http\Controllers\SearchController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');


Route::apiResource('book', BookController::class);
Route::get('/book', [SearchController::class, 'search']);
Route::get('/genre', [SearchController::class, 'genre']);
