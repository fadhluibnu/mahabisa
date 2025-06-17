<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use App\Models\Setting;
use Illuminate\Support\Facades\Validator;

class SecurityValidation
{
    /**
     * Handle an incoming request applying dynamic security and privacy rules
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle(Request $request, Closure $next)
    {
        // Only apply to registration routes
        if ($request->is('register') || $request->is('*/register')) {
            // Get security settings
            $passwordMinLength = Setting::get('password_min_length', 8);
            $requireUppercase = Setting::get('password_require_uppercase', true);
            $requireLowercase = Setting::get('password_require_lowercase', true);
            $requireNumbers = Setting::get('password_require_numbers', true);
            $requireSpecialChars = Setting::get('password_require_special', false);
            
            // Build dynamic password validation rules
            $passwordRules = ['required', "min:{$passwordMinLength}"];
            
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
            
            // Apply validation rules
            $validator = Validator::make($request->all(), [
                'password' => $passwordRules,
            ]);
            
            if ($validator->fails()) {
                return redirect()->back()->withErrors($validator)->withInput();
            }
        }

        return $next($request);
    }
}
