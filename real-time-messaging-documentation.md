# Real-time Messaging Implementation

This document provides an overview of how real-time messaging is implemented in the MahaBisa application.

## Backend Implementation

1. **Event Creation**:
   - Created a `MessageSent` event class that implements the `ShouldBroadcast` interface
   - The event broadcasts message data to private channels specific to the conversation participants

```php
// app/Events/MessageSent.php
class MessageSent implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;
    public $message;
    
    public function __construct(Message $message)
    {
        $this->message = $message->load('sender');
    }
    
    public function broadcastOn(): array
    {
        return [
            new PrivateChannel('chat.'.$this->message->sender_id.'.'.$this->message->recipient_id),
            new PrivateChannel('chat.'.$this->message->recipient_id.'.'.$this->message->sender_id),
        ];
    }
    
    public function broadcastAs(): string
    {
        return 'new-message';
    }
}
```

2. **Controller Updates**:
   - Modified message controllers to broadcast messages using the `MessageSent` event
   - Added broadcasting in both client and freelancer controllers to ensure messages are sent in real-time

## Frontend Implementation

1. **Laravel Echo Setup**:
   - Created an `echo-setup.js` file to configure Pusher and Laravel Echo
   - Imported this setup in `bootstrap.js` to make Echo available globally

```js
// resources/js/echo-setup.js
import Echo from 'laravel-echo';
import Pusher from 'pusher-js';

window.Pusher = Pusher;

window.Echo = new Echo({
  broadcaster: 'pusher',
  key: import.meta.env.VITE_PUSHER_APP_KEY,
  cluster: import.meta.env.VITE_PUSHER_APP_CLUSTER ?? 'ap1',
  wsHost: import.meta.env.VITE_PUSHER_HOST || undefined,
  wsPort: import.meta.env.VITE_PUSHER_PORT || 443,
  wssPort: import.meta.env.VITE_PUSHER_PORT || 443,
  forceTLS: (import.meta.env.VITE_PUSHER_SCHEME || 'https') === 'https',
  enabledTransports: ['ws', 'wss'],
  disableStats: true,
});
```

2. **React Component Updates**:
   - Enhanced both `Client/Messages.jsx` and `Freelancer/Messages.jsx` components with:
     - Local state to manage messages with a `useState` hook
     - Automatic scrolling with a `useRef` hook
     - Echo channel subscription with a `useEffect` hook

```jsx
// Example from the Message components
useEffect(() => {
  if (active_chat_other_user && auth_user) {
    const channel = window.Echo.private(
      `chat.${auth_user.id}.${active_chat_other_user.id}`
    );

    channel.listen('.new-message', (event) => {
      setMessages(currentMessages => [
        ...currentMessages, 
        {
          ...event.message,
          is_mine: event.message.sender_id === auth_user.id
        }
      ]);
    });

    return () => {
      channel.stopListening('.new-message');
    };
  }
}, [active_chat_other_user, auth_user]);
```

## Environment Configuration

The following environment variables need to be configured in the `.env` file for real-time messaging to work:

```
BROADCAST_DRIVER=pusher
BROADCAST_CONNECTION=pusher

PUSHER_APP_ID=your-pusher-app-id
PUSHER_APP_KEY=your-pusher-app-key
PUSHER_APP_SECRET=your-pusher-app-secret
PUSHER_APP_CLUSTER=ap1

VITE_PUSHER_APP_KEY="${PUSHER_APP_KEY}"
VITE_PUSHER_APP_CLUSTER="${PUSHER_APP_CLUSTER}"
```

## Setup Instructions

1. Register for a Pusher account at [pusher.com](https://pusher.com)
2. Create a new Pusher Channels app 
3. Copy your app credentials to the `.env` file
4. Set `BROADCAST_DRIVER=pusher` in your `.env` file
5. Run your Laravel app with `php artisan serve`
6. Run your frontend with `npm run dev`

## Usage

Once set up, messages will be sent and received in real time between users without requiring page refreshes. The UI will update automatically whenever a new message is received.
