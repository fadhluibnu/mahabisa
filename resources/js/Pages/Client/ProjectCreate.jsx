import React, { useState } from 'react';
import { Link } from '@inertiajs/react';
import ClientLayout from './Components/ClientLayout';

const ProjectCreate = ({ id, isEditing }) => {
  const [formData, setFormData] = useState({
    title: isEditing ? 'Pengembangan Website E-commerce' : '',
    category: isEditing ? 'web-development' : '',
    description: isEditing ? 'Membutuhkan pengembangan website e-commerce dengan fitur-fitur modern seperti keranjang belanja, pembayaran online, dan sistem manajemen inventori.' : '',
    skills: isEditing ? ['React', 'Laravel', 'MySQL', 'Tailwind CSS'] : [],
    budget: isEditing ? '4500000' : '',
    deadline: isEditing ? '2025-06-15' : '',
    attachments: [],
  });

  const [newSkill, setNewSkill] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleAddSkill = () => {
    if (newSkill.trim() !== '' && !formData.skills.includes(newSkill.trim())) {
      setFormData({
        ...formData,
        skills: [...formData.skills, newSkill.trim()],
      });
      setNewSkill('');
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    setFormData({
      ...formData,
      skills: formData.skills.filter((skill) => skill !== skillToRemove),
    });
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddSkill();
    }
  };

  const handleFileChange = (e) => {
    // In a real app, you'd handle file uploads to a server
    // This is a simplified version for the UI demonstration
    const files = Array.from(e.target.files);
    setFormData({
      ...formData,
      attachments: [...formData.attachments, ...files],
    });
  };

  const handleRemoveFile = (fileToRemove) => {
    setFormData({
      ...formData,
      attachments: formData.attachments.filter((file) => file !== fileToRemove),
    });
  };

  return (
    <ClientLayout
      title={isEditing ? "Edit Proyek" : "Buat Proyek Baru"}
      subtitle={isEditing ? "Perbarui detail proyek Anda" : "Buat permintaan proyek baru untuk freelancer"}
    >
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <form className="p-6">
          <div className="space-y-6">
            {/* Project Title */}
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                Judul Proyek
              </label>
              <input
                type="text"
                name="title"
                id="title"
                value={formData.title}
                onChange={handleInputChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Contoh: Pengembangan Website E-commerce"
              />
            </div>

            {/* Project Category */}
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                Kategori
              </label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="mt-1 block w-full pl-3 pr-10 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="">Pilih Kategori</option>
                <option value="web-development">Pengembangan Web</option>
                <option value="mobile-development">Pengembangan Mobile</option>
                <option value="design">Desain Grafis & UI/UX</option>
                <option value="content">Konten & Penulisan</option>
                <option value="marketing">Digital Marketing</option>
                <option value="video">Video & Animasi</option>
                <option value="data">Data & Analitik</option>
                <option value="other">Lainnya</option>
              </select>
            </div>

            {/* Project Description */}
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                Deskripsi Proyek
              </label>
              <textarea
                id="description"
                name="description"
                rows={5}
                value={formData.description}
                onChange={handleInputChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Jelaskan secara detail tentang proyek yang Anda butuhkan"
              />
            </div>

            {/* Skills Required */}
            <div>
              <label htmlFor="skills" className="block text-sm font-medium text-gray-700">
                Keahlian yang Dibutuhkan
              </label>
              <div className="mt-1 flex rounded-md shadow-sm">
                <input
                  type="text"
                  name="skills"
                  id="skills"
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="flex-1 min-w-0 block w-full px-3 py-2 border border-gray-300 rounded-none rounded-l-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Contoh: React, Laravel, UX Design"
                />
                <button
                  type="button"
                  onClick={handleAddSkill}
                  className="inline-flex items-center px-4 py-2 border border-l-0 border-gray-300 rounded-r-md bg-indigo-50 text-indigo-700 hover:bg-indigo-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Tambah
                </button>
              </div>
              {formData.skills.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-2">
                  {formData.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800"
                    >
                      {skill}
                      <button
                        type="button"
                        onClick={() => handleRemoveSkill(skill)}
                        className="ml-1.5 inline-flex items-center justify-center h-4 w-4 rounded-full text-indigo-400 hover:bg-indigo-200 hover:text-indigo-600 focus:outline-none"
                      >
                        <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Budget */}
            <div>
              <label htmlFor="budget" className="block text-sm font-medium text-gray-700">
                Budget (Rp)
              </label>
              <input
                type="number"
                name="budget"
                id="budget"
                value={formData.budget}
                onChange={handleInputChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Contoh: 5000000"
              />
            </div>

            {/* Deadline */}
            <div>
              <label htmlFor="deadline" className="block text-sm font-medium text-gray-700">
                Deadline
              </label>
              <input
                type="date"
                name="deadline"
                id="deadline"
                value={formData.deadline}
                onChange={handleInputChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            {/* Attachments */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Lampiran (Opsional)
              </label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
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
                      htmlFor="file-upload"
                      className="relative cursor-pointer bg-white rounded-md font-medium text-teal-600 hover:text-teal-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-teal-500"
                    >
                      <span>Upload file</span>
                      <input
                        id="file-upload"
                        name="file-upload"
                        type="file"
                        className="sr-only"
                        multiple
                        onChange={handleFileChange}
                      />
                    </label>
                    <p className="pl-1">atau drag and drop</p>
                  </div>
                  <p className="text-xs text-gray-500">
                    PNG, JPG, PDF hingga 10MB
                  </p>
                </div>
              </div>
              
              {formData.attachments.length > 0 && (
                <ul className="mt-3 divide-y divide-gray-100 rounded-md border border-gray-200">
                  {formData.attachments.map((file, index) => (
                    <li key={index} className="flex items-center justify-between py-3 pl-3 pr-4 text-sm">
                      <div className="flex w-0 flex-1 items-center">
                        <svg className="h-5 w-5 flex-shrink-0 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M8 4a3 3 0 00-3 3v4a5 5 0 0010 0V7a1 1 0 112 0v4a7 7 0 11-14 0V7a5 5 0 0110 0v4a3 3 0 11-6 0V7a1 1 0 012 0v4a1 1 0 102 0V7a3 3 0 00-3-3z" clipRule="evenodd" />
                        </svg>
                        <span className="ml-2 w-0 flex-1 truncate">
                          {file.name}
                        </span>
                      </div>
                      <div className="ml-4 flex-shrink-0">
                        <button
                          type="button"
                          onClick={() => handleRemoveFile(file)}
                          className="font-medium text-teal-600 hover:text-teal-500"
                        >
                          Hapus
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>          <div className="mt-8 flex justify-end">
            <Link
              href="/client/projects"
              className="inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Batal
            </Link>
            <button
              type="submit"
              className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {isEditing ? 'Perbarui Proyek' : 'Buat Proyek'}
            </button>
          </div>
        </form>
      </div>
    </ClientLayout>
  );
};

export default ProjectCreate;
