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
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;
use Carbon\Carbon;
use App\Services\FileService;
use App\Services\OrderService;

class FreelancerController extends Controller
{
    /**
     * Helper function to check if a string is valid JSON
     */
    private function isJson($string) {
        if (!is_string($string)) {
            return false;
        }
        
        json_decode($string);
        return json_last_error() === JSON_ERROR_NONE;
    }
    
    /**
     * Create a new controller instance.
     */
    protected $fileService; // Tambahkan properti ini

    public function __construct(FileService $fileService) // Inject FileService
    {
        $this->fileService = $fileService;
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
            'type' => 'proposal_submitted',
            'description' => "Submitted a proposal for project: {$project->title}",
            'subject_id' => $proposal->id,
            'subject_type' => \App\Models\Proposal::class,
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
        $skills = \App\Models\Skill::all();
        
        return Inertia::render('Freelancer/ServiceCreate', [
            'user' => $user,
            'categories' => $categories,
            'skills' => $skills
        ]);
    }
    
    /**
     * Store a newly created service.
     */
    public function storeService(Request $request)
    {
        $user = Auth::user();
        
        // Log the request data for debugging
        \Log::info('Service creation request data:', $request->all());
        
        $validated = $request->validate([
            'title' => 'required|string|max:100',
            'description' => 'required|string|min:50',
            'category_id' => 'required|exists:categories,id',
            'price' => 'required|numeric|min:1',
            'delivery_time' => 'required|integer|min:1',
            'revisions' => 'required|integer|min:0',
            'skills' => 'required|array',
            'skills.*' => 'exists:skills,id',
            'requirements' => 'nullable|string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'gallery.*' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048', // New validation for gallery images
            'packages' => 'nullable|array',
            'packages.*.title' => 'nullable|string', 
            'packages.*.price' => 'nullable|numeric|min:0',
            'packages.*.delivery_time' => 'nullable|integer|min:1',
            'packages.*.revisions' => 'nullable|integer|min:0',
            'packages.*.features' => 'nullable',
            'faqs' => 'nullable|array',
            'faqs.*.question' => 'nullable|string',
            'faqs.*.answer' => 'nullable|string',
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
            $imagePath = $request->file('image')->store('services', 'public');
            $service->thumbnail = $imagePath;
        }
        
        $service->save();
        
        // Handle gallery images upload
        if ($request->hasFile('gallery')) {
            $order = 0;
            foreach ($request->file('gallery') as $image) {
                $imagePath = $image->store('services/gallery', 'public');
                
                // Create gallery entry
                \App\Models\ServiceGallery::create([
                    'service_id' => $service->id,
                    'image_path' => $imagePath,
                    'order' => $order++
                ]);
            }
        }
        
        // Attach skills
        if (!empty($validated['skills'])) {
            $service->skills()->attach($validated['skills']);
        }
        
        // Handle packages
        if ($request->has('packages')) {
            foreach ($request->packages as $packageData) {
                if (!isset($packageData['title']) || !isset($packageData['price'])) {
                    continue;
                }
                
                // Process features data properly - robust handling
                $features = null;
                if (isset($packageData['features'])) {
                    // Already in JSON string format
                    if (is_string($packageData['features']) && $this->isJson($packageData['features'])) {
                        $features = $packageData['features'];
                    }
                    // Standard array that needs to be encoded
                    elseif (is_array($packageData['features'])) {
                        // Filter out any empty features
                        $filteredFeatures = array_filter($packageData['features'], function($feature) {
                            return !empty(trim($feature));
                        });
                        
                        // If we have features after filtering, encode those
                        if (count($filteredFeatures) > 0) {
                            $features = json_encode($filteredFeatures);
                        } else {
                            // Default if array is empty
                            $features = json_encode(['Basic service']);
                        }
                    }
                    // Single string (not JSON)
                    elseif (is_string($packageData['features']) && !empty(trim($packageData['features']))) {
                        $features = json_encode([$packageData['features']]);
                    }
                    // Any other case
                    else {
                        $features = json_encode(['Basic service']);
                    }
                } else {
                    // Default if features not provided
                    $features = json_encode(['Basic service']);
                }
                
                // Final safety check to ensure we have valid JSON
                if (!$this->isJson($features)) {
                    $features = json_encode(['Basic service']);
                }
                
                $package = new \App\Models\ServicePackage([
                    'service_id' => $service->id,
                    'title' => $packageData['title'],
                    'price' => $packageData['price'],
                    'delivery_time' => $packageData['delivery_time'] ?? $service->delivery_time,
                    'revisions' => $packageData['revisions'] ?? $service->revisions,
                    'features' => $features
                ]);
                
                $package->save();
            }
        } else {
            // Create a default package if none provided
            \App\Models\ServicePackage::create([
                'service_id' => $service->id,
                'title' => 'Paket Dasar',
                'price' => $validated['price'],
                'delivery_time' => $validated['delivery_time'],
                'revisions' => $validated['revisions'],
                'features' => json_encode(['Layanan dasar'])
            ]);
        }
        
        // Handle requirements - more defensive approach
        if ($request->has('requirements')) {
            // If it's a string (could be a single requirement or multiple with newlines)
            if (is_string($request->requirements)) {
                $requirementsArray = explode("\n", $request->requirements);
                foreach ($requirementsArray as $question) {
                    if (!empty(trim($question))) {
                        \App\Models\ServiceRequirement::create([
                            'service_id' => $service->id,
                            'question' => trim($question),
                            'required' => true
                        ]);
                    }
                }
            } 
            // If it's already an array of requirements
            elseif (is_array($request->requirements)) {
                foreach ($request->requirements as $reqData) {
                    // If it's a simple string requirement
                    if (is_string($reqData) && !empty(trim($reqData))) {
                        \App\Models\ServiceRequirement::create([
                            'service_id' => $service->id,
                            'question' => trim($reqData),
                            'required' => true
                        ]);
                    } 
                    // If it's an array with 'question' property
                    elseif (is_array($reqData) && isset($reqData['question'])) {
                        \App\Models\ServiceRequirement::create([
                            'service_id' => $service->id,
                            'question' => $reqData['question'],
                            'required' => isset($reqData['required']) ? $reqData['required'] : false
                        ]);
                    }
                }
            }
        }
        
        // Handle FAQs
        if ($request->has('faqs')) {
            foreach ($request->faqs as $faqData) {
                if (!empty($faqData['question']) && !empty($faqData['answer'])) {
                    \App\Models\ServiceFaq::create([
                        'service_id' => $service->id,
                        'question' => $faqData['question'],
                        'answer' => $faqData['answer']
                    ]);
                }
            }
        }
        
        // Record activity
        Activity::create([
            'user_id' => $user->id,
            'type' => 'service_created',
            'description' => "Created a new service: {$service->title}",
            'subject_id' => $service->id,
            'subject_type' => \App\Models\Service::class,
        ]);
        
        return redirect()->route('freelancer.services')->with('success', 'Service created successfully.');
    }
    
    /**
     * Show the form for editing a service.
     */
    public function editService($id)
    {
        $user = Auth::user();
        $service = Service::with(['skills', 'packages', 'requirement_s', 'faqs', 'galleries'])->findOrFail($id);
        
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
        $service = Service::with(['packages', 'requirement_s', 'faqs', 'galleries'])->findOrFail($id);
        
        // Ensure the service belongs to the user
        if ($service->user_id !== $user->id) {
            return redirect()->route('freelancer.services')->with('error', 'You do not have permission to edit this service.');
        }
        
        // Log the request data for debugging
        \Log::info('Service update request data:', $request->all());
        
        // Log gallery-related data specifically
        if ($request->hasFile('gallery')) {
            \Log::info('Gallery files received:', ['count' => count($request->file('gallery'))]);
        }
        if ($request->has('removed_gallery_images')) {
            \Log::info('Gallery images to remove:', ['removed' => $request->removed_gallery_images]);
        }
        
        try {
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
                'gallery.*' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048', // New validation for gallery images
                'gallery_items' => 'nullable|array', // For keeping track of existing images
                'is_active' => 'boolean',
                'requirements' => 'nullable|array',
                'requirements.*.question' => 'required|string',
                'requirements.*.required' => 'nullable|boolean',
                'faqs' => 'nullable|array',
                'faqs.*.question' => 'required|string',
                'faqs.*.answer' => 'required|string',
                'packages' => 'nullable|array',
                'packages.*.title' => 'required|string',
                'packages.*.price' => 'required|numeric|min:0',
                'packages.*.delivery_time' => 'required|integer|min:1',
                'packages.*.revisions' => 'required|integer|min:0',
                'packages.*.features' => 'nullable',
            ]);
        } catch (\Illuminate\Validation\ValidationException $e) {
            // Log the actual submitted data for packages
            \Log::info('Service Update Validation Failed. Package data:', $request->input('packages', []));
            throw $e; // Re-throw the exception after logging
        }
        
