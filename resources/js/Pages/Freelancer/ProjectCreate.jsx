// filepath: d:\KULIAH\D. SEMESTER 4\3. Rekayasa Perangkat Lunak\Projek MahaBisa\mahabisa\resources\js\Pages\Freelancer\ProjectCreate.jsx
import React, { useState } from 'react';
import { Link } from '@inertiajs/react';
import FreelancerLayout from './Components/FreelancerLayout';

const ProjectCreate = () => {
  const [project, setProject] = useState({
    title: '',
    client: '',
    clientEmail: '',
    clientPhone: '',
    startDate: '',
    deadline: '',
    budget: '',
    description: '',
    milestones: [
      { title: '', amount: '', date: '' }
    ]
  });

  const [files, setFiles] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProject({ ...project, [name]: value });
  };

  const handleMilestoneChange = (index, field, value) => {
    const updatedMilestones = [...project.milestones];
    updatedMilestones[index][field] = value;
    setProject({ ...project, milestones: updatedMilestones });
  };

  const addMilestone = () => {
    setProject({
      ...project,
      milestones: [...project.milestones, { title: '', amount: '', date: '' }]
    });
  };

  const removeMilestone = (index) => {
    const updatedMilestones = [...project.milestones];
    updatedMilestones.splice(index, 1);
    setProject({ ...project, milestones: updatedMilestones });
  };

  const handleFileChange = (e) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files).map(file => ({
        file,
        name: file.name,
        size: (file.size / 1024).toFixed(2) + ' KB',
        type: file.type.split('/')[0]
      }));
      
      setFiles([...files, ...newFiles]);
    }
  };

  const removeFile = (index) => {
    const updatedFiles = [...files];
    updatedFiles.splice(index, 1);
    setFiles(updatedFiles);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically submit the form data to your backend
    console.log('Project data:', project);
    console.log('Files:', files);
    
    // Simulate success and redirect
    alert('Proyek berhasil dibuat!');
    // In a real app, you would use Inertia to redirect after successful creation
  };

  return (
    <FreelancerLayout title="Buat Proyek Baru" subtitle="Tambahkan proyek baru untuk dikelola">
      <form onSubmit={handleSubmit}>
        <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-6">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">Informasi Proyek</h2>
            <p className="mt-1 text-sm text-gray-500">
              Isi detail proyek dengan lengkap untuk memudahkan pengelolaan.
            </p>
          </div>
          <div className="p-6 space-y-6">
            <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
              <div className="sm:col-span-4">
                <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                  Judul Proyek
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="title"
                    id="title"
                    value={project.title}
                    onChange={handleChange}
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    placeholder="Contoh: Desain Website E-commerce"
                    required
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="budget" className="block text-sm font-medium text-gray-700">
                  Anggaran
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="budget"
                    id="budget"
                    value={project.budget}
                    onChange={handleChange}
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    placeholder="Contoh: Rp5.000.000"
                    required
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">
                  Tanggal Mulai
                </label>
                <div className="mt-1">
                  <input
                    type="date"
                    name="startDate"
                    id="startDate"
                    value={project.startDate}
                    onChange={handleChange}
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    required
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label htmlFor="deadline" className="block text-sm font-medium text-gray-700">
                  Deadline
                </label>
                <div className="mt-1">
                  <input
                    type="date"
                    name="deadline"
                    id="deadline"
                    value={project.deadline}
                    onChange={handleChange}
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    required
                  />
                </div>
              </div>

              <div className="sm:col-span-6">
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                  Deskripsi Proyek
                </label>
                <div className="mt-1">
                  <textarea
                    id="description"
                    name="description"
                    rows={4}
                    value={project.description}
                    onChange={handleChange}
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    placeholder="Jelaskan secara detail tentang proyek ini..."
                    required
                  />
                </div>
                <p className="mt-2 text-sm text-gray-500">
                  Tuliskan deskripsi yang jelas tentang ruang lingkup proyek dan ekspektasi hasil.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-6">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">Informasi Klien</h2>
            <p className="mt-1 text-sm text-gray-500">
              Tambahkan informasi kontak klien untuk proyek ini.
            </p>
          </div>
          <div className="p-6 space-y-6">
            <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
              <div className="sm:col-span-4">
                <label htmlFor="client" className="block text-sm font-medium text-gray-700">
                  Nama Klien / Perusahaan
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="client"
                    id="client"
                    value={project.client}
                    onChange={handleChange}
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    placeholder="Contoh: PT Maju Jaya"
                    required
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label htmlFor="clientEmail" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <div className="mt-1">
                  <input
                    type="email"
                    name="clientEmail"
                    id="clientEmail"
                    value={project.clientEmail}
                    onChange={handleChange}
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    placeholder="email@example.com"
                    required
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label htmlFor="clientPhone" className="block text-sm font-medium text-gray-700">
                  Nomor Telepon
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="clientPhone"
                    id="clientPhone"
                    value={project.clientPhone}
                    onChange={handleChange}
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    placeholder="+62 812-3456-7890"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-6">
          <div className="p-6 border-b border-gray-200 flex justify-between items-center">
            <div>
              <h2 className="text-lg font-medium text-gray-900">Milestone Proyek</h2>
              <p className="mt-1 text-sm text-gray-500">
                Bagi proyek menjadi beberapa milestone untuk memudahkan pelacakan dan pembayaran.
              </p>
            </div>
            <button
              type="button"
              onClick={addMilestone}
              className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <svg className="-ml-0.5 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Tambah Milestone
            </button>
          </div>
          <div className="p-6 space-y-4">
            {project.milestones.map((milestone, index) => (
              <div key={index} className="border rounded-lg p-4 bg-gray-50 relative">
                {index > 0 && (
                  <button
                    type="button"
                    onClick={() => removeMilestone(index)}
                    className="absolute top-2 right-2 text-gray-400 hover:text-gray-500"
                  >
                    <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                )}
                <div className="grid grid-cols-1 gap-y-4 gap-x-4 sm:grid-cols-3">
                  <div className="sm:col-span-1">
                    <label htmlFor={`milestone-title-${index}`} className="block text-sm font-medium text-gray-700">
                      Judul Milestone
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        id={`milestone-title-${index}`}
                        value={milestone.title}
                        onChange={(e) => handleMilestoneChange(index, 'title', e.target.value)}
                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        placeholder="Contoh: Desain UI Selesai"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="sm:col-span-1">
                    <label htmlFor={`milestone-amount-${index}`} className="block text-sm font-medium text-gray-700">
                      Jumlah Pembayaran
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        id={`milestone-amount-${index}`}
                        value={milestone.amount}
                        onChange={(e) => handleMilestoneChange(index, 'amount', e.target.value)}
                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        placeholder="Contoh: Rp1.500.000"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="sm:col-span-1">
                    <label htmlFor={`milestone-date-${index}`} className="block text-sm font-medium text-gray-700">
                      Tanggal Target
                    </label>
                    <div className="mt-1">
                      <input
                        type="date"
                        id={`milestone-date-${index}`}
                        value={milestone.date}
                        onChange={(e) => handleMilestoneChange(index, 'date', e.target.value)}
                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-6">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">Unggah File</h2>
            <p className="mt-1 text-sm text-gray-500">
              Lampirkan file yang relevan dengan proyek (opsional).
            </p>
          </div>
          <div className="p-6">
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
                    className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                  >
                    <span>Unggah file</span>
                    <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={handleFileChange} multiple />
                  </label>
                  <p className="pl-1">atau drag and drop</p>
                </div>
                <p className="text-xs text-gray-500">PNG, JPG, PDF hingga 10MB</p>
              </div>
            </div>

            {files.length > 0 && (
              <div className="mt-4">
                <h4 className="text-sm font-medium text-gray-700 mb-2">File yang Diunggah:</h4>
                <ul className="border rounded-md divide-y divide-gray-200">
                  {files.map((file, index) => (
                    <li key={index} className="pl-3 pr-4 py-3 flex items-center justify-between text-sm">
                      <div className="w-0 flex-1 flex items-center">
                        <svg className="flex-shrink-0 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                        </svg>
                        <span className="ml-2 flex-1 w-0 truncate">{file.name}</span>
                      </div>
                      <div className="ml-4 flex-shrink-0 flex items-center space-x-4">
                        <span className="text-xs text-gray-500">{file.size}</span>
                        <button
                          type="button"
                          onClick={() => removeFile(index)}
                          className="font-medium text-red-600 hover:text-red-500"
                        >
                          Hapus
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-end space-x-3">
          <Link 
            href="/freelancer/projects" 
            className="inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Batal
          </Link>
          <button
            type="submit"
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Simpan Proyek
          </button>
        </div>
      </form>
    </FreelancerLayout>
  );
};

export default ProjectCreate;
