<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Order;
use App\Models\Project;
use App\Models\Service;
use App\Models\Proposal;
use App\Models\Review;
use App\Models\Payment;
use App\Models\Message;
use App\Models\Activity;
use App\Models\Category;
use App\Models\Setting;
use App\Models\Skill;
use App\Events\MessageSent;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
use Carbon\Carbon;
use App\Services\FileService;
use App\Services\OrderService;

class ClientController extends Controller
{
    protected $fileService;
    protected $orderService;

    public function __construct(FileService $fileService, OrderService $orderService) // Inject services
    {
        $this->fileService = $fileService;
        $this->orderService = $orderService;
    }

    /**
     * Display the client dashboard.
     */
    public function dashboard()
    {
        $user = Auth::user()->load('profile');
        
        // Get stats for the dashboard
        $stats = [
            'active_projects' => $user->projects()->where('status', 'open')->count(),
            'active_orders' => $user->clientOrders()->whereIn('status', ['pending', 'in-progress', 'revision'])->count(),
            'completed_orders' => $user->clientOrders()->where('status', 'completed')->count(),
            'total_spent' => $user->clientOrders()->where('status', 'completed')->sum('amount'),
        ];
        
        // Get recent activities
        $activities = $user->activities()
            ->orderBy('created_at', 'desc')
            ->take(10)
            ->get();
        
        // Get recent orders
        $recentOrders = $user->clientOrders()
            ->with('freelancer', 'service', 'project')
            ->orderBy('created_at', 'desc')
            ->take(5)
            ->get();
            
        // Get active projects with proposals
        $activeProjects = $user->projects()
            ->where('status', 'open')
            ->withCount('proposals')
            ->with(['proposals' => function ($query) {
                $query->with('user');
            }])
            ->orderBy('created_at', 'desc')
            ->take(5)
            ->get();
        
        // Get recommended services based on user interests or popular services
        $recommendedServices = Service::with(['user', 'category', 'skills'])
            ->where('is_active', true)
            ->withCount(['orders as completed_count' => function($query) {
                $query->where('status', 'completed');
            }])
            ->orderBy('completed_count', 'desc')
            ->take(3)
            ->get()
            ->map(function($service) {
                // Calculate average rating for the service's freelancer
                $averageRating = Review::where('freelancer_id', $service->user_id)
                    ->avg('rating') ?? 0;
                
                return [
                    'id' => $service->id,
                    'title' => $service->title,
                    'freelancer' => [
                        'name' => $service->user->name,
                        'image' => $service->user->profile_photo_url ?? 
                            'https://ui-avatars.com/api/?name=' . urlencode($service->user->name) . '&background=8b5cf6&color=fff',
                    ],
                    'rating' => round($averageRating, 1),
                    'price' => $service->price,
                    'image' => $service->image ?? 'https://via.placeholder.com/300x200/' . substr(md5($service->category->name), 0, 6) . '/ffffff?text=' . urlencode($service->category->name),
                    'category' => $service->category->name,
                ];
            });
        
        // Get unread messages count
        $unreadMessagesCount = $user->receivedMessages()
            ->where('is_read', false)
            ->count();
            
        return Inertia::render('Client/Dashboard', [
            'stats' => $stats,
            'activities' => $activities,
            'recentOrders' => $recentOrders,
            'activeProjects' => $activeProjects,
            'recommendedServices' => $recommendedServices,
        ]);
    }
    
