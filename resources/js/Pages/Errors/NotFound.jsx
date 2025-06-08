import React from 'react';
import { Head, Link } from '@inertiajs/react';
import Navbar from '@/Components/Navbar';
import Footer from '@/Components/Footer';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Head title="Halaman Tidak Ditemukan - MahaBisa" />
      
      <Navbar />
      
      <div className="flex-grow flex items-center justify-center px-4 lg:px-6 py-20">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-7xl font-bold text-indigo-600 mb-6">404</h1>
          <div className="w-24 h-1 bg-gradient-to-r from-indigo-600 to-pink-500 mx-auto mb-6"></div>
          
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Halaman Tidak Ditemukan</h2>
          <p className="text-lg text-gray-600 mb-8">
            Maaf, halaman yang Anda cari tidak dapat ditemukan atau telah dipindahkan.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="px-6 py-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors"
            >
              Kembali ke Beranda
            </Link>
            <Link
              href="/eksplorasi"
              className="px-6 py-3 border border-indigo-600 text-indigo-600 rounded-lg font-medium hover:bg-indigo-50 transition-colors"
            >
              Jelajahi Layanan
            </Link>
          </div>
          
          <div className="mt-16">
            <p className="text-gray-500 text-sm">
              Butuh bantuan? <a href="/tentang-kami" className="text-indigo-600 hover:underline">Hubungi kami</a>
            </p>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}
