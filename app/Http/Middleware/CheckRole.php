<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CheckRole
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @param  string  $role
     * @return mixed
     */
    public function handle(Request $request, Closure $next, $role)
    {
        if (!Auth::check()) {
            return redirect('auth');
        }

        $user = Auth::user();

        if ($role === 'admin' && $user->isAdmin()) {
            return $next($request);
        }

        if ($role === 'freelancer' && $user->isFreelancer()) {
            return $next($request);
        }

        if ($role === 'client' && $user->isClient()) {
            return $next($request);
        }

        // Redirect to appropriate dashboard based on role
        if ($user->isAdmin()) {
            return redirect()->route('admin.dashboard')->with('error', 'You do not have permission to access that page.');
        } elseif ($user->isFreelancer()) {
            return redirect()->route('freelancer.dashboard')->with('error', 'You do not have permission to access that page.');
        } else {
            return redirect()->route('client.dashboard')->with('error', 'You do not have permission to access that page.');
        }
    }
}
