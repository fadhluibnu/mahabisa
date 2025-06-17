<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\SearchController;

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

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// Public API endpoints
Route::prefix('v1')->group(function () {
    // Search endpoints
    Route::get('/search/services', [SearchController::class, 'services']);
    Route::get('/search/freelancers', [SearchController::class, 'freelancers']);
    Route::get('/categories', [SearchController::class, 'categories']);
    
    // Service details
    Route::get('/services/{id}', [App\Http\Controllers\API\ServiceController::class, 'show']);
    
    // Freelancer details
    Route::get('/freelancers/{id}', [App\Http\Controllers\API\FreelancerController::class, 'show']);
    
    // Project details
    Route::get('/projects/{id}', [App\Http\Controllers\API\ProjectController::class, 'show']);
});

// Payment status check for client
Route::middleware('auth:sanctum')->prefix('payments')->group(function () {
    Route::get('/{id}/check-status', [App\Http\Controllers\OrderController::class, 'checkPaymentStatus']);
});

// Protected API endpoints
// Route::middleware('auth:sanctum')->prefix('v1')->group(function () {
//     // User profile
//     Route::get('/profile', [App\Http\Controllers\API\ProfileController::class, 'show']);
//     Route::put('/profile', [App\Http\Controllers\API\ProfileController::class, 'update']);
    
//     // Dashboard stats
//     Route::get('/dashboard/stats', [App\Http\Controllers\API\DashboardController::class, 'stats']);
    
//     // Notifications
//     Route::get('/notifications', [App\Http\Controllers\API\NotificationController::class, 'index']);
//     Route::post('/notifications/{id}/read', [App\Http\Controllers\API\NotificationController::class, 'markAsRead']);
//     Route::post('/notifications/read-all', [App\Http\Controllers\API\NotificationController::class, 'markAllAsRead']);
// });

// Admin API endpoints
Route::prefix('admin')->middleware(['auth:sanctum'])->group(function () {
    // Payment management
    Route::prefix('payments')->group(function () {
        Route::get('/', [App\Http\Controllers\AdminController::class, 'getPayments']);
        Route::get('/{id}', [App\Http\Controllers\AdminController::class, 'getPayment']);
        Route::put('/{id}/status', [App\Http\Controllers\AdminController::class, 'updatePaymentStatus']);
    });
    
    // Reports
    Route::prefix('reports')->group(function () {
        Route::get('payments', [App\Http\Controllers\AdminController::class, 'generatePaymentReport']);
        Route::get('payments/download', [App\Http\Controllers\AdminController::class, 'downloadPaymentReport']);
    });
});