        $service->title = $validated['title'];
        $service->description = $validated['description'];
        $service->category_id = $validated['category_id'];
        $service->price = $validated['price'];
        $service->delivery_time = $validated['delivery_time'];
        $service->revisions = $validated['revisions'];
        $service->is_active = $validated['is_active'] ?? $service->is_active;
        
        // Handle file upload for main thumbnail
        if ($request->hasFile('image')) {
            // Delete the old image if it exists
            if ($service->thumbnail) {
                Storage::disk('public')->delete($service->thumbnail);
            }
            
            $imagePath = $request->file('image')->store('services', 'public');
            $service->thumbnail = $imagePath;
        }
        
        $service->save();
        
        // Handle gallery images upload
        if ($request->hasFile('gallery')) {
            $order = $service->galleries()->max('order') + 1;
            foreach ($request->file('gallery') as $image) {
                $imagePath = $image->store('services/gallery', 'public');
                
                // Create gallery entry
                \App\Models\ServiceGallery::create([
                    'service_id' => $service->id,
                    'image_path' => $imagePath,
                    'order' => $order++
                ]);
            }
        }
        
        // Handle gallery image removals if specified
        try {
            if ($request->has('removed_gallery_images')) {
                $removedGalleryImages = $request->removed_gallery_images;
                
                // Convert to array if string
                if (is_string($removedGalleryImages)) {
                    $removedGalleryImages = json_decode($removedGalleryImages, true);
                    if (!is_array($removedGalleryImages)) {
                        $removedGalleryImages = [$removedGalleryImages];
                    }
                }
                
                if (is_array($removedGalleryImages)) {
                    foreach ($removedGalleryImages as $galleryId) {
                        $gallery = \App\Models\ServiceGallery::where('id', $galleryId)
                            ->where('service_id', $service->id)
                            ->first();
                            
                        if ($gallery) {
                            // Delete the image file
                            Storage::disk('public')->delete($gallery->image_path);
                            
                            // Delete the database record
                            $gallery->delete();
                        }
                    }
                } else {
                    \Log::warning('Invalid removed_gallery_images format', ['removed_gallery_images' => $request->removed_gallery_images]);
                }
            }
        } catch (\Exception $e) {
            \Log::error('Error handling gallery image removals: ' . $e->getMessage(), ['exception' => $e]);
            // Continue with the rest of the update process
        }
        
