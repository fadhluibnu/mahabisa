import React, { useState } from 'react';
import FreelancerLayout from './Components/FreelancerLayout';
import { Link } from '@inertiajs/react';

const AddEducation = () => {
  // State for form data
  const [formData, setFormData] = useState({
    school: '',
    degree: '',
    startYear: '',
    endYear: '',
    description: '',
  });

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the data to the server
    console.log('Form submitted:', formData);
    // After successful submission, redirect to profile page
    // In a real app, you would use Inertia.js to handle this
    // For example: Inertia.post('/freelancer/add-education', formData)
  };

  return (
    <FreelancerLayout title="Tambah Pendidikan" subtitle="Tambahkan riwayat pendidikan Anda">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-800">Tambah Pendidikan</h2>
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
                  <label htmlFor="school" className="block text-sm font-medium text-gray-700 mb-1">
                    Nama Institusi / Sekolah *
                  </label>
                  <input
                    type="text"
                    id="school"
                    name="school"
                    value={formData.school}
                    onChange={handleInputChange}
                    required
                    className="w-full border border-gray-300 rounded-md shadow-sm px-4 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Contoh: Universitas Indonesia"
                  />
                </div>

                <div>
                  <label htmlFor="degree" className="block text-sm font-medium text-gray-700 mb-1">
                    Gelar / Jurusan *
                  </label>
                  <input
                    type="text"
                    id="degree"
                    name="degree"
                    value={formData.degree}
                    onChange={handleInputChange}
                    required
                    className="w-full border border-gray-300 rounded-md shadow-sm px-4 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Contoh: S1 Teknik Informatika"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="startYear" className="block text-sm font-medium text-gray-700 mb-1">
                      Tahun Mulai *
                    </label>
                    <input
                      type="text"
                      id="startYear"
                      name="startYear"
                      value={formData.startYear}
                      onChange={handleInputChange}
                      required
                      className="w-full border border-gray-300 rounded-md shadow-sm px-4 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder="Contoh: 2014"
                    />
                  </div>
                  <div>
                    <label htmlFor="endYear" className="block text-sm font-medium text-gray-700 mb-1">
                      Tahun Selesai *
                    </label>
                    <input
                      type="text"
                      id="endYear"
                      name="endYear"
                      value={formData.endYear}
                      onChange={handleInputChange}
                      required
                      className="w-full border border-gray-300 rounded-md shadow-sm px-4 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder="Contoh: 2018 (atau 'Sekarang' jika masih berlangsung)"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                    Deskripsi
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    rows={4}
                    value={formData.description}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-md shadow-sm px-4 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Ceritakan pencapaian, kegiatan, atau fokus studi Anda selama pendidikan ini"
                  />
                </div>

                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="current"
                      name="current"
                      type="checkbox"
                      className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="current" className="font-medium text-gray-700">
                      Saya masih berkuliah di sini
                    </label>
                  </div>
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

export default AddEducation;
