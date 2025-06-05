import React, { useState } from 'react';
import FreelancerLayout from './Components/FreelancerLayout';
import { Link } from '@inertiajs/react';

const AddPortfolio = () => {
  // State for form data
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    technologies: '',
    image: null,
    imagePreview: null,
  });

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle image upload
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

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the data to the server
    // Convert comma-separated technologies string to array
    const technologiesArray = formData.technologies.split(',').map(tech => tech.trim());
    const submissionData = {
      ...formData,
      technologies: technologiesArray,
    };
    console.log('Form submitted:', submissionData);
    // After successful submission, redirect to profile page
    // In a real app, you would use Inertia.js to handle this
    // For example: Inertia.post('/freelancer/add-portfolio', formData, {
    //   forceFormData: true,
    // })
  };

  return (
    <FreelancerLayout title="Tambah Portfolio" subtitle="Tambahkan proyek portfolio Anda">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-800">Tambah Portfolio</h2>
              <Link
                href="/freelancer/profile"
                className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Kembali ke Profil
              </Link>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="space-y-6">
                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                    Judul Proyek *
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    required
                    className="w-full border border-gray-300 rounded-md shadow-sm px-4 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Contoh: E-commerce Website"
                  />
                </div>

                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                    Deskripsi Proyek *
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    rows={4}
                    value={formData.description}
                    onChange={handleInputChange}
                    required
                    className="w-full border border-gray-300 rounded-md shadow-sm px-4 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Jelaskan tentang proyek, fitur utama, dan peran Anda dalam pengembangannya"
                  />
                </div>

                <div>
                  <label htmlFor="technologies" className="block text-sm font-medium text-gray-700 mb-1">
                    Teknologi yang Digunakan *
                  </label>
                  <input
                    type="text"
                    id="technologies"
                    name="technologies"
                    value={formData.technologies}
                    onChange={handleInputChange}
                    required
                    className="w-full border border-gray-300 rounded-md shadow-sm px-4 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Contoh: React, Node.js, MongoDB, Express (pisahkan dengan koma)"
                  />
                  <p className="mt-1 text-sm text-gray-500">
                    Pisahkan dengan koma (contoh: React, Laravel, MySQL)
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Gambar Proyek *
                  </label>
                  <div className="mt-1 flex items-center">
                    {formData.imagePreview ? (
                      <div className="relative">
                        <img
                          src={formData.imagePreview}
                          alt="Preview"
                          className="w-32 h-32 object-cover rounded-md"
                        />
                        <button
                          type="button"
                          onClick={() => setFormData({ ...formData, image: null, imagePreview: null })}
                          className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                        >
                          ×
                        </button>
                      </div>
                    ) : (
                      <div className="border-2 border-dashed border-gray-300 rounded-md p-6 flex flex-col items-center w-full">
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
                        <div className="flex text-sm text-gray-600 mt-2">
                          <label
                            htmlFor="image"
                            className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none"
                          >
                            <span>Upload gambar</span>
                            <input
                              id="image"
                              name="image"
                              type="file"
                              className="sr-only"
                              accept="image/*"
                              onChange={handleImageChange}
                              required
                            />
                          </label>
                          <p className="pl-1">atau drag dan drop</p>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">
                          PNG, JPG, GIF up to 10MB
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <label htmlFor="projectUrl" className="block text-sm font-medium text-gray-700 mb-1">
                    URL Proyek
                  </label>
                  <input
                    type="url"
                    id="projectUrl"
                    name="projectUrl"
                    className="w-full border border-gray-300 rounded-md shadow-sm px-4 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="https://example.com"
                  />
                  <p className="mt-1 text-sm text-gray-500">
                    Opsional: URL website proyek atau repository GitHub
                  </p>
                </div>

                <div className="pt-4 border-t border-gray-200">
                  <p className="text-sm text-gray-500 mb-4">
                    * Menandakan field yang wajib diisi
                  </p>
                  <div className="flex justify-end">
                    <Link
                      href="/freelancer/profile"
                      className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mr-3"
                    >
                      Batal
                    </Link>
                    <button
                      type="submit"
                      className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
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

export default AddPortfolio;
