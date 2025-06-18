import axios from 'axios';
window.axios = axios;

window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

// Add CSRF token to every request
const csrfToken = document.head.querySelector('meta[name="csrf-token"]');

if (csrfToken) {
  window.axios.defaults.headers.common['X-CSRF-TOKEN'] = csrfToken.content;
} else {
  console.error(
    'CSRF token not found: https://laravel.com/docs/csrf#csrf-x-csrf-token'
  );
}

// Import Echo setup for real-time messaging
import './echo-setup';
