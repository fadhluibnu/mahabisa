<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class FreelancerController extends Controller
{
    /**
     * Get freelancer profile details
     *
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function show($id)
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
        
        // Format the response
        $result = [
            'id' => $freelancer->id,
            'name' => $freelancer->name,
            'email' => $freelancer->email,
            'profile_photo' => $freelancer->profile_photo_url,
            'created_at' => $freelancer->created_at,
            'profile' => [
                'bio' => $freelancer->profile->bio ?? null,
                'university' => $freelancer->profile->university ?? null,
                'location' => $freelancer->profile->location ?? null,
                'phone' => $freelancer->profile->phone ?? null,
                'website' => $freelancer->profile->website ?? null,
                'social_links' => $freelancer->profile->social_links ?? null,
            ],
            'skills' => $freelancer->skills->map(function($skill) {
                return [
                    'id' => $skill->id,
                    'name' => $skill->name,
                    'category' => [
                        'id' => $skill->category->id,
                        'name' => $skill->category->name,
                    ],
                    'proficiency_level' => $skill->pivot->proficiency_level,
                ];
            }),
            'services' => $freelancer->services->map(function($service) {
                return [
                    'id' => $service->id,
                    'title' => $service->title,
                    'description' => $service->description,
                    'price' => $service->price,
                    'formatted_price' => $service->formatted_price,
                    'thumbnail' => $service->thumbnail,
                    'category' => [
                        'id' => $service->category->id,
                        'name' => $service->category->name,
                    ],
                ];
            }),
            'educations' => $freelancer->educations->map(function($education) {
                return [
                    'id' => $education->id,
                    'institution' => $education->institution,
                    'degree' => $education->degree,
                    'field_of_study' => $education->field_of_study,
                    'start_date' => $education->start_date,
                    'end_date' => $education->end_date,
                    'description' => $education->description,
                ];
            }),
            'experiences' => $freelancer->experiences->map(function($experience) {
                return [
                    'id' => $experience->id,
                    'company' => $experience->company,
                    'position' => $experience->position,
                    'start_date' => $experience->start_date,
                    'end_date' => $experience->end_date,
                    'is_current' => $experience->is_current,
                    'description' => $experience->description,
                ];
            }),
            'portfolios' => $freelancer->portfolios->map(function($portfolio) {
                return [
                    'id' => $portfolio->id,
                    'title' => $portfolio->title,
                    'description' => $portfolio->description,
                    'image' => $portfolio->image,
                    'link' => $portfolio->link,
                ];
            }),
            'reviews' => $freelancer->receivedReviews->map(function($review) {
                return [
                    'id' => $review->id,
                    'rating' => $review->rating,
                    'comment' => $review->comment,
                    'created_at' => $review->created_at,
                    'client' => [
                        'id' => $review->client->id,
                        'name' => $review->client->name,
                        'profile_photo' => $review->client->profile_photo_url,
                    ],
                ];
            }),
            'review_stats' => $reviewStats,
        ];
        
        return response()->json([
            'freelancer' => $result
        ]);
    }
}
