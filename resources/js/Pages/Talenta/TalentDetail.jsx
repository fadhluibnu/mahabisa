import React from 'react';
import { Head, usePage, Link } from '@inertiajs/react';
import Navbar from '@/Components/Navbar';
import Footer from '@/Components/Footer';

const TalentDetail = ({ talentId }) => {
  const { auth } = usePage().props;
  
  // This would normally come from the backend based on talentId
  // For now, we'll use dummy data for demonstration
  const freelancerData = {
    id: 1,
    name: 'Budi Santoso',
    title: 'Full Stack Developer',
    image: 'https://randomuser.me/api/portraits/men/42.jpg',
    university: 'Universitas Indonesia',
    isVerified: true,
    isOnline: true,
    rating: 4.9,
    projectCount: 38,
    responseTime: '2 jam',
    joinedDate: 'Maret 2023',
    skills: ['React', 'Node.js', 'Firebase', 'MongoDB', 'TailwindCSS', 'Express.js'],
    description: 'Mahasiswa Ilmu Komputer dengan pengalaman 3 tahun di pengembangan web. Spesialis dalam membuat aplikasi web yang modern, responsif, dan user-friendly dengan teknologi React dan Node.js.',
    education: [
      {
        university: 'Universitas Indonesia',
        degree: 'S1 Ilmu Komputer',
        year: '2020 - Sekarang'
      }
    ],
    experience: [
      {
        company: 'PT Digital Kreasi',
        position: 'Freelance Web Developer',
        period: 'Jan 2022 - Sekarang',
        description: 'Mengembangkan aplikasi web untuk berbagai klien menggunakan React, Node.js, dan MongoDB.'
      },
      {
        company: 'StartUp Indonesia',
        position: 'Frontend Developer Intern',
        period: 'Jun 2021 - Dec 2021',
        description: 'Membantu pengembangan UI/UX untuk aplikasi fintech dengan React dan TailwindCSS.'
      }
    ],
    portfolio: [
      {
        id: 1,
        title: 'E-Commerce Dashboard',
        image: 'https://placehold.co/600x400/e2e8f0/64748b?text=E-Commerce+Dashboard',
        description: 'Dashboard admin untuk platform e-commerce dengan fitur analitik penjualan dan manajemen produk.',
        technologies: ['React', 'Redux', 'Node.js', 'Express', 'MongoDB']
      },
      {
        id: 2,
        title: 'Aplikasi Manajemen Proyek',
        image: 'https://placehold.co/600x400/e2e8f0/64748b?text=Project+Management+App',
        description: 'Aplikasi untuk melacak dan mengelola proyek dengan fitur kanban board dan laporan progres.',
        technologies: ['React', 'Firebase', 'TailwindCSS']
      },
      {
        id: 3,
        title: 'Platform Belajar Online',
        image: 'https://placehold.co/600x400/e2e8f0/64748b?text=Online+Learning+Platform',
        description: 'Website pembelajaran online dengan fitur kursus, video, dan forum diskusi.',
        technologies: ['MERN Stack', 'WebRTC', 'Socket.io']
      }
    ],
    testimonials: [
      {
        id: 1,
        name: 'Siti Rahayu',
        image: 'https://randomuser.me/api/portraits/women/45.jpg',
        role: 'Product Manager',
        rating: 5,
        text: 'Budi sangat profesional dan menghasilkan kode yang berkualitas. Kemampuan komunikasinya luar biasa dan proyek selesai tepat waktu.'
      },
      {
        id: 2,
        name: 'Ahmad Fauzi',
        image: 'https://randomuser.me/api/portraits/men/32.jpg',
        role: 'Startup Founder',
        rating: 4.8,
        text: 'Kerjasama dengan Budi sangat menyenangkan. Ia memahami kebutuhan bisnis dengan cepat dan memberikan solusi teknis yang tepat.'
      }
    ],
    services: [
      {
        id: 1,
        title: 'Pengembangan Website Full Stack',
        price: 'Rp 5.000.000 - Rp 15.000.000',
        description: 'Pembuatan website dari awal hingga akhir dengan teknologi modern seperti React, Node.js, dan MongoDB.'
      },
      {
        id: 2,
        title: 'Pengembangan Frontend',
        price: 'Rp 3.000.000 - Rp 8.000.000',
        description: 'Pembuatan tampilan website yang responsif dan menarik dengan React dan TailwindCSS.'
      },
      {
        id: 3,
        title: 'API Development',
        price: 'Rp 2.500.000 - Rp 7.500.000',
        description: 'Pembuatan REST API dengan Node.js dan Express untuk mendukung aplikasi frontend.'
      }
    ]
  };

  // Generate stars for ratings
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <svg
          key={i}
          className={`h-5 w-5 ${i <= rating ? 'text-yellow-400' : 'text-gray-300'}`}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.95-.69l1.07-3.292z"
          />
        </svg>
      );
    }
    return stars;
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Head title={`MahaBisa | ${freelancerData.name}`} />
      <Navbar user={auth.user} />

      <div className="pt-16 pb-16"> {/* Add padding to account for fixed navbar */}
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-violet-50 to-purple-50 py-12 border-b border-slate-200">
          <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
              {/* Profile Image */}
              <div className="relative">
                <img
                  src={freelancerData.image}
                  alt={freelancerData.name}
                  className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover border-4 border-white shadow-md"
                />
                {freelancerData.isVerified && (
                  <span className="absolute bottom-2 right-2 bg-violet-600 text-white p-1 rounded-full">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" />
                    </svg>
                  </span>
                )}
              </div>

              {/* Profile Info */}
              <div className="text-center md:text-left flex-1">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div>
                    <h1 className="text-3xl font-bold text-slate-900 mb-1">{freelancerData.name}</h1>
                    <p className="text-xl text-violet-600 font-medium mb-2">{freelancerData.title}</p>
                    <p className="text-slate-600 mb-3">{freelancerData.university}</p>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 mb-4 md:mb-0 items-center justify-center md:justify-end">
                    <Link
                      href={`/pesan/${freelancerData.id}`}
                      className="py-2.5 px-5 bg-gradient-to-r from-violet-600 to-violet-800 text-white text-center rounded-lg font-medium hover:shadow-md transition-all w-full sm:w-auto"
                    >
                      Kirim Pesan
                    </Link>
                    <Link
                      href={`/proyek/buat?freelancer=${freelancerData.id}`}
                      className="py-2.5 px-5 border border-violet-600 text-violet-600 text-center rounded-lg font-medium hover:bg-violet-50 transition-all w-full sm:w-auto"
                    >
                      Buat Proyek
                    </Link>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-4 justify-center md:justify-start">
                  {freelancerData.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="text-sm bg-violet-50 text-violet-700 px-3 py-1 rounded-full"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center gap-4 justify-center md:justify-start">
                  <div className="flex items-center gap-1">
                    <div className="flex">
                      {renderStars(freelancerData.rating)}
                    </div>
                    <span className="text-slate-800 font-bold ml-1">{freelancerData.rating}</span>
                    <span className="text-slate-500">({freelancerData.projectCount} proyek)</span>
                  </div>

                  <div className={`flex items-center gap-1 ${freelancerData.isOnline ? 'text-green-500' : 'text-slate-400'}`}>
                    <span className={`w-2.5 h-2.5 rounded-full ${freelancerData.isOnline ? 'bg-green-500' : 'bg-slate-400'}`}></span>
                    <span className="text-sm">{freelancerData.isOnline ? 'Online' : 'Offline'}</span>
                  </div>

                  <div className="text-slate-500 text-sm">
                    <span>Bergabung {freelancerData.joinedDate}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Left Column - Main Content */}
            <div className="w-full lg:w-2/3">
              {/* About Section */}
              <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden mb-8">
                <div className="p-6 border-b border-slate-100">
                  <h2 className="text-xl font-bold text-slate-900">Tentang Saya</h2>
                </div>
                <div className="p-6">
                  <p className="text-slate-700 whitespace-pre-line">
                    {freelancerData.description}
                  </p>
                </div>
              </div>

              {/* Education Section */}
              <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden mb-8">
                <div className="p-6 border-b border-slate-100">
                  <h2 className="text-xl font-bold text-slate-900">Pendidikan</h2>
                </div>
                <div className="p-6">
                  {freelancerData.education.map((edu, index) => (
                    <div key={index} className={index < freelancerData.education.length - 1 ? "mb-6 pb-6 border-b border-slate-100" : ""}>
                      <h3 className="text-lg font-bold text-slate-800">{edu.university}</h3>
                      <p className="text-violet-600">{edu.degree}</p>
                      <p className="text-slate-500 text-sm">{edu.year}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Experience Section */}
              <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden mb-8">
                <div className="p-6 border-b border-slate-100">
                  <h2 className="text-xl font-bold text-slate-900">Pengalaman</h2>
                </div>
                <div className="p-6">
                  {freelancerData.experience.map((exp, index) => (
                    <div key={index} className={index < freelancerData.experience.length - 1 ? "mb-6 pb-6 border-b border-slate-100" : ""}>
                      <h3 className="text-lg font-bold text-slate-800">{exp.position}</h3>
                      <p className="text-violet-600">{exp.company}</p>
                      <p className="text-slate-500 text-sm mb-2">{exp.period}</p>
                      <p className="text-slate-700">{exp.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Portfolio Section */}
              <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden mb-8">
                <div className="p-6 border-b border-slate-100">
                  <h2 className="text-xl font-bold text-slate-900">Portofolio</h2>
                </div>
                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {freelancerData.portfolio.map((item) => (
                      <div key={item.id} className="border border-slate-200 rounded-lg overflow-hidden hover:shadow-md transition-all">
                        <img 
                          src={item.image} 
                          alt={item.title} 
                          className="w-full h-48 object-cover"
                        />
                        <div className="p-4">
                          <h3 className="text-lg font-bold text-slate-800 mb-2">{item.title}</h3>
                          <p className="text-slate-600 text-sm mb-3">{item.description}</p>
                          <div className="flex flex-wrap gap-1.5">
                            {item.technologies.map((tech, techIndex) => (
                              <span 
                                key={techIndex}
                                className="px-2 py-1 bg-slate-100 text-slate-700 text-xs rounded-lg"
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
              </div>

              {/* Testimonials Section */}
              <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
                <div className="p-6 border-b border-slate-100">
                  <h2 className="text-xl font-bold text-slate-900">Testimoni</h2>
                </div>
                <div className="p-6">
                  <div className="space-y-6">
                    {freelancerData.testimonials.map((testimonial) => (
                      <div key={testimonial.id} className="p-4 border border-slate-100 rounded-lg">
                        <div className="flex items-center gap-1 text-yellow-400 mb-2">
                          {renderStars(testimonial.rating)}
                          <span className="text-slate-700 ml-1">{testimonial.rating}</span>
                        </div>
                        <p className="text-slate-700 mb-4">{testimonial.text}</p>
                        <div className="flex items-center gap-3">
                          <img 
                            src={testimonial.image} 
                            alt={testimonial.name} 
                            className="w-10 h-10 rounded-full object-cover"
                          />
                          <div>
                            <h4 className="font-medium text-slate-900">{testimonial.name}</h4>
                            <p className="text-slate-500 text-sm">{testimonial.role}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Services & Stats */}
            <div className="w-full lg:w-1/3">
              {/* Services Section */}
              <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden mb-8">
                <div className="p-6 border-b border-slate-100">
                  <h2 className="text-xl font-bold text-slate-900">Layanan</h2>
                </div>
                <div className="p-6">
                  <div className="space-y-6">
                    {freelancerData.services.map((service) => (
                      <div key={service.id} className="pb-6 border-b border-slate-100 last:border-0 last:pb-0">
                        <h3 className="text-lg font-bold text-slate-800 mb-1">{service.title}</h3>
                        <p className="text-violet-600 font-medium mb-2">{service.price}</p>
                        <p className="text-slate-600 text-sm">{service.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="p-6 bg-slate-50 border-t border-slate-100">
                  <Link
                    href={`/pesan/${freelancerData.id}`}
                    className="block w-full py-2.5 bg-gradient-to-r from-violet-600 to-violet-800 text-white text-center rounded-lg font-medium hover:shadow-md transition-all"
                  >
                    Hubungi Talenta
                  </Link>
                </div>
              </div>

              {/* Stats Section */}
              <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
                <div className="p-6 border-b border-slate-100">
                  <h2 className="text-xl font-bold text-slate-900">Statistik</h2>
                </div>
                <div className="p-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-slate-50 rounded-lg text-center">
                      <p className="text-2xl font-bold text-slate-900">{freelancerData.projectCount}</p>
                      <p className="text-slate-600 text-sm">Proyek Selesai</p>
                    </div>
                    <div className="p-4 bg-slate-50 rounded-lg text-center">
                      <p className="text-2xl font-bold text-slate-900">{freelancerData.rating}</p>
                      <p className="text-slate-600 text-sm">Rating</p>
                    </div>
                    <div className="p-4 bg-slate-50 rounded-lg text-center">
                      <p className="text-2xl font-bold text-slate-900">{freelancerData.responseTime}</p>
                      <p className="text-slate-600 text-sm">Waktu Respons</p>
                    </div>
                    <div className="p-4 bg-slate-50 rounded-lg text-center">
                      <p className="text-2xl font-bold text-slate-900">100%</p>
                      <p className="text-slate-600 text-sm">Tingkat Kepuasan</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default TalentDetail;
