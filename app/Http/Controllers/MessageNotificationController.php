<?php

namespace App\Http\Controllers;

use App\Models\Message;
use App\Models\User;
use App\Events\MessageCountUpdated;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Events\MessageSent;

class MessageNotificationController extends Controller
{
    /**
     * Get unread message count for the authenticated user
     * 
     * @return \Illuminate\Http\Response
     */
    public function getUnreadCount()
    {
        $user = Auth::user();
        $count = Message::where('recipient_id', $user->id)
            ->where('is_read', false)
            ->count();
            
        return response()->json([
            'unread_count' => $count
        ]);
    }
    
    /**
     * Mark messages as read for a specific conversation
     * 
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function markAsRead(Request $request)
    {
        $request->validate([
            'conversation_user_id' => 'required|exists:users,id'
        ]);
        
        $user = Auth::user();
        $otherUserId = $request->conversation_user_id;
        
        // Mark all messages from the other user as read
        Message::where('sender_id', $otherUserId)
            ->where('recipient_id', $user->id)
            ->where('is_read', false)
            ->update(['is_read' => true, 'read_at' => now()]);
        
        // Get updated unread count for the user
        $newCount = Message::where('recipient_id', $user->id)
            ->where('is_read', false)
            ->count();
        
        // Broadcast the updated count
        broadcast(new MessageCountUpdated($user->id, $newCount));
        
        return response()->json([
            'success' => true,
            'unread_count' => $newCount
        ]);
    }
    
    /**
     * Update the unread message count after a message is sent
     * This should be called after sending a message to update the recipient's badge
     * 
     * @param int $recipientId
     * @return void
     */
    public static function updateUnreadCount($recipientId)
    {
        // Get the count of unread messages for the recipient
        $count = Message::where('recipient_id', $recipientId)
            ->where('is_read', false)
            ->count();
        
        // Broadcast the updated count
        broadcast(new MessageCountUpdated($recipientId, $count));
    }
}
