<?php

namespace App\Http\Controllers;

use App\Models\Message;
use App\Models\Order;
use App\Models\User;
use App\Models\Activity;
use App\Events\NotificationCreated;
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
}
