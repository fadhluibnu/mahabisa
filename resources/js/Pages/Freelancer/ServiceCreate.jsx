import React, { useState } from 'react';
import { Link, router } from '@inertiajs/react';
import FreelancerLayout from './Components/FreelancerLayout';

const ServiceCreate = ({ categories = [], skills = [] }) => {
  // Debug: Check the structure of props
  console.log('Categories received:', categories);
  console.log('Skills received:', skills);
  const [activeSection, setActiveSection] = useState('basic');
  const [packageCount, setPackageCount] = useState(1);
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [galleryImages, setGalleryImages] = useState([]);
  const [galleryPreviews, setGalleryPreviews] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    category_id: '',
    description: '',
    price: '',
    delivery_time: '',
    revisions: '',
    image: null,
    imagePreview: null,
    packages: [
      {
        name: 'Paket Dasar',
        price: '',
        deliveryTime: '',
        revisions: '',
        features: [''],
      }
    ],
    requirements: [''],
    faqs: [
      {
        question: '',
        answer: '',
      }
    ],
  });

  // List of categories
  const categoryOptions = [
    'Web Development',
    'Mobile Development',
    'UI/UX Design',
    'Graphic Design',
    'Digital Marketing',
    'Content Writing',
    'Translation',
    'Video Editing',
    'Voice Over',
    'Music & Audio',
    'Data Entry',
    'Business',
    'Other',
  ];

  const handleBasicInfoChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSkillChange = (skillId) => {
    const currentSkills = [...selectedSkills];
    const index = currentSkills.indexOf(skillId);
    
    if (index === -1) {
      currentSkills.push(skillId);
    } else {
      currentSkills.splice(index, 1);
    }
    
    setSelectedSkills(currentSkills);
  };

  const handlePackageChange = (index, field, value) => {
    const updatedPackages = [...formData.packages];
    updatedPackages[index] = {
      ...updatedPackages[index],
      [field]: value,
    };
    setFormData({
      ...formData,
      packages: updatedPackages,
    });
  };

  const handleFeatureChange = (packageIndex, featureIndex, value) => {
    const updatedPackages = [...formData.packages];
    const updatedFeatures = [...updatedPackages[packageIndex].features];
    updatedFeatures[featureIndex] = value;
    updatedPackages[packageIndex] = {
      ...updatedPackages[packageIndex],
      features: updatedFeatures,
    };
    setFormData({
      ...formData,
      packages: updatedPackages,
    });
  };

  const addFeature = (packageIndex) => {
    const updatedPackages = [...formData.packages];
    updatedPackages[packageIndex].features.push('');
    setFormData({
      ...formData,
      packages: updatedPackages,
    });
  };

  const removeFeature = (packageIndex, featureIndex) => {
    const updatedPackages = [...formData.packages];
    updatedPackages[packageIndex].features.splice(featureIndex, 1);
    setFormData({
      ...formData,
      packages: updatedPackages,
    });
  };

  const handleRequirementChange = (index, value) => {
    const updatedRequirements = [...formData.requirements];
    updatedRequirements[index] = value;
    setFormData({
      ...formData,
      requirements: updatedRequirements,
    });
  };

  const addRequirement = () => {
    setFormData({
      ...formData,
      requirements: [...formData.requirements, ''],
    });
  };

  const removeRequirement = (index) => {
    const updatedRequirements = [...formData.requirements];
    updatedRequirements.splice(index, 1);
    setFormData({
      ...formData,
      requirements: updatedRequirements,
    });
  };

  const handleFaqChange = (index, field, value) => {
    const updatedFaqs = [...formData.faqs];
    updatedFaqs[index] = {
      ...updatedFaqs[index],
      [field]: value,
    };
    setFormData({
      ...formData,
      faqs: updatedFaqs,
    });
  };

  const addFaq = () => {
    setFormData({
      ...formData,
      faqs: [...formData.faqs, { question: '', answer: '' }],
    });
  };

  const removeFaq = (index) => {
    const updatedFaqs = [...formData.faqs];
    updatedFaqs.splice(index, 1);
    setFormData({
      ...formData,
      faqs: updatedFaqs,
    });
  };

  const handleAddPackage = () => {
    if (packageCount < 3) {
      const packageNames = ['Paket Dasar', 'Paket Standar', 'Paket Premium'];
      setPackageCount(packageCount + 1);
      setFormData({
        ...formData,
        packages: [
          ...formData.packages,
          {
            name: packageNames[packageCount],
            price: '',
            deliveryTime: '',
            revisions: '',
            features: [''],
          },
        ],
      });
    }
  };

  const handleRemovePackage = () => {
    if (packageCount > 1) {
      const updatedPackages = [...formData.packages];
      updatedPackages.pop();
      setPackageCount(packageCount - 1);
      setFormData({
        ...formData,
        packages: updatedPackages,
      });
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({
        ...formData,
        image: file,
        imagePreview: URL.createObjectURL(file),
      });
    }
  };
  
  // Handle gallery images upload
  const handleGalleryImagesChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      // Create object URLs for preview
      const newPreviews = files.map(file => URL.createObjectURL(file));
      
      // Update state with new files and previews
      setGalleryImages([...galleryImages, ...files]);
      setGalleryPreviews([...galleryPreviews, ...newPreviews]);
    }
  };
  
  // Remove a gallery image
  const removeGalleryImage = (index) => {
    const updatedImages = [...galleryImages];
    const updatedPreviews = [...galleryPreviews];
    
    // Revoke the object URL to avoid memory leaks
    URL.revokeObjectURL(updatedPreviews[index]);
    
    // Remove the image and preview from arrays
    updatedImages.splice(index, 1);
    updatedPreviews.splice(index, 1);
    
    setGalleryImages(updatedImages);
    setGalleryPreviews(updatedPreviews);
  };

  const handleGalleryImageChange = (e) => {
    const files = Array.from(e.target.files);
    const validFiles = files.filter(file => file.size <= 10 * 1024 * 1024 && /\.(jpg|jpeg|png|gif)$/i.test(file.name));
    
    if (validFiles.length + galleryImages.length > 5) {
      alert('Anda hanya dapat mengunggah hingga 5 gambar.');
      return;
    }
    
    const newGalleryImages = [...galleryImages, ...validFiles];
    const newGalleryPreviews = newGalleryImages.map(file => URL.createObjectURL(file));
    
    setGalleryImages(newGalleryImages);
    setGalleryPreviews(newGalleryPreviews);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    console.log("Submitting form data:", formData);
    console.log("Selected skills:", selectedSkills);
    console.log("Gallery images:", galleryImages);
    
    // Validation
    if (!formData.title || !formData.category_id || !formData.description) {
      alert('Mohon lengkapi semua informasi dasar.');
      setActiveSection('basic');
      return;
    }

    if (formData.description.length < 50) {
      alert('Deskripsi layanan minimal 50 karakter.');
      setActiveSection('basic');
      return;
    }

    if (selectedSkills.length === 0) {
      alert('Mohon pilih minimal satu skill.');
      setActiveSection('basic');
      return;
    }

    // Check if at least one package is complete
    const isPackageComplete = formData.packages.some(pkg => 
      pkg.name && pkg.price && pkg.deliveryTime && pkg.revisions && pkg.features.some(f => f)
    );

    if (!isPackageComplete) {
      alert('Mohon lengkapi minimal satu paket layanan.');
      setActiveSection('packages');
      return;
    }

    // Check if at least one requirement is provided
    if (!formData.requirements.some(req => req)) {
      alert('Mohon tambahkan minimal satu persyaratan.');
      setActiveSection('requirements');
      return;
    }
    
    // Prepare form data for submission
    const submitData = new FormData();
    submitData.append('title', formData.title);
    submitData.append('category_id', formData.category_id);
    submitData.append('description', formData.description);
    
    // Make sure these fields are formatted correctly as required by backend
    submitData.append('price', formData.packages[0].price);
    submitData.append('delivery_time', formData.packages[0].deliveryTime);
    submitData.append('revisions', formData.packages[0].revisions);
    
    // Add skills - make sure we're sending the exact IDs expected by the backend
    if (selectedSkills.length === 0) {
      alert('Mohon pilih minimal satu skill.');
      setActiveSection('basic');
      return;
    }
    
    selectedSkills.forEach(skillId => {
      submitData.append('skills[]', skillId);
    });
    
    // Add main image if exists
    if (formData.image) {
      submitData.append('image', formData.image);
    }
    
    // Add gallery images
    if (galleryImages.length > 0) {
      galleryImages.forEach((image, index) => {
        submitData.append(`gallery[${index}]`, image);
      });
    }
    
    // Add gallery images if exist
    if (galleryImages.length > 0) {
      galleryImages.forEach((image, index) => {
        submitData.append(`gallery_images[${index}]`, image);
      });
    }
    
    // Fix 1: Convert requirements array to a string as expected by backend
    const filteredRequirements = formData.requirements.filter(req => req.trim() !== '');
    if (filteredRequirements.length > 0) {
      // Join all requirements into a single string with line breaks
      submitData.append('requirements', filteredRequirements.join('\n'));
    } else {
      // Ensure at least one default requirement if none were provided
      submitData.append('requirements', 'Please provide details about your project');
    }
    
    // Add packages
    formData.packages.forEach((pkg, packageIndex) => {
      // Only include packages that have a name and price
      if (pkg.name && pkg.price) {
        submitData.append(`packages[${packageIndex}][title]`, pkg.name);
        submitData.append(`packages[${packageIndex}][price]`, pkg.price);
        submitData.append(`packages[${packageIndex}][delivery_time]`, pkg.deliveryTime);
        submitData.append(`packages[${packageIndex}][revisions]`, pkg.revisions);
        
        // Ensure features are sent as a proper array
        const features = pkg.features.filter(feature => feature.trim() !== '');
        
        // If no features, provide a default
        if (features.length === 0) {
          features.push('Basic service');
        }
        
        // Convert features to a JSON string for backend
        submitData.append(`packages[${packageIndex}][features]`, JSON.stringify(features));
      }
    });
    
    // Add FAQs
    formData.faqs.forEach((faq, faqIndex) => {
      if (faq.question && faq.answer) {
        submitData.append(`faqs[${faqIndex}][question]`, faq.question);
        submitData.append(`faqs[${faqIndex}][answer]`, faq.answer);
      }
    });

    // Submit form via Inertia
    router.post('/freelancer/services', submitData, {
      forceFormData: true,
      onSuccess: () => {
        // Will automatically redirect to the success page based on controller response
        console.log('Service created successfully');
      },
      onError: (errors) => {
        console.error('Form submission errors:', errors);
        // Display all validation errors to the user
        const errorMessages = Object.values(errors).flat().join('\n');
        alert('Terjadi kesalahan saat membuat layanan:\n' + errorMessages);
      },
      onFinish: () => {
        console.log('Form submission completed');
      }
    });
  };

  const isStepComplete = (step) => {
    switch (step) {
      case 'basic':
        return formData.title && formData.category_id && formData.description;
      case 'packages':
        return formData.packages.some(pkg => 
          pkg.name && pkg.price && pkg.deliveryTime && pkg.revisions && pkg.features.some(f => f)
        );
      case 'requirements':
        return formData.requirements.some(req => req);
      case 'faqs':
        return formData.faqs.some(faq => faq.question && faq.answer);
      default:
        return false;
    }
  };

  return (
    <FreelancerLayout
      title="Buat Layanan Baru"
      subtitle="Buat layanan yang ditawarkan kepada klien potensial"
    >
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Navigation Sidebar */}
        <div className="md:col-span-1">
          <div className="bg-white shadow-sm rounded-xl overflow-hidden mb-6">
            <div className="p-4 bg-gray-50 border-b border-gray-200">
              <h3 className="text-base font-medium text-gray-900">Langkah-langkah</h3>
            </div>
            <div className="p-2">
              <nav className="flex flex-col space-y-1">
                <button
                  onClick={() => setActiveSection('basic')}
                  className={`px-4 py-2 rounded-md text-sm font-medium ${
                    activeSection === 'basic'
                      ? 'bg-indigo-50 text-indigo-700'
                      : 'text-gray-700 hover:bg-gray-50'
                  } flex items-center justify-between`}
                >
                  <span>Informasi Dasar</span>
                  {isStepComplete('basic') && (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  )}
                </button>
                <button
                  onClick={() => setActiveSection('packages')}
                  className={`px-4 py-2 rounded-md text-sm font-medium ${
                    activeSection === 'packages'
                      ? 'bg-indigo-50 text-indigo-700'
                      : 'text-gray-700 hover:bg-gray-50'
                  } flex items-center justify-between`}
                >
                  <span>Paket Layanan</span>
                  {isStepComplete('packages') && (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  )}
                </button>
                <button
                  onClick={() => setActiveSection('requirements')}
                  className={`px-4 py-2 rounded-md text-sm font-medium ${
                    activeSection === 'requirements'
                      ? 'bg-indigo-50 text-indigo-700'
                      : 'text-gray-700 hover:bg-gray-50'
                  } flex items-center justify-between`}
                >
                  <span>Persyaratan</span>
                  {isStepComplete('requirements') && (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  )}
                </button>
                <button
                  onClick={() => setActiveSection('faqs')}
                  className={`px-4 py-2 rounded-md text-sm font-medium ${
                    activeSection === 'faqs'
                      ? 'bg-indigo-50 text-indigo-700'
                      : 'text-gray-700 hover:bg-gray-50'
                  } flex items-center justify-between`}
                >
                  <span>FAQ</span>
                  {isStepComplete('faqs') && (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  )}
                </button>
              </nav>
            </div>
          </div>

          <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
            <h4 className="text-sm font-medium text-blue-800 mb-2">Tips</h4>
            <ul className="text-sm text-blue-700 space-y-2">
              <li>Gunakan judul yang jelas dan menarik</li>
              <li>Jelaskan layanan Anda secara detail</li>
              <li>Tambahkan gambar yang profesional</li>
              <li>Buat paket dengan harga yang kompetitif</li>
              <li>Jawab pertanyaan umum di bagian FAQ</li>
            </ul>
          </div>
        </div>

        {/* Main Content */}
        <div className="md:col-span-3">
          <div className="bg-white shadow-sm rounded-xl overflow-hidden mb-6">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">
                {activeSection === 'basic' && 'Informasi Dasar'}
                {activeSection === 'packages' && 'Paket Layanan'}
                {activeSection === 'requirements' && 'Persyaratan untuk Klien'}
                {activeSection === 'faqs' && 'Pertanyaan yang Sering Diajukan (FAQ)'}
              </h3>
            </div>

            <div className="p-6">
              {/* Basic Information Section */}
              {activeSection === 'basic' && (
                <div className="space-y-6">
                  <div>
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                      Judul Layanan <span className="text-red-500">*</span>
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleBasicInfoChange}
                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        placeholder="Contoh: Web Development dengan React & Laravel"
                      />
                    </div>
                    <p className="mt-1 text-sm text-gray-500">
                      Buat judul yang menarik dan menjelaskan layanan Anda secara singkat.
                    </p>
                  </div>

                  <div>
                    <label htmlFor="category_id" className="block text-sm font-medium text-gray-700">
                      Kategori <span className="text-red-500">*</span>
                    </label>
                    <div className="mt-1">
                      <select
                        id="category_id"
                        name="category_id"
                        value={formData.category_id}
                        onChange={handleBasicInfoChange}
                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      >
                        <option value="">Pilih Kategori</option>
                        {categories && categories.map((category) => (
                          <option key={category.id} value={category.id}>
                            {category.name}
                          </option>
                        ))}
                      </select>
                      {(!categories || categories.length === 0) && (
                        <p className="mt-1 text-sm text-red-600">
                          Tidak ada kategori tersedia. Harap hubungi administrator.
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                      Deskripsi Layanan <span className="text-red-500">*</span>
                    </label>
                    <div className="mt-1">
                      <textarea
                        id="description"
                        name="description"
                        rows={5}
                        value={formData.description}
                        onChange={handleBasicInfoChange}
                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        placeholder="Jelaskan layanan Anda secara detail, termasuk apa yang akan klien dapatkan."
                      />
                    </div>
                    <p className="mt-1 text-sm text-gray-500">
                      Berikan informasi yang jelas tentang layanan Anda dan keuntungan yang akan diterima klien. Minimal 50 karakter.
                    </p>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Keahlian <span className="text-red-500">*</span>
                    </label>
                    <p className="text-sm text-gray-500 mb-2">
                      Pilih keahlian yang relevan dengan layanan Anda (minimal satu).
                    </p>
                    <div className="mt-1 grid grid-cols-2 md:grid-cols-3 gap-2">
                      {skills.map((skill) => (
                        <div key={skill.id} className="flex items-center">
                          <input
                            id={`skill-${skill.id}`}
                            type="checkbox"
                            checked={selectedSkills.includes(skill.id)}
                            onChange={() => handleSkillChange(skill.id)}
                            className="h-4 w-4 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500"
                          />
                          <label htmlFor={`skill-${skill.id}`} className="ml-2 text-sm text-gray-700">
                            {skill.name}
                          </label>
                        </div>
                      ))}
                    </div>
                    {skills.length === 0 && (
                      <div className="mt-2 text-sm text-yellow-600 bg-yellow-50 p-2 rounded">
                        Tidak ada keahlian tersedia. Silakan tambahkan keahlian di halaman profil Anda terlebih dahulu.
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Gambar Layanan (Thumbnail Utama)
                    </label>
                    <div className="mt-1 flex flex-col items-center justify-center pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                      {formData.imagePreview ? (
                        <div className="w-full flex flex-col items-center">
                          <img
                            src={formData.imagePreview}
                            alt="Preview"
                            className="mb-4 max-w-full h-48 object-contain"
                          />
                          <button
                            type="button"
                            onClick={() => setFormData({ ...formData, image: null, imagePreview: null })}
                            className="text-sm text-red-600 hover:text-red-800"
                          >
                            Hapus Gambar
                          </button>
                        </div>
                      ) : (
                        <div className="space-y-1 text-center">
                          <svg
                            className="mx-auto h-12 w-12 text-gray-400"
                            stroke="currentColor"
                            fill="none"
                            viewBox="0 0 48 48"
                            aria-hidden="true"
                          >
                            <path
                              d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                              strokeWidth={2}
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                          <div className="flex text-sm text-gray-600">
                            <label
                              htmlFor="image-upload"
                              className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                            >
                              <span>Upload file</span>
                              <input
                                id="image-upload"
                                name="image-upload"
                                type="file"
                                accept="image/*"
                                className="sr-only"
                                onChange={handleImageChange}
                              />
                            </label>
                            <p className="pl-1">atau drag and drop</p>
                          </div>
                          <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                        </div>
                      )}
                    </div>
                    <p className="mt-1 text-sm text-gray-500">
                      Upload gambar utama yang akan ditampilkan sebagai thumbnail layanan Anda.
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Galeri Gambar
                    </label>
                    <p className="text-sm text-gray-500 mb-2">
                      Upload gambar tambahan untuk ditampilkan dalam galeri layanan (opsional, maksimal 5 gambar).
                    </p>
                    
                    {/* Gallery Previews */}
                    {galleryPreviews.length > 0 && (
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-4">
                        {galleryPreviews.map((preview, index) => (
                          <div key={index} className="relative group">
                            <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md bg-gray-200">
                              <img
                                src={preview}
                                alt={`Gallery image ${index + 1}`}
                                className="h-full w-full object-cover object-center"
                              />
                              <button
                                type="button"
                                onClick={() => removeGalleryImage(index)}
                                className="absolute top-2 right-2 bg-white rounded-full p-1.5 text-red-500 opacity-80 hover:opacity-100 transition-opacity"
                              >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                    
                    {/* Gallery Upload */}
                    {galleryPreviews.length < 5 && (
                      <div className="mt-1 flex flex-col items-center justify-center pt-4 pb-4 border-2 border-gray-300 border-dashed rounded-md">
                        <div className="space-y-1 text-center">
                          <svg className="mx-auto h-10 w-10 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          <div className="flex text-sm text-gray-600">
                            <label
                              htmlFor="gallery-upload"
                              className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                            >
                              <span>Upload gallery images</span>
                              <input
                                id="gallery-upload"
                                name="gallery-upload"
                                type="file"
                                accept="image/*"
                                multiple
                                className="sr-only"
                                onChange={handleGalleryImagesChange}
                              />
                            </label>
                          </div>
                          <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                        </div>
                      </div>
                    )}
                    
                    {galleryPreviews.length >= 5 && (
                      <p className="text-sm text-yellow-600">
                        Maximum 5 gallery images allowed. Remove some images if you want to upload more.
                      </p>
                    )}
                  </div>

                  <div className="flex justify-end">
                    <button
                      type="button"
                      onClick={() => setActiveSection('packages')}
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Lanjut ke Paket
                      <svg
                        className="ml-2 h-4 w-4"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              )}

              {/* Packages Section */}
              {activeSection === 'packages' && (
                <div>
                  <div className="mb-6 flex items-center justify-between">
                    <p className="text-sm text-gray-500">
                      Buat paket layanan yang akan ditawarkan kepada klien. Anda dapat membuat hingga 3 paket.
                    </p>
                    <div className="flex space-x-2">
                      <button
                        type="button"
                        onClick={handleRemovePackage}
                        disabled={packageCount <= 1}
                        className={`inline-flex items-center px-3 py-1 border border-gray-300 text-sm font-medium rounded-md ${
                          packageCount <= 1
                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                            : 'bg-white text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        <svg className="h-4 w-4 mr-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                        </svg>
                        Hapus Paket
                      </button>
                      <button
                        type="button"
                        onClick={handleAddPackage}
                        disabled={packageCount >= 3}
                        className={`inline-flex items-center px-3 py-1 border border-gray-300 text-sm font-medium rounded-md ${
                          packageCount >= 3
                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                            : 'bg-white text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        <svg className="h-4 w-4 mr-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                        Tambah Paket
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                    {formData.packages.map((pkg, packageIndex) => (
                      <div
                        key={packageIndex}
                        className="border rounded-lg overflow-hidden"
                      >
                        <div className="p-4 bg-gray-50 border-b">
                          <h4 className="text-base font-medium text-gray-900">{pkg.name}</h4>
                        </div>
                        <div className="p-4 space-y-4">
                          <div>                              <label className="block text-sm font-medium text-gray-700">
                                Harga (Rp) <span className="text-red-500">*</span>
                              </label>
                              <div className="mt-1">
                                <input
                                  type="number"
                                  value={pkg.price}
                                  onChange={(e) => handlePackageChange(packageIndex, 'price', e.target.value)}
                                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                  placeholder="Contoh: 2500000"
                                  min="1"
                                  required
                                />
                              </div>
                              <p className="mt-1 text-xs text-gray-500">
                                Format: 1000000 (tanpa titik/koma)
                              </p>
                          </div>

                          <div>                              <label className="block text-sm font-medium text-gray-700">
                                Waktu Pengerjaan (Hari) <span className="text-red-500">*</span>
                              </label>
                              <div className="mt-1">
                                <input
                                  type="number"
                                  value={pkg.deliveryTime}
                                  onChange={(e) => handlePackageChange(packageIndex, 'deliveryTime', e.target.value)}
                                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                  placeholder="Contoh: 7"
                                  min="1"
                                  required
                                />
                              </div>
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700">
                              Jumlah Revisi <span className="text-red-500">*</span>
                            </label>
                            <div className="mt-1">
                              <input
                                type="number"
                                value={pkg.revisions}
                                onChange={(e) => handlePackageChange(packageIndex, 'revisions', e.target.value)}
                                className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                placeholder="Contoh: 3"
                              />
                            </div>
                          </div>

                          <div>
                            <div className="flex items-center justify-between mb-2">
                              <label className="block text-sm font-medium text-gray-700">
                                Fitur yang Disertakan <span className="text-red-500">*</span>
                              </label>
                              <button
                                type="button"
                                onClick={() => addFeature(packageIndex)}
                                className="inline-flex items-center px-2 py-1 border border-transparent text-xs font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200"
                              >
                                <svg className="h-3 w-3 mr-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                </svg>
                                Tambah
                              </button>
                            </div>
                            <div className="space-y-2">
                              {pkg.features.map((feature, featureIndex) => (
                                <div key={featureIndex} className="flex">
                                  <input
                                    type="text"
                                    value={feature}
                                    onChange={(e) => handleFeatureChange(packageIndex, featureIndex, e.target.value)}
                                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                    placeholder="Contoh: Website dengan 5 halaman"
                                  />
                                  {pkg.features.length > 1 && (
                                    <button
                                      type="button"
                                      onClick={() => removeFeature(packageIndex, featureIndex)}
                                      className="ml-2 flex-shrink-0 inline-flex items-center justify-center h-8 w-8 rounded-md border border-transparent text-red-500 hover:bg-red-100"
                                    >
                                      <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                      </svg>
                                    </button>
                                  )}
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-between">
                    <button
                      type="button"
                      onClick={() => setActiveSection('basic')}
                      className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      <svg
                        className="mr-2 h-4 w-4"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Kembali
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveSection('requirements')}
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Lanjut ke Persyaratan
                      <svg
                        className="ml-2 h-4 w-4"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              )}

              {/* Requirements Section */}
              {activeSection === 'requirements' && (
                <div>
                  <p className="text-sm text-gray-500 mb-6">
                    Jelaskan persyaratan atau informasi apa yang Anda butuhkan dari klien untuk memulai proyek.
                  </p>

                  <div className="space-y-4 mb-6">
                    {formData.requirements.map((requirement, index) => (
                      <div key={index} className="flex">
                        <input
                          type="text"
                          value={requirement}
                          onChange={(e) => handleRequirementChange(index, e.target.value)}
                          className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                          placeholder="Contoh: Detail tentang tujuan website"
                        />
                        {formData.requirements.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeRequirement(index)}
                            className="ml-2 flex-shrink-0 inline-flex items-center justify-center h-10 w-10 rounded-md border border-transparent text-red-500 hover:bg-red-100"
                          >
                            <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        )}
                      </div>
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={addRequirement}
                    className="mb-6 inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    <svg className="h-4 w-4 mr-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    Tambah Persyaratan
                  </button>

                  <div className="flex justify-between">
                    <button
                      type="button"
                      onClick={() => setActiveSection('packages')}
                      className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      <svg
                        className="mr-2 h-4 w-4"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Kembali
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveSection('faqs')}
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Lanjut ke FAQ
                      <svg
                        className="ml-2 h-4 w-4"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              )}

              {/* FAQs Section */}
              {activeSection === 'faqs' && (
                <div>
                  <p className="text-sm text-gray-500 mb-6">
                    Tambahkan pertanyaan yang sering diajukan oleh klien tentang layanan Anda.
                  </p>

                  <div className="space-y-6 mb-6">
                    {formData.faqs.map((faq, index) => (
                      <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
                        <div className="p-4 bg-gray-50 border-b border-gray-200 flex justify-between items-center">
                          <h4 className="text-sm font-medium text-gray-700">FAQ #{index + 1}</h4>
                          {formData.faqs.length > 1 && (
                            <button
                              type="button"
                              onClick={() => removeFaq(index)}
                              className="text-red-500 hover:text-red-700"
                            >
                              <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                              </svg>
                            </button>
                          )}
                        </div>
                        <div className="p-4 space-y-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700">
                              Pertanyaan
                            </label>
                            <div className="mt-1">
                              <input
                                type="text"
                                value={faq.question}
                                onChange={(e) => handleFaqChange(index, 'question', e.target.value)}
                                className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                placeholder="Contoh: Apakah termasuk biaya hosting dan domain?"
                              />
                            </div>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700">
                              Jawaban
                            </label>
                            <div className="mt-1">
                              <textarea
                                rows={3}
                                value={faq.answer}
                                onChange={(e) => handleFaqChange(index, 'answer', e.target.value)}
                                className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                placeholder="Jawaban Anda atas pertanyaan tersebut"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={addFaq}
                    className="mb-6 inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    <svg className="h-4 w-4 mr-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    Tambah FAQ
                  </button>

                  <div className="flex justify-between">
                    <button
                      type="button"
                      onClick={() => setActiveSection('requirements')}
                      className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      <svg
                        className="mr-2 h-4 w-4"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Kembali
                    </button>
                    <div className="flex space-x-3">
                      <button
                        type="button"
                        className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        Simpan sebagai Draft
                      </button>
                      <button
                        type="button"
                        onClick={handleSubmit}
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        Buat Layanan
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </FreelancerLayout>
  );
};

export default ServiceCreate;
