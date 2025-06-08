<?php

namespace App\Services;

use App\Models\Project;
use App\Models\Category;
use App\Models\Skill;
use App\Models\Activity;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;

class ProjectService
{
    /**
     * Create a new project
     *
     * @param array $data
     * @return Project
     */
    public function createProject(array $data): Project
    {
        $project = new Project();
        $project->title = $data['title'];
        $project->description = $data['description'];
        $project->budget_min = $data['budget_min'];
        $project->budget_max = $data['budget_max'];
        $project->duration = $data['duration'];
        $project->category_id = $data['category_id'];
        $project->status = 'open';
        $project->user_id = Auth::id();
        $project->slug = Str::slug($data['title']) . '-' . Str::random(8);
        $project->save();
        
        // Attach skills
        if (isset($data['skills']) && is_array($data['skills'])) {
            $project->skills()->attach($data['skills']);
        }
        
        // Log activity
        Activity::create([
            'user_id' => Auth::id(),
            'type' => 'project_created',
            'subject_id' => $project->id,
            'subject_type' => Project::class,
            'description' => 'Created a new project: ' . $project->title,
        ]);
        
        return $project;
    }
    
    /**
     * Update an existing project
     *
     * @param Project $project
     * @param array $data
     * @return Project
     */
    public function updateProject(Project $project, array $data): Project
    {
        // Ensure the user owns the project
        if ($project->user_id !== Auth::id() && !Auth::user()->isAdmin()) {
            throw new \Exception('You do not have permission to update this project');
        }
        
        $project->title = $data['title'] ?? $project->title;
        $project->description = $data['description'] ?? $project->description;
        $project->budget_min = $data['budget_min'] ?? $project->budget_min;
        $project->budget_max = $data['budget_max'] ?? $project->budget_max;
        $project->duration = $data['duration'] ?? $project->duration;
        $project->category_id = $data['category_id'] ?? $project->category_id;
        $project->status = $data['status'] ?? $project->status;
        
        if (isset($data['title']) && $project->isDirty('title')) {
            $project->slug = Str::slug($data['title']) . '-' . Str::random(8);
        }
        
        $project->save();
        
        // Update skills if provided
        if (isset($data['skills']) && is_array($data['skills'])) {
            $project->skills()->sync($data['skills']);
        }
        
        // Log activity
        Activity::create([
            'user_id' => Auth::id(),
            'type' => 'project_updated',
            'subject_id' => $project->id,
            'subject_type' => Project::class,
            'description' => 'Updated project: ' . $project->title,
        ]);
        
        return $project;
    }
    
    /**
     * Delete a project
     *
     * @param Project $project
     * @return bool
     */
    public function deleteProject(Project $project): bool
    {
        // Ensure the user owns the project
        if ($project->user_id !== Auth::id() && !Auth::user()->isAdmin()) {
            throw new \Exception('You do not have permission to delete this project');
        }
        
        // Check if project has active proposals or orders
        if ($project->proposals()->whereIn('status', ['accepted', 'in_progress'])->count() > 0 || 
            $project->orders()->whereIn('status', ['in_progress', 'pending'])->count() > 0) {
            throw new \Exception('Cannot delete a project with active proposals or orders');
        }
        
        $projectTitle = $project->title;
        
        // Detach skills
        $project->skills()->detach();
        
        // Delete project
        $project->delete();
        
        // Log activity
        Activity::create([
            'user_id' => Auth::id(),
            'type' => 'project_deleted',
            'description' => 'Deleted project: ' . $projectTitle,
        ]);
        
        return true;
    }
    
    /**
     * Get a list of featured projects
     *
     * @param int $limit
     * @return \Illuminate\Database\Eloquent\Collection
     */
    public function getFeaturedProjects(int $limit = 8)
    {
        return Project::with(['category', 'skills', 'user.profile'])
            ->where('status', 'open')
            ->orderBy('created_at', 'desc')
            ->limit($limit)
            ->get();
    }
    
    /**
     * Search projects based on criteria
     *
     * @param array $filters
     * @return \Illuminate\Pagination\LengthAwarePaginator
     */
    public function searchProjects(array $filters)
    {
        $query = Project::query()->with(['category', 'skills', 'user.profile']);
        
        // Apply filters
        if (isset($filters['keyword'])) {
            $query->where(function($q) use ($filters) {
                $q->where('title', 'like', '%' . $filters['keyword'] . '%')
                  ->orWhere('description', 'like', '%' . $filters['keyword'] . '%');
            });
        }
        
        if (isset($filters['category_id'])) {
            $query->where('category_id', $filters['category_id']);
        }
        
        if (isset($filters['status'])) {
            $query->where('status', $filters['status']);
        } else {
            // Default to only showing open projects
            $query->where('status', 'open');
        }
        
        if (isset($filters['budget_min'])) {
            $query->where('budget_max', '>=', $filters['budget_min']);
        }
        
        if (isset($filters['budget_max'])) {
            $query->where('budget_min', '<=', $filters['budget_max']);
        }
        
        if (isset($filters['skills']) && is_array($filters['skills'])) {
            $query->whereHas('skills', function ($q) use ($filters) {
                $q->whereIn('skills.id', $filters['skills']);
            }, '=', count($filters['skills'])); // Must have all specified skills
        }
        
        // Sort order
        if (isset($filters['sort']) && $filters['sort'] === 'oldest') {
            $query->orderBy('created_at', 'asc');
        } else {
            $query->orderBy('created_at', 'desc'); // Default newest first
        }
        
        // Paginate results
        $perPage = $filters['per_page'] ?? 12;
        
        return $query->paginate($perPage);
    }
}
