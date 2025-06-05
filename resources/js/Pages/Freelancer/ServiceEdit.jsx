import React, { useState, useEffect } from 'react';
import { Link, router } from '@inertiajs/react';
import FreelancerLayout from './Components/FreelancerLayout';
import { FaArrowLeft, FaSave, FaTimes, FaPlus, FaTrash } from 'react-icons/fa';

const ServiceEdit = ({ id }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [service, setService] = useState({
    id: id || 1,
    title: 'Web Development dengan React & Laravel',
    description: 'Membuat website modern dengan React di frontend dan Laravel di backend. Termasuk responsive design dan optimasi kinerja.',
    price: 2500000,
    deliveryTime: 14,
    revisions: 3,
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    status: 'active',
    featured: true,
    category: 'Web Development',
    packages: [
      {
        id: 1,
        name: 'Paket Dasar',
        price: 2500000,
        deliveryTime: 14,
        revisions: 3,
        features: [
          'Website dengan 5 halaman',
          'Responsive design',
          'Form kontak',
          'Integrasi dengan sosial media',
          'Optimasi SEO dasar',
        ],
      },
      {
        id: 2,
        name: 'Paket Standar',
        price: 4000000,
        deliveryTime: 21,
        revisions: 5,
        features: [
          'Website dengan 10 halaman',
          'Responsive design',
          'Form kontak & newsletter',
          'Integrasi dengan sosial media',
          'Optimasi SEO lengkap',
          'Blog section',
          'Admin dashboard',
        ],
      },
      {
        id: 3,
        name: 'Paket Premium',
        price: 6500000,
        deliveryTime: 30,
        revisions: 7,
        features: [
          'Website dengan 15+ halaman',
          'Responsive design',
          'Form kontak & newsletter',
          'Integrasi dengan sosial media',
          'Optimasi SEO lengkap',
          'Blog section',
          'Admin dashboard',
          'E-commerce functionality',
          'Payment gateway integration',
          'Custom animations',
          'Performance optimization',
        ],
      },
    ],
    requirements: [
      'Detail tentang tujuan website',
      'Brand guideline jika ada',
      'Konten yang akan ditampilkan di website',
      'Referensi website yang disukai',
      'Akses hosting (jika sudah memiliki)',
    ],
    faqs: [
      {
        question: 'Apakah termasuk biaya hosting dan domain?',
        answer: 'Tidak, biaya hosting dan domain tidak termasuk dalam paket. Namun, saya dapat membantu Anda dalam proses pemilihan dan setup hosting yang sesuai dengan kebutuhan website Anda.',
      },
      {
        question: 'Apakah website yang dibuat mobile friendly?',
        answer: 'Ya, semua website yang saya kembangkan bersifat responsive dan dapat diakses dengan baik pada perangkat mobile, tablet, maupun desktop.',
      },
      {
        question: 'Apakah bisa melakukan penambahan fitur di luar paket?',
        answer: 'Ya, bisa. Penambahan fitur akan dikenakan biaya tambahan sesuai dengan kompleksitas fitur yang diminta.',
      },
      {
        question: 'Apakah ada garansi untuk website yang dibuat?',
        answer: 'Ya, saya memberikan garansi perbaikan bug selama 1 bulan setelah website selesai dikembangkan.',
      },
    ],
  });

  const [activeTab, setActiveTab] = useState('basic');
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(service.image);

  // Kategori layanan
  const categories = [
    'Web Development',
    'Mobile App Development',
    'UI/UX Design',
    'Graphic Design',
    'Content Writing',
    'SEO',
    'Digital Marketing',
    'Video Editing',
    'Animation',
    'Music & Audio',
    'Translation',
    'Business',
    'Lifestyle',
    'Other',
  ];

  // Format price to Rupiah
  const formatRupiah = (price) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  // Unformat Rupiah to number
  const unformatRupiah = (formattedPrice) => {
    if (typeof formattedPrice === 'number') return formattedPrice;
    return parseInt(formattedPrice.replace(/[^\d]/g, ''));
  };

  // Handle input changes for basic info
  const handleBasicInfoChange = (e) => {
    const { name, value } = e.target;
    setService({
      ...service,
      [name]: name === 'price' ? unformatRupiah(value) : value,
    });
  };

  // Handle image change
  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      
      // Create preview URL
      const reader = new FileReader();
      reader.onload = (event) => {
        setImagePreview(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle package changes
  const handlePackageChange = (index, field, value) => {
    const updatedPackages = [...service.packages];
    updatedPackages[index] = {
      ...updatedPackages[index],
      [field]: field === 'price' ? unformatRupiah(value) : value,
    };
    setService({
      ...service,
      packages: updatedPackages,
    });
  };

  // Handle package feature changes
  const handleFeatureChange = (packageIndex, featureIndex, value) => {
    const updatedPackages = [...service.packages];
    const updatedFeatures = [...updatedPackages[packageIndex].features];
    updatedFeatures[featureIndex] = value;
    
    updatedPackages[packageIndex] = {
      ...updatedPackages[packageIndex],
      features: updatedFeatures,
    };
    
    setService({
      ...service,
      packages: updatedPackages,
    });
  };

  // Add new feature to a package
  const addFeature = (packageIndex) => {
    const updatedPackages = [...service.packages];
    updatedPackages[packageIndex].features.push('');
    
    setService({
      ...service,
      packages: updatedPackages,
    });
  };

  // Remove feature from a package
  const removeFeature = (packageIndex, featureIndex) => {
    const updatedPackages = [...service.packages];
    updatedPackages[packageIndex].features.splice(featureIndex, 1);
    
    setService({
      ...service,
      packages: updatedPackages,
    });
  };

  // Handle requirement changes
  const handleRequirementChange = (index, value) => {
    const updatedRequirements = [...service.requirements];
    updatedRequirements[index] = value;
    
    setService({
      ...service,
      requirements: updatedRequirements,
    });
  };

  // Add new requirement
  const addRequirement = () => {
    setService({
      ...service,
      requirements: [...service.requirements, ''],
    });
  };

  // Remove requirement
  const removeRequirement = (index) => {
    const updatedRequirements = [...service.requirements];
    updatedRequirements.splice(index, 1);
    
    setService({
      ...service,
      requirements: updatedRequirements,
    });
  };

  // Handle FAQ changes
  const handleFaqChange = (index, field, value) => {
    const updatedFaqs = [...service.faqs];
    updatedFaqs[index] = {
      ...updatedFaqs[index],
      [field]: value,
    };
    
    setService({
      ...service,
      faqs: updatedFaqs,
    });
  };

  // Add new FAQ
  const addFaq = () => {
    setService({
      ...service,
      faqs: [...service.faqs, { question: '', answer: '' }],
    });
  };

  // Remove FAQ
  const removeFaq = (index) => {
    const updatedFaqs = [...service.faqs];
    updatedFaqs.splice(index, 1);
    
    setService({
      ...service,
      faqs: updatedFaqs,
    });
  };  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (isSubmitting) return; // Prevent multiple submissions
    
    setIsSubmitting(true);
    
    // Create form data for API submission
    const formData = new FormData();
    formData.append('_method', 'PUT');
    formData.append('title', service.title);
    formData.append('description', service.description);
    formData.append('category', service.category);
    formData.append('price', service.price);
    formData.append('deliveryTime', service.deliveryTime);
    formData.append('revisions', service.revisions);
    formData.append('packages', JSON.stringify(service.packages));
    formData.append('requirements', JSON.stringify(service.requirements));
    formData.append('faqs', JSON.stringify(service.faqs));
    
    if (imageFile) {
      formData.append('image', imageFile);
    }
    
    // Log the form data for debugging
    console.log('Submitting service:', service);
    
    // Use Inertia to submit the form
    router.post(`/freelancer/services/${service.id}`, formData, {
      onSuccess: () => {
        // Redirect handled by Inertia automatically
        console.log('Form submitted successfully');
      },
      onError: (errors) => {
        console.error('Form submission errors:', errors);
        setIsSubmitting(false);
      },
      onFinish: () => {
        if (!router.page.props.errors) {
          // If no errors and onSuccess didn't redirect, manually navigate
          console.log('Form submitted, redirecting...');
          window.location.href = `/freelancer/services/${service.id}`;
        }
      }
    });
  };

  // Fetch service data when component mounts
  useEffect(() => {
    // In a real app, you would fetch the service data from the API
    // For now, we'll simulate an API call with setTimeout
    setIsLoading(true);
    setTimeout(() => {
      // This is where you would normally set the service data from the API response
      setIsLoading(false);
    }, 500);
  }, [id]);  return (
    <FreelancerLayout
      title="Edit Layanan"
      subtitle="Perbarui detail layanan yang Anda tawarkan"
    >
      {isLoading ? (
        <div className="flex justify-center items-center h-48">
          <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full text-indigo-500" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <>
          <div className="mb-6 flex items-center justify-between">
            <div className="flex items-center">
              <Link
                href={`/freelancer/services/${id}`}
                className="mr-4 text-gray-600 hover:text-gray-900"
              >
                <FaArrowLeft />
              </Link>
              <h1 className="text-2xl font-bold text-gray-900">Edit Layanan</h1>
            </div>
            <div className="flex space-x-3">
              <Link
                href={`/freelancer/services/${id}`}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50 flex items-center"
              >
                <FaTimes className="mr-2" />
                Batal
              </Link>
              <button
                type="button"
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 flex items-center"
              >
                <FaSave className="mr-2" />
                {isSubmitting ? 'Menyimpan...' : 'Simpan Perubahan'}
              </button>
            </div>
          </div>

          <div className="bg-white shadow-sm rounded-xl overflow-hidden mb-6">
            <div className="border-b border-gray-200">
              <nav className="flex -mb-px">
                <button
                  type="button"
                  className={`py-4 px-6 text-center border-b-2 text-sm font-medium ${
                    activeTab === 'basic'
                      ? 'border-indigo-500 text-indigo-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                  onClick={() => setActiveTab('basic')}
                >
                  Informasi Dasar
                </button>
                <button
                  type="button"
                  className={`py-4 px-6 text-center border-b-2 text-sm font-medium ${
                    activeTab === 'packages'
                      ? 'border-indigo-500 text-indigo-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                  onClick={() => setActiveTab('packages')}
                >
                  Paket & Harga
                </button>
                <button
                  type="button"
              className={`py-4 px-6 text-center border-b-2 text-sm font-medium ${
                activeTab === 'requirements'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
              onClick={() => setActiveTab('requirements')}
            >
              Persyaratan
            </button>
            <button
              type="button"
              className={`py-4 px-6 text-center border-b-2 text-sm font-medium ${
                activeTab === 'faqs'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
              onClick={() => setActiveTab('faqs')}
            >
              FAQ
            </button>
          </nav>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Basic Info Tab */}
          {activeTab === 'basic' && (
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2 space-y-6">
                  <div>
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                      Judul Layanan
                    </label>
                    <input
                      type="text"
                      id="title"
                      name="title"
                      value={service.title}
                      onChange={handleBasicInfoChange}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      required
                    />
                    <p className="mt-1 text-xs text-gray-500">
                      Judul yang jelas dan menarik akan membantu klien menemukan layanan Anda.
                    </p>
                  </div>
                  
                  <div>
                    <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                      Kategori
                    </label>
                    <select
                      id="category"
                      name="category"
                      value={service.category}
                      onChange={handleBasicInfoChange}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      required
                    >
                      {categories.map((category) => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                      Deskripsi Layanan
                    </label>
                    <textarea
                      id="description"
                      name="description"
                      rows={6}
                      value={service.description}
                      onChange={handleBasicInfoChange}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      required
                    />
                    <p className="mt-1 text-xs text-gray-500">
                      Jelaskan secara detail tentang layanan yang Anda tawarkan, termasuk apa yang akan klien dapatkan.
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
                        Harga Dasar
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <span className="text-gray-500 sm:text-sm">Rp</span>
                        </div>
                        <input
                          type="text"
                          id="price"
                          name="price"
                          value={service.price}
                          onChange={handleBasicInfoChange}
                          className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-12 sm:text-sm border-gray-300 rounded-md"
                          required
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="deliveryTime" className="block text-sm font-medium text-gray-700 mb-1">
                        Waktu Pengerjaan (hari)
                      </label>
                      <input
                        type="number"
                        id="deliveryTime"
                        name="deliveryTime"
                        value={service.deliveryTime}
                        onChange={handleBasicInfoChange}
                        min="1"
                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="revisions" className="block text-sm font-medium text-gray-700 mb-1">
                        Jumlah Revisi
                      </label>
                      <input
                        type="number"
                        id="revisions"
                        name="revisions"
                        value={service.revisions}
                        onChange={handleBasicInfoChange}
                        min="0"
                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        required
                      />
                    </div>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Gambar Layanan
                  </label>
                  <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                    <div className="space-y-4 text-center">
                      {imagePreview ? (
                        <div>
                          <img
                            src={imagePreview}
                            alt="Preview"
                            className="mx-auto h-48 w-full object-cover rounded-md"
                          />
                          <button
                            type="button"
                            onClick={() => {
                              setImagePreview(null);
                              setImageFile(null);
                            }}
                            className="mt-2 text-xs text-red-600 hover:text-red-900"
                          >
                            Hapus gambar
                          </button>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center">
                          <svg
                            className="mx-auto h-12 w-12 text-gray-400"
                            stroke="currentColor"
                            fill="none"
                            viewBox="0 0 48 48"
                          >
                            <path
                              d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                              strokeWidth={2}
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                          <p className="text-xs text-gray-500">
                            PNG, JPG, GIF hingga 5MB
                          </p>
                        </div>
                      )}
                      <div className="flex text-sm text-gray-600 justify-center">
                        <label
                          htmlFor="image-upload"
                          className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none"
                        >
                          <span>Upload gambar</span>
                          <input
                            id="image-upload"
                            name="image-upload"
                            type="file"
                            accept="image/*"
                            className="sr-only"
                            onChange={handleImageChange}
                          />
                        </label>
                      </div>
                    </div>
                  </div>
                  <p className="mt-2 text-xs text-gray-500">
                    Gambar berkualitas baik akan meningkatkan daya tarik layanan Anda.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Packages Tab */}
          {activeTab === 'packages' && (
            <div className="p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-6">Paket Layanan</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {service.packages.map((pkg, packageIndex) => (
                  <div
                    key={pkg.id}
                    className={`border rounded-lg overflow-hidden ${
                      pkg.name === 'Paket Standar'
                        ? 'border-indigo-500'
                        : 'border-gray-200'
                    }`}
                  >
                    <div
                      className={`p-4 ${
                        pkg.name === 'Paket Standar'
                          ? 'bg-indigo-50 border-b border-indigo-100'
                          : 'bg-white border-b border-gray-100'
                      }`}
                    >
                      <input
                        type="text"
                        value={pkg.name}
                        onChange={(e) => handlePackageChange(packageIndex, 'name', e.target.value)}
                        className="block w-full text-lg font-medium bg-transparent border-0 p-0 focus:ring-0 focus:border-0"
                        placeholder="Nama Paket"
                      />
                    </div>
                    <div className="p-4 space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Harga
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <span className="text-gray-500 sm:text-sm">Rp</span>
                          </div>
                          <input
                            type="text"
                            value={pkg.price}
                            onChange={(e) => handlePackageChange(packageIndex, 'price', e.target.value)}
                            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-12 sm:text-sm border-gray-300 rounded-md"
                            placeholder="Harga paket"
                          />
                        </div>
                      </div>
                      
                      <div className="flex space-x-4">
                        <div className="flex-1">
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Waktu (hari)
                          </label>
                          <input
                            type="number"
                            value={pkg.deliveryTime}
                            onChange={(e) => handlePackageChange(packageIndex, 'deliveryTime', parseInt(e.target.value))}
                            min="1"
                            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                          />
                        </div>
                        
                        <div className="flex-1">
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Revisi
                          </label>
                          <input
                            type="number"
                            value={pkg.revisions}
                            onChange={(e) => handlePackageChange(packageIndex, 'revisions', parseInt(e.target.value))}
                            min="0"
                            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                          />
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <label className="block text-sm font-medium text-gray-700">
                            Fitur Paket
                          </label>
                          <button
                            type="button"
                            onClick={() => addFeature(packageIndex)}
                            className="inline-flex items-center p-1 border border-transparent rounded-full shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                          >
                            <FaPlus className="h-3 w-3" />
                          </button>
                        </div>
                        
                        <ul className="space-y-2">
                          {pkg.features.map((feature, featureIndex) => (
                            <li key={featureIndex} className="flex items-center">
                              <input
                                type="text"
                                value={feature}
                                onChange={(e) => handleFeatureChange(packageIndex, featureIndex, e.target.value)}
                                className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                placeholder="Fitur yang ditawarkan"
                              />
                              <button
                                type="button"
                                onClick={() => removeFeature(packageIndex, featureIndex)}
                                className="ml-2 text-red-600 hover:text-red-900"
                              >
                                <FaTrash className="h-4 w-4" />
                              </button>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Requirements Tab */}
          {activeTab === 'requirements' && (
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-medium text-gray-900">Persyaratan untuk Klien</h3>
                <button
                  type="button"
                  onClick={addRequirement}
                  className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <FaPlus className="mr-1 h-3 w-3" />
                  Tambah Persyaratan
                </button>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <p className="text-sm text-gray-700 mb-4">
                  Beri tahu klien informasi atau bahan apa yang Anda butuhkan untuk memulai pekerjaan:
                </p>
                
                <ul className="space-y-3">
                  {service.requirements.map((requirement, index) => (
                    <li key={index} className="flex items-start">
                      <div className="flex-shrink-0 pt-1">
                        <svg className="h-5 w-5 text-indigo-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div className="ml-2 flex-1">
                        <input
                          type="text"
                          value={requirement}
                          onChange={(e) => handleRequirementChange(index, e.target.value)}
                          className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                          placeholder="Informasi atau bahan yang dibutuhkan"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => removeRequirement(index)}
                        className="ml-2 text-red-600 hover:text-red-900 pt-1"
                      >
                        <FaTrash className="h-4 w-4" />
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* FAQs Tab */}
          {activeTab === 'faqs' && (
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-medium text-gray-900">Pertanyaan yang Sering Diajukan (FAQ)</h3>
                <button
                  type="button"
                  onClick={addFaq}
                  className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <FaPlus className="mr-1 h-3 w-3" />
                  Tambah FAQ
                </button>
              </div>
              
              <div className="space-y-4">
                {service.faqs.map((faq, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
                    <div className="p-4 bg-gray-50 border-b border-gray-200 flex justify-between">
                      <input
                        type="text"
                        value={faq.question}
                        onChange={(e) => handleFaqChange(index, 'question', e.target.value)}
                        className="block w-full bg-transparent border-0 p-0 focus:ring-0 text-base font-medium text-gray-900"
                        placeholder="Pertanyaan"
                      />
                      <button
                        type="button"
                        onClick={() => removeFaq(index)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <FaTrash className="h-4 w-4" />
                      </button>
                    </div>
                    <div className="p-4">
                      <textarea
                        value={faq.answer}
                        onChange={(e) => handleFaqChange(index, 'answer', e.target.value)}
                        rows={3}
                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        placeholder="Jawaban"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </form>
      </div>          <div className="bg-gray-50 px-4 py-3 text-right sm:px-6 rounded-lg mb-6">
            <button
              type="button"
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {isSubmitting ? 'Menyimpan...' : 'Simpan Perubahan'}
            </button>
          </div>
        </>
      )}
    </FreelancerLayout>
  );
};

export default ServiceEdit;
