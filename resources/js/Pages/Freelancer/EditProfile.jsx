import React, { useState } from 'react';
import FreelancerLayout from './Components/FreelancerLayout';
import { Link } from '@inertiajs/react';

const EditProfile = () => {
  // Dummy profile data (this would normally come from props in a real app)
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

  // State for form data
  const [formData, setFormData] = useState({
    name: profile.personal.name,
    title: profile.personal.title,
    email: profile.personal.email,
    phone: profile.personal.phone,
    location: profile.personal.location,
    bio: profile.personal.bio,
    website: profile.personal.socialMedia.website,
    github: profile.personal.socialMedia.github,
    linkedin: profile.personal.socialMedia.linkedin,
    twitter: profile.personal.socialMedia.twitter,
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
    // For example: Inertia.post('/profile/update', formData)
  };

  return (
    <FreelancerLayout title="Edit Profil" subtitle="Perbarui informasi profil Anda">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-800">Edit Profil</h2>
              <Link
                href="/freelancer/profile"
                className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Kembali ke Profil
              </Link>
            </div>

            <form onSubmit={handleSubmit}>
              {/* Personal Information Section */}
              <div className="mb-8">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Informasi Pribadi</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Nama Lengkap
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 rounded-md shadow-sm px-4 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                      Judul Profesional
                    </label>
                    <input
                      type="text"
                      id="title"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 rounded-md shadow-sm px-4 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 rounded-md shadow-sm px-4 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                      Telepon
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 rounded-md shadow-sm px-4 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                      Lokasi
                    </label>
                    <input
                      type="text"
                      id="location"
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 rounded-md shadow-sm px-4 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>
                </div>

                <div className="mb-6">
                  <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-1">
                    Bio
                  </label>
                  <textarea
                    id="bio"
                    name="bio"
                    rows={4}
                    value={formData.bio}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-md shadow-sm px-4 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
              </div>

              {/* Profile Picture Section */}
              <div className="mb-8">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Foto Profil</h3>
                <div className="flex items-center space-x-6">
                  <div className="flex-shrink-0">
                    <img
                      src={profile.personal.imageUrl}
                      alt={profile.personal.name}
                      className="w-24 h-24 rounded-full object-cover"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Ubah Foto Profil
                    </label>
                    <div className="flex items-center">
                      <button
                        type="button"
                        className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        Upload Foto
                      </button>
                      <button
                        type="button"
                        className="ml-3 px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        Hapus
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Social Media Section */}
              <div className="mb-8">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Sosial Media</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="website" className="block text-sm font-medium text-gray-700 mb-1">
                      Website
                    </label>
                    <input
                      type="url"
                      id="website"
                      name="website"
                      value={formData.website}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 rounded-md shadow-sm px-4 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="github" className="block text-sm font-medium text-gray-700 mb-1">
                      GitHub
                    </label>
                    <input
                      type="url"
                      id="github"
                      name="github"
                      value={formData.github}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 rounded-md shadow-sm px-4 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="linkedin" className="block text-sm font-medium text-gray-700 mb-1">
                      LinkedIn
                    </label>
                    <input
                      type="url"
                      id="linkedin"
                      name="linkedin"
                      value={formData.linkedin}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 rounded-md shadow-sm px-4 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="twitter" className="block text-sm font-medium text-gray-700 mb-1">
                      Twitter
                    </label>
                    <input
                      type="url"
                      id="twitter"
                      name="twitter"
                      value={formData.twitter}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 rounded-md shadow-sm px-4 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>
                </div>
              </div>

              {/* Form Buttons */}
              <div className="flex justify-end pt-6 border-t border-gray-200">
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
                  Simpan Perubahan
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </FreelancerLayout>
  );
};

export default EditProfile;
