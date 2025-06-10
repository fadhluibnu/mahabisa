<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Order;
use App\Models\Payment;
use App\Models\Activity;
use App\Models\Review;
use App\Models\Service;
use App\Models\Project;
use App\Models\Setting;
use App\Models\Withdrawal;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

class AdminController extends Controller
{
    /**
     * Create a new controller instance.
     */
    public function __construct()
    {
        // No middleware registration needed here
        // The middleware is applied at the route level with 'auth' and 'role:admin'
    }

    /**
     * Display the admin dashboard.
     */
    public function dashboard()
    {
        // Calculate growth percentages by comparing with previous period
        $now = now();
        $thisMonth = $now->format('m');
        $thisYear = $now->format('Y');
        $lastMonth = $now->subMonth()->format('m');
        $lastMonthYear = $now->format('Y');

        // Total users count
        $currentUsersCount = User::count();
        $lastMonthUsersCount = User::whereMonth('created_at', '<', $thisMonth)
            ->count();
        $usersGrowth = $lastMonthUsersCount > 0
            ? round((($currentUsersCount - $lastMonthUsersCount) / $lastMonthUsersCount) * 100, 1)
            : 100;

        // Active projects
        $currentProjectsCount = Project::where('status', 'open')->count();
        $lastMonthProjectsCount = Project::whereMonth('created_at', $lastMonth)
            ->whereYear('created_at', $lastMonthYear)
            ->where('status', 'open')
            ->count();
        $projectsGrowth = $lastMonthProjectsCount > 0
            ? round((($currentProjectsCount - $lastMonthProjectsCount) / $lastMonthProjectsCount) * 100, 1)
            : 100;

        // Revenue
        $currentRevenue = Payment::where('status', 'completed')->sum('amount');
        $lastMonthRevenue = Payment::whereMonth('created_at', $lastMonth)
            ->whereYear('created_at', $lastMonthYear)
            ->where('status', 'completed')
            ->sum('amount');
        $revenueGrowth = $lastMonthRevenue > 0
            ? round((($currentRevenue - $lastMonthRevenue) / $lastMonthRevenue) * 100, 1)
            : 100;

        // Platform rating
        $averageRating = Review::avg('rating') ?? 0;
        $lastMonthRating = Review::whereMonth('created_at', $lastMonth)
            ->whereYear('created_at', $lastMonthYear)
            ->avg('rating') ?? 0;
        $ratingGrowth = $lastMonthRating > 0
            ? round((($averageRating - $lastMonthRating) / $lastMonthRating) * 100, 1)
            : 0;

        $stats = [
            'users_count' => $currentUsersCount,
            'users_growth' => $usersGrowth,
            'clients_count' => User::where('role', 'client')->count(),
            'freelancers_count' => User::where('role', 'freelancer')->count(),
            'active_projects_count' => $currentProjectsCount,
            'projects_growth' => $projectsGrowth,
            'all_projects_count' => Project::count(),
            'services_count' => Service::count(),
            'revenue' => $currentRevenue,
            'revenue_growth' => $revenueGrowth,
            'pending_withdrawal_count' => Withdrawal::where('status', 'pending')->count(),
            'average_rating' => $averageRating,
            'rating_growth' => $ratingGrowth,
        ];

        // Get traffic data for the chart
        // In a real application, this would come from analytics data
        // For now, we'll generate some plausible numbers
        $trafficData = [];
        for ($i = 6; $i >= 0; $i--) {
            $month = $now->copy()->subMonths($i);
            $baseVisitors = 8000 + rand(0, 2000);
            $newVisitors = round($baseVisitors * 0.6);

            $trafficData[] = [
                'month' => $month->format('M'),
                'totalVisitors' => $baseVisitors + ($i * 1000),
                'newVisitors' => $newVisitors + ($i * 600),
            ];
        }

        // Format for chartData
        $chartData = [
            'labels' => collect($trafficData)->pluck('month')->toArray(),
            'totalVisitors' => collect($trafficData)->pluck('totalVisitors')->toArray(),
            'newVisitors' => collect($trafficData)->pluck('newVisitors')->toArray(),
        ];

        // Get recent orders with related models
        $recentOrders = Order::with(['client', 'freelancer', 'service', 'project'])
            ->orderBy('created_at', 'desc')
            ->take(10)
            ->get()
            ->map(function ($order) {
                return [
                    'id' => $order->id,
                    'title' => $order->service
                        ? $order->service->title
                        : ($order->project ? $order->project->title : 'Unnamed Order'),
                    'freelancer' => [
                        'id' => $order->freelancer->id,
                        'name' => $order->freelancer->name,
                        'avatar' => $order->freelancer->profile_photo_url ??
                            'https://ui-avatars.com/api/?name=' . urlencode($order->freelancer->name),
                    ],
                    'client' => [
                        'id' => $order->client->id,
                        'name' => $order->client->name,
                        'avatar' => $order->client->profile_photo_url ??
                            'https://ui-avatars.com/api/?name=' . urlencode($order->client->name),
                    ],
                    'deadline' => $order->deadline,
                    'status' => $order->status,
                    'amount' => $order->amount,
                ];
            });

        // Get recent activities with user details
        $recentActivities = Activity::with('user')
            ->orderBy('created_at', 'desc')
            ->take(15)
            ->get()
            ->map(function ($activity) {
                return [
                    'id' => $activity->id,
                    'user' => [
                        'id' => $activity->user->id,
                        'name' => $activity->user->name,
                        'avatar' => $activity->user->profile_photo_url ??
                            'https://ui-avatars.com/api/?name=' . urlencode($activity->user->name),
                        'role' => $activity->user->role,
                    ],
                    'type' => $activity->type,
                    'description' => $activity->description,
                    'created_at' => $activity->created_at,
                ];
            });

        // Get top freelancers by earnings and rating
        $topFreelancers = User::where('role', 'freelancer')
            ->withCount(['receivedReviews as reviews_count', 'freelancerOrders as orders_count'])
            ->withAvg('receivedReviews as average_rating', 'rating')
            ->withSum(['freelancerOrders as total_earnings' => function ($query) {
                $query->where('status', 'completed');
            }], 'amount')
            ->orderByDesc('total_earnings')
            ->take(5)
            ->get()
            ->map(function ($freelancer) {
                return [
                    'id' => $freelancer->id,
                    'name' => $freelancer->name,
                    'avatar' => $freelancer->profile_photo_url ??
                        'https://ui-avatars.com/api/?name=' . urlencode($freelancer->name),
                    'orders_count' => $freelancer->orders_count,
                    'reviews_count' => $freelancer->reviews_count,
                    'average_rating' => $freelancer->average_rating ?? 0,
                    'total_earnings' => $freelancer->total_earnings ?? 0,
                ];
            });

        // Get recent reviews with ratings
        $recentReviews = Review::with(['client', 'freelancer', 'order'])
            ->orderBy('created_at', 'desc')
            ->take(5)
            ->get()
            ->map(function ($review) {
                return [
                    'id' => $review->id,
                    'client' => [
                        'id' => $review->client->id,
                        'name' => $review->client->name,
                        'avatar' => $review->client->profile_photo_url ??
                            'https://ui-avatars.com/api/?name=' . urlencode($review->client->name),
                    ],
                    'freelancer' => [
                        'id' => $review->freelancer->id,
                        'name' => $review->freelancer->name,
                        'avatar' => $review->freelancer->profile_photo_url ??
                            'https://ui-avatars.com/api/?name=' . urlencode($review->freelancer->name),
                    ],
                    'rating' => $review->rating,
                    'comment' => $review->comment,
                    'created_at' => $review->created_at,
                    'order' => [
                        'id' => $review->order->id,
                        'title' => $review->order->service
                            ? $review->order->service->title
                            : ($review->order->project ? $review->order->project->title : 'Unnamed Order'),
                    ],
                ];
            });

        return Inertia::render('Admin/Dashboard', [
            'stats' => $stats,
            'chartData' => $chartData,
            'recentOrders' => $recentOrders,
            'recentActivities' => $recentActivities,
            'topFreelancers' => $topFreelancers,
            'recentReviews' => $recentReviews,
            'user' => Auth::user()
        ]);
    }

