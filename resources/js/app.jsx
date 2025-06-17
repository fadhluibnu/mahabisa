import './bootstrap';
import { createInertiaApp } from '@inertiajs/react';
import { createRoot } from 'react-dom/client';
import React from 'react';
import ToastProvider from './Components/Toast';

createInertiaApp({
  resolve: name => {
    const pages = import.meta.glob('./Pages/**/*.jsx', { eager: true });
    return pages[`./Pages/${name}.jsx`];
  },
  setup({ el, App, props }) {
    createRoot(el).render(
      <ToastProvider>
        <App {...props} />
      </ToastProvider>
    );
  },
  // Tambahkan ini untuk menangani URL eksternal dengan lebih baik
  progress: {
    color: '#4B5563',
  },
});
