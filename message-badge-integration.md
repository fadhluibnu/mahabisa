# Message Badge Integration

This document provides implementation details for integrating real-time message notification badges in the MahaBisa application.

## Frontend Integration

### Message Badge Components

1. **Badge HTML Element**:
   - Added message badge counter elements to both Client and Freelancer sidebars:
   
   ```jsx
   <div className="relative">
     <svg className="mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
             d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
     </svg>
     {/* Message notification badge */}
     <span id="message-badge-count" className="absolute -top-2 -right-1 bg-red-500 text-white text-xs font-medium px-1.5 py-0.5 rounded-full hidden">0</span>
   </div>
   ```

2. **Notification Initialization**:
   - Added code to initialize message notifications in both layout components:
   
   ```jsx
   // In ClientLayout.jsx and FreelancerLayout.jsx
   import { initializeMessageNotifications } from '../../../message-notifications';
   
   // Initialize real-time message notifications
   useEffect(() => {
     if (user) {
       // Request notification permission for browser notifications
       if ('Notification' in window && Notification.permission !== 'granted') {
         Notification.requestPermission();
       }
       
       // Set up message notification listener
       const cleanup = initializeMessageNotifications(user.id);
       return cleanup;
     }
   }, [user]);
   ```

3. **Browser Notifications**:
   - Added notification permission requests in message components:
   
   ```jsx
   useEffect(() => {
     if ('Notification' in window && Notification.permission !== 'granted') {
       Notification.requestPermission();
     }
   }, []);
   ```

## How It Works

1. When a new message is sent, the backend emits a `MessageCountUpdated` event.
2. The message notification system listens for this event on the user's private channel.
3. When the event is received:
   - The badge is updated with the new unread message count
   - If the count is 0, the badge is hidden
   - If the user is not on the messages page, a browser notification is displayed

## Testing

To test the message badge functionality:

1. Have two browser windows open logged in as a client and a freelancer
2. Send a message from one user to another
3. Verify the receiving user sees the message badge update in real-time
4. Verify the browser notification appears if not on the messages page
5. Navigate to the messages page and confirm the badge disappears

## Troubleshooting

If message badges are not updating:

1. Check browser console for errors
2. Verify Echo channels are properly initialized
3. Use the debugging panel from `pusher-debug.js` to check connection status
4. Ensure the user ID is correctly passed to the notification initialization
