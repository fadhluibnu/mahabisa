import React, { useState } from 'react';
import { Link } from '@inertiajs/react';

const LoginForm = ({ onSwitchToRegister }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    remember: false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Login form submitted:', formData);
    // Add your Inertia.js form submission logic here
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col flex-1">
      <div className="mb-6">
        <label htmlFor="login-email" className="block font-semibold text-sm mb-1 text-slate-700">
          Email
        </label>
        <input
          type="email"
          id="login-email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full p-4 border border-slate-200 rounded-lg text-base transition-all focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 bg-slate-50 focus:bg-white"
          placeholder="Masukkan email Anda"
          required
        />
      </div>

      <div className="mb-6 relative">
        <label htmlFor="login-password" className="block font-semibold text-sm mb-1 text-slate-700">
          Password
        </label>
        <div className="relative">
          <input
            type={showPassword ? 'text' : 'password'}
            id="login-password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-4 border border-slate-200 rounded-lg text-base transition-all focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 bg-slate-50 focus:bg-white"
            placeholder="Masukkan password Anda"
            required
          />
          <button
            type="button"
            className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            onClick={togglePasswordVisibility}
          >
            {showPassword ? (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M17.94 17.94C16.2306 19.243 14.1491 19.9649 12 20C5 20 1 12 1 12C2.24389 9.68192 3.96914 7.65663 6.06 6.06M9.9 4.24C10.5883 4.0789 11.2931 3.99836 12 4C19 4 23 12 23 12C22.393 13.1356 21.6691 14.2047 20.84 15.19M14.12 14.12C13.8454 14.4148 13.5141 14.6512 13.1462 14.8151C12.7782 14.9791 12.3809 15.0673 11.9781 15.0744C11.5753 15.0815 11.1752 15.0074 10.8016 14.8565C10.4281 14.7056 10.0887 14.4811 9.80385 14.1962C9.51897 13.9113 9.29439 13.572 9.14351 13.1984C8.99262 12.8249 8.91853 12.4247 8.92563 12.0219C8.93274 11.6191 9.02091 11.2219 9.18488 10.8539C9.34884 10.4859 9.58525 10.1547 9.88 9.88" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <line x1="1" y1="1" x2="23" y2="23" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 12C1 12 5 4 12 4C19 4 23 12 23 12C23 12 19 20 12 20C5 20 1 12 1 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            )}
          </button>
        </div>
      </div>      <div className="flex items-center justify-between mb-6 text-sm">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            name="remember"
            checked={formData.remember}
            onChange={handleChange}
            className="sr-only"
          />
          <span className="relative w-5 h-5 border-2 border-slate-300 rounded flex items-center justify-center bg-white transition-all">
            {formData.remember && (
              <span className="bg-indigo-500 absolute inset-0 rounded-sm flex items-center justify-center">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20 6L9 17L4 12" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            )}
          </span>
          <span>Ingat saya</span>
        </label>

        <Link href="#" className="text-indigo-600 hover:text-indigo-800 font-medium">
          Lupa password?
        </Link>
      </div>

      <button
        type="submit"
        className="w-full py-4 px-8 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all hover:-translate-y-0.5 relative overflow-hidden"
      >
        <span className="relative z-10">Masuk</span>
        <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full hover:animate-shimmer"></span>
      </button>

      <div className="flex items-center my-6">
        <div className="flex-1 h-px bg-slate-200"></div>
        <p className="px-4 text-sm text-slate-400">atau masuk dengan</p>
        <div className="flex-1 h-px bg-slate-200"></div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <button
          type="button"
          className="flex-1 flex items-center justify-center gap-2 p-4 border border-slate-200 rounded-lg bg-white hover:bg-slate-50 transition-all hover:-translate-y-0.5"
        >
          <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
            <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path>
            <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path>
            <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path>
            <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
          </svg>
          <span>Google</span>
        </button>
      </div>

      <div className="text-center text-sm text-slate-500 mt-auto pt-6">
        Belum punya akun?{' '}
        <button
          type="button"
          onClick={onSwitchToRegister}
          className="text-indigo-600 hover:text-indigo-800 font-medium"
        >
          Daftar sekarang
        </button>
      </div>
    </form>
  );
};

export default LoginForm;
