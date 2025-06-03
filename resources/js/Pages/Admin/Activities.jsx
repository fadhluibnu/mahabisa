import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import AdminLayout from './Components/AdminLayout';

const Activities = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Dummy activities data
  const activities = [
    {
      id: 1,
      user: {
        id: 1,
        name: 'Dewi Susanti',
        avatar: 'https://randomuser.me/api/portraits/women/23.jpg',
        role: 'freelancer'
      },
      type: 'project',
      action: 'menyelesaikan proyek',
      target: {
        id: 5,
        name: 'Website E-commerce'
      },
      time: '2 jam yang lalu',
      date: '12 Juni 2023'
    },
    {
      id: 2,
      user: {
        id: 2,
        name: 'Agus Pratama',
        avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
        role: 'freelancer'
      },
      type: 'account',
      action: 'bergabung sebagai freelancer',
      target: null,
      time: '5 jam yang lalu',
      date: '12 Juni 2023'
    },
    {
      id: 3,
      user: {
        id: 3,
        name: 'Nina Maulida',
        avatar: 'https://randomuser.me/api/portraits/women/67.jpg',
        role: 'freelancer'
      },
      type: 'portfolio',
      action: 'menambahkan portofolio baru',
      target: {
        id: 12,
        name: 'Mobile App Design'
      },
      time: 'Kemarin, 16:42',
      date: '11 Juni 2023'
    },
    {
      id: 4,
      user: {
        id: 4,
        name: 'Rudi Hartono',
        avatar: 'https://randomuser.me/api/portraits/men/54.jpg',
        role: 'freelancer'
      },
      type: 'review',
      action: 'mendapatkan 5 review bintang',
      target: {
        id: 9,
        name: 'Content Writing Project'
      },
      time: 'Kemarin, 09:27',
      date: '11 Juni 2023'
    },
    {
      id: 5,
      user: {
        id: 5,
        name: 'Maya Sari',
        avatar: 'https://randomuser.me/api/portraits/women/45.jpg',
        role: 'client'
      },
      type: 'project',
      action: 'membuat proyek baru',
      target: {
        id: 15,
        name: 'Brand Identity Design'
      },
      time: '2 hari yang lalu',
      date: '10 Juni 2023'
    },
    {
      id: 6,
      user: {
        id: 6,
        name: 'Dian Pratiwi',
        avatar: 'https://randomuser.me/api/portraits/women/33.jpg',
        role: 'freelancer'
      },
      type: 'payment',
      action: 'menerima pembayaran',
      target: {
        id: 11,
        name: 'Logo Design Project'
      },
      time: '2 hari yang lalu',
      date: '10 Juni 2023'
    },
    {
      id: 7,
      user: {
        id: 7,
        name: 'Budi Santoso',
        avatar: 'https://randomuser.me/api/portraits/men/45.jpg',
        role: 'client'
      },
      type: 'account',
      action: 'bergabung sebagai klien',
      target: null,
      time: '3 hari yang lalu',
      date: '9 Juni 2023'
    },
    {
      id: 8,
      user: {
        id: 8,
        name: 'Indra Kusuma',
        avatar: 'https://randomuser.me/api/portraits/men/33.jpg',
        role: 'admin'
      },
      type: 'system',
      action: 'menambahkan kategori baru',
      target: {
        id: 6,
        name: 'AI Development'
      },
      time: '3 hari yang lalu',
      date: '9 Juni 2023'
    },
    {
      id: 9,
      user: {
        id: 9,
        name: 'Siti Nurhaliza',
        avatar: 'https://randomuser.me/api/portraits/women/22.jpg',
        role: 'freelancer'
      },
      type: 'milestone',
      action: 'menyelesaikan milestone',
      target: {
        id: 8,
        name: 'Mobile App Development'
      },
      time: '4 hari yang lalu',
      date: '8 Juni 2023'
    },
    {
      id: 10,
      user: {
        id: 10,
        name: 'Ahmad Fauzi',
        avatar: 'https://randomuser.me/api/portraits/men/22.jpg',
        role: 'freelancer'
      },
      type: 'project',
      action: 'memulai proyek baru',
      target: {
        id: 14,
        name: 'Web Development'
      },
      time: '4 hari yang lalu',
      date: '8 Juni 2023'
    },
    {
      id: 11,
      user: {
        id: 11,
        name: 'Farah Adiba',
        avatar: 'https://randomuser.me/api/portraits/women/11.jpg',
        role: 'client'
      },
      type: 'review',
      action: 'memberikan ulasan',
      target: {
        id: 7,
        name: 'SEO Optimization'
      },
      time: '5 hari yang lalu',
      date: '7 Juni 2023'
    },
    {
      id: 12,
      user: {
        id: 12,
        name: 'Rizki Perdana',
        avatar: 'https://randomuser.me/api/portraits/men/11.jpg',
        role: 'freelancer'
      },
      type: 'payment',
      action: 'mengajukan pembayaran',
      target: {
        id: 10,
        name: 'UI/UX Design'
      },
      time: '5 hari yang lalu',
      date: '7 Juni 2023'
    },
    {
      id: 13,
      user: {
        id: 13,
        name: 'Anita Wijaya',
        avatar: 'https://randomuser.me/api/portraits/women/9.jpg',
        role: 'freelancer'
      },
      type: 'portfolio',
      action: 'memperbarui portofolio',
      target: null,
      time: '6 hari yang lalu',
      date: '6 Juni 2023'
    },
    {
      id: 14,
      user: {
        id: 14,
        name: 'Hendra Mulya',
        avatar: 'https://randomuser.me/api/portraits/men/9.jpg',
        role: 'freelancer'
      },
      type: 'skill',
      action: 'menambahkan skill baru',
      target: {
        id: 4,
        name: 'React Native'
      },
      time: '6 hari yang lalu',
      date: '6 Juni 2023'
    },
    {
      id: 15,
      user: {
        id: 15,
        name: 'Kartika Dewi',
        avatar: 'https://randomuser.me/api/portraits/women/8.jpg',
        role: 'admin'
      },
      type: 'system',
      action: 'memperbarui ketentuan platform',
      target: null,
      time: '7 hari yang lalu',
      date: '5 Juni 2023'
    }
  ];

  // Filter activities by category
  const filteredActivities = selectedCategory === 'all' 
    ? activities 
    : activities.filter(activity => activity.type === selectedCategory);

  // Pagination
  const totalPages = Math.ceil(filteredActivities.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentActivities = filteredActivities.slice(indexOfFirstItem, indexOfLastItem);

  // Handle page change
  const handlePageChange = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  // Group activities by date
  const groupedActivities = currentActivities.reduce((groups, activity) => {
    const date = activity.date;
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(activity);
    return groups;
  }, {});

  // Get activity icon based on type
  const getActivityIcon = (type) => {
    switch (type) {
      case 'project':
        return (
          <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          </div>
        );
      case 'account':
        return (
          <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-600">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
        );
      case 'review':
        return (
          <div className="w-8 h-8 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-600">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
            </svg>
          </div>
        );
      case 'payment':
        return (
          <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-600">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        );
      case 'portfolio':
        return (
          <div className="w-8 h-8 rounded-full bg-pink-100 flex items-center justify-center text-pink-600">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        );
      case 'milestone':
        return (
          <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
            </svg>
          </div>
        );
      case 'skill':
        return (
          <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center text-red-600">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
        );
      case 'system':
        return (
          <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
        );
      default:
        return (
          <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        );
    }
  };

  return (
    <AdminLayout 
      title="Aktivitas Pengguna" 
      subtitle="Pantau semua aktivitas terbaru di platform"
    >
      <Head title="Aktivitas Pengguna - MahaBisa Admin" />

      {/* Filter Bar */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 mb-6">
        <div className="flex flex-wrap gap-2">
          <button 
            onClick={() => setSelectedCategory('all')}
            className={`px-3 py-2 text-sm font-medium rounded-md ${
              selectedCategory === 'all' 
                ? 'bg-indigo-100 text-indigo-700' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Semua
          </button>
          <button 
            onClick={() => setSelectedCategory('project')}
            className={`px-3 py-2 text-sm font-medium rounded-md ${
              selectedCategory === 'project' 
                ? 'bg-indigo-100 text-indigo-700' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Proyek
          </button>
          <button 
            onClick={() => setSelectedCategory('account')}
            className={`px-3 py-2 text-sm font-medium rounded-md ${
              selectedCategory === 'account' 
                ? 'bg-indigo-100 text-indigo-700' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Akun
          </button>
          <button 
            onClick={() => setSelectedCategory('review')}
            className={`px-3 py-2 text-sm font-medium rounded-md ${
              selectedCategory === 'review' 
                ? 'bg-indigo-100 text-indigo-700' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Review
          </button>
          <button 
            onClick={() => setSelectedCategory('payment')}
            className={`px-3 py-2 text-sm font-medium rounded-md ${
              selectedCategory === 'payment' 
                ? 'bg-indigo-100 text-indigo-700' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Pembayaran
          </button>
          <button 
            onClick={() => setSelectedCategory('milestone')}
            className={`px-3 py-2 text-sm font-medium rounded-md ${
              selectedCategory === 'milestone' 
                ? 'bg-indigo-100 text-indigo-700' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Milestone
          </button>
          <button 
            onClick={() => setSelectedCategory('system')}
            className={`px-3 py-2 text-sm font-medium rounded-md ${
              selectedCategory === 'system' 
                ? 'bg-indigo-100 text-indigo-700' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Sistem
          </button>
        </div>
      </div>

      {/* Activities List */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-6">
        <h3 className="font-bold text-lg text-gray-900 mb-6">
          {selectedCategory === 'all' ? 'Semua Aktivitas' : `Aktivitas ${selectedCategory}`}
        </h3>

        {Object.keys(groupedActivities).length > 0 ? (
          Object.keys(groupedActivities).map((date) => (
            <div key={date} className="mb-8">
              <h4 className="text-sm font-medium text-gray-500 mb-4">{date}</h4>
              <div className="space-y-6">
                {groupedActivities[date].map((activity) => (
                  <div key={activity.id} className="flex">
                    <div className="mr-4 flex items-center flex-shrink-0">
                      {getActivityIcon(activity.type)}
                    </div>
                    <div className="flex-grow">
                      <div className="flex items-center">
                        <div className="w-8 h-8 rounded-full overflow-hidden mr-3 flex-shrink-0">
                          <img 
                            src={activity.user.avatar} 
                            alt={activity.user.name} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <p className="text-sm text-gray-900">
                            <Link 
                              href={`/admin/users/${activity.user.id}`}
                              className="font-medium hover:text-indigo-600"
                            >
                              {activity.user.name}
                            </Link>
                            {' '}{activity.action}{' '}
                            {activity.target && (
                              <Link 
                                href={`/admin/projects/${activity.target.id}`}
                                className="font-medium hover:text-indigo-600"
                              >
                                {activity.target.name}
                              </Link>
                            )}
                          </p>
                          <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex-shrink-0 self-start">
                      <span className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-full ${
                        activity.user.role === 'freelancer'
                          ? 'bg-blue-100 text-blue-800'
                          : activity.user.role === 'client'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-purple-100 text-purple-800'
                      }`}>
                        {activity.user.role === 'freelancer' 
                          ? 'Freelancer' 
                          : activity.user.role === 'client' 
                            ? 'Klien' 
                            : 'Admin'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-500">Tidak ada aktivitas ditemukan</p>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-8 flex justify-center">
            <nav className="flex items-center">
              <button 
                onClick={() => handlePageChange(currentPage - 1)} 
                disabled={currentPage === 1}
                className={`px-3 py-1 rounded-md text-sm font-medium ${
                  currentPage === 1 
                    ? 'text-gray-300 cursor-not-allowed' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
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
                className={`px-3 py-1 rounded-md text-sm font-medium ${
                  currentPage === totalPages 
                    ? 'text-gray-300 cursor-not-allowed' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Selanjutnya &raquo;
              </button>
            </nav>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default Activities;
