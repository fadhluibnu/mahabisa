import React from 'react';
import { Head, Link } from '@inertiajs/react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center p-4">
      <Head title="Page Not Found - MahaBisa" />
      
      <div className="text-center">
        <h1 className="text-6xl font-bold text-indigo-600 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">Halaman Tidak Ditemukan</h2>
        <p className="text-gray-600 mb-8">Halaman yang Anda cari tidak dapat ditemukan</p>
        
        <Link 
          href="/"
          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-md transition-colors"
        >
          Kembali ke Beranda
        </Link>
      </div>
    </div>
  );
}
