<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\AdminWithdrawalController;
use App\Http\Controllers\ClientController;
use App\Http\Controllers\ClientPaymentController;
use App\Http\Controllers\FreelancerController;
use App\Http\Controllers\FreelancerWithdrawalController;
use App\Http\Controllers\FileController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\PaymentController;
use App\Http\Controllers\AISearchController;

// Route::get('/', function () {
//     return view('welcome');
// });

// Routes are now using proper authentication and middleware

// Public routes accessible by all users
Route::get('/', [App\Http\Controllers\HomeController::class, 'index'])->name('home');

// AI Search endpoint
Route::post('/search/ai', [AISearchController::class, 'search']);

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
    Route::post('/payments/{id}/confirm', [App\Http\Controllers\OrderController::class, 'adminConfirmPayment'])->name('admin.payments.confirm');
    
    // Withdrawal Management
    Route::get('/withdrawals', [AdminWithdrawalController::class, 'index'])->name('admin.withdrawals');
    Route::get('/withdrawals/{id}', [AdminWithdrawalController::class, 'show'])->name('admin.withdrawals.show');
    Route::post('/withdrawals/{id}/approve', [AdminWithdrawalController::class, 'approve'])->name('admin.withdrawals.approve');
    Route::post('/withdrawals/{id}/reject', [AdminWithdrawalController::class, 'reject'])->name('admin.withdrawals.reject');
    
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
    
    // Earnings, Payments & Withdrawals - Updated with FreelancerPaymentController
    Route::get('/earnings', [FreelancerController::class, 'earnings'])->name('freelancer.earnings');
    Route::get('/orders', [App\Http\Controllers\FreelancerPaymentController::class, 'orders'])->name('freelancer.orders');
    Route::get('/payments', [App\Http\Controllers\FreelancerPaymentController::class, 'payments'])->name('freelancer.payments');
    Route::get('/withdrawal', [App\Http\Controllers\FreelancerPaymentController::class, 'withdrawal'])->name('freelancer.withdrawal');
    Route::post('/withdrawal', [App\Http\Controllers\FreelancerPaymentController::class, 'storeWithdrawal'])->name('freelancer.withdrawal.store');
    Route::post('/payment-methods', [App\Http\Controllers\FreelancerPaymentController::class, 'storePaymentMethod'])->name('freelancer.payment-methods.store');
    Route::delete('/payment-methods/{id}', [App\Http\Controllers\FreelancerPaymentController::class, 'deletePaymentMethod'])->name('freelancer.payment-methods.delete');
    Route::put('/payment-methods/{id}/default', [App\Http\Controllers\FreelancerPaymentController::class, 'setDefaultPaymentMethod'])->name('freelancer.payment-methods.default');
    
    // Legacy withdrawal routes - redirected to new controller
    Route::get('/withdrawals', [App\Http\Controllers\FreelancerPaymentController::class, 'withdrawal'])->name('freelancer.withdrawals');
    Route::post('/withdrawals', [App\Http\Controllers\FreelancerPaymentController::class, 'storeWithdrawal'])->name('freelancer.withdrawals.request');
    Route::get('/withdrawals/history', [App\Http\Controllers\FreelancerWithdrawalController::class, 'history'])->name('freelancer.withdrawals.history');
    Route::get('/withdrawals/{id}', [FreelancerWithdrawalController::class, 'show'])->name('freelancer.withdrawals.show');
    Route::post('/withdrawals/{id}/cancel', [FreelancerWithdrawalController::class, 'cancel'])->name('freelancer.withdrawals.cancel');
    
    // Messages
    Route::get('/messages', [FreelancerController::class, 'messages'])->name('freelancer.messages');
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
    
    // Order management
    Route::get('/orders/{id}', [FreelancerController::class, 'showOrder'])->name('freelancer.orders.show');
    Route::post('/orders/{id}/accept', [OrderController::class, 'acceptOrder'])->name('freelancer.orders.accept');
    Route::post('/orders/{id}/deliver', [OrderController::class, 'completeOrder'])->name('freelancer.orders.deliver');
    Route::post('/orders/{id}/cancel', [OrderController::class, 'cancelOrder'])->name('freelancer.orders.cancel');
    Route::post('/orders/{id}/request-revision', [OrderController::class, 'requestRevision'])->name('freelancer.orders.request-revision');
    
    // File management for order deliverables
    Route::post('/files/upload/{orderId}', [FileController::class, 'uploadOrderFile'])->name('freelancer.files.upload');
    Route::get('/files/download/{id}', [FileController::class, 'download'])->name('files.download');
    
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
    Route::post('/messages', [ClientController::class, 'sendMessage'])->name('client.messages.send');
    
    // Reviews
    Route::get('/reviews', [ClientController::class, 'reviews'])->name('client.reviews');
    Route::post('/orders/{id}/review', [ClientController::class, 'submitReview'])->name('client.reviews.submit');
    Route::put('/reviews/{id}', [ClientController::class, 'updateReview'])->name('client.reviews.update');
    
    // Settings
    Route::get('/settings', [ClientController::class, 'settings'])->name('client.settings');
    
    // Services
    Route::get('/services', [ClientController::class, 'browseServices'])->name('client.services');
    Route::get('/services/{id}', [ClientController::class, 'showService'])->name('client.services.show');
    Route::get('/services/{id}/order', [ClientController::class, 'showOrderService'])->name('client.services.order.form');
    Route::post('/services/{id}/order', [ClientController::class, 'orderService'])->name('client.services.order');

    // Orders 
    Route::get('/orders', [ClientController::class, 'orders'])->name('client.orders'); // Daftar order
    Route::get('/orders/{id}', [ClientController::class, 'showOrder'])->name('client.orders.show'); // Detail order
    Route::post('/orders/{id}/cancel', [App\Http\Controllers\OrderController::class, 'clientCancelOrder'])->name('client.orders.cancel'); // Client membatalkan order
    
    // Order management and payment
    Route::get('/orders/{id}/payment', [App\Http\Controllers\OrderController::class, 'showPaymentPage'])
        ->name('client.order.payment');
    Route::get('/orders/{id}/invoice', [App\Http\Controllers\PaymentController::class, 'showInvoicePage'])
        ->name('client.order.invoice');
    Route::get('/orders/{id}/simple-invoice', [App\Http\Controllers\OrderController::class, 'showSimpleInvoice'])
        ->name('client.order.simple-invoice');
    Route::post('/orders/{id}/payment/process', [App\Http\Controllers\OrderController::class, 'processPayment'])
        ->name('client.order.payment.process');
    Route::get('/orders/{id}/payment/{paymentId}/status', [App\Http\Controllers\OrderController::class, 'checkPaymentStatus'])
        ->name('client.order.payment.status');
    Route::get('/payments/{id}/check-status', [App\Http\Controllers\PaymentController::class, 'checkPaymentStatus'])
        ->name('client.payments.check-status');
    Route::get('/payments/{id}/simple-check', [App\Http\Controllers\OrderController::class, 'simpleCheckPaymentStatus'])
        ->name('client.payments.simple-check');
        
    // File downloads (only for client - after payment)
    Route::get('/files/{id}/download', [\App\Http\Controllers\FileController::class, 'download'])
        ->name('client.files.download');
});

// Message Routes
Route::middleware(['auth'])->group(function () {
    Route::post('/messages/send', [App\Http\Controllers\MessageController::class, 'send'])->name('messages.send');
    Route::get('/messages/order/{orderId}', [App\Http\Controllers\MessageController::class, 'getOrderMessages'])->name('messages.order');
});

// Catch-all route for 404 errors
Route::fallback(function () {
    return Inertia::render('Errors/NotFound');
});