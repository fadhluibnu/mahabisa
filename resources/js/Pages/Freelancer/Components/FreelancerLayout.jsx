import React, { useState } from 'react';
import { Head, usePage } from '@inertiajs/react';
import Sidebar from './Sidebar';
import Header from './Header';

const FreelancerLayout = ({ children, title, subtitle }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { auth } = usePage().props;

  return (
    <>
      <Head title={`${title} - MahaBisa Freelancer`} />

      <div className="min-h-screen bg-gray-50">
        {/* Mobile menu button */}
        <button
          type="button"
          className="md:hidden fixed top-4 right-4 z-40 p-2 rounded-md bg-indigo-600 text-white"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          <svg
            className="h-6 w-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            {sidebarOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>

        <Sidebar
          isOpen={sidebarOpen}
          closeSidebar={() => setSidebarOpen(false)}
          auth={auth}
        />

        <div className="md:pl-64 min-h-screen">
          <main className="p-4 md:p-6 lg:p-8">
            <Header title={title} subtitle={subtitle} />
            <div className="mt-6">{children}</div>
          </main>
        </div>
      </div>
    </>
  );
};

export default FreelancerLayout;
