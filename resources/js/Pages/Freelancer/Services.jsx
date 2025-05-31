import React, { useState } from 'react';
import { Link } from '@inertiajs/react';
import FreelancerLayout from './Components/FreelancerLayout';

const Services = () => {
  const [services, setServices] = useState([
    {
      id: 1,
      title: 'Web Development dengan React & Laravel',
      description: 'Membuat website modern dengan React di frontend dan Laravel di backend. Termasuk responsive design dan optimasi kinerja.',
      price: 2500000,
      deliveryTime: 14,
      revisions: 3,
      image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      status: 'active',
      featured: true,
      category: 'Web Development',
    },
    {
      id: 2,
      title: 'UI/UX Design untuk Mobile App',
      description: 'Desain interface pengguna yang menarik dan user experience yang optimal untuk aplikasi mobile. Termasuk wireframe, mockup, dan prototype.',
      price: 1800000,
      deliveryTime: 7,
      revisions: 2,
      image: 'https://images.unsplash.com/photo-1513710239666-c29e2c09dc32?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      status: 'active',
      featured: false,
      category: 'UI/UX Design',
    },
    {
      id: 3,
      title: 'Logo & Brand Identity Design',
      description: 'Desain logo profesional dan brand identity lengkap untuk bisnis Anda. Termasuk guidelines dan berbagai format file.',
      price: 1200000,
      deliveryTime: 5,
      revisions: 5,
      image: 'https://images.unsplash.com/photo-1545841729-0fb1e6ffba2e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      status: 'draft',
      featured: false,
      category: 'Graphic Design',
    },
  ]);

  const [isAddingService, setIsAddingService] = useState(false);
  const [newService, setNewService] = useState({
    title: '',
    description: '',
    price: 0,
    deliveryTime: 7,
    revisions: 2,
    image: '',
    category: '',
  });
  
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');

  // Filter services based on search and filters
  const filteredServices = services.filter(service => {
    const matchesSearch = 
      service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.category.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = filterCategory === 'all' || service.category === filterCategory;
    const matchesStatus = filterStatus === 'all' || service.status === filterStatus;
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  // Get unique categories from services
  const categories = [...new Set(services.map(service => service.category))];

  const handleAddService = () => {
    if (newService.title.trim() && newService.description.trim()) {
      setServices([
        ...services,
        {
          id: Date.now(),
          ...newService,
          status: 'draft',
          featured: false,
        },
      ]);
      setNewService({
        title: '',
        description: '',
        price: 0,
        deliveryTime: 7,
        revisions: 2,
        image: '',
        category: '',
      });
      setIsAddingService(false);
    }
  };

  const toggleServiceStatus = (serviceId) => {
    setServices(
      services.map((service) =>
        service.id === serviceId
          ? { ...service, status: service.status === 'active' ? 'draft' : 'active' }
          : service
      )
    );
  };

  const toggleServiceFeatured = (serviceId) => {
    setServices(
      services.map((service) =>
        service.id === serviceId
          ? { ...service, featured: !service.featured }
          : service
      )
    );
  };

  const deleteService = (serviceId) => {
    setServices(services.filter((service) => service.id !== serviceId));
  };

  // Format price to Rupiah
  const formatRupiah = (price) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <FreelancerLayout
      title="Layanan Saya"
      subtitle="Kelola layanan yang Anda tawarkan kepada klien"
    >
      <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex-grow">
          <h2 className="text-lg font-medium text-gray-900">
            Daftar Layanan ({services.filter(s => s.status === 'active').length} Aktif)
          </h2>
        </div>
        
        <Link
          href="/freelancer/services/create"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <svg
            className="h-4 w-4 mr-1"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
          Tambah Layanan
        </Link>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-grow">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                </svg>
              </div>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 pr-3 py-2 sm:text-sm border-gray-300 rounded-md"
                placeholder="Cari layanan..."
              />
            </div>
          </div>
          
          <div className="flex gap-4">
            <div>
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              >
                <option value="all">Semua Kategori</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              >
                <option value="all">Semua Status</option>
                <option value="active">Aktif</option>
                <option value="draft">Draft</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {filteredServices.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((service) => (
            <div
              key={service.id}
              className="bg-white overflow-hidden shadow-sm rounded-xl border border-gray-200"
            >
              <div className="relative">
                <img
                  src={service.image}
                  alt={service.title}
                  className="h-48 w-full object-cover"
                />
                <div className="absolute top-2 right-2 flex space-x-2">
                  {service.featured && (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                      Featured
                    </span>
                  )}
                  {service.status === 'active' ? (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      Aktif
                    </span>
                  ) : (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                      Draft
                    </span>
                  )}
                </div>
              </div>
              <div className="p-4">
                <div className="mb-3">
                  <h3 className="text-lg font-medium text-gray-900 truncate" title={service.title}>
                    {service.title}
                  </h3>
                  <p className="text-sm text-gray-500 mb-2">{service.category}</p>
                  <p className="text-sm text-gray-600 line-clamp-2" title={service.description}>
                    {service.description}
                  </p>
                </div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-lg font-bold text-indigo-600">
                    {formatRupiah(service.price)}
                  </span>
                  <div className="text-sm text-gray-500">
                    <span>{service.deliveryTime} hari</span>
                    <span className="mx-1">•</span>
                    <span>{service.revisions} revisi</span>
                  </div>
                </div>
                <div className="flex flex-col space-y-2">
                  <Link
                    href={`/freelancer/services/${service.id}`}
                    className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    Lihat Detail
                  </Link>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => toggleServiceStatus(service.id)}
                      className="flex-1 inline-flex items-center justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      {service.status === 'active' ? (
                        <>
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                          </svg>
                          Nonaktifkan
                        </>
                      ) : (
                        <>
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          Aktifkan
                        </>
                      )}
                    </button>
                    <button
                      onClick={() => toggleServiceFeatured(service.id)}
                      className="flex-1 inline-flex items-center justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      {service.featured ? (
                        <>
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                          </svg>
                          Hapus Featured
                        </>
                      ) : (
                        <>
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                          </svg>
                          Featured
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm p-6 text-center">
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">Tidak ada layanan</h3>
          <p className="mt-1 text-sm text-gray-500">
            Mulai tambahkan layanan yang Anda tawarkan kepada klien.
          </p>
          <div className="mt-6">
            <Link
              href="/freelancer/services/create"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <svg
                className="h-4 w-4 mr-1"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
              Tambah Layanan
            </Link>
          </div>
        </div>
      )}
    </FreelancerLayout>
  );
};

export default Services;
