// filepath: d:\\KULIAH\\D. SEMESTER 4\\3. Rekayasa Perangkat Lunak\\Projek MahaBisa\\mahabisa\\resources\\js\\Pages\\Admin\\Orders.jsx
import React, { useState } from "react";
import { Head, Link } from "@inertiajs/react";
import AdminLayout from "./Components/AdminLayout";
import StatCard from "./Components/StatCard";

const Orders = () => {
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedOrderDetails, setSelectedOrderDetails] = useState(null);
  
  const handleShowDetails = (order) => {
    setSelectedOrderDetails(order);
    setShowDetailsModal(true);
  };
  
  // Sample order data
  const sampleOrder = {
    id: "PRJ-8723",
    title: "Website Dashboard Design",
    client: {
      name: "PT Maju Bersama",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg"
    },
    freelancer: {
      name: "Rina Wijaya",
      avatar: "https://randomuser.me/api/portraits/women/23.jpg"
    },
    price: "Rp 4.500.000",
    deadline: "23 Juni 2023",
    status: "Aktif",
    progress: 65,
    description: "Desain dashboard admin untuk aplikasi manajemen inventaris dengan fitur analitik dan laporan yang komprehensif.",
    tags: ["UI/UX", "Web Design", "Dashboard"],
    messages: 12,
    files: 5,
    milestones: [
      { name: "Wireframe", status: "Selesai", date: "10 Mei 2023" },
      { name: "Design Mockup", status: "Selesai", date: "20 Mei 2023" },
      { name: "Design Revisi", status: "Aktif", date: "30 Mei 2023" },
      { name: "Final Design", status: "Pending", date: "15 Juni 2023" }
    ]
  };
  
  return (
    <AdminLayout
      title="Kelola Proyek"
      subtitle="Manajemen proyek dan pesanan aktif"
    >
      <Head title="Kelola Proyek - MahaBisa Admin" />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard 
          title="Total Proyek" 
          value="128" 
          percentage="8.2" 
          trend="up"
          color="pink"
          icon={
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          }
        />
        
        <StatCard 
          title="Proyek Aktif" 
          value="87" 
          percentage="5.7" 
          trend="up"
          color="green"
          icon={
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          }
        />
        
        <StatCard 
          title="Menunggu Review" 
          value="15" 
          percentage="12.3" 
          trend="down"
          color="orange"
          icon={
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          }
        />
        
        <StatCard 
          title="Proyek Selesai" 
          value="24" 
          percentage="18.2" 
          trend="up"
          color="purple"
          icon={
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          }
        />
      </div>
      
      {/* Project List */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-8">
        <div className="flex justify-between items-center mb-6">
          <h3 className="font-bold text-lg text-gray-900">Daftar Proyek</h3>
          
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
            
            <div className="relative">
              <select className="appearance-none pl-3 pr-10 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                <option>Semua Kategori</option>
                <option>Web Design</option>
                <option>Mobile App</option>
                <option>Graphic Design</option>
                <option>Content Writing</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>
        </div>
        
        {/* Projects Table */}
        <div className="overflow-x-auto">
          <table className="w-full table-auto">
            <thead>
              <tr className="text-left text-gray-500 text-sm border-b border-gray-200">
                <th className="pb-3 font-medium">Proyek</th>
                <th className="pb-3 font-medium hidden xs:table-cell">Klien</th>
                <th className="pb-3 font-medium hidden sm:table-cell">Freelancer</th>
                <th className="pb-3 font-medium hidden md:table-cell">Tenggat</th>
                <th className="pb-3 font-medium hidden md:table-cell">Status</th>
                <th className="pb-3 font-medium hidden lg:table-cell">Progress</th>
                <th className="pb-3 font-medium text-right">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {/* Project rows */}
              <tr className="border-b border-gray-100 text-sm hover:bg-gray-50 cursor-pointer" onClick={() => handleShowDetails(sampleOrder)}>
                <td className="py-3">
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded bg-blue-100 mr-3 flex items-center justify-center text-blue-600 font-medium">
                      WD
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Website Dashboard</p>
                      <p className="text-xs text-gray-500">#PRJ-8723</p>
                    </div>
                  </div>
                </td>
                <td className="py-3 hidden xs:table-cell">
                  <div className="flex items-center">
                    <div className="w-6 h-6 rounded-full mr-2 overflow-hidden">
                      <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="Client" className="w-full h-full object-cover" />
                    </div>
                    <span>PT Maju Bersama</span>
                  </div>
                </td>
                <td className="py-3 hidden sm:table-cell">
                  <div className="flex items-center">
                    <div className="w-6 h-6 rounded-full mr-2 overflow-hidden">
                      <img src="https://randomuser.me/api/portraits/women/23.jpg" alt="Freelancer" className="w-full h-full object-cover" />
                    </div>
                    <span>Rina Wijaya</span>
                  </div>
                </td>
                <td className="py-3 hidden md:table-cell">23 Juni 2023</td>
                <td className="py-3 hidden md:table-cell">
                  <span className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">
                    Aktif
                  </span>
                </td>
                <td className="py-3 hidden lg:table-cell">
                  <div className="flex items-center">
                    <div className="w-full h-2 bg-gray-200 rounded-full mr-2">
                      <div className="h-full bg-green-500 rounded-full" style={{ width: "65%" }}></div>
                    </div>
                    <span className="text-xs font-medium">65%</span>
                  </div>
                </td>
                <td className="py-3 text-right">
                  <Link 
                    href={`/admin/projects/${sampleOrder.id}`}
                    className="px-3 py-1 text-xs font-medium text-indigo-600 bg-indigo-50 rounded-md hover:bg-indigo-100"
                    onClick={(e) => e.stopPropagation()}
                  >
                    Detail
                  </Link>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <div className="mt-6 flex justify-center">
          <nav className="flex items-center">
            <Link href="#" className="px-3 py-1 rounded-md text-sm font-medium text-gray-500 hover:text-gray-700">
              &laquo; Sebelumnya
            </Link>
            <Link href="#" className="px-3 py-1 rounded-md text-sm font-medium text-white bg-indigo-600">
              1
            </Link>
            <Link href="#" className="px-3 py-1 rounded-md text-sm font-medium text-gray-500 hover:text-gray-700">
              2
            </Link>
            <Link href="#" className="px-3 py-1 rounded-md text-sm font-medium text-gray-500 hover:text-gray-700">
              3
            </Link>
            <Link href="#" className="px-3 py-1 rounded-md text-sm font-medium text-gray-500 hover:text-gray-700">
              Selanjutnya &raquo;
            </Link>
          </nav>
        </div>
      </div>
      
      {/* Modal Details */}
      {showDetailsModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="fixed inset-0 bg-black bg-opacity-50" onClick={() => setShowDetailsModal(false)}></div>
          <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl p-6 z-10 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-bold text-lg text-gray-900">Detail Proyek</h3>
              <button onClick={() => setShowDetailsModal(false)} className="text-gray-400 hover:text-gray-600">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            {selectedOrderDetails && (
              <div className="space-y-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-bold text-gray-900 mb-2">{selectedOrderDetails.title}</h4>
                  <p className="text-sm text-gray-600 mb-4">{selectedOrderDetails.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {selectedOrderDetails.tags.map((tag, index) => (
                      <span key={index} className="px-2 py-1 text-xs bg-gray-200 rounded-full text-gray-700">
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <p className="text-gray-500 mb-1">ID Proyek</p>
                      <p className="font-medium">{selectedOrderDetails.id}</p>
                    </div>
                    <div>
                      <p className="text-gray-500 mb-1">Harga</p>
                      <p className="font-medium">{selectedOrderDetails.price}</p>
                    </div>
                    <div>
                      <p className="text-gray-500 mb-1">Tenggat</p>
                      <p className="font-medium">{selectedOrderDetails.deadline}</p>
                    </div>
                    <div>
                      <p className="text-gray-500 mb-1">Status</p>
                      <p className="font-medium">{selectedOrderDetails.status}</p>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-bold text-gray-900 mb-3">Milestones</h4>
                    <div className="space-y-3">
                      {selectedOrderDetails.milestones.map((milestone, index) => (
                        <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                          <div>
                            <p className="font-medium">{milestone.name}</p>
                            <p className="text-xs text-gray-500">{milestone.date}</p>
                          </div>
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            milestone.status === "Selesai" 
                              ? "bg-green-100 text-green-800" 
                              : milestone.status === "Aktif"
                                ? "bg-blue-100 text-blue-800"
                                : "bg-gray-100 text-gray-800"
                          }`}>
                            {milestone.status}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-bold text-gray-900 mb-3">Informasi Lainnya</h4>
                    <div className="space-y-4">
                      <div className="p-3 bg-gray-50 rounded-lg">
                        <p className="text-gray-500 mb-1">Klien</p>
                        <div className="flex items-center">
                          <div className="w-8 h-8 rounded-full mr-2 overflow-hidden">
                            <img src={selectedOrderDetails.client.avatar} alt="Client" className="w-full h-full object-cover" />
                          </div>
                          <span className="font-medium">{selectedOrderDetails.client.name}</span>
                        </div>
                      </div>
                      
                      <div className="p-3 bg-gray-50 rounded-lg">
                        <p className="text-gray-500 mb-1">Freelancer</p>
                        <div className="flex items-center">
                          <div className="w-8 h-8 rounded-full mr-2 overflow-hidden">
                            <img src={selectedOrderDetails.freelancer.avatar} alt="Freelancer" className="w-full h-full object-cover" />
                          </div>
                          <span className="font-medium">{selectedOrderDetails.freelancer.name}</span>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div className="p-3 bg-gray-50 rounded-lg">
                          <p className="text-gray-500 mb-1">Pesan</p>
                          <p className="font-medium">{selectedOrderDetails.messages}</p>
                        </div>
                        <div className="p-3 bg-gray-50 rounded-lg">
                          <p className="text-gray-500 mb-1">File</p>
                          <p className="font-medium">{selectedOrderDetails.files}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            <div className="flex justify-end mt-8 space-x-3">
              <button 
                onClick={() => setShowDetailsModal(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Tutup
              </button>
              <Link 
                href={`/admin/projects/${selectedOrderDetails?.id}/edit`}
                className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-700"
              >
                Edit Proyek
              </Link>
            </div>
          </div>
        </div>
      )}
      
      {/* Modal Filter */}
      {showFilterModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="fixed inset-0 bg-black bg-opacity-50" onClick={() => setShowFilterModal(false)}></div>
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 z-10">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-lg text-gray-900">Filter Proyek</h3>
              <button onClick={() => setShowFilterModal(false)} className="text-gray-400 hover:text-gray-600">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <form>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-medium mb-2">Kategori</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500">
                  <option>Semua Kategori</option>
                  <option>Web Development</option>
                  <option>Mobile App</option>
                  <option>Design</option>
                  <option>Writing</option>
                  <option>Marketing</option>
                </select>
              </div>
              
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-medium mb-2">Status</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500">
                  <option>Semua Status</option>
                  <option>Aktif</option>
                  <option>Revisi</option>
                  <option>Evaluasi</option>
                  <option>Selesai</option>
                  <option>Terlambat</option>
                </select>
              </div>
              
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-medium mb-2">Progress</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500">
                  <option>Semua Progress</option>
                  <option>0% - 25%</option>
                  <option>25% - 50%</option>
                  <option>50% - 75%</option>
                  <option>75% - 100%</option>
                </select>
              </div>
              
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-medium mb-2">Tenggat</label>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 text-xs font-medium mb-1">Dari</label>
                    <input type="date" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                  </div>
                  <div>
                    <label className="block text-gray-700 text-xs font-medium mb-1">Sampai</label>
                    <input type="date" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end mt-6">
                <button 
                  type="button" 
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md mr-3 hover:bg-gray-50"
                >
                  Reset
                </button>
                <button 
                  type="submit" 
                  onClick={(e) => {
                    e.preventDefault();
                    setShowFilterModal(false);
                  }}
                  className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-700"
                >
                  Terapkan Filter
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default Orders;
