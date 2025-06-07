<?php

namespace App\Events;

use App\Models\Activity;
use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class NotificationCreated implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    /**
     * The notification instance.
     *
     * @var \App\Models\Activity
     */
    public $notification;

    /**
     * Create a new event instance.
     *
     * @param  \App\Models\Activity  $notification
     * @return void
     */
    public function __construct(Activity $notification)
    {
        $this->notification = $notification;
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return \Illuminate\Broadcasting\Channel|array
     */
    public function broadcastOn()
    {
        return new PrivateChannel('user.' . $this->notification->user_id);
    }
    
    /**
     * The event's broadcast name.
     *
     * @return string
     */
    public function broadcastAs()
    {
        return 'notification.created';
    }
    
    /**
     * Get the data to broadcast.
     *
     * @return array
     */
    public function broadcastWith()
    {
        return [
            'id' => $this->notification->id,
            'title' => $this->notification->title,
            'message' => $this->notification->description,
            'type' => $this->notification->action,
            'data' => $this->notification->data,
            'created_at' => $this->notification->created_at->toIso8601String(),
            'is_read' => $this->notification->is_read,
        ];
    }
}
