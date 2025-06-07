<?php

namespace App\Services;

use App\Models\User;
use App\Models\Activity;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\DB;

class NotificationService
{
    /**
     * Create a new notification for a user
     *
     * @param User|int $recipient The user or user ID to notify
     * @param string $type The type of notification (order, proposal, message, etc)
     * @param string $title The notification title
     * @param string $message The notification message
     * @param array $data Additional data to store with the notification
     * @param bool $realtime Whether to broadcast the notification in real-time
     * @return Activity The created notification/activity
     */
    public function create($recipient, string $type, string $title, string $message, ?array $data = [], bool $realtime = true)
    {
        try {
            $recipientId = $recipient instanceof User ? $recipient->id : $recipient;
            
            $notification = Activity::create([
                'user_id' => $recipientId,
                'action' => $type,
                'title' => $title,
                'description' => $message,
                'data' => $data,
                'is_read' => false
            ]);
            
            // If real-time is enabled and we have a broadcast channel set up
            if ($realtime) {
                $this->broadcast($notification);
            }
            
            return $notification;
        } catch (\Exception $e) {
            Log::error('Failed to create notification: ' . $e->getMessage());
            return null;
        }
    }
    
    /**
     * Create notifications for multiple users
     *
     * @param array $recipients Array of user IDs or User objects
     * @param string $type The type of notification
     * @param string $title The notification title
     * @param string $message The notification message
     * @param array $data Additional data to store with the notification
     * @param bool $realtime Whether to broadcast the notification in real-time
     * @return array The created notifications/activities
     */
    public function createMultiple(array $recipients, string $type, string $title, string $message, ?array $data = [], bool $realtime = true)
    {
        $notifications = [];
        
        foreach ($recipients as $recipient) {
            $notification = $this->create($recipient, $type, $title, $message, $data, $realtime);
            if ($notification) {
                $notifications[] = $notification;
            }
        }
        
        return $notifications;
    }
    
    /**
     * Mark a notification as read
     *
     * @param int $notificationId The notification ID
     * @return bool Success status
     */
    public function markAsRead(int $notificationId)
    {
        try {
            $notification = Activity::where('id', $notificationId)
                ->where('user_id', Auth::id())
                ->first();
                
            if (!$notification) {
                return false;
            }
            
            $notification->update(['is_read' => true]);
            return true;
        } catch (\Exception $e) {
            Log::error('Failed to mark notification as read: ' . $e->getMessage());
            return false;
        }
    }
    
    /**
     * Mark all notifications as read for the current user
     *
     * @return bool Success status
     */
    public function markAllAsRead()
    {
        try {
            Activity::where('user_id', Auth::id())
                ->where('is_read', false)
                ->update(['is_read' => true]);
            return true;
        } catch (\Exception $e) {
            Log::error('Failed to mark all notifications as read: ' . $e->getMessage());
            return false;
        }
    }
    
    /**
     * Get unread notifications count for a user
     *
     * @param int|null $userId The user ID (defaults to current authenticated user)
     * @return int The count of unread notifications
     */
    public function getUnreadCount(?int $userId = null)
    {
        $userId = $userId ?: Auth::id();
        
        try {
            return Activity::where('user_id', $userId)
                ->where('is_read', false)
                ->count();
        } catch (\Exception $e) {
            Log::error('Failed to get unread notification count: ' . $e->getMessage());
            return 0;
        }
    }
    
    /**
     * Broadcast a notification to the user's private channel
     * 
     * @param Activity $notification The notification to broadcast
     * @return void
     */
    private function broadcast(Activity $notification)
    {
        try {
            // When Laravel Echo is set up, broadcast to the user's channel
            // event(new NotificationCreated($notification));
            
            // For now, this is just a placeholder for future implementation
            Log::info('Broadcasting notification to user ' . $notification->user_id);
        } catch (\Exception $e) {
            Log::error('Failed to broadcast notification: ' . $e->getMessage());
        }
    }
}
