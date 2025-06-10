<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\ClientController;
use App\Http\Controllers\FreelancerController;

// Route::get('/', function () {
//     return view('welcome');
// });

// Routes are now using proper authentication and middleware

// Public routes accessible by all users
Route::get('/', [App\Http\Controllers\HomeController::class, 'index'])->name('home');

// Authentication Routes
Route::get('/auth', function () {
    return Inertia::render('Auth/Auth', [
        'formType' => request()->query('form', 'login')
    ]);
})->name('login');

Route::post('/login', [AuthController::class, 'login']);
// ->name('login');
Route::post('/register', [AuthController::class, 'register'])->name('register');
Route::post('/logout', [AuthController::class, 'logout'])->name('logout');

// Public exploration pages
Route::get('/eksplorasi', [App\Http\Controllers\HomeController::class, 'explore'])->name('explore');

// Public talent pages
Route::get('/talenta', [App\Http\Controllers\HomeController::class, 'talents'])->name('talents');

Route::get('/talenta/{id}', [App\Http\Controllers\HomeController::class, 'showTalent'])->name('talents.show');

// Public project pages
Route::get('/proyek', [App\Http\Controllers\HomeController::class, 'projects'])->name('projects');

Route::get('/proyek/{id}', [App\Http\Controllers\HomeController::class, 'showProject'])->name('projects.show');

// Public service pages
Route::get('/jasa/{id}', [App\Http\Controllers\HomeController::class, 'showService'])->name('services.show');

// About page
Route::get('/tentang-kami', [App\Http\Controllers\HomeController::class, 'about'])->name('about');

// Admin Routes
Route::prefix('admin')->middleware(['auth', 'role:admin'])->group(function () {
    // Dashboard
    Route::get('/', [AdminController::class, 'dashboard'])->name('admin.dashboard');
    Route::get('/dashboard', [AdminController::class, 'dashboard'])->name('admin.dashboard');
    
    // User Management
    Route::get('/users', [AdminController::class, 'users'])->name('admin.users');
    Route::get('/users/create', [AdminController::class, 'createUser'])->name('admin.users.create');
    Route::post('/users/store', [AdminController::class, 'storeUser'])->name('admin.users.store');
    Route::get('/users/{id}/edit', [AdminController::class, 'editUser'])->name('admin.users.edit');
    Route::put('/users/{id}', [AdminController::class, 'updateUser'])->name('admin.users.update');
    Route::delete('/users/{id}', [AdminController::class, 'deleteUser'])->name('admin.users.delete');
    
    // Order Management
    Route::get('/orders', [AdminController::class, 'orders'])->name('admin.orders');
    Route::get('/orders/{id}', [AdminController::class, 'showOrder'])->name('admin.orders.show');
    Route::put('/orders/{id}/status', [AdminController::class, 'updateOrderStatus'])->name('admin.orders.update-status');
    
    // Activities
    Route::get('/activities', [AdminController::class, 'activities'])->name('admin.activities');
    
    // Payment Management
    Route::get('/payments', [AdminController::class, 'payments'])->name('admin.payments');
    Route::get('/payments/create', [AdminController::class, 'createPayment'])->name('admin.payments.create');
    Route::post('/payments/store', [AdminController::class, 'storePayment'])->name('admin.payments.store');
    Route::get('/payments/{id}/edit', [AdminController::class, 'editPayment'])->name('admin.payments.edit');
    Route::put('/payments/{id}', [AdminController::class, 'updatePayment'])->name('admin.payments.update');
    
    // Withdrawal Management
    Route::get('/withdrawals', [AdminController::class, 'withdrawals'])->name('admin.withdrawals');
    Route::put('/withdrawals/{id}/approve', [AdminController::class, 'approveWithdrawal'])->name('admin.withdrawals.approve');
    Route::put('/withdrawals/{id}/reject', [AdminController::class, 'rejectWithdrawal'])->name('admin.withdrawals.reject');
    
    // Category Management
    Route::get('/categories', [AdminController::class, 'categories'])->name('admin.categories');
    Route::post('/categories/store', [AdminController::class, 'storeCategory'])->name('admin.categories.store');
    Route::put('/categories/{id}', [AdminController::class, 'updateCategory'])->name('admin.categories.update');
    Route::delete('/categories/{id}', [AdminController::class, 'deleteCategory'])->name('admin.categories.delete');
    
    // Settings
    Route::get('/settings', [AdminController::class, 'settings'])->name('admin.settings');
    Route::post('/settings', [AdminController::class, 'updateSettings'])->name('admin.settings.update');
    
    // Reports
    Route::get('/reports', [AdminController::class, 'reports'])->name('admin.reports');
    Route::get('/reports/revenue', [AdminController::class, 'revenueReport'])->name('admin.reports.revenue');
    Route::get('/reports/users', [AdminController::class, 'usersReport'])->name('admin.reports.users');
    Route::get('/reports/orders', [AdminController::class, 'ordersReport'])->name('admin.reports.orders');
});

