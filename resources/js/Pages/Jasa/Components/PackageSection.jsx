import React from 'react';
import { Link } from '@inertiajs/react';

const PackageSection = ({
  packages,
  selectedPackage,
  setSelectedPackage,
  formatRupiah,
  serviceId,
  isAuthenticated,
  isClient,
}) => {
  // Handler for order button
  const handleOrderClick = () => {
    if (!isAuthenticated) {
      // Redirect to login if not authenticated
      window.location.href = `/auth?form=login&redirect=/jasa/${serviceId}`;
    } else if (!isClient) {
      // Alert if user is not a client
      alert(
        'Anda harus menjadi klien untuk memesan jasa ini. Silakan ubah peran Anda ke klien di pengaturan akun.'
      );
    }
  };

  // Check if we have packages to display
  if (packages.length === 0) {
    return (
      <div className='sticky top-24 bg-white rounded-2xl shadow-md overflow-hidden p-6'>
        <p className='text-center text-gray-500 mb-4'>
          Tidak ada paket tersedia untuk jasa ini.
        </p>
        <div className='space-y-3'>
          <button
            type='button'
            className='w-full py-3 px-4 bg-gray-300 text-gray-700 font-medium rounded-lg cursor-not-allowed'
            disabled
          >
            Paket Tidak Tersedia
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className='sticky top-24 bg-white rounded-2xl shadow-md overflow-hidden'>
      {/* Packages Tabs */}
      {packages.length > 1 && (
        <div className='flex border-b border-gray-200'>
          {packages.map(pkg => (
            <button
              key={pkg.id}
              className={`flex-1 py-3 px-4 text-sm font-medium ${
                selectedPackage === pkg.id
                  ? 'bg-[#7C3AED] text-white'
                  : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
              }`}
              onClick={() => setSelectedPackage(pkg.id)}
            >
              {pkg.title || `Paket ${pkg.id}`}
            </button>
          ))}
        </div>
      )}

      {/* Package Details */}
      {packages.map(pkg => (
        <div
          key={pkg.id}
          className={`p-6 ${selectedPackage === pkg.id ? 'block' : 'hidden'}`}
        >
          <div className='flex justify-between items-center mb-4'>
            <h3 className='text-2xl font-bold text-gray-900'>
              {formatRupiah(pkg.price)}
            </h3>
          </div>

          <div className='mb-6'>
            <div className='flex items-center justify-between mb-3'>
              <span className='text-sm text-gray-700'>Waktu Pengerjaan</span>
              <span className='text-sm font-medium text-gray-900'>
                {pkg.delivery_time} hari
              </span>
            </div>
            <div className='flex items-center justify-between mb-3'>
              <span className='text-sm text-gray-700'>Revisi</span>
              <span className='text-sm font-medium text-gray-900'>
                {pkg.revisions} kali
              </span>
            </div>
          </div>

          <div className='mb-6'>
            <h4 className='text-sm font-medium text-gray-900 mb-3'>
              Yang Anda dapatkan:
            </h4>
            <ul className='space-y-2'>
              {pkg.features &&
                (Array.isArray(pkg.features)
                  ? pkg.features
                  : typeof pkg.features === 'string'
                    ? pkg.features.split(',')
                    : []
                ).map((feature, index) => (
                  <li key={index} className='flex items-start'>
                    <svg
                      className='h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0'
                      xmlns='http://www.w3.org/2000/svg'
                      viewBox='0 0 20 20'
                      fill='currentColor'
                    >
                      <path
                        fillRule='evenodd'
                        d='M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z'
                        clipRule='evenodd'
                      />
                    </svg>
                    <span className='text-sm text-gray-700'>
                      {typeof feature === 'string' ? feature.trim() : feature}
                    </span>
                  </li>
                ))}
            </ul>
          </div>

          <div className='space-y-3'>
            {isAuthenticated && isClient ? (
              <Link
                href={`/client/services/${serviceId}/order?package_id=${pkg.id}`}
                className='block w-full text-center py-3 px-4 bg-[#7C3AED] text-white font-medium rounded-lg hover:bg-[#6025c9] transition-colors'
              >
                Pesan Sekarang
              </Link>
            ) : (
              <button
                type='button'
                onClick={handleOrderClick}
                className='w-full py-3 px-4 bg-[#7C3AED] text-white font-medium rounded-lg hover:bg-[#6025c9] transition-colors'
              >
                Pesan Sekarang
              </button>
            )}
            <Link
              href={
                isAuthenticated
                  ? `/messages/create?recipient=${serviceId}`
                  : `/auth?form=login&redirect=/jasa/${serviceId}`
              }
              className='block w-full text-center py-3 px-4 border border-[#7C3AED] text-[#7C3AED] font-medium rounded-lg hover:bg-[#f9f7ff] transition-colors'
            >
              Hubungi Penjual
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PackageSection;
