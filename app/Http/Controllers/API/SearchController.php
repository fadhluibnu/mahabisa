<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Service;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class SearchController extends Controller
{
    /**
     * Search for services
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function services(Request $request)
    {
        $query = $request->get('query', '');
        $categoryId = $request->get('category_id');
        $minPrice = $request->get('min_price');
        $maxPrice = $request->get('max_price');
        $limit = $request->get('limit', 10);
            
        $servicesQuery = Service::with(['user', 'user.profile', 'category'])
            ->where('is_active', true);
            
        // Apply search filters
        if ($query) {
            $servicesQuery->where(function($q) use ($query) {
                $q->where('title', 'like', "%{$query}%")
                  ->orWhere('description', 'like', "%{$query}%");
            });
        }
        
        // Filter by category
        if ($categoryId) {
            $servicesQuery->where('category_id', $categoryId);
        }
        
        // Filter by price range
        if ($minPrice) {
            $servicesQuery->where('price', '>=', $minPrice);
        }
        
        if ($maxPrice) {
            $servicesQuery->where('price', '<=', $maxPrice);
        }
        
        $services = $servicesQuery->orderBy('view_count', 'desc')
            ->take($limit)
            ->get()
            ->map(function ($service) {
                return [
                    'id' => $service->id,
                    'title' => $service->title,
                    'price' => $service->price,
                    'formatted_price' => $service->formatted_price,
                    'rating' => $service->avg_rating,
                    'thumbnail' => $service->thumbnail,
                    'freelancer' => [
                        'id' => $service->user->id,
                        'name' => $service->user->name,
                        'profile_photo' => $service->user->profile_photo_url,
                    ],
                    'category' => [
                        'id' => $service->category->id,
                        'name' => $service->category->name,
                    ]
                ];
            });
            
        return response()->json([
            'services' => $services
        ]);
    }
    
    /**
     * Search for freelancers
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function freelancers(Request $request)
    {
        $query = $request->get('query', '');
        $skillId = $request->get('skill_id');
        $limit = $request->get('limit', 10);
            
        $freelancersQuery = User::with(['profile', 'skills', 'services'])
            ->where('role', 'freelancer');
            
        // Apply search filters
        if ($query) {
            $freelancersQuery->where(function($q) use ($query) {
                $q->where('name', 'like', "%{$query}%")
                  ->orWhereHas('profile', function($q2) use ($query) {
                      $q2->where('bio', 'like', "%{$query}%");
                  });
            });
        }
        
        // Filter by skill
        if ($skillId) {
            $freelancersQuery->whereHas('skills', function($q) use ($skillId) {
                $q->where('skills.id', $skillId);
            });
        }
        
        // Add review stats
        $freelancersQuery->withCount(['receivedReviews as avg_rating' => function ($q) {
            $q->select(DB::raw('coalesce(avg(rating),0)'));
        }]);
        
        $freelancers = $freelancersQuery->orderBy('avg_rating', 'desc')
            ->take($limit)
            ->get()
            ->map(function ($freelancer) {
                return [
                    'id' => $freelancer->id,
                    'name' => $freelancer->name,
                    'profile_photo' => $freelancer->profile_photo_url,
                    'rating' => $freelancer->avg_rating,
                    'university' => $freelancer->profile->university ?? '',
                    'bio' => $freelancer->profile->bio ?? '',
                    'services_count' => $freelancer->services->count(),
                    'skills' => $freelancer->skills->map(function($skill) {
                        return [
                            'id' => $skill->id,
                            'name' => $skill->name,
                        ];
                    }),
                ];
            });
            
        return response()->json([
            'freelancers' => $freelancers
        ]);
    }
    
    /**
     * Get available categories
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function categories()
    {
        $categories = Category::where('is_active', true)
            ->withCount('services')
            ->orderBy('name')
            ->get()
            ->map(function ($category) {
                return [
                    'id' => $category->id,
                    'name' => $category->name,
                    'services_count' => $category->services_count,
                    'icon' => $category->icon ?? null,
                    'image_url' => $category->image_url ?? null,
                ];
            });
            
        return response()->json([
            'categories' => $categories
        ]);
    }
}
