<?php

namespace App\Services;

use App\Models\User;
use App\Models\UserProfile;
use App\Models\Education;
use App\Models\Experience;
use App\Models\Portfolio;
use App\Models\Skill;
use App\Models\Activity;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;

class UserProfileService
{
    /**
     * Create or update a user profile
     *
     * @param User $user
     * @param array $profileData
     * @return UserProfile
     */
    public function updateProfile(User $user, array $profileData): UserProfile
    {
        // Get or create the user profile
        $profile = $user->profile ?? new UserProfile(['user_id' => $user->id]);
        
        // Update fields
        $profile->bio = $profileData['bio'] ?? $profile->bio;
        $profile->phone = $profileData['phone'] ?? $profile->phone;
        $profile->address = $profileData['address'] ?? $profile->address;
        $profile->city = $profileData['city'] ?? $profile->city;
        $profile->state = $profileData['state'] ?? $profile->state;
        $profile->country = $profileData['country'] ?? $profile->country;
        $profile->postal_code = $profileData['postal_code'] ?? $profile->postal_code;
        $profile->hourly_rate = $profileData['hourly_rate'] ?? $profile->hourly_rate;
        $profile->website = $profileData['website'] ?? $profile->website;
        $profile->linkedin = $profileData['linkedin'] ?? $profile->linkedin;
        $profile->github = $profileData['github'] ?? $profile->github;
        $profile->twitter = $profileData['twitter'] ?? $profile->twitter;
        
        // Save profile
        $profile->save();
        
        // Update name and email in User model if provided
        if (isset($profileData['name']) || isset($profileData['email'])) {
            $userData = [];
            
            if (isset($profileData['name'])) {
                $userData['name'] = $profileData['name'];
            }
            
            if (isset($profileData['email']) && $profileData['email'] !== $user->email) {
                $userData['email'] = $profileData['email'];
            }
            
            if (!empty($userData)) {
                $user->update($userData);
            }
        }
        
        // Update profile photo if provided
        if (isset($profileData['profile_photo'])) {
            $this->updateProfilePhoto($user, $profileData['profile_photo']);
        }
        
        // Log activity
        Activity::create([
            'user_id' => $user->id,
            'type' => 'profile_updated',
            'description' => 'Updated profile information',
        ]);
        
        return $profile;
    }
    
    /**
     * Add education history to user profile
     *
     * @param User $user
     * @param array $educationData
     * @return Education
     */
    public function addEducation(User $user, array $educationData): Education
    {
        $education = new Education();
        $education->user_id = $user->id;
        $education->institution = $educationData['institution'];
        $education->degree = $educationData['degree'];
        $education->field_of_study = $educationData['field_of_study'];
        $education->start_date = $educationData['start_date'];
        $education->end_date = $educationData['end_date'] ?? null;
        $education->is_current = $educationData['is_current'] ?? false;
        $education->description = $educationData['description'] ?? null;
        $education->save();
        
        // Log activity
        Activity::create([
            'user_id' => $user->id,
            'type' => 'education_added',
            'subject_id' => $education->id,
            'subject_type' => Education::class,
            'description' => 'Added education: ' . $education->degree . ' at ' . $education->institution,
        ]);
        
        return $education;
    }
    
    /**
     * Update education history
     *
     * @param Education $education
     * @param array $educationData
     * @return Education
     */
    public function updateEducation(Education $education, array $educationData): Education
    {
        // Ensure user owns this education record
        if ($education->user_id !== Auth::id()) {
            throw new \Exception('You do not have permission to update this education record');
        }
        
        $education->institution = $educationData['institution'] ?? $education->institution;
        $education->degree = $educationData['degree'] ?? $education->degree;
        $education->field_of_study = $educationData['field_of_study'] ?? $education->field_of_study;
        $education->start_date = $educationData['start_date'] ?? $education->start_date;
        $education->end_date = $educationData['end_date'] ?? $education->end_date;
        $education->is_current = $educationData['is_current'] ?? $education->is_current;
        $education->description = $educationData['description'] ?? $education->description;
        $education->save();
        
        // Log activity
        Activity::create([
            'user_id' => Auth::id(),
            'type' => 'education_updated',
            'subject_id' => $education->id,
            'subject_type' => Education::class,
            'description' => 'Updated education: ' . $education->degree . ' at ' . $education->institution,
        ]);
        
        return $education;
    }
    
