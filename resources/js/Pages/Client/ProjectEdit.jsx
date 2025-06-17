import React, { useState, useEffect } from 'react';
import { Link, useForm } from '@inertiajs/react';
import ClientLayout from './Components/ClientLayout';

const ProjectEdit = ({ id }) => {
  // In a real app, you would fetch project data based on the ID
  const [project, setProject] = useState({
    id: id || 1,
    title: 'Pengembangan Website E-commerce',
    description:
      'Membutuhkan pengembangan website e-commerce dengan fitur-fitur modern seperti keranjang belanja, pembayaran online, dan sistem manajemen inventori.',
    freelancer: 'Alex Suryanto',
    freelancerAvatar:
      'https://ui-avatars.com/api/?name=Alex+Suryanto&background=8b5cf6&color=fff',
    status: 'ongoing',
    startDate: '2025-06-01',
    deadline: '2025-06-15',
    budget: 4500000,
    skills: ['React', 'Laravel', 'MySQL', 'Tailwind CSS'],
    attachments: [
      { name: 'project_brief.pdf', size: '2.4 MB', url: '#' },
      { name: 'wireframes.jpg', size: '1.8 MB', url: '#' },
    ],
  });

  // Initialize form with project data
  const { data, setData, post, processing, errors } = useForm({
    title: project.title,
    description: project.description,
    deadline: project.deadline,
    budget: project.budget,
    skills: project.skills.join(', '),
  });

  // Update form data if project changes
  useEffect(() => {
    setData({
      title: project.title,
      description: project.description,
      deadline: project.deadline,
      budget: project.budget,
      skills: project.skills.join(', '),
    });
  }, [project]);

  // Handle form submission
  const handleSubmit = e => {
    e.preventDefault();

    // In a real app, you would submit to the server
    // post(route('client.projects.update', project.id));

    // For demo purposes, we'll just alert and update the local state
    alert('Proyek berhasil diperbarui!');

    // Update the project data locally for demonstration
    setProject({
      ...project,
      title: data.title,
      description: data.description,
      deadline: data.deadline,
      budget: data.budget,
      skills: data.skills
        .split(',')
        .map(skill => skill.trim())
        .filter(skill => skill !== ''),
    });
  };

  // Handle file upload
  const [newAttachment, setNewAttachment] = useState(null);

  const handleFileChange = e => {
    if (e.target.files && e.target.files[0]) {
      setNewAttachment(e.target.files[0]);
    }
  };

  const handleFileUpload = e => {
    e.preventDefault();

    if (!newAttachment) return;

    // In a real app, you would upload the file to the server
    // For demo, we'll just add it to the list
    const newAttachmentObj = {
      name: newAttachment.name,
      size: `${(newAttachment.size / (1024 * 1024)).toFixed(1)} MB`,
      url: '#',
    };

    setProject({
      ...project,
      attachments: [...project.attachments, newAttachmentObj],
    });

    setNewAttachment(null);
    document.getElementById('file-upload').value = null;
  };

  return (
    <ClientLayout title='Edit Proyek' subtitle='Perbarui detail proyek Anda'>
      <div className='bg-white rounded-xl shadow-sm overflow-hidden mb-6'>
        <div className='p-6'>
          <form onSubmit={handleSubmit}>
            <div className='space-y-8 divide-y divide-gray-200'>
              <div className='space-y-6'>
                <div>
                  <h3 className='text-lg leading-6 font-medium text-gray-900'>
                    Informasi Proyek
                  </h3>
                  <p className='mt-1 text-sm text-gray-500'>
                    Perbarui informasi dasar tentang proyek Anda
                  </p>
                </div>

                <div className='grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6'>
                  <div className='sm:col-span-4'>
                    <label
                      htmlFor='title'
                      className='block text-sm font-medium text-gray-700'
                    >
                      Judul Proyek
                    </label>
                    <div className='mt-1'>
                      <input
                        type='text'
                        name='title'
                        id='title'
                        value={data.title}
                        onChange={e => setData('title', e.target.value)}
                        className='shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md'
                      />
                    </div>
                    {errors.title && (
                      <div className='text-red-500 text-xs mt-1'>
                        {errors.title}
                      </div>
                    )}
                  </div>

                  <div className='sm:col-span-6'>
                    <label
                      htmlFor='description'
                      className='block text-sm font-medium text-gray-700'
                    >
                      Deskripsi
                    </label>
                    <div className='mt-1'>
                      <textarea
                        id='description'
                        name='description'
                        rows={3}
                        value={data.description}
                        onChange={e => setData('description', e.target.value)}
                        className='shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md'
                      />
                    </div>
                    <p className='mt-2 text-sm text-gray-500'>
                      Jelaskan secara rinci tentang proyek yang Anda butuhkan.
                    </p>
                    {errors.description && (
                      <div className='text-red-500 text-xs mt-1'>
                        {errors.description}
                      </div>
                    )}
                  </div>

                  <div className='sm:col-span-3'>
                    <label
                      htmlFor='deadline'
                      className='block text-sm font-medium text-gray-700'
                    >
                      Tenggat Waktu
                    </label>
                    <div className='mt-1'>
                      <input
                        type='date'
                        name='deadline'
                        id='deadline'
                        value={data.deadline}
                        onChange={e => setData('deadline', e.target.value)}
                        className='shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md'
                      />
                    </div>
                    {errors.deadline && (
                      <div className='text-red-500 text-xs mt-1'>
                        {errors.deadline}
                      </div>
                    )}
                  </div>

                  <div className='sm:col-span-3'>
                    <label
                      htmlFor='budget'
                      className='block text-sm font-medium text-gray-700'
                    >
                      Budget (Rp)
                    </label>
                    <div className='mt-1 relative rounded-md shadow-sm'>
                      <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                        <span className='text-gray-500 sm:text-sm'>Rp</span>
                      </div>
                      <input
                        type='number'
                        name='budget'
                        id='budget'
                        value={data.budget}
                        onChange={e => setData('budget', e.target.value)}
                        className='focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md'
                        placeholder='0'
                      />
                    </div>
                    {errors.budget && (
                      <div className='text-red-500 text-xs mt-1'>
                        {errors.budget}
                      </div>
                    )}
                  </div>

                  <div className='sm:col-span-6'>
                    <label
                      htmlFor='skills'
                      className='block text-sm font-medium text-gray-700'
                    >
                      Keahlian yang Dibutuhkan
                    </label>
                    <div className='mt-1'>
                      <input
                        type='text'
                        name='skills'
                        id='skills'
                        value={data.skills}
                        onChange={e => setData('skills', e.target.value)}
                        className='shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md'
                        placeholder='React, Laravel, MySQL, Tailwind CSS'
                      />
                    </div>
                    <p className='mt-2 text-sm text-gray-500'>
                      Pisahkan dengan koma untuk beberapa keahlian.
                    </p>
                    {errors.skills && (
                      <div className='text-red-500 text-xs mt-1'>
                        {errors.skills}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className='pt-8'>
                <div>
                  <h3 className='text-lg leading-6 font-medium text-gray-900'>
                    Lampiran
                  </h3>
                  <p className='mt-1 text-sm text-gray-500'>
                    Kelola lampiran proyek seperti brief, wireframe, dan lainnya
                  </p>
                </div>

                <div className='mt-6'>
                  <div className='flex items-start space-x-4'>
                    <div className='min-w-0 flex-1'>
                      <div className='relative'>
                        <div className='border border-gray-300 rounded-lg shadow-sm overflow-hidden focus-within:border-indigo-500 focus-within:ring-1 focus-within:ring-indigo-500'>
                          <label htmlFor='file-upload' className='sr-only'>
                            Upload file
                          </label>
                          <input
                            id='file-upload'
                            name='file-upload'
                            type='file'
                            className='block w-full text-sm text-gray-500 p-2 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100'
                            onChange={handleFileChange}
                          />
                        </div>
                      </div>
                    </div>
                    <div className='flex-shrink-0'>
                      <button
                        type='button'
                        onClick={handleFileUpload}
                        disabled={!newAttachment}
                        className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white ${
                          newAttachment
                            ? 'bg-indigo-600 hover:bg-indigo-700'
                            : 'bg-gray-300 cursor-not-allowed'
                        } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
                      >
                        Upload
                      </button>
                    </div>
                  </div>
                </div>

                <div className='mt-4'>
                  <h4 className='text-sm font-medium text-gray-700 mb-2'>
                    Lampiran Saat Ini
                  </h4>
                  {project.attachments.length > 0 ? (
                    <ul className='border border-gray-200 rounded-md divide-y divide-gray-200'>
                      {project.attachments.map((attachment, index) => (
                        <li
                          key={index}
                          className='pl-3 pr-4 py-3 flex items-center justify-between text-sm'
                        >
                          <div className='w-0 flex-1 flex items-center'>
                            <svg
                              className='flex-shrink-0 h-5 w-5 text-gray-400'
                              xmlns='http://www.w3.org/2000/svg'
                              viewBox='0 0 20 20'
                              fill='currentColor'
                            >
                              <path
                                fillRule='evenodd'
                                d='M8 4a3 3 0 00-3 3v4a5 5 0 0010 0V7a1 1 0 112 0v4a7 7 0 11-14 0V7a5 5 0 0110 0v4a3 3 0 11-6 0V7a1 1 0 012 0v4a1 1 0 102 0V7a3 3 0 00-3-3z'
                                clipRule='evenodd'
                              />
                            </svg>
                            <span className='ml-2 flex-1 w-0 truncate'>
                              {attachment.name}
                            </span>
                          </div>
                          <div className='ml-4 flex-shrink-0 flex items-center space-x-4'>
                            <span className='text-gray-500'>
                              {attachment.size}
                            </span>
                            <button
                              type='button'
                              className='font-medium text-red-600 hover:text-red-500'
                              onClick={() => {
                                const newAttachments =
                                  project.attachments.filter(
                                    (_, i) => i !== index
                                  );
                                setProject({
                                  ...project,
                                  attachments: newAttachments,
                                });
                              }}
                            >
                              Hapus
                            </button>
                          </div>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className='text-sm text-gray-500'>Tidak ada lampiran</p>
                  )}
                </div>
              </div>
            </div>

            <div className='pt-5 mt-8 border-t border-gray-200'>
              <div className='flex justify-end'>
                <Link
                  href={`/client/projects/${project.id}`}
                  className='bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                >
                  Batal
                </Link>
                <button
                  type='submit'
                  disabled={processing}
                  className='ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                >
                  {processing ? 'Menyimpan...' : 'Simpan Perubahan'}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </ClientLayout>
  );
};

export default ProjectEdit;
