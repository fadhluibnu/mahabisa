<?php

namespace App\Providers;

use App\Http\Middleware\RedirectIfNotAuthenticated;
use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Route;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * Register any authentication / authorization services.
     */
    public function boot(): void
    {
        // Register our auth middleware
        Route::aliasMiddleware('auth', RedirectIfNotAuthenticated::class);
    }
}
