import React, { useEffect } from 'react';
import { router } from '@inertiajs/react';

export default function Dashboard() {
  useEffect(() => {
    // Redirect to admin dashboard
    router.visit('/admin/dashboard');
  }, []);
  
  return (
    <div className="min-h-screen flex justify-center items-center">
      <p className="text-gray-500">Redirecting to dashboard...</p>
    </div>
  );
}
