import React from 'react';
import { Head, usePage } from '@inertiajs/react';
import Navbar from '@/Components/Navbar';
import Footer from '@/Components/Footer';

// Mock data for a client profile
const clientData = {
  id: 101,
  name: 'Ahmad Fauzi',
  avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
  rating: 4.7,
  projectsPosted: 12,
  memberSince: 'April 2023',
  location: 'Jakarta, Indonesia',
  bio: 'Pemilik UMKM yang fokus pada produk kerajinan tangan lokal. Mencari talent untuk mengembangkan presence online.',
  skills: ['Manajemen Proyek', 'Digital Marketing', 'Entrepreneurship'],
  completedProjects: [
    {
      id: 1,
      title: 'Redesign Logo Brand UMKM',
      status: 'completed',
      date: '2023-12-15',
    },
    {
      id: 2,
      title: 'Pembuatan Konten Social Media',
      status: 'completed',
      date: '2024-01-10',
    },
  ],
  activeProjects: [
    {
      id: 3,
      title: 'Website E-commerce Produk UMKM',
      status: 'in-progress',
      date: '2024-05-20',
    }
  ]
};

const ProfileView = ({ id }) => {
  // In a real app, you would fetch client data based on the ID
  const client = clientData;
  const { auth } = usePage().props;
  
  return (
    <>
      <Head title={`MahaBisa | Profil ${client.name}`} />
      <div className="min-h-screen bg-slate-50 flex flex-col">
        <Navbar user={auth.user} />
        <div className="pt-16 pb-12 flex-grow">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
            {/* Breadcrumbs */}
            <nav className="text-sm text-slate-500 mb-6">
              <ol className="list-none p-0 inline-flex">
                <li className="flex items-center">
                  <a href="/" className="hover:text-indigo-500">Beranda</a>
                  <svg className="h-4 w-4 mx-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </li>
                <li>Profil Klien</li>
              </ol>
            </nav>
            
            {/* Profile Header */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden mb-8">
              <div className="p-6">
                <div className="flex flex-col md:flex-row md:items-center">
                  <img
                    src={client.avatar}
                    alt={client.name}
                    className="w-24 h-24 rounded-full border-4 border-white shadow-md"
                  />
                  <div className="mt-4 md:mt-0 md:ml-6">
                    <h1 className="text-2xl font-bold text-slate-900">{client.name}</h1>
                    <div className="flex items-center mt-1 text-slate-500">
                      <svg className="w-5 h-5 mr-1 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      {client.location}
                    </div>
                    <div className="flex items-center mt-1 text-slate-500">
                      <svg className="w-5 h-5 mr-1 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      Anggota sejak {client.memberSince}
                    </div>
                  </div>
                  <div className="mt-6 md:mt-0 md:ml-auto flex flex-col sm:flex-row gap-3">
                    <div className="flex items-center justify-center px-4 py-2 bg-slate-50 rounded-lg">
                      <div className="text-center">
                        <div className="text-sm text-slate-500">Rating</div>
                        <div className="font-bold text-slate-900 flex items-center justify-center mt-1">
                          {client.rating}
                          <svg className="w-4 h-4 text-yellow-400 ml-1" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.95-.69l1.07-3.292z" />
                          </svg>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-center px-4 py-2 bg-slate-50 rounded-lg">
                      <div className="text-center">
                        <div className="text-sm text-slate-500">Proyek</div>
                        <div className="font-bold text-slate-900 mt-1">{client.projectsPosted}</div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 pt-6 border-t border-slate-200">
                  <h2 className="text-lg font-semibold text-slate-900 mb-3">Tentang</h2>
                  <p className="text-slate-700">{client.bio}</p>
                </div>
                
                <div className="mt-6">
                  <h3 className="text-lg font-semibold text-slate-900 mb-3">Keahlian</h3>
                  <div className="flex flex-wrap gap-2">
                    {client.skills.map((skill, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-slate-100 text-slate-700 text-sm rounded-full"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Project Sections */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden mb-8">
              <div className="p-6">
                <h2 className="text-xl font-bold text-slate-900 mb-6">Proyek Aktif</h2>
                {client.activeProjects.length > 0 ? (
                  <div className="space-y-4">
                    {client.activeProjects.map(project => (
                      <div key={project.id} className="p-4 border border-slate-200 rounded-lg hover:border-indigo-200 transition-colors">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-medium text-slate-900">{project.title}</h3>
                            <div className="text-sm text-slate-500 mt-1">
                              {new Date(project.date).toLocaleDateString('id-ID', { 
                                year: 'numeric', 
                                month: 'long', 
                                day: 'numeric' 
                              })}
                            </div>
                          </div>
                          <span className="px-2.5 py-0.5 text-xs font-medium bg-blue-100 text-blue-700 rounded-full">
                            Sedang Dikerjakan
                          </span>
                        </div>
                        <div className="mt-2">
                          <a 
                            href={`/proyek/${project.id}`}
                            className="text-sm text-indigo-500 hover:text-indigo-600 font-medium inline-flex items-center"
                          >
                            Lihat Detail
                            <svg className="w-3 h-3 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-slate-500">Tidak ada proyek aktif saat ini.</p>
                )}
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
              <div className="p-6">
                <h2 className="text-xl font-bold text-slate-900 mb-6">Proyek Selesai</h2>
                {client.completedProjects.length > 0 ? (
                  <div className="space-y-4">
                    {client.completedProjects.map(project => (
                      <div key={project.id} className="p-4 border border-slate-200 rounded-lg hover:border-indigo-200 transition-colors">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-medium text-slate-900">{project.title}</h3>
                            <div className="text-sm text-slate-500 mt-1">
                              {new Date(project.date).toLocaleDateString('id-ID', { 
                                year: 'numeric', 
                                month: 'long', 
                                day: 'numeric' 
                              })}
                            </div>
                          </div>
                          <span className="px-2.5 py-0.5 text-xs font-medium bg-green-100 text-green-700 rounded-full">
                            Selesai
                          </span>
                        </div>
                        <div className="mt-2">
                          <a 
                            href={`/proyek/${project.id}`}
                            className="text-sm text-indigo-500 hover:text-indigo-600 font-medium inline-flex items-center"
                          >
                            Lihat Detail
                            <svg className="w-3 h-3 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-slate-500">Tidak ada proyek selesai.</p>
                )}
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default ProfileView;
