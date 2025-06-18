import Echo from 'laravel-echo';
import Pusher from 'pusher-js';

window.Pusher = Pusher;

// Initialize Laravel Echo
window.Echo = new Echo({
  broadcaster: 'pusher',
  key: import.meta.env.VITE_PUSHER_APP_KEY,
  cluster: import.meta.env.VITE_PUSHER_APP_CLUSTER ?? 'ap1', // Default to Asia Pacific cluster if not defined
  wsHost: import.meta.env.VITE_PUSHER_HOST || undefined,
  wsPort: import.meta.env.VITE_PUSHER_PORT || 443,
  wssPort: import.meta.env.VITE_PUSHER_PORT || 443,
  forceTLS: (import.meta.env.VITE_PUSHER_SCHEME || 'https') === 'https',
  enabledTransports: ['ws', 'wss'],
  disableStats: true,
});
