<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Project;
use Illuminate\Http\Request;

class ProjectController extends Controller
{
    /**
     * Get project details
     *
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function show($id)
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
        
        // Format the response
        $result = [
            'id' => $project->id,
            'title' => $project->title,
            'description' => $project->description,
            'budget' => $project->budget,
            'min_budget' => $project->min_budget,
            'max_budget' => $project->max_budget,
            'deadline' => $project->deadline,
            'status' => $project->status,
            'requirements' => $project->requirements,
            'attachments' => $project->attachments,
            'view_count' => $project->view_count,
            'proposals_count' => $project->proposals->count(),
            'created_at' => $project->created_at,
            'updated_at' => $project->updated_at,
            'category' => [
                'id' => $project->category->id,
                'name' => $project->category->name,
            ],
            'client' => [
                'id' => $project->user->id,
                'name' => $project->user->name,
                'profile_photo' => $project->user->profile_photo_url,
                'university' => $project->user->profile->university ?? null,
            ],
        ];
        
        // Get related projects
        $relatedProjects = Project::with(['user', 'category'])
            ->where('id', '!=', $project->id)
            ->where('status', 'open')
            ->where(function($query) use ($project) {
                $query->where('category_id', $project->category_id)
                      ->orWhere('user_id', $project->user_id);
            })
            ->take(4)
            ->get()
            ->map(function($project) {
                return [
                    'id' => $project->id,
                    'title' => $project->title,
                    'budget' => $project->budget,
                    'min_budget' => $project->min_budget,
                    'max_budget' => $project->max_budget,
                    'deadline' => $project->deadline,
                    'status' => $project->status,
                    'view_count' => $project->view_count,
                    'created_at' => $project->created_at,
                    'category' => [
                        'id' => $project->category->id,
                        'name' => $project->category->name,
                    ],
                    'client' => [
                        'id' => $project->user->id,
                        'name' => $project->user->name,
                        'profile_photo' => $project->user->profile_photo_url,
                    ],
                ];
            });
        
        return response()->json([
            'project' => $result,
            'related_projects' => $relatedProjects
        ]);
    }
}