    /**
     * Display a listing of the users.
     */
    public function users()
    {
        // Paginate users with 10 users per page
        $users = User::orderBy('created_at', 'desc')->paginate(10);

        // Get user statistics for the dashboard cards
        $totalUsers = User::count();
        $totalFreelancers = User::where('role', 'freelancer')->count();
        $totalClients = User::where('role', 'client')->count();
        
        // Calculate new users in the last 30 days
        $now = now();
        $thirtyDaysAgo = $now->copy()->subDays(30);
        $sixtyDaysAgo = $now->copy()->subDays(60);
        
        $newUsers = User::where('created_at', '>=', $thirtyDaysAgo)->count();
        $lastMonthNewUsers = User::whereBetween('created_at', [$sixtyDaysAgo, $thirtyDaysAgo])->count();
        
        // Calculate new freelancers and clients in the last 30 days
        $newFreelancers = User::where('role', 'freelancer')
            ->where('created_at', '>=', $thirtyDaysAgo)
            ->count();
        
        $newClients = User::where('role', 'client')
            ->where('created_at', '>=', $thirtyDaysAgo)
            ->count();
        
        // Create a stats object to pass to the view
        $stats = [
            'totalUsers' => $totalUsers,
            'totalFreelancers' => $totalFreelancers,
            'totalClients' => $totalClients,
            'newUsers' => $newUsers,
            'lastMonthNewUsers' => $lastMonthNewUsers,
            'newFreelancers' => $newFreelancers,
            'newClients' => $newClients
        ];

        return Inertia::render('Admin/Users', [
            'users' => $users,
            'stats' => $stats,
            'user' => Auth::user()
        ]);
    }

