<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Order;
use App\Models\Project;
use App\Models\Service;
use App\Models\Proposal;
use App\Models\Review;
use App\Models\Education;
use App\Models\Experience;
use App\Models\Portfolio;
use App\Models\Skill;
use App\Models\Payment;
use App\Models\Withdrawal;
use App\Models\Activity;
use App\Models\Message;
use App\Models\UserProfile;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;
use Carbon\Carbon;

class FreelancerController extends Controller
{
    /**
     * Create a new controller instance.
     */
    public function __construct()
    {
        // No middleware registration needed here
        // The middleware is applied at the route level with 'auth' and 'role:freelancer'
    }

    /**
     * Display the freelancer dashboard.
     */
    public function dashboard()
    {
        $user = Auth::user()->load('profile');
        
        // Get stats for the dashboard
        $stats = [
            'completed_orders' => $user->freelancerOrders()->where('status', 'completed')->count(),
            'active_orders' => $user->freelancerOrders()->whereIn('status', ['in-progress', 'revision'])->count(),
            'total_earnings' => $user->freelancerOrders()->where('status', 'completed')->sum('amount'),
            'average_rating' => $user->receivedReviews()->avg('rating') ?? 0,
            'proposals_count' => $user->proposals()->count(),
        ];
        
        // Get recent activities
        $activities = $user->activities()
            ->with('subject')
            ->orderBy('created_at', 'desc')
            ->take(10)
            ->get();
        
        // Get recent orders
        $recentOrders = $user->freelancerOrders()
            ->with('client', 'service', 'project')
            ->orderBy('created_at', 'desc')
            ->take(5)
            ->get();
        
        // Get unread messages count
        $unreadMessagesCount = $user->receivedMessages()
            ->where('is_read', false)
            ->count();
            
        // Get skills for the freelancer
        $skills = $user->skills()->get();
        
        // Get recent earnings breakdown
        $recentEarnings = $user->freelancerOrders()
            ->where('status', 'completed')
            ->with('service', 'project')
            ->orderBy('updated_at', 'desc')
            ->take(3)
            ->get()
            ->map(function ($order) {
                return [
                    'project' => $order->service ? $order->service->title : ($order->project ? $order->project->title : 'Unnamed Project'),
                    'amount' => $order->amount,
                    'date' => $order->updated_at,
                    'status' => $order->status,
                ];
            });
            
        // Get monthly earnings for chart
        $sixMonthsAgo = now()->subMonths(6)->startOfMonth();
        $monthlyEarnings = $user->freelancerOrders()
            ->where('status', 'completed')
            ->where('updated_at', '>=', $sixMonthsAgo)
            ->selectRaw('YEAR(updated_at) as year, MONTH(updated_at) as month, SUM(amount) as total')
            ->groupBy('year', 'month')
            ->orderBy('year')
            ->orderBy('month')
            ->get();
            
        // Format chart data
        $chartData = [
            'labels' => [],
            'earnings' => [],
            'projects' => []
        ];
        
        // Generate labels for the past 6 months
        for ($i = 6; $i >= 0; $i--) {
            $month = now()->subMonths($i);
            $chartData['labels'][] = $month->format('M');
            
            // Default to 0 if no earnings for this month
            $monthEarning = $monthlyEarnings->first(function ($item) use ($month) {
                return $item->year == $month->year && $item->month == $month->month;
            });
            
            $chartData['earnings'][] = $monthEarning ? $monthEarning->total : 0;
            
            // Count projects for this month
            $projectsCount = $user->freelancerOrders()
                ->where('status', 'completed')
                ->whereYear('updated_at', $month->year)
                ->whereMonth('updated_at', $month->month)
                ->count();
                
            $chartData['projects'][] = $projectsCount;
        }
        
        // Get upcoming schedule events (deadlines, meetings, etc.)
        $today = now()->format('Y-m-d');
        $scheduleEvents = $user->freelancerOrders()
            ->whereIn('status', ['in-progress', 'revision'])
            ->with('client', 'service', 'project')
            ->get()
            ->map(function ($order) {
                $deadline = $order->deadline ?? now()->addDays(random_int(1, 7)); // Fallback if no deadline set
                $meetingTime = now()->addDays(random_int(0, 3))->format('H:i');
                
                return [
                    'time' => [
                        'hour' => date('H:i', strtotime($meetingTime)),
                        'period' => 'WIB'
                    ],
                    'title' => $order->service 
                        ? "Deadline: {$order->service->title}" 
                        : "Meeting: {$order->project->title}",
                    'description' => $order->service 
                        ? "Submit final deliverables to client" 
                        : "Discuss project requirements with client",
                    'type' => $order->service ? 'deadline' : 'meeting',
                ];
            })
            ->take(3);
            
        // Get received messages for display
        $messages = $user->receivedMessages()
            ->with('sender')
            ->orderBy('created_at', 'desc')
            ->take(3)
            ->get()
            ->map(function($message) {
                $relatedOrder = null;
                if ($message->orderable_type && $message->orderable_id) {
                    $relatedOrder = $message->orderable;
                }
                
                return [
                    'id' => $message->id,
                    'sender' => [
                        'name' => $message->sender->name,
                        'avatar' => $message->sender->profile_photo_url ?? 'https://ui-avatars.com/api/?name=' . urlencode($message->sender->name),
                    ],
                    'subject' => $message->subject ?? 'No Subject',
                    'preview' => mb_substr($message->message, 0, 75) . (mb_strlen($message->message) > 75 ? '...' : ''),
                    'date' => $message->created_at,
                    'read' => $message->is_read,
                    'project' => $relatedOrder ? ($relatedOrder->title ?? 'Related Project') : null,
                ];
            });
            
        // Get recent reviews
        $reviews = $user->receivedReviews()
            ->with('client')
            ->orderBy('created_at', 'desc')
            ->take(2)
            ->get()
            ->map(function($review) {
                return [
                    'reviewer' => [
                        'name' => $review->client->name,
                        'avatar' => $review->client->profile_photo_url ?? 'https://ui-avatars.com/api/?name=' . urlencode($review->client->name),
                    ],
                    'rating' => $review->rating,
                    'comment' => $review->comment,
                    'date' => $review->created_at,
                    'project' => $review->order->service ? $review->order->service->title : ($review->order->project ? $review->order->project->title : 'Unnamed Project'),
                ];
            });
            
        // Calculate rating distribution
        $ratingDistribution = [
            5 => $user->receivedReviews()->where('rating', 5)->count(),
            4 => $user->receivedReviews()->where('rating', 4)->count(),
            3 => $user->receivedReviews()->where('rating', 3)->count(),
            2 => $user->receivedReviews()->where('rating', 2)->count(),
            1 => $user->receivedReviews()->where('rating', 1)->count(),
        ];
        
        $ratingData = [
            'average' => $stats['average_rating'],
            'total' => $user->receivedReviews()->count(),
            'distribution' => $ratingDistribution,
        ];
            
        return Inertia::render('Freelancer/Dashboard', [
            'user' => $user,
            'stats' => $stats,
            'activities' => $activities,
            'recentOrders' => $recentOrders,
            'unreadMessagesCount' => $unreadMessagesCount,
            'skills' => $skills,
            'earnings' => $recentEarnings,
            'chartData' => $chartData,
            'scheduleEvents' => $scheduleEvents,
            'messages' => $messages,
            'reviews' => $reviews,
            'ratingData' => $ratingData
        ]);
    }
    