    /**
     * Delete education history
     *
     * @param Education $education
     * @return bool
     */
    public function deleteEducation(Education $education): bool
    {
        // Ensure user owns this education record
        if ($education->user_id !== Auth::id()) {
            throw new \Exception('You do not have permission to delete this education record');
        }
        
        $description = 'Deleted education: ' . $education->degree . ' at ' . $education->institution;
        
        $education->delete();
        
        // Log activity
        Activity::create([
            'user_id' => Auth::id(),
            'type' => 'education_deleted',
            'description' => $description,
        ]);
        
        return true;
    }
    
    /**
     * Add work experience to user profile
     *
     * @param User $user
     * @param array $experienceData
     * @return Experience
     */
    public function addExperience(User $user, array $experienceData): Experience
    {
        $experience = new Experience();
        $experience->user_id = $user->id;
        $experience->company = $experienceData['company'];
        $experience->title = $experienceData['title'];
        $experience->location = $experienceData['location'] ?? null;
        $experience->start_date = $experienceData['start_date'];
        $experience->end_date = $experienceData['end_date'] ?? null;
        $experience->is_current = $experienceData['is_current'] ?? false;
        $experience->description = $experienceData['description'] ?? null;
        $experience->save();
        
        // Log activity
        Activity::create([
            'user_id' => $user->id,
            'type' => 'experience_added',
            'subject_id' => $experience->id,
            'subject_type' => Experience::class,
            'description' => 'Added experience: ' . $experience->title . ' at ' . $experience->company,
        ]);
        
        return $experience;
    }
    
    /**
     * Update work experience
     *
     * @param Experience $experience
     * @param array $experienceData
     * @return Experience
     */
    public function updateExperience(Experience $experience, array $experienceData): Experience
    {
        // Ensure user owns this experience record
        if ($experience->user_id !== Auth::id()) {
            throw new \Exception('You do not have permission to update this experience record');
        }
        
        $experience->company = $experienceData['company'] ?? $experience->company;
        $experience->title = $experienceData['title'] ?? $experience->title;
        $experience->location = $experienceData['location'] ?? $experience->location;
        $experience->start_date = $experienceData['start_date'] ?? $experience->start_date;
        $experience->end_date = $experienceData['end_date'] ?? $experience->end_date;
        $experience->is_current = $experienceData['is_current'] ?? $experience->is_current;
        $experience->description = $experienceData['description'] ?? $experience->description;
        $experience->save();
        
        // Log activity
        Activity::create([
            'user_id' => Auth::id(),
            'type' => 'experience_updated',
            'subject_id' => $experience->id,
            'subject_type' => Experience::class,
            'description' => 'Updated experience: ' . $experience->title . ' at ' . $experience->company,
        ]);
        
        return $experience;
    }
    
    /**
     * Delete work experience
     *
     * @param Experience $experience
     * @return bool
     */
    public function deleteExperience(Experience $experience): bool
    {
        // Ensure user owns this experience record
        if ($experience->user_id !== Auth::id()) {
            throw new \Exception('You do not have permission to delete this experience record');
        }
        
        $description = 'Deleted experience: ' . $experience->title . ' at ' . $experience->company;
        
        $experience->delete();
        
        // Log activity
        Activity::create([
            'user_id' => Auth::id(),
            'type' => 'experience_deleted',
            'description' => $description,
        ]);
        
        return true;
    }
    
    /**
     * Add portfolio item
     *
     * @param User $user
     * @param array $portfolioData
     * @return Portfolio
     */
    public function addPortfolio(User $user, array $portfolioData): Portfolio
    {
        $portfolio = new Portfolio();
        $portfolio->user_id = $user->id;
        $portfolio->title = $portfolioData['title'];
        $portfolio->description = $portfolioData['description'] ?? null;
        $portfolio->project_url = $portfolioData['project_url'] ?? null;
        
        // Handle image uploading if provided
        if (isset($portfolioData['image'])) {
            $portfolio->image_url = $this->uploadPortfolioImage($portfolioData['image']);
        }
        
        $portfolio->save();
        
        // Log activity
        Activity::create([
            'user_id' => $user->id,
            'type' => 'portfolio_added',
            'subject_id' => $portfolio->id,
            'subject_type' => Portfolio::class,
            'description' => 'Added portfolio item: ' . $portfolio->title,
        ]);
        
        return $portfolio;
    }
    
