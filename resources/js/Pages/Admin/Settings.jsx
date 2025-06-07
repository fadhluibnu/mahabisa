import React, { useState, useEffect } from 'react';
// import { Inertia } from '@inertiajs/inertia';
import AdminLayout from './Components/AdminLayout';

const Settings = ({ settings, user }) => {
  const [activeTab, setActiveTab] = useState('general');
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [formData, setFormData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  
  // Initialize state from props when component mounts
  useEffect(() => {
    const initialData = {};
    
    // General settings
    initialData.allow_registration = settings.general.allow_registration;
    initialData.maintenance_mode = settings.general.maintenance_mode;
    
    // Fee settings
    initialData.platform_fee_percentage = settings.fee.platform_fee_percentage;
    initialData.minimum_commission = settings.fee.minimum_commission;
    initialData.withdraw_fee = settings.fee.withdraw_fee;
    initialData.minimum_withdraw = settings.fee.minimum_withdraw;
    initialData.automatic_withdrawal = settings.fee.automatic_withdrawal;
    
    // Security settings
    initialData.password_min_length = settings.security.password_min_length;
    initialData.password_require_letters_numbers = settings.security.password_require_letters_numbers;
    initialData.password_require_special_chars = settings.security.password_require_special_chars;
    initialData.password_expiry_days = settings.security.password_expiry_days;
    
    // Payment settings
    initialData.enable_midtrans = settings.payment.enable_midtrans;
    initialData.midtrans_client_key = settings.payment.midtrans_client_key;
    initialData.midtrans_server_key = settings.payment.midtrans_server_key;
    initialData.midtrans_sandbox = settings.payment.midtrans_sandbox;
    initialData.enable_qris = settings.payment.enable_qris;
    
    setFormData(initialData);
  }, [settings]);
  
  // Function to handle toggle click
  const handleToggle = (field) => {
    setFormData(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  // Function to handle input change
  const handleChange = (e) => {
    const { name, value, type } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'number' ? Number(value) : value
    }));
  };
  
  // Function to save settings
  const saveSettings = () => {
    setIsLoading(true);
    setSuccessMessage('');
    setErrorMessage('');
    
    // Send settings to the server
    axios.post('/admin/settings', formData)
      .then(response => {
        setIsLoading(false);
        setShowSaveModal(false);
        setSuccessMessage('Pengaturan berhasil disimpan');
        
        // Show success message for 3 seconds
        setTimeout(() => {
          setSuccessMessage('');
        }, 3000);
      })
      .catch(error => {
        setIsLoading(false);
        setShowSaveModal(false);
        setErrorMessage('Gagal menyimpan pengaturan: ' + (error.response?.data?.message || 'Terjadi kesalahan'));
        
        // Show error message for 5 seconds
        setTimeout(() => {
          setErrorMessage('');
        }, 5000);
      });
  };

  // Toggle UI component to reuse with enhanced animations
  const ToggleSwitch = ({ enabled, onChange }) => (
    <button 
      type="button"
      onClick={onChange}
      className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${enabled ? 'bg-indigo-600' : 'bg-gray-200'}`}
      aria-pressed={enabled}
      aria-label="Toggle setting"
    >
      <span className="sr-only">{enabled ? 'Enabled' : 'Disabled'}</span>
      <span 
        className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition-all duration-300 ease-in-out ${enabled ? 'translate-x-5' : 'translate-x-0'}`} 
      />
    </button>
  );

  return (
    <AdminLayout
      title='Pengaturan Sistem'
      subtitle='Konfigurasi platform MahaBisa'
    >
      {/* Success message */}
      {successMessage && (
        <div className="mb-4 p-4 bg-green-100 border border-green-200 text-green-700 rounded-md">
          {successMessage}
        </div>
      )}
      
      {/* Error message */}
      {errorMessage && (
        <div className="mb-4 p-4 bg-red-100 border border-red-200 text-red-700 rounded-md">
          {errorMessage}
        </div>
      )}
      
      <div className='bg-white rounded-xl shadow-sm border border-gray-200 mb-8'>
        <div className='border-b border-gray-200'>
          <nav
            className='flex -mb-px overflow-x-auto scrollbar-hide'
            aria-label='Tabs'
          >
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
              onClick={() => setActiveTab('payment')}
              className={`py-3 sm:py-4 px-4 sm:px-6 text-xs sm:text-sm font-medium border-b-2 whitespace-nowrap ${
                activeTab === 'payment'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Pembayaran
            </button>
          </nav>
        </div>

        {/* General Settings */}
        {activeTab === 'general' && (
          <div className='p-6'>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
              <div className='md:col-span-1'>
                <h3 className='text-lg font-medium text-gray-900'>
                  Informasi Platform
                </h3>
                <p className='mt-1 text-sm text-gray-500'>
                  Informasi dasar tentang platform MahaBisa
                </p>
              </div>

              <div className='md:col-span-2'>
                <div className='bg-white shadow-sm rounded-lg overflow-hidden mt-6'>
                  <div className='px-6 py-4 bg-gray-50 border-b border-gray-200'>
                    <h3 className='text-sm font-medium text-gray-900'>
                      Pengaturan Umum
                    </h3>
                  </div>

                  <div className='p-6 space-y-6'>
                    <div className='flex items-center justify-between'>
                      <div>
                        <h4 className='text-sm font-medium text-gray-900'>
                          Pendaftaran Pengguna Baru
                        </h4>
                        <p className='text-sm text-gray-500'>
                          Izinkan pendaftaran pengguna baru pada platform
                        </p>
                      </div>
                      <div className='flex items-center'>
                        <ToggleSwitch 
                          enabled={formData.allow_registration} 
                          onChange={() => handleToggle('allow_registration')} 
                        />
                      </div>
                    </div>

                    <div className='flex items-center justify-between'>
                      <div>
                        <h4 className='text-sm font-medium text-gray-900'>
                          Mode Maintenance
                        </h4>
                        <p className='text-sm text-gray-500'>
                          Aktifkan mode pemeliharaan website
                        </p>
                      </div>
                      <div className='flex items-center'>
                        <ToggleSwitch 
                          enabled={formData.maintenance_mode} 
                          onChange={() => handleToggle('maintenance_mode')} 
                        />
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className='mt-6'>
                  <button
                    onClick={() => setShowSaveModal(true)}
                    className='bg-indigo-600 border border-transparent rounded-md shadow-sm py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                  >
                    Simpan Perubahan
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Fee Settings Tab Content */}
        {activeTab === 'fee' && (
          <div className='p-6'>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
              <div className='md:col-span-1'>
                <h3 className='text-lg font-medium text-gray-900'>
                  Biaya & Komisi
                </h3>
                <p className='mt-1 text-sm text-gray-500'>
                  Pengaturan biaya dan komisi untuk transaksi di platform
                </p>
              </div>

              <div className='md:col-span-2'>
                <div className='bg-white shadow-sm rounded-lg overflow-hidden'>
                  <div className='px-6 py-4 bg-gray-50 border-b border-gray-200'>
                    <h3 className='text-sm font-medium text-gray-900'>
                      Komisi Platform
                    </h3>
                  </div>

                  <div className='p-6 space-y-6'>
                    <div>
                      <label className='block text-sm font-medium text-gray-700 mb-1'>
                        Persentase Komisi Platform (%)
                      </label>
                      <div className='mt-1 flex rounded-md shadow-sm'>
                        <input
                          type='number'
                          name='platform_fee_percentage'
                          value={formData.platform_fee_percentage || ''}
                          onChange={handleChange}
                          className='flex-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50'
                        />
                        <span className='inline-flex items-center px-3 rounded-r-md border border-l-0 border-gray-300 bg-gray-50 text-gray-500'>
                          %
                        </span>
                      </div>
                      <p className='mt-2 text-sm text-gray-500'>
                        Persentase yang diambil platform dari setiap proyek yang
                        selesai
                      </p>
                    </div>

                    <div>
                      <label className='block text-sm font-medium text-gray-700 mb-1'>
                        Komisi Minimum
                      </label>
                      <div className='mt-1 flex rounded-md shadow-sm'>
                        <span className='inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500'>
                          Rp
                        </span>
                        <input
                          type='number'
                          name='minimum_commission'
                          value={formData.minimum_commission || ''}
                          onChange={handleChange}
                          className='flex-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50'
                        />
                      </div>
                      <p className='mt-2 text-sm text-gray-500'>
                        Jumlah minimum komisi yang diambil platform
                      </p>
                    </div>
                  </div>
                </div>

                <div className='bg-white shadow-sm rounded-lg overflow-hidden mt-6'>
                  <div className='px-6 py-4 bg-gray-50 border-b border-gray-200'>
                    <h3 className='text-sm font-medium text-gray-900'>
                      Biaya Withdraw
                    </h3>
                  </div>

                  <div className='p-6 space-y-6'>
                    <div>
                      <label className='block text-sm font-medium text-gray-700 mb-1'>
                        Biaya Withdraw ke Bank
                      </label>
                      <div className='mt-1 flex rounded-md shadow-sm'>
                        <span className='inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500'>
                          Rp
                        </span>
                        <input
                          type='number'
                          name='withdraw_fee'
                          value={formData.withdraw_fee || ''}
                          onChange={handleChange}
                          className='flex-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50'
                        />
                      </div>
                    </div>

                    <div>
                      <label className='block text-sm font-medium text-gray-700 mb-1'>
                        Minimum Withdraw
                      </label>
                      <div className='mt-1 flex rounded-md shadow-sm'>
                        <span className='inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500'>
                          Rp
                        </span>
                        <input
                          type='number'
                          name='minimum_withdraw'
                          value={formData.minimum_withdraw || ''}
                          onChange={handleChange}
                          className='flex-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50'
                        />
                      </div>
                    </div>

                    <div className='flex items-center justify-between'>
                      <div>
                        <h4 className='text-sm font-medium text-gray-900'>
                          Aktifkan Penarikan Otomatis
                        </h4>
                        <p className='text-sm text-gray-500'>
                          Penarikan secara otomatis setiap bulan
                        </p>
                      </div>
                      <div className='flex items-center'>
                        <ToggleSwitch 
                          enabled={formData.automatic_withdrawal} 
                          onChange={() => handleToggle('automatic_withdrawal')} 
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className='mt-6'>
                  <button
                    onClick={() => setShowSaveModal(true)}
                    className='bg-indigo-600 border border-transparent rounded-md shadow-sm py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
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
          <div className='p-6'>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
              <div className='md:col-span-1'>
                <h3 className='text-lg font-medium text-gray-900'>Keamanan</h3>
                <p className='mt-1 text-sm text-gray-500'>
                  Pengaturan keamanan dan privasi platform
                </p>
              </div>

              <div className='md:col-span-2'>
                <div className='bg-white shadow-sm rounded-lg overflow-hidden mt-6'>
                  <div className='px-6 py-4 bg-gray-50 border-b border-gray-200'>
                    <h3 className='text-sm font-medium text-gray-900'>
                      Kebijakan Password
                    </h3>
                  </div>

                  <div className='p-6 space-y-6'>
                    <div>
                      <label className='block text-sm font-medium text-gray-700 mb-1'>
                        Panjang Minimum Password
                      </label>
                      <input
                        type='number'
                        name='password_min_length'
                        value={formData.password_min_length || ''}
                        onChange={handleChange}
                        className='w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50'
                      />
                    </div>

                    <div className='flex items-center justify-between'>
                      <div>
                        <h4 className='text-sm font-medium text-gray-900'>
                          Wajib Kombinasi Huruf & Angka
                        </h4>
                        <p className='text-sm text-gray-500'>
                          Password harus berisi huruf dan angka
                        </p>
                      </div>
                      <div className='flex items-center'>
                        <ToggleSwitch 
                          enabled={formData.password_require_letters_numbers} 
                          onChange={() => handleToggle('password_require_letters_numbers')} 
                        />
                      </div>
                    </div>

                    <div className='flex items-center justify-between'>
                      <div>
                        <h4 className='text-sm font-medium text-gray-900'>
                          Wajib Karakter Khusus
                        </h4>
                        <p className='text-sm text-gray-500'>
                          Password harus berisi karakter khusus
                        </p>
                      </div>
                      <div className='flex items-center'>
                        <ToggleSwitch 
                          enabled={formData.password_require_special_chars} 
                          onChange={() => handleToggle('password_require_special_chars')} 
                        />
                      </div>
                    </div>

                    <div>
                      <label className='block text-sm font-medium text-gray-700 mb-1'>
                        Masa Berlaku Password (hari)
                      </label>
                      <input
                        type='number'
                        name='password_expiry_days'
                        value={formData.password_expiry_days || ''}
                        onChange={handleChange}
                        className='w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50'
                      />
                      <p className='mt-2 text-sm text-gray-500'>
                        Wajib ganti password setelah periode ini (0 untuk tidak
                        wajib)
                      </p>
                    </div>
                  </div>
                </div>

                <div className='mt-6'>
                  <button
                    onClick={() => setShowSaveModal(true)}
                    className='bg-indigo-600 border border-transparent rounded-md shadow-sm py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
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
          <div className='p-6'>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
              <div className='md:col-span-1'>
                <h3 className='text-lg font-medium text-gray-900'>
                  Metode Pembayaran
                </h3>
                <p className='mt-1 text-sm text-gray-500'>
                  Konfigurasi gateway pembayaran dan metode yang diterima
                </p>
              </div>

              <div className='md:col-span-2'>
                <div className='bg-white shadow-sm rounded-lg overflow-hidden'>
                  <div className='px-6 py-4 bg-gray-50 border-b border-gray-200'>
                    <h3 className='text-sm font-medium text-gray-900'>
                      Gateway Pembayaran
                    </h3>
                  </div>

                  <div className='p-6 space-y-6'>
                    <div className='flex items-center justify-between'>
                      <div className='flex items-center'>
                        <img
                          src='https://storage.googleapis.com/midtrans-production/uploads/midtrans-logo.png'
                          alt='Midtrans'
                          className='h-8 w-auto mr-4'
                        />
                        <div>
                          <h4 className='text-sm font-medium text-gray-900'>
                            Midtrans
                          </h4>
                          <p className='text-xs text-gray-500'>
                            Gateway pembayaran lokal Indonesia
                          </p>
                        </div>
                      </div>
                      <div className='flex items-center'>
                        <ToggleSwitch 
                          enabled={formData.enable_midtrans} 
                          onChange={() => handleToggle('enable_midtrans')} 
                        />
                      </div>
                    </div>

                    <div>
                      <label className='block text-sm font-medium text-gray-700 mb-1'>
                        Midtrans Client Key
                      </label>
                      <input
                        type='text'
                        name='midtrans_client_key'
                        value={formData.midtrans_client_key || ''}
                        onChange={handleChange}
                        className='w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50'
                      />
                    </div>

                    <div>
                      <label className='block text-sm font-medium text-gray-700 mb-1'>
                        Midtrans Server Key
                      </label>
                      <input
                        type='password'
                        name='midtrans_server_key'
                        value={formData.midtrans_server_key || ''}
                        onChange={handleChange}
                        className='w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50'
                      />
                    </div>

                    <div className='flex items-center justify-between'>
                      <div>
                        <h4 className='text-sm font-medium text-gray-900'>
                          Mode Sandbox
                        </h4>
                        <p className='text-sm text-gray-500'>
                          Gunakan mode sandbox untuk testing
                        </p>
                      </div>
                      <div className='flex items-center'>
                        <ToggleSwitch 
                          enabled={formData.midtrans_sandbox} 
                          onChange={() => handleToggle('midtrans_sandbox')} 
                        />
                      </div>
                    </div>

                    <hr className='my-4' />

                    <div className='flex items-center justify-between'>
                      <div className='flex items-center'>
                        <svg
                          className='h-8 w-8 mr-4 text-blue-500'
                          viewBox='0 0 24 24'
                          fill='currentColor'
                        >
                          <path d='M9.5 6.5v3h-3v-3h3M11 5H5v6h6V5zm-1.5 9.5v3h-3v-3h3M11 13H5v6h6v-6zm6.5-6.5v3h-3v-3h3M19 5h-6v6h6V5zm-6 8h1.5v1.5H13V13zm1.5 1.5H16V16h-1.5v-1.5zM16 13h1.5v1.5H16V13zm-3 3h1.5v1.5H13V16zm1.5 1.5H16V19h-1.5v-1.5zM16 16h1.5v1.5H16V16zm1.5-1.5H19V16h-1.5v-1.5zm0 3H19V19h-1.5v-1.5zM22 7h-2V4h-3V2h5v5zm0 15v-5h-2v3h-3v2h5zM2 22h5v-2H4v-3H2v5zM2 2v5h2V4h3V2H2z' />
                        </svg>
                        <div>
                          <h4 className='text-sm font-medium text-gray-900'>
                            QRIS
                          </h4>
                          <p className='text-xs text-gray-500'>
                            QR Code Payment Standard Indonesia
                          </p>
                        </div>
                      </div>
                      <div className='flex items-center'>
                        <ToggleSwitch 
                          enabled={formData.enable_qris} 
                          onChange={() => handleToggle('enable_qris')} 
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className='mt-6'>
                  <button
                    onClick={() => setShowSaveModal(true)}
                    className='bg-indigo-600 border border-transparent rounded-md shadow-sm py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
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
        <div className='fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50'>
          <div className='bg-white rounded-lg p-8 max-w-sm mx-auto'>
            <div className='text-center'>
              {isLoading ? (
                <div className="flex justify-center items-center mb-4">
                  <div className="animate-spin rounded-full h-10 w-10 border-4 border-indigo-500 border-t-transparent"></div>
                </div>
              ) : (
                <svg
                  className='mx-auto h-14 w-14 text-green-500 mb-4'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'
                  />
                </svg>
              )}
              <h3 className='text-lg font-medium text-gray-900 mb-2'>
                Simpan Perubahan
              </h3>
              <p className='text-gray-500 mb-6'>
                Apakah Anda yakin ingin menyimpan perubahan pada pengaturan
                sistem?
              </p>
              <div className='flex justify-center'>
                <button
                  onClick={() => setShowSaveModal(false)}
                  disabled={isLoading}
                  className='px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md mr-3 hover:bg-gray-50 disabled:opacity-50'
                >
                  Batal
                </button>
                <button
                  onClick={saveSettings}
                  disabled={isLoading}
                  className='px-4 py-2 text-sm font-medium text-white bg-green-600 border border-transparent rounded-md hover:bg-green-700 disabled:opacity-50'
                >
                  {isLoading ? 'Menyimpan...' : 'Ya, Simpan'}
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
