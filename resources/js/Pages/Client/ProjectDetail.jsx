import React, { useState } from 'react';
import { Link } from '@inertiajs/react';
import ClientLayout from './Components/ClientLayout';

const ProjectDetail = ({ id }) => {
  const [activeTab, setActiveTab] = useState('overview');
  
  // In a real app, you would fetch project data based on the ID
  // This is dummy data for demonstration
  const [project, setProject] = useState({
    id: id || 1,
    title: 'Pengembangan Website E-commerce',
    freelancer: 'Alex Suryanto',
    freelancerAvatar: 'https://ui-avatars.com/api/?name=Alex+Suryanto&background=8b5cf6&color=fff',
    status: 'ongoing',
    startDate: '2025-06-01',
    deadline: '2025-06-15',
    budget: 'Rp4.500.000',
    paid: 'Rp2.250.000',
    remaining: 'Rp2.250.000',
    progress: 65,
    description: 'Membutuhkan pengembangan website e-commerce dengan fitur-fitur modern seperti keranjang belanja, pembayaran online, dan sistem manajemen inventori.',
    skills: ['React', 'Laravel', 'MySQL', 'Tailwind CSS'],
    attachments: [
      { name: 'project_brief.pdf', size: '2.4 MB', url: '#' },
      { name: 'wireframes.jpg', size: '1.8 MB', url: '#' },
    ],
    tasks: [
      { id: 1, title: 'Desain Halaman Utama', status: 'completed', dueDate: '2025-06-05' },
      { id: 2, title: 'Implementasi Keranjang Belanja', status: 'in-progress', dueDate: '2025-06-10' },
      { id: 3, title: 'Integrasi Payment Gateway', status: 'pending', dueDate: '2025-06-12' },
      { id: 4, title: 'Testing & Quality Assurance', status: 'pending', dueDate: '2025-06-14' },
    ],
    messages: [
      { 
        id: 1, 
        sender: 'You', 
        content: 'Halo Alex, bagaimana progress untuk halaman checkout?', 
        date: '2025-06-05T10:30:00' 
      },
      { 
        id: 2, 
        sender: 'Alex Suryanto', 
        content: 'Halo, untuk halaman checkout sudah 80% selesai. Saya sudah mengintegrasikan dengan payment gateway dan sedang menyelesaikan tampilan responsifnya.', 
        date: '2025-06-05T11:15:00' 
      },
      { 
        id: 3, 
        sender: 'You', 
        content: 'Bagus! Apakah ada kendala yang dihadapi?', 
        date: '2025-06-05T11:20:00' 
      },
      { 
        id: 4, 
        sender: 'Alex Suryanto', 
        content: 'Sejauh ini lancar, hanya perlu sedikit penyesuaian untuk tampilan mobile. Saya akan kirimkan updatenya besok.', 
        date: '2025-06-05T11:25:00' 
      },
    ],
    milestones: [
      { 
        id: 1, 
        title: 'Persetujuan Desain', 
        description: 'Finalisasi wireframe dan desain UI',
        date: '2025-06-05', 
        status: 'completed',
        payment: 'Rp1.125.000'
      },
      { 
        id: 2, 
        title: 'Frontend Development', 
        description: 'Implementasi halaman utama dan katalog produk',
        date: '2025-06-08', 
        status: 'completed',
        payment: 'Rp1.125.000'
      },
      { 
        id: 3, 
        title: 'Backend Integration', 
        description: 'Integrasi dengan database dan payment gateway',
        date: '2025-06-12', 
        status: 'in-progress',
        payment: 'Rp1.125.000'
      },
      { 
        id: 4, 
        title: 'Final Delivery', 
        description: 'Testing, deployment, dan dokumentasi',
        date: '2025-06-15', 
        status: 'pending',
        payment: 'Rp1.125.000'
      },
    ],
    freelancerDetails: {
      name: 'Alex Suryanto',
      title: 'Full Stack Web Developer',
      avatar: 'https://ui-avatars.com/api/?name=Alex+Suryanto&background=8b5cf6&color=fff',
      rating: 4.9,
      completedProjects: 38,
      onTime: '98%',
      responseTime: 'Dalam 2 jam',
      email: 'alex.suryanto@gmail.com',
      phone: '+62812-3456-7890',
    }
  });

  // Format message time for display
  const formatMessageTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  // Format date for display
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('id-ID', options);
  };

  // Helper function to get status badge classes
  const getStatusBadge = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'in-progress':
        return 'bg-blue-100 text-blue-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'ongoing':
        return 'Sedang Berjalan';
      case 'completed':
        return 'Selesai';
      case 'in-progress':
        return 'Dalam Pengerjaan';
      case 'pending':
        return 'Menunggu';
      default:
        return status;
    }
  };

  // Handle sending a new message
  const [newMessage, setNewMessage] = useState('');
  const handleSendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim() === '') return;
    
    const message = {
      id: project.messages.length + 1,
      sender: 'You',
      content: newMessage,
      date: new Date().toISOString(),
    };
    
    setProject({
      ...project,
      messages: [...project.messages, message],
    });
    
    setNewMessage('');
  };

  return (
    <ClientLayout
      title="Detail Proyek"
      subtitle="Lihat dan kelola detail proyek Anda"
    >
      {/* Project Header */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-6">
        <div className="p-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
            <h1 className="text-2xl font-semibold text-gray-900 mb-2 sm:mb-0">{project.title}</h1>
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
              project.status === 'ongoing' 
                ? 'bg-blue-100 text-blue-800' 
                : project.status === 'completed'
                ? 'bg-green-100 text-green-800'
                : 'bg-yellow-100 text-yellow-800'
            }`}>
              {getStatusText(project.status)}
            </span>
          </div>
          
          <div className="flex flex-col sm:flex-row sm:items-center text-sm text-gray-500 mb-6">
            <div className="flex items-center mb-2 sm:mb-0 sm:mr-6">
              <svg className="h-5 w-5 mr-1 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span>Deadline: {project.deadline}</span>
            </div>
            <div className="flex items-center mb-2 sm:mb-0 sm:mr-6">
              <svg className="h-5 w-5 mr-1 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Budget: {project.budget}</span>
            </div>
            <div className="flex items-center">
              <svg className="h-5 w-5 mr-1 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <span>Freelancer: {project.freelancer}</span>
            </div>
          </div>
          
          <div className="mt-2">
            <div className="text-sm text-gray-500 mb-1">Progress: {project.progress}%</div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div 
                className="bg-indigo-600 h-2.5 rounded-full" 
                style={{ width: `${project.progress}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* Project Tabs */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-6">
        <div className="border-b border-gray-200">
          <nav className="flex -mb-px">
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
              onClick={() => setActiveTab('payments')}
              className={`py-4 px-6 text-sm font-medium ${
                activeTab === 'payments'
                  ? 'border-b-2 border-indigo-500 text-indigo-600'
                  : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Pembayaran
            </button>
            <button
              onClick={() => setActiveTab('freelancer')}
              className={`py-4 px-6 text-sm font-medium ${
                activeTab === 'freelancer'
                  ? 'border-b-2 border-indigo-500 text-indigo-600'
                  : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Freelancer
            </button>
          </nav>
        </div>
        
        <div className="p-6">
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Deskripsi Proyek</h3>
              <p className="text-gray-600 mb-6">{project.description}</p>
              
              <h3 className="text-lg font-medium text-gray-900 mb-4">Keahlian yang Dibutuhkan</h3>
              <div className="flex flex-wrap gap-2 mb-6">
                {project.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800"
                  >
                    {skill}
                  </span>
                ))}
              </div>
              
              <h3 className="text-lg font-medium text-gray-900 mb-4">Lampiran</h3>
              {project.attachments.length > 0 ? (
                <ul className="border border-gray-200 rounded-md divide-y divide-gray-200 mb-6">
                  {project.attachments.map((attachment, index) => (
                    <li key={index} className="pl-3 pr-4 py-3 flex items-center justify-between text-sm">
                      <div className="w-0 flex-1 flex items-center">
                        <svg className="flex-shrink-0 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M8 4a3 3 0 00-3 3v4a5 5 0 0010 0V7a1 1 0 112 0v4a7 7 0 11-14 0V7a5 5 0 0110 0v4a3 3 0 11-6 0V7a1 1 0 012 0v4a1 1 0 102 0V7a3 3 0 00-3-3z" clipRule="evenodd" />
                        </svg>
                        <span className="ml-2 flex-1 w-0 truncate">
                          {attachment.name}
                        </span>
                      </div>
                      <div className="ml-4 flex-shrink-0 flex items-center space-x-4">
                        <span className="text-gray-500">{attachment.size}</span>
                        <a href={attachment.url} className="font-medium text-indigo-600 hover:text-indigo-500">
                          Download
                        </a>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500 mb-6">Tidak ada lampiran</p>
              )}
              
              <div className="mt-8 flex justify-end">
                <Link
                  href={`/client/projects/${project.id}/edit`}
                  className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <svg className="-ml-1 mr-2 h-5 w-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M13.586 3.586a2 2 0 112.828 2.828l-10 10a2 2 0 01-.707.707l-3 1a1 1 0 01-1.276-1.276l1-3a2 2 0 01.707-.707l10-10z" />
                  </svg>
                  Edit Proyek
                </Link>
              </div>
            </div>
          )}
          
          {/* Tasks Tab */}
          {activeTab === 'tasks' && (
            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-900">Daftar Tugas</h3>
                {/* Add Task button would go here in a full implementation */}
              </div>
              
              <div className="overflow-hidden border border-gray-200 rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Nama Tugas
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Deadline
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {project.tasks.map((task) => (
                      <tr key={task.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {task.title}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadge(task.status)}`}>
                            {getStatusText(task.status)}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {task.dueDate}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
          
          {/* Messages Tab */}
          {activeTab === 'messages' && (
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Pesan Proyek</h3>
              
              {/* Messages List */}
              <div className="bg-gray-50 rounded-lg p-4 mb-4 h-80 overflow-y-auto">
                {project.messages.map((message) => (
                  <div key={message.id} className={`mb-4 flex ${message.sender === 'You' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[75%] rounded-lg p-3 ${
                      message.sender === 'You' ? 'bg-indigo-100 text-indigo-900' : 'bg-white text-gray-900 border border-gray-200'
                    }`}>
                      <p className="text-sm">{message.content}</p>
                      <p className="text-xs text-gray-500 mt-1">{formatMessageTime(message.date)}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Message Input */}
              <form onSubmit={handleSendMessage} className="mt-4">
                <div className="flex">
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    className="flex-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full rounded-l-md sm:text-sm border-gray-300"
                    placeholder="Tulis pesan Anda..."
                  />
                  <button
                    type="submit"
                    className="inline-flex items-center px-4 py-2 border border-transparent rounded-r-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                  </button>
                </div>
              </form>
            </div>
          )}
          
          {/* Payments Tab */}
          {activeTab === 'payments' && (
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Pembayaran & Milestone</h3>
              
              <div className="bg-gray-50 p-4 rounded-lg mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white p-4 rounded shadow-sm">
                  <p className="text-sm text-gray-500 mb-1">Total Budget</p>
                  <p className="text-lg font-semibold text-gray-900">{project.budget}</p>
                </div>
                <div className="bg-white p-4 rounded shadow-sm">
                  <p className="text-sm text-gray-500 mb-1">Sudah Dibayar</p>
                  <p className="text-lg font-semibold text-green-600">{project.paid}</p>
                </div>
                <div className="bg-white p-4 rounded shadow-sm">
                  <p className="text-sm text-gray-500 mb-1">Sisa Pembayaran</p>
                  <p className="text-lg font-semibold text-gray-900">{project.remaining}</p>
                </div>
              </div>
              
              <h4 className="text-md font-medium text-gray-700 mb-3">Milestone Proyek</h4>
              <div className="overflow-hidden border border-gray-200 rounded-lg mb-6">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Milestone
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Tanggal
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Pembayaran
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Aksi
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {project.milestones.map((milestone) => (
                      <tr key={milestone.id}>
                        <td className="px-6 py-4 text-sm">
                          <div className="font-medium text-gray-900">{milestone.title}</div>
                          <div className="text-gray-500">{milestone.description}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {milestone.date}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadge(milestone.status)}`}>
                            {getStatusText(milestone.status)}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {milestone.payment}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-right">
                          {milestone.status === 'in-progress' && (
                            <button className="text-indigo-600 hover:text-indigo-900 font-medium">
                              Bayar
                            </button>
                          )}
                          {milestone.status === 'pending' && (
                            <span className="text-gray-400">Menunggu</span>
                          )}
                          {milestone.status === 'completed' && (
                            <span className="text-green-600">Selesai</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
          
          {/* Freelancer Tab */}
          {activeTab === 'freelancer' && (
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Informasi Freelancer</h3>
              
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex flex-col sm:flex-row items-center sm:items-start mb-6">
                  <img
                    src={project.freelancerDetails.avatar}
                    alt={project.freelancerDetails.name}
                    className="h-20 w-20 rounded-full mb-4 sm:mb-0 sm:mr-6"
                  />
                  <div>
                    <h4 className="text-xl font-medium text-gray-900">{project.freelancerDetails.name}</h4>
                    <p className="text-gray-500">{project.freelancerDetails.title}</p>
                    
                    <div className="mt-3 flex items-center">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <svg
                            key={i}
                            className={`h-5 w-5 ${
                              i < Math.floor(project.freelancerDetails.rating)
                                ? 'text-yellow-400'
                                : 'text-gray-300'
                            }`}
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z" />
                          </svg>
                        ))}
                        <span className="ml-2 text-gray-600">{project.freelancerDetails.rating}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h5 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-3">Statistik</h5>
                    <dl className="grid grid-cols-1 gap-x-4 gap-y-6">
                      <div className="sm:col-span-1">
                        <dt className="text-sm font-medium text-gray-500">Proyek Selesai</dt>
                        <dd className="mt-1 text-sm text-gray-900">{project.freelancerDetails.completedProjects}</dd>
                      </div>
                      <div className="sm:col-span-1">
                        <dt className="text-sm font-medium text-gray-500">Tepat Waktu</dt>
                        <dd className="mt-1 text-sm text-gray-900">{project.freelancerDetails.onTime}</dd>
                      </div>
                      <div className="sm:col-span-1">
                        <dt className="text-sm font-medium text-gray-500">Waktu Respon</dt>
                        <dd className="mt-1 text-sm text-gray-900">{project.freelancerDetails.responseTime}</dd>
                      </div>
                    </dl>
                  </div>
                  
                  <div>
                    <h5 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-3">Kontak</h5>
                    <dl className="grid grid-cols-1 gap-x-4 gap-y-6">
                      <div className="sm:col-span-1">
                        <dt className="text-sm font-medium text-gray-500">Email</dt>
                        <dd className="mt-1 text-sm text-gray-900">{project.freelancerDetails.email}</dd>
                      </div>
                      <div className="sm:col-span-1">
                        <dt className="text-sm font-medium text-gray-500">Telepon</dt>
                        <dd className="mt-1 text-sm text-gray-900">{project.freelancerDetails.phone}</dd>
                      </div>
                    </dl>
                  </div>
                </div>
                
                <div className="mt-6 flex justify-center sm:justify-start space-x-3">
                  <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    <svg className="h-4 w-4 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                    Kirim Pesan
                  </button>
                  <Link
                    href="/client/reviews/create"
                    className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    <svg className="h-4 w-4 mr-2 text-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z" />
                    </svg>
                    Beri Ulasan
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </ClientLayout>
  );
};

export default ProjectDetail;
