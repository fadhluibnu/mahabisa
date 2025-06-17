import React from 'react';
import { Link, usePage } from '@inertiajs/react';

const MainLayout = ({ children }) => {
  const { auth } = usePage().props;

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              {/* Logo */}
              <div className="flex-shrink-0 flex items-center">
                <Link href="/">
                  <span className="text-xl font-bold text-blue-600">MahaBisa</span>
                </Link>
              </div>

              {/* Navigation Links */}
              <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                <Link
                  href={`/${auth?.user?.role}/dashboard`}
                  className="inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium border-transparent hover:border-gray-300 text-gray-500 hover:text-gray-700"
                >
                  Dashboard
                </Link>
                
                {auth?.user?.role === 'client' && (
                  <>
                    <Link
                      href="/client/services"
                      className="inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium border-transparent hover:border-gray-300 text-gray-500 hover:text-gray-700"
                    >
                      Services
                    </Link>
                    <Link
                      href="/client/orders"
                      className="inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium border-transparent hover:border-gray-300 text-gray-500 hover:text-gray-700"
                    >
                      Orders
                    </Link>
                    <Link
                      href="/client/payments"
                      className="inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium border-transparent hover:border-gray-300 text-gray-500 hover:text-gray-700"
                    >
                      Payments
                    </Link>
                  </>
                )}
              </div>
            </div>

            {/* User Menu */}
            <div className="flex items-center">
              {auth?.user ? (
                <div className="ml-3 relative">
                  <div className="flex items-center space-x-4">
                    <span className="text-sm text-gray-700">
                      {auth.user.name}
                    </span>
                    <Link
                      href="/logout"
                      method="post"
                      as="button"
                      className="text-sm text-gray-700 hover:text-gray-900"
                    >
                      Logout
                    </Link>
                  </div>
                </div>
              ) : (
                <Link
                  href="/auth"
                  className="text-sm text-gray-700 hover:text-gray-900"
                >
                  Login
                </Link>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main>{children}</main>
    </div>
  );
};

export default MainLayout;
