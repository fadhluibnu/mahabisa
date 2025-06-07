<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        // Register the notification service as a singleton
        $this->app->singleton(\App\Services\NotificationService::class, function ($app) {
            return new \App\Services\NotificationService();
        });
        
        // Register other project services
        $this->app->bind(\App\Services\ProjectService::class);
        $this->app->bind(\App\Services\ServiceService::class);
        $this->app->bind(\App\Services\UserProfileService::class);
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        // Share auth data with all Inertia views
        Inertia::share([
            'auth' => function () {
                $user = Auth::user();
                
                if (!$user) {
                    return ['user' => null];
                }
                
                // Load user with profile for sidebar display
                $user->load('profile');
                
                // Load notifications count for authenticated users
                $notificationCount = 0;
                if ($user) {
                    $notificationService = app(\App\Services\NotificationService::class);
                    $notificationCount = $notificationService->getUnreadCount();
                }
                
                return [
                    'user' => [
                        'id' => $user->id,
                        'name' => $user->name,
                        'email' => $user->email,
                        'profile_photo_url' => $user->profile_photo_url ?? null,
                        'role' => $user->role ?? 'user',
                        'unread_notifications' => $notificationCount,
                        'profile' => $user->profile ? [
                            'bio' => $user->profile->bio,
                            'phone_number' => $user->profile->phone_number,
                            'address' => $user->profile->address,
                            'city' => $user->profile->city,
                            'province' => $user->profile->province,
                            'is_verified' => $user->profile->is_verified,
                        ] : null,
                    ],
                ];
            },
            // Flash messages for success/error feedback
            'flash' => function () {
                return [
                    'success' => session('success'),
                    'error' => session('error'),
                ];
            },
        ]);
    }
}