// Freelancer Routes
Route::prefix('freelancer')->middleware(['auth', 'role:freelancer'])->group(function () {
    // Dashboard
    Route::get('/', [FreelancerController::class, 'dashboard'])->name('freelancer.dashboard');
    Route::get('/dashboard', [FreelancerController::class, 'dashboard'])->name('freelancer.dashboard');
    
    // Projects & Proposals
    Route::get('/projects', [FreelancerController::class, 'projects'])->name('freelancer.projects');
    Route::get('/projects/{id}', [FreelancerController::class, 'showProject'])->name('freelancer.projects.show');
    Route::post('/projects/{id}/proposals', [FreelancerController::class, 'submitProposal'])->name('freelancer.proposals.submit');
    Route::get('/proposals', [FreelancerController::class, 'proposals'])->name('freelancer.proposals');
    Route::get('/proposals/{id}', [FreelancerController::class, 'showProposal'])->name('freelancer.proposals.show');
    Route::put('/proposals/{id}', [FreelancerController::class, 'updateProposal'])->name('freelancer.proposals.update');
    Route::delete('/proposals/{id}', [FreelancerController::class, 'deleteProposal'])->name('freelancer.proposals.delete');
    
    // Schedule
    Route::get('/schedule', [FreelancerController::class, 'schedule'])->name('freelancer.schedule');
    Route::post('/schedule', [FreelancerController::class, 'updateSchedule'])->name('freelancer.schedule.update');
    
    // Earnings & Withdrawals
    Route::get('/earnings', [FreelancerController::class, 'earnings'])->name('freelancer.earnings');
    Route::post('/withdrawals', [FreelancerController::class, 'requestWithdrawal'])->name('freelancer.withdrawals.request');
    Route::get('/withdrawals', [FreelancerController::class, 'withdrawalHistory'])->name('freelancer.withdrawals.history');
    
    // Messages
    Route::get('/messages', [FreelancerController::class, 'messages'])->name('freelancer.messages');
    Route::get('/messages/{conversation_id}', [FreelancerController::class, 'showConversation'])->name('freelancer.messages.conversation');
    Route::post('/messages', [FreelancerController::class, 'sendMessage'])->name('freelancer.messages.send');
    
    // Reviews
    Route::get('/reviews', [FreelancerController::class, 'reviews'])->name('freelancer.reviews');
    Route::post('/reviews', [FreelancerController::class, 'storeReview'])->name('freelancer.reviews.store');
    
    // Profile management
    Route::get('/profile', [FreelancerController::class, 'profile'])->name('freelancer.profile');
    Route::put('/profile', [FreelancerController::class, 'updateProfile'])->name('freelancer.profile.update');
    
    // Education management
    Route::get('/education', [FreelancerController::class, 'education'])->name('freelancer.education');
    Route::post('/education', [FreelancerController::class, 'storeEducation'])->name('freelancer.education.store');
    Route::put('/education/{id}', [FreelancerController::class, 'updateEducation'])->name('freelancer.education.update');
    Route::delete('/education/{id}', [FreelancerController::class, 'deleteEducation'])->name('freelancer.education.delete');
    
    // Experience management
    Route::get('/experience', [FreelancerController::class, 'experience'])->name('freelancer.experience');
    Route::post('/experience', [FreelancerController::class, 'storeExperience'])->name('freelancer.experience.store');
    Route::put('/experience/{id}', [FreelancerController::class, 'updateExperience'])->name('freelancer.experience.update');
    Route::delete('/experience/{id}', [FreelancerController::class, 'deleteExperience'])->name('freelancer.experience.delete');
    
    // Portfolio management
    Route::get('/portfolio', [FreelancerController::class, 'portfolio'])->name('freelancer.portfolio');
    Route::post('/portfolio', [FreelancerController::class, 'storePortfolio'])->name('freelancer.portfolio.store');
    Route::put('/portfolio/{id}', [FreelancerController::class, 'updatePortfolio'])->name('freelancer.portfolio.update');
    Route::delete('/portfolio/{id}', [FreelancerController::class, 'deletePortfolio'])->name('freelancer.portfolio.delete');
    
    // Skills management
    Route::get('/skills', [FreelancerController::class, 'skills'])->name('freelancer.skills');
    Route::post('/skills', [FreelancerController::class, 'storeSkill'])->name('freelancer.skills.store');
    Route::delete('/skills/{id}', [FreelancerController::class, 'deleteSkill'])->name('freelancer.skills.delete');
    
    // Services
    Route::get('/services', [FreelancerController::class, 'services'])->name('freelancer.services');
    Route::get('/services/create', [FreelancerController::class, 'createService'])->name('freelancer.services.create');
    Route::post('/services', [FreelancerController::class, 'storeService'])->name('freelancer.services.store');
    Route::get('/services/{id}', [FreelancerController::class, 'showService'])->name('freelancer.services.show');
    Route::get('/services/{id}/edit', [FreelancerController::class, 'editService'])->name('freelancer.services.edit');
    Route::put('/services/{id}', [FreelancerController::class, 'updateService'])->name('freelancer.services.update');
    Route::delete('/services/{id}', [FreelancerController::class, 'deleteService'])->name('freelancer.services.delete');
    Route::put('/services/{id}/toggle-status', [FreelancerController::class, 'toggleServiceStatus'])->name('freelancer.services.toggle-status');
    Route::get('/services/{id}/orders', [FreelancerController::class, 'serviceOrders'])->name('freelancer.services.orders');
    
    // Offers
    Route::get('/offers', [FreelancerController::class, 'offers'])->name('freelancer.offers');
    
    // Payments (using the existing methods instead of the duplicated route)
    Route::get('/payments', [FreelancerController::class, 'payments'])->name('freelancer.payments');
    
    // Withdrawal (using the withdrawal method instead of a separate route)
    Route::get('/withdrawal', [FreelancerController::class, 'withdrawal'])->name('freelancer.withdrawal');
    
    // Settings
    Route::get('/settings', [FreelancerController::class, 'settings'])->name('freelancer.settings');
});
// Client Routes
Route::prefix('client')->middleware(['auth', 'role:client'])->group(function () {
    // Dashboard
    Route::get('/', [ClientController::class, 'dashboard'])->name('client.dashboard');
    Route::get('/dashboard', [ClientController::class, 'dashboard'])->name('client.dashboard');
    
    // Projects
    Route::get('/projects', [ClientController::class, 'projects'])->name('client.projects');
    Route::get('/projects/create', [ClientController::class, 'createProject'])->name('client.projects.create');
    Route::post('/projects', [ClientController::class, 'storeProject'])->name('client.projects.store');
    Route::get('/projects/{id}', [ClientController::class, 'showProject'])->name('client.projects.show');
    Route::get('/projects/{id}/edit', [ClientController::class, 'editProject'])->name('client.projects.edit');
    Route::put('/projects/{id}', [ClientController::class, 'updateProject'])->name('client.projects.update');
    Route::delete('/projects/{id}', [ClientController::class, 'deleteProject'])->name('client.projects.delete');
    
    // Profile management
    Route::get('/profile', [ClientController::class, 'profile'])->name('client.profile');
    Route::put('/profile', [ClientController::class, 'updateProfile'])->name('client.profile.update');
    
    // Messages
    Route::get('/messages', [ClientController::class, 'messages'])->name('client.messages');
    Route::get('/messages/{conversation_id}', [ClientController::class, 'showConversation'])->name('client.messages.conversation');
    Route::post('/messages', [ClientController::class, 'sendMessage'])->name('client.messages.send');
    
    // Reviews
    Route::get('/reviews', [ClientController::class, 'reviews'])->name('client.reviews');
    Route::post('/orders/{id}/review', [ClientController::class, 'submitReview'])->name('client.reviews.submit');
    Route::put('/reviews/{id}', [ClientController::class, 'updateReview'])->name('client.reviews.update');
    
    // Settings
    Route::get('/settings', [ClientController::class, 'settings'])->name('client.settings');
    
    // Services
    Route::get('/services', [ClientController::class, 'services'])->name('client.services');
    Route::get('/services/{id}', [ClientController::class, 'showService'])->name('client.services.show');
    Route::post('/services/{id}/order', [ClientController::class, 'orderService'])->name('client.services.order');
    
    // Freelancer browsing
    Route::get('/freelancers', [ClientController::class, 'freelancers'])->name('client.freelancers');
    Route::get('/freelancers/{id}', [ClientController::class, 'showFreelancer'])->name('client.freelancers.show');
    
    // Payments
    Route::get('/payments', [ClientController::class, 'payments'])->name('client.payments');
    Route::post('/payments', [ClientController::class, 'createPayment'])->name('client.payments.create');
    Route::get('/payments/{id}', [ClientController::class, 'showPayment'])->name('client.payments.show');
    
    // Orders
    Route::get('/orders', [ClientController::class, 'orders'])->name('client.orders');
    Route::get('/orders/{id}', [ClientController::class, 'showOrder'])->name('client.orders.show');
    Route::put('/orders/{id}/status', [ClientController::class, 'updateOrderStatus'])->name('client.orders.update-status');
});

