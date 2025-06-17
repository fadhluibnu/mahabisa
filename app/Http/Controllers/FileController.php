<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\File;
use App\Services\FileService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class FileController extends Controller
{

    protected $fileService;

    public function __construct(FileService $fileService)
    {
        $this->fileService = $fileService;
    }

    /**
     * Upload a deliverable file for an order
     */
    // public function uploadDeliverable(Request $request, $orderId)
    // {
    //     $user = Auth::user();
    //     $order = Order::findOrFail($orderId);
        
    //     // Ensure the user is the freelancer for this order
    //     if ($order->freelancer_id !== $user->id) {
    //         return response()->json([
    //             'success' => false,
    //             'message' => 'You do not have permission to upload files for this order.'
    //         ], 403);
    //     }
        
    //     $request->validate([
    //         'file' => 'required|file|max:50000', // Max 50MB
    //     ]);
        
    //     $uploadedFile = $request->file('file');
        
    //     // Generate a unique filename
    //     $originalName = $uploadedFile->getClientOriginalName();
    //     $extension = $uploadedFile->getClientOriginalExtension();
    //     $filename = \Illuminate\Support\Str::random(20) . '_' . time() . '.' . $extension;
        
    //     // Set the directory path
    //     $directory = 'orders/' . $order->id . '/deliverables';
        
    //     // Store the file in private storage
    //     $path = $uploadedFile->storeAs($directory, $filename, 'private');
        
    //     // Create a file record
    //     $file = new File();
    //     $file->user_id = $user->id;
    //     $file->fileable_id = $order->id;
    //     $file->fileable_type = Order::class;
    //     $file->original_name = $originalName;
    //     $file->file_name = $filename;
    //     $file->file_path = $path;
    //     $file->file_type = $uploadedFile->getMimeType();
    //     $file->file_size = $uploadedFile->getSize();
    //     $file->is_public = false;
    //     $file->status = 'deliverable';
    //     $file->download_count = 0;
    //     $file->save();
        
    //     // Set formatted size and file extension for the response
    //     $file->formatted_size = $this->formatFileSize($file->file_size);
    //     $file->file_extension = pathinfo($originalName, PATHINFO_EXTENSION);
        
    //     return response()->json([
    //         'success' => true,
    //         'file' => $file
    //     ]);
    // }
    public function uploadDeliverable(Request $request, $orderId)
    {
        $user = Auth::user();
        $order = Order::findOrFail($orderId);
        
        if ($order->freelancer_id !== $user->id) {
            return response()->json([
                'success' => false,
                'message' => 'You do not have permission to upload files for this order.'
            ], 403);
        }
        
        $request->validate([
            'file' => 'required|file|max:50000', // Max 50MB
        ]);
        
        $uploadedFile = $request->file('file');
        
        // Panggil FileService untuk menyimpan file sebagai 'deliverable'
        $file = $this->fileService->uploadDeliverable($uploadedFile, $user, $order);
        
        // Tambahkan format size dan extension untuk response
        $file->formatted_size = $this->formatFileSize($file->file_size);
        $file->file_extension = pathinfo($file->original_name, PATHINFO_EXTENSION);
        
        return response()->json([
            'success' => true,
            'file' => $file
        ]);
    }


    /**
     * Upload a file for an order - can be used by both client and freelancer
     * 
     * @param Request $request
     * @param int $orderId
     * @return \Illuminate\Http\Response
     */
    public function uploadOrderFile(Request $request, $orderId)
    {
        $user = Auth::user();
        $order = Order::findOrFail($orderId);
        
        // Ensure the user is part of this order
        if ($order->client_id !== $user->id && $order->freelancer_id !== $user->id) {
            return response()->json([
                'success' => false,
                'message' => 'You do not have permission to upload files for this order.'
            ], 403);
        }
        
        // Validate request
        $request->validate([
            'files' => 'required|array',
            'files.*' => 'file|max:50000', // Max 50MB
        ]);
        
        $uploadedFiles = [];
        
        // Handle multiple file uploads
        if ($request->hasFile('files')) {
            foreach($request->file('files') as $uploadedFile) {
                // Generate a unique filename
                $originalName = $uploadedFile->getClientOriginalName();
                $extension = $uploadedFile->getClientOriginalExtension();
                $filename = \Illuminate\Support\Str::random(20) . '_' . time() . '.' . $extension;
                
                // Set the directory path
                $directory = 'orders/' . $order->id . '/';
                
                // Determine file type/status based on user and order status
                $fileStatus = 'active'; // Default status
                
                // For freelancer uploads during order in progress, mark as deliverables
                if ($user->id === $order->freelancer_id && in_array($order->status, ['in_progress', 'in-progress', 'revision'])) {
                    $directory .= 'deliverables';
                    $fileStatus = 'deliverable';
                } else {
                    $directory .= 'attachments';
                }
                
                // Store the file in private storage
                $path = $uploadedFile->storeAs($directory, $filename, 'private');
                
                // Create a file record
                $file = new File();
                $file->user_id = $user->id;
                $file->fileable_id = $order->id;
                $file->fileable_type = Order::class;
                $file->original_name = $originalName;
                $file->file_name = $filename;
                $file->file_path = $path;
                $file->file_type = $uploadedFile->getMimeType();
                $file->file_size = $uploadedFile->getSize();
                $file->is_public = false;
                $file->status = $fileStatus;
                $file->activated_at = ($fileStatus === 'active') ? now() : null;
                $file->download_count = 0;
                $file->save();
                
                // Set formatted size and file extension for the response
                $file->formatted_size = $this->formatFileSize($file->file_size);
                $file->file_extension = pathinfo($originalName, PATHINFO_EXTENSION);
                
                $uploadedFiles[] = $file;
            }
        }
        
        return response()->json([
            'success' => true,
            'files' => $uploadedFiles,
            'message' => count($uploadedFiles) . ' file(s) uploaded successfully.'
        ]);
    }

    /**
     * Download a file
     */
    public function download($fileId)
    {
        $user = Auth::user();
        $file = File::findOrFail($fileId);
        $order = null;

        if ($file->fileable_type === Order::class) {
            $order = Order::findOrFail($file->fileable_id);
        }

        // Allow user to download if they uploaded the file, or if it's a general file they have access to
        if ($file->user_id === $user->id) {
            // Track download count
            $file->download_count += 1;
            $file->save();
            $path = storage_path('app/private/' . $file->file_path);
            return response()->download($path, $file->original_name);
        }

        // Specific logic for order deliverables for clients
        if ($order && $file->status === 'deliverable' && $order->client_id === $user->id) {
            if ($order->isPaymentCompleted()) {
                // Track download count
                $file->download_count += 1;
                $file->save();
                $path = storage_path('app/private/' . $file->file_path);
                return response()->download($path, $file->original_name);
            } else {
                // If payment is not completed, redirect to payment page or show an error
                // Check if there's a pending payment record to decide the route
                $pendingPaymentExists = $order->payments()->where('status', 'pending')->exists();
                if ($order->status === 'delivered' || $order->status === 'pending_payment' || $pendingPaymentExists) {
                     return redirect()->route('client.orders.payment.create', $order->id)
                         ->with('error', 'Anda harus menyelesaikan pembayaran untuk mengunduh file ini.');
                }
                return response()->json([
                    'success' => false,
                    'message' => 'Pembayaran untuk order ini belum selesai. Anda tidak dapat mengunduh file.'
                ], 403);
            }
        }
        
        // Check general model-based download permission if not covered above
        if ($file->canBeDownloadedBy($user)) {
            // Track download count
            $file->download_count += 1;
            $file->save();
            
            // Return the file for download
            $path = storage_path('app/private/' . $file->file_path);
            return response()->download($path, $file->original_name);
        }

        // If file is not downloadable by any rule
        return response()->json([
            'success' => false,
            'message' => 'Anda tidak memiliki izin untuk mengunduh file ini.'
        ], 403);
    }

    /**
     * Delete a file
     */
    public function delete($fileId)
    {
        $user = Auth::user();
        $file = File::findOrFail($fileId);
        
        // Only admin or file owner can delete a file
        if ($file->user_id !== $user->id && !$user->hasRole('admin')) {
            return response()->json([
                'success' => false,
                'message' => 'You do not have permission to delete this file.'
            ], 403);
        }
        
        // Delete the actual file from storage
        \Illuminate\Support\Facades\Storage::disk('private')->delete($file->file_path);
        
        // Delete the database record
        $file->delete();
        
        return response()->json([
            'success' => true,
            'message' => 'File deleted successfully.'
        ]);
    }
    
    /**
     * List files for an order
     */
    public function listOrderFiles($orderId)
    {
        $user = Auth::user();
        $order = Order::findOrFail($orderId);
        
        // Ensure the user is part of this order
        if ($order->client_id !== $user->id && $order->freelancer_id !== $user->id && !$user->hasRole('admin')) {
            return response()->json([
                'success' => false,
                'message' => 'You do not have permission to view files for this order.'
            ], 403);
        }
        
        // Get files
        $files = $order->files()->get()->map(function($file) use ($user) {
            $file->can_download = $file->canBeDownloadedBy($user);
            $file->formatted_size = $this->formatFileSize($file->file_size);
            $file->file_extension = pathinfo($file->original_name, PATHINFO_EXTENSION);
            return $file;
        });
        
        return response()->json([
            'success' => true,
            'files' => $files
        ]);
    }
    
    /**
     * Format file size to human-readable format
     *
     * @param int $size Size in bytes
     * @return string
     */
     private function formatFileSize($size)
    {
        if ($size < 1024) {
            return $size . ' B';
        } elseif ($size < 1048576) {
            return round($size / 1024, 2) . ' KB';
        } elseif ($size < 1073741824) {
            return round($size / 1048576, 2) . ' MB';
        } else {
            return round($size / 1073741824, 2) . ' GB';
        }
    }
}
