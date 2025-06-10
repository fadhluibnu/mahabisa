<?php

namespace App\Services;

use App\Models\Service;
use App\Models\Activity;
use App\Models\Category;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;

class ServiceService
{
    /**
     * Create a new service
     *
     * @param array $data
     * @return Service
     */
    public function createService(array $data): Service
    {
        $service = new Service();
        $service->title = $data['title'];
        $service->description = $data['description'];
        $service->price = $data['price'];
        $service->delivery_time = $data['delivery_time'];
        $service->category_id = $data['category_id'];
        $service->user_id = Auth::id();
        $service->status = 'active';
        $service->slug = Str::slug($data['title']) . '-' . Str::random(8);
        
        // Handle image uploading if needed
        if (isset($data['image'])) {
            $service->image_url = $this->uploadServiceImage($data['image']);
        }
        
        $service->save();
        
        // Attach skills if provided
        if (isset($data['skills']) && is_array($data['skills'])) {
            $service->skills()->attach($data['skills']);
        }
        
        // Log activity
        Activity::create([
            'user_id' => Auth::id(),
            'type' => 'service_created',
            'subject_id' => $service->id,
            'subject_type' => Service::class,
            'description' => 'Created a new service: ' . $service->title,
        ]);
        
        return $service;
    }
    
    /**
     * Update an existing service
     *
     * @param Service $service
     * @param array $data
     * @return Service
     */
    public function updateService(Service $service, array $data): Service
    {
        // Ensure the user owns the service
        if ($service->user_id !== Auth::id() && !Auth::user()->isAdmin()) {
            throw new \Exception('You do not have permission to update this service');
        }
        
        $service->title = $data['title'] ?? $service->title;
        $service->description = $data['description'] ?? $service->description;
        $service->price = $data['price'] ?? $service->price;
        $service->delivery_time = $data['delivery_time'] ?? $service->delivery_time;
        $service->category_id = $data['category_id'] ?? $service->category_id;
        $service->status = $data['status'] ?? $service->status;
        
        if (isset($data['title']) && $service->isDirty('title')) {
            $service->slug = Str::slug($data['title']) . '-' . Str::random(8);
        }
        
        // Handle image uploading if needed
        if (isset($data['image'])) {
            // Remove old image if exists
            $this->removeServiceImage($service->image_url);
            
            // Upload new image
            $service->image_url = $this->uploadServiceImage($data['image']);
        }
        
        $service->save();
        
        // Update skills if provided
        if (isset($data['skills']) && is_array($data['skills'])) {
            $service->skills()->sync($data['skills']);
        }
        
        // Log activity
        Activity::create([
            'user_id' => Auth::id(),
            'type' => 'service_updated',
            'subject_id' => $service->id,
            'subject_type' => Service::class,
            'description' => 'Updated service: ' . $service->title,
        ]);
        
        return $service;
    }
    
    /**
     * Delete a service
     *
     * @param Service $service
     * @return bool
     */
    public function deleteService(Service $service): bool
    {
        // Ensure the user owns the service
        if ($service->user_id !== Auth::id() && !Auth::user()->isAdmin()) {
            throw new \Exception('You do not have permission to delete this service');
        }
        
        // Check if service has active orders
        if ($service->orders()->whereIn('status', ['in_progress', 'pending'])->count() > 0) {
            throw new \Exception('Cannot delete a service with active orders');
        }
        
        $serviceTitle = $service->title;
        
        // Remove image if exists
        if ($service->image_url) {
            $this->removeServiceImage($service->image_url);
        }
        
        // Detach skills
        $service->skills()->detach();
        
        // Delete service
        $service->delete();
        
        // Log activity
        Activity::create([
            'user_id' => Auth::id(),
            'type' => 'service_deleted',
            'description' => 'Deleted service: ' . $serviceTitle,
        ]);
        
        return true;
    }
    
    /**
     * Get a list of featured services
     *
     * @param int $limit
     * @return \Illuminate\Database\Eloquent\Collection
     */
    public function getFeaturedServices(int $limit = 8)
    {
        return Service::with(['category', 'skills', 'user.profile'])
            ->where('status', 'active')
            ->orderByDesc('created_at')
            ->limit($limit)
            ->get();
    }
    
    /**
     * Search services based on criteria
     *
     * @param array $filters
     * @return \Illuminate\Pagination\LengthAwarePaginator
     */
    public function searchServices(array $filters)
    {
        $query = Service::query()->with(['category', 'skills', 'user.profile']);
        
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
            // Default to only showing active services
            $query->where('status', 'active');
        }
        
        if (isset($filters['price_min'])) {
            $query->where('price', '>=', $filters['price_min']);
        }
        
        if (isset($filters['price_max'])) {
            $query->where('price', '<=', $filters['price_max']);
        }
        
        if (isset($filters['skills']) && is_array($filters['skills'])) {
            $query->whereHas('skills', function ($q) use ($filters) {
                $q->whereIn('skills.id', $filters['skills']);
            });
        }
        
        if (isset($filters['user_id'])) {
            $query->where('user_id', $filters['user_id']);
        }
        
        // Sort order
        if (isset($filters['sort'])) {
            switch($filters['sort']) {
                case 'price_low':
                    $query->orderBy('price', 'asc');
                    break;
                case 'price_high':
                    $query->orderBy('price', 'desc');
                    break;
                case 'oldest':
                    $query->orderBy('created_at', 'asc');
                    break;
                case 'most_popular':
                    $query->withCount('orders')
                          ->orderBy('orders_count', 'desc');
                    break;
                default:
                    $query->orderBy('created_at', 'desc'); // Default newest first
            }
        } else {
            $query->orderBy('created_at', 'desc'); // Default newest first
        }
        
        // Paginate results
        $perPage = $filters['per_page'] ?? 12;
        
        return $query->paginate($perPage);
    }
    
    /**
     * Upload service image
     *
     * @param \Illuminate\Http\UploadedFile $image
     * @return string
     */
    private function uploadServiceImage($image): string
    {
        // Store image in the storage/app/public/services directory with a unique name
        $path = $image->store('public/services');
        
        // Return the path that can be used in a URL
        return str_replace('public/', 'storage/', $path);
    }
    
    /**
     * Remove service image
     *
     * @param string|null $imagePath
     * @return void
     */
    private function removeServiceImage(?string $imagePath): void
    {
        if ($imagePath && file_exists(public_path($imagePath))) {
            unlink(public_path($imagePath));
        }
    }
}
