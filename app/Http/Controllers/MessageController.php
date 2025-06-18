<?php

namespace App\Http\Controllers;

use App\Models\Message;
use App\Models\Order;
use App\Models\User;
use App\Models\Activity;
use App\Events\NotificationCreated;
use App\Events\MessageSent;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class MessageController extends Controller
{
    /**
     * Send a new message related to an order.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function send(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'order_id' => 'required|exists:orders,id',
            'message' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $user = Auth::user();
        $order = Order::findOrFail($request->order_id);
        
        // Determine recipient based on sender
        if ($user->id === $order->freelancer_id) {
            $recipient_id = $order->client_id;
        } elseif ($user->id === $order->client_id) {
            $recipient_id = $order->freelancer_id;
        } else {
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        // Create the message
        $message = new Message();
        $message->sender_id = $user->id;
        $message->recipient_id = $recipient_id;
        $message->order_id = $order->id;
        $message->message = $request->message;
        $message->save();

        // Create activity for notification
        $activity = Activity::create([
            'user_id' => $recipient_id,
            'type' => 'new_message',
            'description' => "Anda menerima pesan baru terkait pesanan #{$order->order_number}",
            'subject_id' => $message->id,
            'subject_type' => get_class($message),
            'properties' => [
                'order_id' => $order->id,
                'sender_name' => $user->name,
                'title' => 'Pesan Baru'
            ]
        ]);
        
        // Trigger notification event
        event(new NotificationCreated($activity));
        
        // Broadcast real-time message event
        broadcast(new MessageSent($message))->toOthers();

        return response()->json([
            'success' => true,
            'message' => $message->load('sender'),
        ]);
    }

    /**
     * Get messages for a specific order.
     *
     * @param  int  $orderId
     * @return \Illuminate\Http\Response
     */
    public function getOrderMessages($orderId)
    {
        $user = Auth::user();
        $order = Order::findOrFail($orderId);
        
        // Check if user is related to this order
        if ($user->id !== $order->freelancer_id && $user->id !== $order->client_id) {
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        // Mark messages as read
        Message::where('order_id', $orderId)
            ->where('recipient_id', $user->id)
            ->where('is_read', false)
            ->update(['is_read' => true]);

        // Get messages
        $messages = Message::with(['sender', 'sender.profile'])
            ->where('order_id', $orderId)
            ->orderBy('created_at', 'asc')
            ->get();

        return response()->json([
            'success' => true,
            'messages' => $messages
        ]);
    }
    
    /**
     * Send a direct message between users (not tied to an order).
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function sendDirectMessage(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'recipient_id' => 'required|exists:users,id',
            'content' => 'required|string',
        ]);

        if ($validator->fails()) {
            return back()->withErrors($validator)->withInput();
        }

        $user = Auth::user();
        
        // Create the message
        $message = new Message();
        $message->sender_id = $user->id;
        $message->recipient_id = $request->recipient_id;
        $message->message = $request->content;
        $message->save();
        
        // Broadcast message event for real-time updates
        broadcast(new MessageSent($message))->toOthers();
        
        // Update unread message count for the recipient
        \App\Http\Controllers\MessageNotificationController::updateUnreadCount($request->recipient_id);
        
        $recipient = User::find($request->recipient_id);
        
        // Create activity for notification
        $activity = Activity::create([
            'user_id' => $recipient->id,
            'type' => 'direct_message',
            'description' => "Anda menerima pesan baru dari {$user->name}",
            'subject_id' => $message->id,
            'subject_type' => get_class($message),
            'properties' => [
                'sender_name' => $user->name,
                'title' => 'Pesan Baru'
            ]
        ]);
        
        // Trigger notification event
        event(new NotificationCreated($activity));
        
        // Return response based on whether this is an AJAX request
        if ($request->expectsJson()) {
            return response()->json([
                'success' => true,
                'message' => $message->load('sender'),
            ]);
        }
        
        return back();
    }
}
