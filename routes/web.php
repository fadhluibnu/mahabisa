<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\AuthController;

// Route::get('/', function () {
//     return view('welcome');
// });

// Define dummy users for testing the navbar with different roles
function getDummyUsers() {
    return [
        'client' => [
            'id' => 1,
            'name' => 'Ahmad Santoso',
            'email' => 'ahmad@example.com',
            'profile_photo' => 'https://randomuser.me/api/portraits/men/32.jpg',
            'role' => 'client',
        ],
        'freelancer' => [
            'id' => 2,
            'name' => 'Siti Rahayu',
            'email' => 'siti@example.com',
            'profile_photo' => 'https://randomuser.me/api/portraits/women/44.jpg',
            'role' => 'freelancer',
        ],
        'admin' => [
            'id' => 3,
            'name' => 'Budi Pratama',
            'email' => 'budi@admin.com',
            'profile_photo' => 'https://randomuser.me/api/portraits/men/62.jpg',
            'role' => 'admin',
        ]
    ];
}

// Helper function to get a dummy user by role or a random one
function getDummyUser($role = null) {
    $users = getDummyUsers();
    
    if ($role && isset($users[$role])) {
        return $users[$role];
    }
    
    // Get requested role from query parameter or use client as default
    $requestedRole = request()->query('user_role', 'admin');
    return isset($users[$requestedRole]) ? $users[$requestedRole] : $users['client'];
}

Route::get('/', function () {
    // Get dummy user for testing navbar
    $dummyUser = getDummyUser();

    return Inertia::render('Homepage/Homepage', [
        'user' => $dummyUser
    ]);
});

// Authentication Routes
Route::get('/auth', function () {
    return Inertia::render('Auth/Auth', [
        'formType' => request()->query('form', 'login')
    ]);
});

Route::post('/login', [AuthController::class, 'login'])->name('login');
Route::post('/register', [AuthController::class, 'register'])->name('register');
Route::post('/logout', [AuthController::class, 'logout'])->name('logout');

Route::get('/eksplorasi', function () {
    // Get dummy user for testing navbar
    $dummyUser = getDummyUser();
    
    return Inertia::render('Explore/Explore', [
        'user' => $dummyUser
    ]);
});

Route::get('/talenta', function () {
    // Get dummy user for testing navbar
    $dummyUser = getDummyUser();
    
    return Inertia::render('Talenta/Talenta', [
        'user' => $dummyUser
    ]);
});

Route::get('/talenta/{id}', function ($id) {
    // Get dummy user for testing navbar
    $dummyUser = getDummyUser();
    
    // In a real app, you would fetch the talent data from the database
    // For now, we'll just pass the ID
    return Inertia::render('Talenta/TalentDetail', [
        'talentId' => $id,
        'user' => $dummyUser
    ]);
});

Route::get('/auth', function () {
    return Inertia::render('Auth/Auth', [
        'formType' => request()->query('form', 'login')
    ]);
});

Route::get('/proyek', function () {
    // Get dummy user for testing navbar
    $dummyUser = getDummyUser();
    
    return Inertia::render('Proyek/Proyek', [
        'user' => $dummyUser
    ]);
});

Route::get('/proyek/{id}', function ($id) {
    // Get dummy user for testing navbar
    $dummyUser = getDummyUser();
    
    return Inertia::render('Proyek/ProjectDetail', [
        'id' => $id,
        'user' => $dummyUser
    ]);
});

Route::get('/jasa/{id}', function ($id) {
    // Get dummy user for testing navbar
    $dummyUser = getDummyUser();
    
    // Passing ID ke halaman detail jasa
    return Inertia::render('Jasa/ServiceDetail', [
        'id' => $id,
        'user' => $dummyUser
    ]);
});

Route::get('/tentang-kami', function () {
    // Get dummy user for testing navbar
    $dummyUser = getDummyUser();
    
    return Inertia::render('About/About', [
        'user' => $dummyUser
    ]);
});

