<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

class AuthController extends Controller
{
    public function showLoginForm()
    {
        return Inertia::render('Auth/Auth');
    }

    public function login(Request $request)
    {
        $credentials = $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        if (Auth::attempt($credentials)) {
            $request->session()->regenerate();

            // Redirect based on user role
            $user = Auth::user();
            if ($user->role === 'admin') {
                return redirect()->intended('/admin/dashboard');
            } elseif ($user->role === 'freelancer') {
                return redirect()->intended('/freelancer/dashboard');
            } else {
                return redirect()->intended('/client/dashboard');
            }
        }

        return back()->withErrors([
            'email' => 'The provided credentials do not match our records.',
        ]);
    }

    public function logout(Request $request)
    {
        Auth::logout();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect('/');
    }

    public function register(Request $request)
    {
        // Get security settings from admin configuration
        $passwordMinLength = \App\Models\Setting::get('password_min_length', 8);
        $requireUppercase = \App\Models\Setting::get('password_require_uppercase', true);
        $requireLowercase = \App\Models\Setting::get('password_require_lowercase', true);
        $requireNumbers = \App\Models\Setting::get('password_require_numbers', true);
        $requireSpecialChars = \App\Models\Setting::get('password_require_special', false);
        
        // Build dynamic password validation rules
        $passwordRules = ['required', 'string', "min:{$passwordMinLength}", 'confirmed'];
        
        if ($requireUppercase) {
            $passwordRules[] = 'regex:/[A-Z]/';
        }
        
        if ($requireLowercase) {
            $passwordRules[] = 'regex:/[a-z]/';
        }
        
        if ($requireNumbers) {
            $passwordRules[] = 'regex:/[0-9]/';
        }
        
        if ($requireSpecialChars) {
            $passwordRules[] = 'regex:/[^A-Za-z0-9]/';
        }
            
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => $passwordRules,
            'role' => 'required|in:client,freelancer',
            'university' => 'nullable|string|max:255',
        ]);

        // Begin a transaction to ensure both user and profile are created or none is
        \DB::beginTransaction();
        
        try {
            // Create the user
            $user = User::create([
                'name' => $validated['name'],
                'email' => $validated['email'],
                'password' => Hash::make($validated['password']),
                'role' => $validated['role'],
            ]);

            // Create user profile
            $user->profile()->create([
                'university' => $validated['university'] ?? null,
            ]);
            
            \DB::commit();
            
            // Login the newly registered user
            Auth::login($user);
            
            // Redirect based on role
            if ($user->role === 'freelancer') {
                return redirect()->route('freelancer.dashboard');
            } else {
                return redirect()->route('client.dashboard');
            }
        } catch (\Exception $e) {
            \DB::rollback();
            
            return back()->withErrors([
                'general' => 'Terjadi kesalahan saat mendaftar. Silakan coba lagi.'
            ])->withInput();
        }
    }
}