    /**
     * Display a list of available projects to bid on.
     */
    public function projects()
    {
        $user = Auth::user();
        
        // Get all available projects that match freelancer's skills
        $userSkillIds = $user->skills()->pluck('skills.id')->toArray();
        
        // If user has no skills yet, get all open projects
        if (empty($userSkillIds)) {
            $availableProjects = Project::where('status', 'open')
                ->with(['client', 'category'])
                ->orderBy('created_at', 'desc')
                ->get();
        } else {
            // Get projects matching user's skills (simplified approach)
            $availableProjects = Project::where('status', 'open')
                ->with(['client', 'category'])
                ->orderBy('created_at', 'desc')
                ->get();
            
            // We'll filter these projects later in the mapping step
        }
        
        // Format available projects for frontend
        $formattedAvailableProjects = $availableProjects->map(function($project) {
            return [
                'id' => $project->id,
                'title' => $project->title,
                'client' => $project->client->name,
                'deadline' => $project->deadline ? $project->deadline->format('d M Y') : 'Flexible',
                'budget' => 'Rp' . number_format($project->budget_min) . ' - Rp' . number_format($project->budget_max),
                'progress' => 0,
                'status' => $project->status,
                'image' => $project->client->profile_photo_path ?? 'https://ui-avatars.com/api/?name=' . urlencode($project->client->name) . '&background=6366f1&color=fff',
                'category' => $project->category ? $project->category->name : 'Uncategorized',
                'description' => $project->description,
            ];
        });
        
        // Get projects the freelancer has already bid on (has proposals)
        $biddedProjects = Project::whereHas('proposals', function ($query) use ($user) {
                $query->where('user_id', $user->id);
            })
            ->with(['client', 'category', 'proposals' => function ($query) use ($user) {
                $query->where('user_id', $user->id);
            }])
            ->orderBy('created_at', 'desc')
            ->get();
        
        // Format bidded projects for frontend
        $formattedBiddedProjects = $biddedProjects->map(function($project) {
            $status = 'pending';
            $progress = 0;
            
            // Check if there's an order for this project by the current user
            $order = $project->orders->first();
            if ($order) {
                $status = $order->status;
                switch($status) {
                    case 'completed':
                        $progress = 100;
                        break;
                    case 'in-progress':
                        $progress = 65;
                        break;
                    case 'revision':
                        $progress = 80;
                        break;
                    case 'pending':
                    default:
                        $progress = 25;
                        break;
                }
            }
            
            return [
                'id' => $project->id,
                'title' => $project->title,
                'client' => $project->client->name,
                'deadline' => $project->deadline ? $project->deadline->format('d M Y') : 'Flexible',
                'budget' => 'Rp' . number_format($project->budget_min) . ' - Rp' . number_format($project->budget_max),
                'progress' => $progress,
                'status' => $status,
                'image' => $project->client->profile_photo_path ?? 'https://ui-avatars.com/api/?name=' . urlencode($project->client->name) . '&background=6366f1&color=fff',
                'category' => $project->category ? $project->category->name : 'Uncategorized',
                'description' => $project->description,
            ];
        });
            
        return Inertia::render('Freelancer/Projects', [
            'user' => $user,
            'availableProjects' => $formattedAvailableProjects,
            'biddedProjects' => $formattedBiddedProjects
        ]);
    }
    
