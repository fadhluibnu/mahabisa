import React, { useState } from 'react';
import AdminLayout from './Components/AdminLayout';

const Settings = () => {
  const [activeTab, setActiveTab] = useState('general');
  const [showSaveModal, setShowSaveModal] = useState(false);
  
  return (
    <AdminLayout 
      title="Pengaturan Sistem" 
      subtitle="Konfigurasi platform MahaBisa"
    >
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-8">
        <div className="border-b border-gray-200">
          <nav className="flex -mb-px overflow-x-auto scrollbar-hide" aria-label="Tabs">
            <button
              onClick={() => setActiveTab('general')}
              className={`py-3 sm:py-4 px-4 sm:px-6 text-xs sm:text-sm font-medium border-b-2 whitespace-nowrap ${
                activeTab === 'general'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Umum
            </button>
            <button
              onClick={() => setActiveTab('fee')}
              className={`py-3 sm:py-4 px-4 sm:px-6 text-xs sm:text-sm font-medium border-b-2 whitespace-nowrap ${
                activeTab === 'fee'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Biaya & Komisi
            </button>
            <button
              onClick={() => setActiveTab('security')}
              className={`py-3 sm:py-4 px-4 sm:px-6 text-xs sm:text-sm font-medium border-b-2 whitespace-nowrap ${
                activeTab === 'security'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Keamanan
            </button>
            <button
              onClick={() => setActiveTab('email')}
              className={`py-3 sm:py-4 px-4 sm:px-6 text-xs sm:text-sm font-medium border-b-2 whitespace-nowrap ${
                activeTab === 'email'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Email
            </button>
            <button
              onClick={() => setActiveTab('payment')}
              className={`py-3 sm:py-4 px-4 sm:px-6 text-xs sm:text-sm font-medium border-b-2 whitespace-nowrap ${
                activeTab === 'payment'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Pembayaran
            </button>
            <button
              onClick={() => setActiveTab('integrations')}
              className={`py-3 sm:py-4 px-4 sm:px-6 text-xs sm:text-sm font-medium border-b-2 whitespace-nowrap ${
                activeTab === 'integrations'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Integrasi
            </button>
          </nav>
        </div>

        {/* General Settings */}
        {activeTab === 'general' && (
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-1">
                <h3 className="text-lg font-medium text-gray-900">Informasi Platform</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Informasi dasar tentang platform MahaBisa
                </p>
              </div>
              
              <div className="md:col-span-2">
                <div className="bg-white shadow-sm rounded-lg overflow-hidden">
                  <div className="p-6 space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Nama Platform
                      </label>
                      <input
                        type="text"
                        defaultValue="MahaBisa"
                        className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Tagline
                      </label>
                      <input
                        type="text"
                        defaultValue="Platform Freelance untuk Mahasiswa Indonesia"
                        className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Deskripsi Singkat
                      </label>
                      <textarea
                        rows="3"
                        defaultValue="MahaBisa adalah platform yang menghubungkan mahasiswa dengan skill freelance dan klien yang membutuhkan jasa mereka."
                        className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email Kontak
                      </label>
                      <input
                        type="email"
                        defaultValue="kontak@mahabisa.id"
                        className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Logo Platform
                      </label>
                      <div className="flex items-center mt-2">
                        <div className="w-16 h-16 rounded-lg bg-indigo-100 mr-4 flex items-center justify-center overflow-hidden">
                          <span className="text-indigo-600 font-bold text-2xl">M</span>
                        </div>
                        <div>
                          <button className="bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                            Ganti Logo
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white shadow-sm rounded-lg overflow-hidden mt-6">
                  <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
                    <h3 className="text-sm font-medium text-gray-900">
                      Pengaturan Umum
                    </h3>
                  </div>
                  
                  <div className="p-6 space-y-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-sm font-medium text-gray-900">Pendaftaran Pengguna Baru</h4>
                        <p className="text-sm text-gray-500">Izinkan pendaftaran pengguna baru pada platform</p>
                      </div>
                      <div className="flex items-center">
                        <button className="relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent bg-indigo-600 transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                          <span className="translate-x-5 inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out" />
                        </button>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-sm font-medium text-gray-900">Verifikasi Email</h4>
                        <p className="text-sm text-gray-500">Wajibkan verifikasi email untuk pendaftaran baru</p>
                      </div>
                      <div className="flex items-center">
                        <button className="relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent bg-indigo-600 transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                          <span className="translate-x-5 inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out" />
                        </button>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-sm font-medium text-gray-900">Mode Maintenance</h4>
                        <p className="text-sm text-gray-500">Aktifkan mode pemeliharaan website</p>
                      </div>
                      <div className="flex items-center">
                        <button className="relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent bg-gray-200 transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                          <span className="translate-x-0 inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Fee Settings Tab Content */}
        {activeTab === 'fee' && (
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-1">
                <h3 className="text-lg font-medium text-gray-900">Biaya & Komisi</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Pengaturan biaya dan komisi untuk transaksi di platform
                </p>
              </div>
              
              <div className="md:col-span-2">
                <div className="bg-white shadow-sm rounded-lg overflow-hidden">
                  <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
                    <h3 className="text-sm font-medium text-gray-900">
                      Komisi Platform
                    </h3>
                  </div>
                  
                  <div className="p-6 space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Persentase Komisi Platform (%)
                      </label>
                      <div className="mt-1 flex rounded-md shadow-sm">
                        <input
                          type="number"
                          defaultValue="20"
                          className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        />
                        <span className="inline-flex items-center px-3 rounded-r-md border border-l-0 border-gray-300 bg-gray-50 text-gray-500">%</span>
                      </div>
                      <p className="mt-2 text-sm text-gray-500">
                        Persentase yang diambil platform dari setiap proyek yang selesai
                      </p>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Komisi Minimum
                      </label>
                      <div className="mt-1 flex rounded-md shadow-sm">
                        <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500">Rp</span>
                        <input
                          type="number"
                          defaultValue="10000"
                          className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        />
                      </div>
                      <p className="mt-2 text-sm text-gray-500">
                        Jumlah minimum komisi yang diambil platform
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white shadow-sm rounded-lg overflow-hidden mt-6">
                  <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
                    <h3 className="text-sm font-medium text-gray-900">
                      Biaya Withdraw
                    </h3>
                  </div>
                  
                  <div className="p-6 space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Biaya Withdraw ke Bank
                      </label>
                      <div className="mt-1 flex rounded-md shadow-sm">
                        <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500">Rp</span>
                        <input
                          type="number"
                          defaultValue="5000"
                          className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Minimum Withdraw
                      </label>
                      <div className="mt-1 flex rounded-md shadow-sm">
                        <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500">Rp</span>
                        <input
                          type="number"
                          defaultValue="50000"
                          className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        />
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-sm font-medium text-gray-900">Aktifkan Penarikan Otomatis</h4>
                        <p className="text-sm text-gray-500">Penarikan secara otomatis setiap bulan</p>
                      </div>
                      <div className="flex items-center">
                        <button className="relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent bg-indigo-600 transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                          <span className="translate-x-5 inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6">
                  <button
                    onClick={() => setShowSaveModal(true)}
                    className="bg-indigo-600 border border-transparent rounded-md shadow-sm py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Simpan Perubahan
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Security Settings Tab Content */}
        {activeTab === 'security' && (
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-1">
                <h3 className="text-lg font-medium text-gray-900">Keamanan</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Pengaturan keamanan dan privasi platform
                </p>
              </div>
              
              <div className="md:col-span-2">
                <div className="bg-white shadow-sm rounded-lg overflow-hidden">
                  <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
                    <h3 className="text-sm font-medium text-gray-900">
                      Autentikasi
                    </h3>
                  </div>
                  
                  <div className="p-6 space-y-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-sm font-medium text-gray-900">Aktifkan 2FA</h4>
                        <p className="text-sm text-gray-500">Aktifkan Two-Factor Authentication untuk admin</p>
                      </div>
                      <div className="flex items-center">
                        <button className="relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent bg-indigo-600 transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                          <span className="translate-x-5 inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out" />
                        </button>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-sm font-medium text-gray-900">Login Social Media</h4>
                        <p className="text-sm text-gray-500">Izinkan login dengan akun sosial media</p>
                      </div>
                      <div className="flex items-center">
                        <button className="relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent bg-indigo-600 transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                          <span className="translate-x-5 inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out" />
                        </button>
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Masa Berlaku Session (jam)
                      </label>
                      <input
                        type="number"
                        defaultValue="24"
                        className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                      />
                      <p className="mt-2 text-sm text-gray-500">
                        Durasi masa berlaku sesi login dalam jam
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white shadow-sm rounded-lg overflow-hidden mt-6">
                  <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
                    <h3 className="text-sm font-medium text-gray-900">
                      Kebijakan Password
                    </h3>
                  </div>
                  
                  <div className="p-6 space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Panjang Minimum Password
                      </label>
                      <input
                        type="number"
                        defaultValue="8"
                        className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-sm font-medium text-gray-900">Wajib Kombinasi Huruf & Angka</h4>
                        <p className="text-sm text-gray-500">Password harus berisi huruf dan angka</p>
                      </div>
                      <div className="flex items-center">
                        <button className="relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent bg-indigo-600 transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                          <span className="translate-x-5 inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out" />
                        </button>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-sm font-medium text-gray-900">Wajib Karakter Khusus</h4>
                        <p className="text-sm text-gray-500">Password harus berisi karakter khusus</p>
                      </div>
                      <div className="flex items-center">
                        <button className="relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent bg-gray-200 transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                          <span className="translate-x-0 inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out" />
                        </button>
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Masa Berlaku Password (hari)
                      </label>
                      <input
                        type="number"
                        defaultValue="90"
                        className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                      />
                      <p className="mt-2 text-sm text-gray-500">
                        Wajib ganti password setelah periode ini (0 untuk tidak wajib)
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6">
                  <button
                    onClick={() => setShowSaveModal(true)}
                    className="bg-indigo-600 border border-transparent rounded-md shadow-sm py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Simpan Perubahan
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Email Settings Tab Content */}
        {activeTab === 'email' && (
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-1">
                <h3 className="text-lg font-medium text-gray-900">Konfigurasi Email</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Pengaturan server SMTP dan notifikasi email
                </p>
              </div>
              
              <div className="md:col-span-2">
                <div className="bg-white shadow-sm rounded-lg overflow-hidden">
                  <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
                    <h3 className="text-sm font-medium text-gray-900">
                      Pengaturan SMTP
                    </h3>
                  </div>
                  
                  <div className="p-6 space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        SMTP Server
                      </label>
                      <input
                        type="text"
                        defaultValue="smtp.mailtrap.io"
                        className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        SMTP Port
                      </label>
                      <input
                        type="number"
                        defaultValue="2525"
                        className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Username
                      </label>
                      <input
                        type="text"
                        defaultValue="mahabisa_smtp"
                        className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Password
                      </label>
                      <input
                        type="password"
                        defaultValue="********"
                        className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email Pengirim
                      </label>
                      <input
                        type="email"
                        defaultValue="noreply@mahabisa.id"
                        className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Nama Pengirim
                      </label>
                      <input
                        type="text"
                        defaultValue="MahaBisa Platform"
                        className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-sm font-medium text-gray-900">Enkripsi TLS/SSL</h4>
                        <p className="text-sm text-gray-500">Gunakan koneksi aman untuk SMTP</p>
                      </div>
                      <div className="flex items-center">
                        <button className="relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent bg-indigo-600 transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                          <span className="translate-x-5 inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out" />
                        </button>
                      </div>
                    </div>
                    
                    <div className="pt-3">
                      <button className="bg-indigo-100 text-indigo-700 border border-indigo-300 rounded-md shadow-sm py-2 px-4 text-sm font-medium hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                        Test Koneksi SMTP
                      </button>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white shadow-sm rounded-lg overflow-hidden mt-6">
                  <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
                    <h3 className="text-sm font-medium text-gray-900">
                      Notifikasi Email
                    </h3>
                  </div>
                  
                  <div className="p-6 space-y-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-sm font-medium text-gray-900">Email Verifikasi Akun</h4>
                        <p className="text-sm text-gray-500">Kirim email untuk verifikasi akun baru</p>
                      </div>
                      <div className="flex items-center">
                        <button className="relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent bg-indigo-600 transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                          <span className="translate-x-5 inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out" />
                        </button>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-sm font-medium text-gray-900">Notifikasi Proyek Baru</h4>
                        <p className="text-sm text-gray-500">Kirim email saat ada proyek baru</p>
                      </div>
                      <div className="flex items-center">
                        <button className="relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent bg-indigo-600 transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                          <span className="translate-x-5 inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out" />
                        </button>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-sm font-medium text-gray-900">Notifikasi Pembayaran</h4>
                        <p className="text-sm text-gray-500">Kirim email untuk update pembayaran</p>
                      </div>
                      <div className="flex items-center">
                        <button className="relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent bg-indigo-600 transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                          <span className="translate-x-5 inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out" />
                        </button>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-sm font-medium text-gray-900">Newsletter</h4>
                        <p className="text-sm text-gray-500">Kirim newsletter ke pengguna</p>
                      </div>
                      <div className="flex items-center">
                        <button className="relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent bg-gray-200 transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                          <span className="translate-x-0 inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6">
                  <button
                    onClick={() => setShowSaveModal(true)}
                    className="bg-indigo-600 border border-transparent rounded-md shadow-sm py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Simpan Perubahan
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Payment Settings Tab Content */}
        {activeTab === 'payment' && (
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-1">
                <h3 className="text-lg font-medium text-gray-900">Metode Pembayaran</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Konfigurasi gateway pembayaran dan metode yang diterima
                </p>
              </div>
              
              <div className="md:col-span-2">
                <div className="bg-white shadow-sm rounded-lg overflow-hidden">
                  <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
                    <h3 className="text-sm font-medium text-gray-900">
                      Gateway Pembayaran
                    </h3>
                  </div>
                  
                  <div className="p-6 space-y-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <img src="https://storage.googleapis.com/midtrans-production/uploads/midtrans-logo.png" alt="Midtrans" className="h-8 w-auto mr-4" />
                        <div>
                          <h4 className="text-sm font-medium text-gray-900">Midtrans</h4>
                          <p className="text-xs text-gray-500">Gateway pembayaran lokal Indonesia</p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <button className="relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent bg-indigo-600 transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                          <span className="translate-x-5 inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out" />
                        </button>
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Midtrans Client Key
                      </label>
                      <input
                        type="text"
                        defaultValue="SB-Mid-client-xxxxxxxxxxxxxxxx"
                        className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Midtrans Server Key
                      </label>
                      <input
                        type="password"
                        defaultValue="SB-Mid-server-xxxxxxxxxxxxxxxx"
                        className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-sm font-medium text-gray-900">Mode Sandbox</h4>
                        <p className="text-sm text-gray-500">Gunakan mode sandbox untuk testing</p>
                      </div>
                      <div className="flex items-center">
                        <button className="relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent bg-indigo-600 transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                          <span className="translate-x-5 inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out" />
                        </button>
                      </div>
                    </div>
                    
                    <hr className="my-4" />
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <svg className="h-8 w-8 mr-4 text-blue-500" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M9.5 6.5v3h-3v-3h3M11 5H5v6h6V5zm-1.5 9.5v3h-3v-3h3M11 13H5v6h6v-6zm6.5-6.5v3h-3v-3h3M19 5h-6v6h6V5zm-6 8h1.5v1.5H13V13zm1.5 1.5H16V16h-1.5v-1.5zM16 13h1.5v1.5H16V13zm-3 3h1.5v1.5H13V16zm1.5 1.5H16V19h-1.5v-1.5zM16 16h1.5v1.5H16V16zm1.5-1.5H19V16h-1.5v-1.5zm0 3H19V19h-1.5v-1.5zM22 7h-2V4h-3V2h5v5zm0 15v-5h-2v3h-3v2h5zM2 22h5v-2H4v-3H2v5zM2 2v5h2V4h3V2H2z" />
                        </svg>
                        <div>
                          <h4 className="text-sm font-medium text-gray-900">QRIS</h4>
                          <p className="text-xs text-gray-500">QR Code Payment Standard Indonesia</p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <button className="relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent bg-indigo-600 transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                          <span className="translate-x-5 inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white shadow-sm rounded-lg overflow-hidden mt-6">
                  <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
                    <h3 className="text-sm font-medium text-gray-900">
                      Metode Pembayaran
                    </h3>
                  </div>
                  
                  <div className="p-6 space-y-4">
                    <div className="flex items-center">
                      <input
                        id="payment-bank-transfer"
                        name="payment-methods"
                        type="checkbox"
                        defaultChecked
                        className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                      />
                      <label htmlFor="payment-bank-transfer" className="ml-2 block text-sm text-gray-900">
                        Transfer Bank (Virtual Account)
                      </label>
                    </div>
                    
                    <div className="flex items-center">
                      <input
                        id="payment-cc"
                        name="payment-methods"
                        type="checkbox"
                        defaultChecked
                        className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                      />
                      <label htmlFor="payment-cc" className="ml-2 block text-sm text-gray-900">
                        Kartu Kredit
                      </label>
                    </div>
                    
                    <div className="flex items-center">
                      <input
                        id="payment-ewallet"
                        name="payment-methods"
                        type="checkbox"
                        defaultChecked
                        className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                      />
                      <label htmlFor="payment-ewallet" className="ml-2 block text-sm text-gray-900">
                        E-Wallet (GoPay, OVO, DANA, LinkAja)
                      </label>
                    </div>
                    
                    <div className="flex items-center">
                      <input
                        id="payment-qris"
                        name="payment-methods"
                        type="checkbox"
                        defaultChecked
                        className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                      />
                      <label htmlFor="payment-qris" className="ml-2 block text-sm text-gray-900">
                        QRIS
                      </label>
                    </div>
                    
                    <div className="flex items-center">
                      <input
                        id="payment-paylater"
                        name="payment-methods"
                        type="checkbox"
                        className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                      />
                      <label htmlFor="payment-paylater" className="ml-2 block text-sm text-gray-900">
                        Cicilan & Paylater (Kredivo, Akulaku)
                      </label>
                    </div>
                    
                    <div className="flex items-center">
                      <input
                        id="payment-retail"
                        name="payment-methods"
                        type="checkbox"
                        defaultChecked
                        className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                      />
                      <label htmlFor="payment-retail" className="ml-2 block text-sm text-gray-900">
                        Retail (Alfamart, Indomaret)
                      </label>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6">
                  <button
                    onClick={() => setShowSaveModal(true)}
                    className="bg-indigo-600 border border-transparent rounded-md shadow-sm py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Simpan Perubahan
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Integrations Tab Content */}
        {activeTab === 'integrations' && (
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-1">
                <h3 className="text-lg font-medium text-gray-900">Integrasi</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Hubungkan platform dengan berbagai layanan pihak ketiga
                </p>
              </div>
              
              <div className="md:col-span-2">
                <div className="bg-white shadow-sm rounded-lg overflow-hidden">
                  <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
                    <h3 className="text-sm font-medium text-gray-900">
                      Analitik
                    </h3>
                  </div>
                  
                  <div className="p-6 space-y-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <svg className="h-8 w-8 mr-4 text-blue-500" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12.24 10.285V14.4h6.806c-.275 1.765-2.056 5.174-6.806 5.174-4.095 0-7.439-3.389-7.439-7.574s3.345-7.574 7.439-7.574c2.33 0 3.891.989 4.785 1.849l3.254-3.138C18.189 1.186 15.479 0 12.24 0c-6.635 0-12 5.365-12 12s5.365 12 12 12c6.926 0 11.52-4.869 11.52-11.726 0-.788-.085-1.39-.189-1.989H12.24z" />
                        </svg>
                        <div>
                          <h4 className="text-sm font-medium text-gray-900">Google Analytics</h4>
                          <p className="text-xs text-gray-500">Pantau traffic dan aktivitas pengguna</p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <button className="relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent bg-indigo-600 transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                          <span className="translate-x-5 inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out" />
                        </button>
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Tracking ID
                      </label>
                      <input
                        type="text"
                        defaultValue="G-XXXXXXXXXX"
                        className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                      />
                    </div>
                    
                    <hr className="my-4" />
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <svg className="h-8 w-8 mr-4 text-green-500" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M19.044 7.891c-.953-.382-1.972-.573-2.987-.57a7.412 7.412 0 0 0-3.056.678c-.685.313-1.277.702-1.757 1.156-.48-.453-1.073-.843-1.76-1.156A7.412 7.412 0 0 0 6.43 7.32c-1.015-.003-2.034.188-2.987.57A12.306 12.306 0 0 0 0 16.396c.01 2.822 2.311 4.79 4.539 5.082 1.748.227 3.42-.36 4.703-1.617a8.7 8.7 0 0 0 1.065-1.245c.034-.049.073-.094.103-.146.03.052.07.097.103.146.305.445.67.862 1.065 1.245 1.284 1.258 2.955 1.844 4.704 1.617 2.227-.293 4.53-2.258 4.538-5.085a12.305 12.305 0 0 0-1.776-8.507ZM7.983 17.96c-.902 0-1.651-.749-1.651-1.674 0-.925.75-1.674 1.651-1.674.905 0 1.655.749 1.655 1.674 0 .925-.747 1.673-1.655 1.673Zm5.46 0c-.905 0-1.655-.749-1.655-1.674 0-.925.75-1.674 1.655-1.674.902 0 1.651.749 1.651 1.674 0 .925-.749 1.673-1.651 1.673Z" />
                        </svg>
                        <div>
                          <h4 className="text-sm font-medium text-gray-900">Discord</h4>
                          <p className="text-xs text-gray-500">Webhook notifikasi ke channel Discord</p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <button className="relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent bg-indigo-600 transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                          <span className="translate-x-5 inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out" />
                        </button>
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Webhook URL
                      </label>
                      <input
                        type="text"
                        defaultValue="https://discord.com/api/webhooks/..."
                        className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                      />
                    </div>
                  </div>
                </div>
                
                <div className="bg-white shadow-sm rounded-lg overflow-hidden mt-6">
                  <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
                    <h3 className="text-sm font-medium text-gray-900">
                      Media Sosial
                    </h3>
                  </div>
                  
                  <div className="p-6 space-y-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <svg className="h-8 w-8 mr-4 text-blue-700" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.991 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.064 24 12.073z" />
                        </svg>
                        <div>
                          <h4 className="text-sm font-medium text-gray-900">Facebook</h4>
                          <p className="text-xs text-gray-500">Login dan berbagi ke Facebook</p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <button className="relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent bg-indigo-600 transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                          <span className="translate-x-5 inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out" />
                        </button>
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        App ID
                      </label>
                      <input
                        type="text"
                        defaultValue="123456789012345"
                        className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        App Secret
                      </label>
                      <input
                        type="password"
                        defaultValue="1234567890abcdef"
                        className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                      />
                    </div>
                    
                    <hr className="my-4" />
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <svg className="h-8 w-8 mr-4 text-blue-400" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                        </svg>
                        <div>
                          <h4 className="text-sm font-medium text-gray-900">Twitter</h4>
                          <p className="text-xs text-gray-500">Login dan berbagi ke Twitter</p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <button className="relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent bg-gray-200 transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                          <span className="translate-x-0 inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6">
                  <button
                    onClick={() => setShowSaveModal(true)}
                    className="bg-indigo-600 border border-transparent rounded-md shadow-sm py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Simpan Perubahan
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Save Changes Modal */}
      {showSaveModal && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-sm mx-auto">
            <div className="text-center">
              <svg className="mx-auto h-14 w-14 text-green-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Simpan Perubahan</h3>
              <p className="text-gray-500 mb-6">
                Apakah Anda yakin ingin menyimpan perubahan pada pengaturan sistem?
              </p>
              <div className="flex justify-center">
                <button 
                  onClick={() => setShowSaveModal(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md mr-3 hover:bg-gray-50"
                >
                  Batal
                </button>
                <button 
                  onClick={() => {
                    // Logic to save settings would go here
                    setShowSaveModal(false);
                  }}
                  className="px-4 py-2 text-sm font-medium text-white bg-green-600 border border-transparent rounded-md hover:bg-green-700"
                >
                  Ya, Simpan
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default Settings;
