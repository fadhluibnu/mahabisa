import React, { useState, useEffect } from 'react';
import { Link, router, usePage } from '@inertiajs/react';
import FreelancerLayout from './Components/FreelancerLayout';
import { FaArrowLeft, FaSave, FaTimes, FaPlus, FaTrash } from 'react-icons/fa';

const ServiceEdit = ({ user, service: initialService, categories, skills }) => {
  const { errors } = usePage().props;
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState('basic');
  const [imageFile, setImageFile] = useState(null);
  
  // Debug tabs
  useEffect(() => {
    console.log('Active tab changed to:', activeTab);
  }, [activeTab]);
  
  // Improved tab navigation with better state preservation
  const changeTab = (tabName) => {
    console.log('Changing to tab:', tabName);
    
    // Track the previous tab for validation purposes
    const previousTab = activeTab;
    
    // Create a snapshot of current service data before tab change
    const currentServiceState = {...service};
    
    try {
      // Use a loading state to ensure clean transition between tabs
      setActiveTab('loading');
      
      // Validate current tab data if needed
      if (previousTab === 'basic' && !service.title) {
        alert('Judul layanan wajib diisi sebelum beralih tab');
        setActiveTab(previousTab);
        return;
      }
      
      // Small delay to ensure React updates the DOM properly
      setTimeout(() => {
        // Apply the tab change after validation passes
        setActiveTab(tabName);
        
        // Log the state to help debug
        console.log('Tab changed. New tab:', tabName, 'Service state preserved');
      }, 100); // Slightly longer delay for smoother transition
    } catch (error) {
      console.error('Error changing tabs:', error);
      setActiveTab(tabName); // Fallback
    }
  };

  // Parse requirements if it's a string
  const parseRequirements = (requirementsData) => {
    if (!requirementsData) return [];
    
    // If requirementsData is an array of objects with 'question' property, extract questions
    if (Array.isArray(requirementsData) && requirementsData.length > 0 && requirementsData[0].question) {
      return requirementsData.map(req => req.question);
    }
    
    // If requirementsData is a string
    if (typeof requirementsData === 'string') {
      try {
        // Try to parse as JSON if it's a JSON string
        const parsed = JSON.parse(requirementsData);
        if (Array.isArray(parsed)) {
          return parsed.map(req => typeof req === 'object' ? req.question || req.text || '' : req);
        }
        return requirementsData.split('\n').filter(req => req.trim() !== '');
      } catch (e) {
        // If not JSON, split by new line
        return requirementsData.split('\n').filter(req => req.trim() !== '');
      }
    }
    
    // If requirementsData is an array
    return requirementsData;
  };
  
  // Parse FAQs if they're stored as JSON or string
  const parseFaqs = (faqsData) => {
    if (!faqsData) return [];
    
    // If faqsData is an array of objects with 'question' and 'answer' properties, use as is
    if (Array.isArray(faqsData) && faqsData.length > 0 && faqsData[0].question && faqsData[0].answer) {
      return faqsData;
    }
    
    if (typeof faqsData === 'string') {
      try {
        const parsed = JSON.parse(faqsData);
        if (Array.isArray(parsed)) {
          return parsed;
        }
        return [];
      } catch (e) {
        return [];
      }
    }
    
    return faqsData;
  };
  
  // Helper to process service packages from API 
  const processServicePackages = (serviceData) => {
    // If packages already exist in database, use that data
    if (serviceData.packages && Array.isArray(serviceData.packages) && serviceData.packages.length > 0) {
      return serviceData.packages.map(pkg => ({
        id: pkg.id,
        name: pkg.title || pkg.name || '',
        price: pkg.price || 0,
        deliveryTime: pkg.delivery_time || pkg.deliveryTime || 7,
        revisions: pkg.revisions || 0,
        features: Array.isArray(pkg.features) ? pkg.features : 
                 (typeof pkg.features === 'string' ? JSON.parse(pkg.features || '[]') : [])
      }));
    }
    
    // If no packages exist, create default package based on service info
    return [{
      id: 1,
      name: 'Paket Dasar', 
      price: serviceData.price || 0, 
      deliveryTime: serviceData.delivery_time || 7, 
      revisions: serviceData.revisions || 1, 
      features: []
    }];
  };
  
  // Initialize service state from props
  const [service, setService] = useState({
    id: initialService.id,
    title: initialService.title || '',
    description: initialService.description || '',
    price: initialService.price || 0,
    deliveryTime: initialService.delivery_time || 7,
    revisions: initialService.revisions || 1,
    category_id: initialService.category_id || '',
    skills: initialService.skills ? initialService.skills.map(skill => typeof skill === 'object' ? skill.id : skill) : [],
    status: initialService.status || 'active',
    image_url: initialService.thumbnail || initialService.image_url || initialService.image || '',
    requirements: parseRequirements(initialService.requirements || []),
    faqs: parseFaqs(initialService.faqs || []),
    packages: processServicePackages(initialService)
  });

  // Initialize image preview from service image
  const [imagePreview, setImagePreview] = useState(() => {
    // Check if the URL is complete or needs a prefix
    if (service.image_url) {
      // If it's a full URL (starts with http or https), use it directly
      if (service.image_url.startsWith('http')) {
        return service.image_url;
      }
      
      // If it's a relative path, make sure it has a leading slash
      if (!service.image_url.startsWith('/')) {
        return '/' + service.image_url;
      }
      
      return service.image_url;
    }
    
    return null;
  });

  // Debug to make sure image_url is populated correctly
  useEffect(() => {
    console.log('Service image_url:', service.image_url);
    console.log('Image preview URL:', imagePreview);
  }, [service.image_url, imagePreview]);

  // Function to validate image URL
  const getValidImageUrl = (url) => {
    if (!url) return null;
    
    // If url is a data URL (base64), return as is
    if (url.startsWith('data:')) {
      return url;
    }
    
    // Check if URL is complete (with http or https)
    if (url.startsWith('http')) {
      return url;
    }
    
    // Normalize storage path
    if (url.includes('storage/') || url.includes('/storage/')) {
      // Get path part after 'storage/'
      const pathParts = url.split(/storage\//);
      if (pathParts.length > 1) {
        return '/storage/' + pathParts[1];
      }
    }
    
    // If URL doesn't have leading slash
    if (!url.startsWith('/')) {
      return '/' + url;
    }
    
    return url;
  };

  // Kategori layanan
  // Moved categories data to be received via props

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
      
      // Validate file type
      const validTypes = ['image/jpeg', 'image/png', 'image/gif'];
      if (!validTypes.includes(file.type)) {
        alert('File harus berformat gambar (JPG, PNG, GIF)');
        return;
      }
      
      // Validate file size (5MB max)
      if (file.size > 5 * 1024 * 1024) {
        alert('Ukuran gambar tidak boleh lebih dari 5MB');
        return;
      }
      
      setImageFile(file);
      
      // Create preview URL
      const reader = new FileReader();
      reader.onload = (event) => {
        console.log('Loaded image preview:', event.target.result);
        setImagePreview(event.target.result);
        
        // Reset error message if any
        const errorElement = document.getElementById('image-error-message');
        if (errorElement) {
          errorElement.textContent = '';
        }
      };
      
      reader.onerror = (error) => {
        console.error('Error reading file:', error);
        alert('Terjadi kesalahan saat membaca file gambar');
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
    
    // Validate form before submission
    const { isValid, errors: validationErrors } = validateForm();
    if (!isValid) {
      // Show validation errors
      alert('Mohon perbaiki kesalahan pada formulir');
      
      console.error('Validation errors:', validationErrors);
      return;
    }
    
    setIsSubmitting(true);
    
    // Create form data for API submission
    const formData = new FormData();
    formData.append('_method', 'PUT');
    formData.append('title', service.title);
    formData.append('description', service.description);
    formData.append('category_id', service.category_id);
    formData.append('price', service.price);
    formData.append('delivery_time', service.deliveryTime);
    formData.append('revisions', service.revisions);
    formData.append('is_active', service.status === 'active' ? '1' : '0');
    
    // Add selected skills
    if (service.skills && service.skills.length > 0) {
      service.skills.forEach(skillId => {
        formData.append('skills[]', skillId);
      });
    }
    
    // Add requirements as structured data
    const filteredRequirements = service.requirements.filter(req => req.trim() !== '');
    if (filteredRequirements.length > 0) {
      filteredRequirements.forEach((req, index) => {
        formData.append(`requirements[${index}][question]`, req);
        formData.append(`requirements[${index}][required]`, '1');
      });
    }
    
    // Add FAQs as structured data
    if (service.faqs && service.faqs.length > 0) {
      // Filter out empty FAQs
      const validFaqs = service.faqs.filter(faq => faq.question && faq.question.trim() !== '' && faq.answer && faq.answer.trim() !== '');
      
      validFaqs.forEach((faq, index) => {
        formData.append(`faqs[${index}][question]`, faq.question);
        formData.append(`faqs[${index}][answer]`, faq.answer);
      });
    }
    
    // Add packages as structured data
    if (service.packages && service.packages.length > 0) {
      service.packages.forEach((pkg, index) => {
        formData.append(`packages[${index}][title]`, pkg.name);
        formData.append(`packages[${index}][price]`, pkg.price);
        formData.append(`packages[${index}][delivery_time]`, pkg.deliveryTime);
        formData.append(`packages[${index}][revisions]`, pkg.revisions);
        
        // Add features if available
        if (pkg.features && pkg.features.length > 0) {
          const filteredFeatures = pkg.features.filter(feature => feature.trim() !== '');
          if (filteredFeatures.length > 0) {
            formData.append(`packages[${index}][features]`, JSON.stringify(filteredFeatures));
          } else {
            formData.append(`packages[${index}][features]`, JSON.stringify(['Basic service']));
          }
        } else {
          formData.append(`packages[${index}][features]`, JSON.stringify(['Basic service']));
        }
      });
    }
    
    // Add image if a new one was selected
    if (imageFile) {
      formData.append('image', imageFile);
      console.log('Adding image file to form data:', imageFile.name);
    } else if (service.image_url && !service.image_url.startsWith('data:')) {
      // Make sure image_url is saved if there's no new file
      formData.append('image_url', service.image_url);
      console.log('Keeping existing image URL:', service.image_url);
    }
    
    console.log('Submitting service update with data:', {
      title: service.title,
      description: service.description.substring(0, 30) + '...',
      category: service.category_id,
      price: service.price,
      skills: service.skills,
      packages: service.packages.length,
      requirements: service.requirements.length,
      faqs: service.faqs.length
    });
    
    // Use Inertia to submit the form
    router.post(`/freelancer/services/${service.id}`, formData, {
      forceFormData: true,
      preserveState: true,
      onSuccess: () => {
        alert('Layanan berhasil diperbarui');
        router.visit(`/freelancer/services/${service.id}`);
      },
      onError: (errors) => {
        console.error('Service update errors:', errors);
        alert('Terjadi kesalahan saat memperbarui layanan: ' + Object.values(errors).join(', '));
      },
      onFinish: () => {
        setIsSubmitting(false);
      }
    });
  };

  // Initialize loading state
  const [isLoading, setIsLoading] = useState(false);

  // Function to handle skill selection
  const handleSkillChange = (skillId) => {
    const currentSkills = [...service.skills];
    const skillIndex = currentSkills.indexOf(skillId);
    
    if (skillIndex === -1) {
      currentSkills.push(skillId);
    } else {
      currentSkills.splice(skillIndex, 1);
    }
    
    setService({
      ...service,
      skills: currentSkills
    });
  };

  // Function to check if there are errors for a specific field
  const hasErrors = (field) => {
    return errors[field] !== undefined;
  };

  // Function to display error message for a specific field
  const errorMessage = (field) => {
    return errors[field];
  };

  // Function to validate the form before submission
  const validateForm = () => {
    const errors = {};
    
    // Validate basic information
    if (!service.title) errors.title = 'Judul layanan wajib diisi';
    if (!service.description) errors.description = 'Deskripsi layanan wajib diisi';
    if (!service.category_id) errors.category_id = 'Kategori wajib dipilih';
    if (service.skills.length === 0) errors.skills = 'Minimal pilih satu keahlian';
    if (service.price <= 0) errors.price = 'Harga harus lebih dari 0';
    
    // Validate packages
    if (service.packages.length === 0) {
      errors.packages = 'Minimal harus ada satu paket layanan';
    } else {
      const invalidPackages = service.packages.filter(
        pkg => !pkg.name || pkg.price <= 0 || pkg.deliveryTime <= 0
      );
      
      if (invalidPackages.length > 0) {
        errors.packages = 'Semua paket harus memiliki nama, harga yang valid, dan waktu pengerjaan';
      }
    }
    
    // Validate requirements - should have at least one requirement
    if (service.requirements.length === 0 || !service.requirements.some(req => req.trim() !== '')) {
      errors.requirements = 'Minimal satu persyaratan harus diisi';
    }
    
    // Validate FAQs
    const invalidFaqs = service.faqs.filter(faq => !faq.question || !faq.answer);
    if (invalidFaqs.length > 0) {
      errors.faqs = 'Semua FAQ harus memiliki pertanyaan dan jawaban';
    }

    return {
      isValid: Object.keys(errors).length === 0,
      errors
    };
  };

  return (
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
                href={`/freelancer/services/${service.id}`}
                className="mr-4 text-gray-600 hover:text-gray-900"
              >
                <FaArrowLeft />
              </Link>
              <h1 className="text-2xl font-bold text-gray-900">Edit Layanan</h1>
            </div>
            <div className="flex space-x-3">
              <Link
                href={`/freelancer/services/${service.id}`}
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
                  onClick={() => changeTab('basic')}
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
                  onClick={() => changeTab('packages')}
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
                  onClick={() => changeTab('requirements')}
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
                  onClick={() => changeTab('faqs')}
                >
                  FAQ
                </button>
          </nav>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Loading state with a clear key */}
          {activeTab === 'loading' && (
            <div className="p-6 flex justify-center items-center" key="loading-tab">
              <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full text-indigo-500" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          )}

          {/* Each tab with a unique key to help React's reconciliation */}
          {/* Basic Info Tab */}
          {activeTab === 'basic' && (
            <div className="p-6" key="basic-tab">
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
                      className={`shadow-sm ${errors.title ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-indigo-500 focus:border-indigo-500'} block w-full sm:text-sm rounded-md`}
                      required
                    />
                    {errors.title && (
                      <p className="mt-1 text-sm text-red-600">{errors.title}</p>
                    )}
                    <p className="mt-1 text-xs text-gray-500">
                      Judul yang jelas dan menarik akan membantu klien menemukan layanan Anda.
                    </p>
                  </div>
                  
                  <div>
                    <label htmlFor="category_id" className="block text-sm font-medium text-gray-700 mb-1">
                      Kategori
                    </label>
                    <select
                      id="category_id"
                      name="category_id"
                      value={service.category_id}
                      onChange={handleBasicInfoChange}
                      className={`shadow-sm ${errors.category_id ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-indigo-500 focus:border-indigo-500'} block w-full sm:text-sm rounded-md`}
                      required
                    >
                      <option value="">Pilih Kategori</option>
                      {categories && categories.map((category) => (
                        <option key={category.id} value={category.id}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                    {errors.category_id && (
                      <p className="mt-1 text-sm text-red-600">{errors.category_id}</p>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Keahlian
                    </label>
                    <div className="mt-1 grid grid-cols-2 md:grid-cols-3 gap-2">
                      {skills && skills.map((skill) => (
                        <div key={skill.id} className="flex items-center">
                          <input
                            id={`skill-${skill.id}`}
                            type="checkbox"
                            checked={service.skills.includes(skill.id)}
                            onChange={() => {
                              const currentSkills = [...service.skills];
                              const skillIndex = currentSkills.indexOf(skill.id);
                              
                              if (skillIndex === -1) {
                                currentSkills.push(skill.id);
                              } else {
                                currentSkills.splice(skillIndex, 1);
                              }
                              
                              setService({
                                ...service,
                                skills: currentSkills
                              });
                            }}
                            className="h-4 w-4 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500"
                          />
                          <label htmlFor={`skill-${skill.id}`} className="ml-2 text-sm text-gray-700">
                            {skill.name}
                          </label>
                        </div>
                      ))}
                    </div>
                    {errors.skills && (
                      <p className="mt-1 text-sm text-red-600">{errors.skills}</p>
                    )}
                    <p className="mt-1 text-xs text-gray-500">
                      Pilih keahlian yang relevan dengan layanan yang Anda tawarkan.
                    </p>
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
                      className={`shadow-sm ${errors.description ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-indigo-500 focus:border-indigo-500'} block w-full sm:text-sm rounded-md`}
                      required
                    />
                    {errors.description && (
                      <p className="mt-1 text-sm text-red-600">{errors.description}</p>
                    )}
                    <p className="mt-1 text-xs text-gray-500">
                      Jelaskan secara detail tentang layanan yang Anda tawarkan, termasuk apa yang akan klien dapatkan.
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">                      <div>
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
                          value={service.price.toLocaleString('id-ID')}
                          onChange={(e) => {
                            const value = e.target.value.replace(/[^\d]/g, '');
                            setService({
                              ...service,
                              price: value ? parseInt(value, 10) : 0
                            });
                          }}
                          className={`shadow-sm ${errors.price ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-indigo-500 focus:border-indigo-500'} block w-full pl-12 sm:text-sm rounded-md`}
                          required
                        />
                      </div>
                      {errors.price && (
                        <p className="mt-1 text-sm text-red-600">{errors.price}</p>
                      )}
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
                          {/* Tampilan debug URL untuk membantu troubleshooting */}
                          <div className="mb-2 text-xs text-gray-400 overflow-hidden text-ellipsis">
                            Image URL: {typeof imagePreview === 'string' && imagePreview.substring(0, 100)}
                            {typeof imagePreview === 'string' && imagePreview.length > 100 ? '...' : ''}
                          </div>
                          
                          <img
                            src={getValidImageUrl(imagePreview)}
                            alt="Preview"
                            className="mx-auto h-48 w-full object-cover rounded-md"
                            onError={(e) => {
                              console.error('Error loading image, trying alternatives');
                              e.target.onerror = null;
                              
                              // Mencoba berbagai format URL alternatif
                              const imagePath = typeof imagePreview === 'string' 
                                ? imagePreview.replace(/^\/storage\//, '').replace(/^storage\//, '')
                                : '';
                              
                              const alternatives = [
                                '/storage/' + imagePath,
                                '/images/' + imagePath,
                                '/assets/' + imagePath,
                                '/public/storage/' + imagePath
                              ];
                              
                              console.log('Trying alternative URLs:', alternatives);
                              
                              // Coba semua alternatif secara berurutan
                              let currentIndex = 0;
                              
                              const tryNextAlternative = () => {
                                if (currentIndex < alternatives.length) {
                                  console.log('Trying:', alternatives[currentIndex]);
                                  e.target.src = alternatives[currentIndex];
                                  currentIndex++;
                                  e.target.onerror = tryNextAlternative;
                                } else {
                                  // Jika semua gagal, tampilkan pesan
                                  e.target.style.display = 'none';
                                  const errorElement = document.getElementById('image-error-message');
                                  if (errorElement) {
                                    errorElement.textContent = 'Tidak dapat menampilkan gambar. Silakan upload gambar baru.';
                                  }
                                }
                              };
                              
                              tryNextAlternative();
                            }}
                          />
                          <p id="image-error-message" className="mt-1 text-xs text-red-500"></p>
                          <button
                            type="button"
                            onClick={() => {
                              setImagePreview(null);
                              setImageFile(null);
                              const errorElement = document.getElementById('image-error-message');
                              if (errorElement) {
                                errorElement.textContent = '';
                              }
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
                  <div className="mt-2 space-y-1">
                    <p className="text-xs text-gray-500">
                      Gambar berkualitas baik akan meningkatkan daya tarik layanan Anda.
                    </p>
                    <p className="text-xs text-gray-400">
                      Jika gambar tidak muncul, silakan upload gambar baru dengan ukuran maksimal 5MB.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Packages Tab */}
          {activeTab === 'packages' && (
            <div className="p-6" key="packages-tab">
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
            <div className="p-6" key="requirements-tab">
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
            <div className="p-6" key="faqs-tab">
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

          {/* Skills Tab - New Tab for Skills Selection */}
          {activeTab === 'skills' && (
            <div className="p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-6">Keahlian yang Diperlukan</h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {skills && skills.map((skill) => (
                  <div key={skill.id} className="flex items-center">
                    <input
                      type="checkbox"
                      id={`skill-${skill.id}`}
                      checked={service.skills.includes(skill.id)}
                      onChange={() => handleSkillChange(skill.id)}
                      className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                    />
                    <label htmlFor={`skill-${skill.id}`} className="ml-3 block text-sm font-medium text-gray-700">
                      {skill.name}
                    </label>
                  </div>
                ))}
              </div>
              
              {hasErrors('skills') && (
                <p className="mt-4 text-sm text-red-600">
                  {errorMessage('skills')}
                </p>
              )}
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
