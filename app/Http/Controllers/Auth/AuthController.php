<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Role;
use App\Models\Freelancer;
use App\Models\Client;
use App\Models\EducationalInstitution;
use App\Models\EducationLevel;
use App\Models\FreelancerEducation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rules\Password;
use Inertia\Inertia;

class AuthController extends Controller
{
    /**
     * Show the authentication page (login/register)
     */
    public function showAuth(Request $request)
    {
        $formType = $request->query('form', 'login');
        
        return Inertia::render('Auth/Auth', [
            'formType' => $formType,
            'universities' => EducationalInstitution::where('is_verified', true)->get(),
            'educationLevels' => EducationLevel::all()
        ]);
    }

    /**
     * Handle user registration
     */
    public function register(Request $request)
    {
        // Validate the form data
        $validator = Validator::make($request->all(), [
            'firstName' => 'required|string|max:100',
            'lastName' => 'required|string|max:100',
            'email' => 'required|email|max:255|unique:users,email',
            'password' => [
                'required',
                'string',
                Password::min(8)
                    ->letters()
                    ->mixedCase()
                    ->numbers()
                    ->symbols(),
                'confirmed'
            ],
            'university' => 'required|exists:educational_institutions,id',
            'educationLevel' => 'required|exists:education_levels,id',
            'major' => 'required|string|max:100',
            'role' => 'required|in:freelancer,client',
            'agreeTerms' => 'required|accepted',
        ]);

        if ($validator->fails()) {
            return back()->withErrors($validator)->withInput();
        }

        // Begin transaction
        \DB::beginTransaction();

        try {
            // Get the selected role
            $role = Role::where('name', $request->role)->first();

            if (!$role) {
                return back()->withErrors(['role' => 'Invalid role selected'])->withInput();
            }

            // Create the user
            $user = User::create([
                'name' => $request->firstName . ' ' . $request->lastName,
                'email' => $request->email,
                'password' => Hash::make($request->password),
                'role_id' => $role->id,
                'profile_picture' => null, // Default profile picture
                'is_active' => true,
            ]);

            // Create the appropriate profile based on role
            if ($request->role === 'freelancer') {
                $freelancer = Freelancer::create([
                    'user_id' => $user->id,
                    'hourly_rate' => 0, // Default value
                    'availability' => 'available',
                    'rating' => 0,
                    'account_balance' => 0,
                    'total_earnings' => 0,
                    'bio' => null,
                    'skills' => null,
                    'profile_image' => null,
                    'completed_projects' => 0,
                    'is_verified' => false,
                ]);

                // Add education information
                FreelancerEducation::create([
                    'freelancer_id' => $freelancer->id,
                    'educational_institution_id' => $request->university,
                    'education_level_id' => $request->educationLevel,
                    'major' => $request->major,
                    'student_id' => $request->studentId ?? null,
                    'is_current' => true,
                    'is_verified' => false,
                ]);
            } elseif ($request->role === 'client') {
                Client::create([
                    'user_id' => $user->id,
                    'budget' => 0, // Default value
                    'payment_method' => null,
                    'company_name' => null,
                    'company_website' => null,
                    'industry' => null,
                    'position' => null,
                    'bio' => null,
                    'profile_image' => null,
                    'is_verified' => false,
                    'completed_projects' => 0,
                    'total_spent' => 0,
                ]);
            }            \DB::commit();            // Log user in
            Auth::login($user);

            // Redirect to success page
            return redirect()->route('auth.registration.success');
        } catch (\Exception $e) {
            \DB::rollBack();
            return back()->withErrors(['error' => 'Registration failed: ' . $e->getMessage()])->withInput();
        }
    }

    /**
     * Handle user login
     */
    public function login(Request $request)
    {
        $credentials = $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        if (Auth::attempt($credentials, $request->remember)) {
            $request->session()->regenerate();
            
            // Update last login timestamp
            $user = Auth::user();
            $user->last_login = now();
            $user->save();

            return redirect()->intended(route('dashboard'));
        }

        return back()->withErrors([
            'email' => 'The provided credentials do not match our records.',
        ])->withInput($request->except('password'));
    }    /**
     * Handle user logout
     */
    public function logout(Request $request)
    {
        Auth::logout();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect()->route('auth.show');
    }

    /**
     * Show registration success page
     */
    public function registrationSuccess(Request $request)
    {
        $user = Auth::user();
        
        if (!$user) {
            return redirect()->route('auth.show');
        }
        
        return Inertia::render('Auth/RegistrationSuccess', [
            'name' => $user->name,
            'role' => $user->role ? $user->role->name : 'user'
        ]);
    }
}
