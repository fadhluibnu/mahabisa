<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Route::get('/', function () {
//     return view('welcome');
// });

Route::get('/test', function () {
    return Inertia::render('Test/Test');
});

Route::get('/', function () {
    return Inertia::render('Homepage/Homepage');
});

Route::get('/eksplorasi', function () {
    return Inertia::render('Explore/Explore');
});

Route::get('/talenta', function () {
    return Inertia::render('Talenta/Talenta');
});

// Dashboard Route (Protected)
Route::get('/dashboard', 'App\Http\Controllers\DashboardController@index')
    ->name('dashboard')
    ->middleware(['auth']);

// Authentication Routes
Route::group(['prefix' => 'auth', 'namespace' => 'App\Http\Controllers\Auth'], function () {
    Route::get('/', 'AuthController@showAuth')->name('auth.show');
    Route::post('/register', 'AuthController@register')->name('auth.register');
    Route::post('/login', 'AuthController@login')->name('auth.login');
    Route::post('/logout', 'AuthController@logout')->name('auth.logout')->middleware('auth');
    Route::get('/registration-success', 'AuthController@registrationSuccess')->name('auth.registration.success')->middleware('auth');
});