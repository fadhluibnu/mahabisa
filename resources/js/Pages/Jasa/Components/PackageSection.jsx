import React from 'react';

const PackageSection = ({ packages, selectedPackage, setSelectedPackage, formatRupiah }) => {
  return (
    <div className="sticky top-24 bg-white rounded-2xl shadow-md overflow-hidden">
      {/* Packages Tabs */}
      <div className="flex border-b border-gray-200">
        {packages.map((pkg) => (
          <button
            key={pkg.id}
            className={`flex-1 py-3 px-4 text-sm font-medium ${
              selectedPackage === pkg.id
                ? 'bg-[#7C3AED] text-white'
                : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
            }`}
            onClick={() => setSelectedPackage(pkg.id)}
          >
            {pkg.name}
          </button>
        ))}
      </div>

      {/* Package Details */}
      {packages.map((pkg) => (
        <div 
          key={pkg.id} 
          className={`p-6 ${selectedPackage === pkg.id ? 'block' : 'hidden'}`}
        >
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-2xl font-bold text-gray-900">
              {formatRupiah(pkg.price)}
            </h3>
          </div>

          <div className="mb-6">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-gray-700">Waktu Pengerjaan</span>
              <span className="text-sm font-medium text-gray-900">{pkg.deliveryTime} hari</span>
            </div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-gray-700">Revisi</span>
              <span className="text-sm font-medium text-gray-900">{pkg.revisions} kali</span>
            </div>
          </div>

          <div className="mb-6">
            <h4 className="text-sm font-medium text-gray-900 mb-3">
              Yang Anda dapatkan:
            </h4>
            <ul className="space-y-2">
              {pkg.features.map((feature, index) => (
                <li key={index} className="flex items-start">
                  <svg className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm text-gray-700">{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-3">
            <button
              type="button"
              className="w-full py-3 px-4 bg-[#7C3AED] text-white font-medium rounded-lg hover:bg-[#6025c9] transition-colors"
            >
              Pesan Sekarang
            </button>
            <button
              type="button"
              className="w-full py-3 px-4 border border-[#7C3AED] text-[#7C3AED] font-medium rounded-lg hover:bg-[#f9f7ff] transition-colors"
            >
              Hubungi Penjual
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PackageSection;
