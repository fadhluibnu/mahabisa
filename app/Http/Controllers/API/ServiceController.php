<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Service;
use Illuminate\Http\Request;

class ServiceController extends Controller
{
    /**
     * Get service details
     *
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function show($id)
    {
        $service = Service::with(['user', 'user.profile', 'category', 'reviews.client'])
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
        
        // Format the response
        $result = [
            'id' => $service->id,
            'title' => $service->title,
            'description' => $service->description,
            'price' => $service->price,
            'price_type' => $service->price_type,
            'formatted_price' => $service->formatted_price,
            'delivery_time' => $service->delivery_time,
            'requirements' => $service->requirements,
            'thumbnail' => $service->thumbnail,
            'gallery' => $service->gallery,
            'view_count' => $service->view_count,
            'created_at' => $service->created_at,
            'updated_at' => $service->updated_at,
            'category' => [
                'id' => $service->category->id,
                'name' => $service->category->name,
            ],
            'freelancer' => [
                'id' => $service->user->id,
                'name' => $service->user->name,
                'profile_photo' => $service->user->profile_photo_url,
                'university' => $service->user->profile->university ?? null,
                'bio' => $service->user->profile->bio ?? null,
            ],
            'reviews' => $service->reviews->map(function($review) {
                return [
                    'id' => $review->id,
                    'rating' => $review->rating,
                    'comment' => $review->comment,
                    'created_at' => $review->created_at,
                    'client' => [
                        'id' => $review->client->id,
                        'name' => $review->client->name,
                        'profile_photo' => $review->client->profile_photo_url,
                    ]
                ];
            }),
            'review_stats' => $reviewStats
        ];
        
        return response()->json([
            'service' => $result
        ]);
    }
}