    /**
     * Show detail for a specific project.
     */
    public function showProject($id)
    {
        $user = Auth::user();
        // Load project with client and proposals, but handle skills separately
        $project = Project::with(['client', 'proposals' => function ($query) {
                $query->with('user');  // Load user data for each proposal
            }])
            ->findOrFail($id);
            
        // Check if user has already bid on this project
        $hasProposal = $project->proposals()->where('user_id', $user->id)->exists();
        $myProposal = $hasProposal ? 
            $project->proposals()->where('user_id', $user->id)->first() : 
            null;
        
        // Get skills for the project using the custom method
        $skills = $project->skills();
        
        // Add skills to the project for the frontend
        $projectData = $project->toArray();
        $projectData['skills'] = $skills;
            
        return Inertia::render('Freelancer/ProjectDetail', [
            'user' => $user,
            'project' => $projectData,
            'hasProposal' => $hasProposal,
            'myProposal' => $myProposal
        ]);
    }
    
    /**
     * Submit a proposal for a project.
     */
    public function submitProposal(Request $request, $projectId)
    {
        $user = Auth::user();
        
        $validated = $request->validate([
            'bid_amount' => 'required|numeric|min:1',
            'delivery_time' => 'required|integer|min:1',
            'cover_letter' => 'required|string|min:50',
            'attachments' => 'nullable|array',
            'attachments.*' => 'file|mimes:pdf,doc,docx,jpg,jpeg,png|max:2048',
        ]);
        
        $project = Project::findOrFail($projectId);
        
        // Check if user has already submitted a proposal
        if ($project->proposals()->where('user_id', $user->id)->exists()) {
            return back()->with('error', 'You have already submitted a proposal for this project.');
        }
        
        // Create the proposal
        $proposal = new Proposal([
            'user_id' => $user->id,
            'project_id' => $project->id,
            'bid_amount' => $validated['bid_amount'],
            'delivery_time' => $validated['delivery_time'],
            'cover_letter' => $validated['cover_letter'],
            'status' => 'pending',
        ]);
        
        $proposal->save();
        
        // Handle file uploads if any
        if ($request->hasFile('attachments')) {
            // Implementation for file uploads would go here
        }
        
        // Record activity
        Activity::create([
            'user_id' => $user->id,
            'activity_type' => 'proposal_submitted',
            'description' => "Submitted a proposal for project: {$project->title}",
            'reference_id' => $proposal->id,
            'reference_type' => 'proposal',
        ]);
        
        return redirect()->route('freelancer.projects')->with('success', 'Proposal submitted successfully.');
    }
    
    /**
     * Display services offered by the freelancer.
     */
    public function services()
    {
        $user = Auth::user();
        
        $services = $user->services()
            ->with(['category', 'skills'])
            ->withCount(['orders as completed_orders_count' => function ($query) {
                $query->where('status', 'completed');
            }])
            ->withCount(['orders as active_orders_count' => function ($query) {
                $query->whereIn('status', ['in-progress', 'revision']);
            }])
            ->withCount('reviews')
            ->withAvg('reviews', 'rating')
            ->orderBy('created_at', 'desc')
            ->get();
        
        // Format services data for the frontend
        $formattedServices = $services->map(function($service) {
            return [
                'id' => $service->id,
                'title' => $service->title,
                'description' => $service->description,
                'price' => $service->price,
                'deliveryTime' => $service->delivery_time,
                'revisions' => $service->revisions ?? 0,
                'image' => $service->thumbnail ? asset('storage/' . $service->thumbnail) : 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
                'status' => $service->is_active ? 'active' : 'draft',
                'featured' => false, // Add this field if you decide to implement it later
                'category' => $service->category ? $service->category->name : 'Uncategorized',
                'skills' => $service->skills->pluck('name'),
                'rating' => round($service->reviews_avg_rating ?? 0, 1),
                'reviewsCount' => $service->reviews_count,
                'ordersCount' => ($service->completed_orders_count ?? 0) + ($service->active_orders_count ?? 0),
                'completedOrders' => $service->completed_orders_count ?? 0,
                'activeOrders' => $service->active_orders_count ?? 0,
                'created_at' => $service->created_at,
                'updated_at' => $service->updated_at
            ];
        });
        
        // Get all categories for the filter dropdown
        $categories = Category::all()->pluck('name');
            
        return Inertia::render('Freelancer/Services', [
            'user' => $user,
            'services' => $formattedServices,
            'categories' => $categories
        ]);
    }
    
    /**
     * Show the form for creating a new service.
     */
    public function createService()
    {
        $user = Auth::user();
        $categories = \App\Models\Category::all();
        
        return Inertia::render('Freelancer/ServiceCreate', [
            'user' => $user,
            'categories' => $categories
        ]);
    }
    