    /**
     * Update portfolio item
     *
     * @param Portfolio $portfolio
     * @param array $portfolioData
     * @return Portfolio
     */
    public function updatePortfolio(Portfolio $portfolio, array $portfolioData): Portfolio
    {
        // Ensure user owns this portfolio record
        if ($portfolio->user_id !== Auth::id()) {
            throw new \Exception('You do not have permission to update this portfolio item');
        }
        
        $portfolio->title = $portfolioData['title'] ?? $portfolio->title;
        $portfolio->description = $portfolioData['description'] ?? $portfolio->description;
        $portfolio->project_url = $portfolioData['project_url'] ?? $portfolio->project_url;
        
        // Handle image uploading if provided
        if (isset($portfolioData['image'])) {
            // Delete old image if exists
            $this->removePortfolioImage($portfolio->image_url);
            
            // Upload new image
            $portfolio->image_url = $this->uploadPortfolioImage($portfolioData['image']);
        }
        
        $portfolio->save();
        
        // Log activity
        Activity::create([
            'user_id' => Auth::id(),
            'type' => 'portfolio_updated',
            'subject_id' => $portfolio->id,
            'subject_type' => Portfolio::class,
            'description' => 'Updated portfolio item: ' . $portfolio->title,
        ]);
        
        return $portfolio;
    }
    
    /**
     * Delete portfolio item
     *
     * @param Portfolio $portfolio
     * @return bool
     */
    public function deletePortfolio(Portfolio $portfolio): bool
    {
        // Ensure user owns this portfolio record
        if ($portfolio->user_id !== Auth::id()) {
            throw new \Exception('You do not have permission to delete this portfolio item');
        }
        
        $description = 'Deleted portfolio item: ' . $portfolio->title;
        
        // Delete image if exists
        if ($portfolio->image_url) {
            $this->removePortfolioImage($portfolio->image_url);
        }
        
        $portfolio->delete();
        
        // Log activity
        Activity::create([
            'user_id' => Auth::id(),
            'type' => 'portfolio_deleted',
            'description' => $description,
        ]);
        
        return true;
    }
    
    /**
     * Add skills to user
     *
     * @param User $user
     * @param array $skillIds
     * @return array
     */
    public function addSkills(User $user, array $skillIds): array
    {
        // Get current user skill IDs
        $currentSkillIds = $user->skills()->pluck('skill_id')->toArray();
        
        // Find new skill IDs to add
        $newSkillIds = array_diff($skillIds, $currentSkillIds);
        
        if (!empty($newSkillIds)) {
            $user->skills()->attach($newSkillIds);
            
            // Log activity
            $skillNames = Skill::whereIn('id', $newSkillIds)->pluck('name')->implode(', ');
            
            Activity::create([
                'user_id' => $user->id,
                'type' => 'skills_added',
                'description' => 'Added skills: ' . $skillNames,
            ]);
        }
        
        return $user->skills()->pluck('skills.id')->toArray();
    }
    
    /**
     * Remove a skill from user
     *
     * @param User $user
     * @param int $skillId
     * @return bool
     */
    public function removeSkill(User $user, int $skillId): bool
    {
        // Ensure user has this skill
        if (!$user->skills()->where('skill_id', $skillId)->exists()) {
            return false;
        }
        
        // Get skill name for activity log
        $skillName = Skill::find($skillId)->name;
        
        // Detach skill
        $user->skills()->detach($skillId);
        
        // Log activity
        Activity::create([
            'user_id' => $user->id,
            'type' => 'skill_removed',
            'description' => 'Removed skill: ' . $skillName,
        ]);
        
        return true;
    }
    
    /**
     * Update user profile photo
     *
     * @param User $user
     * @param mixed $photo
     * @return bool
     */
    private function updateProfilePhoto(User $user, $photo): bool
    {
        // Delete old photo if exists
        if ($user->profile_photo_url && !str_contains($user->profile_photo_url, 'randomuser.me')) {
            $oldPath = str_replace('/storage/', '/public/', $user->profile_photo_url);
            Storage::delete($oldPath);
        }
        
        // Store new photo
        $path = $photo->store('public/profile-photos');
        $url = Storage::url($path);
        
        // Update user record
        $user->profile_photo_url = $url;
        return $user->save();
    }
    
    /**
     * Upload portfolio image
     *
     * @param \Illuminate\Http\UploadedFile $image
     * @return string
     */
    private function uploadPortfolioImage($image): string
    {
        $path = $image->store('public/portfolio');
        return Storage::url($path);
    }
    
    /**
     * Remove portfolio image
     *
     * @param string|null $imagePath
     * @return void
     */
    private function removePortfolioImage(?string $imagePath): void
    {
        if ($imagePath) {
            $path = str_replace('/storage/', '/public/', $imagePath);
            Storage::delete($path);
        }
    }
}
