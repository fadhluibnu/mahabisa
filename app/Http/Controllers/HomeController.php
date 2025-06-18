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
        $search = $request->input('search');
        $categoryId = $request->input('category_id');
        $categorySlug = $request->input('category');
        $minPrice = $request->input('min_price');
        $maxPrice = $request->input('max_price');
        $rating = $request->input('rating');
        $sortBy = $request->input('sort_by', 'newest'); // Default sort by newest
        
        // Start query
        $query = Service::with([
                'user', 
                'user.profile', 
                'category',
                'reviews',
                'galleries' => function($q) {
                    $q->orderBy('order');
                }
            ])
            ->where('is_active', true)
            ->withCount('reviews')
            ->withAvg('reviews', 'rating');
            
        // Apply search filters - improved search functionality
        if ($search) {
            $searchTerms = explode(' ', $search);
            $query->where(function($q) use ($searchTerms) {
                foreach ($searchTerms as $term) {
                    if (strlen($term) >= 2) { // Only search for terms with at least 2 characters
                        $q->where(function($subq) use ($term) {
                            $subq->where('title', 'like', "%{$term}%")
                                ->orWhere('description', 'like', "%{$term}%");
                        });
                    }
                }
            });
        }
        
        // Filter by category - improved with better handling
        if ($categoryId) {
            $query->where('category_id', $categoryId);
        } elseif ($categorySlug) {
            $query->whereHas('category', function($q) use ($categorySlug) {
                $q->where('name', 'like', "%{$categorySlug}%")
                  ->orWhere('id', $categorySlug);
            });
        }
        
        // Filter by price range
        if ($minPrice) {
            $query->where('price', '>=', $minPrice);
        }
        
        if ($maxPrice) {
            $query->where('price', '<=', $maxPrice);
        }
        
        // Filter by rating
        if ($rating) {
            $query->having('reviews_avg_rating', '>=', $rating);
        }
        
        // Apply sorting with improved performance
        switch ($sortBy) {
            case 'price_low':
                $query->orderBy('price', 'asc');
                break;
            case 'price_high':
                $query->orderBy('price', 'desc');
                break;
            case 'rating':
                $query->orderByRaw('COALESCE(reviews_avg_rating, 0) DESC');
                break;
            case 'popular':
                $query->orderByRaw('COALESCE(view_count, 0) DESC');
                break;
            case 'newest':
            default:
                $query->orderBy('created_at', 'desc');
                break;
        }
        
        // Paginate services
        $services = $query->paginate(12)->withQueryString();
        
        // Transform services data to include badge for popular/trending services
        $services->getCollection()->transform(function ($service) {
            $badge = null;
            
            // Add badge for popular services (high view count)
            if ($service->view_count > 100) {
                $badge = 'popular';
            }
            
            // Add badge for trending services (recently created with good rating)
            if ($service->created_at->isAfter(now()->subDays(30)) && ($service->reviews_avg_rating >= 4.5)) {
                $badge = 'trending';
            }
            
            // Add new badge for recently created services
            if ($service->created_at->isAfter(now()->subDays(7))) {
                $badge = 'new';
            }
            
            // Convert thumbnail path to full URL if necessary
            if ($service->thumbnail) {
                $service->thumbnail = str_replace('storage/', '/storage/', $service->thumbnail);
            }
            
            // Apply the same conversion to gallery images
            if ($service->galleries) {
                foreach ($service->galleries as $gallery) {
                    if ($gallery->image_path) {
                        $gallery->image_path = str_replace('storage/', '/storage/', $gallery->image_path);
                    }
                }
            }
            
            $service->badge = $badge;
            return $service;
        });
        
        // Get all categories for filter
        $categories = Category::where('is_active', true)
            ->withCount('services')
            ->orderBy('name')
            ->get();
            
        // Get price ranges for filter
        $priceRanges = [
            ['id' => 'low', 'name' => '< Rp100rb', 'min' => 0, 'max' => 100000],
            ['id' => 'medium', 'name' => 'Rp100rb - Rp300rb', 'min' => 100000, 'max' => 300000],
            ['id' => 'high', 'name' => 'Rp300rb - Rp500rb', 'min' => 300000, 'max' => 500000],
            ['id' => 'premium', 'name' => 'Rp500rb+', 'min' => 500000, 'max' => null]
        ];
        
        // Get rating options for filter
        $ratingOptions = [
            ['value' => 4.5, 'label' => '4.5+'],
            ['value' => 4.0, 'label' => '4.0+'],
            ['value' => 3.5, 'label' => '3.5+']
        ];
        
        return Inertia::render('Explore/Explore', [
            'services' => $services,
            'categories' => $categories,
            'priceRanges' => $priceRanges,
            'ratingOptions' => $ratingOptions,
            'filters' => [
                'search' => $search,
                'categoryId' => $categoryId,
                'category' => $categorySlug,
                'minPrice' => $minPrice,
                'maxPrice' => $maxPrice,
                'rating' => $rating,
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
            'user.skills',
            'category',
            'reviews.client',
            'packages',
            'requirement_s',
            'faqs',
            'skills',
            'galleries'
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
        
        // Modify service data to provide requirements field from requirement_s for frontend compatibility
        $serviceData = $service->toArray();
        if (isset($serviceData['requirement_s'])) {
            $serviceData['requirements'] = $serviceData['requirement_s'];
        }
        
        return Inertia::render('Jasa/ServiceDetail', [
            'service' => $serviceData,
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
        $search = $request->input('search');
        $categoryId = $request->input('categoryId');
        $skillId = $request->input('skillId');
        $rating = $request->input('rating');
        $verified = $request->input('verified');
        $sortBy = $request->input('sortBy', 'rating'); // Default sort by rating
        
        // Start query for freelancers
        $query = User::with([
                'profile', 
                'skills', 
                'services', 
                'educations',
                'receivedReviews',
                'completedOrders'
            ])
            ->where('role', 'freelancer')
            ->withCount('services')
            ->withCount('completedOrders');
        
        // Apply search filters with improved search functionality
        if ($search) {
            $searchTerms = explode(' ', $search);
            $query->where(function($q) use ($searchTerms) {
                foreach ($searchTerms as $term) {
                    if (strlen($term) >= 2) { // Only search for terms with at least 2 characters
                        $q->where(function($subq) use ($term) {
                            $subq->where('name', 'like', "%{$term}%")
                              ->orWhereHas('profile', function($q2) use ($term) {
                                  $q2->where('bio', 'like', "%{$term}%");
                              })
                              ->orWhereHas('skills', function($q3) use ($term) {
                                  $q3->where('skills.name', 'like', "%{$term}%");
                              });
                        });
                    }
                }
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
        
        // Filter by verification status
        if ($verified === 'verified') {
            $query->whereHas('profile', function($q) {
                $q->where('is_verified', true);
            });
        } elseif ($verified === 'unverified') {
            $query->whereHas('profile', function($q) {
                $q->where('is_verified', false);
            });
        }
        
        // Add review stats
        $query->withCount(['receivedReviews as avg_rating' => function ($q) {
            $q->select(DB::raw('coalesce(avg(rating),0)'));
        }]);
        
        // Filter by rating
        if ($rating) {
            $query->having('avg_rating', '>=', $rating);
        }
        
        // Apply sorting with improved performance
        switch ($sortBy) {
            case 'newest':
                $query->orderBy('created_at', 'desc');
                break;
            case 'oldest':
                $query->orderBy('created_at', 'asc');
                break;
            case 'orders_count':
                $query->orderBy('completed_orders_count', 'desc');
                break;
            case 'rating':
            default:
                $query->orderByRaw('COALESCE(avg_rating, 0) DESC');
                break;
        }
        
        // Paginate freelancers
        $freelancers = $query->paginate(12)->withQueryString();
        
        // Get all categories and skills for filter
        $categories = Category::where('is_active', true)
            ->orderBy('name')
            ->get();
            
        // Get skills with freelancer counts
        $skills = \App\Models\Skill::withCount('freelancers')
            ->having('freelancers_count', '>', 0)
            ->orderBy('name')
            ->get();
        
        return Inertia::render('Talenta/Talenta', [
            'freelancers' => $freelancers,
            'categories' => $categories,
            'skills' => $skills,
            'filters' => [
                'search' => $search,
                'categoryId' => $categoryId,
                'skillId' => $skillId,
                'rating' => $rating,
                'verified' => $verified,
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
            'reviewStats' => $reviewStats,
            'canMessage' => auth()->check() && auth()->user()->role === 'client'
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
