import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Link } from '@inertiajs/react';
import axios from 'axios';
import FreelancerLayout from './Components/FreelancerLayout';

// Define CSS keyframes animation
const fadeInAnimation = `
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: scale(0.95);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }
`;

const Services = ({ services: initialServices = [], categories: initialCategories = [] }) => {
  const [services, setServices] = useState(initialServices);
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [serviceToDelete, setServiceToDelete] = useState(null);
  const [togglingServiceId, setTogglingServiceId] = useState(null);
  const [deleteInProgress, setDeleteInProgress] = useState(false);
  const [isFiltering, setIsFiltering] = useState(false);
  
  // Update debounced search term after delay
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 300);

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm]);

  // Get unique categories from either the backend provided list or from services
  const categories = initialCategories.length > 0 ? 
    initialCategories : 
    [...new Set(services.map(service => service.category))];

  // Debounce search term to reduce performance impact during typing
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 300); // 300ms delay

    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Filter services based on search and filters
  const filteredServices = services.filter(service => {
    const matchesSearch = 
      service.title?.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
      service.description?.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
      service.category?.toLowerCase().includes(debouncedSearchTerm.toLowerCase());
    
    const matchesCategory = filterCategory === 'all' || service.category === filterCategory;
    const matchesStatus = filterStatus === 'all' || service.status === filterStatus;
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  // Functions to handle service status changes via API
  const toggleServiceStatus = (serviceId) => {
    // Set the toggling state for this service
    setTogglingServiceId(serviceId);
    
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
        alert('Gagal mengubah status layanan. Silakan coba lagi.');
      })
      .finally(() => {
        // Reset the toggling state
        setTogglingServiceId(null);
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

  // Function to delete service
  const confirmDelete = (service) => {
    console.log("Confirming delete for service:", service); // Debug log
    setServiceToDelete(service);
    setTimeout(() => {
      setShowDeleteModal(true);
    }, 10);
  };

  const cancelDelete = () => {
    console.log("Canceling delete"); // Debug log
    if (deleteInProgress) return; // Prevent closing during delete operation
    setShowDeleteModal(false);
    
    // Reset service to delete after animation completes
    setTimeout(() => {
      setServiceToDelete(null);
    }, 300);
  };

  const deleteService = async () => {
    console.log('Delete service called with:', serviceToDelete);
    if (!serviceToDelete || deleteInProgress) {
      console.log('Cannot delete - either no service selected or delete already in progress');
      return;
    }
    
    // Set delete in progress flag to show loading indicator
    setDeleteInProgress(true);
    
    try {
      console.log(`Sending delete request for service ID ${serviceToDelete.id}`);
      const response = await axios.delete(`/freelancer/services/${serviceToDelete.id}`);
      console.log('Delete response:', response);
      
      // Check if response is successful
      if (response.data && response.data.success) {
        console.log('Delete successful, updating UI');
        // Remove the deleted service from the UI
        const newServices = services.filter(service => service.id !== serviceToDelete.id);
        setServices(newServices);
        
        // Close the modal first
        setShowDeleteModal(false);
        
        // Then show success message after modal is closed
        setTimeout(() => {
          alert('Layanan berhasil dihapus');
          setServiceToDelete(null);
        }, 300);
      } else {
        throw new Error('Response did not indicate success');
      }
    } catch (error) {
      console.error('Failed to delete service:', error);
      
      // Show error message to user with more details
      let errorMessage = 'Gagal menghapus layanan. Silakan coba lagi.';
      
      if (error.response?.data?.error) {
        errorMessage = error.response.data.error;
      } else if (error.response?.status) {
        errorMessage += ` (Error ${error.response.status}: ${error.response.statusText})`;
      } else if (!navigator.onLine) {
        errorMessage = 'Tidak dapat menghapus layanan. Pastikan Anda terhubung ke internet.';
      }
      
      alert(errorMessage);
    } finally {
      // Reset progress state immediately
      setDeleteInProgress(false);
      
      // Reset other states after animation if modal was closed
      if (!showDeleteModal) {
        setTimeout(() => {
          setServiceToDelete(null);
        }, 300);
      }
    }
  };

  // Format price to Rupiah
  const formatRupiah = (price) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  // Track when filtering is happening for animations
  useEffect(() => {
    // Always trigger the animation when search or filters change
    setIsFiltering(true);
    const timer = setTimeout(() => {
      setIsFiltering(false);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchTerm, filterCategory, filterStatus, debouncedSearchTerm]);
  
  // Add a fade-in effect when the page initially loads
  const [pageLoaded, setPageLoaded] = useState(false);
  useEffect(() => {
    // Short delay to ensure smooth transition
    const timer = setTimeout(() => {
      setPageLoaded(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <FreelancerLayout
      title="Layanan Saya"
      subtitle="Kelola layanan yang Anda tawarkan kepada klien"
    >
      <style dangerouslySetInnerHTML={{ __html: fadeInAnimation }} />
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
        {/* Filter summary */}
        {(searchTerm || filterCategory !== 'all' || filterStatus !== 'all') && (
          <div className="mb-3 flex justify-between items-center p-2 bg-indigo-50 border border-indigo-100 rounded-md transition-all duration-300">
            <div className="text-xs text-gray-700">
              <div className="flex items-center">
                <svg className="h-4 w-4 mr-1.5 text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                </svg>
                <span className="font-medium text-indigo-900">{filteredServices.length}</span> 
                <span className="mx-1">dari</span> 
                <span className="font-medium text-indigo-900">{services.length}</span> 
                <span>layanan ditampilkan</span>
              </div>
              <div className="mt-1 flex flex-wrap gap-2">
                {searchTerm && (
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                    Pencarian: "{searchTerm}"
                  </span>
                )}
                {filterCategory !== 'all' && (
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                    Kategori: {filterCategory}
                  </span>
                )}
                {filterStatus !== 'all' && (
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                    Status: {filterStatus}
                  </span>
                )}
              </div>
            </div>
            <button
              onClick={() => {
                setSearchTerm('');
                setFilterCategory('all');
                setFilterStatus('all');
              }}
              className="inline-flex items-center px-3 py-1 border border-indigo-300 text-xs font-medium rounded-md shadow-sm text-indigo-700 bg-white hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <svg className="h-3.5 w-3.5 mr-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
              Reset Filter
            </button>
          </div>
        )}
        
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
                className={`focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 pr-10 py-2 sm:text-sm border-gray-300 rounded-md transition-all duration-200 ${searchTerm ? 'bg-indigo-50 border-indigo-300' : ''}`}
                placeholder="Cari layanan dengan judul, deskripsi..."
                autoComplete="off"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                  title="Clear search"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </button>
              )}
            </div>
          </div>
          
          <div className="flex gap-4">
            <div className="relative">
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className={`mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md ${filterCategory !== 'all' ? 'bg-indigo-50 border-indigo-200' : ''}`}
              >
                <option value="all">Semua Kategori</option>
                {categories && categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
              {filterCategory !== 'all' && (
                <div className="absolute top-1 right-1">
                  <button 
                    onClick={() => setFilterCategory('all')} 
                    className="inline-flex items-center p-1 text-xs text-indigo-600 hover:text-indigo-900"
                    title="Reset category filter"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
              )}
            </div>
            
            <div className="relative">
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className={`mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md ${filterStatus !== 'all' ? 'bg-indigo-50 border-indigo-200' : ''}`}
              >
                <option value="all">Semua Status</option>
                <option value="active">Aktif</option>
                <option value="draft">Draft</option>
              </select>
              {filterStatus !== 'all' && (
                <div className="absolute top-1 right-1">
                  <button 
                    onClick={() => setFilterStatus('all')} 
                    className="inline-flex items-center p-1 text-xs text-indigo-600 hover:text-indigo-900"
                    title="Reset status filter"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {filteredServices.length > 0 ? (
        <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 transition-opacity duration-500 ${pageLoaded ? 'opacity-100' : 'opacity-0'}`}>
            {filteredServices.map((service) => (
                <div
                  key={service.id}
                  className="bg-white overflow-hidden shadow-sm rounded-xl border border-gray-200 transition-all duration-300 transform hover:shadow-md"
                  style={{
                    animation: isFiltering ? 'fadeIn 0.3s ease-out forwards' : 'none'
                  }}
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
                      disabled={togglingServiceId === service.id}
                      className={`flex-1 inline-flex items-center justify-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white ${togglingServiceId === service.id ? 'opacity-75 cursor-not-allowed' : 'hover:bg-gray-50'} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
                    >
                      {togglingServiceId === service.id ? (
                        <>
                          <svg className="animate-spin h-4 w-4 mr-2 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4zm16 0a8 8 0 01-8 8v-4a4 4 0 004-4h4z"></path>
                          </svg>
                          Mengubah...
                        </>
                      ) : service.status === 'active' ? (
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
                    {service.ordersCount > 0 ? (
                      <Link 
                        href={`/freelancer/services/${service.id}/orders`}
                        className="flex-1 inline-flex items-center justify-center px-3 py-2 border border-green-300 shadow-sm text-sm font-medium rounded-md text-green-700 bg-white hover:bg-green-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                        </svg>
                        Pesanan
                        <span className="ml-1 text-xs bg-green-100 text-green-800 px-1.5 py-0.5 rounded-full">{service.ordersCount}</span>
                      </Link>
                    ) : (
                      <button 
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          console.log('Delete button clicked for service:', service.id);
                          confirmDelete(service);
                        }}
                        className={`flex-1 inline-flex items-center justify-center px-3 py-2 border border-red-300 shadow-sm text-sm font-medium rounded-md text-red-700 bg-white hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500`}
                        title="Hapus layanan ini"
                        type="button"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                        Hapus
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
            ))}
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm p-6 text-center">
          {searchTerm || filterCategory !== 'all' || filterStatus !== 'all' ? (
            <>
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
              </svg>
              <h3 className="mt-2 text-sm font-medium text-gray-900">Tidak ada layanan yang sesuai filter</h3>
              <p className="mt-1 text-sm text-gray-500">
                Coba ubah filter pencarian Anda untuk menemukan layanan yang dicari.
                {searchTerm && (
                  <span className="block mt-1">
                    Pencarian: <span className="font-medium">"{searchTerm}"</span>
                  </span>
                )}
                {filterCategory !== 'all' && (
                  <span className="block mt-1">
                    Kategori: <span className="font-medium">{filterCategory}</span>
                  </span>
                )}
                {filterStatus !== 'all' && (
                  <span className="block mt-1">
                    Status: <span className="font-medium">{filterStatus}</span>
                  </span>
                )}
              </p>
            </>
          ) : (
            <>
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <h3 className="mt-2 text-sm font-medium text-gray-900">Belum ada layanan</h3>
              <p className="mt-1 text-sm text-gray-500">
                Mulai tambahkan layanan yang Anda tawarkan kepada klien.
              </p>
            </>
          )}
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

      {/* Delete Confirmation Modal */}
      {(showDeleteModal && serviceToDelete) && (
        <div className="fixed inset-0 overflow-y-auto z-50" aria-labelledby="modal-title" role="dialog" aria-modal="true">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div 
              className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity z-[-1]" 
              aria-hidden="true" 
              onClick={deleteInProgress ? undefined : cancelDelete}
              style={{ cursor: deleteInProgress ? 'not-allowed' : 'pointer' }}
            ></div>

            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
              <div className="sm:flex sm:items-start">
                <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                  <svg className="h-6 w-6 text-red-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                  <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">Hapus Layanan</h3>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      Apakah Anda yakin ingin menghapus layanan "{serviceToDelete.title}"? Tindakan ini tidak dapat dibatalkan.
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                <button
                type="button"
                className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={deleteService}
                disabled={deleteInProgress}
              >
                {deleteInProgress ? (
                  <span className="inline-flex items-center">
                    <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4zm16 0a8 8 0 01-8 8v-4a4 4 0 004-4h4z"></path>
                    </svg>
                    Sedang Menghapus...
                  </span>
                ) : (
                  <>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    Hapus
                  </>
                )}
              </button>
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                  onClick={cancelDelete}
                  disabled={deleteInProgress}
                >
                  Batal
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </FreelancerLayout>
  );
};

export default Services;