    /**
     * Store a newly created service.
     */
    public function storeService(Request $request)
    {
        $user = Auth::user();
        
        $validated = $request->validate([
            'title' => 'required|string|max:100',
            'description' => 'required|string|min:50',
            'category_id' => 'required|exists:categories,id',
            'price' => 'required|numeric|min:1',
            'delivery_time' => 'required|integer|min:1',
            'revisions' => 'required|integer|min:0',
            'skills' => 'required|array',
            'skills.*' => 'exists:skills,id',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);
        
        $service = new Service([
            'user_id' => $user->id,
            'title' => $validated['title'],
            'description' => $validated['description'],
            'category_id' => $validated['category_id'],
            'price' => $validated['price'],
            'delivery_time' => $validated['delivery_time'],
            'revisions' => $validated['revisions'],
            'is_active' => true,
        ]);
        
        // Handle file upload
        if ($request->hasFile('image')) {
            // Implementation for file uploads would go here
            // $service->image = $imagePath;
        }
        
        $service->save();
        
        // Attach skills
        if (!empty($validated['skills'])) {
            $service->skills()->attach($validated['skills']);
        }
        
        // Record activity
        Activity::create([
            'user_id' => $user->id,
            'activity_type' => 'service_created',
            'description' => "Created a new service: {$service->title}",
            'reference_id' => $service->id,
            'reference_type' => 'service',
        ]);
        
        return redirect()->route('freelancer.services')->with('success', 'Service created successfully.');
    }
    
    /**
     * Show the form for editing a service.
     */
    public function editService($id)
    {
        $user = Auth::user();
        $service = Service::with('skills')->findOrFail($id);
        
        // Ensure the service belongs to the user
        if ($service->user_id !== $user->id) {
            return redirect()->route('freelancer.services')->with('error', 'You do not have permission to edit this service.');
        }
        
        $categories = \App\Models\Category::all();
        $skills = Skill::all();
        
        return Inertia::render('Freelancer/ServiceEdit', [
            'user' => $user,
            'service' => $service,
            'categories' => $categories,
            'skills' => $skills
        ]);
    }
    
    /**
     * Toggle service status between active and draft
     */
    public function toggleServiceStatus($id)
    {
        $user = Auth::user();
        $service = Service::findOrFail($id);
        
        // Ensure the service belongs to the user
        if ($service->user_id !== $user->id) {
            return response()->json(['error' => 'You are not authorized to update this service'], 403);
        }
        
        // Toggle the status
        $service->is_active = !$service->is_active;
        $service->save();
        
        return response()->json(['success' => true, 'is_active' => $service->is_active]);
    }
    
    /**
     * Show the orders related to a specific service
     */
    public function serviceOrders($id)
    {
        $user = Auth::user();
        $service = Service::findOrFail($id);
        
        // Ensure the service belongs to the user
        if ($service->user_id !== $user->id) {
            return abort(403, 'Unauthorized action');
        }
        
        $orders = $service->orders()
            ->with('client')
            ->orderBy('created_at', 'desc')
            ->get();
            
        return Inertia::render('Freelancer/ServiceOrders', [
            'service' => $service,
            'orders' => $orders
        ]);
    }
    
    /**
     * Update the specified service.
     */
    public function updateService(Request $request, $id)
    {
        $user = Auth::user();
        $service = Service::findOrFail($id);
        
        // Ensure the service belongs to the user
        if ($service->user_id !== $user->id) {
            return redirect()->route('freelancer.services')->with('error', 'You do not have permission to edit this service.');
        }
        
        $validated = $request->validate([
            'title' => 'required|string|max:100',
            'description' => 'required|string|min:50',
            'category_id' => 'required|exists:categories,id',
            'price' => 'required|numeric|min:1',
            'delivery_time' => 'required|integer|min:1',
            'revisions' => 'required|integer|min:0',
            'skills' => 'required|array',
            'skills.*' => 'exists:skills,id',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'is_active' => 'boolean',
        ]);
        
        $service->title = $validated['title'];
        $service->description = $validated['description'];
        $service->category_id = $validated['category_id'];
        $service->price = $validated['price'];
        $service->delivery_time = $validated['delivery_time'];
        $service->revisions = $validated['revisions'];
        $service->is_active = $validated['is_active'] ?? $service->is_active;
        
        // Handle file upload
        if ($request->hasFile('image')) {
            // Implementation for file uploads would go here
            // $service->image = $imagePath;
        }
        
        $service->save();
        
        // Sync skills
        if (!empty($validated['skills'])) {
            $service->skills()->sync($validated['skills']);
        }
        
        // Record activity
        Activity::create([
            'user_id' => $user->id,
            'activity_type' => 'service_updated',
            'description' => "Updated service: {$service->title}",
            'reference_id' => $service->id,
            'reference_type' => 'service',
        ]);
        
        return redirect()->route('freelancer.services')->with('success', 'Service updated successfully.');
    }
    
    /**
     * Display freelancer's active orders.
     */
    public function orders()
    {
        $user = Auth::user();
        
        $activeOrders = $user->freelancerOrders()
            ->whereIn('status', ['pending', 'in-progress', 'revision'])
            ->with(['client', 'service', 'project'])
            ->orderBy('created_at', 'desc')
            ->paginate(10);
            
        $completedOrders = $user->freelancerOrders()
            ->where('status', 'completed')
            ->with(['client', 'service', 'project'])
            ->orderBy('created_at', 'desc')
            ->paginate(10);
            
        $cancelledOrders = $user->freelancerOrders()
            ->where('status', 'cancelled')
            ->with(['client', 'service', 'project'])
            ->orderBy('created_at', 'desc')
            ->paginate(10);
            
        return Inertia::render('Freelancer/Orders', [
            'user' => $user,
            'activeOrders' => $activeOrders,
            'completedOrders' => $completedOrders,
            'cancelledOrders' => $cancelledOrders
        ]);
    }
    
    /**
     * Show details for a specific order.
     */
    public function orderDetail($id)
    {
        $user = Auth::user();
        $order = Order::with(['client', 'service', 'project', 'reviews'])
            ->findOrFail($id);
            
        // Ensure the order belongs to the user
        if ($order->freelancer_id !== $user->id) {
            return redirect()->route('freelancer.orders')->with('error', 'You do not have access to this order.');
        }
        
        // Get messages related to this order
        $messages = Message::where(function($query) use ($user, $order) {
                $query->where('sender_id', $user->id)
                    ->where('recipient_id', $order->client_id);
            })
            ->orWhere(function($query) use ($user, $order) {
                $query->where('sender_id', $order->client_id)
                    ->where('recipient_id', $user->id);
            })
            ->orderBy('created_at')
            ->get();
            
        return Inertia::render('Freelancer/OrderDetail', [
            'user' => $user,
            'order' => $order,
            'messages' => $messages
        ]);
    }
    
    /**
     * Update an order status.
     */
    public function updateOrderStatus(Request $request, $id)
    {
        $user = Auth::user();
        $order = Order::findOrFail($id);
        
        // Ensure the order belongs to the user
        if ($order->freelancer_id !== $user->id) {
            return redirect()->route('freelancer.orders')->with('error', 'You do not have access to this order.');
        }
        
        $validated = $request->validate([
            'status' => 'required|in:in-progress,completed',
            'notes' => 'nullable|string',
            'attachments' => 'nullable|array',
            'attachments.*' => 'file|max:10240',
        ]);
        
        // Only allow certain status transitions
        $allowedTransitions = [
            'pending' => ['in-progress'],
            'in-progress' => ['completed'],
            'revision' => ['completed'],
        ];
        
        if (!isset($allowedTransitions[$order->status]) || !in_array($validated['status'], $allowedTransitions[$order->status])) {
            return back()->with('error', 'Invalid status transition.');
        }
        
        $order->status = $validated['status'];
        $order->notes = $validated['notes'] ?? $order->notes;
        
        // Handle file uploads if any
        if ($request->hasFile('attachments')) {
            // Implementation for file uploads would go here
        }
        
        $order->save();
        
        // Record activity
        Activity::create([
            'user_id' => $user->id,
            'activity_type' => 'order_status_updated',
            'description' => "Updated order #{$order->id} status to {$order->status}",
            'reference_id' => $order->id,
            'reference_type' => 'order',
        ]);
        
        return redirect()->route('freelancer.order.detail', $order->id)->with('success', 'Order status updated successfully.');
    }
    
    /**
     * Display earnings for the freelancer.
     */
    public function earnings()
    {
        $user = Auth::user();
        
        // Get summary of earnings
        $totalEarnings = $user->freelancerOrders()
            ->where('status', 'completed')
            ->sum('amount');
            
        $availableBalance = $totalEarnings - $user->withdrawals()
            ->where('status', 'completed')
            ->sum('amount');
            
        $pendingBalance = $user->freelancerOrders()
            ->where('status', 'in-progress')
            ->sum('amount');
            
        // Get recent earnings
        $recentEarnings = $user->freelancerOrders()
            ->where('status', 'completed')
            ->with(['client', 'service', 'project'])
            ->orderBy('completed_at', 'desc')
            ->paginate(10);
            
        // Get recent withdrawals
        $recentWithdrawals = $user->withdrawals()
            ->orderBy('created_at', 'desc')
            ->paginate(10);
            
        return Inertia::render('Freelancer/Earnings', [
            'user' => $user,
            'totalEarnings' => $totalEarnings,
            'availableBalance' => $availableBalance,
            'pendingBalance' => $pendingBalance,
            'recentEarnings' => $recentEarnings,
            'recentWithdrawals' => $recentWithdrawals
        ]);
    }
    
    /**
     * Request a withdrawal.
     */
    public function requestWithdrawal(Request $request)
    {
        $user = Auth::user();
        
        $validated = $request->validate([
            'amount' => 'required|numeric|min:10',
            'payment_method' => 'required|string|in:bank_transfer,paypal,other',
            'payment_details' => 'required|string',
        ]);
        
        // Calculate available balance
        $totalEarnings = $user->freelancerOrders()
            ->where('status', 'completed')
            ->sum('amount');
            
        $withdrawnAmount = $user->withdrawals()
            ->where('status', 'completed')
            ->sum('amount');
            
        $pendingWithdrawals = $user->withdrawals()
            ->where('status', 'pending')
            ->sum('amount');
            
        $availableBalance = $totalEarnings - $withdrawnAmount - $pendingWithdrawals;
        
        if ($validated['amount'] > $availableBalance) {
            return back()->with('error', 'Insufficient balance for withdrawal.');
        }
        
        $withdrawal = Withdrawal::create([
            'user_id' => $user->id,
            'amount' => $validated['amount'],
            'payment_method' => $validated['payment_method'],
            'payment_details' => $validated['payment_details'],
            'status' => 'pending',
        ]);
        
        // Record activity
        Activity::create([
            'user_id' => $user->id,
            'activity_type' => 'withdrawal_requested',
            'description' => "Requested withdrawal of {$validated['amount']}",
            'reference_id' => $withdrawal->id,
            'reference_type' => 'withdrawal',
        ]);
        
        return redirect()->route('freelancer.earnings')->with('success', 'Withdrawal request submitted successfully.');
    }
    
    /**
     * Display reviews for the freelancer.
     */
    public function reviews()
    {
        $user = Auth::user();
        
        $reviews = $user->receivedReviews()
            ->with(['client', 'order'])
            ->orderBy('created_at', 'desc')
            ->paginate(10);
            
        $averageRating = $user->receivedReviews()->avg('rating') ?? 0;
        $reviewsCount = $user->receivedReviews()->count();
        
        return Inertia::render('Freelancer/Reviews', [
            'user' => $user,
            'reviews' => $reviews,
            'averageRating' => $averageRating,
            'reviewsCount' => $reviewsCount
        ]);
    }
    
    /**
     * Display the freelancer's messages.
     */
    public function messages()
    {
        $user = Auth::user();
        
        // Get unique conversations
        $conversations = Message::where('sender_id', $user->id)
            ->orWhere('recipient_id', $user->id)
            ->orderBy('created_at', 'desc')
            ->get()
            ->map(function ($message) use ($user) {
                $otherUserId = $message->sender_id == $user->id ? $message->recipient_id : $message->sender_id;
                return [
                    'id' => $message->id,
                    'other_user_id' => $otherUserId,
                    'last_message' => $message->message,
                    'timestamp' => $message->created_at,
                    'user' => User::find($otherUserId),
                ];
            })
            ->unique('other_user_id')
            ->values();
            
        return Inertia::render('Freelancer/Messages', [
            'user' => $user,
            'conversations' => $conversations
        ]);
    }
    
    /**
     * Display a specific conversation.
     */
    public function conversation($userId)
    {
        $user = Auth::user();
        $otherUser = User::findOrFail($userId);
        
        // Get all messages between the two users
        $messages = Message::where(function($query) use ($user, $otherUser) {
                $query->where('sender_id', $user->id)
                    ->where('recipient_id', $otherUser->id);
            })
            ->orWhere(function($query) use ($user, $otherUser) {
                $query->where('sender_id', $otherUser->id)
                    ->where('recipient_id', $user->id);
            })
            ->orderBy('created_at')
            ->get();
            
        // Mark unread messages as read
        Message::where('sender_id', $otherUser->id)
            ->where('recipient_id', $user->id)
            ->where('is_read', false)
            ->update(['is_read' => true, 'read_at' => now()]);
            
        return Inertia::render('Freelancer/Conversation', [
            'user' => $user,
            'otherUser' => $otherUser,
            'messages' => $messages
        ]);
    }
    
    /**
     * Send a message.
     */
    public function sendMessage(Request $request)
    {
        $user = Auth::user();
        
        $validated = $request->validate([
            'recipient_id' => 'required|exists:users,id',
            'content' => 'required|string', // Tetap menggunakan 'content' di form input
            'attachments' => 'nullable|array',
            'attachments.*' => 'file|max:5120',
        ]);
        
        $message = Message::create([
            'sender_id' => $user->id,
            'recipient_id' => $validated['recipient_id'],
            'message' => $validated['content'],
            'is_read' => false,
        ]);
        
        // Handle file uploads if any
        if ($request->hasFile('attachments')) {
            // Implementation for file uploads would go here
        }
        
        return back()->with('success', 'Message sent successfully.');
    }
    
    /**
     * Display and edit user profile.
     */
    public function profile()
    {
        $user = Auth::user();
        
        // Load relations
        $user->load('profile', 'educations', 'experiences', 'portfolios', 'skills');
        
        return Inertia::render('Freelancer/Profile', [
            'user' => $user,
            'userDetails' => $user
        ]);
    }
    
    /**
     * Update user profile.
     */
    public function updateProfile(Request $request)
    {
        $user = Auth::user();
        
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'profile_photo' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'bio' => 'nullable|string',
            'hourly_rate' => 'nullable|numeric|min:0',
            'title' => 'nullable|string|max:100',
            'phone' => 'nullable|string|max:20',
            'address' => 'nullable|string',
            'city' => 'nullable|string',
            'country' => 'nullable|string',
            'postal_code' => 'nullable|string',
        ]);
        
