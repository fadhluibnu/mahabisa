import React, { useState } from 'react';
import FreelancerLayout from './Components/FreelancerLayout';
import SkillsCard from './Components/SkillsCard';
import { Link } from '@inertiajs/react'

const Profile = () => {
  const [activeTab, setActiveTab] = useState('personal');

  // Dummy profile data
  const profile = {
    personal: {
      name: 'Alex Suryanto',
      title: 'Full Stack Web Developer',
      email: 'alex.suryanto@gmail.com',
      phone: '+62 812-3456-7890',
      location: 'Jakarta, Indonesia',
      bio: 'Saya adalah seorang Full Stack Web Developer dengan pengalaman lebih dari 5 tahun dalam mengembangkan aplikasi web yang scalable dan user-friendly. Keahlian utama saya meliputi React, Laravel, dan Node.js.',
      imageUrl: 'https://ui-avatars.com/api/?name=Alex+Suryanto&background=8b5cf6&color=fff&size=200',
      socialMedia: {
        website: 'https://alexsuryanto.dev',
        github: 'https://github.com/alexsuryanto',
        linkedin: 'https://linkedin.com/in/alexsuryanto',
        twitter: 'https://twitter.com/alexsuryanto',
      },
    },
    skills: [
      { name: 'React.js', level: 90 },
      { name: 'Laravel', level: 85 },
      { name: 'Node.js', level: 80 },
      { name: 'JavaScript', level: 90 },
      { name: 'PHP', level: 85 },
      { name: 'HTML/CSS', level: 95 },
      { name: 'UI/UX Design', level: 75 },
      { name: 'RESTful API', level: 85 },
      { name: 'Database Design', level: 80 },
      { name: 'Git', level: 85 },
    ],
    education: [
      {
        school: 'Universitas Indonesia',
        degree: 'S1 Teknik Informatika',
        year: '2014 - 2018',
        description: 'Lulus dengan IPK 3.8. Fokus pada pengembangan web dan mobile.',
      },
      {
        school: 'SMKN 1 Jakarta',
        degree: 'Rekayasa Perangkat Lunak',
        year: '2011 - 2014',
        description: 'Juara 1 lomba pemrograman tingkat provinsi.',
      },
    ],
    experience: [
      {
        company: 'PT Teknologi Maju',
        position: 'Senior Web Developer',
        year: '2020 - Sekarang',
        description: 'Mengembangkan dan memelihara aplikasi web enterprise menggunakan React dan Laravel. Memimpin tim pengembangan frontend yang terdiri dari 5 orang.',
      },
      {
        company: 'StartUp Digital',
        position: 'Full Stack Developer',
        year: '2018 - 2020',
        description: 'Mengembangkan aplikasi web e-commerce dari awal hingga peluncuran. Implementasi fitur pembayaran, manajemen produk, dan analitik.',
      },
      {
        company: 'CV Kreasi Digital',
        position: 'Junior Web Developer',
        year: '2017 - 2018',
        description: 'Magang selama kuliah. Membantu pengembangan website untuk klien dengan fokus pada front-end.',
      },
    ],
    portfolio: [
      {
        title: 'E-commerce Platform',
        description: 'Platform e-commerce lengkap dengan manajemen produk, keranjang belanja, pembayaran, dan analitik.',
        technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
        image: 'https://via.placeholder.com/300x200/6366f1/ffffff?text=E-commerce',
      },
      {
        title: 'CRM System',
        description: 'Sistem manajemen hubungan pelanggan untuk bisnis kecil dan menengah.',
        technologies: ['Laravel', 'Vue.js', 'MySQL', 'AWS'],
        image: 'https://via.placeholder.com/300x200/8b5cf6/ffffff?text=CRM+System',
      },
      {
        title: 'Learning Management System',
        description: 'Platform pembelajaran online dengan fitur kursus, video streaming, dan manajemen konten.',
        technologies: ['React', 'Firebase', 'Node.js', 'Express'],
        image: 'https://via.placeholder.com/300x200/ec4899/ffffff?text=LMS',
      },
    ],
  };

  return (
    <FreelancerLayout
      title="Profil"
      subtitle="Kelola informasi profil dan keahlian Anda"
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="p-6 flex flex-col items-center text-center border-b border-gray-200">
              <img
                src={profile.personal.imageUrl}
                alt={profile.personal.name}
                className="w-32 h-32 rounded-full mb-4"
              />
              <h2 className="text-xl font-bold text-gray-800">{profile.personal.name}</h2>
              <p className="text-indigo-600 font-medium">{profile.personal.title}</p>
              <p className="text-gray-500 text-sm mt-2">
                <svg
                  className="w-4 h-4 inline-block mr-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                {profile.personal.location}
              </p>
              
              <div className="flex mt-4 space-x-3">
                <a
                  href={profile.personal.socialMedia.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-500 hover:text-indigo-600"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
                <a
                  href={profile.personal.socialMedia.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-500 hover:text-indigo-600"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"
                    />
                  </svg>
                </a>
                <a
                  href={profile.personal.socialMedia.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-500 hover:text-indigo-600"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.338 16.338H13.67V12.16c0-1.005-.02-2.3-1.39-2.3-1.39 0-1.601 1.094-1.601 2.224v4.253h-2.66V8H10.5v1.2h.03c.355-.675 1.227-1.39 2.527-1.39 2.705 0 3.208 1.78 3.208 4.1v4.428zM5.5 6.8a1.57 1.57 0 11-.004-3.14A1.57 1.57 0 015.5 6.8zm1.33 9.538h-2.66V8h2.66v8.338zM17.5 1.875H2.5a.625.625 0 00-.625.625v15a.625.625 0 00.625.625h15a.625.625 0 00.625-.625v-15a.625.625 0 00-.625-.625z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
                <a
                  href={profile.personal.socialMedia.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-500 hover:text-indigo-600"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84"
                    />
                  </svg>
                </a>
              </div>
            </div>
            
            <div className="p-6">
              <div className="mb-4">
                <h3 className="text-sm font-medium text-gray-500 mb-1">Email</h3>
                <p className="text-gray-800">{profile.personal.email}</p>
              </div>
              <div className="mb-4">
                <h3 className="text-sm font-medium text-gray-500 mb-1">Phone</h3>
                <p className="text-gray-800">{profile.personal.phone}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-1">Bio</h3>
                <p className="text-gray-800 text-sm">{profile.personal.bio}</p>
              </div>
            </div>
            
            {/* <div className="p-6 border-t border-gray-200">
              <h3 className="text-sm font-medium text-gray-500 mb-3">Keahlian</h3>
              <SkillsCard skills={profile.skills.slice(0, 5)} />
              <button className="mt-4 text-sm text-indigo-600 font-medium hover:text-indigo-800">
                Lihat semua keahlian
              </button>
            </div> */}
              <div className="px-6 py-4 border-t border-gray-200">
              <Link href="/freelancer/edit-profile" className="w-full flex items-center justify-center px-4 py-2 border border-indigo-300 rounded-md shadow-sm text-sm font-medium text-indigo-700 bg-white hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                <svg
                  className="w-4 h-4 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                  />
                </svg>
                Edit Profil
              </Link>
            </div>
          </div>
        </div>
        
        {/* Main Content */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            {/* Tabs */}
            <div className="border-b border-gray-200">
              <nav className="flex -mb-px">
                <button
                  className={`px-6 py-4 text-sm font-medium ${
                    activeTab === 'personal'
                      ? 'border-b-2 border-indigo-500 text-indigo-600'
                      : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                  onClick={() => setActiveTab('personal')}
                >
                  Informasi Pribadi
                </button>
                <button
                  className={`px-6 py-4 text-sm font-medium ${
                    activeTab === 'skills'
                      ? 'border-b-2 border-indigo-500 text-indigo-600'
                      : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                  onClick={() => setActiveTab('skills')}
                >
                  Keahlian
                </button>
                <button
                  className={`px-6 py-4 text-sm font-medium ${
                    activeTab === 'education'
                      ? 'border-b-2 border-indigo-500 text-indigo-600'
                      : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                  onClick={() => setActiveTab('education')}
                >
                  Pendidikan
                </button>
                <button
                  className={`px-6 py-4 text-sm font-medium ${
                    activeTab === 'experience'
                      ? 'border-b-2 border-indigo-500 text-indigo-600'
                      : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                  onClick={() => setActiveTab('experience')}
                >
                  Pengalaman
                </button>
                <button
                  className={`px-6 py-4 text-sm font-medium ${
                    activeTab === 'portfolio'
                      ? 'border-b-2 border-indigo-500 text-indigo-600'
                      : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                  onClick={() => setActiveTab('portfolio')}
                >
                  Portfolio
                </button>
              </nav>
            </div>
            
            {/* Tab Content */}
            <div className="p-6">
              {activeTab === 'personal' && (
                <div>
                  <h2 className="text-lg font-bold text-gray-800 mb-4">Informasi Pribadi</h2>
                  <form>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                          Nama Lengkap
                        </label>
                        <input
                          type="text"
                          id="name"
                          className="w-full border border-gray-300 rounded-md shadow-sm px-4 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                          defaultValue={profile.personal.name}
                        />
                      </div>
                      <div>
                        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                          Judul Profesional
                        </label>
                        <input
                          type="text"
                          id="title"
                          className="w-full border border-gray-300 rounded-md shadow-sm px-4 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                          defaultValue={profile.personal.title}
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                          Email
                        </label>
                        <input
                          type="email"
                          id="email"
                          className="w-full border border-gray-300 rounded-md shadow-sm px-4 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                          defaultValue={profile.personal.email}
                        />
                      </div>
                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                          Telepon
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          className="w-full border border-gray-300 rounded-md shadow-sm px-4 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                          defaultValue={profile.personal.phone}
                        />
                      </div>
                      <div>
                        <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                          Lokasi
                        </label>
                        <input
                          type="text"
                          id="location"
                          className="w-full border border-gray-300 rounded-md shadow-sm px-4 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                          defaultValue={profile.personal.location}
                        />
                      </div>
                      <div>
                        <label htmlFor="website" className="block text-sm font-medium text-gray-700 mb-1">
                          Website
                        </label>
                        <input
                          type="url"
                          id="website"
                          className="w-full border border-gray-300 rounded-md shadow-sm px-4 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                          defaultValue={profile.personal.socialMedia.website}
                        />
                      </div>
                    </div>
                    
                    <div className="mb-6">
                      <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-1">
                        Bio
                      </label>
                      <textarea
                        id="bio"
                        rows={4}
                        className="w-full border border-gray-300 rounded-md shadow-sm px-4 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        defaultValue={profile.personal.bio}
                      ></textarea>
                    </div>
                    
                    <div className="flex justify-end">
                      <button
                        type="button"
                        className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mr-3"
                      >
                        Batal
                      </button>
                      <button
                        type="submit"
                        className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        Simpan Perubahan
                      </button>
                    </div>
                  </form>
                </div>
              )}
              
              {activeTab === 'skills' && (
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-bold text-gray-800">Keahlian</h2>
                    <Link href='/freelancer/skills' className="px-3 py-1 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                      Lihat Semua
                    </Link>
                  </div>
                  
                  <SkillsCard skills={profile.skills} />
                </div>
              )}
              
              {activeTab === 'education' && (
                <div>                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-bold text-gray-800">Pendidikan</h2>
                    <Link href="/freelancer/add-education" className="px-3 py-1 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                      Tambah Pendidikan
                    </Link>
                  </div>
                  
                  <div className="space-y-6">
                    {profile.education.map((edu, index) => (
                      <div key={index} className="flex">
                        <div className="mr-4 flex-shrink-0">
                          <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-500">
                            <svg
                              className="w-6 h-6"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 14l9-5-9-5-9 5 9 5m0 0l9-5-9-5-9 5 9 5m0 0v6"
                              />
                            </svg>
                          </div>
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">{edu.school}</h3>
                          <p className="text-indigo-600 font-medium">{edu.degree}</p>
                          <p className="text-sm text-gray-500 mb-2">{edu.year}</p>
                          <p className="text-gray-700">{edu.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {activeTab === 'experience' && (
                <div>                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-bold text-gray-800">Pengalaman</h2>
                    <Link href="/freelancer/add-experience" className="px-3 py-1 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                      Tambah Pengalaman
                    </Link>
                  </div>
                  
                  <div className="space-y-6">
                    {profile.experience.map((exp, index) => (
                      <div key={index} className="flex">
                        <div className="mr-4 flex-shrink-0">
                          <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-500">
                            <svg
                              className="w-6 h-6"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                              />
                            </svg>
                          </div>
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">{exp.company}</h3>
                          <p className="text-indigo-600 font-medium">{exp.position}</p>
                          <p className="text-sm text-gray-500 mb-2">{exp.year}</p>
                          <p className="text-gray-700">{exp.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {activeTab === 'portfolio' && (
                <div>                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-bold text-gray-800">Portfolio</h2>
                    <Link href="/freelancer/add-portfolio" className="px-3 py-1 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                      Tambah Portfolio
                    </Link>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {profile.portfolio.map((project, index) => (
                      <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
                        <img
                          src={project.image}
                          alt={project.title}
                          className="w-full h-40 object-cover"
                        />
                        <div className="p-4">
                          <h3 className="text-lg font-semibold text-gray-900 mb-1">
                            {project.title}
                          </h3>
                          <p className="text-gray-700 mb-3">{project.description}</p>
                          <div className="flex flex-wrap gap-2">
                            {project.technologies.map((tech, i) => (
                              <span
                                key={i}
                                className="px-2 py-1 bg-indigo-100 text-indigo-600 text-xs font-medium rounded-md"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </FreelancerLayout>
  );
};

export default Profile;
