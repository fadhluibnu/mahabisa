// filepath: d:\KULIAH\D. SEMESTER 4\3. Rekayasa Perangkat Lunak\Projek MahaBisa\mahabisa\resources\js\Pages\Freelancer\ProjectDetail.jsx
import React, { useState } from 'react';
import { Link } from '@inertiajs/react';
import FreelancerLayout from './Components/FreelancerLayout';

const ProjectDetail = ({ id }) => {
  // In a real app, you would fetch project data based on the ID
  // This is dummy data for demonstration
  const [project, setProject] = useState({
    id: id || 1,
    title: 'Redesain Website E-commerce',
    client: 'PT Maju Bersama',
    status: 'in-progress',
    startDate: '2023-06-01',
    deadline: '2023-06-15',
    budget: 'Rp4.500.000',
    paid: 'Rp2.250.000',
    remaining: 'Rp2.250.000',
    progress: 65,
    description:
      'Proyek ini melibatkan redesain website e-commerce untuk meningkatkan pengalaman pengguna dan konversi. Meliputi desain ulang halaman produk, checkout, dan implementasi fitur pencarian yang lebih baik.',
    tasks: [
      {
        id: 1,
        title: 'Wireframing',
        status: 'completed',
        dueDate: '2023-06-03',
      },
      {
        id: 2,
        title: 'Desain UI Homepage',
        status: 'completed',
        dueDate: '2023-06-05',
      },
      {
        id: 3,
        title: 'Desain UI Katalog Produk',
        status: 'completed',
        dueDate: '2023-06-07',
      },
      {
        id: 4,
        title: 'Desain UI Halaman Checkout',
        status: 'in-progress',
        dueDate: '2023-06-10',
      },
      {
        id: 5,
        title: 'Implementasi Revisi',
        status: 'pending',
        dueDate: '2023-06-12',
      },
      {
        id: 6,
        title: 'Pengujian & Finalisasi',
        status: 'pending',
        dueDate: '2023-06-15',
      },
    ],
    milestones: [
      {
        id: 1,
        title: 'Persetujuan Wireframe',
        status: 'completed',
        date: '2023-06-03',
        amount: 'Rp900.000',
      },
      {
        id: 2,
        title: 'Desain UI Selesai',
        status: 'completed',
        date: '2023-06-07',
        amount: 'Rp1.350.000',
      },
      {
        id: 3,
        title: 'Implementasi Revisi',
        status: 'pending',
        date: '2023-06-12',
        amount: 'Rp1.350.000',
      },
      {
        id: 4,
        title: 'Proyek Selesai',
        status: 'pending',
        date: '2023-06-15',
        amount: 'Rp900.000',
      },
    ],
    messages: [
      {
        id: 1,
        sender: 'Client',
        content: 'Bagaimana progress redesain website?',
        date: '2023-06-05T09:30:00',
      },
      {
        id: 2,
        sender: 'You',
        content:
          'Saya sudah menyelesaikan desain UI untuk homepage dan sedang mengerjakan halaman katalog produk.',
        date: '2023-06-05T10:15:00',
      },
      {
        id: 3,
        sender: 'Client',
        content:
          'Terlihat bagus. Saya punya beberapa saran untuk halaman checkout.',
        date: '2023-06-06T14:22:00',
      },
    ],
    files: [
      {
        id: 1,
        name: 'wireframe_v1.pdf',
        size: '2.4 MB',
        date: '2023-06-02',
        type: 'document',
      },
      {
        id: 2,
        name: 'homepage_design.fig',
        size: '5.1 MB',
        date: '2023-06-04',
        type: 'design',
      },
      {
        id: 3,
        name: 'catalog_pages.fig',
        size: '4.8 MB',
        date: '2023-06-06',
        type: 'design',
      },
      {
        id: 4,
        name: 'feedback_client.docx',
        size: '1.2 MB',
        date: '2023-06-06',
        type: 'document',
      },
    ],
    clientInfo: {
      name: 'PT Maju Bersama',
      contactPerson: 'Budi Santoso',
      email: 'budi@majubersama.com',
      phone: '+62 812-3456-7890',
      image:
        'https://ui-avatars.com/api/?name=PT+Maju+Bersama&background=6366f1&color=fff',
    },
  });

  const [newTask, setNewTask] = useState({ title: '', dueDate: '' });
  const [newMessage, setNewMessage] = useState('');
  const [activeTab, setActiveTab] = useState('overview');

  // Add a new task
  const handleAddTask = () => {
    if (newTask.title && newTask.dueDate) {
      const updatedTasks = [
        ...project.tasks,
        {
          id: project.tasks.length + 1,
          title: newTask.title,
          status: 'pending',
          dueDate: newTask.dueDate,
        },
      ];

      setProject({ ...project, tasks: updatedTasks });
      setNewTask({ title: '', dueDate: '' });
    }
  };

  // Send a new message
  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const updatedMessages = [
        ...project.messages,
        {
          id: project.messages.length + 1,
          sender: 'You',
          content: newMessage,
          date: new Date().toISOString(),
        },
      ];

      setProject({ ...project, messages: updatedMessages });
      setNewMessage('');
    }
  };

  // Update task status
  const updateTaskStatus = (taskId, newStatus) => {
    const updatedTasks = project.tasks.map(task =>
      task.id === taskId ? { ...task, status: newStatus } : task
    );

    setProject({ ...project, tasks: updatedTasks });
  };

  // Format date
  const formatDate = dateString => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('id-ID', options);
  };

  // Format time for messages
  const formatMessageTime = dateString => {
    const date = new Date(dateString);
    return (
      date.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) +
      ' - ' +
      date.toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      })
    );
  };

  return (
    <FreelancerLayout
      title='Detail Proyek'
      subtitle='Kelola proyek dan pantau progres'
    >
      {/* Project Header */}
      <div className='bg-white rounded-xl shadow-sm mb-6'>
        <div className='p-6'>
          <div className='flex flex-col md:flex-row md:items-center md:justify-between'>
            <div className='flex items-center mb-4 md:mb-0'>
              <img
                src={project.clientInfo.image}
                alt={project.client}
                className='h-12 w-12 rounded-full mr-4'
              />
              <div>
                <h1 className='text-xl font-bold text-gray-900'>
                  {project.title}
                </h1>
                <p className='text-sm text-gray-600'>{project.client}</p>
              </div>
            </div>
            <div className='flex items-center space-x-3'>
              <span
                className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                  project.status === 'completed'
                    ? 'bg-green-100 text-green-800'
                    : project.status === 'in-progress'
                      ? 'bg-blue-100 text-blue-800'
                      : project.status === 'pending'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-gray-100 text-gray-800'
                }`}
              >
                {project.status === 'completed'
                  ? 'Selesai'
                  : project.status === 'in-progress'
                    ? 'Sedang Berjalan'
                    : project.status === 'pending'
                      ? 'Tertunda'
                      : project.status}
              </span>
              <div className='flex space-x-2'>
                <button className='inline-flex items-center justify-center p-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'>
                  <svg
                    className='h-5 w-5'
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z'
                    />
                  </svg>
                </button>
                <button className='inline-flex items-center justify-center p-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'>
                  <svg
                    className='h-5 w-5'
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z'
                    />
                  </svg>
                </button>
                <button className='inline-flex items-center justify-center p-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'>
                  <svg
                    className='h-5 w-5'
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z'
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Project Stats */}
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6'>
        <div className='bg-white rounded-xl shadow-sm p-6'>
          <h3 className='text-sm font-medium text-gray-500 mb-1'>Deadline</h3>
          <p className='text-lg font-bold text-gray-800'>
            {formatDate(project.deadline)}
          </p>
          <div className='mt-2 text-sm text-gray-600'>
            <span>Mulai: {formatDate(project.startDate)}</span>
          </div>
        </div>

        <div className='bg-white rounded-xl shadow-sm p-6'>
          <h3 className='text-sm font-medium text-gray-500 mb-1'>
            Total Anggaran
          </h3>
          <p className='text-lg font-bold text-gray-800'>{project.budget}</p>
          <div className='mt-2 text-sm text-gray-600'>
            <span className='text-green-600'>Dibayar: {project.paid}</span>
          </div>
        </div>

        <div className='bg-white rounded-xl shadow-sm p-6'>
          <h3 className='text-sm font-medium text-gray-500 mb-1'>
            Sisa Pembayaran
          </h3>
          <p className='text-lg font-bold text-gray-800'>{project.remaining}</p>
          <div className='mt-2 text-sm text-gray-600'>
            <span>Pending: 2 milestone</span>
          </div>
        </div>

        <div className='bg-white rounded-xl shadow-sm p-6'>
          <h3 className='text-sm font-medium text-gray-500 mb-1'>Progress</h3>
          <p className='text-lg font-bold text-gray-800'>{project.progress}%</p>
          <div className='mt-2 w-full bg-gray-200 rounded-full h-2'>
            <div
              className='bg-indigo-600 h-2 rounded-full'
              style={{ width: `${project.progress}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Project Tabs */}
      <div className='bg-white rounded-xl shadow-sm overflow-hidden mb-6'>
        <div className='border-b border-gray-200'>
          <nav className='flex -mb-px'>
            <button
              onClick={() => setActiveTab('overview')}
              className={`py-4 px-6 text-sm font-medium ${
                activeTab === 'overview'
                  ? 'border-b-2 border-indigo-500 text-indigo-600'
                  : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Ikhtisar
            </button>
            <button
              onClick={() => setActiveTab('tasks')}
              className={`py-4 px-6 text-sm font-medium ${
                activeTab === 'tasks'
                  ? 'border-b-2 border-indigo-500 text-indigo-600'
                  : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Tugas
            </button>
            <button
              onClick={() => setActiveTab('milestones')}
              className={`py-4 px-6 text-sm font-medium ${
                activeTab === 'milestones'
                  ? 'border-b-2 border-indigo-500 text-indigo-600'
                  : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Milestone
            </button>
            <button
              onClick={() => setActiveTab('messages')}
              className={`py-4 px-6 text-sm font-medium ${
                activeTab === 'messages'
                  ? 'border-b-2 border-indigo-500 text-indigo-600'
                  : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Pesan
            </button>
            <button
              onClick={() => setActiveTab('files')}
              className={`py-4 px-6 text-sm font-medium ${
                activeTab === 'files'
                  ? 'border-b-2 border-indigo-500 text-indigo-600'
                  : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              File
            </button>
            <button
              onClick={() => setActiveTab('client')}
              className={`py-4 px-6 text-sm font-medium ${
                activeTab === 'client'
                  ? 'border-b-2 border-indigo-500 text-indigo-600'
                  : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Klien
            </button>
          </nav>
        </div>

        {/* Tab Content */}
        <div className='p-6'>
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div>
              <h3 className='text-lg font-medium text-gray-900 mb-4'>
                Deskripsi Proyek
              </h3>
              <p className='text-gray-700 mb-6'>{project.description}</p>

              <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                <div>
                  <h4 className='text-md font-medium text-gray-900 mb-3'>
                    Tugas Terbaru
                  </h4>
                  <div className='bg-gray-50 rounded-lg p-4'>
                    {project.tasks.slice(0, 3).map(task => (
                      <div key={task.id} className='mb-3 last:mb-0'>
                        <div className='flex items-center'>
                          <div
                            className={`h-4 w-4 rounded-full mr-3 ${
                              task.status === 'completed'
                                ? 'bg-green-500'
                                : task.status === 'in-progress'
                                  ? 'bg-blue-500'
                                  : 'bg-gray-300'
                            }`}
                          ></div>
                          <span className='text-sm font-medium text-gray-900'>
                            {task.title}
                          </span>
                          <span className='ml-auto text-xs text-gray-500'>
                            {formatDate(task.dueDate)}
                          </span>
                        </div>
                      </div>
                    ))}
                    <button
                      onClick={() => setActiveTab('tasks')}
                      className='mt-2 text-sm text-indigo-600 hover:text-indigo-500'
                    >
                      Lihat semua tugas
                    </button>
                  </div>
                </div>

                <div>
                  <h4 className='text-md font-medium text-gray-900 mb-3'>
                    Milestone Terbaru
                  </h4>
                  <div className='bg-gray-50 rounded-lg p-4'>
                    {project.milestones.slice(0, 3).map(milestone => (
                      <div key={milestone.id} className='mb-3 last:mb-0'>
                        <div className='flex items-center'>
                          <div
                            className={`h-4 w-4 rounded-full mr-3 ${
                              milestone.status === 'completed'
                                ? 'bg-green-500'
                                : 'bg-gray-300'
                            }`}
                          ></div>
                          <span className='text-sm font-medium text-gray-900'>
                            {milestone.title}
                          </span>
                          <span className='ml-auto text-xs text-gray-500'>
                            {formatDate(milestone.date)}
                          </span>
                        </div>
                      </div>
                    ))}
                    <button
                      onClick={() => setActiveTab('milestones')}
                      className='mt-2 text-sm text-indigo-600 hover:text-indigo-500'
                    >
                      Lihat semua milestone
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Tasks Tab */}
          {activeTab === 'tasks' && (
            <div>
              <div className='flex justify-between items-center mb-4'>
                <h3 className='text-lg font-medium text-gray-900'>
                  Daftar Tugas
                </h3>
                <button
                  type='button'
                  className='inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                  onClick={() =>
                    document
                      .getElementById('add-task-form')
                      .classList.toggle('hidden')
                  }
                >
                  <svg
                    className='h-4 w-4 mr-2'
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M12 6v6m0 0v6m0-6h6m-6 0H6'
                    />
                  </svg>
                  Tambah Tugas
                </button>
              </div>

              {/* Add Task Form */}
              <div
                id='add-task-form'
                className='bg-gray-50 p-4 rounded-lg mb-6 hidden'
              >
                <div className='grid grid-cols-1 md:grid-cols-6 gap-4'>
                  <div className='md:col-span-4'>
                    <label
                      htmlFor='task-title'
                      className='block text-sm font-medium text-gray-700 mb-1'
                    >
                      Judul Tugas
                    </label>
                    <input
                      type='text'
                      id='task-title'
                      className='shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md'
                      placeholder='Masukkan judul tugas'
                      value={newTask.title}
                      onChange={e =>
                        setNewTask({ ...newTask, title: e.target.value })
                      }
                    />
                  </div>
                  <div className='md:col-span-2'>
                    <label
                      htmlFor='task-duedate'
                      className='block text-sm font-medium text-gray-700 mb-1'
                    >
                      Tenggat Waktu
                    </label>
                    <input
                      type='date'
                      id='task-duedate'
                      className='shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md'
                      value={newTask.dueDate}
                      onChange={e =>
                        setNewTask({ ...newTask, dueDate: e.target.value })
                      }
                    />
                  </div>
                </div>
                <div className='mt-4 flex justify-end'>
                  <button
                    type='button'
                    className='mr-3 inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                    onClick={() =>
                      document
                        .getElementById('add-task-form')
                        .classList.add('hidden')
                    }
                  >
                    Batal
                  </button>
                  <button
                    type='button'
                    className='inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                    onClick={handleAddTask}
                  >
                    Simpan
                  </button>
                </div>
              </div>

              {/* Tasks List */}
              <div className='bg-white shadow overflow-hidden rounded-md'>
                <ul className='divide-y divide-gray-200'>
                  {project.tasks.map(task => (
                    <li key={task.id} className='px-6 py-4'>
                      <div className='flex items-center'>
                        <div className='min-w-0 flex-1'>
                          <div className='flex items-center'>
                            <div
                              className={`h-4 w-4 rounded-full mr-3 ${
                                task.status === 'completed'
                                  ? 'bg-green-500'
                                  : task.status === 'in-progress'
                                    ? 'bg-blue-500'
                                    : 'bg-gray-300'
                              }`}
                            ></div>
                            <p className='text-sm font-medium text-gray-900 truncate'>
                              {task.title}
                            </p>
                          </div>
                          <div className='mt-2 flex items-center text-xs text-gray-500'>
                            <span>Tenggat: {formatDate(task.dueDate)}</span>
                            <span className='mx-2'>•</span>
                            <span
                              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                task.status === 'completed'
                                  ? 'bg-green-100 text-green-800'
                                  : task.status === 'in-progress'
                                    ? 'bg-blue-100 text-blue-800'
                                    : 'bg-gray-100 text-gray-800'
                              }`}
                            >
                              {task.status === 'completed'
                                ? 'Selesai'
                                : task.status === 'in-progress'
                                  ? 'Dalam Proses'
                                  : 'Tertunda'}
                            </span>
                          </div>
                        </div>
                        <div className='ml-4 flex-shrink-0'>
                          <div className='flex space-x-2'>
                            {task.status !== 'completed' && (
                              <button
                                onClick={() =>
                                  updateTaskStatus(task.id, 'completed')
                                }
                                className='inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-green-700 bg-green-100 hover:bg-green-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500'
                              >
                                Selesai
                              </button>
                            )}

                            {task.status === 'pending' && (
                              <button
                                onClick={() =>
                                  updateTaskStatus(task.id, 'in-progress')
                                }
                                className='inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
                              >
                                Kerjakan
                              </button>
                            )}

                            <button className='inline-flex items-center p-1.5 border border-gray-300 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'>
                              <svg
                                className='h-4 w-4'
                                xmlns='http://www.w3.org/2000/svg'
                                fill='none'
                                viewBox='0 0 24 24'
                                stroke='currentColor'
                              >
                                <path
                                  strokeLinecap='round'
                                  strokeLinejoin='round'
                                  strokeWidth={2}
                                  d='M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z'
                                />
                              </svg>
                            </button>

                            <button className='inline-flex items-center p-1.5 border border-gray-300 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'>
                              <svg
                                className='h-4 w-4'
                                xmlns='http://www.w3.org/2000/svg'
                                fill='none'
                                viewBox='0 0 24 24'
                                stroke='currentColor'
                              >
                                <path
                                  strokeLinecap='round'
                                  strokeLinejoin='round'
                                  strokeWidth={2}
                                  d='M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16'
                                />
                              </svg>
                            </button>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* Milestones Tab */}
          {activeTab === 'milestones' && (
            <div>
              <div className='flex justify-between items-center mb-4'>
                <h3 className='text-lg font-medium text-gray-900'>
                  Milestone Proyek
                </h3>
                <button
                  type='button'
                  className='inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                >
                  <svg
                    className='h-4 w-4 mr-2'
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M12 6v6m0 0v6m0-6h6m-6 0H6'
                    />
                  </svg>
                  Tambah Milestone
                </button>
              </div>

              {/* Milestones List */}
              <div className='bg-white shadow overflow-hidden rounded-md'>
                <ul className='divide-y divide-gray-200'>
                  {project.milestones.map(milestone => (
                    <li key={milestone.id} className='px-6 py-4'>
                      <div className='flex items-center'>
                        <div className='min-w-0 flex-1'>
                          <div className='flex items-center'>
                            <div
                              className={`h-4 w-4 rounded-full mr-3 ${
                                milestone.status === 'completed'
                                  ? 'bg-green-500'
                                  : 'bg-gray-300'
                              }`}
                            ></div>
                            <p className='text-sm font-medium text-gray-900 truncate'>
                              {milestone.title}
                            </p>
                          </div>
                          <div className='mt-2 flex items-center text-xs text-gray-500'>
                            <span>Tenggat: {formatDate(milestone.date)}</span>
                            <span className='mx-2'>•</span>
                            <span
                              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                milestone.status === 'completed'
                                  ? 'bg-green-100 text-green-800'
                                  : 'bg-gray-100 text-gray-800'
                              }`}
                            >
                              {milestone.status === 'completed'
                                ? 'Selesai'
                                : 'Tertunda'}
                            </span>
                          </div>
                        </div>
                        <div className='ml-4 flex-shrink-0 text-right'>
                          <p className='text-sm font-medium text-gray-900'>
                            {milestone.amount}
                          </p>
                          <div className='mt-2 flex space-x-2 justify-end'>
                            {milestone.status !== 'completed' && (
                              <button className='inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-green-700 bg-green-100 hover:bg-green-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500'>
                                Tandai Selesai
                              </button>
                            )}

                            <button className='inline-flex items-center p-1.5 border border-gray-300 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'>
                              <svg
                                className='h-4 w-4'
                                xmlns='http://www.w3.org/2000/svg'
                                fill='none'
                                viewBox='0 0 24 24'
                                stroke='currentColor'
                              >
                                <path
                                  strokeLinecap='round'
                                  strokeLinejoin='round'
                                  strokeWidth={2}
                                  d='M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z'
                                />
                              </svg>
                            </button>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* Messages Tab */}
          {activeTab === 'messages' && (
            <div>
              <h3 className='text-lg font-medium text-gray-900 mb-4'>
                Pesan Proyek
              </h3>

              {/* Messages List */}
              <div className='bg-gray-50 rounded-lg p-4 mb-4 h-80 overflow-y-auto'>
                {project.messages.map(message => (
                  <div
                    key={message.id}
                    className={`mb-4 flex ${message.sender === 'You' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[75%] rounded-lg p-3 ${
                        message.sender === 'You'
                          ? 'bg-indigo-100 text-indigo-900'
                          : 'bg-white text-gray-900 border border-gray-200'
                      }`}
                    >
                      <p className='text-sm'>{message.content}</p>
                      <p className='text-xs text-gray-500 mt-1'>
                        {formatMessageTime(message.date)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Message Input */}
              <div className='flex'>
                <input
                  type='text'
                  className='shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md'
                  placeholder='Ketik pesan Anda...'
                  value={newMessage}
                  onChange={e => setNewMessage(e.target.value)}
                  onKeyPress={e => e.key === 'Enter' && handleSendMessage()}
                />
                <button
                  type='button'
                  className='ml-3 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                  onClick={handleSendMessage}
                >
                  Kirim
                </button>
              </div>
            </div>
          )}

          {/* Files Tab */}
          {activeTab === 'files' && (
            <div>
              <div className='flex justify-between items-center mb-4'>
                <h3 className='text-lg font-medium text-gray-900'>
                  File Proyek
                </h3>
                <button
                  type='button'
                  className='inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                >
                  <svg
                    className='h-4 w-4 mr-2'
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12'
                    />
                  </svg>
                  Unggah File
                </button>
              </div>

              {/* Files List */}
              <div className='bg-white shadow overflow-hidden rounded-md'>
                <ul className='divide-y divide-gray-200'>
                  {project.files.map(file => (
                    <li key={file.id} className='px-6 py-4'>
                      <div className='flex items-center'>
                        <div className='flex-shrink-0'>
                          <svg
                            className={`h-10 w-10 ${
                              file.type === 'design'
                                ? 'text-purple-500'
                                : file.type === 'document'
                                  ? 'text-blue-500'
                                  : 'text-gray-500'
                            }`}
                            xmlns='http://www.w3.org/2000/svg'
                            fill='none'
                            viewBox='0 0 24 24'
                            stroke='currentColor'
                          >
                            {file.type === 'design' ? (
                              <path
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                strokeWidth={2}
                                d='M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z'
                              />
                            ) : (
                              <path
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                strokeWidth={2}
                                d='M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z'
                              />
                            )}
                          </svg>
                        </div>
                        <div className='ml-4'>
                          <p className='text-sm font-medium text-indigo-600 hover:text-indigo-500 cursor-pointer'>
                            {file.name}
                          </p>
                          <p className='text-xs text-gray-500'>
                            {file.size} • Diunggah pada {formatDate(file.date)}
                          </p>
                        </div>
                        <div className='ml-auto flex'>
                          <button className='p-1.5 text-gray-500 hover:text-gray-700 hover:bg-gray-50 rounded-full'>
                            <svg
                              className='h-5 w-5'
                              xmlns='http://www.w3.org/2000/svg'
                              fill='none'
                              viewBox='0 0 24 24'
                              stroke='currentColor'
                            >
                              <path
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                strokeWidth={2}
                                d='M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4'
                              />
                            </svg>
                          </button>
                          <button className='p-1.5 text-gray-500 hover:text-gray-700 hover:bg-gray-50 rounded-full ml-1'>
                            <svg
                              className='h-5 w-5'
                              xmlns='http://www.w3.org/2000/svg'
                              fill='none'
                              viewBox='0 0 24 24'
                              stroke='currentColor'
                            >
                              <path
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                strokeWidth={2}
                                d='M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16'
                              />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* Client Tab */}
          {activeTab === 'client' && (
            <div>
              <h3 className='text-lg font-medium text-gray-900 mb-4'>
                Informasi Klien
              </h3>

              <div className='bg-white rounded-lg shadow p-6'>
                <div className='flex items-center mb-6'>
                  <img
                    src={project.clientInfo.image}
                    alt={project.clientInfo.name}
                    className='h-16 w-16 rounded-full mr-4'
                  />
                  <div>
                    <h4 className='text-lg font-medium text-gray-900'>
                      {project.clientInfo.name}
                    </h4>
                    <p className='text-sm text-gray-500'>
                      Contact Person: {project.clientInfo.contactPerson}
                    </p>
                  </div>
                </div>

                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                  <div className='space-y-2'>
                    <div className='flex items-start'>
                      <svg
                        className='mt-0.5 h-5 w-5 text-gray-400 mr-2'
                        xmlns='http://www.w3.org/2000/svg'
                        fill='none'
                        viewBox='0 0 24 24'
                        stroke='currentColor'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth={2}
                          d='M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z'
                        />
                      </svg>
                      <div>
                        <p className='text-sm font-medium text-gray-900'>
                          Email
                        </p>
                        <p className='text-sm text-gray-500'>
                          {project.clientInfo.email}
                        </p>
                      </div>
                    </div>
                    <div className='flex items-start'>
                      <svg
                        className='mt-0.5 h-5 w-5 text-gray-400 mr-2'
                        xmlns='http://www.w3.org/2000/svg'
                        fill='none'
                        viewBox='0 0 24 24'
                        stroke='currentColor'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth={2}
                          d='M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z'
                        />
                      </svg>
                      <div>
                        <p className='text-sm font-medium text-gray-900'>
                          Telepon
                        </p>
                        <p className='text-sm text-gray-500'>
                          {project.clientInfo.phone}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <p className='text-sm font-medium text-gray-900 mb-2'>
                      Proyek Sebelumnya
                    </p>
                    <p className='text-sm text-gray-500 italic'>
                      Belum ada proyek sebelumnya dengan klien ini.
                    </p>
                  </div>
                </div>

                <div className='mt-6 flex justify-center space-x-4'>
                  <button className='inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'>
                    <svg
                      className='h-4 w-4 mr-2'
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 24 24'
                      stroke='currentColor'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z'
                      />
                    </svg>
                    Kirim Pesan
                  </button>
                  <button className='inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'>
                    <svg
                      className='h-4 w-4 mr-2'
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 24 24'
                      stroke='currentColor'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z'
                      />
                    </svg>
                    Email
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </FreelancerLayout>
  );
};

export default ProjectDetail;
