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

Route::get('/auth', function () {
    return Inertia::render('Auth/Auth', [
        'formType' => request()->query('form', 'login')
    ]);
});