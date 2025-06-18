// Message notification handler for real-time updates
import { router } from '@inertiajs/react';

// Initialize the message notification listener once after Echo is loaded
export function initializeMessageNotifications(userId) {
  if (!window.Echo || !userId) {
    console.warn('Echo not initialized or user ID not available');
    return;
  }

  // Subscribe to private user channel for message count updates
  const channel = window.Echo.private(`user.${userId}`);

  // Listen for message count updates
  channel.listen('.message-count-updated', (event) => {
    // Update badge count in UI
    const messageCountElement = document.getElementById('message-badge-count');
    if (messageCountElement) {
      // If count is 0, hide the badge
      if (event.unread_count === 0) {
        messageCountElement.classList.add('hidden');
      } else {
        // Show the badge and update count
        messageCountElement.classList.remove('hidden');
        messageCountElement.textContent = event.unread_count > 99 ? '99+' : event.unread_count;
      }
    }

    // Can also use an event bus to notify other components
    document.dispatchEvent(new CustomEvent('message-count-updated', {
      detail: { count: event.unread_count }
    }));
  });

  // Listen for new messages if user is not already in the messages page
  channel.listen('.new-message', (event) => {
    // Only show notification if user is not already in the messages view
    const currentPath = window.location.pathname;
    if (!currentPath.includes('/messages')) {
      // Show browser notification if supported
      if ('Notification' in window && Notification.permission === 'granted') {
        const sender = event.message.sender?.name || 'Someone';
        new Notification('New Message', {
          body: `${sender}: ${event.message.content.substring(0, 100)}...`,
          icon: '/favicon.ico'
        });
      }
    }
  });

  // Clean up function to remove listeners when needed
  return () => {
    channel.stopListening('.message-count-updated');
    channel.stopListening('.new-message');
  };
}
