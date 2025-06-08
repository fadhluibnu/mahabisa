import React, { useState } from 'react';
import { Link } from '@inertiajs/react';
import axios from 'axios';
import FreelancerLayout from './Components/FreelancerLayout';

const Services = ({ services: initialServices = [], categories: initialCategories = [] }) => {
  const [services, setServices] = useState(initialServices);

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

  // Get unique categories from either the backend provided list or from services
  const categories = initialCategories.length > 0 ? 
    initialCategories : 
    [...new Set(services.map(service => service.category))];

  // Functions to handle service status changes via API
  const toggleServiceStatus = (serviceId) => {
    // Make an API call to update the service status
    axios.put(`/freelancer/services/${serviceId}/toggle-status`)
      .then(response => {
        if (response.data.success) {
          // Update the local state to reflect the change
          const newServices = services.map((service) =>
            service.id === serviceId
              ? { ...service, status: service.status === 'active' ? 'draft' : 'active' }
              : service
          );
          setServices(newServices);
        }
      })
      .catch(error => {
        console.error('Failed to update service status:', error);
        // You could add a toast notification here to show the error
      });
  };

  const toggleServiceFeatured = (serviceId) => {
    // For now, we'll continue updating the UI locally since the API endpoint doesn't exist yet
    // But we'll structure it to be ready for when the API is implemented
    const newServices = services.map((service) =>
      service.id === serviceId
        ? { ...service, featured: !service.featured }
        : service
    );
    setServices(newServices);
    
    // This would be the actual implementation once the API endpoint is created:
    /*
    axios.put(`/freelancer/services/${serviceId}/toggle-featured`)
      .then(response => {
        if (response.data.success) {
          const newServices = services.map((service) =>
            service.id === serviceId
              ? { ...service, featured: !service.featured }
              : service
          );
          setServices(newServices);
        }
      })
      .catch(error => {
        console.error('Failed to update service featured status:', error);
      });
    */
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
          <p className="text-sm text-gray-500 mt-1">
            {services.reduce((total, service) => total + (service.completedOrders || 0), 0)} pesanan selesai &bull; {services.reduce((total, service) => total + (service.activeOrders || 0), 0)} pesanan aktif
          </p>
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
                {categories && categories.map((category) => (
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
                  <p className="text-sm text-gray-500 mb-2 flex items-center">
                    <span>{service.category}</span>
                    {service.skills && service.skills.length > 0 && (
                      <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800">
                        {service.skills.length} skills
                      </span>
                    )}
                  </p>
                  <p className="text-sm text-gray-600 line-clamp-2" title={service.description}>
                    {service.description}
                  </p>
                </div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-lg font-bold text-indigo-600">
                    {formatRupiah(service.price)}
                  </span>
                  <div className="text-sm text-gray-500">
                    <span>{service.deliveryTime} hari</span>
                    <span className="mx-1">•</span>
                    <span>{service.revisions} revisi</span>
                  </div>
                </div>
                
                {/* Stats row */}
                <div className="flex items-center justify-between text-xs text-gray-500 mb-4 border-t border-gray-100 pt-2 mt-2">
                  <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-yellow-500" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.799-2.034c-.784-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    {service.rating || 0} ({service.reviewsCount || 0})
                  </div>
                  <div>
                    <span className="font-medium">{service.completedOrders || 0}</span> pesanan selesai
                  </div>
                </div>
                <div className="flex flex-col space-y-2">
                  <div className="flex space-x-2">
                    <Link
                      href={`/freelancer/services/${service.id}`}
                      className="flex-1 inline-flex items-center justify-center px-3 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                      Detail
                    </Link>
                    <Link
                      href={`/freelancer/services/${service.id}/edit`}
                      className="flex-1 inline-flex items-center justify-center px-3 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                      Edit
                    </Link>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => toggleServiceStatus(service.id)}
                      className="flex-1 inline-flex items-center justify-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
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
                    <Link 
                      href={service.ordersCount > 0 ? `/freelancer/services/${service.id}/orders` : "#"}
                      className={`flex-1 inline-flex items-center justify-center px-3 py-2 border shadow-sm text-sm font-medium rounded-md ${
                        service.ordersCount > 0 
                          ? 'border-green-300 text-green-700 bg-white hover:bg-green-50' 
                          : 'border-gray-200 text-gray-400 bg-gray-50 cursor-default'
                      } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500`}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                      </svg>
                      Pesanan
                      {service.ordersCount > 0 && <span className="ml-1 text-xs bg-green-100 text-green-800 px-1.5 py-0.5 rounded-full">{service.ordersCount}</span>}
                    </Link>
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
          <h3 className="mt-2 text-sm font-medium text-gray-900">{searchTerm || filterCategory !== 'all' || filterStatus !== 'all' ? 'Tidak ada layanan yang sesuai filter' : 'Belum ada layanan'}</h3>
          <p className="mt-1 text-sm text-gray-500">
            {searchTerm || filterCategory !== 'all' || filterStatus !== 'all' 
              ? 'Coba ubah filter pencarian Anda untuk menemukan layanan yang dicari.' 
              : 'Mulai tambahkan layanan yang Anda tawarkan kepada klien.'}
          </p>
          <div className="mt-6">
            {searchTerm || filterCategory !== 'all' || filterStatus !== 'all' ? (
              <button
                onClick={() => {
                  setSearchTerm('');
                  setFilterCategory('all');
                  setFilterStatus('all');
                }}
                className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mr-3"
              >
                <svg className="h-4 w-4 mr-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                Reset Filter
              </button>
            ) : null}
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
