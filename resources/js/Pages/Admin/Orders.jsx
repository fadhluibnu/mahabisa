// filepath: d:\\KULIAH\\D. SEMESTER 4\\3. Rekayasa Perangkat Lunak\\Projek MahaBisa\\mahabisa\\resources\\js\\Pages\\Admin\\Orders.jsx
import React, { useState, useEffect } from "react";
import { Head, Link } from "@inertiajs/react";
import AdminLayout from "./Components/AdminLayout";
import StatCard from "./Components/StatCard";

const Orders = () => {
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedOrderDetails, setSelectedOrderDetails] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [selectedCategory, setSelectedCategory] = useState("Semua Kategori");
  
  // Handle showing project details
  const handleShowDetails = (project) => {
    console.log("Selected project:", project); // For debugging
    setSelectedOrderDetails(project);
    setShowDetailsModal(true);
  };
  
  // Sample order data template
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
  
  // Generate sample projects data for pagination
  const generateProjects = () => {
    const statuses = ["Aktif", "Selesai", "Revisi", "Pending"];
    const projectTypes = [
      { title: "Website Dashboard", short: "WD", category: "Web Design" },
      { title: "Mobile App UI", short: "MA", category: "Mobile App" },
      { title: "Logo Design", short: "LD", category: "Graphic Design" },
      { title: "Content Writing", short: "CW", category: "Content Writing" },
      { title: "SEO Optimization", short: "SO", category: "Marketing" },
    ];
    
    return Array(15).fill().map((_, index) => {
      const projectType = projectTypes[index % projectTypes.length];
      const progress = Math.floor(Math.random() * 100);
      
      return {
        ...JSON.parse(JSON.stringify(sampleOrder)), // Create deep copy to avoid reference issues
        id: `PRJ-${8723 + index}`,
        title: `${projectType.title} ${index + 1}`,
        projectShort: projectType.short,
        status: statuses[index % statuses.length],
        progress: progress,
        category: projectType.category,
        tags: [...sampleOrder.tags, projectType.category]
      };
    });
  };
  
  const allProjects = generateProjects();
  
  // Filter projects by category
  const getFilteredProjects = () => {
    if (selectedCategory === "Semua Kategori") {
      return allProjects;
    }
    return allProjects.filter(project => project.category === selectedCategory);
  };
  
  const filteredProjects = getFilteredProjects();
  
  // Handle category change
  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
    setCurrentPage(1); // Reset to first page when changing category
  };
  
  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProjects = filteredProjects.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredProjects.length / itemsPerPage);
  
  const handlePageChange = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };
  
  // Generate page numbers for pagination
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }
  
  // Get unique categories from projects
  const categories = ["Semua Kategori", ...new Set(allProjects.map(project => project.category))];
  
  // Clean up modal state when unmounted
  useEffect(() => {
    return () => {
      setSelectedOrderDetails(null);
      setShowDetailsModal(false);
    };
  }, []);
  
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
              {currentProjects.map((project, index) => (
                <tr 
                  key={index} 
                  className="border-b border-gray-100 text-sm hover:bg-gray-50 cursor-pointer" 
                  onClick={() => handleShowDetails(project)}
                >
                  <td className="py-3">
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded bg-blue-100 mr-3 flex items-center justify-center text-blue-600 font-medium">
                        {project.projectShort || "WD"}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{project.title}</p>
                        <p className="text-xs text-gray-500">#{project.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 hidden xs:table-cell">
                    <div className="flex items-center">
                      <div className="w-6 h-6 rounded-full mr-2 overflow-hidden">
                        <img src={project.client.avatar} alt="Client" className="w-full h-full object-cover" />
                      </div>
                      <span>{project.client.name}</span>
                    </div>
                  </td>
                  <td className="py-3 hidden sm:table-cell">
                    <div className="flex items-center">
                      <div className="w-6 h-6 rounded-full mr-2 overflow-hidden">
                        <img src={project.freelancer.avatar} alt="Freelancer" className="w-full h-full object-cover" />
                      </div>
                      <span>{project.freelancer.name}</span>
                    </div>
                  </td>
                  <td className="py-3 hidden md:table-cell">{project.deadline}</td>
                  <td className="py-3 hidden md:table-cell">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      project.status === "Aktif" 
                        ? "bg-green-100 text-green-800" 
                        : project.status === "Selesai"
                          ? "bg-blue-100 text-blue-800"
                          : project.status === "Revisi"
                            ? "bg-orange-100 text-orange-800"
                            : "bg-gray-100 text-gray-800"
                    }`}>
                      {project.status}
                    </span>
                  </td>
                  <td className="py-3 hidden lg:table-cell">
                    <div className="flex items-center">
                      <div className="w-full h-2 bg-gray-200 rounded-full mr-2">
                        <div className="h-full bg-green-500 rounded-full" style={{ width: `${project.progress}%` }}></div>
                      </div>
                      <span className="text-xs font-medium">{project.progress}%</span>
                    </div>
                  </td>
                  <td className="py-3 text-right">
                    <button 
                      className="px-3 py-1 text-xs font-medium text-indigo-600 bg-indigo-50 rounded-md hover:bg-indigo-100"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleShowDetails(project);
                      }}
                    >
                      Detail
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="mt-6 flex justify-center">
          <nav className="flex items-center">
            <button 
              onClick={() => handlePageChange(currentPage - 1)} 
              disabled={currentPage === 1}
              className={`px-3 py-1 rounded-md text-sm font-medium ${currentPage === 1 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-500 hover:text-gray-700'}`}
            >
              &laquo; Sebelumnya
            </button>
            
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(number => (
              <button
                key={number}
                onClick={() => handlePageChange(number)}
                className={`px-3 py-1 rounded-md text-sm font-medium ${
                  currentPage === number 
                    ? 'text-white bg-indigo-600' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {number}
              </button>
            ))}
            
            <button 
              onClick={() => handlePageChange(currentPage + 1)} 
              disabled={currentPage === totalPages}
              className={`px-3 py-1 rounded-md text-sm font-medium ${currentPage === totalPages ? 'text-gray-300 cursor-not-allowed' : 'text-gray-500 hover:text-gray-700'}`}
            >
              Selanjutnya &raquo;
            </button>
          </nav>
        </div>
      </div>
      
      {/* Modal Details */}
      {showDetailsModal && selectedOrderDetails && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="fixed inset-0 bg-black opacity-50" onClick={() => setShowDetailsModal(false)}></div>
          <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl p-6 z-10 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-bold text-lg text-gray-900">Detail Proyek</h3>
              <button onClick={() => setShowDetailsModal(false)} className="text-gray-400 hover:text-gray-600">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="space-y-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-bold text-gray-900 mb-2">{selectedOrderDetails.title}</h4>
                <p className="text-sm text-gray-600 mb-4">{selectedOrderDetails.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {selectedOrderDetails.tags && selectedOrderDetails.tags.map((tag, index) => (
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
                    {selectedOrderDetails.milestones && selectedOrderDetails.milestones.map((milestone, index) => (
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
                    {selectedOrderDetails.client && (
                      <div className="p-3 bg-gray-50 rounded-lg">
                        <p className="text-gray-500 mb-1">Klien</p>
                        <div className="flex items-center">
                          <div className="w-8 h-8 rounded-full mr-2 overflow-hidden">
                            <img src={selectedOrderDetails.client.avatar} alt="Client" className="w-full h-full object-cover" />
                          </div>
                          <span className="font-medium">{selectedOrderDetails.client.name}</span>
                        </div>
                      </div>
                    )}
                    
                    {selectedOrderDetails.freelancer && (
                      <div className="p-3 bg-gray-50 rounded-lg">
                        <p className="text-gray-500 mb-1">Freelancer</p>
                        <div className="flex items-center">
                          <div className="w-8 h-8 rounded-full mr-2 overflow-hidden">
                            <img src={selectedOrderDetails.freelancer.avatar} alt="Freelancer" className="w-full h-full object-cover" />
                          </div>
                          <span className="font-medium">{selectedOrderDetails.freelancer.name}</span>
                        </div>
                      </div>
                    )}
                    
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
            
            <div className="flex justify-end mt-8 space-x-3">
              <button 
                onClick={() => setShowDetailsModal(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Modal Filter */}
      {showFilterModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="fixed inset-0 bg-black bg-opacity-30" onClick={() => setShowFilterModal(false)}></div>
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
                <select 
                  value={selectedCategory}
                  onChange={handleCategoryChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  {categories.map((category, index) => (
                    <option key={index} value={category}>
                      {category}
                    </option>
                  ))}
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
                  onClick={() => {
                    setSelectedCategory("Semua Kategori");
                    setCurrentPage(1);
                  }}
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
