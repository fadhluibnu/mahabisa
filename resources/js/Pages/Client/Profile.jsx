import React, { useState } from 'react';
import ClientLayout from './Components/ClientLayout';

const Profile = () => {
  const [activeTab, setActiveTab] = useState('personal');

  // Dummy profile data
  const profile = {
    personal: {
      name: 'Dian Prasetyo',
      title: 'Marketing Manager',
      email: 'dian.prasetyo@gmail.com',
      phone: '+62 812-3456-7890',
      location: 'Jakarta, Indonesia',
      bio: 'Saya adalah seorang Marketing Manager dengan pengalaman lebih dari 5 tahun dalam pengembangan strategi pemasaran digital dan branding. Saya senang bekerja sama dengan freelancer kreatif untuk mengembangkan kampanye pemasaran yang efektif.',
      imageUrl: 'https://ui-avatars.com/api/?name=Dian+Prasetyo&size=200',
      company: 'PT Digital Solusi Indonesia',
      position: 'Marketing Manager',
      website: 'www.digitalsolusi.co.id',
    },
    projects: [
      {
        id: 1,
        title: 'Pengembangan Website E-commerce',
        freelancer: 'Alex Suryanto',
        status: 'ongoing',
        date: '2025-06-01',
        budget: 'Rp4.500.000',
      },
      {
        id: 2,
        title: 'Desain Logo Perusahaan',
        freelancer: 'Diana Putri',
        status: 'pending',
        date: '2025-05-25',
        budget: 'Rp1.500.000',
      },
      {
        id: 3,
        title: 'Website Portofolio Pribadi',
        freelancer: 'Budi Santoso',
        status: 'completed',
        date: '2025-05-10',
        budget: 'Rp3.000.000',
      },
    ],
    reviews: [
      {
        id: 1,
        freelancer: {
          name: 'Alex Suryanto',
          image: 'https://ui-avatars.com/api/?name=Alex+Suryanto&background=8b5cf6&color=fff',
        },
        project: 'Pengembangan Website E-commerce',
        rating: 5,
        comment: 'Alex sangat profesional dan hasil kerjanya luar biasa. Website e-commerce kami sangat user-friendly dan desainnya modern. Komunikasi lancar dan selalu tepat waktu dalam pengerjaan.',
        date: '2025-05-20',
      },
      {
        id: 2,
        freelancer: {
          name: 'Budi Santoso',
          image: 'https://ui-avatars.com/api/?name=Budi+Santoso&background=f59e0b&color=fff',
        },
        project: 'Website Portofolio Pribadi',
        rating: 4,
        comment: 'Budi mengerjakan website portofolio dengan sangat baik. Responsif dan menerima feedback dengan terbuka. Ada beberapa revisi minor, tapi secara keseluruhan saya puas dengan hasilnya.',
        date: '2025-05-15',
      },
    ],
    billing: {
      cardType: 'Visa',
      cardNumber: '**** **** **** 4242',
      expiry: '12/25',
      address: 'Jl. Jendral Sudirman No. 123, Jakarta Selatan, DKI Jakarta, 12190',
      paymentHistory: [
        {
          id: 1,
          project: 'Website Portofolio Pribadi',
          amount: 'Rp3.000.000',
          date: '2025-05-10',
          status: 'success',
        },
        {
          id: 2,
          project: 'Desain Logo Perusahaan',
          amount: 'Rp750.000',
          date: '2025-05-25',
          status: 'success',
        },
        {
          id: 3,
          project: 'Pengembangan Website E-commerce',
          amount: 'Rp2.250.000',
          date: '2025-06-01',
          status: 'success',
        },
      ],
    }
  };

  // Get status badge color
  const getStatusBadge = (status) => {
    switch (status) {
      case 'ongoing':
        return 'bg-blue-100 text-blue-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Format status text
  const getStatusText = (status) => {
    switch (status) {
      case 'ongoing':
        return 'Sedang Berjalan';
      case 'completed':
        return 'Selesai';
      case 'pending':
        return 'Menunggu';
      default:
        return status;
    }
  };

  return (
    <ClientLayout
      title="Profil"
      subtitle="Kelola informasi profil Anda"
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="p-6 text-center">
              <img
                src={profile.personal.imageUrl}
                alt={profile.personal.name}
                className="w-32 h-32 rounded-full mx-auto"
              />
              <h2 className="mt-4 text-xl font-semibold text-gray-900">{profile.personal.name}</h2>
              <p className="text-gray-500">{profile.personal.title}</p>
              <p className="mt-1 text-sm text-gray-500">{profile.personal.location}</p>
              
              <div className="mt-6 flex justify-center">
                <button className="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                  Edit Profil
                </button>
              </div>
            </div>
            
            <div className="border-t border-gray-200">
              <div className="p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Kontak</h3>
                <ul className="space-y-3">
                  <li className="flex items-center text-sm">
                    <svg className="h-5 w-5 text-gray-400 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <span className="text-gray-600">{profile.personal.email}</span>
                  </li>
                  <li className="flex items-center text-sm">
                    <svg className="h-5 w-5 text-gray-400 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <span className="text-gray-600">{profile.personal.phone}</span>
                  </li>
                  <li className="flex items-center text-sm">
                    <svg className="h-5 w-5 text-gray-400 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                    </svg>
                    <span className="text-gray-600">{profile.personal.website}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        
        {/* Main Content */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            {/* Tabs */}
            <div className="border-b border-gray-200">
              <nav className="flex -mb-px">
                <button
                  onClick={() => setActiveTab('personal')}
                  className={`py-4 px-6 text-center border-b-2 text-sm font-medium ${
                    activeTab === 'personal'
                      ? 'border-indigo-500 text-indigo-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Informasi Pribadi
                </button>
                <button                  onClick={() => setActiveTab('projects')}
                  className={`py-4 px-6 text-center border-b-2 text-sm font-medium ${
                    activeTab === 'projects'
                      ? 'border-indigo-500 text-indigo-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Proyek
                </button>
                <button                  onClick={() => setActiveTab('reviews')}
                  className={`py-4 px-6 text-center border-b-2 text-sm font-medium ${
                    activeTab === 'reviews'
                      ? 'border-indigo-500 text-indigo-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Ulasan Saya
                </button>
                <button
                  onClick={() => setActiveTab('billing')}                  className={`py-4 px-6 text-center border-b-2 text-sm font-medium ${
                    activeTab === 'billing'
                      ? 'border-indigo-500 text-indigo-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Pembayaran
                </button>
              </nav>
            </div>
            
            {/* Tab Content */}
            <div className="p-6">
              {/* Personal Info Tab */}
              {activeTab === 'personal' && (
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-6">Informasi Pribadi</h3>
                  
                  <div className="space-y-6">
                    <div>
                      <h4 className="text-sm font-medium text-gray-500 mb-1">Bio</h4>
                      <p className="text-gray-700">{profile.personal.bio}</p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="text-sm font-medium text-gray-500 mb-1">Nama Lengkap</h4>
                        <p className="text-gray-700">{profile.personal.name}</p>
                      </div>
                      
                      <div>
                        <h4 className="text-sm font-medium text-gray-500 mb-1">Email</h4>
                        <p className="text-gray-700">{profile.personal.email}</p>
                      </div>
                      
                      <div>
                        <h4 className="text-sm font-medium text-gray-500 mb-1">Telepon</h4>
                        <p className="text-gray-700">{profile.personal.phone}</p>
                      </div>
                      
                      <div>
                        <h4 className="text-sm font-medium text-gray-500 mb-1">Lokasi</h4>
                        <p className="text-gray-700">{profile.personal.location}</p>
                      </div>
                    </div>
                    
                    <div className="pt-6 border-t border-gray-200">
                      <h3 className="text-lg font-medium text-gray-900 mb-4">Informasi Perusahaan</h3>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="text-sm font-medium text-gray-500 mb-1">Perusahaan</h4>
                          <p className="text-gray-700">{profile.personal.company}</p>
                        </div>
                        
                        <div>
                          <h4 className="text-sm font-medium text-gray-500 mb-1">Jabatan</h4>
                          <p className="text-gray-700">{profile.personal.position}</p>
                        </div>
                        
                        <div>
                          <h4 className="text-sm font-medium text-gray-500 mb-1">Website</h4>
                          <p className="text-gray-700">{profile.personal.website}</p>
                        </div>
                      </div>
                    </div>
                      <div className="pt-6 flex justify-end">
                      <button className="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                        Edit Informasi
                      </button>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Projects Tab */}
              {activeTab === 'projects' && (
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-lg font-medium text-gray-900">Proyek Saya</h3>
                    <a
                      href="/client/projects"
                      className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Lihat Semua
                    </a>
                  </div>
                  
                  <div className="overflow-hidden border border-gray-200 rounded-lg">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Proyek
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Freelancer
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Status
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Tanggal
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Budget
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {profile.projects.map((project) => (
                          <tr key={project.id}>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <a href={`/client/projects/${project.id}`} className="text-sm font-medium text-gray-600 hover:text-gray-900">
                                {project.title}
                              </a>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {project.freelancer}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadge(project.status)}`}>
                                {getStatusText(project.status)}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {project.date}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {project.budget}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
              
              {/* Reviews Tab */}
              {activeTab === 'reviews' && (
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-6">Ulasan Saya</h3>
                  
                  <div className="space-y-6">
                    {profile.reviews.map((review) => (
                      <div key={review.id} className="border border-gray-200 rounded-lg p-6">
                        <div className="flex items-center mb-4">
                          <img
                            src={review.freelancer.image}
                            alt={review.freelancer.name}
                            className="h-10 w-10 rounded-full mr-4"
                          />
                          <div>
                            <h4 className="text-sm font-medium text-gray-900">{review.freelancer.name}</h4>
                            <p className="text-xs text-gray-500">{review.project}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center mb-2">
                          {[...Array(5)].map((_, i) => (
                            <svg
                              key={i}
                              className={`h-5 w-5 ${
                                i < review.rating ? 'text-yellow-400' : 'text-gray-300'
                              }`}
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z" />
                            </svg>
                          ))}
                          <span className="ml-2 text-sm text-gray-500">{review.date}</span>
                        </div>
                        
                        <p className="text-gray-700">{review.comment}</p>
                        
                        <div className="mt-4 flex justify-end">                          <button className="text-sm text-indigo-600 hover:text-indigo-900 font-medium">
                            Edit Ulasan
                          </button>
                        </div>
                      </div>
                    ))}
                    
                    {profile.reviews.length === 0 && (
                      <div className="text-center py-8">
                        <svg
                          className="mx-auto h-12 w-12 text-gray-400"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                          />
                        </svg>
                        <h3 className="mt-2 text-sm font-medium text-gray-900">Belum ada ulasan</h3>
                        <p className="mt-1 text-sm text-gray-500">
                          Mulai beri ulasan pada freelancer yang telah bekerja dengan Anda.
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              )}
              
              {/* Billing Tab */}
              {activeTab === 'billing' && (
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-lg font-medium text-gray-900">Informasi Pembayaran</h3>
                    <button className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                      Tambah Metode Pembayaran
                    </button>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-lg mb-6">
                    <h4 className="text-md font-medium text-gray-700 mb-4">Metode Pembayaran</h4>
                    
                    <div className="flex items-center p-4 border border-gray-200 rounded-lg bg-white">
                      <div className="flex-shrink-0 mr-4">
                        <svg className="h-8 w-8 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-700">{profile.billing.cardType}</p>
                        <p className="text-sm text-gray-500">{profile.billing.cardNumber} • Exp: {profile.billing.expiry}</p>
                      </div>
                      <div>
                        <button className="text-sm text-indigo-600 hover:text-indigo-900 font-medium">
                          Edit
                        </button>
                      </div>
                    </div>
                    
                    <div className="mt-4">
                      <h4 className="text-sm font-medium text-gray-700 mb-2">Alamat Penagihan</h4>
                      <p className="text-sm text-gray-500">{profile.billing.address}</p>
                    </div>
                  </div>
                  
                  <h4 className="text-md font-medium text-gray-700 mb-4">Riwayat Pembayaran</h4>
                  <div className="overflow-hidden border border-gray-200 rounded-lg">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Proyek
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Jumlah
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Tanggal
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Status
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Faktur
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {profile.billing.paymentHistory.map((payment) => (
                          <tr key={payment.id}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                              {payment.project}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {payment.amount}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {payment.date}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                Berhasil
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              <button className="text-indigo-600 hover:text-indigo-900 font-medium">
                                Download
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </ClientLayout>
  );
};

export default Profile;