        // Handle gallery image reordering
        if ($request->has('gallery_order') && is_array($request->gallery_order)) {
            foreach ($request->gallery_order as $index => $galleryId) {
                \App\Models\ServiceGallery::where('id', $galleryId)
                    ->where('service_id', $service->id)
                    ->update(['order' => $index]);
            }
        }
        
        // Sync skills
        if (!empty($validated['skills'])) {
            $service->skills()->sync($validated['skills']);
        }
        
        // Handle packages
        if ($request->has('packages')) {
            // Log the packages data for debugging
            \Log::debug('Packages data received:', $request->packages);
            
            // Delete old packages
            $service->packages()->delete();
            
            // Create new packages
            foreach ($request->packages as $packageData) {
                $features = [];
                
                // Handle different possible formats for features
                if (isset($packageData['features'])) {
                    \Log::debug('Features for package:', ['features' => $packageData['features'], 'type' => gettype($packageData['features'])]);
                    
                    if (is_array($packageData['features'])) {
                        $features = array_values(array_filter($packageData['features'], function($item) {
                            return !empty(trim($item));
                        }));
                    } elseif (is_string($packageData['features'])) {
                        if ($this->isJson($packageData['features'])) {
                            $features = json_decode($packageData['features'], true);
                            if (!is_array($features)) {
                                $features = [$packageData['features']];
                            }
                        } else {
                            // Convert string to array
                            $features = [$packageData['features']];
                        }
                    } else {
                        $features = ['Basic service'];
                    }
                } else {
                    $features = ['Basic service'];
                }
                
                // Ensure features is always an array and not empty
                if (empty($features)) {
                    $features = ['Basic service'];
                }
                
                \Log::debug('Final features for package:', ['features' => $features]);
                
                $package = new \App\Models\ServicePackage([
                    'service_id' => $service->id,
                    'title' => $packageData['title'],
                    'price' => $packageData['price'],
                    'delivery_time' => $packageData['delivery_time'],
                    'revisions' => $packageData['revisions'],
                    'features' => $features  // Laravel will automatically JSON-encode due to cast
                ]);
                
                $package->save();
            }
        }
        
        // Handle requirements
        if ($request->has('requirements')) {
            // Delete old requirements
            $service->requirement_s()->delete();
            
            // Create new requirements
            foreach ($request->requirements as $reqData) {
                if (is_array($reqData) && isset($reqData['question'])) {
                    $requirement = new \App\Models\ServiceRequirement([
                        'service_id' => $service->id,
                        'question' => $reqData['question'],
                        'required' => isset($reqData['required']) ? $reqData['required'] : false
                    ]);
                    
                    $requirement->save();
                } elseif (is_string($reqData) && !empty(trim($reqData))) {
                    // Handle case where requirement is just a string
                    $requirement = new \App\Models\ServiceRequirement([
                        'service_id' => $service->id,
                        'question' => trim($reqData),
                        'required' => 1
                    ]);
                    
                    $requirement->save();
                }
            }
        }
        
