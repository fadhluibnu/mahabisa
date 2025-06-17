import React, { useState, useEffect } from 'react';
import ClientLayout from './Components/ClientLayout';
import { Link, router } from '@inertiajs/react';
import { FaArrowLeft, FaSave, FaTimes } from 'react-icons/fa';
// Import the route function that's globally available from Ziggy

const EditProfile = ({ userProfile, skills }) => {
  // Debug: Log the props to see what we're receiving
  useEffect(() => {
    console.log('UserProfile data:', userProfile);
    console.log('Skills data:', skills);
  }, [userProfile, skills]);

  // Form state management
  const [formData, setFormData] = useState({
    name: userProfile.name || '',
    title: userProfile.title || '',
    email: userProfile.email || '',
    phone: userProfile.phone || '',
    location: userProfile.location || '',
    bio: userProfile.bio || '',
    company: userProfile.company || '',
    position: userProfile.position || '',
    website: userProfile.website || '',
    profile_photo: null,
    _method: 'put', // For method spoofing
  });

  const [errors, setErrors] = useState({});
  const [processing, setProcessing] = useState(false);

  // State for managing the image preview
  const [imagePreview, setImagePreview] = useState(
    userProfile.profile_photo_url
  );

  // Handle input changes
  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle image upload
  const handleImageChange = e => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];

      setFormData(prevData => ({
        ...prevData,
        profile_photo: file,
      }));

      // Create a preview URL
      const reader = new FileReader();
      reader.onload = event => {
        setImagePreview(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle form submission
  const handleSubmit = e => {
    e.preventDefault();
    setProcessing(true);

    // Create FormData to handle file uploads
    const formDataToSend = new FormData();

    // Append all form fields to FormData
    Object.keys(formData).forEach(key => {
      if (formData[key] !== null) {
        formDataToSend.append(key, formData[key]);
      }
    });

    // Use Inertia router to submit the form with hardcoded URL
    router.post('/client/profile', formDataToSend, {
      forceFormData: true,
      onSuccess: () => {
        console.log('Profile updated successfully');
        // This will happen after the redirect completes
      },
      onError: errors => {
        setErrors(errors);
        setProcessing(false);
        console.error('Errors:', errors);
      },
      onFinish: () => {
        setProcessing(false);
      },
    });
  };

  return (
    <ClientLayout title='Edit Profil' subtitle='Perbarui informasi profil Anda'>
      <div className='max-w-5xl mx-auto'>
        {/* Header */}
        <div className='flex items-center justify-between mb-6'>
          <div className='flex items-center'>
            <Link
              href='/client/profile'
              className='mr-4 text-gray-600 hover:text-gray-900'
            >
              <FaArrowLeft />
            </Link>
            <h1 className='text-2xl font-bold text-gray-800'>Edit Profil</h1>
          </div>
          <div className='flex space-x-3'>
            <Link
              href='/client/profile'
              className='inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
            >
              <FaTimes className='mr-2' />
              Batal
            </Link>
            <button
              type='button'
              onClick={handleSubmit}
              disabled={processing}
              className='inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-75'
            >
              <FaSave className='mr-2' />
              {processing ? 'Menyimpan...' : 'Simpan Perubahan'}
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className='bg-white rounded-xl shadow-sm overflow-hidden mb-6'>
            {/* Profile Photo */}
            <div className='p-6 border-b border-gray-200'>
              <h3 className='text-lg font-medium text-gray-900 mb-4'>
                Foto Profil
              </h3>
              <div className='flex items-center'>
                <div className='mr-6'>
                  <img
                    src={imagePreview}
                    alt='Profile Preview'
                    className='w-32 h-32 rounded-full object-cover'
                  />
                </div>
                <div>
                  <input
                    type='file'
                    id='profile-photo'
                    accept='image/*'
                    className='hidden'
                    onChange={handleImageChange}
                  />
                  <label
                    htmlFor='profile-photo'
                    className='inline-block px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 cursor-pointer'
                  >
                    Ubah Foto
                  </label>
                  <p className='mt-2 text-sm text-gray-500'>
                    Ukuran maksimal 2MB. Format yang didukung: JPG, PNG, GIF.
                  </p>
                  {errors.profile_photo && (
                    <p className='mt-1 text-sm text-red-600'>
                      {errors.profile_photo}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Personal Information */}
            <div className='p-6 border-b border-gray-200'>
              <h3 className='text-lg font-medium text-gray-900 mb-4'>
                Informasi Pribadi
              </h3>

              <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                <div>
                  <label
                    htmlFor='name'
                    className='block text-sm font-medium text-gray-700 mb-1'
                  >
                    Nama Lengkap
                  </label>
                  <input
                    type='text'
                    id='name'
                    name='name'
                    value={formData.name}
                    onChange={handleChange}
                    className='shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md'
                    required
                  />
                  {errors.name && (
                    <p className='mt-1 text-sm text-red-600'>{errors.name}</p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor='title'
                    className='block text-sm font-medium text-gray-700 mb-1'
                  >
                    Judul/Profesi
                  </label>
                  <input
                    type='text'
                    id='title'
                    name='title'
                    value={formData.title}
                    onChange={handleChange}
                    className='shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md'
                  />
                  {errors.title && (
                    <p className='mt-1 text-sm text-red-600'>{errors.title}</p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor='email'
                    className='block text-sm font-medium text-gray-700 mb-1'
                  >
                    Email
                  </label>
                  <input
                    type='email'
                    id='email'
                    name='email'
                    value={formData.email}
                    onChange={handleChange}
                    className='shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md'
                    required
                  />
                  {errors.email && (
                    <p className='mt-1 text-sm text-red-600'>{errors.email}</p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor='phone'
                    className='block text-sm font-medium text-gray-700 mb-1'
                  >
                    Telepon
                  </label>
                  <input
                    type='text'
                    id='phone'
                    name='phone'
                    value={formData.phone}
                    onChange={handleChange}
                    className='shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md'
                  />
                  {errors.phone && (
                    <p className='mt-1 text-sm text-red-600'>{errors.phone}</p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor='location'
                    className='block text-sm font-medium text-gray-700 mb-1'
                  >
                    Lokasi
                  </label>
                  <input
                    type='text'
                    id='location'
                    name='location'
                    value={formData.location}
                    onChange={handleChange}
                    className='shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md'
                  />
                  {errors.location && (
                    <p className='mt-1 text-sm text-red-600'>
                      {errors.location}
                    </p>
                  )}
                </div>

                <div className='md:col-span-2'>
                  <label
                    htmlFor='bio'
                    className='block text-sm font-medium text-gray-700 mb-1'
                  >
                    Bio
                  </label>
                  <textarea
                    id='bio'
                    name='bio'
                    rows={4}
                    value={formData.bio}
                    onChange={handleChange}
                    className='shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md'
                  ></textarea>
                  {errors.bio && (
                    <p className='mt-1 text-sm text-red-600'>{errors.bio}</p>
                  )}
                  <p className='mt-1 text-sm text-gray-500'>
                    Jelaskan secara singkat tentang diri Anda dan pengalaman
                    profesional Anda.
                  </p>
                </div>
              </div>
            </div>

            {/* Company Information */}
            <div className='p-6'>
              <h3 className='text-lg font-medium text-gray-900 mb-4'>
                Informasi Perusahaan
              </h3>

              <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                <div>
                  <label
                    htmlFor='company'
                    className='block text-sm font-medium text-gray-700 mb-1'
                  >
                    Nama Perusahaan
                  </label>
                  <input
                    type='text'
                    id='company'
                    name='company'
                    value={formData.company}
                    onChange={handleChange}
                    className='shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md'
                  />
                  {errors.company && (
                    <p className='mt-1 text-sm text-red-600'>
                      {errors.company}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor='position'
                    className='block text-sm font-medium text-gray-700 mb-1'
                  >
                    Jabatan
                  </label>
                  <input
                    type='text'
                    id='position'
                    name='position'
                    value={formData.position}
                    onChange={handleChange}
                    className='shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md'
                  />
                  {errors.position && (
                    <p className='mt-1 text-sm text-red-600'>
                      {errors.position}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor='website'
                    className='block text-sm font-medium text-gray-700 mb-1'
                  >
                    Website
                  </label>
                  <input
                    type='text'
                    id='website'
                    name='website'
                    value={formData.website}
                    onChange={handleChange}
                    className='shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md'
                  />
                  {errors.website && (
                    <p className='mt-1 text-sm text-red-600'>
                      {errors.website}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Submit button for small screens */}
          <div className='md:hidden mb-6'>
            <button
              type='button'
              onClick={handleSubmit}
              className='w-full px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
              disabled={processing}
            >
              {processing ? 'Menyimpan...' : 'Simpan Perubahan'}
            </button>
          </div>
        </form>
      </div>
    </ClientLayout>
  );
};

export default EditProfile;
