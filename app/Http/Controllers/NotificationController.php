<?php

namespace App\Http\Controllers;

use App\Models\Activity;
use App\Services\NotificationService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class NotificationController extends Controller
{
    /**
     * @var NotificationService
     */
    protected $notificationService;
    
    /**
     * Create a new controller instance.
     *
     * @param NotificationService $notificationService
     */
    public function __construct(NotificationService $notificationService)
    {
        $this->middleware('auth');
        $this->notificationService = $notificationService;
    }
    
    /**
     * Get the user's notifications.
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(Request $request)
    {
        $perPage = $request->query('per_page', 10);
        $unreadOnly = $request->query('unread_only', false);
        
        $query = Activity::where('user_id', Auth::id())
            ->orderBy('created_at', 'desc');
            
        if ($unreadOnly) {
            $query->where('is_read', false);
        }
        
        $notifications = $query->paginate($perPage);
        $unreadCount = $this->notificationService->getUnreadCount();
        
        return response()->json([
            'notifications' => $notifications,
            'unread_count' => $unreadCount
        ]);
    }
    
    /**
     * Mark a notification as read.
     *
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function markAsRead($id)
    {
        $success = $this->notificationService->markAsRead($id);
        
        if ($success) {
            return response()->json([
                'success' => true,
                'message' => 'Notification marked as read',
                'unread_count' => $this->notificationService->getUnreadCount()
            ]);
        }
        
        return response()->json([
            'success' => false,
            'message' => 'Failed to mark notification as read'
        ], 400);
    }
    
    /**
     * Mark all notifications as read.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function markAllAsRead()
    {
        $success = $this->notificationService->markAllAsRead();
        
        if ($success) {
            return response()->json([
                'success' => true,
                'message' => 'All notifications marked as read',
                'unread_count' => 0
            ]);
        }
        
        return response()->json([
            'success' => false,
            'message' => 'Failed to mark all notifications as read'
        ], 400);
    }
}
