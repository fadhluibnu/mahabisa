import React, { useState } from 'react';
import ClientLayout from './Components/ClientLayout';

const Settings = () => {
  // State for active tab
  const [activeTab, setActiveTab] = useState('account');

  // State for notification settings
  const [notifications, setNotifications] = useState({
    email: {
      projectUpdates: true,
      messages: true,
      promotions: false,
      newsletter: true
    },
    site: {
      projectUpdates: true,
      messages: true,
      promotions: true,
      newsletter: false
    }
  });

  // State for account form
  const [accountForm, setAccountForm] = useState({
    email: 'johndoe@example.com',
    phone: '+62 812-3456-7890',
    language: 'id',
    timezone: 'Asia/Jakarta'
  });

  // State for security form
  const [securityForm, setSecurityForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  // State for privacy settings
  const [privacySettings, setPrivacySettings] = useState({
    profileVisibility: 'public',
    showOnlineStatus: true,
    allowMessages: true
  });

  // State for billing information
  const [billingForm, setBillingForm] = useState({
    name: 'John Doe',
    company: 'ABC Company',
    address: 'Jl. Sudirman No. 123',
    city: 'Jakarta',
    postalCode: '12930',
    country: 'Indonesia',
    taxId: '12.345.678.9-012.000'
  });

  // Handle notification toggle
  const handleNotificationToggle = (type, key) => {
    setNotifications({
      ...notifications,
      [type]: {
        ...notifications[type],
        [key]: !notifications[type][key]
      }
    });
  };

  // Handle account form change
  const handleAccountChange = (e) => {
    const { name, value } = e.target;
    setAccountForm({
      ...accountForm,
      [name]: value
    });
  };

  // Handle security form change
  const handleSecurityChange = (e) => {
    const { name, value } = e.target;
    setSecurityForm({
      ...securityForm,
      [name]: value
    });
  };

  // Handle privacy settings change
  const handlePrivacyChange = (e) => {
    const { name, value, type, checked } = e.target;
    setPrivacySettings({
      ...privacySettings,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  // Handle billing form change
  const handleBillingChange = (e) => {
    const { name, value } = e.target;
    setBillingForm({
      ...billingForm,
      [name]: value
    });
  };

  // Handle form submission
  const handleSubmit = (e, formType) => {
    e.preventDefault();
    // In a real app, you would send this data to the server
    console.log(`Submitting ${formType} form:`, 
      formType === 'account' ? accountForm : 
      formType === 'security' ? securityForm : 
      formType === 'privacy' ? privacySettings : 
      billingForm
    );
    // Show success message or handle response
  };

  return (
    <ClientLayout title="Pengaturan" subtitle="Kelola preferensi dan keamanan akun Anda">
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-4">
          {/* Sidebar */}
          <div className="border-r border-gray-200 bg-gray-50 p-4">
            <nav className="space-y-1">
              <button
                onClick={() => setActiveTab('account')}                className={`flex items-center px-3 py-2 w-full text-left rounded-md text-sm font-medium ${
                  activeTab === 'account'
                    ? 'bg-indigo-50 text-indigo-700'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
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
                Akun
              </button>
              <button
                onClick={() => setActiveTab('security')}                className={`flex items-center px-3 py-2 w-full text-left rounded-md text-sm font-medium ${
                  activeTab === 'security'
                    ? 'bg-indigo-50 text-indigo-700'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
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
                Keamanan
              </button>
              <button
                onClick={() => setActiveTab('notifications')}                className={`flex items-center px-3 py-2 w-full text-left rounded-md text-sm font-medium ${
                  activeTab === 'notifications'
                    ? 'bg-indigo-50 text-indigo-700'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
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
              <button
                onClick={() => setActiveTab('privacy')}                className={`flex items-center px-3 py-2 w-full text-left rounded-md text-sm font-medium ${
                  activeTab === 'privacy'
                    ? 'bg-indigo-50 text-indigo-700'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
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
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
                Privasi
              </button>
              <button
                onClick={() => setActiveTab('billing')}                className={`flex items-center px-3 py-2 w-full text-left rounded-md text-sm font-medium ${
                  activeTab === 'billing'
                    ? 'bg-indigo-50 text-indigo-700'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
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
                    d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                  />
                </svg>
                Penagihan
              </button>
            </nav>
          </div>

          {/* Content area */}
          <div className="col-span-3 p-6">
            {/* Account Settings */}
            {activeTab === 'account' && (
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-6">Pengaturan Akun</h3>
                <form onSubmit={(e) => handleSubmit(e, 'account')}>
                  <div className="space-y-6">
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                        Email
                      </label>
                      <div className="mt-1">
                        <input
                          type="email"
                          name="email"
                          id="email"
                          className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                          value={accountForm.email}
                          onChange={handleAccountChange}
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                        Nomor Telepon
                      </label>
                      <div className="mt-1">
                        <input
                          type="tel"
                          name="phone"
                          id="phone"
                          className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                          value={accountForm.phone}
                          onChange={handleAccountChange}
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="language" className="block text-sm font-medium text-gray-700">
                        Bahasa
                      </label>
                      <div className="mt-1">
                        <select
                          id="language"
                          name="language"
                          className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                          value={accountForm.language}
                          onChange={handleAccountChange}
                        >
                          <option value="id">Bahasa Indonesia</option>
                          <option value="en">English</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label htmlFor="timezone" className="block text-sm font-medium text-gray-700">
                        Zona Waktu
                      </label>
                      <div className="mt-1">
                        <select
                          id="timezone"
                          name="timezone"
                          className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                          value={accountForm.timezone}
                          onChange={handleAccountChange}
                        >
                          <option value="Asia/Jakarta">Asia/Jakarta (GMT+7)</option>
                          <option value="Asia/Makassar">Asia/Makassar (GMT+8)</option>
                          <option value="Asia/Jayapura">Asia/Jayapura (GMT+9)</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6">
                    <button
                      type="submit"
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Simpan Perubahan
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Security Settings */}
            {activeTab === 'security' && (
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-6">Keamanan</h3>
                <form onSubmit={(e) => handleSubmit(e, 'security')}>
                  <div className="space-y-6">
                    <div>
                      <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700">
                        Password Saat Ini
                      </label>
                      <div className="mt-1">
                        <input
                          type="password"
                          name="currentPassword"
                          id="currentPassword"
                          className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                          value={securityForm.currentPassword}
                          onChange={handleSecurityChange}
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">
                        Password Baru
                      </label>
                      <div className="mt-1">
                        <input
                          type="password"
                          name="newPassword"
                          id="newPassword"
                          className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                          value={securityForm.newPassword}
                          onChange={handleSecurityChange}
                        />
                      </div>
                      <p className="mt-1 text-xs text-gray-500">
                        Password harus memiliki minimal 8 karakter dan mengandung huruf, angka, dan simbol.
                      </p>
                    </div>

                    <div>
                      <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                        Konfirmasi Password Baru
                      </label>
                      <div className="mt-1">
                        <input
                          type="password"
                          name="confirmPassword"
                          id="confirmPassword"
                          className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                          value={securityForm.confirmPassword}
                          onChange={handleSecurityChange}
                        />
                      </div>
                    </div>

                    <div className="pt-4 border-t border-gray-200">
                      <h4 className="text-sm font-medium text-gray-900 mb-3">Riwayat Login</h4>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium text-gray-900">Jakarta, Indonesia</p>
                            <p className="text-xs text-gray-500">Chrome di Windows &bull; 22 Juni 2023, 10:45</p>
                          </div>
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            Aktif
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium text-gray-900">Bandung, Indonesia</p>
                            <p className="text-xs text-gray-500">Safari di macOS &bull; 20 Juni 2023, 15:30</p>
                          </div>
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                            Tidak Aktif
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6">
                    <button
                      type="submit"
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Perbarui Password
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Notification Settings */}
            {activeTab === 'notifications' && (
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-6">Notifikasi</h3>
                
                <div className="space-y-6">
                  <div>
                    <h4 className="text-sm font-medium text-gray-900 mb-3">Notifikasi Email</h4>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-900">Update Proyek</p>
                          <p className="text-xs text-gray-500">Dapatkan email saat ada perubahan pada proyek Anda</p>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleNotificationToggle('email', 'projectUpdates')}
                          className={`${
                            notifications.email.projectUpdates ? 'bg-indigo-600' : 'bg-gray-200'
                          } relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
                        >
                          <span
                            className={`${
                              notifications.email.projectUpdates ? 'translate-x-5' : 'translate-x-0'
                            } pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200`}
                          ></span>
                        </button>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-900">Pesan Baru</p>
                          <p className="text-xs text-gray-500">Dapatkan email saat ada pesan baru</p>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleNotificationToggle('email', 'messages')}
                          className={`${
                            notifications.email.messages ? 'bg-indigo-600' : 'bg-gray-200'
                          } relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
                        >
                          <span
                            className={`${
                              notifications.email.messages ? 'translate-x-5' : 'translate-x-0'
                            } pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200`}
                          ></span>
                        </button>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-900">Promo & Diskon</p>
                          <p className="text-xs text-gray-500">Dapatkan email tentang penawaran khusus</p>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleNotificationToggle('email', 'promotions')}
                          className={`${
                            notifications.email.promotions ? 'bg-indigo-600' : 'bg-gray-200'
                          } relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
                        >
                          <span
                            className={`${
                              notifications.email.promotions ? 'translate-x-5' : 'translate-x-0'
                            } pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200`}
                          ></span>
                        </button>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-900">Newsletter</p>
                          <p className="text-xs text-gray-500">Dapatkan berita terbaru dan tip freelancing</p>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleNotificationToggle('email', 'newsletter')}
                          className={`${
                            notifications.email.newsletter ? 'bg-indigo-600' : 'bg-gray-200'
                          } relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
                        >
                          <span
                            className={`${
                              notifications.email.newsletter ? 'translate-x-5' : 'translate-x-0'
                            } pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200`}
                          ></span>
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="pt-6 border-t border-gray-200">
                    <h4 className="text-sm font-medium text-gray-900 mb-3">Notifikasi Website</h4>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-900">Update Proyek</p>
                          <p className="text-xs text-gray-500">Dapatkan notifikasi di situs saat ada perubahan pada proyek Anda</p>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleNotificationToggle('site', 'projectUpdates')}
                          className={`${
                            notifications.site.projectUpdates ? 'bg-indigo-600' : 'bg-gray-200'
                          } relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
                        >
                          <span
                            className={`${
                              notifications.site.projectUpdates ? 'translate-x-5' : 'translate-x-0'
                            } pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200`}
                          ></span>
                        </button>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-900">Pesan Baru</p>
                          <p className="text-xs text-gray-500">Dapatkan notifikasi di situs saat ada pesan baru</p>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleNotificationToggle('site', 'messages')}
                          className={`${
                            notifications.site.messages ? 'bg-indigo-600' : 'bg-gray-200'
                          } relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
                        >
                          <span
                            className={`${
                              notifications.site.messages ? 'translate-x-5' : 'translate-x-0'
                            } pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200`}
                          ></span>
                        </button>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-900">Promo & Diskon</p>
                          <p className="text-xs text-gray-500">Dapatkan notifikasi di situs tentang penawaran khusus</p>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleNotificationToggle('site', 'promotions')}
                          className={`${
                            notifications.site.promotions ? 'bg-indigo-600' : 'bg-gray-200'
                          } relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
                        >
                          <span
                            className={`${
                              notifications.site.promotions ? 'translate-x-5' : 'translate-x-0'
                            } pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200`}
                          ></span>
                        </button>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-900">Newsletter</p>
                          <p className="text-xs text-gray-500">Dapatkan notifikasi di situs tentang berita terbaru</p>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleNotificationToggle('site', 'newsletter')}
                          className={`${
                            notifications.site.newsletter ? 'bg-indigo-600' : 'bg-gray-200'
                          } relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
                        >
                          <span
                            className={`${
                              notifications.site.newsletter ? 'translate-x-5' : 'translate-x-0'
                            } pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200`}
                          ></span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6">
                  <button
                    type="button"
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Simpan Preferensi
                  </button>
                </div>
              </div>
            )}

            {/* Privacy Settings */}
            {activeTab === 'privacy' && (
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-6">Privasi</h3>
                <form onSubmit={(e) => handleSubmit(e, 'privacy')}>
                  <div className="space-y-6">
                    <div>
                      <label htmlFor="profileVisibility" className="block text-sm font-medium text-gray-700">
                        Visibilitas Profil
                      </label>
                      <div className="mt-1">
                        <select
                          id="profileVisibility"
                          name="profileVisibility"
                          className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                          value={privacySettings.profileVisibility}
                          onChange={handlePrivacyChange}
                        >
                          <option value="public">Publik - Semua orang dapat melihat</option>
                          <option value="limited">Terbatas - Hanya freelancer yang Anda hubungi</option>
                          <option value="private">Privat - Hanya freelancer yang bekerja dengan Anda</option>
                        </select>
                      </div>
                      <p className="mt-1 text-xs text-gray-500">
                        Kontrol siapa yang dapat melihat profil dan aktivitas Anda
                      </p>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-900">Tampilkan Status Online</p>
                        <p className="text-xs text-gray-500">Izinkan orang lain melihat saat Anda online</p>
                      </div>
                      <div className="flex items-center">
                        <input
                          id="showOnlineStatus"
                          name="showOnlineStatus"
                          type="checkbox"
                          className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                          checked={privacySettings.showOnlineStatus}
                          onChange={handlePrivacyChange}
                        />
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-900">Izinkan Pesan dari Freelancer</p>
                        <p className="text-xs text-gray-500">Terima pesan dari freelancer yang tidak bekerja dengan Anda</p>
                      </div>
                      <div className="flex items-center">
                        <input
                          id="allowMessages"
                          name="allowMessages"
                          type="checkbox"
                          className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                          checked={privacySettings.allowMessages}
                          onChange={handlePrivacyChange}
                        />
                      </div>
                    </div>

                    <div className="pt-6 border-t border-gray-200">
                      <h4 className="text-sm font-medium text-gray-900 mb-3">Data Akun</h4>
                      <div className="space-y-4">
                        <div>
                          <button
                            type="button"
                            className="text-sm text-red-600 hover:text-red-700 font-medium"
                          >
                            Unduh Data Saya
                          </button>
                          <p className="mt-1 text-xs text-gray-500">
                            Unduh salinan data pribadi Anda di MahaBisa
                          </p>
                        </div>
                        <div>
                          <button
                            type="button"
                            className="text-sm text-red-600 hover:text-red-700 font-medium"
                          >
                            Hapus Akun
                          </button>
                          <p className="mt-1 text-xs text-gray-500">
                            Hapus akun dan semua data terkait secara permanen
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6">
                    <button
                      type="submit"
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Simpan Pengaturan
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Billing Settings */}
            {activeTab === 'billing' && (
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-6">Informasi Penagihan</h3>
                <form onSubmit={(e) => handleSubmit(e, 'billing')}>
                  <div className="space-y-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                        Nama Lengkap / Nama Perusahaan
                      </label>
                      <div className="mt-1">
                        <input
                          type="text"
                          name="name"
                          id="name"
                          className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                          value={billingForm.name}
                          onChange={handleBillingChange}
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="company" className="block text-sm font-medium text-gray-700">
                        Nama Perusahaan (opsional)
                      </label>
                      <div className="mt-1">
                        <input
                          type="text"
                          name="company"
                          id="company"
                          className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                          value={billingForm.company}
                          onChange={handleBillingChange}
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                        Alamat
                      </label>
                      <div className="mt-1">
                        <input
                          type="text"
                          name="address"
                          id="address"
                          className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                          value={billingForm.address}
                          onChange={handleBillingChange}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                          Kota
                        </label>
                        <div className="mt-1">
                          <input
                            type="text"
                            name="city"
                            id="city"
                            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                            value={billingForm.city}
                            onChange={handleBillingChange}
                          />
                        </div>
                      </div>
                      <div>
                        <label htmlFor="postalCode" className="block text-sm font-medium text-gray-700">
                          Kode Pos
                        </label>
                        <div className="mt-1">
                          <input
                            type="text"
                            name="postalCode"
                            id="postalCode"
                            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                            value={billingForm.postalCode}
                            onChange={handleBillingChange}
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <label htmlFor="country" className="block text-sm font-medium text-gray-700">
                        Negara
                      </label>
                      <div className="mt-1">
                        <select
                          id="country"
                          name="country"
                          className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                          value={billingForm.country}
                          onChange={handleBillingChange}
                        >
                          <option value="Indonesia">Indonesia</option>
                          <option value="Malaysia">Malaysia</option>
                          <option value="Singapore">Singapore</option>
                          <option value="Other">Lainnya</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label htmlFor="taxId" className="block text-sm font-medium text-gray-700">
                        NPWP (opsional)
                      </label>
                      <div className="mt-1">
                        <input
                          type="text"
                          name="taxId"
                          id="taxId"
                          className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                          value={billingForm.taxId}
                          onChange={handleBillingChange}
                        />
                      </div>
                      <p className="mt-1 text-xs text-gray-500">
                        Untuk kebutuhan faktur pajak
                      </p>
                    </div>

                    <div className="pt-6 border-t border-gray-200">
                      <h4 className="text-sm font-medium text-gray-900 mb-3">Metode Pembayaran</h4>
                      <div className="flex items-center space-x-2 mb-4">
                        <button
                          type="button"
                          className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                          + Tambah Kartu Kredit
                        </button>
                        <button
                          type="button"
                          className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                          + Tambah Rekening Bank
                        </button>
                      </div>
                      <p className="text-xs text-gray-500">
                        Belum ada metode pembayaran yang tersimpan
                      </p>
                    </div>
                  </div>

                  <div className="mt-6">
                    <button
                      type="submit"
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Simpan Informasi Penagihan
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </ClientLayout>
  );
};

export default Settings;