    /**
     * Display the client profile page.
     */
    public function profile()
    {
        $user = Auth::user()->load(['profile', 'skills']);
        
        // If there's no profile yet, create an empty one
        if (!$user->profile) {
            $user->profile()->create([
                'user_id' => $user->id
            ]);
            $user->load('profile'); // Reload the relation
        }
        
        // Get reviews received by the client (if any)
        $reviews = Review::where('client_id', $user->id)
            ->with('freelancer')
            ->orderBy('created_at', 'desc')
            ->get();
            
        // Get completed orders
        $completedOrders = Order::where('client_id', $user->id)
            ->where('status', 'completed')
            ->with(['service', 'freelancer'])
            ->orderBy('updated_at', 'desc')
            ->get();
            
        return Inertia::render('Client/Profile', [
            'userProfile' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'phone' => $user->profile->phone ?? $user->profile->phone_number ?? null,
                'location' => $user->profile->location ?? ($user->profile->city ? $user->profile->city . ', ' . ($user->profile->province ?? 'Indonesia') : null),
                'bio' => $user->profile->bio ?? null,
                'company' => $user->profile->company ?? null,
                'position' => $user->profile->position ?? null,
                'website' => $user->profile->website ?? null,
                'profile_photo_url' => $user->profile_photo_url ?? 'https://ui-avatars.com/api/?name=' . urlencode($user->name) . '&background=8b5cf6&color=fff',
                'created_at' => $user->created_at->format('d M Y'),
            ],
            'skills' => $user->skills->map(function($skill) {
                return [
                    'id' => $skill->id,
                    'name' => $skill->name
                ];
            }),
            'reviews' => $reviews->map(function($review) {
                return [
                    'id' => $review->id,
                    'rating' => $review->rating,
                    'comment' => $review->comment,
                    'created_at' => $review->created_at->format('d M Y'),
                    'freelancer' => [
                        'id' => $review->freelancer->id,
                        'name' => $review->freelancer->name,
                        'profile_photo_url' => $review->freelancer->profile_photo_url ?? 'https://ui-avatars.com/api/?name=' . urlencode($review->freelancer->name) . '&background=8b5cf6&color=fff',
                    ]
                ];
            }),
            'completedOrders' => $completedOrders->map(function($order) {
                return [
                    'id' => $order->id,
                    'title' => $order->service ? $order->service->title : 'Kustom Order',
                    'amount' => $order->amount,
                    'completed_date' => Carbon::parse($order->updated_at)->format('d M Y'),
                    'freelancer' => [
                        'id' => $order->freelancer->id,
                        'name' => $order->freelancer->name
                    ]
                ];
            }),
        ]);
    }
    
    /**
     * Show form to edit client profile.
     */
    public function editProfile()
    {
        $user = Auth::user()->load(['profile', 'skills']);
        
        // If there's no profile yet, create an empty one
        if (!$user->profile) {
            $user->profile()->create([
                'user_id' => $user->id
            ]);
            $user->load('profile'); // Reload the relation
        }
        
        return Inertia::render('Client/EditProfile', [
            'userProfile' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'phone' => $user->profile->phone ?? $user->profile->phone_number ?? null,
                'title' => $user->profile->title ?? null,
                'location' => $user->profile->location ?? ($user->profile->city ? $user->profile->city . ', ' . ($user->profile->province ?? 'Indonesia') : null),
                'bio' => $user->profile->bio ?? null,
                'company' => $user->profile->company ?? null,
                'position' => $user->profile->position ?? null,
                'website' => $user->profile->website ?? null,
                'profile_photo_url' => $user->profile_photo_url ?? 'https://ui-avatars.com/api/?name=' . urlencode($user->name) . '&background=8b5cf6&color=fff',
            ],
            'skills' => $user->skills->map(function($skill) {
                return [
                    'id' => $skill->id,
                    'name' => $skill->name
                ];
            }),
        ]);
    }
    
    /**
     * Update client profile information.
     */
    public function updateProfile(Request $request)
    {
        $user = Auth::user();
        
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email,' . $user->id,
            'phone' => 'nullable|string|max:20',
            'title' => 'nullable|string|max:100',
            'location' => 'nullable|string|max:100',
            'bio' => 'nullable|string|max:1000',
            'company' => 'nullable|string|max:100',
            'position' => 'nullable|string|max:100',
            'website' => 'nullable|url|max:100',
            'profile_photo' => 'nullable|image|max:2048', // Max 2MB
            'skills' => 'nullable|array',
            'skills.*' => 'exists:skills,id',
        ]);
        
        // Update user record
        $user->name = $validated['name'];
        $user->email = $validated['email'];
        $user->save();
        
        // Handle profile photo upload
        if ($request->hasFile('profile_photo')) {
            $path = $request->file('profile_photo')->store('profile-photos', 'public');
            $user->profile_photo_url = asset('storage/' . $path);
            $user->save();
        }
        
        // Extract city and province from location if possible
        $city = null;
        $province = null;
        if (!empty($validated['location'])) {
            $locationParts = explode(',', $validated['location']);
            if (count($locationParts) > 0) {
                $city = trim($locationParts[0]);
                if (count($locationParts) > 1) {
                    $province = trim($locationParts[1]);
                }
            }
        }
        
        // Update or create user profile
        $profileData = [
            'phone' => $validated['phone'] ?? null,
            'phone_number' => $validated['phone'] ?? null, // Update both fields for compatibility
            'title' => $validated['title'] ?? null,
            'location' => $validated['location'] ?? null,
            'city' => $city,
            'province' => $province,
            'bio' => $validated['bio'] ?? null,
            'company' => $validated['company'] ?? null,
            'position' => $validated['position'] ?? null,
            'website' => $validated['website'] ?? null,
        ];
        
        $user->profile()->updateOrCreate(
            ['user_id' => $user->id],
            $profileData
        );
        
        // Update skills if provided
        if (isset($validated['skills'])) {
            $user->skills()->sync($validated['skills']);
        }
        
        // Record activity
        Activity::create([
            'user_id' => $user->id,
            'type' => 'profile_updated', // Add the required field
            'activity_type' => 'profile_updated',
            'description' => 'Updated profile information',
            'reference_id' => $user->id,
            'reference_type' => 'user',
        ]);
        
        return redirect()->route('client.profile')->with('success', 'Profil berhasil diperbarui');
    }
    
    /**
     * Display a list of projects created by the client.
     */
    public function projects()
    {
        $user = Auth::user();
        
        $activeProjects = $user->projects()
            ->where('status', 'open')
            ->withCount('proposals')
            ->orderBy('created_at', 'desc')
            ->paginate(10);
            
        $closedProjects = $user->projects()
            ->where('status', '!=', 'open')
            ->withCount('proposals')
            ->orderBy('created_at', 'desc')
            ->paginate(10);
            
        return Inertia::render('Client/Projects', [
            'user' => $user,
            'activeProjects' => $activeProjects,
            'closedProjects' => $closedProjects
        ]);
    }
    
    /**
     * Show the form for creating a new project.
     */
    public function createProject()
    {
        $user = Auth::user();
        $categories = Category::all();
        $skills = Skill::all();
        
        return Inertia::render('Client/ProjectCreate', [
            'user' => $user,
            'categories' => $categories,
            'skills' => $skills
        ]);
    }
    
    /**
     * Store a newly created project.
     */
    public function storeProject(Request $request)
    {
        $user = Auth::user();
        
        $validated = $request->validate([
            'title' => 'required|string|max:100',
            'description' => 'required|string|min:50',
            'category_id' => 'required|exists:categories,id',
            'budget_min' => 'required|numeric|min:1',
            'budget_max' => 'required|numeric|gte:budget_min',
            'deadline' => 'required|date|after:today',
            'skills' => 'required|array',
            'skills.*' => 'exists:skills,id',
            'attachments' => 'nullable|array',
            'attachments.*' => 'file|mimes:pdf,doc,docx,jpg,jpeg,png|max:5120',
        ]);
        
        $project = new Project([
            'user_id' => $user->id,
            'title' => $validated['title'],
            'description' => $validated['description'],
            'category_id' => $validated['category_id'],
            'budget_min' => $validated['budget_min'],
            'budget_max' => $validated['budget_max'],
            'deadline' => $validated['deadline'],
            'status' => 'open',
        ]);
        
        $project->save();
        
        // Attach skills
        if (!empty($validated['skills'])) {
            $project->skills()->attach($validated['skills']);
        }
        
        // Handle file uploads if any
        if ($request->hasFile('attachments')) {
            // Implementation for file uploads would go here
        }
        
        // Record activity
        Activity::create([
            'user_id' => $user->id,
            'activity_type' => 'project_created',
            'description' => "Created a new project: {$project->title}",
            'reference_id' => $project->id,
            'reference_type' => 'project',
        ]);
        
        return redirect()->route('client.projects')->with('success', 'Project created successfully.');
    }
    
    /**
     * Show detail for a specific project including proposals.
     */
    public function projectDetail($id)
    {
        $user = Auth::user();
        $project = Project::with(['skills', 'proposals.user', 'category'])
            ->withCount('proposals')
            ->findOrFail($id);
            
        // Ensure the project belongs to the user
        if ($project->user_id !== $user->id) {
            return redirect()->route('client.projects')->with('error', 'You do not have access to this project.');
        }
            
        return Inertia::render('Client/ProjectDetail', [
            'user' => $user,
            'project' => $project
        ]);
    }
    
    /**
     * Update a project status.
     */
    public function updateProjectStatus(Request $request, $id)
    {
        $user = Auth::user();
        $project = Project::findOrFail($id);
        
        // Ensure the project belongs to the user
        if ($project->user_id !== $user->id) {
            return redirect()->route('client.projects')->with('error', 'You do not have access to this project.');
        }
        
        $validated = $request->validate([
            'status' => 'required|in:open,closed,completed,cancelled',
        ]);
        
        $project->status = $validated['status'];
        $project->save();
        
        // Record activity
        Activity::create([
            'user_id' => $user->id,
            'activity_type' => 'project_status_updated',
            'description' => "Updated project status to {$project->status} for: {$project->title}",
            'reference_id' => $project->id,
            'reference_type' => 'project',
        ]);
        
        return redirect()->route('client.project.detail', $project->id)->with('success', 'Project status updated successfully.');
    }
    
    /**
     * View a specific proposal for a project.
     */
    public function viewProposal($projectId, $proposalId)
    {
        $user = Auth::user();
        $project = Project::findOrFail($projectId);
        
        // Ensure the project belongs to the user
        if ($project->user_id !== $user->id) {
            return redirect()->route('client.projects')->with('error', 'You do not have access to this project.');
        }
        
        $proposal = Proposal::with('user.profile')->findOrFail($proposalId);
        
        // Ensure the proposal belongs to the project
        if ($proposal->project_id !== $project->id) {
            return redirect()->route('client.project.detail', $project->id)->with('error', 'Invalid proposal.');
        }
        
        return Inertia::render('Client/ProposalDetail', [
            'user' => $user,
            'project' => $project,
            'proposal' => $proposal
        ]);
    }
    
    /**
     * Accept a proposal and create an order.
     */
    public function acceptProposal(Request $request, $projectId, $proposalId)
    {
        $user = Auth::user();
        $project = Project::findOrFail($projectId);
        
        // Ensure the project belongs to the user
        if ($project->user_id !== $user->id) {
            return redirect()->route('client.projects')->with('error', 'You do not have access to this project.');
        }
        
        $proposal = Proposal::with('user')->findOrFail($proposalId);
        
        // Ensure the proposal belongs to the project
        if ($proposal->project_id !== $project->id) {
            return redirect()->route('client.project.detail', $project->id)->with('error', 'Invalid proposal.');
        }
        
        // Create an order
        $order = Order::create([
            'client_id' => $user->id,
            'freelancer_id' => $proposal->user_id,
            'project_id' => $project->id,
            'proposal_id' => $proposal->id,
            'amount' => $proposal->bid_amount,
            'delivery_time' => $proposal->delivery_time,
            'status' => 'pending',
            'requirements' => $request->input('requirements') ?? 'No additional requirements specified.',
        ]);
        
        // Update proposal status
        $proposal->status = 'accepted';
        $proposal->save();
        
        // Update project status if needed
        if ($project->status === 'open') {
            $project->status = 'in-progress';
            $project->save();
        }
        
        // Record activities
        Activity::create([
            'user_id' => $user->id,
            'activity_type' => 'proposal_accepted',
            'description' => "Accepted proposal for project: {$project->title}",
            'reference_id' => $proposal->id,
            'reference_type' => 'proposal',
        ]);
        
        Activity::create([
            'user_id' => $user->id,
            'activity_type' => 'order_created',
            'description' => "Created order #{$order->id} for project: {$project->title}",
            'reference_id' => $order->id,
            'reference_type' => 'order',
        ]);
        
        return redirect()->route('client.orders')->with('success', 'Proposal accepted and order created successfully.');
    }
    
    /**
     * Display client's orders.
     */
    public function orders(Request $request)
    {
        \Log::info('ClientController@orders called', [
            'user_id' => auth()->id(),
            'request' => $request->all()
        ]);
        
        $user = Auth::user();
        $status = $request->get('status', 'all'); // Get status filter from request
        $search = $request->get('search', ''); // Get search filter from request

        $query = $user->clientOrders()
            ->with(['freelancer', 'service', 'project']) // Eager load freelancer, service, project
            ->orderBy('created_at', 'desc');

        // Apply status filter
        if ($status !== 'all') {
            // Handle inconsistency between 'in-progress' and 'in_progress'
            if ($status === 'in_progress') {
                $query->where(function($q) {
                    $q->where('status', 'in_progress')->orWhere('status', 'in-progress');
                });
            } else {
                $query->where('status', $status);
            }
        }

        // Apply search filter
        if (!empty($search)) {
            $query->where(function($q) use ($search) {
                $q->where('order_number', 'LIKE', "%{$search}%")
                  ->orWhereHas('freelancer', function($q) use ($search) {
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
        
        $orders = $query->paginate(10)->appends($request->all()); // Paginate results

        // Get count of orders for each status tab
        $orderCounts = [
            'all' => $user->clientOrders()->count(),
            'pending' => $user->clientOrders()->where('status', 'pending')->count(),
            'in_progress' => $user->clientOrders()->where(function($q) {
                $q->where('status', 'in_progress')->orWhere('status', 'in-progress');
            })->count(),
            'delivered' => $user->clientOrders()->where('status', 'delivered')->count(),
            'completed' => $user->clientOrders()->where('status', 'completed')->count(),
            'revision' => $user->clientOrders()->where('status', 'revision')->count(),
            'cancelled' => $user->clientOrders()->where('status', 'cancelled')->count(),
        ];

        return Inertia::render('Client/Orders', [
            'orders' => $orders,
            'filters' => [
                'status' => $status,
                'search' => $search,
            ],
            'orderCounts' => $orderCounts
        ]);
    }
    
    /**
     * Process a payment for an order.
     */
    public function processPayment(Request $request, $orderId)
    {
        $user = Auth::user();
        $order = Order::findOrFail($orderId);
        
        // Ensure the order belongs to the user
        if ($order->client_id !== $user->id) {
            return redirect()->route('client.orders')->with('error', 'You do not have access to this order.');
        }
        
        // Check if payment already exists
        if (Payment::where('order_id', $order->id)->where('status', 'completed')->exists()) {
            return redirect()->route('client.order.detail', $order->id)
                ->with('error', 'Payment has already been processed for this order.');
        }
        
        $validated = $request->validate([
            'payment_method' => 'required|string|in:credit_card,paypal,bank_transfer',
            'amount' => 'required|numeric|min:1',
        ]);
        
        // Verify amount matches order amount
        if ($validated['amount'] != $order->amount) {
            return back()->with('error', 'Payment amount does not match order amount.');
        }
        
        // Create payment record
        $payment = Payment::create([
            'client_id' => $user->id,
            'order_id' => $order->id,
            'payment_id' => 'PAY-' . strtoupper(substr(md5(uniqid()), 0, 10)),
            'amount' => $validated['amount'],
            'payment_method' => $validated['payment_method'],
            'status' => 'completed',
            'paid_at' => now(),
        ]);
        
        // Update order status
        $order->status = 'in-progress';
        $order->save();
        
        // Record activity
        Activity::create([
            'user_id' => $user->id,
            'activity_type' => 'payment_processed',
            'description' => "Processed payment of {$payment->amount} for order #{$order->id}",
            'reference_id' => $payment->id,
            'reference_type' => 'payment',
        ]);
        
        return redirect()->route('client.order.detail', $order->id)
            ->with('success', 'Payment processed successfully.');
    }
    
    /**
     * Display the client's messages.
     * Handles listing conversations and displaying an active chat session.
     */
    public function messages(Request $request)
    {
        $currentUser = Auth::user()->load('profile');

        // 1. Fetch conversation list (sidebar)
        $participantIds = Message::where('sender_id', $currentUser->id)
            ->orWhere('recipient_id', $currentUser->id)
            ->selectRaw('CASE WHEN sender_id = ? THEN recipient_id ELSE sender_id END as other_user_id', [$currentUser->id])
            ->distinct()
            ->pluck('other_user_id');

        $conversationsData = User::whereIn('id', $participantIds)
            ->with('profile') // Eager load profile for other users
            ->get()
            ->map(function ($otherUser) use ($currentUser) {
                $lastMessage = Message::where(function ($query) use ($currentUser, $otherUser) {
                    $query->where('sender_id', $currentUser->id)->where('recipient_id', $otherUser->id);
                })->orWhere(function ($query) use ($currentUser, $otherUser) {
                    $query->where('sender_id', $otherUser->id)->where('recipient_id', $currentUser->id);
                })->orderBy('created_at', 'desc')->first();

                $unreadCount = Message::where('sender_id', $otherUser->id)
                                    ->where('recipient_id', $currentUser->id)
                                    ->where('is_read', false)
                                    ->count();
                
                $profilePhotoUrl = 'https://ui-avatars.com/api/?name=' . urlencode($otherUser->name) . '&background=8b5cf6&color=fff';
                if ($otherUser->profile && $otherUser->profile->profile_photo_url) {
                    $profilePhotoUrl = $otherUser->profile->profile_photo_url;
                } elseif ($otherUser->profile_photo_url) { // Fallback if profile_photo_url is directly on user
                    $profilePhotoUrl = $otherUser->profile_photo_url;
                }

                return [
                    'user' => [
                        'id' => $otherUser->id,
                        'name' => $otherUser->name,
                        'profile_photo_url' => $profilePhotoUrl,
                    ],
                    'last_message' => $lastMessage ? $lastMessage->message : null,
                    'timestamp' => $lastMessage ? $lastMessage->created_at : null,
                    'unread_count' => $unreadCount,
                ];
            })
            ->sortByDesc('timestamp')
            ->values();

        // 2. Handle active conversation (main panel)
        $activeChatOtherUser = null;
        $activeChatMessages = collect();
        $activeChatUserId = $request->input('with'); // Expects ?with=USER_ID in URL

        $loadedActiveChatOtherUser = null;
        if ($activeChatUserId) {
            $loadedActiveChatOtherUser = User::with('profile')->find($activeChatUserId);
            if ($loadedActiveChatOtherUser) {
                $activeChatOtherUserProfilePhotoUrl = 'https://ui-avatars.com/api/?name=' . urlencode($loadedActiveChatOtherUser->name) . '&background=8b5cf6&color=fff';
                if ($loadedActiveChatOtherUser->profile && $loadedActiveChatOtherUser->profile->profile_photo_url) {
                    $activeChatOtherUserProfilePhotoUrl = $loadedActiveChatOtherUser->profile->profile_photo_url;
                } elseif ($loadedActiveChatOtherUser->profile_photo_url) {
                     $activeChatOtherUserProfilePhotoUrl = $loadedActiveChatOtherUser->profile_photo_url;
                }

                $activeChatOtherUser = [
                     'id' => $loadedActiveChatOtherUser->id,
                     'name' => $loadedActiveChatOtherUser->name,
                     'profile_photo_url' => $activeChatOtherUserProfilePhotoUrl,
                ];

                $activeChatMessages = Message::where(function($query) use ($currentUser, $loadedActiveChatOtherUser) {
                    $query->where('sender_id', $currentUser->id)
                          ->where('recipient_id', $loadedActiveChatOtherUser->id);
                })
                ->orWhere(function($query) use ($currentUser, $loadedActiveChatOtherUser) {
                    $query->where('sender_id', $loadedActiveChatOtherUser->id)
                          ->where('recipient_id', $currentUser->id);
                })
                ->with('sender:id,name') 
                ->orderBy('created_at', 'asc')
                ->get()
                ->map(function($message) use ($currentUser) {
                    return [
                        'id' => $message->id,
                        'content' => $message->message, 
                        'created_at' => $message->created_at,
                        'is_mine' => $message->sender_id === $currentUser->id,
                        'sender_name' => $message->sender->name,
                    ];
                });

                Message::where('sender_id', $loadedActiveChatOtherUser->id)
                    ->where('recipient_id', $currentUser->id)
                    ->where('is_read', false)
                    ->update(['is_read' => true, 'read_at' => now()]);
            }
        }
        
        $currentUserProfilePhotoUrl = 'https://ui-avatars.com/api/?name=' . urlencode($currentUser->name) . '&background=8b5cf6&color=fff';
        if ($currentUser->profile && $currentUser->profile->profile_photo_url) {
            $currentUserProfilePhotoUrl = $currentUser->profile->profile_photo_url;
        } elseif ($currentUser->profile_photo_url) {
            $currentUserProfilePhotoUrl = $currentUser->profile_photo_url;
        }

        return Inertia::render('Client/Messages', [
            'auth_user' => [
                'id' => $currentUser->id,
                'name' => $currentUser->name,
                'profile_photo_url' => $currentUserProfilePhotoUrl,
            ],
            'conversations' => $conversationsData,
            'active_chat_other_user' => $activeChatOtherUser,
            'active_chat_messages' => $activeChatMessages,
            'initial_active_user_id' => $activeChatUserId ? (int)$activeChatUserId : null,
        ]);
    }
    
    /**
     * Display a specific conversation.
     */
    public function conversation($userId)
    {
        // Redirect to the main messages page with the specified user conversation active
        return redirect()->route('client.messages', ['with' => $userId]);
    }
    
    /**
     * Show a specific conversation.
     *
     * @param int $conversation_id
     * @return \Illuminate\Http\RedirectResponse
     */
    public function showConversation($conversation_id)
    {
        // Redirect to the main messages page with the specified user conversation active
        return redirect()->route('client.messages', ['with' => $conversation_id]);
    }
    
    /**
     * Update the send message function to redirect back to the dynamic message page
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
        
    //     // Redirect back to the messages page with the current conversation active
    //     return redirect()->route('client.messages', ['with' => $validated['recipient_id']])->with('success', 'Message sent successfully.');
    // }

    public function sendMessage(Request $request)
    {
        $user = Auth::user();
        
        $validated = $request->validate([
            'recipient_id' => 'required|exists:users,id',
            'order_id' => 'nullable|exists:orders,id',
            'content' => 'nullable|string',
            'attachments' => 'nullable|array|max:5',
            'attachments.*' => 'file|max:5120|mimes:jpeg,png,jpg,gif,pdf,doc,docx,zip',
        ]);

        if (empty($validated['content']) && !($request->hasFile('attachments') && count($request->file('attachments')) > 0)) {
            return back()->withErrors(['content' => 'Message content or attachments are required.']);
        }

        $order = null;
        if (isset($validated['order_id'])) {
            $order = Order::find($validated['order_id']);
            if (!$order || ($order->client_id !== $user->id && $order->freelancer_id !== $user->id)) {
                return back()->withErrors(['order_id' => 'Invalid order ID or you are not part of this order.']);
            }
        }

        $message = Message::create([
            'sender_id' => $user->id,
            'recipient_id' => $validated['recipient_id'],
            'order_id' => $validated['order_id'] ?? null,
            'message' => $validated['content'] ?? null,
            'is_read' => false,
        ]);
        
        // Broadcast the message for real-time updates
        broadcast(new \App\Events\MessageSent($message))->toOthers();
        
        // Update unread message count for the recipient
        \App\Http\Controllers\MessageNotificationController::updateUnreadCount($validated['recipient_id']);
        
        $uploadedFilePaths = [];
        if ($request->hasFile('attachments')) {
            foreach ($request->file('attachments') as $attachmentFile) {
                try {
                    $file = $this->fileService->uploadOrderAttachment(
                        $attachmentFile,
                        $user,
                        $order
                    );
                    $uploadedFilePaths[] = $file->file_path;
                } catch (\Exception $e) {
                    Log::error('Failed to upload message attachment from client: ' . $e->getMessage(), ['file' => $attachmentFile->getClientOriginalName()]);
                    return back()->withErrors(['attachments' => 'Failed to upload some files.']);
                }
            }
            $message->attachments = $uploadedFilePaths;
            $message->save();
        }
        
        return back()->with('success', 'Message sent successfully.');
    }
    
    /**
     * Browse available services.
     */
    public function browseServices()
    {
        $user = Auth::user();
        $categories = Category::all();
        
        $services = Service::where('is_active', true)
            ->with(['user', 'category'])
            ->orderBy('created_at', 'desc')
            ->paginate(12);
            
        return Inertia::render('Client/Services', [
            'user' => $user,
            'services' => $services,
            'categories' => $categories
        ]);
    }
    
    /**
     * Display details for a specific service.
     */
    public function serviceDetail($id)
    {
        $user = Auth::user();
        $service = Service::with([
                'user.profile', 
                'user.educations', 
                'user.portfolios', 
                'user.skills', 
                'category',
                'skills'
            ])
            ->findOrFail($id);
            
        // Get reviews of the freelancer
        $reviews = Review::where('freelancer_id', $service->user_id)
            ->with('client')
            ->orderBy('created_at', 'desc')
            ->take(5)
            ->get();
            
        $averageRating = Review::where('freelancer_id', $service->user_id)->avg('rating') ?? 0;
            
        return Inertia::render('Client/ServiceDetail', [
            'user' => $user,
            'service' => $service,
            'reviews' => $reviews,
            'averageRating' => $averageRating
        ]);
    }
    
    /**
     * Show form to order a service.
     */
    public function showOrderService($id)
    {
        $user = Auth::user();
        $service = Service::with(['user', 'packages', 'category'])
            ->findOrFail($id);
            
        // Get the selected package if provided in query string
        $packageId = request()->query('package_id');
        $selectedPackage = null;
        
        if ($packageId && $service->packages) {
            $selectedPackage = $service->packages->firstWhere('id', $packageId);
        }
        
        // If no package selected and packages exist, select the first one
        if (!$selectedPackage && $service->packages && $service->packages->count() > 0) {
            $selectedPackage = $service->packages->first();
        }
        
        return Inertia::render('Client/Services/OrderService', [
            'user' => $user,
            'service' => $service,
            'selectedPackage' => $selectedPackage
        ]);
    }
    
    /**
     * Process service order.
     */
    public function orderService(Request $request, $serviceId)
    {
        // dd($request->hasFile('attachments'));
        $user = Auth::user();
        $service = Service::with(['packages'])
            ->findOrFail($serviceId);
        
        // Get package if package_id is provided
        $packageId = $request->input('package_id');
        $package = null;
        
        // Default to service's base price and delivery time
        $orderAmount = $service->price;
        $deliveryTimeDays = $service->delivery_time; // Assuming 'delivery_time' is in days for services
        // $revisions = $service->revisions ?? 0; // Revisions are not directly stored in the order in this new flow

        if ($packageId && $service->packages) {
            $package = $service->packages->firstWhere('id', $packageId);
            if ($package) {
                $orderAmount = $package->price;
                $deliveryTimeDays = $package->delivery_time; // Assuming 'delivery_time' is in days for packages
                // $revisions = $package->revisions;
            }
        }
        
        $validated = $request->validate([
            'requirements' => 'required|string|min:10',
            // 'delivery_date' => 'nullable|date|after:today', // Due date is now calculated by OrderService
            // 'attachments' => 'nullable|array',
            'attachments.*' => 'file|mimes:pdf,doc,docx,jpg,jpeg,png|max:5120',
        ]);
        
        // Create the order using OrderService
        $orderData = [
            'service_id' => $service->id,
            'package_id' => $packageId, // Will be null if no package selected
            'requirements' => $validated['requirements'],
            'amount' => $orderAmount, // Pass the determined amount (service or package price)
            'delivery_time_days' => $deliveryTimeDays, // Pass the determined delivery time
        ];
        
        $orderService = app(\App\Services\OrderService::class); // Corrected line
        $order = $orderService->createOrderFromService($orderData, $user);
        
        \Illuminate\Support\Facades\Log::info('Order created with ID: ' . $order->id);

        // Handle file uploads if any
        if ($request->hasFile('attachments')) {
            $fileService = app(\App\Services\FileService::class);
            foreach ($request->file('attachments') as $attachmentFile) { // Renamed to avoid confusion
                $fileService->uploadOrderAttachment( // Use the specific method
                    $attachmentFile,
                    $user,
                    $order
                );
            }
        }
        
        // Send notification to the freelancer about new order
        $notificationService = app(\App\Services\NotificationService::class);
        $notificationService->notifyFreelancer(
            $service->user,
            $order,
            'new_order',
            'You have received a new order for your service',
            route('freelancer.orders.show', $order->id)
        );
        
        // Create initial message to freelancer
        Message::create([
            'sender_id' => $user->id,
            'recipient_id' => $service->user_id,
            'order_id' => $order->id,
            'message' => "Hi, I've just ordered your service. Please check my requirements and let me know if you have any questions.",
            'is_read' => false,
        ]);
        
        \Illuminate\Support\Facades\Log::info('Initial message created for order ID: ' . $order->id);

        // Client will pay after project completion, so no immediate payment redirect.
        // Redirect to messages to facilitate communication with the freelancer.
        \Illuminate\Support\Facades\Log::info('Redirecting to client.messages for user ID: ' . $user->id . ' after order ' . $order->id . ' creation.');
        return \Inertia\Inertia::location(route('client.messages', ['with' => $service->user_id]));
    }
        
    /**
     * Browse available freelancers.
     */
    public function browseFreelancers()
    {
        $user = Auth::user();
        
        $freelancers = User::where('role', 'freelancer')
            ->with(['profile', 'skills', 'receivedReviews'])
            ->withCount('receivedReviews')
            ->withAvg('receivedReviews', 'rating')
            ->paginate(12);
            
        return Inertia::render('Client/Freelancers', [
            'user' => $user,
            'freelancers' => $freelancers
        ]);
    }
    
    /**
     * Display details for a specific freelancer.
     */
    public function freelancerDetail($id)
    {
        $user = Auth::user();
        $freelancer = User::with([
                'profile', 
                'educations', 
                'experiences', 
                'portfolios', 
                'skills',
                'services'
            ])
            ->where('role', 'freelancer')
            ->findOrFail($id);
            
        // Get reviews of the freelancer
        $reviews = Review::where('freelancer_id', $freelancer->id)
            ->with('client')
            ->orderBy('created_at', 'desc')
            ->paginate(5);
            
        $averageRating = Review::where('freelancer_id', $freelancer->id)->avg('rating') ?? 0;
            
        return Inertia::render('Client/FreelancerDetail', [
            'user' => $user,
            'freelancer' => $freelancer,
            'reviews' => $reviews,
            'averageRating' => $averageRating
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
            
        // Get payment methods
        $paymentMethods = $user->paymentMethods()->get();
        
        return Inertia::render('Client/Settings', [
            'user' => $user,
            'profile' => $profile,
            'notificationSettings' => $notificationSettings,
            'paymentMethods' => $paymentMethods
        ]);
    }

    /**
     * Update account settings.
     */
    public function updateAccountSettings(Request $request)
    {
        $user = Auth::user();
        
        $validated = $request->validate([
            'phone' => 'nullable|string|max:20',
            'language' => 'nullable|string|in:id,en',
            'timezone' => 'nullable|string',
        ]);
        
        // Update or create user profile
        $user->profile()->updateOrCreate(
            ['user_id' => $user->id],
            [
                'phone' => $validated['phone'] ?? null,
                'phone_number' => $validated['phone'] ?? null, // Update both fields for compatibility
                'language' => $validated['language'] ?? 'id',
                'timezone' => $validated['timezone'] ?? 'Asia/Jakarta',
            ]
        );
        
        // Record activity
        Activity::create([
            'user_id' => $user->id,
            'type' => 'settings_updated',
            'activity_type' => 'settings_updated',
            'description' => 'Updated account settings',
            'reference_id' => $user->id,
            'reference_type' => 'user',
        ]);
        
        return back()->with('success', 'Pengaturan akun berhasil diperbarui');
    }
    
    /**
     * Update security settings.
     */
    public function updateSecuritySettings(Request $request)
    {
        $user = Auth::user();
        
        $validated = $request->validate([
            'currentPassword' => 'required|current_password',
            'newPassword' => 'required|string|min:8|confirmed',
            'newPassword_confirmation' => 'required|string|min:8',
        ]);
        
        // Update password
        $user->password = bcrypt($validated['newPassword']);
        $user->save();
        
        // Record activity
        Activity::create([
            'user_id' => $user->id,
            'type' => 'password_updated',
            'activity_type' => 'password_updated',
            'description' => 'Updated account password',
            'reference_id' => $user->id,
            'reference_type' => 'user',
        ]);
        
        return back()->with('success', 'Password berhasil diperbarui');
    }
    
    /**
     * Update notification settings.
     */
    public function updateNotificationSettings(Request $request)
    {
        $user = Auth::user();
        
        // Extract notification settings from the request
        $emailSettings = $request->input('email', []);
        $siteSettings = $request->input('site', []);
        
        // Update or create notification settings
        $user->notificationSettings()->updateOrCreate(
            ['user_id' => $user->id],
            [
                'email_project_updates' => $emailSettings['projectUpdates'] ?? false,
                'email_messages' => $emailSettings['messages'] ?? false,
                'email_promotions' => $emailSettings['promotions'] ?? false,
                'email_newsletter' => $emailSettings['newsletter'] ?? false,
                'site_project_updates' => $siteSettings['projectUpdates'] ?? false,
                'site_messages' => $siteSettings['messages'] ?? false,
                'site_promotions' => $siteSettings['promotions'] ?? false,
                'site_newsletter' => $siteSettings['newsletter'] ?? false,
            ]
        );
        
        // Record activity
        Activity::create([
            'user_id' => $user->id,
            'type' => 'notification_settings_updated',
            'activity_type' => 'notification_settings_updated',
            'description' => 'Updated notification settings',
            'reference_id' => $user->id,
            'reference_type' => 'user',
        ]);
        
        return back()->with('success', 'Pengaturan notifikasi berhasil diperbarui');
    }
    
    /**
     * Update privacy settings.
     */
    public function updatePrivacySettings(Request $request)
    {
        $user = Auth::user();
        
        $validated = $request->validate([
            'profileVisibility' => 'required|string|in:public,contacts,private',
            'showOnlineStatus' => 'required|boolean',
            'allowMessages' => 'required|boolean',
        ]);
        
        // Store privacy settings in the user's privacy_settings column (assuming it's a JSON column)
        $user->privacy_settings = [
            'profile_visibility' => $validated['profileVisibility'],
            'show_online_status' => $validated['showOnlineStatus'],
            'allow_messages' => $validated['allowMessages'],
        ];
        $user->save();
        
        // Record activity
        Activity::create([
            'user_id' => $user->id,
            'type' => 'privacy_settings_updated',
            'activity_type' => 'privacy_settings_updated',
            'description' => 'Updated privacy settings',
            'reference_id' => $user->id,
            'reference_type' => 'user',
        ]);
        
        return back()->with('success', 'Pengaturan privasi berhasil diperbarui');
    }
    
    /**
     * Update billing information.
     */
    public function updateBillingSettings(Request $request)
    {
        $user = Auth::user();
        
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'company' => 'nullable|string|max:255',
            'address' => 'nullable|string|max:255',
            'city' => 'nullable|string|max:100',
            'postalCode' => 'nullable|string|max:20',
            'country' => 'nullable|string|max:100',
            'taxId' => 'nullable|string|max:50',
        ]);
        
        // Update user's name
        $user->name = $validated['name'];
        $user->save();
        
        // Update or create billing information in profile
        $user->profile()->updateOrCreate(
            ['user_id' => $user->id],
            [
                'company' => $validated['company'] ?? null,
                'address' => $validated['address'] ?? null,
                'city' => $validated['city'] ?? null,
                'postal_code' => $validated['postalCode'] ?? null,
                'country' => $validated['country'] ?? 'Indonesia',
                'tax_id' => $validated['taxId'] ?? null,
            ]
        );
        
        // Record activity
        Activity::create([
            'user_id' => $user->id,
            'type' => 'billing_info_updated',
            'activity_type' => 'billing_info_updated',
            'description' => 'Updated billing information',
            'reference_id' => $user->id,
            'reference_type' => 'user',
        ]);
        
        return back()->with('success', 'Informasi penagihan berhasil diperbarui');
    }
    
    /**
     * Display details of a specific order.
     *
     * @param  int  $id
     * @return \Inertia\Response
     */
    public function showOrder($id)
    {
        \Log::info('ClientController@showOrder called', [
            'user_id' => auth()->id(),
            'order_id' => $id
        ]);
        
        $user = Auth::user();
        
        // Get the order and make sure it belongs to the current client
        $order = $user->clientOrders()
            ->with(['freelancer', 'freelancer.profile', 'service', 'project', 'reviews', 'deliveries', 'payments'])
            ->findOrFail($id);
        
        // Check if order has payments and needs status refresh (after payment redirection)
        if ($order->payments()->exists()) {
            // Get the latest payment
            $payment = $order->payments()->latest()->first();
            
            // If the payment is in pending status, check with payment handler
            if ($payment->status === 'pending') {
                $paymentHandler = app(\App\Services\MidtransPaymentHandler::class);
                $paymentHandler->processPaymentStatus($payment, $user);
                
                // Refresh the order data to get updated status
                $order = $user->clientOrders()
                    ->with(['freelancer', 'freelancer.profile', 'service', 'project', 'reviews', 'deliveries', 'payments'])
                    ->findOrFail($id);
            }
        }
        
        // Get messages related to this order
        $messages = Message::where('order_id', $order->id)
            ->where(function($query) use ($user) {
                $query->where('sender_id', $user->id)
                      ->orWhere('recipient_id', $user->id);
            })
            ->with(['sender', 'recipient'])
            ->orderBy('created_at', 'asc')
            ->get();
            
        // Check if the client can leave a review (completed orders that don't have a review yet)
        $canReview = $order->status === 'completed' && $order->reviews()->where('client_id', $user->id)->count() === 0;
        
        return Inertia::render('Client/OrderDetail', [
            'order' => $order,
            'messages' => $messages,
            'canReview' => $canReview
        ]);
    }
    
    /**
     * Debug helper for client orders (REMOVE IN PRODUCTION).
     */
    public function debugOrders(Request $request)
    {
        $user = Auth::user();
        
        // Basic checks
        $hasClientOrdersRelationship = method_exists($user, 'clientOrders');
        
        // Test the relationship
        $orderCount = 0;
        $firstOrder = null;
        $error = null;
        
        try {
            $orders = $user->clientOrders;
            $orderCount = count($orders);
            if ($orderCount > 0) {
                $firstOrder = $orders->first();
            }
        } catch (\Exception $e) {
            $error = $e->getMessage();
        }
        
        // Check order counts by status
        $orderCounts = [];
        if (!$error) {
            $orderCounts = [
                'all' => $user->clientOrders()->count(),
                'pending' => $user->clientOrders()->where('status', 'pending')->count(),
                'in_progress' => $user->clientOrders()->where(function($q) {
                    $q->where('status', 'in_progress')->orWhere('status', 'in-progress');
                })->count(),
                'delivered' => $user->clientOrders()->where('status', 'delivered')->count(),
                'completed' => $user->clientOrders()->where('status', 'completed')->count(),
                'revision' => $user->clientOrders()->where('status', 'revision')->count(),
                'cancelled' => $user->clientOrders()->where('status', 'cancelled')->count(),
            ];
        }
        
        // Return the debug information
        return response()->json([
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'role' => $user->role
            ],
            'relationship_checks' => [
                'has_client_orders_method' => $hasClientOrdersRelationship,
                'order_count' => $orderCount,
                'error' => $error
            ],
            'first_order' => $firstOrder,
            'order_counts' => $orderCounts,
            'debug_info' => [
                'controller_method' => __METHOD__,
                'time' => now()->toDateTimeString()
            ]
        ]);
    }
}
