import React, { useState } from 'react';
import FreelancerLayout from './Components/FreelancerLayout';
import { Link } from '@inertiajs/react';

const AddExperience = () => {
  // State for form data
  const [formData, setFormData] = useState({
    company: '',
    position: '',
    startYear: '',
    endYear: '',
    description: '',
    isCurrent: false,
  });

  // Handle input changes
  const handleInputChange = e => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  // Handle form submission
  const handleSubmit = e => {
    e.preventDefault();
    // Here you would typically send the data to the server
    console.log('Form submitted:', formData);
    // After successful submission, redirect to profile page
    // In a real app, you would use Inertia.js to handle this
    // For example: Inertia.post('/freelancer/add-experience', formData)
  };

  return (
    <FreelancerLayout
      title='Tambah Pengalaman'
      subtitle='Tambahkan riwayat pengalaman kerja Anda'
    >
      <div className='max-w-4xl mx-auto'>
        <div className='bg-white rounded-xl shadow-sm overflow-hidden'>
          <div className='p-6'>
            <div className='flex items-center justify-between mb-6'>
              <h2 className='text-xl font-bold text-gray-800'>
                Tambah Pengalaman
              </h2>
              <Link
                href='/freelancer/profile'
                className='px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
              >
                Kembali ke Profil
              </Link>
            </div>

            <form onSubmit={handleSubmit}>
              <div className='space-y-6'>
                <div>
                  <label
                    htmlFor='company'
                    className='block text-sm font-medium text-gray-700 mb-1'
                  >
                    Nama Perusahaan / Organisasi *
                  </label>
                  <input
                    type='text'
                    id='company'
                    name='company'
                    value={formData.company}
                    onChange={handleInputChange}
                    required
                    className='w-full border border-gray-300 rounded-md shadow-sm px-4 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500'
                    placeholder='Contoh: PT Teknologi Maju'
                  />
                </div>

                <div>
                  <label
                    htmlFor='position'
                    className='block text-sm font-medium text-gray-700 mb-1'
                  >
                    Posisi / Jabatan *
                  </label>
                  <input
                    type='text'
                    id='position'
                    name='position'
                    value={formData.position}
                    onChange={handleInputChange}
                    required
                    className='w-full border border-gray-300 rounded-md shadow-sm px-4 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500'
                    placeholder='Contoh: Senior Web Developer'
                  />
                </div>

                <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                  <div>
                    <label
                      htmlFor='startYear'
                      className='block text-sm font-medium text-gray-700 mb-1'
                    >
                      Tahun Mulai *
                    </label>
                    <input
                      type='text'
                      id='startYear'
                      name='startYear'
                      value={formData.startYear}
                      onChange={handleInputChange}
                      required
                      className='w-full border border-gray-300 rounded-md shadow-sm px-4 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500'
                      placeholder='Contoh: 2020'
                    />
                  </div>
                  <div>
                    <label
                      htmlFor='endYear'
                      className='block text-sm font-medium text-gray-700 mb-1'
                    >
                      Tahun Selesai *
                    </label>
                    <input
                      type='text'
                      id='endYear'
                      name='endYear'
                      value={formData.isCurrent ? 'Sekarang' : formData.endYear}
                      onChange={handleInputChange}
                      disabled={formData.isCurrent}
                      required={!formData.isCurrent}
                      className='w-full border border-gray-300 rounded-md shadow-sm px-4 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500'
                      placeholder='Contoh: 2022 (atau biarkan kosong jika masih bekerja di sini)'
                    />
                  </div>
                </div>

                <div className='flex items-start'>
                  <div className='flex items-center h-5'>
                    <input
                      id='isCurrent'
                      name='isCurrent'
                      type='checkbox'
                      checked={formData.isCurrent}
                      onChange={handleInputChange}
                      className='h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500'
                    />
                  </div>
                  <div className='ml-3 text-sm'>
                    <label
                      htmlFor='isCurrent'
                      className='font-medium text-gray-700'
                    >
                      Saya masih bekerja di sini
                    </label>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor='description'
                    className='block text-sm font-medium text-gray-700 mb-1'
                  >
                    Deskripsi Pekerjaan *
                  </label>
                  <textarea
                    id='description'
                    name='description'
                    rows={4}
                    value={formData.description}
                    onChange={handleInputChange}
                    required
                    className='w-full border border-gray-300 rounded-md shadow-sm px-4 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500'
                    placeholder='Jelaskan tanggung jawab dan pencapaian Anda dalam posisi ini'
                  />
                </div>

                <div className='pt-4 border-t border-gray-200'>
                  <p className='text-sm text-gray-500 mb-4'>
                    * Menandakan field yang wajib diisi
                  </p>
                  <div className='flex justify-end'>
                    <Link
                      href='/freelancer/profile'
                      className='px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mr-3'
                    >
                      Batal
                    </Link>
                    <button
                      type='submit'
                      className='px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                    >
                      Simpan
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </FreelancerLayout>
  );
};

export default AddExperience;
