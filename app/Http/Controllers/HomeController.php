<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Service;
use App\Models\User;
use App\Models\Project;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class HomeController extends Controller
{
    /**
     * Display the homepage.
     */
    public function index()
    {
        // Fetch featured services for homepage
        $featuredServices = Service::with(['user', 'user.profile', 'category'])
            ->where('is_active', true)
            ->orderBy('view_count', 'desc')
            ->take(6)
            ->get();
            
        // Fetch top rated freelancers
        $topFreelancers = User::where('role', 'freelancer')
            ->withCount(['receivedReviews as avg_rating' => function ($query) {
                $query->select(DB::raw('coalesce(avg(rating),0)'));
            }])
            ->withCount('services')
            ->withCount('clientOrders')
            ->orderBy('avg_rating', 'desc')
            ->take(5)
            ->get();
            
        // Fetch categories
        $categories = Category::where('is_active', true)
            ->whereNull('parent_id')
            ->withCount('services')
            ->orderBy('order')
            ->get();
            
        return Inertia::render('Homepage/Homepage', [
            'featuredServices' => $featuredServices,
            'topFreelancers' => $topFreelancers,
            'categories' => $categories
        ]);
    }
    
    /**
     * Display the exploration page.
     */
    public function explore(Request $request)
    {
        // Get search params
        $search = $request->query('search');
        $categoryId = $request->query('kategori_id');
        $categoryName = $request->query('kategori');
        $minPrice = $request->query('min_price');
        $maxPrice = $request->query('max_price');
        $sortBy = $request->query('sort_by', 'newest'); // Default sort by newest
        
        // Start query
        $query = Service::with(['user', 'user.profile', 'category'])
            ->where('is_active', true);
            
        // Apply search filters
        if ($search) {
            $query->where(function($q) use ($search) {
                $q->where('title', 'like', "%{$search}%")
                  ->orWhere('description', 'like', "%{$search}%");
            });
        }
        
        // Filter by category
        if ($categoryId) {
            $query->where('category_id', $categoryId);
        } elseif ($categoryName) {
            $query->whereHas('category', function($q) use ($categoryName) {
                $q->where('name', 'like', "%{$categoryName}%");
            });
        }
        
        // Filter by price range
        if ($minPrice) {
            $query->where('price', '>=', $minPrice);
        }
        
        if ($maxPrice) {
            $query->where('price', '<=', $maxPrice);
        }
        
        // Apply sorting
        if ($sortBy === 'price_low') {
            $query->orderBy('price', 'asc');
        } elseif ($sortBy === 'price_high') {
            $query->orderBy('price', 'desc');
        } elseif ($sortBy === 'rating') {
            $query->orderBy('avg_rating', 'desc');
        } else {
            $query->orderBy('created_at', 'desc'); // newest
        }
        
        // Paginate services
        $services = $query->paginate(12)->withQueryString();
        
        // Get all categories for filter
        $categories = Category::where('is_active', true)
            ->withCount('services')
            ->orderBy('name')
            ->get();
        
        return Inertia::render('Explore/Explore', [
            'services' => $services,
            'categories' => $categories,
            'filters' => [
                'search' => $search,
                'categoryId' => $categoryId,
                'categoryName' => $categoryName,
                'minPrice' => $minPrice,
                'maxPrice' => $maxPrice,
                'sortBy' => $sortBy
            ]
        ]);
    }
    
    /**
     * Display the service detail page.
     */
    public function showService($id)
    {
        // Get the service with all relevant data
        $service = Service::with([
            'user', 
            'user.profile', 
            'category',
            'reviews.client'
        ])
        ->findOrFail($id);
        
        // Increment view count
        $service->increment('view_count');
        
        // Calculate review stats
        $reviewStats = [
            'average' => $service->reviews()->avg('rating') ?? 0,
            'count' => $service->reviews()->count(),
            'distribution' => [
                5 => $service->reviews()->where('rating', 5)->count(),
                4 => $service->reviews()->where('rating', 4)->count(),
                3 => $service->reviews()->where('rating', 3)->count(),
                2 => $service->reviews()->where('rating', 2)->count(),
                1 => $service->reviews()->where('rating', 1)->count(),
            ]
        ];
        
        // Get similar services
        $similarServices = Service::with(['user', 'category'])
            ->where('id', '!=', $service->id)
            ->where('is_active', true)
            ->where(function($query) use ($service) {
                $query->where('category_id', $service->category_id)
                      ->orWhere('user_id', $service->user_id);
            })
            ->take(4)
            ->get();
        
        return Inertia::render('Jasa/ServiceDetail', [
            'service' => $service,
            'reviewStats' => $reviewStats,
            'similarServices' => $similarServices
        ]);
    }
    
    /**
     * Display the talents page.
     */
    public function talents(Request $request)
    {
        // Get search params
        $search = $request->query('search');
        $categoryId = $request->query('kategori_id');
        $skillId = $request->query('skill_id');
        $sortBy = $request->query('sort_by', 'rating'); // Default sort by rating
        
        // Start query for freelancers
        $query = User::with(['profile', 'skills', 'services', 'educations'])
            ->where('role', 'freelancer');
        
        // Apply search filters
        if ($search) {
            $query->where(function($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhereHas('profile', function($q2) use ($search) {
                      $q2->where('bio', 'like', "%{$search}%");
                  });
            });
        }
        
        // Filter by category through services
        if ($categoryId) {
            $query->whereHas('services', function($q) use ($categoryId) {
                $q->where('category_id', $categoryId);
            });
        }
        
        // Filter by skill
        if ($skillId) {
            $query->whereHas('skills', function($q) use ($skillId) {
                $q->where('skills.id', $skillId);
            });
        }
        
        // Add review stats
        $query->withCount(['receivedReviews as avg_rating' => function ($q) {
            $q->select(DB::raw('coalesce(avg(rating),0)'));
        }]);
        
        // Apply sorting
        if ($sortBy === 'newest') {
            $query->orderBy('created_at', 'desc');
        } elseif ($sortBy === 'oldest') {
            $query->orderBy('created_at', 'asc');
        } else {
            $query->orderBy('avg_rating', 'desc'); // rating
        }
        
        // Paginate freelancers
        $freelancers = $query->paginate(12)->withQueryString();
        
        // Get all categories and skills for filter
        $categories = Category::where('is_active', true)
            ->orderBy('name')
            ->get();
            
        $skills = \App\Models\Skill::orderBy('name')->get();
        
        return Inertia::render('Talenta/Talenta', [
            'freelancers' => $freelancers,
            'categories' => $categories,
            'skills' => $skills,
            'filters' => [
                'search' => $search,
                'categoryId' => $categoryId,
                'skillId' => $skillId,
                'sortBy' => $sortBy
            ]
        ]);
    }
    
    /**
     * Display the talent detail page.
     */
    public function showTalent($id)
    {
        // Get the freelancer with all relevant data
        $freelancer = User::with([
            'profile', 
            'skills.category', 
            'services.category', 
            'educations', 
            'experiences',
            'portfolios',
            'receivedReviews.client'
        ])
        ->where('role', 'freelancer')
        ->findOrFail($id);
        
        // Get freelancer reviews stats
        $reviewStats = [
            'average' => $freelancer->receivedReviews()->avg('rating') ?? 0,
            'count' => $freelancer->receivedReviews()->count(),
            'distribution' => [
                5 => $freelancer->receivedReviews()->where('rating', 5)->count(),
                4 => $freelancer->receivedReviews()->where('rating', 4)->count(),
                3 => $freelancer->receivedReviews()->where('rating', 3)->count(),
                2 => $freelancer->receivedReviews()->where('rating', 2)->count(),
                1 => $freelancer->receivedReviews()->where('rating', 1)->count(),
            ]
        ];
        
        return Inertia::render('Talenta/TalentDetail', [
            'freelancer' => $freelancer,
            'reviewStats' => $reviewStats
        ]);
    }
    
    /**
     * Display the projects page.
     */
    public function projects(Request $request)
    {
        // Get search params
        $search = $request->query('search');
        $categoryId = $request->query('kategori_id');
        $categoryName = $request->query('kategori');
        $minBudget = $request->query('min_budget');
        $maxBudget = $request->query('max_budget');
        $sortBy = $request->query('sort_by', 'newest'); // Default sort by newest
        
        // Start query for projects
        $query = Project::with(['user', 'user.profile', 'category'])
            ->where('status', 'open');
            
        // Apply search filters
        if ($search) {
            $query->where(function($q) use ($search) {
                $q->where('title', 'like', "%{$search}%")
                  ->orWhere('description', 'like', "%{$search}%");
            });
        }
        
        // Filter by category
        if ($categoryId) {
            $query->where('category_id', $categoryId);
        } elseif ($categoryName) {
            $query->whereHas('category', function($q) use ($categoryName) {
                $q->where('name', 'like', "%{$categoryName}%");
            });
        }
        
        // Filter by budget range
        if ($minBudget) {
            $query->where(function($q) use ($minBudget) {
                $q->where('budget', '>=', $minBudget)
                  ->orWhere('min_budget', '>=', $minBudget);
            });
        }
        
        if ($maxBudget) {
            $query->where(function($q) use ($maxBudget) {
                $q->where('budget', '<=', $maxBudget)
                  ->orWhere('max_budget', '<=', $maxBudget);
            });
        }
        
        // Apply sorting
        if ($sortBy === 'budget_high') {
            $query->orderBy('budget', 'desc');
        } elseif ($sortBy === 'budget_low') {
            $query->orderBy('budget', 'asc');
        } elseif ($sortBy === 'deadline') {
            $query->orderBy('deadline', 'asc');
        } else {
            $query->orderBy('created_at', 'desc'); // newest
        }
        
        // Paginate projects
        $projects = $query->paginate(10)->withQueryString();
        
        // Get all categories for filter
        $categories = Category::where('is_active', true)
            ->withCount('projects')
            ->orderBy('name')
            ->get();
        
        return Inertia::render('Proyek/Proyek', [
            'projects' => $projects,
            'categories' => $categories,
            'filters' => [
                'search' => $search,
                'categoryId' => $categoryId,
                'categoryName' => $categoryName,
                'minBudget' => $minBudget,
                'maxBudget' => $maxBudget,
                'sortBy' => $sortBy
            ]
        ]);
    }
    
    /**
     * Display the project detail page.
     */
    public function showProject($id)
    {
        // Get the project with all relevant data
        $project = Project::with([
            'user', 
            'user.profile', 
            'category',
            'proposals' => function($query) {
                // Only counting - actual proposals aren't exposed to public
                $query->count();
            }
        ])
        ->findOrFail($id);
        
        // Increment view count
        $project->increment('view_count');
        
        // Get related projects
        $relatedProjects = Project::with(['user', 'category'])
            ->where('id', '!=', $project->id)
            ->where('status', 'open')
            ->where(function($query) use ($project) {
                $query->where('category_id', $project->category_id)
                      ->orWhere('user_id', $project->user_id);
            })
            ->take(4)
            ->get();
        
        return Inertia::render('Proyek/ProjectDetail', [
            'project' => $project,
            'relatedProjects' => $relatedProjects
        ]);
    }
    
    /**
     * Display the about page.
     */
    public function about()
    {
        return Inertia::render('About/About');
    }
}