        // Handle FAQs
        if ($request->has('faqs')) {
            // Delete old FAQs
            $service->faqs()->delete();
            
            // Create new FAQs
            foreach ($request->faqs as $faqData) {
                if (is_array($faqData) && !empty($faqData['question']) && !empty($faqData['answer'])) {
                    $faq = new \App\Models\ServiceFaq([
                        'service_id' => $service->id,
                        'question' => $faqData['question'],
                        'answer' => $faqData['answer']
                    ]);
                    
                    $faq->save();
                } elseif (is_string($faqData) && $this->isJson($faqData)) {
                    // Handle case where FAQ is JSON string
                    $decodedFaq = json_decode($faqData, true);
                    if (isset($decodedFaq['question']) && isset($decodedFaq['answer'])) {
                        $faq = new \App\Models\ServiceFaq([
                            'service_id' => $service->id,
                            'question' => $decodedFaq['question'],
                            'answer' => $decodedFaq['answer']
                        ]);
                        
                        $faq->save();
                    }
                }
            }
        }
        
        // Record activity
        Activity::create([
            'user_id' => $user->id,
            'type' => 'service_updated',
            'description' => "Updated service: {$service->title}",
            'subject_id' => $service->id,
            'subject_type' => \App\Models\Service::class,
        ]);
        