// Admin Routes
Route::prefix('admin')->group(function () {
    Route::get('/', function () {
        // Get admin user for testing
        $dummyUser = getDummyUser('admin');
        return Inertia::render('Admin/Dashboard', [
            'user' => $dummyUser
        ]);
    });
    
    Route::get('/dashboard', function () {
        // Get admin user for testing
        $dummyUser = getDummyUser('admin');
        return Inertia::render('Admin/Dashboard', [
            'user' => $dummyUser
        ]);
    });
    
    Route::get('/users', function () {
        // Get admin user for testing
        $dummyUser = getDummyUser('admin');
        return Inertia::render('Admin/Users', [
            'user' => $dummyUser
        ]);
    });
    
    Route::get('/users/create', function () {
        // Get admin user for testing
        $dummyUser = getDummyUser('admin');
        return Inertia::render('Admin/UserCreate', [
            'user' => $dummyUser
        ]);
    });
    
    Route::get('/users/{id}/edit', function ($id) {
        // Get admin user for testing
        $dummyUser = getDummyUser('admin');
        return Inertia::render('Admin/UserEdit', [
            'user' => $dummyUser,
            'userId' => $id
        ]);
    });
    
    Route::get('/orders', function () {
        // Get admin user for testing
        $dummyUser = getDummyUser('admin');
        return Inertia::render('Admin/Orders', [
            'user' => $dummyUser
        ]);
    });
    
    Route::get('/activities', function () {
        // Get admin user for testing
        $dummyUser = getDummyUser('admin');
        return Inertia::render('Admin/Activities', [
            'user' => $dummyUser
        ]);
    });
    
    Route::get('/payments', function () {
        // Get admin user for testing
        $dummyUser = getDummyUser('admin');
        return Inertia::render('Admin/Payments', [
            'user' => $dummyUser
        ]);
    });
    
    Route::get('/payments/create', function () {
        // Get admin user for testing
        $dummyUser = getDummyUser('admin');
        return Inertia::render('Admin/PaymentCreate', [
            'user' => $dummyUser
        ]);
    });
    
    Route::get('/payments/{id}/edit', function ($id) {
        // Get admin user for testing
        $dummyUser = getDummyUser('admin');
        return Inertia::render('Admin/PaymentEdit', [
            'user' => $dummyUser,
            'paymentId' => $id
        ]);
    });
    
    Route::get('/settings', function () {
        // Get admin user for testing
        $dummyUser = getDummyUser('admin');
        return Inertia::render('Admin/Settings', [
            'user' => $dummyUser
        ]);
    });
});

// Freelancer Routes
Route::prefix('freelancer')->group(function () {
    Route::get('/', function () {
        // Get freelancer user for testing
        $dummyUser = getDummyUser('freelancer');
        return Inertia::render('Freelancer/Dashboard', [
            'user' => $dummyUser
        ]);
    });
    
    Route::get('/dashboard', function () {
        // Get freelancer user for testing
        $dummyUser = getDummyUser('freelancer');
        return Inertia::render('Freelancer/Dashboard', [
            'user' => $dummyUser
        ]);
    });
    
    Route::get('/projects', function () {
        // Get freelancer user for testing
        $dummyUser = getDummyUser('freelancer');
        return Inertia::render('Freelancer/Projects', [
            'user' => $dummyUser
        ]);
    });
    
    Route::get('/projects/create', function () {
        // Get freelancer user for testing
        $dummyUser = getDummyUser('freelancer');
        return Inertia::render('Freelancer/ProjectCreate', [
            'user' => $dummyUser
        ]);
    });
    
    Route::get('/projects/{id}', function ($id) {
        // Get freelancer user for testing
        $dummyUser = getDummyUser('freelancer');
        return Inertia::render('Freelancer/ProjectDetail', [
            'id' => $id,
            'user' => $dummyUser
        ]);
    });
    
    Route::get('/projects/{id}/edit', function ($id) {
        // Get freelancer user for testing
        $dummyUser = getDummyUser('freelancer');
        return Inertia::render('Freelancer/ProjectCreate', [
            'id' => $id, 
            'isEditing' => true,
            'user' => $dummyUser
        ]);
    });
    
    Route::get('/schedule', function () {
        // Get freelancer user for testing
        $dummyUser = getDummyUser('freelancer');
        return Inertia::render('Freelancer/Schedule', [
            'user' => $dummyUser
        ]);
    });
    
    Route::get('/earnings', function () {
        // Get freelancer user for testing
        $dummyUser = getDummyUser('freelancer');
        return Inertia::render('Freelancer/Earnings', [
            'user' => $dummyUser
        ]);
    });
    
    Route::get('/earnings/{id}', function ($id) {
        // Get freelancer user for testing
        $dummyUser = getDummyUser('freelancer');
        return Inertia::render('Freelancer/EarningsDetail', [
            'id' => $id,
            'user' => $dummyUser
        ]);
    });
    
    Route::get('/messages', function () {
        // Get freelancer user for testing
        $dummyUser = getDummyUser('freelancer');
        return Inertia::render('Freelancer/Messages', [
            'user' => $dummyUser
        ]);
    });
    
    Route::get('/messages/{id}', function ($id) {
        // Get freelancer user for testing
        $dummyUser = getDummyUser('freelancer');
        return Inertia::render('Freelancer/MessageDetail', [
            'id' => $id,
            'user' => $dummyUser
        ]);
    });
    
    Route::get('/reviews', function () {
        // Get freelancer user for testing
        $dummyUser = getDummyUser('freelancer');
        return Inertia::render('Freelancer/Reviews', [
            'user' => $dummyUser
        ]);
    });
    
    Route::get('/reviews/{id}', function ($id) {
        // Get freelancer user for testing
        $dummyUser = getDummyUser('freelancer');
        return Inertia::render('Freelancer/ReviewDetail', [
            'id' => $id,
            'user' => $dummyUser
        ]);
    });
    
    Route::get('/profile', function () {
        // Get freelancer user for testing
        $dummyUser = getDummyUser('freelancer');
        return Inertia::render('Freelancer/Profile', [
            'user' => $dummyUser
        ]);
    });
    
    Route::get('/skills', function () {
        // Get freelancer user for testing
        $dummyUser = getDummyUser('freelancer');
        return Inertia::render('Freelancer/Skills', [
            'user' => $dummyUser
        ]);
    });
    
    Route::get('/services', function () {
        // Get freelancer user for testing
        $dummyUser = getDummyUser('freelancer');
        return Inertia::render('Freelancer/Services', [
            'user' => $dummyUser
        ]);
    });
    
    Route::get('/services/create', function () {
        // Get freelancer user for testing
        $dummyUser = getDummyUser('freelancer');
        return Inertia::render('Freelancer/ServiceCreate', [
            'user' => $dummyUser
        ]);
    });
    
    Route::get('/services/{id}', function ($id) {
        // Get freelancer user for testing
        $dummyUser = getDummyUser('freelancer');
        return Inertia::render('Freelancer/ServiceDetail', [
            'id' => $id,
            'user' => $dummyUser
        ]);
    });
    
    Route::get('/services/{id}/edit', function ($id) {
        // Get freelancer user for testing
        $dummyUser = getDummyUser('freelancer');
        return Inertia::render('Freelancer/ServiceCreate', [
            'id' => $id, 
            'isEditing' => true,
            'user' => $dummyUser
        ]);
    });
    
    Route::get('/offers', function () {
        // Get freelancer user for testing
        $dummyUser = getDummyUser('freelancer');
        return Inertia::render('Freelancer/Offers', [
            'user' => $dummyUser
        ]);
    });
    
    Route::get('/payments', function () {
        // Get freelancer user for testing
        $dummyUser = getDummyUser('freelancer');
        return Inertia::render('Freelancer/Payments', [
            'user' => $dummyUser
        ]);
    });
    
    Route::get('/settings', function () {
        // Get freelancer user for testing
        $dummyUser = getDummyUser('freelancer');
        return Inertia::render('Freelancer/Settings', [
            'user' => $dummyUser
        ]);
    });
});

