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
                'type' => $type,                    // Store type directly
                'action' => $type,                  // Keep action for backward compatibility
                'title' => $title,
                'description' => $message,
                'data' => !empty($data) ? $data : null,
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
    
    /**
     * Notify a freelancer about payment received for an order
     *
     * @param User $freelancer
     * @param \App\Models\Order $order
     * @param \App\Models\Payment $payment
     * @return Activity
     */
    public function notifyFreelancerPaymentReceived(User $freelancer, \App\Models\Order $order, \App\Models\Payment $payment)
    {
        return $this->create(
            $freelancer,
            'payment_received',
            'Payment Received',
            "Payment has been received for your order #{$order->order_number} amounting to {$payment->amount}",
            [
                'order_id' => $order->id,
                'payment_id' => $payment->id,
                'amount' => $payment->amount,
            ],
            true
        );
    }
    
    /**
     * Notify a client about order delivery
     *
     * @param User $client
     * @param \App\Models\Order $order
     * @return Activity
     */
    public function notifyClientOrderDelivered(User $client, \App\Models\Order $order)
    {
        return $this->create(
            $client,
            'order_delivered',
            'Order Delivered',
            "Your order #{$order->order_number} has been delivered. Please check and confirm the deliverables.",
            [
                'order_id' => $order->id,
            ],
            true
        );
    }
    
    /**
     * Notify a client that payment is required
     *
     * @param User $client
     * @param \App\Models\Order $order
     * @return Activity
     */
    public function notifyClientPaymentRequired(User $client, \App\Models\Order $order)
    {
        return $this->create(
            $client,
            'payment_required',
            'Payment Required',
            "Your order #{$order->order_number} is ready and waiting for payment. Pay now to access your deliverables.",
            [
                'order_id' => $order->id,
                'amount' => $order->total_amount,
            ],
            true
        );
    }
    
    /**
     * Notify a freelancer about withdrawal status
     *
     * @param User $freelancer
     * @param \App\Models\Withdrawal $withdrawal
     * @param string $status (approved, rejected)
     * @return Activity
     */
    public function notifyFreelancerWithdrawalStatus(User $freelancer, \App\Models\Withdrawal $withdrawal, string $status)
    {
        $title = $status === 'approved' ? 'Withdrawal Approved' : 'Withdrawal Rejected';
        $message = $status === 'approved' 
            ? "Your withdrawal request for {$withdrawal->amount} has been approved and processed."
            : "Your withdrawal request for {$withdrawal->amount} has been rejected. Funds have been returned to your wallet.";
        
        return $this->create(
            $freelancer,
            "withdrawal_{$status}",
            $title,
            $message,
            [
                'withdrawal_id' => $withdrawal->id,
                'amount' => $withdrawal->amount,
                'status' => $status,
            ],
            true
        );
    }
    
    /**
     * Notify admins about a new withdrawal request
     *
     * @param \App\Models\Withdrawal $withdrawal
     * @return void
     */
    public function notifyAdminsWithdrawalRequest(\App\Models\Withdrawal $withdrawal)
    {
        $admins = User::where('role', 'admin')->get();
        
        foreach ($admins as $admin) {
            $this->create(
                $admin,
                'new_withdrawal_request',
                'New Withdrawal Request',
                "A new withdrawal request of {$withdrawal->amount} has been submitted by {$withdrawal->user->name}",
                [
                    'withdrawal_id' => $withdrawal->id,
                    'user_id' => $withdrawal->user_id,
                    'amount' => $withdrawal->amount,
                ],
                true
            );
        }
    }
    
    /**
     * Notify admins about a new payment
     *
     * @param \App\Models\Payment $payment
     * @return void
     */
    public function notifyAdminsPayment(\App\Models\Payment $payment)
    {
        $admins = User::where('role', 'admin')->get();
        
        foreach ($admins as $admin) {
            $this->create(
                $admin,
                'new_payment',
                'New Payment',
                "A new payment of {$payment->amount} has been made for order #{$payment->order->order_number}",
                [
                    'payment_id' => $payment->id,
                    'order_id' => $payment->order_id,
                    'amount' => $payment->amount,
                ],
                true
            );
        }
    }
    
    /**
     * Notify a freelancer about new events related to orders or services
     *
     * @param User $freelancer The freelancer to notify
     * @param mixed $subject The subject of the notification (Order, Project, etc.)
     * @param string $type Notification type (new_order, revision_requested, etc.)
     * @param string $message The notification message
     * @param string|null $url URL to redirect to when clicked
     * @param array $additionalData Any additional data to include
     * @return Activity
     */
    public function notifyFreelancer(User $freelancer, $subject, string $type, string $message, ?string $url = null, array $additionalData = [])
    {
        // Determine the title based on notification type
        $title = match($type) {
            'new_order' => 'New Order Received',
            'revision_requested' => 'Revision Requested',
            'order_cancelled' => 'Order Cancelled',
            'order_completed' => 'Order Completed',
            default => 'Notification'
        };
        
        // Prepare the data
        $data = [
            'url' => $url,
        ];
        
        // Add subject specific data
        if ($subject instanceof \App\Models\Order) {
            $data['order_id'] = $subject->id;
            $data['order_number'] = $subject->order_number;
        } elseif ($subject instanceof \App\Models\Project) {
            $data['project_id'] = $subject->id;
        } elseif ($subject instanceof \App\Models\Service) {
            $data['service_id'] = $subject->id;
        }
        
        // Merge additional data
        $data = array_merge($data, $additionalData);
        
        // Create and return the notification
        return $this->create(
            $freelancer,
            $type,
            $title,
            $message,
            $data,
            true
        );
    }
    
    /**
     * Notify a client about order cancellation
     *
     * @param User $client
     * @param \App\Models\Order $order
     * @return Activity
     */
    public function notifyClientOrderCancelled(User $client, \App\Models\Order $order)
    {
        return $this->create(
            $client,
            'order_cancelled',
            'Order Cancelled',
            "Your order #{$order->order_number} has been cancelled by the freelancer.",
            [
                'order_id' => $order->id,
            ],
            true
        );
    }
    
    /**
     * Notify a client about revision request
     *
     * @param User $client
     * @param \App\Models\Order $order
     * @return Activity
     */
    public function notifyClientRevisionRequested(User $client, \App\Models\Order $order)
    {
        return $this->create(
            $client,
            'revision_requested',
            'Revision Requested',
            "Your freelancer has requested a revision or clarification for order #{$order->order_number}.",
            [
                'order_id' => $order->id,
            ],
            true
        );
    }
}
