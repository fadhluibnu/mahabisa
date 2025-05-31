<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Route::get('/', function () {
//     return view('welcome');
// });

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

// Freelancer Routes
Route::prefix('freelancer')->group(function () {
    Route::get('/', function () {
        return Inertia::render('Freelancer/Dashboard');
    });
    
    Route::get('/dashboard', function () {
        return Inertia::render('Freelancer/Dashboard');
    });
    
    Route::get('/projects', function () {
        return Inertia::render('Freelancer/Projects');
    });
    
    Route::get('/projects/create', function () {
        return Inertia::render('Freelancer/ProjectCreate');
    });
    
    Route::get('/projects/{id}', function ($id) {
        return Inertia::render('Freelancer/ProjectDetail', ['id' => $id]);
    });
    
    Route::get('/projects/{id}/edit', function ($id) {
        return Inertia::render('Freelancer/ProjectCreate', ['id' => $id, 'isEditing' => true]);
    });
    
    Route::get('/schedule', function () {
        return Inertia::render('Freelancer/Schedule');
    });
    
    Route::get('/earnings', function () {
        return Inertia::render('Freelancer/Earnings');
    });
    
    Route::get('/earnings/{id}', function ($id) {
        return Inertia::render('Freelancer/EarningsDetail', ['id' => $id]);
    });
    
    Route::get('/messages', function () {
        return Inertia::render('Freelancer/Messages');
    });
    
    Route::get('/messages/{id}', function ($id) {
        return Inertia::render('Freelancer/MessageDetail', ['id' => $id]);
    });
    
    Route::get('/reviews', function () {
        return Inertia::render('Freelancer/Reviews');
    });
    
    Route::get('/reviews/{id}', function ($id) {
        return Inertia::render('Freelancer/ReviewDetail', ['id' => $id]);
    });
    
    Route::get('/profile', function () {
        return Inertia::render('Freelancer/Profile');
    });
    
    Route::get('/skills', function () {
        return Inertia::render('Freelancer/Skills');
    });
    
    Route::get('/services', function () {
        return Inertia::render('Freelancer/Services');
    });
    
    Route::get('/services/create', function () {
        return Inertia::render('Freelancer/ServiceCreate');
    });
    
    Route::get('/services/{id}', function ($id) {
        return Inertia::render('Freelancer/ServiceDetail', ['id' => $id]);
    });
    
    Route::get('/services/{id}/edit', function ($id) {
        return Inertia::render('Freelancer/ServiceCreate', ['id' => $id, 'isEditing' => true]);
    });
    
    Route::get('/offers', function () {
        return Inertia::render('Freelancer/Offers');
    });
    
    Route::get('/payments', function () {
        return Inertia::render('Freelancer/Payments');
    });
    
    Route::get('/settings', function () {
        return Inertia::render('Freelancer/Settings');
    });
});