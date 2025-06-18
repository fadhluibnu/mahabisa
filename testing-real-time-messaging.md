# Testing Real-time Messaging

This guide provides steps to test the real-time messaging implementation in the MahaBisa application.

## Prerequisites

1. A Pusher account with API credentials
2. Laravel Echo and Pusher JS packages installed
3. Updated `.env` file with Pusher credentials

## Setup

1. **Update your `.env` file**:
   
   Make sure your `.env` file has the following Pusher-related variables:

   ```
   BROADCAST_DRIVER=pusher
   BROADCAST_CONNECTION=pusher
   PUSHER_APP_ID=your-app-id
   PUSHER_APP_KEY=your-app-key
   PUSHER_APP_SECRET=your-app-secret
   PUSHER_HOST=
   PUSHER_PORT=443
   PUSHER_SCHEME=https
   PUSHER_APP_CLUSTER=ap1
   VITE_PUSHER_APP_KEY="${PUSHER_APP_KEY}"
   VITE_PUSHER_APP_CLUSTER="${PUSHER_APP_CLUSTER}"
   ```

2. **Clear configuration cache**:

   ```bash
   php artisan config:clear
   ```

3. **Restart the Laravel server and Vite**:

   ```bash
   php artisan serve
   npm run dev
   ```

## Testing the Implementation

### Method 1: Using Two Browser Windows

1. Open two different browsers or incognito windows
2. Log in as a client in one window and a freelancer in the other
3. Navigate to the messages page in both windows
4. Start a conversation between the two users
5. Send messages from each window and verify that messages appear in real-time without refresh

### Method 2: Using Pusher Debug Console

1. Log into your Pusher account
2. Go to your app dashboard
3. Open the "Debug Console" section
4. Send a message through your application
5. Verify that you see the event being triggered in the Pusher Debug Console
6. Confirm that the message appears in the application UI without a refresh

### Method 3: Using Browser DevTools

1. Open your browser's Developer Tools (F12)
2. Go to the Network tab
3. Filter for WebSocket connections
4. Navigate to your messages page
5. Look for a WebSocket connection to Pusher
6. Check that messages are being sent and received via this connection

## Common Issues and Solutions

1. **Messages not appearing in real-time**:
   - Check browser console for errors
   - Verify Pusher credentials in `.env` file
   - Make sure `BROADCAST_DRIVER=pusher` is set
   - Check that Echo is properly configured in `echo-setup.js`

2. **Authentication errors**:
   - Ensure Laravel is correctly set up to handle channel authentication
   - Check that your routes are properly defined for WebSocket authentication
   - Verify that users have proper permissions to access channels

3. **Only seeing messages after refresh**:
   - Check that Echo channel subscriptions are properly set up
   - Verify that the event names match between backend and frontend

## Debugging

If you need to debug the real-time functionality, you can add console logs:

```js
// In your component useEffect
channel.listen('.new-message', (event) => {
  console.log('New message received:', event);
  // Rest of your code...
});
```

You can also check the Laravel logs for any backend issues:

```bash
tail -f storage/logs/laravel.log
```