        return redirect()->back()->with('success', 'Layanan berhasil diperbarui.');
    }
    
    /**
     * Display freelancer's active orders.
     */
    public function orders(Request $request)
    {
        $user = Auth::user();
        $status = $request->get('status', 'all');
        $search = $request->get('search', '');
        
        // Query base
        $query = $user->freelancerOrders()
            ->with(['client', 'service', 'project'])
            ->orderBy('created_at', 'desc');
            
        // Apply status filter
        if ($status !== 'all') {
            // Fix the inconsistency between in-progress and in_progress
            if ($status === 'in_progress') {
                $query->where('status', 'in_progress')->orWhere('status', 'in-progress');
            } else {
                $query->where('status', $status);
            }
        }
        
        // Apply search if specified
        if (!empty($search)) {
            $query->where(function($q) use ($search) {
                $q->where('order_number', 'LIKE', "%{$search}%")
                  ->orWhereHas('client', function($q) use ($search) {
                      $q->where('name', 'LIKE', "%{$search}%");
                  })
                  ->orWhereHas('service', function($q) use ($search) {
                      $q->where('title', 'LIKE', "%{$search}%");
                  })
                  ->orWhereHas('project', function($q) use ($search) {
                      $q->where('title', 'LIKE', "%{$search}%");
                  });
            });
        }
        
        // Get paginated results
        $orders = $query->paginate(10)->appends($request->all());
        
        // Get order counts for each status tab
        $orderCounts = [
            'all' => $user->freelancerOrders()->count(),
            'pending' => $user->freelancerOrders()->where('status', 'pending')->count(),
            'in_progress' => $user->freelancerOrders()->where(function($q) {
                $q->where('status', 'in_progress')->orWhere('status', 'in-progress');
            })->count(),
            'delivered' => $user->freelancerOrders()->where('status', 'delivered')->count(),
            'completed' => $user->freelancerOrders()->where('status', 'completed')->count(),
            'cancelled' => $user->freelancerOrders()->where('status', 'cancelled')->count(),
        ];
            
        return Inertia::render('Freelancer/Orders', [
            'orders' => $orders,
            'filters' => [
                'status' => $status,
                'search' => $search,
            ],
            'orderCounts' => $orderCounts
        ]);
    }
    
    /**
     * Show details for a specific order.
     */
    public function orderDetail($id)
    {
        $user = Auth::user();
        $order = Order::with(['client', 'service', 'project', 'reviews', 'files'])
            ->findOrFail($id);
            
        // Ensure the order belongs to the user
        if ($order->freelancer_id !== $user->id) {
            return redirect()->route('freelancer.orders')->with('error', 'You do not have access to this order.');
        }
        
        // Get all files related to this order
        $files = $order->files;
        
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
            
        // Calculate time remaining if due date exists
        $timeRemaining = null;
        if ($order->due_date) {
            $dueDate = new \DateTime($order->due_date);
            $now = new \DateTime();
            $interval = $now->diff($dueDate);
            
            if ($dueDate > $now) {
                $timeRemaining = [
                    'days' => $interval->d,
                    'hours' => $interval->h,
                    'minutes' => $interval->i,
                    'seconds' => $interval->s,
                    'invert' => $interval->invert, // 1 if past due date
                ];
            }
        }
        
        // Check if freelancer can deliver
        $canDeliver = in_array($order->status, ['in_progress', 'in-progress']);
        
        // Check if there are already deliverable files
        $hasDeliverableFiles = $order->files()->where('status', 'deliverable')->count() > 0;
            
        return Inertia::render('Freelancer/OrderDetail', [
            'user' => $user,
            'order' => $order,
            'messages' => $messages,
            'files' => $files,
            'timeRemaining' => $timeRemaining,
            'canDeliver' => $canDeliver,
            'hasDeliverableFiles' => $hasDeliverableFiles
        ]);
    }
    
    /**
     * Display detail of an order
     *
     * @param  int  $id
     * @return \Inertia\Response
     */
    public function showOrder($id)
    {
        $user = Auth::user();
        
        // Get the order with related data
        $order = Order::with([
                'client', 
                'client.profile',
                'service', 
                'service.user', 
                'service.category',
                'service.requirement_s',
                'service.faqs',
                'project',
                'project.category',
                'payments',
                'files' => function ($query) {
                    $query->orderBy('created_at', 'desc');
                },
                'messages' => function ($query) {
                    $query->orderBy('created_at', 'asc');
                }
            ])
            ->where('freelancer_id', $user->id)
            ->findOrFail($id);
            
        // If the status uses hyphen instead of underscore, standardize it
        if ($order->status === 'in-progress') {
            $order->status = 'in_progress';
        }
        
        // Get the order files
        $files = $order->files()->orderBy('created_at', 'desc')->get();
        
        // Add explicit permission checks for files
        $files->each(function ($file) use ($user, $order) {
            // Ensure the freelancer can download client files
            if ($file->user_id === $order->client_id) {
                $file->can_download = true; // Freelancers can always download client files
            } else {
                // For freelancer's own files (deliverables)
                $file->can_download = true; // Freelancers can always download their own files
            }
            
            // Add file type and size information for better display
            $file->file_extension = pathinfo($file->original_name, PATHINFO_EXTENSION);
            $file->formatted_size = $this->formatFileSize($file->file_size);
            $file->download_url = route('files.download', ['id' => $file->id]);
        });
        
        // Prepare time remaining data if order is in progress
        $timeRemaining = null;
        $expectedDeliveryDate = $order->due_date ?? $order->expected_delivery_date ?? $order->deadline;
        
        if (($order->status === 'in_progress' || $order->status === 'pending') && $expectedDeliveryDate) {
            $deadline = Carbon::parse($expectedDeliveryDate);
            $now = Carbon::now();
            
            if ($now->lt($deadline)) {
                $diffMinutes = $now->diffInMinutes($deadline, false);
                $days = floor($diffMinutes / 1440); // 1440 minutes in a day
                $hours = floor(($diffMinutes % 1440) / 60);
                $minutes = $diffMinutes % 60;
                
                $timeRemaining = [
                    'days' => $days,
                    'hours' => $hours,
                    'minutes' => $minutes,
                    'deadline_date' => $deadline->format('Y-m-d H:i:s'),
                ];
            } else {
                $timeRemaining = [
                    'overdue' => true,
                    'days' => $deadline->diffInDays($now),
                    'deadline_date' => $deadline->format('Y-m-d H:i:s'),
                ];
            }
        }
        
        // Add payment information for the order
        $paymentInfo = [
            'has_payment' => false,
            'payment_status' => null,
            'payment_method' => null,
            'payment_date' => null,
        ];
        
        // Check if order has payment
        if ($order->payments()->exists()) {
            $latestPayment = $order->payments()->latest()->first();
            $paymentInfo = [
                'has_payment' => true,
                'payment_status' => $latestPayment->status,
                'payment_method' => $latestPayment->payment_method,
                'payment_date' => $latestPayment->updated_at,
                'payment_id' => $latestPayment->id,
                'payment_amount' => $latestPayment->amount,
            ];
        }
        
        // Get messages related specifically to this order
        $messages = Message::where('order_id', $order->id)
            ->where(function($query) use ($user, $order) {
                $query->where('sender_id', $user->id)
                      ->orWhere('recipient_id', $user->id);
            })
            ->orderBy('created_at', 'asc') // Ubah ke asc untuk menampilkan dari lama ke baru
            ->get();
        
        // Periksa apakah freelancer dapat mengirim hasil pekerjaan
        $canDeliver = in_array($order->status, ['in_progress', 'in-progress']);
        
        // Periksa apakah sudah ada file hasil pekerjaan yang diunggah
        $hasDeliverableFiles = $order->files()->where('status', 'deliverable')->count() > 0;
        
        return Inertia::render('Freelancer/OrderDetail', [
            'order' => $order,
            'files' => $files,
            'messages' => $messages,
            'user' => $user,
            'timeRemaining' => $timeRemaining,
            'paymentInfo' => $paymentInfo,
            'canDeliver' => $canDeliver,
            'hasDeliverableFiles' => $hasDeliverableFiles
        ]);
    }
    
    /**
     * Helper method to format file size
     */
    private function formatFileSize($size)
    {
        if ($size < 1024) {
            return $size . ' B';
        } elseif ($size < 1048576) {
            return round($size / 1024, 2) . ' KB';
        } elseif ($size < 1073741824) {
            return round($size / 1048576, 2) . ' MB';
        } else {
            return round($size / 1073741824, 2) . ' GB';
        }
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
            'type' => 'order_status_updated',
            'description' => "Updated order #{$order->id} status to {$order->status}",
            'subject_id' => $order->id,
            'subject_type' => \App\Models\Order::class,
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
        
        // Use the withdrawal service
        $withdrawalService = app(WithdrawalService::class);
        $result = $withdrawalService->requestWithdrawal(
            $user, 
            $validated['amount'], 
            $validated['payment_method'], 
            ['details' => $validated['payment_details']]
        );
        
        if (!$result['success']) {
            return back()->with('error', $result['message']);
        }
        
        return redirect()->route('freelancer.earnings')
            ->with('success', 'Withdrawal request submitted successfully.');
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
    // public function sendMessage(Request $request)
    // {
    //     $user = Auth::user();
        
    //     $validated = $request->validate([
    //         'recipient_id' => 'required|exists:users,id',
    //         'content' => 'required|string', // Tetap menggunakan 'content' di form input
    //         'attachments' => 'nullable|array',
    //         'attachments.*' => 'file|max:5120',
    //     ]);
        
    //     $message = Message::create([
    //         'sender_id' => $user->id,
    //         'recipient_id' => $validated['recipient_id'],
    //         'message' => $validated['content'],
    //         'is_read' => false,
    //     ]);
        
    //     // Handle file uploads if any
    //     if ($request->hasFile('attachments')) {
    //         // Implementation for file uploads would go here
    //     }
        
    //     return back()->with('success', 'Message sent successfully.');
    // }
    public function sendMessage(Request $request)
    {
        $user = Auth::user();
        
        $validated = $request->validate([
            'recipient_id' => 'required|exists:users,id',
            'order_id' => 'nullable|exists:orders,id', // Tambahkan validasi order_id jika pesan terkait order
            'content' => 'nullable|string', // Bisa nullable jika hanya mengirim file
            'attachments' => 'nullable|array|max:5', // Batasi 5 file
            'attachments.*' => 'file|max:5120|mimes:jpeg,png,jpg,gif,pdf,doc,docx,zip', // 5MB per file
        ]);

        // Pastikan ada konten pesan atau attachment
        if (empty($validated['content']) && !($request->hasFile('attachments') && count($request->file('attachments')) > 0)) {
            return back()->withErrors(['content' => 'Message content or attachments are required.']);
        }

        $order = null;
        if (isset($validated['order_id'])) {
            $order = Order::find($validated['order_id']);
            // Pastikan pengirim adalah bagian dari order jika order_id disediakan
            if (!$order || ($order->client_id !== $user->id && $order->freelancer_id !== $user->id)) {
                return back()->withErrors(['order_id' => 'Invalid order ID or you are not part of this order.']);
            }
        }

        $message = Message::create([
            'sender_id' => $user->id,
            'recipient_id' => $validated['recipient_id'],
            'order_id' => $validated['order_id'] ?? null, // Simpan order_id
            'message' => $validated['content'] ?? null,
            'is_read' => false,
            // Kolom 'attachments' pada Message Model adalah JSON, akan diisi setelah upload
        ]);
        
        $uploadedFilePaths = [];
        // Handle file uploads if any for messages
        if ($request->hasFile('attachments')) {
            foreach ($request->file('attachments') as $attachmentFile) {
                try {
                    // Panggil FileService untuk mengunggah attachment pesan
                    // Status 'active' agar langsung bisa diunduh oleh penerima
                    $file = $this->fileService->uploadOrderAttachment(
                        $attachmentFile,
                        $user,
                        $order // Teruskan objek order
                    );
                    $uploadedFilePaths[] = $file->file_path; // Simpan path untuk kolom attachments di message
                } catch (\Exception $e) {
                    Log::error('Failed to upload message attachment: ' . $e->getMessage(), ['file' => $attachmentFile->getClientOriginalName()]);
                    // Anda bisa memilih untuk menghentikan proses atau melanjutkan dengan error
                    return back()->withErrors(['attachments' => 'Failed to upload some files.']);
                }
            }
            // Simpan path file yang diunggah ke kolom 'attachments' (JSON) di model Message
            $message->attachments = $uploadedFilePaths;
            $message->save(); // Simpan perubahan pada pesan
        }
        
        return back()->with('success', 'Message sent successfully.');
    }
    
    /**
     * Display a specific conversation (modified to pass order_id if available)
     */
    public function showConversation($conversation_id) // Parameter ini sebenarnya adalah other_user_id
    {
        $user = Auth::user();
        $otherUser = User::findOrFail($conversation_id); // Gunakan $conversation_id sebagai $otherUser
        
        // Dapatkan pesan-pesan antara kedua user
        $messages = Message::where(function($query) use ($user, $otherUser) {
                $query->where('sender_id', $user->id)
                    ->where('recipient_id', $otherUser->id);
            })
            ->orWhere(function($query) use ($user, $otherUser) {
                $query->where('sender_id', $otherUser->id)
                    ->where('recipient_id', $user->id);
            })
            ->with(['sender:id,name', 'recipient:id,name', 'order:id,order_number']) // Eager load sender, recipient, dan order
            ->orderBy('created_at', 'asc')
            ->get()
            ->map(function ($message) {
                $attachments = [];
                if ($message->attachments) {
                    foreach (json_decode($message->attachments, true) as $filePath) {
                        // Perlu membuat URL download jika file disimpan di private disk
                        // Asumsi File model memiliki metode `getDownloadUrl()` atau Anda buat di sini
                        $file = \App\Models\File::where('file_path', $filePath)->first();
                        if ($file) {
                             $attachments[] = [
                                'id' => $file->id,
                                'original_name' => $file->original_name,
                                'url' => route('files.download', $file->id),
                                'file_extension' => pathinfo($file->original_name, PATHINFO_EXTENSION),
                                'formatted_size' => $this->formatFileSize($file->file_size), // Pastikan formatFileSize tersedia
                             ];
                        }
                    }
                }
                return [
                    'id' => $message->id,
                    'sender_id' => $message->sender_id,
                    'recipient_id' => $message->recipient_id,
                    'order_id' => $message->order_id,
                    'message' => $message->message,
                    'created_at' => $message->created_at->format('Y-m-d H:i:s'),
                    'is_read' => $message->is_read,
                    'read_at' => $message->read_at?->format('Y-m-d H:i:s'),
                    'sender_name' => $message->sender->name ?? 'Unknown',
                    'attachments' => $attachments, // Tambahkan attachments
                ];
            });

        // Tandai pesan yang diterima sebagai sudah dibaca
        Message::where('sender_id', $otherUser->id)
            ->where('recipient_id', $user->id)
            ->where('is_read', false)
            ->update(['is_read' => true, 'read_at' => now()]);

        return Inertia::render('Freelancer/Messages', [
            'user' => $user,
            'otherUser' => $otherUser,
            'messages' => $messages,
            'currentChatUserId' => $otherUser->id, // Untuk mengindikasikan chat yang aktif
        ]);
    }

    public function getOrderMessages($orderId)
    {
        $user = Auth::user();
        $order = Order::where('freelancer_id', $user->id)->orWhere('client_id', $user->id)->findOrFail($orderId);

        $messages = Message::where('order_id', $order->id)
            ->where(function ($query) use ($user, $order) {
                $query->where('sender_id', $user->id)
                    ->orWhere('recipient_id', $user->id);
            })
            ->with(['sender:id,name,profile_photo_url', 'attachments']) // Eager load sender and attachments
            ->orderBy('created_at', 'asc')
            ->get()
            ->map(function ($message) use ($user) {
                $attachments = [];
                if ($message->attachments) { // attachments is already JSON decoded by model cast
                    foreach ($message->attachments as $filePath) {
                        $file = \App\Models\File::where('file_path', $filePath)->first();
                        if ($file) {
                             $attachments[] = [
                                'id' => $file->id,
                                'original_name' => $file->original_name,
                                'url' => route('files.download', $file->id),
                                'file_extension' => pathinfo($file->original_name, PATHINFO_EXTENSION),
                                'formatted_size' => $this->formatFileSize($file->file_size),
                             ];
                        }
                    }
                }

                return [
                    'id' => $message->id,
                    'sender_id' => $message->sender_id,
                    'recipient_id' => $message->recipient_id,
                    'message' => $message->message,
                    'created_at' => $message->created_at->format('Y-m-d H:i:s'),
                    'is_mine' => $message->sender_id === $user->id,
                    'sender_name' => $message->sender->name,
                    'sender_avatar' => $message->sender->profile_photo_url ?? 'https://ui-avatars.com/api/?name=' . urlencode($message->sender->name) . '&background=8b5cf6&color=fff',
                    'attachments' => $attachments, // Sertakan attachments
                ];
            });
            
        // Tandai pesan yang diterima sebagai sudah dibaca
        Message::where('order_id', $order->id)
            ->where('sender_id', '!=', $user->id)
            ->where('recipient_id', $user->id)
            ->where('is_read', false)
            ->update(['is_read' => true, 'read_at' => now()]);

        return response()->json([
            'success' => true,
            'messages' => $messages,
        ]);
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
            'type' => 'education_added',
            'description' => "Added education: {$education->degree} at {$education->institution}",
            'subject_id' => $education->id,
            'subject_type' => \App\Models\Education::class,
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
            'type' => 'experience_added',
            'description' => "Added experience: {$experience->position} at {$experience->company}",
            'subject_id' => $experience->id,
            'subject_type' => \App\Models\Experience::class,
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
            'type' => 'portfolio_added',
            'description' => "Added portfolio item: {$portfolio->title}",
            'subject_id' => $portfolio->id,
            'subject_type' => \App\Models\Portfolio::class,
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
            'type' => 'skills_updated',
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
        $service = Service::with([
                'category', 
                'skills', 
                'reviews.client', 
                'orders.client', 
                'packages', 
                'requirement_s', 
                'faqs'
            ])
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
        
        // Process service requirements - using correct relationship name requirement_s
        $requirementsData = [];
        if ($service->requirement_s && $service->requirement_s->count() > 0) {
            foreach ($service->requirement_s as $req) {
                $requirementsData[] = [
                    'id' => $req->id,
                    'question' => $req->question,
                    'required' => $req->required
                ];
            }
        }
        
        // Extract just the questions for the frontend display
        $requirementQuestions = [];
        if (!empty($requirementsData)) {
            foreach ($requirementsData as $req) {
                $requirementQuestions[] = $req['question'];
            }
        }
        
        \Log::info('Service requirements debugging (detailed):', [
            'requirements_count' => $service->requirement_s ? $service->requirement_s->count() : 0,
            'service_id' => $service->id,
            'requirements_data' => $requirementsData,
            'requirement_questions' => $requirementQuestions
        ]);
        
        // Format the service data for the frontend
        $serviceData = [
            'id' => $service->id,
            'title' => $service->title,
            'description' => $service->description,
            'price' => $service->price,
            'price_formatted' => 'Rp ' . number_format($service->price, 0, ',', '.'),
            'deliveryTime' => $service->delivery_time,
            'revisions' => $service->revisions ?? 0,
            'requirements' => is_array($requirementQuestions) ? $requirementQuestions : [], // Ensure it's always an array of strings
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
            'packages' => $service->packages ? $service->packages->map(function($package) {
                return [
                    'id' => $package->id,
                    'name' => $package->title,
                    'price' => $package->price,
                    'deliveryTime' => $package->delivery_time,
                    'revisions' => $package->revisions,
                    'features' => is_string($package->features) ? json_decode($package->features) : $package->features ?? []
                ];
            })->toArray() : [],
            // Only define requirements once to avoid duplication
            'faqs' => $service->faqs ? $service->faqs->map(function($faq) {
                return [
                    'question' => $faq->question,
                    'answer' => $faq->answer
                ];
            })->toArray() : [],
            'rating' => round($service->reviews_avg_rating ?? 0, 1),
            'reviewsCount' => $service->reviews->count(),
            'ordersCount' => $service->total_orders_count ?? 0,
            'completedOrders' => $service->completed_orders_count ?? 0,
            'activeOrders' => $service->active_orders_count ?? 0,
            'created_at' => $service->created_at->format('d M Y'),
            'updated_at' => $service->updated_at->format('d M Y')
        ];

        // Uncomment to debug the exact structure being sent to the frontend
        // dd([
        //     'serviceData' => $serviceData,
        //     'requirements' => $serviceData['requirements']
        // ]);
            
        return Inertia::render('Freelancer/ServiceDetail', [
            'user' => $user,
            'service' => $serviceData,
            'recentReviews' => $recentReviews,
            'ratingDistribution' => $ratingDistribution,
            'chartData' => $chartData
        ]);
    }
    
    /**
     * Delete the specified service.
     */
    public function deleteService($id)
    {
        try {
            $user = Auth::user();
            $service = Service::findOrFail($id);
            
            // Ensure the service belongs to the user
            if ($service->user_id !== $user->id) {
                return response()->json(['error' => 'You do not have permission to delete this service.'], 403);
            }
            
            // Check if the service has any orders
            $hasOrders = $service->orders()->exists();
            if ($hasOrders) {
                return response()->json(['error' => 'Cannot delete service with existing orders. You can deactivate it instead.'], 400);
            }
            
            // Begin transaction
            \DB::beginTransaction();
            
            try {
                // Detach all skills before deleting the service
                $service->skills()->detach();
                
                // Delete the thumbnail if it exists
                if ($service->thumbnail) {
                    Storage::disk('public')->delete($service->thumbnail);
                }
                
                // Delete the service
                $service->delete();
                
                \DB::commit();
            } catch (\Exception $e) {
                \DB::rollback();
                \Log::error('Error deleting service: ' . $e->getMessage());
                return response()->json(['error' => 'Failed to delete service. Please try again.'], 500);
            }
        } catch (\Exception $e) {
            \Log::error('Error in deleteService method: ' . $e->getMessage());
            return response()->json(['error' => 'Service not found or another error occurred.'], 404);
        }
        
        // Record activity
        Activity::create([
            'user_id' => $user->id,
            'type' => 'service_deleted',
            'description' => "Deleted service: {$service->title}",
            'subject_type' => \App\Models\Service::class,
        ]);
        
        return response()->json(['success' => true, 'message' => 'Service deleted successfully.']);
    }
}
