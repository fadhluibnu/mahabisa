import React, { useState } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import AdminLayout from './Components/AdminLayout';

const UserCreate = () => {
  const { data, setData, post, processing, errors } = useForm({
    name: '',
    email: '',
    phone: '',
    role: 'client', // default role
    password: '',
    password_confirmation: '',
    profileImage: null,
    bio: '',
    address: '',
    skills: [],
    active: true,
  });

  const [previewImage, setPreviewImage] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    post('/admin/users');
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setData('profileImage', file);
    
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const skillOptions = [
    'UI/UX Design', 'Web Development', 'Mobile Development', 
    'Graphic Design', 'Content Writing', 'Digital Marketing',
    'Video Editing', 'Animation', 'Data Analysis'
  ];

  const handleSkillChange = (skill) => {
    const updatedSkills = [...data.skills];
    
    if (updatedSkills.includes(skill)) {
      // Remove skill if already selected
      const index = updatedSkills.indexOf(skill);
      updatedSkills.splice(index, 1);
    } else {
      // Add skill if not already selected
      updatedSkills.push(skill);
    }
    
    setData('skills', updatedSkills);
  };

  return (
    <AdminLayout
      title="Tambah Pengguna Baru"
      subtitle="Buat akun pengguna baru di platform MahaBisa"
    >
      <Head title="Tambah Pengguna - MahaBisa Admin" />
      
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-8">
        <div className="p-6">
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="col-span-1 md:col-span-2">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  Informasi Dasar
                </h3>
              </div>
              
              {/* Profile Image */}
              <div className="col-span-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Foto Profil
                </label>
                <div className="flex items-center">
                  <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-100 mr-4 flex items-center justify-center border border-gray-300">
                    {previewImage ? (
                      <img 
                        src={previewImage} 
                        alt="Profile preview" 
                        className="w-full h-full object-cover" 
                      />
                    ) : (
                      <svg 
                        className="w-12 h-12 text-gray-400" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24" 
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          strokeWidth={1.5} 
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" 
                        />
                      </svg>
                    )}
                  </div>
                  <div>
                    <label htmlFor="profile-image" className="cursor-pointer px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50">
                      Pilih Foto
                    </label>
                    <input 
                      id="profile-image" 
                      type="file" 
                      className="sr-only"
                      onChange={handleImageChange}
                      accept="image/*" 
                    />
                    <p className="mt-1 text-xs text-gray-500">
                      JPG, PNG, atau GIF (Maks. 2MB)
                    </p>
                  </div>
                </div>
                {errors.profileImage && (
                  <p className="mt-1 text-sm text-red-600">{errors.profileImage}</p>
                )}
              </div>
              
              {/* User Role */}
              <div className="col-span-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tipe Pengguna
                </label>
                <div className="flex space-x-4">
                  <div className="flex items-center">
                    <input 
                      type="radio" 
                      id="role-client" 
                      name="role"
                      value="client"
                      checked={data.role === 'client'}
                      onChange={e => setData('role', e.target.value)}
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                    />
                    <label htmlFor="role-client" className="ml-2 block text-sm text-gray-700">
                      Klien
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input 
                      type="radio" 
                      id="role-freelancer" 
                      name="role"
                      value="freelancer"
                      checked={data.role === 'freelancer'}
                      onChange={e => setData('role', e.target.value)}
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                    />
                    <label htmlFor="role-freelancer" className="ml-2 block text-sm text-gray-700">
                      Freelancer
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input 
                      type="radio" 
                      id="role-admin" 
                      name="role"
                      value="admin"
                      checked={data.role === 'admin'}
                      onChange={e => setData('role', e.target.value)}
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                    />
                    <label htmlFor="role-admin" className="ml-2 block text-sm text-gray-700">
                      Admin
                    </label>
                  </div>
                </div>
                {errors.role && (
                  <p className="mt-1 text-sm text-red-600">{errors.role}</p>
                )}
              </div>
              
              {/* Name */}
              <div className="col-span-1">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Nama Lengkap
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={data.name}
                  onChange={e => setData('name', e.target.value)}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  placeholder="Masukkan nama lengkap"
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                )}
              </div>
              
              {/* Email */}
              <div className="col-span-1">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={data.email}
                  onChange={e => setData('email', e.target.value)}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  placeholder="email@example.com"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                )}
              </div>
              
              {/* Phone */}
              <div className="col-span-1">
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                  Nomor Telepon
                </label>
                <input
                  type="text"
                  id="phone"
                  name="phone"
                  value={data.phone}
                  onChange={e => setData('phone', e.target.value)}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  placeholder="08xxxxxxxxxx"
                />
                {errors.phone && (
                  <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
                )}
              </div>
              
              {/* Password */}
              <div className="col-span-1">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={data.password}
                  onChange={e => setData('password', e.target.value)}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  placeholder="Minimal 8 karakter"
                />
                {errors.password && (
                  <p className="mt-1 text-sm text-red-600">{errors.password}</p>
                )}
              </div>
              
              {/* Password Confirmation */}
              <div className="col-span-1">
                <label htmlFor="password_confirmation" className="block text-sm font-medium text-gray-700 mb-2">
                  Konfirmasi Password
                </label>
                <input
                  type="password"
                  id="password_confirmation"
                  name="password_confirmation"
                  value={data.password_confirmation}
                  onChange={e => setData('password_confirmation', e.target.value)}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  placeholder="Konfirmasi password"
                />
                {errors.password_confirmation && (
                  <p className="mt-1 text-sm text-red-600">{errors.password_confirmation}</p>
                )}
              </div>
              
              {/* Divider */}
              <div className="col-span-1 md:col-span-2 pt-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  Informasi Tambahan
                </h3>
              </div>
              
              {/* Bio */}
              <div className="col-span-1 md:col-span-2">
                <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-2">
                  Bio
                </label>
                <textarea
                  id="bio"
                  name="bio"
                  rows={4}
                  value={data.bio}
                  onChange={e => setData('bio', e.target.value)}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  placeholder="Tambahkan bio atau deskripsi singkat"
                />
                {errors.bio && (
                  <p className="mt-1 text-sm text-red-600">{errors.bio}</p>
                )}
              </div>
              
              {/* Address */}
              <div className="col-span-1 md:col-span-2">
                <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">
                  Alamat
                </label>
                <textarea
                  id="address"
                  name="address"
                  rows={3}
                  value={data.address}
                  onChange={e => setData('address', e.target.value)}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  placeholder="Masukkan alamat lengkap"
                />
                {errors.address && (
                  <p className="mt-1 text-sm text-red-600">{errors.address}</p>
                )}
              </div>
              
              {/* Skills - Only show for freelancer */}
              {data.role === 'freelancer' && (
                <div className="col-span-1 md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Keahlian
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {skillOptions.map(skill => (
                      <button
                        key={skill}
                        type="button"
                        onClick={() => handleSkillChange(skill)}
                        className={`px-3 py-1.5 text-sm font-medium rounded-full ${
                          data.skills.includes(skill)
                            ? 'bg-indigo-100 text-indigo-800'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {skill}
                      </button>
                    ))}
                  </div>
                  {errors.skills && (
                    <p className="mt-1 text-sm text-red-600">{errors.skills}</p>
                  )}
                </div>
              )}
              
              {/* Status */}
              <div className="col-span-1 md:col-span-2">
                <label className="flex items-center">
                  <input 
                    type="checkbox" 
                    checked={data.active}
                    onChange={e => setData('active', e.target.checked)}
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  />
                  <span className="ml-2 text-sm text-gray-700">Akun aktif</span>
                </label>
                <p className="mt-1 text-xs text-gray-500">
                  Akun yang tidak aktif tidak akan dapat masuk ke platform
                </p>
              </div>
              
              {/* Submit Buttons */}
              <div className="col-span-1 md:col-span-2 flex justify-end space-x-3 pt-5">
                <Link
                  href="/admin/users"
                  className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Batal
                </Link>
                <button
                  type="submit"
                  disabled={processing}
                  className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-75"
                >
                  {processing ? 'Menyimpan...' : 'Simpan'}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </AdminLayout>
  );
};

export default UserCreate;
