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
use App\Models\Skill;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Carbon\Carbon;

class ClientController extends Controller
{
    /**
     * Create a new controller instance.
     */
    public function __construct()
    {
        // No middleware registration needed here
        // The middleware is applied at the route level with 'auth' and 'role:client'
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
            'user' => $user,
            'stats' => $stats,
            'activities' => $activities,
            'recentOrders' => $recentOrders,
            'activeProjects' => $activeProjects,
            'recommendedServices' => $recommendedServices,
            'unreadMessagesCount' => $unreadMessagesCount
        ]);
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
    public function orders()
    {
        $user = Auth::user();
        
        $activeOrders = $user->clientOrders()
            ->whereIn('status', ['pending', 'in-progress', 'revision'])
            ->with(['freelancer', 'service', 'project'])
            ->orderBy('created_at', 'desc')
            ->paginate(10);
            
        $completedOrders = $user->clientOrders()
            ->where('status', 'completed')
            ->with(['freelancer', 'service', 'project'])
            ->orderBy('created_at', 'desc')
            ->paginate(10);
            
        $cancelledOrders = $user->clientOrders()
            ->where('status', 'cancelled')
            ->with(['freelancer', 'service', 'project'])
            ->orderBy('created_at', 'desc')
            ->paginate(10);
            
        return Inertia::render('Client/Orders', [
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
        $order = Order::with(['freelancer', 'service', 'project', 'reviews'])
            ->findOrFail($id);
            
        // Ensure the order belongs to the user
        if ($order->client_id !== $user->id) {
            return redirect()->route('client.orders')->with('error', 'You do not have access to this order.');
        }
        
        // Get messages related to this order
        $messages = Message::where(function($query) use ($user, $order) {
                $query->where('sender_id', $user->id)
                    ->where('recipient_id', $order->freelancer_id);
            })
            ->orWhere(function($query) use ($user, $order) {
                $query->where('sender_id', $order->freelancer_id)
                    ->where('recipient_id', $user->id);
            })
            ->orderBy('created_at')
            ->get();
            
        return Inertia::render('Client/OrderDetail', [
            'user' => $user,
            'order' => $order,
            'messages' => $messages
        ]);
    }
    
    /**
     * Update an order status (for client approval or requesting revisions).
     */
    public function updateOrderStatus(Request $request, $id)
    {
        $user = Auth::user();
        $order = Order::findOrFail($id);
        
        // Ensure the order belongs to the user
        if ($order->client_id !== $user->id) {
            return redirect()->route('client.orders')->with('error', 'You do not have access to this order.');
        }
        
        $validated = $request->validate([
            'status' => 'required|in:revision,completed',
            'notes' => 'nullable|string',
        ]);
        
        // Only allow certain status transitions
        if ($order->status !== 'in-progress' && $order->status !== 'revision') {
            return back()->with('error', 'Invalid status transition.');
        }
        
        $order->status = $validated['status'];
        $order->notes = $validated['notes'] ?? $order->notes;
        
        if ($validated['status'] === 'completed') {
            $order->completed_at = now();
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
        
        return redirect()->route('client.order.detail', $order->id)->with('success', 'Order status updated successfully.');
    }
    
    /**
     * Submit a review for a completed order.
     */
    public function submitReview(Request $request, $orderId)
    {
        $user = Auth::user();
        $order = Order::findOrFail($orderId);
        
        // Ensure the order belongs to the user and is completed
        if ($order->client_id !== $user->id) {
            return redirect()->route('client.orders')->with('error', 'You do not have access to this order.');
        }
        
        if ($order->status !== 'completed') {
            return redirect()->route('client.order.detail', $order->id)
                ->with('error', 'You can only review completed orders.');
        }
        
        // Check if review already exists
        if (Review::where('order_id', $order->id)->exists()) {
            return redirect()->route('client.order.detail', $order->id)
                ->with('error', 'You have already submitted a review for this order.');
        }
        
        $validated = $request->validate([
            'rating' => 'required|integer|min:1|max:5',
            'comment' => 'required|string|min:10',
        ]);
        
        $review = Review::create([
            'client_id' => $user->id,
            'freelancer_id' => $order->freelancer_id,
            'order_id' => $order->id,
            'rating' => $validated['rating'],
            'comment' => $validated['comment'],
        ]);
        
        // Record activity
        Activity::create([
            'user_id' => $user->id,
            'activity_type' => 'review_submitted',
            'description' => "Submitted a {$review->rating}-star review for order #{$order->id}",
            'reference_id' => $review->id,
            'reference_type' => 'review',
        ]);
        
        return redirect()->route('client.order.detail', $order->id)
            ->with('success', 'Review submitted successfully.');
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
            
        return Inertia::render('Client/Messages', [
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
            
        return Inertia::render('Client/Conversation', [
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
     * Order a service.
     */
    public function orderService(Request $request, $serviceId)
    {
        $user = Auth::user();
        $service = Service::findOrFail($serviceId);
        
        $validated = $request->validate([
            'requirements' => 'required|string|min:10',
            'delivery_date' => 'nullable|date|after:today',
            'attachments' => 'nullable|array',
            'attachments.*' => 'file|max:5120',
        ]);
        
        // Create the order
        $order = Order::create([
            'client_id' => $user->id,
            'freelancer_id' => $service->user_id,
            'service_id' => $service->id,
            'amount' => $service->price,
            'delivery_time' => $service->delivery_time,
            'status' => 'pending',
            'requirements' => $validated['requirements'],
            'expected_delivery_date' => $validated['delivery_date'] ?? Carbon::now()->addDays($service->delivery_time),
        ]);
        
        // Handle file uploads if any
        if ($request->hasFile('attachments')) {
            // Implementation for file uploads would go here
        }
        
        // Record activity
        Activity::create([
            'user_id' => $user->id,
            'activity_type' => 'service_ordered',
            'description' => "Ordered service: {$service->title}",
            'reference_id' => $order->id,
            'reference_type' => 'order',
        ]);
        
        return redirect()->route('client.orders')->with('success', 'Service ordered successfully.');
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
}
