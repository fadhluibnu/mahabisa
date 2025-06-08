import React, { useState } from "react";
import { Head, Link, usePage } from "@inertiajs/react";
import AdminLayout from "./Components/AdminLayout";

const ProjectDetail = () => {
  const { project } = usePage().props;
  const [activeTab, setActiveTab] = useState("overview");
  
  // If using dummy data for development or no data is passed
  const dummyProject = {
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
    ],
    activities: [
      { type: "message", user: "Rina Wijaya", action: "mengirim pesan", time: "2 jam yang lalu" },
      { type: "file", user: "PT Maju Bersama", action: "mengunggah file baru", time: "Kemarin, 15:30" },
      { type: "milestone", user: "Rina Wijaya", action: "menyelesaikan milestone Design Mockup", time: "20 Mei 2023" },
      { type: "payment", user: "PT Maju Bersama", action: "melakukan pembayaran Tahap 1", time: "18 Mei 2023" },
    ]
  };
  
  // Use project from props if available, otherwise use dummy data
  const projectData = project || dummyProject;
  
  return (
    <AdminLayout
      title="Detail Proyek"
      subtitle={`Manajemen proyek ${projectData.id}`}
    >
      <Head title={`${projectData.title} - MahaBisa Admin`} />
      
      {/* Back button */}
      <div className="mb-6">
        <Link href="/admin/orders" className="flex items-center text-sm text-indigo-600 hover:text-indigo-800">
          <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Kembali ke Daftar Proyek
        </Link>
      </div>
      
      {/* Project Header */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-6">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">{projectData.title}</h1>
            <div className="flex items-center text-sm text-gray-500">
              <span className="mr-3">#{projectData.id}</span>
              <span className="mr-3">•</span>
              <span>Dibuat pada 10 Mei 2023</span>
            </div>
          </div>
          
          <div className="flex space-x-3 mt-4 md:mt-0">
            <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
              <span className="hidden sm:inline mr-1">Kirim</span> Pesan
            </button>
            <button className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-700">
              Edit Proyek
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pb-6 border-b border-gray-100">
          <div>
            <p className="text-xs text-gray-500 mb-1">Status</p>
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
              projectData.status === "Aktif" 
                ? "bg-green-100 text-green-800" 
                : projectData.status === "Selesai"
                  ? "bg-blue-100 text-blue-800"
                  : projectData.status === "Revisi"
                    ? "bg-orange-100 text-orange-800"
                    : "bg-gray-100 text-gray-800"
            }`}>
              {projectData.status}
            </span>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Klien</p>
            <div className="flex items-center">
              <div className="w-5 h-5 rounded-full mr-1 overflow-hidden">
                <img src={projectData.client.avatar} alt="Client" className="w-full h-full object-cover" />
              </div>
              <span className="text-sm font-medium">{projectData.client.name}</span>
            </div>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Freelancer</p>
            <div className="flex items-center">
              <div className="w-5 h-5 rounded-full mr-1 overflow-hidden">
                <img src={projectData.freelancer.avatar} alt="Freelancer" className="w-full h-full object-cover" />
              </div>
              <span className="text-sm font-medium">{projectData.freelancer.name}</span>
            </div>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Tenggat</p>
            <p className="text-sm font-medium">{projectData.deadline}</p>
          </div>
        </div>
        
        <div className="pt-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center">
              <span className="text-sm font-medium mr-2">Progress</span>
              <span className="text-sm font-medium text-indigo-600">{projectData.progress}%</span>
            </div>
            <span className="text-xs text-gray-500">{projectData.deadline}</span>
          </div>
          <div className="w-full h-2 bg-gray-200 rounded-full">
            <div 
              className="h-full bg-indigo-600 rounded-full" 
              style={{ width: `${projectData.progress}%` }}
            ></div>
          </div>
        </div>
      </div>
      
      {/* Tabs Navigation */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 mb-6">
        <div className="flex overflow-x-auto scrollbar-hide">
          <button 
            onClick={() => setActiveTab("overview")}
            className={`px-4 py-4 text-sm font-medium whitespace-nowrap ${
              activeTab === "overview" 
                ? "text-indigo-600 border-b-2 border-indigo-600" 
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Ringkasan
          </button>
          <button 
            onClick={() => setActiveTab("milestones")}
            className={`px-4 py-4 text-sm font-medium whitespace-nowrap ${
              activeTab === "milestones" 
                ? "text-indigo-600 border-b-2 border-indigo-600" 
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Milestone
          </button>
          <button 
            onClick={() => setActiveTab("files")}
            className={`px-4 py-4 text-sm font-medium whitespace-nowrap ${
              activeTab === "files" 
                ? "text-indigo-600 border-b-2 border-indigo-600" 
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            File & Dokumen
          </button>
          <button 
            onClick={() => setActiveTab("messages")}
            className={`px-4 py-4 text-sm font-medium whitespace-nowrap ${
              activeTab === "messages" 
                ? "text-indigo-600 border-b-2 border-indigo-600" 
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Pesan
          </button>
          <button 
            onClick={() => setActiveTab("payments")}
            className={`px-4 py-4 text-sm font-medium whitespace-nowrap ${
              activeTab === "payments" 
                ? "text-indigo-600 border-b-2 border-indigo-600" 
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Pembayaran
          </button>
        </div>
      </div>
      
      {/* Tab Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {activeTab === "overview" && (
            <>
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <h2 className="text-lg font-bold text-gray-900 mb-4">Deskripsi Proyek</h2>
                <p className="text-gray-600 mb-4">{projectData.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {projectData.tags.map((tag, index) => (
                    <span key={index} className="px-2 py-1 text-xs bg-gray-100 rounded-full text-gray-700">
                      {tag}
                    </span>
                  ))}
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-500 mb-1">Harga Proyek</p>
                    <p className="font-medium">{projectData.price}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 mb-1">Durasi</p>
                    <p className="font-medium">30 Hari</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <h2 className="text-lg font-bold text-gray-900 mb-4">Milestone</h2>
                <div className="space-y-4">
                  {projectData.milestones.map((milestone, index) => (
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
            </>
          )}
          
          {activeTab === "milestones" && (
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-bold text-gray-900">Daftar Milestone</h2>
                <button className="px-3 py-2 text-sm font-medium text-indigo-600 bg-indigo-50 rounded-md hover:bg-indigo-100">
                  Tambah Milestone
                </button>
              </div>
              
              {/* Milestone timeline */}
              <div className="space-y-8">
                {projectData.milestones.map((milestone, index) => (
                  <div key={index} className="relative pl-8">
                    {/* Timeline dot */}
                    <div className={`absolute left-0 top-0 w-5 h-5 rounded-full ${
                      milestone.status === "Selesai" 
                        ? "bg-green-500" 
                        : milestone.status === "Aktif"
                          ? "bg-blue-500"
                          : "bg-gray-300"
                    } flex items-center justify-center`}>
                      {milestone.status === "Selesai" && (
                        <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </div>
                    
                    {/* Vertical line */}
                    {index !== projectData.milestones.length - 1 && (
                      <div className="absolute left-2.5 top-5 w-0.5 h-12 bg-gray-200"></div>
                    )}
                    
                    <div className="mb-4">
                      <div className="flex justify-between items-start mb-1">
                        <h3 className="font-medium text-gray-900">{milestone.name}</h3>
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
                      <p className="text-xs text-gray-500 mb-3">{milestone.date}</p>
                      <p className="text-sm text-gray-600 mb-3">
                        {milestone.status === "Selesai" 
                          ? "Milestone ini telah selesai dan disetujui oleh klien." 
                          : milestone.status === "Aktif"
                            ? "Milestone ini sedang dalam pengerjaan."
                            : "Milestone ini belum dimulai."
                        }
                      </p>
                      <div className="flex gap-2">
                        {milestone.status === "Aktif" && (
                          <button className="px-3 py-1 text-xs font-medium text-green-600 bg-green-50 rounded-md hover:bg-green-100">
                            Tandai Selesai
                          </button>
                        )}
                        <button className="px-3 py-1 text-xs font-medium text-gray-600 bg-gray-50 rounded-md hover:bg-gray-100">
                          Detail
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {activeTab === "files" && (
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-bold text-gray-900">File & Dokumen</h2>
                <button className="px-3 py-2 text-sm font-medium text-indigo-600 bg-indigo-50 rounded-md hover:bg-indigo-100">
                  Unggah File
                </button>
              </div>
              
              <div className="space-y-4">
                {[1, 2, 3].map((file) => (
                  <div key={file} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded bg-blue-100 mr-3 flex items-center justify-center text-blue-600">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                      </div>
                      <div>
                        <p className="font-medium">Project_Mockup_V{file}.pdf</p>
                        <p className="text-xs text-gray-500">Diunggah oleh Rina Wijaya • 15 Mei 2023</p>
                      </div>
                    </div>
                    <div className="flex">
                      <button className="p-2 text-gray-500 hover:text-gray-700">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                      </button>
                      <button className="p-2 text-gray-500 hover:text-gray-700">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {activeTab === "messages" && (
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h2 className="text-lg font-bold text-gray-900 mb-6">Pesan</h2>
              <div className="mb-6 max-h-96 overflow-y-auto">
                {/* Sample messages */}
                <div className="mb-6">
                  <div className="flex items-start">
                    <div className="w-8 h-8 rounded-full mr-3 overflow-hidden">
                      <img src={projectData.client.avatar} alt="Client" className="w-full h-full object-cover" />
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg rounded-tl-none max-w-md">
                      <div className="flex justify-between items-center mb-1">
                        <p className="font-medium text-gray-900">{projectData.client.name}</p>
                        <p className="text-xs text-gray-500">10:30</p>
                      </div>
                      <p className="text-sm text-gray-600">Halo, saya ingin menanyakan tentang progress wireframe. Apakah sudah selesai?</p>
                    </div>
                  </div>
                </div>
                
                <div className="mb-6">
                  <div className="flex items-start justify-end">
                    <div className="bg-indigo-50 p-3 rounded-lg rounded-tr-none max-w-md">
                      <div className="flex justify-between items-center mb-1">
                        <p className="font-medium text-gray-900">{projectData.freelancer.name}</p>
                        <p className="text-xs text-gray-500">10:35</p>
                      </div>
                      <p className="text-sm text-gray-600">Wireframe sudah selesai dan saya sudah upload filenya di tab Files. Silahkan dicek ya. Terima kasih!</p>
                    </div>
                    <div className="w-8 h-8 rounded-full ml-3 overflow-hidden">
                      <img src={projectData.freelancer.avatar} alt="Freelancer" className="w-full h-full object-cover" />
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Message input */}
              <div className="border-t pt-4">
                <div className="relative">
                  <input 
                    type="text" 
                    placeholder="Ketik pesan..." 
                    className="w-full pl-4 pr-20 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                  <button className="absolute right-2 top-2 px-4 py-1 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
                    Kirim
                  </button>
                </div>
              </div>
            </div>
          )}
          
          {activeTab === "payments" && (
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-bold text-gray-900">Pembayaran</h2>
                <div className="text-sm">
                  <span className="font-medium">Total:</span> {projectData.price}
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="p-4 border border-gray-200 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-medium">Pembayaran Tahap 1</h3>
                    <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">Dibayar</span>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-500">Jumlah</p>
                      <p className="font-medium">Rp 1.500.000</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Tanggal</p>
                      <p className="font-medium">18 Mei 2023</p>
                    </div>
                  </div>
                </div>
                
                <div className="p-4 border border-gray-200 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-medium">Pembayaran Tahap 2</h3>
                    <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs">Menunggu</span>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-500">Jumlah</p>
                      <p className="font-medium">Rp 3.000.000</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Jatuh Tempo</p>
                      <p className="font-medium">25 Juni 2023</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        
        {/* Sidebar */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Aktivitas Terbaru</h2>
            <div className="space-y-4">
              {projectData.activities.map((activity, index) => (
                <div key={index} className="border-l-2 border-gray-200 pl-3 py-1">
                  <p className="text-sm">
                    <span className="font-medium">{activity.user}</span> {activity.action}
                  </p>
                  <p className="text-xs text-gray-500">{activity.time}</p>
                </div>
              ))}
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Informasi Proyek</h2>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-500">ID Proyek</p>
                <p className="text-sm font-medium">{projectData.id}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Kategori</p>
                <p className="text-sm font-medium">{projectData.tags[0]}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Tanggal Mulai</p>
                <p className="text-sm font-medium">10 Mei 2023</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Estimasi Selesai</p>
                <p className="text-sm font-medium">{projectData.deadline}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default ProjectDetail;
