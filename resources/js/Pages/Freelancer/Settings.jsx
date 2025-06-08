import React, { useState } from 'react';
import FreelancerLayout from './Components/FreelancerLayout';

const Settings = () => {
  const [activeTab, setActiveTab] = useState('account');
  const [profileForm, setProfileForm] = useState({
    name: 'Aditya Pratama',
    email: 'aditya.pratama@example.com',
    phone: '081234567890',
    bio: 'Web developer dengan pengalaman 5 tahun dalam pengembangan aplikasi berbasis web menggunakan React, Laravel, dan TailwindCSS.',
    location: 'Jakarta, Indonesia',
    website: 'https://adityapratama.id',
  });

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    projectUpdates: true,
    newMessages: true,
    newReviews: true,
    paymentUpdates: true,
    marketingEmails: false,
  });

  const [privacySettings, setPrivacySettings] = useState({
    profileVisibility: 'public',
    showEarnings: false,
    showCompletedProjects: true,
    showRatings: true,
  });

  const handleProfileUpdate = (e) => {
    e.preventDefault();
    // In a real app, we would send this data to the server
    alert('Profil berhasil diperbarui');
  };

  const handlePasswordUpdate = (e) => {
    e.preventDefault();
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      alert('Konfirmasi password tidak cocok');
      return;
    }
    // In a real app, we would send this data to the server
    alert('Password berhasil diperbarui');
    setPasswordForm({
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    });
  };

  const handleNotificationUpdate = (e) => {
    e.preventDefault();
    // In a real app, we would send this data to the server
    alert('Pengaturan notifikasi berhasil diperbarui');
  };

  const handlePrivacyUpdate = (e) => {
    e.preventDefault();
    // In a real app, we would send this data to the server
    alert('Pengaturan privasi berhasil diperbarui');
  };

  return (
    <FreelancerLayout
      title="Pengaturan"
      subtitle="Kelola pengaturan akun dan preferensi Anda"
    >
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-4 sm:p-6 border-b border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900">Pengaturan</h3>
            </div>
            <nav className="p-4">
              <ul className="space-y-1">
                <li>
                  <button
                    onClick={() => setActiveTab('account')}
                    className={`w-full flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                      activeTab === 'account'
                        ? 'bg-indigo-50 text-indigo-700'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                  >
                    <svg
                      className="mr-3 h-5 w-5"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                    Akun & Profil
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActiveTab('password')}
                    className={`w-full flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                      activeTab === 'password'
                        ? 'bg-indigo-50 text-indigo-700'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                  >
                    <svg
                      className="mr-3 h-5 w-5"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
                      />
                    </svg>
                    Password & Keamanan
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActiveTab('notifications')}
                    className={`w-full flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                      activeTab === 'notifications'
                        ? 'bg-indigo-50 text-indigo-700'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                  >
                    <svg
                      className="mr-3 h-5 w-5"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                      />
                    </svg>
                    Notifikasi
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActiveTab('privacy')}
                    className={`w-full flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                      activeTab === 'privacy'
                        ? 'bg-indigo-50 text-indigo-700'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                  >
                    <svg
                      className="mr-3 h-5 w-5"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                      />
                    </svg>
                    Privasi
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        </div>

        {/* Main content */}
        <div className="lg:col-span-3">
          {/* Account Settings */}
          {activeTab === 'account' && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-4 sm:p-6 border-b border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900">Informasi Akun & Profil</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Perbarui informasi profil dan kontak Anda.
                </p>
              </div>
              <div className="p-4 sm:p-6">
                <form onSubmit={handleProfileUpdate}>
                  <div className="space-y-6">
                    <div className="flex flex-col md:flex-row md:items-center">
                      <div className="flex-shrink-0 mb-4 md:mb-0 md:mr-6">
                        <img
                          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                          alt="Profile"
                          className="h-24 w-24 rounded-full object-cover"
                        />
                        <div className="mt-2">
                          <button
                            type="button"
                            className="inline-flex items-center px-3 py-1 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                          >
                            <svg
                              className="h-4 w-4 mr-1"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                              />
                            </svg>
                            Ubah Foto
                          </button>
                        </div>
                      </div>
                      <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                            Nama Lengkap
                          </label>
                          <input
                            type="text"
                            id="name"
                            value={profileForm.name}
                            onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                          />
                        </div>
                        <div>
                          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email
                          </label>
                          <input
                            type="email"
                            id="email"
                            value={profileForm.email}
                            onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                          Nomor Telepon
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          value={profileForm.phone}
                          onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                      </div>
                      <div>
                        <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                          Lokasi
                        </label>
                        <input
                          type="text"
                          id="location"
                          value={profileForm.location}
                          onChange={(e) => setProfileForm({ ...profileForm, location: e.target.value })}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="website" className="block text-sm font-medium text-gray-700">
                        Website / Portfolio
                      </label>
                      <input
                        type="url"
                        id="website"
                        value={profileForm.website}
                        onChange={(e) => setProfileForm({ ...profileForm, website: e.target.value })}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                    </div>

                    <div>
                      <label htmlFor="bio" className="block text-sm font-medium text-gray-700">
                        Bio / Deskripsi Singkat
                      </label>
                      <textarea
                        id="bio"
                        rows={4}
                        value={profileForm.bio}
                        onChange={(e) => setProfileForm({ ...profileForm, bio: e.target.value })}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                      <p className="mt-1 text-xs text-gray-500">
                        Deskripsi singkat tentang Anda yang akan ditampilkan di profil Anda.
                      </p>
                    </div>

                    <div className="flex justify-end">
                      <button
                        type="submit"
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        Simpan Perubahan
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* Password Settings */}
          {activeTab === 'password' && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-4 sm:p-6 border-b border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900">Password & Keamanan</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Perbarui password dan pengaturan keamanan akun Anda.
                </p>
              </div>
              <div className="p-4 sm:p-6">
                <form onSubmit={handlePasswordUpdate}>
                  <div className="space-y-6">
                    <div>
                      <label htmlFor="current-password" className="block text-sm font-medium text-gray-700">
                        Password Saat Ini
                      </label>
                      <input
                        type="password"
                        id="current-password"
                        value={passwordForm.currentPassword}
                        onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                    </div>

                    <div>
                      <label htmlFor="new-password" className="block text-sm font-medium text-gray-700">
                        Password Baru
                      </label>
                      <input
                        type="password"
                        id="new-password"
                        value={passwordForm.newPassword}
                        onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                      <p className="mt-1 text-xs text-gray-500">
                        Password harus terdiri dari minimal 8 karakter dengan kombinasi huruf, angka, dan simbol.
                      </p>
                    </div>

                    <div>
                      <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700">
                        Konfirmasi Password Baru
                      </label>
                      <input
                        type="password"
                        id="confirm-password"
                        value={passwordForm.confirmPassword}
                        onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                    </div>

                    <div className="flex justify-end">
                      <button
                        type="submit"
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        Perbarui Password
                      </button>
                    </div>
                  </div>
                </form>

                <div className="mt-10 pt-10 border-t border-gray-200">
                  <h4 className="text-base font-medium text-gray-900">Aktivitas Login</h4>
                  <p className="mt-1 text-sm text-gray-500">
                    Berikut adalah daftar perangkat yang telah login ke akun Anda.
                  </p>

                  <div className="mt-4 space-y-4">
                    <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                      <div>
                        <div className="flex items-center">
                          <svg
                            className="h-5 w-5 text-gray-500 mr-2"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                            />
                          </svg>
                          <span className="text-sm font-medium text-gray-900">Windows PC - Chrome</span>
                        </div>
                        <div className="mt-1 text-xs text-gray-500">Jakarta, Indonesia - 31 Mei 2025, 10:25 WIB</div>
                      </div>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        Perangkat Ini
                      </span>
                    </div>

                    <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                      <div>
                        <div className="flex items-center">
                          <svg
                            className="h-5 w-5 text-gray-500 mr-2"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
                            />
                          </svg>
                          <span className="text-sm font-medium text-gray-900">iPhone - Safari</span>
                        </div>
                        <div className="mt-1 text-xs text-gray-500">Jakarta, Indonesia - 29 Mei 2025, 15:10 WIB</div>
                      </div>
                      <button
                        type="button"
                        className="inline-flex items-center px-2 py-1 border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        Keluarkan
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Notification Settings */}
          {activeTab === 'notifications' && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-4 sm:p-6 border-b border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900">Pengaturan Notifikasi</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Atur preferensi notifikasi dan pemberitahuan.
                </p>
              </div>
              <div className="p-4 sm:p-6">
                <form onSubmit={handleNotificationUpdate}>
                  <div className="space-y-6">
                    <div className="flex items-start">
                      <div className="flex items-center h-5">
                        <input
                          id="emailNotifications"
                          type="checkbox"
                          checked={notificationSettings.emailNotifications}
                          onChange={() => setNotificationSettings({
                            ...notificationSettings,
                            emailNotifications: !notificationSettings.emailNotifications,
                          })}
                          className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                        />
                      </div>
                      <div className="ml-3 text-sm">
                        <label htmlFor="emailNotifications" className="font-medium text-gray-700">Notifikasi Email</label>
                        <p className="text-gray-500">Aktifkan untuk menerima semua notifikasi melalui email.</p>
                      </div>
                    </div>

                    <div className="space-y-4 ml-6">
                      <div className="flex items-start">
                        <div className="flex items-center h-5">
                          <input
                            id="projectUpdates"
                            type="checkbox"
                            checked={notificationSettings.projectUpdates}
                            onChange={() => setNotificationSettings({
                              ...notificationSettings,
                              projectUpdates: !notificationSettings.projectUpdates,
                            })}
                            disabled={!notificationSettings.emailNotifications}
                            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                          />
                        </div>
                        <div className="ml-3 text-sm">
                          <label htmlFor="projectUpdates" className={`font-medium ${notificationSettings.emailNotifications ? 'text-gray-700' : 'text-gray-400'}`}>
                            Update Proyek
                          </label>
                          <p className={notificationSettings.emailNotifications ? 'text-gray-500' : 'text-gray-400'}>
                            Pemberitahuan tentang perubahan status proyek, deadline, dan lainnya.
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <div className="flex items-center h-5">
                          <input
                            id="newMessages"
                            type="checkbox"
                            checked={notificationSettings.newMessages}
                            onChange={() => setNotificationSettings({
                              ...notificationSettings,
                              newMessages: !notificationSettings.newMessages,
                            })}
                            disabled={!notificationSettings.emailNotifications}
                            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                          />
                        </div>
                        <div className="ml-3 text-sm">
                          <label htmlFor="newMessages" className={`font-medium ${notificationSettings.emailNotifications ? 'text-gray-700' : 'text-gray-400'}`}>
                            Pesan Baru
                          </label>
                          <p className={notificationSettings.emailNotifications ? 'text-gray-500' : 'text-gray-400'}>
                            Pemberitahuan saat Anda menerima pesan baru dari klien.
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <div className="flex items-center h-5">
                          <input
                            id="newReviews"
                            type="checkbox"
                            checked={notificationSettings.newReviews}
                            onChange={() => setNotificationSettings({
                              ...notificationSettings,
                              newReviews: !notificationSettings.newReviews,
                            })}
                            disabled={!notificationSettings.emailNotifications}
                            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                          />
                        </div>
                        <div className="ml-3 text-sm">
                          <label htmlFor="newReviews" className={`font-medium ${notificationSettings.emailNotifications ? 'text-gray-700' : 'text-gray-400'}`}>
                            Ulasan Baru
                          </label>
                          <p className={notificationSettings.emailNotifications ? 'text-gray-500' : 'text-gray-400'}>
                            Pemberitahuan saat Anda menerima ulasan baru dari klien.
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <div className="flex items-center h-5">
                          <input
                            id="paymentUpdates"
                            type="checkbox"
                            checked={notificationSettings.paymentUpdates}
                            onChange={() => setNotificationSettings({
                              ...notificationSettings,
                              paymentUpdates: !notificationSettings.paymentUpdates,
                            })}
                            disabled={!notificationSettings.emailNotifications}
                            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                          />
                        </div>
                        <div className="ml-3 text-sm">
                          <label htmlFor="paymentUpdates" className={`font-medium ${notificationSettings.emailNotifications ? 'text-gray-700' : 'text-gray-400'}`}>
                            Update Pembayaran
                          </label>
                          <p className={notificationSettings.emailNotifications ? 'text-gray-500' : 'text-gray-400'}>
                            Pemberitahuan tentang pembayaran yang diterima atau diproses.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="flex items-center h-5">
                        <input
                          id="marketingEmails"
                          type="checkbox"
                          checked={notificationSettings.marketingEmails}
                          onChange={() => setNotificationSettings({
                            ...notificationSettings,
                            marketingEmails: !notificationSettings.marketingEmails,
                          })}
                          className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                        />
                      </div>
                      <div className="ml-3 text-sm">
                        <label htmlFor="marketingEmails" className="font-medium text-gray-700">Email Marketing</label>
                        <p className="text-gray-500">
                          Terima email tentang tips freelancing, penawaran khusus, dan update platform.
                        </p>
                      </div>
                    </div>

                    <div className="flex justify-end">
                      <button
                        type="submit"
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        Simpan Perubahan
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* Privacy Settings */}
          {activeTab === 'privacy' && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-4 sm:p-6 border-b border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900">Pengaturan Privasi</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Atur siapa yang dapat melihat informasi profil Anda.
                </p>
              </div>
              <div className="p-4 sm:p-6">
                <form onSubmit={handlePrivacyUpdate}>
                  <div className="space-y-6">
                    <div>
                      <label htmlFor="profileVisibility" className="block text-sm font-medium text-gray-700">
                        Visibilitas Profil
                      </label>
                      <select
                        id="profileVisibility"
                        value={privacySettings.profileVisibility}
                        onChange={(e) => setPrivacySettings({
                          ...privacySettings,
                          profileVisibility: e.target.value,
                        })}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      >
                        <option value="public">Publik - Semua orang dapat melihat profil Anda</option>
                        <option value="registered">Terdaftar - Hanya pengguna terdaftar yang dapat melihat profil Anda</option>
                        <option value="clients">Klien - Hanya klien yang pernah bekerja dengan Anda yang dapat melihat profil lengkap</option>
                      </select>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-start">
                        <div className="flex items-center h-5">
                          <input
                            id="showEarnings"
                            type="checkbox"
                            checked={privacySettings.showEarnings}
                            onChange={() => setPrivacySettings({
                              ...privacySettings,
                              showEarnings: !privacySettings.showEarnings,
                            })}
                            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                          />
                        </div>
                        <div className="ml-3 text-sm">
                          <label htmlFor="showEarnings" className="font-medium text-gray-700">Tampilkan Penghasilan</label>
                          <p className="text-gray-500">
                            Izinkan pengunjung profil melihat estimasi penghasilan Anda.
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <div className="flex items-center h-5">
                          <input
                            id="showCompletedProjects"
                            type="checkbox"
                            checked={privacySettings.showCompletedProjects}
                            onChange={() => setPrivacySettings({
                              ...privacySettings,
                              showCompletedProjects: !privacySettings.showCompletedProjects,
                            })}
                            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                          />
                        </div>
                        <div className="ml-3 text-sm">
                          <label htmlFor="showCompletedProjects" className="font-medium text-gray-700">Tampilkan Proyek Selesai</label>
                          <p className="text-gray-500">
                            Izinkan pengunjung profil melihat proyek yang telah Anda selesaikan.
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <div className="flex items-center h-5">
                          <input
                            id="showRatings"
                            type="checkbox"
                            checked={privacySettings.showRatings}
                            onChange={() => setPrivacySettings({
                              ...privacySettings,
                              showRatings: !privacySettings.showRatings,
                            })}
                            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                          />
                        </div>
                        <div className="ml-3 text-sm">
                          <label htmlFor="showRatings" className="font-medium text-gray-700">Tampilkan Rating & Ulasan</label>
                          <p className="text-gray-500">
                            Izinkan pengunjung profil melihat rating dan ulasan yang Anda terima.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-end">
                      <button
                        type="submit"
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        Simpan Perubahan
                      </button>
                    </div>
                  </div>
                </form>

                <div className="mt-10 pt-10 border-t border-gray-200">
                  <h4 className="text-base font-medium text-gray-900">Penghapusan Akun</h4>
                  <p className="mt-1 text-sm text-gray-500">
                    Setelah Anda menghapus akun, semua data Anda akan dihapus secara permanen dan tidak dapat dipulihkan.
                  </p>
                  <div className="mt-4">
                    <button
                      type="button"
                      className="inline-flex items-center px-4 py-2 border border-red-300 shadow-sm text-sm font-medium rounded-md text-red-700 bg-white hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                    >
                      Hapus Akun Saya
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </FreelancerLayout>
  );
};

export default Settings;
