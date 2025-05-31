import React, { useState } from 'react';
import AdminLayout from './Components/AdminLayout';
import StatCard from './Components/StatCard';

const Payments = () => {
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [showTransactionModal, setShowTransactionModal] = useState(false);
  
  return (
    <AdminLayout 
      title="Pembayaran & Komisi" 
      subtitle="Manajemen pembayaran dan komisi platform"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6 md:mb-8">
        <StatCard 
          title="Total Pembayaran" 
          value="Rp 37,8jt" 
          percentage="23.1" 
          trend="up"
          color="green"
          icon={
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          }
        />
        
        <StatCard 
          title="Pendapatan Platform" 
          value="Rp 7,56jt" 
          percentage="18.5" 
          trend="up"
          color="purple"
          icon={
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          }
        />
        
        <StatCard 
          title="Pembayaran Sukses" 
          value="124" 
          percentage="12.7" 
          trend="up"
          color="pink"
          icon={
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          }
        />
        
        <StatCard 
          title="Menunggu Pencairan" 
          value="15" 
          percentage="3.2" 
          trend="down"
          color="orange"
          icon={
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          }
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 lg:col-span-2">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-lg text-gray-900">Transaksi Terbaru</h3>
            <div className="flex gap-3">
              <button 
                onClick={() => setShowFilterModal(true)}
                className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
              >
                <svg className="w-5 h-5 mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                </svg>
                Filter
              </button>
              <button className="text-sm text-indigo-600 hover:text-indigo-800 font-medium">
                Lihat Semua
              </button>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full table-auto">
              <thead>
                <tr className="text-left text-gray-500 text-sm border-b border-gray-200">
                  <th className="pb-3 font-medium">ID Transaksi</th>
                  <th className="pb-3 font-medium">Proyek</th>
                  <th className="pb-3 font-medium">Jumlah</th>
                  <th className="pb-3 font-medium hidden md:table-cell">Komisi</th>
                  <th className="pb-3 font-medium hidden sm:table-cell">Status</th>
                  <th className="pb-3 font-medium hidden lg:table-cell">Tanggal</th>
                  <th className="pb-3 font-medium text-right">Aksi</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-100 text-sm hover:bg-gray-50">
                  <td className="py-3">
                    <span className="font-medium text-gray-900">#INV-230521</span>
                  </td>
                  <td className="py-3">
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded bg-blue-100 mr-3 flex items-center justify-center text-blue-600 font-medium">
                        WD
                      </div>
                      <span>Website Dashboard</span>
                    </div>
                  </td>
                  <td className="py-3 font-medium">Rp 4.500.000</td>
                  <td className="py-3 hidden md:table-cell text-green-600">Rp 900.000</td>
                  <td className="py-3 hidden sm:table-cell">
                    <span className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">
                      Dibayar
                    </span>
                  </td>
                  <td className="py-3 hidden lg:table-cell">21 Mei 2023</td>
                  <td className="py-3 text-right">
                    <button 
                      onClick={() => setShowTransactionModal(true)}
                      className="px-3 py-1 text-xs font-medium text-indigo-600 bg-indigo-50 rounded-md hover:bg-indigo-100"
                    >
                      Detail
                    </button>
                  </td>
                </tr>
                <tr className="border-b border-gray-100 text-sm hover:bg-gray-50">
                  <td className="py-3">
                    <span className="font-medium text-gray-900">#INV-230518</span>
                  </td>
                  <td className="py-3">
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded bg-purple-100 mr-3 flex items-center justify-center text-purple-600 font-medium">
                        LG
                      </div>
                      <span>Logo Design</span>
                    </div>
                  </td>
                  <td className="py-3 font-medium">Rp 1.200.000</td>
                  <td className="py-3 hidden md:table-cell text-green-600">Rp 240.000</td>
                  <td className="py-3 hidden sm:table-cell">
                    <span className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">
                      Dibayar
                    </span>
                  </td>
                  <td className="py-3 hidden lg:table-cell">18 Mei 2023</td>
                  <td className="py-3 text-right">
                    <button className="px-3 py-1 text-xs font-medium text-indigo-600 bg-indigo-50 rounded-md hover:bg-indigo-100">
                      Detail
                    </button>
                  </td>
                </tr>
                <tr className="border-b border-gray-100 text-sm hover:bg-gray-50">
                  <td className="py-3">
                    <span className="font-medium text-gray-900">#INV-230515</span>
                  </td>
                  <td className="py-3">
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded bg-pink-100 mr-3 flex items-center justify-center text-pink-600 font-medium">
                        MA
                      </div>
                      <span>Mobile App</span>
                    </div>
                  </td>
                  <td className="py-3 font-medium">Rp 8.750.000</td>
                  <td className="py-3 hidden md:table-cell text-green-600">Rp 1.750.000</td>
                  <td className="py-3 hidden sm:table-cell">
                    <span className="px-2 py-1 rounded-full text-xs bg-yellow-100 text-yellow-800">
                      Menunggu
                    </span>
                  </td>
                  <td className="py-3 hidden lg:table-cell">15 Mei 2023</td>
                  <td className="py-3 text-right">
                    <button className="px-3 py-1 text-xs font-medium text-indigo-600 bg-indigo-50 rounded-md hover:bg-indigo-100">
                      Detail
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        
        <div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-6">
            <h3 className="font-bold text-lg text-gray-900 mb-4">Ringkasan Keuangan</h3>
            
            <div className="space-y-4">
              <div className="pb-4 border-b border-gray-100">
                <p className="text-sm text-gray-500 mb-1">Pendapatan Bulan Ini</p>
                <p className="text-2xl font-bold text-gray-900">Rp 15.250.000</p>
                <div className="flex items-center mt-1">
                  <svg className="w-4 h-4 text-green-600 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                  <span className="text-sm text-green-600">23.1% dari bulan lalu</span>
                </div>
              </div>
              
              <div className="pb-4 border-b border-gray-100">
                <p className="text-sm text-gray-500 mb-1">Komisi Platform</p>
                <p className="text-2xl font-bold text-gray-900">Rp 3.050.000</p>
                <div className="flex items-center mt-1">
                  <svg className="w-4 h-4 text-green-600 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                  <span className="text-sm text-green-600">18.5% dari bulan lalu</span>
                </div>
              </div>
              
              <div className="pb-4">
                <p className="text-sm text-gray-500 mb-1">Pembayaran ke Freelancer</p>
                <p className="text-2xl font-bold text-gray-900">Rp 12.200.000</p>
                <div className="flex items-center mt-1">
                  <svg className="w-4 h-4 text-green-600 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                  <span className="text-sm text-green-600">15.8% dari bulan lalu</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="font-bold text-lg text-gray-900 mb-4">Metode Pembayaran</h3>
            
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-gray-700">Bank Transfer</span>
                  <span className="text-sm font-medium text-gray-700">60%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-indigo-600 h-2 rounded-full" style={{ width: '60%' }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-gray-700">E-Wallet</span>
                  <span className="text-sm font-medium text-gray-700">25%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-pink-500 h-2 rounded-full" style={{ width: '25%' }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-gray-700">Kartu Kredit</span>
                  <span className="text-sm font-medium text-gray-700">15%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: '15%' }}></div>
                </div>
              </div>
            </div>
            
            <div className="mt-6">
              <button className="w-full py-2 px-4 bg-indigo-600 text-white text-sm font-medium rounded-md hover:bg-indigo-700">
                Laporan Keuangan
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Modal Filter */}
      {showFilterModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="fixed inset-0 bg-black opacity-50" onClick={() => setShowFilterModal(false)}></div>
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 z-10">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-lg text-gray-900">Filter Transaksi</h3>
              <button onClick={() => setShowFilterModal(false)} className="text-gray-400 hover:text-gray-600">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-medium mb-2">Status Pembayaran</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500">
                  <option>Semua Status</option>
                  <option>Dibayar</option>
                  <option>Menunggu</option>
                  <option>Gagal</option>
                </select>
              </div>
              
              <div className="flex justify-end mt-6">
                <button 
                  type="button" 
                  onClick={() => setShowFilterModal(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md mr-3 hover:bg-gray-50"
                >
                  Reset
                </button>
                <button 
                  type="button" 
                  onClick={() => setShowFilterModal(false)}
                  className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-700"
                >
                  Terapkan Filter
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Modal Detail Transaksi */}
      {showTransactionModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="fixed inset-0 bg-black opacity-50" onClick={() => setShowTransactionModal(false)}></div>
          <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl p-6 z-10 max-h-screen overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-bold text-lg text-gray-900">Detail Transaksi</h3>
              <button onClick={() => setShowTransactionModal(false)} className="text-gray-400 hover:text-gray-600">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg mb-6 flex justify-between items-center">
              <div>
                <span className="text-sm text-gray-500">ID Transaksi</span>
                <p className="text-lg font-bold text-gray-900">#INV-230521</p>
              </div>
              <span className="px-3 py-1 rounded-full text-sm bg-green-100 text-green-800">
                Dibayar
              </span>
            </div>
            
            <div className="flex justify-end space-x-3">
              <button 
                onClick={() => setShowTransactionModal(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Tutup
              </button>
              <button className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-700">
                Cetak Invoice
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default Payments;