// Shared routes for authenticated users
Route::middleware('auth')->group(function () {
    // Notifications
    Route::get('/notifications', [App\Http\Controllers\NotificationController::class, 'index']);
    Route::post('/notifications/{id}/read', [App\Http\Controllers\NotificationController::class, 'markAsRead']);
    Route::post('/notifications/read-all', [App\Http\Controllers\NotificationController::class, 'markAllAsRead']);
    
    // User profile
    Route::get('/profile', [App\Http\Controllers\UserProfileController::class, 'show']);
    Route::put('/profile', [App\Http\Controllers\UserProfileController::class, 'update']);
    
    // Account settings
    Route::get('/account/settings', [App\Http\Controllers\UserProfileController::class, 'settings']);
    Route::put('/account/password', [App\Http\Controllers\UserProfileController::class, 'updatePassword']);
    
    // Redirect based on role
    Route::get('/redirect', function () {
        if (auth()->user()->isAdmin()) {
            return redirect()->route('admin.dashboard');
        } elseif (auth()->user()->isFreelancer()) {
            return redirect()->route('freelancer.dashboard');
        } else {
            return redirect()->route('client.dashboard');
        }
    })->name('redirect');
});

// Catch-all route for 404 errors
Route::fallback(function () {
    return Inertia::render('Errors/NotFound');
});