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

Route::get('/proyek', function () {
    return Inertia::render('Proyek/Proyek');
});

Route::get('/tentang-kami', function () {
    return Inertia::render('About/About');
});

// Admin Routes
Route::prefix('admin')->group(function () {
    Route::get('/', function () {
        return Inertia::render('Admin/Dashboard');
    });
    
    Route::get('/dashboard', function () {
        return Inertia::render('Admin/Dashboard');
    });
    
    Route::get('/users', function () {
        return Inertia::render('Admin/Users');
    });
    
    Route::get('/orders', function () {
        return Inertia::render('Admin/Orders');
    });
    
    Route::get('/payments', function () {
        return Inertia::render('Admin/Payments');
    });
    
    Route::get('/settings', function () {
        return Inertia::render('Admin/Settings');
    });
});