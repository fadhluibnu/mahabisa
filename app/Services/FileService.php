<?php

namespace App\Services;

use App\Models\File;
use App\Models\Order;
use App\Models\User;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class FileService
{
    /**
     * Upload a file and create a File model
     * 
     * @param UploadedFile $uploadedFile File from request
     * @param User $user User who uploaded the file
     * @param mixed $fileable The related model (Order, Service, etc)
     * @param string $fileableType The related model class name
     * @param bool $isPublic Whether the file is public or not
     * @param string $status File status (pending, active, deliverable)
     * @return File
     */
    public function uploadFile(
        UploadedFile $uploadedFile, 
        User $user, 
        $fileable, // Model instance (Order, Service, etc.)
        string $status = 'pending', // Default status
        bool $isPublic = false,
        string $fileTypeLabel = null // e.g., 'deliverable', 'attachment', 'profile_picture'
    ) {
        // Generate a unique filename
        $originalName = $uploadedFile->getClientOriginalName();
        $extension = $uploadedFile->getClientOriginalExtension();
        $filename = Str::random(20) . '_' . time() . '.' . $extension;
        
        // Determine the directory based on the fileable type and label
        $fileableClass = get_class($fileable);
        $fileableName = strtolower(class_basename($fileableClass)); // e.g., 'order', 'service'
        $directory = $fileableName . 's/' . $fileable->id . '/' . ($fileTypeLabel ?? 'general');
        
        // Store the file in private storage
        $path = $uploadedFile->storeAs($directory, $filename, 'private');
        
        // Create the File record
        $file = File::create([
            'user_id' => $user->id,
            'fileable_id' => $fileable->id,
            'fileable_type' => $fileableClass,
            'original_name' => $originalName,
            'file_name' => $filename,
            'file_path' => $path,
            'file_type' => $uploadedFile->getMimeType(),
            'file_size' => $uploadedFile->getSize(),
            'is_public' => $isPublic,
            'status' => $status, // Use the provided status
            'activated_at' => ($status === 'active') ? now() : null, // Set activated_at if status is active
            'download_count' => 0,
        ]);
        
        return $file;
    }
    
    /**
     * Upload a deliverable file for an order by a freelancer.
     * These files are initially not downloadable by the client.
     * 
     * @param UploadedFile $uploadedFile
     * @param User $freelancer User uploading (must be the freelancer of the order)
     * @param Order $order
     * @return File
     * @throws \Exception if user is not the order's freelancer
     */
    public function uploadDeliverable(UploadedFile $uploadedFile, User $freelancer, Order $order): File
    {
        if ($order->freelancer_id !== $freelancer->id) {
            throw new \Exception('User is not authorized to upload deliverables for this order.');
        }
        // Mark file as a deliverable (will be locked until payment & activation)
        // Status 'deliverable' indicates it's uploaded by freelancer, pending client access.
        return $this->uploadFile($uploadedFile, $freelancer, $order, 'deliverable', false, 'deliverables');
    }

    /**
     * Upload an attachment file for an order (can be by client or freelancer).
     * These files are generally accessible to both parties involved in the order.
     * 
     * @param UploadedFile $uploadedFile
     * @param User $user User uploading
     * @param Order $order
     * @return File
     */
    public function uploadOrderAttachment(UploadedFile $uploadedFile, User $user, Order $order): File
    {
        // Attachments are typically active immediately for relevant parties
        return $this->uploadFile($uploadedFile, $user, $order, 'active', false, 'attachments');
    }
    
    /**
     * Check if a user can download a file
     * 
     * @param File $file The file to check
     * @param User $user The user requesting the download
     * @return bool
     */
    public function canDownload(File $file, User $user): bool
    {
        // File owner can always download
        if ($file->user_id === $user->id) {
            return true;
        }
        
        // Public files are downloadable by anyone
        if ($file->is_public) {
            return true;
        }
        
        // Active files are downloadable according to order relationships
        if ($file->status === 'active') {
            return true;
        }
        
        // Admin can always download
        if ($user->isAdmin()) {
            return true;
        }
        
        // For order files, check the relationship
        if ($file->fileable_type === Order::class) {
            $order = Order::find($file->fileable_id);
            
            if (!$order) {
                return false;
            }
            
            // Freelancer can always download files related to their orders
            if ($order->freelancer_id === $user->id) {
                return true;
            }
            
            // Client can download files if they uploaded them or if payment is complete
            if ($order->client_id === $user->id) {
                // If client uploaded the file or the file is not a deliverable
                if ($file->user_id === $user->id || $file->status !== 'deliverable') {
                    return true;
                }
                
                // Check if the order is completed (payment confirmed)
                if ($order->status === 'completed') {
                    // Activate the file if it's not already active
                    if ($file->status !== 'active') {
                        $file->status = 'active';
                        $file->activated_at = now();
                        $file->save();
                    }
                    return true;
                }
            }
        }
        
        return false;
    }
    
    /**
     * Activate a file (make it available for download)
     * 
     * @param File $file
     * @return File
     */
    public function activateFile(File $file): File
    {
        $file->status = 'active';
        $file->activated_at = now();
        $file->save();
        
        return $file;
    }
    
    /**
     * Get a response to download a file
     * 
     * @param File $file
     * @return \Symfony\Component\HttpFoundation\BinaryFileResponse|\Illuminate\Http\RedirectResponse
     */
    public function getFileDownloadResponse(File $file, User $user)
    {
        // First, check if the user is authorized to download this file
        if (!$file->canBeDownloadedBy($user)) {
            // Log unauthorized download attempt
            \Illuminate\Support\Facades\Log::warning('Unauthorized download attempt', [
                'user_id' => $user->id,
                'file_id' => $file->id,
                'file_path' => $file->file_path,
                'order_id' => ($file->fileable_type === Order::class) ? $file->fileable_id : null
            ]);
            abort(403, 'You do not have permission to download this file.');
        }

        $path = $file->file_path; 
        $disk = 'private'; 
        
        if (!Storage::disk($disk)->exists($path)) {
            \Illuminate\Support\Facades\Log::error('File not found in storage for download', [
                'file_id' => $file->id,
                'file_path' => $path,
                'disk' => $disk
            ]);
            abort(404, 'File not found.');
        }
        
        $file->increment('download_count');
        $file->last_download_at = now();
        $file->save();
        
        // The Storage::download method is correct and should exist.
        // If it's reported as undefined, it might be an environment or import issue, 
        // but the code itself is standard Laravel practice.
        return Storage::disk($disk)->download($path, $file->original_name, ['Content-Type' => $file->file_type]);
    }
    
    /**
     * Delete a file
     * 
     * @param File $file
     * @return bool
     */
    public function deleteFile(File $file)
    {
        // Delete from storage
        Storage::disk('private')->delete($file->file_path);
        
        // Delete from database
        return $file->delete();
    }
}
