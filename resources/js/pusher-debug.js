// Debug script for Pusher connection
// Add this script to your page temporarily to debug Pusher connections

window.addEventListener('load', function() {
  // Wait for Echo to be initialized
  setTimeout(() => {
    if (!window.Echo) {
      console.error('Laravel Echo not initialized');
      addDebugMessage('Laravel Echo not initialized', 'error');
      return;
    }
    
    // Add debug UI
    createDebugUI();
    
    // Debug Pusher connection
    const pusher = window.Echo.connector.pusher;
    
    if (!pusher) {
      console.error('Pusher not found in Echo');
      addDebugMessage('Pusher not found in Echo', 'error');
      return;
    }
    
    console.log('Pusher instance:', pusher);
    addDebugMessage('Pusher instance found: ' + pusher.config.key, 'info');
    
    // Check connection state
    const connectionState = pusher.connection.state;
    console.log('Pusher connection state:', connectionState);
    addDebugMessage('Connection state: ' + connectionState, connectionState === 'connected' ? 'success' : 'warning');
    
    // Listen for connection events
    pusher.connection.bind('connected', () => {
      console.log('Pusher connected');
      addDebugMessage('Pusher connected', 'success');
    });
    
    pusher.connection.bind('disconnected', () => {
      console.log('Pusher disconnected');
      addDebugMessage('Pusher disconnected', 'error');
    });
    
    pusher.connection.bind('error', (err) => {
      console.error('Pusher error:', err);
      addDebugMessage('Pusher error: ' + err.message, 'error');
    });
    
    // Test subscribing to a channel
    try {
      const authUserId = document.querySelector('meta[name="user-id"]')?.getAttribute('content');
      
      if (authUserId) {
        addDebugMessage('Authenticated user ID: ' + authUserId, 'info');
        
        // Try to subscribe to user's channel
        const testChannel = window.Echo.private(`user.${authUserId}`);
        
        testChannel.listen('.message-count-updated', (event) => {
          console.log('Received message-count-updated event:', event);
          addDebugMessage('Received message-count-updated event: ' + JSON.stringify(event), 'success');
        });
        
        addDebugMessage('Subscribed to channel: user.' + authUserId, 'info');
      } else {
        addDebugMessage('User ID not found in page meta', 'warning');
      }
    } catch (error) {
      console.error('Error subscribing to channel:', error);
      addDebugMessage('Error subscribing to channel: ' + error.message, 'error');
    }
  }, 1000);
});

function createDebugUI() {
  // Create debug panel
  const debugPanel = document.createElement('div');
  debugPanel.id = 'pusher-debug-panel';
  debugPanel.style.cssText = 'position:fixed; bottom:10px; right:10px; width:300px; max-height:400px; overflow-y:auto; background:white; border:1px solid #ddd; padding:10px; z-index:9999; font-family:monospace; font-size:12px;';
  
  // Add header
  const header = document.createElement('div');
  header.innerHTML = '<strong>Pusher Debug</strong>';
  header.style.marginBottom = '10px';
  debugPanel.appendChild(header);
  
  // Add messages container
  const messagesContainer = document.createElement('div');
  messagesContainer.id = 'pusher-debug-messages';
  debugPanel.appendChild(messagesContainer);
  
  // Add to body
  document.body.appendChild(debugPanel);
}

function addDebugMessage(message, type) {
  const messagesContainer = document.getElementById('pusher-debug-messages');
  if (!messagesContainer) return;
  
  const messageEl = document.createElement('div');
  messageEl.style.borderBottom = '1px solid #eee';
  messageEl.style.paddingBottom = '5px';
  messageEl.style.marginBottom = '5px';
  
  // Set color based on type
  switch (type) {
    case 'error':
      messageEl.style.color = 'red';
      break;
    case 'success':
      messageEl.style.color = 'green';
      break;
    case 'warning':
      messageEl.style.color = 'orange';
      break;
    default:
      messageEl.style.color = '#333';
  }
  
  // Add timestamp
  const timestamp = new Date().toTimeString().split(' ')[0];
  messageEl.innerHTML = `[${timestamp}] ${message}`;
  
  messagesContainer.appendChild(messageEl);
  messagesContainer.scrollTop = messagesContainer.scrollHeight;
}