// Client Routes
Route::prefix('client')->group(function () {
    Route::get('/', function () {
        // Get client user for testing
        $dummyUser = getDummyUser('client');
        return Inertia::render('Client/Dashboard', [
            'user' => $dummyUser
        ]);
    });
    
    Route::get('/dashboard', function () {
        // Get client user for testing
        $dummyUser = getDummyUser('client');
        return Inertia::render('Client/Dashboard', [
            'user' => $dummyUser
        ]);
    });
    
    Route::get('/projects', function () {
        // Get client user for testing
        $dummyUser = getDummyUser('client');
        return Inertia::render('Client/Projects', [
            'user' => $dummyUser
        ]);
    });
    
    Route::get('/projects/create', function () {
        // Get client user for testing
        $dummyUser = getDummyUser('client');
        return Inertia::render('Client/ProjectCreate', [
            'user' => $dummyUser
        ]);
    });
    
    Route::get('/projects/{id}', function ($id) {
        // Get client user for testing
        $dummyUser = getDummyUser('client');
        return Inertia::render('Client/ProjectDetail', [
            'id' => $id,
            'user' => $dummyUser
        ]);
    });
    
    Route::get('/profile', function () {
        // Get client user for testing
        $dummyUser = getDummyUser('client');
        return Inertia::render('Client/Profile', [
            'user' => $dummyUser
        ]);
    });
    
    Route::get('/profile/{id}', function ($id) {
        // Get client user for testing
        $dummyUser = getDummyUser('client');
        return Inertia::render('Client/ProfileView', [
            'id' => $id,
            'user' => $dummyUser
        ]);
    });
    
    Route::get('/messages', function () {
        // Get client user for testing
        $dummyUser = getDummyUser('client');
        return Inertia::render('Client/Messages', [
            'user' => $dummyUser
        ]);
    });
    
    Route::get('/reviews', function () {
        // Get client user for testing
        $dummyUser = getDummyUser('client');
        return Inertia::render('Client/Reviews', [
            'user' => $dummyUser
        ]);
    });
    
    Route::get('/settings', function () {
        // Get client user for testing
        $dummyUser = getDummyUser('client');
        return Inertia::render('Client/Settings', [
            'user' => $dummyUser
        ]);
    });
    
    Route::get('/freelancers', function () {
        // Get client user for testing
        $dummyUser = getDummyUser('client');
        return Inertia::render('Client/FreelancerList', [
            'user' => $dummyUser
        ]);
    });
    
    Route::get('/services', function () {
        // Get client user for testing
        $dummyUser = getDummyUser('client');
        return Inertia::render('Client/ServiceList', [
            'user' => $dummyUser
        ]);
    });
    
    Route::get('/services/{id}', function ($id) {
        // Get client user for testing
        $dummyUser = getDummyUser('client');
        return Inertia::render('Client/ServiceDetail', [
            'id' => $id,
            'user' => $dummyUser
        ]);
    });
    
    Route::get('/payments', function () {
        // Get client user for testing
        $dummyUser = getDummyUser('client');
        return Inertia::render('Client/Payments', [
            'user' => $dummyUser
        ]);
    });
});