    /**
     * Show the create user form.
     *
     * @return \Inertia\Response
     */
    public function createUser()
    {
        return Inertia::render('Admin/UserCreate');
    }

    /**
     * Store a newly created user.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function storeUser(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8|confirmed',
            'role' => 'required|in:admin,client,freelancer'
        ]);

        $user = User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => Hash::make($validated['password']),
            'role' => $validated['role']
        ]);

        return redirect()->route('admin.users')->with('success', 'User created successfully');
    }

    /**
     * Show the edit user form.
     *
     * @param  int  $id
     * @return \Inertia\Response
     */
    public function editUser($id)
    {
        $user = User::findOrFail($id);
        
        return Inertia::render('Admin/UserEdit', [
            'userData' => $user
        ]);
    }

    /**
     * Update the specified user.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\RedirectResponse
     */
    public function updateUser(Request $request, $id)
    {
        $user = User::findOrFail($id);

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users,email,' . $id,
            'role' => 'required|in:admin,client,freelancer'
        ]);

        // Only validate password if it's provided
        if ($request->filled('password')) {
            $request->validate([
                'password' => 'string|min:8|confirmed'
            ]);
            $validated['password'] = Hash::make($request->password);
        }

        $user->update($validated);

        return redirect()->route('admin.users')->with('success', 'User updated successfully');
    }

    /**
     * Delete the specified user.
     *
     * @param  int  $id
     * @return \Illuminate\Http\RedirectResponse
     */
    public function deleteUser($id)
    {
        $user = User::findOrFail($id);
        
        // Prevent deleting yourself
        if ($user->id === Auth::id()) {
            return redirect()->route('admin.users')->with('error', 'You cannot delete your own account');
        }
        
        // Delete the user
        $user->delete();
        
        return redirect()->route('admin.users')->with('success', 'User deleted successfully');
    }

    /**
     * Display a listing of the orders.
     */
    public function orders()
    {
        // Get all orders with their relationships
        $orders = Order::with([
            'client',
            'freelancer',
            'project',
            'service',
            'payments'
        ])->get();

        // Transform order data for the frontend
        $transformedOrders = $orders->map(function ($order) {
            $projectTitle = $order->project ? $order->project->title : ($order->service ? $order->service->title : 'Custom Order');

            $progress = 0;
            switch ($order->status) {
                case 'pending':
                    $progress = 10;
                    break;
                case 'in-progress':
                    $progress = 50;
                    break;
                case 'revision-requested':
                    $progress = 75;
                    break;
                case 'delivered':
                    $progress = 90;
                    break;
                case 'completed':
                    $progress = 100;
                    break;
                case 'cancelled':
                case 'disputed':
                    $progress = 0;
                    break;
            }

            // Translate status to Indonesian
            $statusMap = [
                'pending' => 'Pending',
                'in-progress' => 'Aktif',
                'revision-requested' => 'Revisi',
                'delivered' => 'Terkirim',
                'completed' => 'Selesai',
                'cancelled' => 'Dibatalkan',
                'disputed' => 'Konflik',
            ];

            // Get project category
            $category = '';
            if ($order->project && $order->project->category) {
                $category = $order->project->category->name;
            } elseif ($order->service && $order->service->category) {
                $category = $order->service->category->name;
            }

            // Generate project short name
            $words = explode(' ', $projectTitle);
            $short = '';
            if (count($words) >= 2) {
                $short = strtoupper(substr($words[0], 0, 1) . substr($words[1], 0, 1));
            } else {
                $short = strtoupper(substr($projectTitle, 0, 2));
            }

            return [
                'id' => 'ORD-' . $order->order_number,
                'title' => $projectTitle,
                'projectShort' => $short,
                'client' => [
                    'name' => $order->client->name,
                    'avatar' => $order->client->profile_photo_url ?? 'https://ui-avatars.com/api/?name=' . urlencode($order->client->name),
                ],
                'freelancer' => [
                    'name' => $order->freelancer->name,
                    'avatar' => $order->freelancer->profile_photo_url ?? 'https://ui-avatars.com/api/?name=' . urlencode($order->freelancer->name),
                ],
                'price' => 'Rp ' . number_format($order->amount, 0, ',', '.'),
                'deadline' => $order->due_date->format('d M Y'),
                'status' => $statusMap[$order->status] ?? $order->status,
                'progress' => $progress,
                'description' => $order->requirements ?? 'No description provided',
                'category' => $category,
                'tags' => [$category],
                'messages' => rand(0, 15), // This would be replaced with actual message count in a real application
                'files' => 0, // This would be replaced with actual file count in a real application
                'raw_order' => $order, // Include the raw order for detailed processing
            ];
        });

        // Get categories for filtering
        $categories = Category::all()->pluck('name');

        return Inertia::render('Admin/Orders', [
            'orderData' => $transformedOrders,
            'categories' => $categories,
        ]);
    }

    /**
     * Display the details for a specific order.
     */
    public function showOrder($id)
    {
        $order = Order::with([
            'client',
            'freelancer',
            'project',
            'service',
            'payments'
        ])->findOrFail($id);

        return Inertia::render('Admin/OrderDetail', [
            'order' => $order,
        ]);
    }

    /**
     * Update the status of an order.
     */
    public function updateOrderStatus(Request $request, $id)
    {
        $validatedData = $request->validate([
            'status' => 'required|string|in:pending,in-progress,revision-requested,delivered,completed,cancelled,disputed',
        ]);

        $order = Order::findOrFail($id);
        $order->status = $validatedData['status'];
        $order->save();

        // Create an activity record for this action
        Activity::create([
            'user_id' => Auth::id(),
            'subject_type' => 'order',
            'subject_id' => $order->id,
            'action' => 'updated_status',
            'description' => 'Admin changed order status to ' . $validatedData['status'],
        ]);

        return redirect()->back()->with('success', 'Order status updated successfully.');
    }

    /**
     * Display a listing of the activities.
     */
    public function activities()
    {
        $activities = Activity::with('user')
            ->orderBy('created_at', 'desc')
            ->paginate(30);

        return Inertia::render('Admin/Activities', [
            'activities' => $activities,
            'user' => Auth::user()
        ]);
    }

    /**
     * Display a listing of payments.
     */
    public function payments(Request $request)
    {
        $status = $request->input('status');
        
        $query = Payment::with([
            'client', 
            'order.freelancer', 
            'order.project.category', 
            'order.service.category'
        ]);
        
        if ($status && $status !== 'all') {
            $query->where('status', $status);
        }
        
        $payments = $query->orderBy('created_at', 'desc')
            ->paginate(20);
            
        // Transform payment data for frontend
        $payments->getCollection()->transform(function ($payment) {
            return [
                'id' => $payment->id,
                'payment_id' => $payment->payment_id,
                'order_id' => $payment->order_id,
                'client_id' => $payment->client_id,
                'amount' => $payment->amount,
                'payment_method' => $payment->payment_method,
                'status' => $payment->status,
                'notes' => $payment->notes,
                'receipt_url' => $payment->receipt_url,
                'paid_at' => $payment->paid_at,
                'created_at' => $payment->created_at,
                'updated_at' => $payment->updated_at,
                'client' => $payment->client,
                'order' => $payment->order ? [
                    'id' => $payment->order->id,
                    'freelancer' => $payment->order->freelancer,
                    'project' => $payment->order->project,
                    'service' => $payment->order->service,
                ] : null,
            ];
        });

        return Inertia::render('Admin/Payments', [
            'payments' => $payments,
            'user' => Auth::user(),
            'filters' => $request->only(['status']),
        ]);
    }

    /**
     * Show the form for creating a new payment.
     */
    public function createPayment()
    {
        $orders = Order::where('status', '!=', 'completed')
            ->with(['client', 'freelancer'])
            ->get();

        return Inertia::render('Admin/PaymentCreate', [
            'orders' => $orders,
            'user' => Auth::user()
        ]);
    }

    /**
     * Store a newly created payment in storage.
     */
    public function storePayment(Request $request)
    {
        $validated = $request->validate([
            'order_id' => 'required|exists:orders,id',
            'payment_id' => 'required|string|unique:payments',
            'amount' => 'required|numeric|min:0',
            'payment_method' => 'required|string',
            'status' => 'required|string',
            'notes' => 'nullable|string',
            'receipt_url' => 'nullable|url',
        ]);

        $order = Order::findOrFail($validated['order_id']);

        $payment = Payment::create([
            'payment_id' => $validated['payment_id'],
            'order_id' => $validated['order_id'],
            'client_id' => $order->client_id,
            'amount' => $validated['amount'],
            'payment_method' => $validated['payment_method'],
            'status' => $validated['status'],
            'notes' => $validated['notes'] ?? null,
            'receipt_url' => $validated['receipt_url'] ?? null,
            'paid_at' => now(),
        ]);

        if ($validated['status'] === 'completed') {
            $order->status = 'in-progress';
            $order->save();
        }

        return redirect()->route('admin.payments')->with('success', 'Payment created successfully.');
    }

    /**
     * Show the form for editing the specified payment.
     */
    public function editPayment($id)
    {
        $payment = Payment::with(['client', 'order'])->findOrFail($id);

        return Inertia::render('Admin/PaymentEdit', [
            'payment' => $payment,
            'user' => Auth::user()
        ]);
    }

    /**
     * Update the specified payment in storage.
     */
    public function updatePayment(Request $request, $id)
    {
        $payment = Payment::findOrFail($id);

        $validated = $request->validate([
            'payment_id' => 'required|string|unique:payments,payment_id,' . $id,
            'amount' => 'required|numeric|min:0',
            'payment_method' => 'required|string',
            'status' => 'required|string',
            'notes' => 'nullable|string',
            'receipt_url' => 'nullable|url',
        ]);

        $payment->update([
            'payment_id' => $validated['payment_id'],
            'amount' => $validated['amount'],
            'payment_method' => $validated['payment_method'],
            'status' => $validated['status'],
            'notes' => $validated['notes'] ?? null,
            'receipt_url' => $validated['receipt_url'] ?? null,
        ]);

        if ($validated['status'] === 'completed' && $payment->order->status === 'pending') {
            $payment->order->status = 'in-progress';
            $payment->order->save();
        }

        return redirect()->route('admin.payments')->with('success', 'Payment updated successfully.');
    }

    /**
     * Display the settings page.
     */
    public function settings()
    {
        // Get all settings from the database, organized by group
        $dbSettings = Setting::all()->groupBy('group');
        
        // Transform settings into a more convenient structure
        $settings = [
            'general' => $this->getSettingsForGroup($dbSettings, 'general', [
                'allow_registration' => true,
                'maintenance_mode' => false,
            ]),
            'fee' => $this->getSettingsForGroup($dbSettings, 'fee', [
                'platform_fee_percentage' => 20,
                'minimum_commission' => 10000,
                'withdraw_fee' => 5000,
                'minimum_withdraw' => 50000,
                'automatic_withdrawal' => true,
            ]),
            'security' => $this->getSettingsForGroup($dbSettings, 'security', [
                'password_min_length' => 8,
                'password_require_letters_numbers' => true,
                'password_require_special_chars' => false,
                'password_expiry_days' => 90,
            ]),
            'payment' => $this->getSettingsForGroup($dbSettings, 'payment', [
                'enable_midtrans' => true,
                'midtrans_client_key' => 'SB-Mid-client-xxxxxxxxxxxxxxxx',
                'midtrans_server_key' => 'SB-Mid-server-xxxxxxxxxxxxxxxx',
                'midtrans_sandbox' => true,
                'enable_qris' => true,
                'payment_methods' => [
                    'bank_transfer' => true,
                    'credit_card' => true,
                    'e_wallet' => true,
                    'qris' => true,
                    'paylater' => false,
                    'retail' => true,
                ],
            ]),
        ];

        $categories = Category::all();

        return Inertia::render('Admin/Settings', [
            'settings' => $settings,
            'categories' => $categories,
            'user' => Auth::user()
        ]);
    }
    
    /**
     * Get settings for a specific group, using defaults if not found in database
     *
     * @param \Illuminate\Support\Collection $dbSettings
     * @param string $group
     * @param array $defaults
     * @return array
     */
    private function getSettingsForGroup($dbSettings, $group, $defaults)
    {
        $result = [];
        
        if (!isset($dbSettings[$group])) {
            return $defaults;
        }
        
        foreach ($defaults as $key => $defaultValue) {
            $setting = $dbSettings[$group]->firstWhere('key', $key);
            
            if ($setting) {
                $result[$key] = Setting::castValue($setting->value, $setting->type);
            } else {
                $result[$key] = $defaultValue;
            }
        }
        
        return $result;
    }

    /**
     * Update system settings
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function updateSettings(Request $request)
    {
        try {
            $settings = $request->except(['_token', '_method']);
            
            foreach ($settings as $key => $value) {
                // Determine setting type based on value
                $type = 'string';
                if (is_bool($value)) {
                    $type = 'boolean';
                } elseif (is_numeric($value) && strpos($value, '.') === false) {
                    $type = 'integer';
                } elseif (is_numeric($value)) {
                    $type = 'float';
                } elseif (is_array($value)) {
                    $type = 'array';
                    $value = json_encode($value);
                }
                
                // Set the setting
                $group = $this->determineSettingGroup($key);
                Setting::set($key, $value, $group, $type);
            }
            
            return response()->json(['success' => true, 'message' => 'Pengaturan berhasil disimpan']);
        } catch (\Exception $e) {
            return response()->json(['success' => false, 'message' => 'Gagal menyimpan pengaturan: ' . $e->getMessage()], 500);
        }
    }
    
    /**
     * Determine the group of a setting based on its key
     *
     * @param string $key
     * @return string
     */
    private function determineSettingGroup($key)
    {
        if (strpos($key, 'platform_fee') === 0 || 
            strpos($key, 'commission_') === 0 || 
            strpos($key, 'withdraw_') === 0 || 
            strpos($key, 'minimum_') === 0 || 
            strpos($key, 'automatic_withdrawal') === 0) {
            return 'fee';
        }
        
        if (strpos($key, 'password_') === 0 || strpos($key, 'security_') === 0) {
            return 'security';
        }
        
        if (strpos($key, 'enable_') === 0 || 
            strpos($key, 'midtrans_') === 0 || 
            strpos($key, 'qris_') === 0 ||
            strpos($key, 'payment_') === 0) {
            return 'payment';
        }
        
        return 'general';
    }

    /**
     * Generate payment report data for a specific date range
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function generatePaymentReport(Request $request)
    {
        $startDate = $request->input('startDate');
        $endDate = $request->input('endDate');
        
        $query = Payment::with([
            'client', 
            'order.freelancer', 
            'order.project.category', 
            'order.service.category'
        ]);
        
        if ($startDate) {
            $query->whereDate('created_at', '>=', $startDate);
        }
        
        if ($endDate) {
            $query->whereDate('created_at', '<=', $endDate);
        }
        
        $payments = $query->orderBy('created_at', 'desc')->get();
        
        // Transform payment data for frontend
        $payments = $payments->map(function ($payment) {
            return [
                'id' => $payment->id,
                'payment_id' => $payment->payment_id,
                'order_id' => $payment->order_id,
                'client_id' => $payment->client_id,
                'amount' => $payment->amount,
                'payment_method' => $payment->payment_method,
                'status' => $payment->status,
                'notes' => $payment->notes,
                'receipt_url' => $payment->receipt_url,
                'paid_at' => $payment->paid_at,
                'created_at' => $payment->created_at,
                'client' => $payment->client,
                'order' => $payment->order ? [
                    'id' => $payment->order->id,
                    'freelancer' => $payment->order->freelancer,
                    'project' => $payment->order->project,
                    'service' => $payment->order->service,
                ] : null,
            ];
        });
        
        // Calculate summary data
        $totalAmount = $payments->sum('amount');
        $totalCommission = $totalAmount * 0.2; // Assuming 20% commission
        
        return response()->json([
            'payments' => $payments,
            'summary' => [
                'totalAmount' => $totalAmount,
                'totalCommission' => $totalCommission,
                'freelancerAmount' => $totalAmount - $totalCommission,
                'count' => $payments->count()
            ]
        ]);
    }

    /**
     * Download payment report as PDF or Excel
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function downloadPaymentReport(Request $request)
    {
        $format = $request->input('format', 'pdf');
        $startDate = $request->input('startDate');
        $endDate = $request->input('endDate');
        
        $query = Payment::with(['client', 'order']);
        
        if ($startDate) {
            $query->whereDate('created_at', '>=', $startDate);
        }
        
        if ($endDate) {
            $query->whereDate('created_at', '<=', $endDate);
        }
        
        $payments = $query->orderBy('created_at', 'desc')->get();
        
        // In a real application, you would generate the PDF or Excel here
        // For this example, we'll just return a simple text response
        return response("Payment report in $format format would be downloaded here for the period $startDate to $endDate with " . $payments->count() . " transactions.");
    }

    /**
     * API method to get payments with filters
     */
    public function getPayments(Request $request)
    {
        $status = $request->input('status');
        $startDate = $request->input('startDate');
        $endDate = $request->input('endDate');
        $search = $request->input('search');
        $perPage = $request->input('perPage', 20);
        
        $query = Payment::with([
            'client', 
            'order.freelancer', 
            'order.project.category', 
            'order.service.category'
        ]);
        
        if ($status && $status !== 'all') {
            $query->where('status', $status);
        }
        
        if ($startDate) {
            $query->whereDate('created_at', '>=', $startDate);
        }
        
        if ($endDate) {
            $query->whereDate('created_at', '<=', $endDate);
        }
        
        if ($search) {
            $query->where(function($q) use ($search) {
                $q->where('payment_id', 'like', "%{$search}%")
                  ->orWhereHas('client', function($q) use ($search) {
                      $q->where('name', 'like', "%{$search}%");
                  });
            });
        }
        
        $payments = $query->orderBy('created_at', 'desc')
            ->paginate($perPage);
            
        // Transform payment data for frontend
        $payments->getCollection()->transform(function ($payment) {
            return [
                'id' => $payment->id,
                'payment_id' => $payment->payment_id,
                'order_id' => $payment->order_id,
                'client_id' => $payment->client_id,
                'amount' => $payment->amount,
                'payment_method' => $payment->payment_method,
                'status' => $payment->status,
                'notes' => $payment->notes,
                'receipt_url' => $payment->receipt_url,
                'paid_at' => $payment->paid_at,
                'created_at' => $payment->created_at,
                'updated_at' => $payment->updated_at,
                'client' => $payment->client,
                'order' => $payment->order ? [
                    'id' => $payment->order->id,
                    'freelancer' => $payment->order->freelancer,
                    'project' => $payment->order->project,
                    'service' => $payment->order->service,
                ] : null,
            ];
        });
        
        // Calculate stats
        $allPayments = Payment::all();
        $stats = [
            'totalPayments' => $allPayments->count(),
            'totalAmount' => $allPayments->sum('amount'),
            'totalCommission' => $allPayments->sum('amount') * 0.2, // Assuming 20% commission
            'pendingPayments' => $allPayments->where('status', 'pending')->count()
        ];
        
        return response()->json([
            'payments' => $payments,
            'stats' => $stats
        ]);
    }
    
    /**
     * API method to get a specific payment
     */
    public function getPayment($id)
    {
        $payment = Payment::with([
            'client', 
            'order.freelancer', 
            'order.project.category', 
            'order.service.category'
        ])->findOrFail($id);
        
        return response()->json($payment);
    }
    
    /**
     * API method to update payment status
     */
    public function updatePaymentStatus(Request $request, $id)
    {
        $payment = Payment::findOrFail($id);
        
        $validated = $request->validate([
            'status' => 'required|string|in:pending,paid,failed,refunded,cancelled',
        ]);
        
        $payment->status = $validated['status'];
        $payment->save();
        
        // If payment is completed/paid, update the order status
        if ($validated['status'] === 'paid' && $payment->order && $payment->order->status === 'pending') {
            $payment->order->status = 'in-progress';
            $payment->order->save();
        }
        
        return response()->json($payment);
    }
}