        $user->name = $validated['name'];
        
        // Handle profile photo upload
        if ($request->hasFile('profile_photo')) {
            // Implementation for file uploads would go here
            // $user->profile_photo_url = $photoPath;
        }
        
        $user->save();
        
        // Update or create user profile
        $profileData = [
            'bio' => $validated['bio'] ?? null,
            'hourly_rate' => $validated['hourly_rate'] ?? null,
            'title' => $validated['title'] ?? null,
            'phone' => $validated['phone'] ?? null,
            'address' => $validated['address'] ?? null,
            'city' => $validated['city'] ?? null,
            'country' => $validated['country'] ?? null,
            'postal_code' => $validated['postal_code'] ?? null,
        ];
        
        if ($user->profile) {
            $user->profile->update($profileData);
        } else {
            UserProfile::create(array_merge(['user_id' => $user->id], $profileData));
        }
        
        return redirect()->route('freelancer.profile')->with('success', 'Profile updated successfully.');
    }
    
    /**
     * Store a new education entry.
     */
    public function storeEducation(Request $request)
    {
        $user = Auth::user();
        
        $validated = $request->validate([
            'institution' => 'required|string|max:100',
            'degree' => 'required|string|max:100',
            'field_of_study' => 'required|string|max:100',
            'start_date' => 'required|date',
            'end_date' => 'nullable|date|after:start_date',
            'description' => 'nullable|string',
            'currently_studying' => 'nullable|boolean',
        ]);
        
        $education = new Education([
            'user_id' => $user->id,
            'institution' => $validated['institution'],
            'degree' => $validated['degree'],
            'field_of_study' => $validated['field_of_study'],
            'start_date' => $validated['start_date'],
            'end_date' => $validated['currently_studying'] ? null : $validated['end_date'],
            'description' => $validated['description'] ?? null,
            'currently_studying' => $validated['currently_studying'] ?? false,
        ]);
        
        $education->save();
        
        // Record activity
        Activity::create([
            'user_id' => $user->id,
            'activity_type' => 'education_added',
            'description' => "Added education: {$education->degree} at {$education->institution}",
            'reference_id' => $education->id,
            'reference_type' => 'education',
        ]);
        
        return redirect()->route('freelancer.profile')->with('success', 'Education added successfully.');
    }
    
    /**
     * Store a new experience entry.
     */
    public function storeExperience(Request $request)
    {
        $user = Auth::user();
        
        $validated = $request->validate([
            'company' => 'required|string|max:100',
            'position' => 'required|string|max:100',
            'location' => 'nullable|string|max:100',
            'start_date' => 'required|date',
            'end_date' => 'nullable|date|after:start_date',
            'description' => 'nullable|string',
            'currently_working' => 'nullable|boolean',
        ]);
        
        $experience = new Experience([
            'user_id' => $user->id,
            'company' => $validated['company'],
            'position' => $validated['position'],
            'location' => $validated['location'] ?? null,
            'start_date' => $validated['start_date'],
            'end_date' => $validated['currently_working'] ? null : $validated['end_date'],
            'description' => $validated['description'] ?? null,
            'currently_working' => $validated['currently_working'] ?? false,
        ]);
        
        $experience->save();
        
        // Record activity
        Activity::create([
            'user_id' => $user->id,
            'activity_type' => 'experience_added',
            'description' => "Added experience: {$experience->position} at {$experience->company}",
            'reference_id' => $experience->id,
            'reference_type' => 'experience',
        ]);
        
        return redirect()->route('freelancer.profile')->with('success', 'Experience added successfully.');
    }
    
    /**
     * Store a new portfolio entry.
     */
    public function storePortfolio(Request $request)
    {
        $user = Auth::user();
        
        $validated = $request->validate([
            'title' => 'required|string|max:100',
            'description' => 'required|string',
            'image' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
            'category_id' => 'required|exists:categories,id',
            'url' => 'nullable|url',
            'completion_date' => 'nullable|date',
        ]);
        
        $portfolio = new Portfolio([
            'user_id' => $user->id,
            'title' => $validated['title'],
            'description' => $validated['description'],
            'category_id' => $validated['category_id'],
            'url' => $validated['url'] ?? null,
            'completion_date' => $validated['completion_date'] ?? null,
        ]);
        
        // Handle image upload
        if ($request->hasFile('image')) {
            // Implementation for file uploads would go here
            // $portfolio->image_url = $imagePath;
        }
        
        $portfolio->save();
        
        // Record activity
        Activity::create([
            'user_id' => $user->id,
            'activity_type' => 'portfolio_added',
            'description' => "Added portfolio item: {$portfolio->title}",
            'reference_id' => $portfolio->id,
            'reference_type' => 'portfolio',
        ]);
        
        return redirect()->route('freelancer.profile')->with('success', 'Portfolio item added successfully.');
    }
    
    /**
     * Manage user skills.
     */
    public function skills()
    {
        $user = Auth::user();
        
        $userSkills = $user->skills;
        $allSkills = Skill::all();
        
        return Inertia::render('Freelancer/Skills', [
            'user' => $user,
            'userSkills' => $userSkills,
            'allSkills' => $allSkills
        ]);
    }
    
    /**
     * Update user skills.
     */
    public function updateSkills(Request $request)
    {
        $user = Auth::user();
        
        $validated = $request->validate([
            'skills' => 'required|array',
            'skills.*.id' => 'required|exists:skills,id',
            'skills.*.proficiency_level' => 'required|integer|min:1|max:5',
        ]);
        
        $skillsData = collect($validated['skills'])->mapWithKeys(function ($skill) {
            return [$skill['id'] => ['proficiency_level' => $skill['proficiency_level']]];
        });
        
        $user->skills()->sync($skillsData);
        
        // Record activity
        Activity::create([
            'user_id' => $user->id,
            'activity_type' => 'skills_updated',
            'description' => "Updated skills profile",
        ]);
        
        return redirect()->route('freelancer.skills')->with('success', 'Skills updated successfully.');
    }
    
    /**
     * Display offers page.
     */
    public function offers()
    {
        $user = Auth::user();
        
        // Get all offers received by the freelancer
        $offers = $user->proposals()
            ->with(['project', 'project.client'])
            ->where('status', 'accepted')
            ->orderBy('updated_at', 'desc')
            ->get();
            
        return Inertia::render('Freelancer/Offers', [
            'user' => $user,
            'offers' => $offers
        ]);
    }
    
    /**
     * Display payments page.
     */
    public function payments()
    {
        $user = Auth::user();
        
        // Get all payments received by the freelancer
        $payments = $user->receivedPayments()
            ->with(['order', 'order.client', 'order.service'])
            ->orderBy('created_at', 'desc')
            ->get();
            
        $paymentStats = [
            'total' => $payments->sum('amount'),
            'pending' => $payments->where('status', 'pending')->sum('amount'),
            'completed' => $payments->where('status', 'completed')->sum('amount'),
            'this_month' => $payments->where('created_at', '>=', Carbon::now()->startOfMonth())->sum('amount'),
        ];
            
        return Inertia::render('Freelancer/Payments', [
            'user' => $user,
            'payments' => $payments,
            'stats' => $paymentStats
        ]);
    }
    
    /**
     * Display withdrawal page.
     */
    public function withdrawal()
    {
        $user = Auth::user();
        
        // Get freelancer balance
        $balance = $user->balance();
        
        // Get withdrawal history
        $withdrawals = $user->withdrawals()
            ->orderBy('created_at', 'desc')
            ->get();
        
        // Get payment methods
        $paymentMethods = $user->paymentMethods()->get();
            
        return Inertia::render('Freelancer/WithdrawalPage', [
            'user' => $user,
            'balance' => $balance,
            'withdrawals' => $withdrawals,
            'paymentMethods' => $paymentMethods
        ]);
    }
    
    /**
     * Display settings page.
     */
    public function settings()
    {
        $user = Auth::user();
        
        // Get user profile
        $profile = $user->profile;
        
        // Get notification settings
        $notificationSettings = $user->notificationSettings;
            
        return Inertia::render('Freelancer/Settings', [
            'user' => $user,
            'profile' => $profile,
            'notificationSettings' => $notificationSettings
        ]);
    }
    
    /**
     * Display a specific service with detailed information.
     */
    public function showService($id)
    {
        $user = Auth::user();
        $service = Service::with(['category', 'skills', 'reviews.client', 'orders.client'])
            ->withCount(['orders as total_orders_count'])
            ->withCount(['orders as completed_orders_count' => function ($query) {
                $query->where('status', 'completed');
            }])
            ->withCount(['orders as active_orders_count' => function ($query) {
                $query->whereIn('status', ['in-progress', 'revision']);
            }])
            ->withAvg('reviews', 'rating')
            ->findOrFail($id);
        
        // Ensure the service belongs to the user
        if ($service->user_id !== $user->id) {
            return abort(403, 'You do not have permission to view this service.');
        }
        
        // Get recent reviews for this service
        $recentReviews = $service->reviews()
            ->with('client')
            ->orderBy('created_at', 'desc')
            ->take(5)
            ->get()
            ->map(function($review) {
                return [
                    'id' => $review->id,
                    'client' => [
                        'id' => $review->client->id,
                        'name' => $review->client->name,
                        'avatar' => $review->client->profile_photo_path ?? 'https://ui-avatars.com/api/?name=' . urlencode($review->client->name) . '&background=6366f1&color=fff'
                    ],
                    'rating' => $review->rating,
                    'comment' => $review->comment,
                    'created_at' => $review->created_at->format('d M Y'),
                ];
            });
        
        // Get rating distribution
        $ratingDistribution = [
            5 => $service->reviews()->where('rating', 5)->count(),
            4 => $service->reviews()->where('rating', 4)->count(),
            3 => $service->reviews()->where('rating', 3)->count(),
            2 => $service->reviews()->where('rating', 2)->count(),
            1 => $service->reviews()->where('rating', 1)->count(),
        ];
        
        // Monthly order statistics for the last 6 months
        $sixMonthsAgo = now()->subMonths(6)->startOfMonth();
        $monthlyOrders = $service->orders()
            ->where('created_at', '>=', $sixMonthsAgo)
            ->selectRaw('YEAR(created_at) as year, MONTH(created_at) as month, COUNT(*) as count, SUM(CASE WHEN status = "completed" THEN 1 ELSE 0 END) as completed')
            ->groupBy('year', 'month')
            ->orderBy('year')
            ->orderBy('month')
            ->get();
            
        // Format chart data
        $chartData = [
            'labels' => [],
            'orders' => [],
            'completed' => []
        ];
        
        // Generate labels for the past 6 months
        for ($i = 5; $i >= 0; $i--) {
            $month = now()->subMonths($i);
            $chartData['labels'][] = $month->format('M Y');
            
            // Default to 0 if no orders for this month
            $monthOrder = $monthlyOrders->first(function ($item) use ($month) {
                return $item->year == $month->year && $item->month == $month->month;
            });
            
            $chartData['orders'][] = $monthOrder ? $monthOrder->count : 0;
            $chartData['completed'][] = $monthOrder ? $monthOrder->completed : 0;
        }
        
        // Format the service data for the frontend
        $serviceData = [
            'id' => $service->id,
            'title' => $service->title,
            'description' => $service->description,
            'price' => $service->price,
            'price_formatted' => 'Rp ' . number_format($service->price, 0, ',', '.'),
            'deliveryTime' => $service->delivery_time,
            'revisions' => $service->revisions ?? 0,
            'requirements' => $service->requirements,
            'thumbnail' => $service->thumbnail ? asset('storage/' . $service->thumbnail) : 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
            'gallery' => $service->gallery ? json_decode($service->gallery) : [],
            'status' => $service->is_active ? 'active' : 'draft',
            'featured' => false, // Add this field if you implement it later
            'category' => $service->category ? $service->category->name : 'Uncategorized',
            'category_id' => $service->category_id,
            'skills' => $service->skills->map(function($skill) {
                return [
                    'id' => $skill->id,
                    'name' => $skill->name
                ];
            }),
            'rating' => round($service->reviews_avg_rating ?? 0, 1),
            'reviewsCount' => $service->reviews->count(),
            'ordersCount' => $service->total_orders_count ?? 0,
            'completedOrders' => $service->completed_orders_count ?? 0,
            'activeOrders' => $service->active_orders_count ?? 0,
            'created_at' => $service->created_at->format('d M Y'),
            'updated_at' => $service->updated_at->format('d M Y')
        ];
            
        return Inertia::render('Freelancer/ServiceDetail', [
            'user' => $user,
            'service' => $serviceData,
            'recentReviews' => $recentReviews,
            'ratingDistribution' => $ratingDistribution,
            'chartData' => $chartData
        ]);
    }
}
