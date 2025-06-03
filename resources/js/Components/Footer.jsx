import React from 'react';
import { Link } from '@inertiajs/react';

const Footer = () => {
  return (
    <footer className='bg-[#080a1a] text-white py-16'>
      {' '}
      <div className='max-w-7xl mx-auto px-4 md:px-5 lg:px-0'>
        <div className='grid grid-cols-1 md:grid-cols-12 gap-8'>
          {' '}
          {/* Logo and Description */}
          <div className='col-span-1 md:col-span-6 lg:col-span-6'>
            <div className='flex items-center mb-4'>
              <div className='justify-center items-center flex p-2 rounded-lg animate-gradient-background'>
                <svg
                  width='24'
                  height='21'
                  viewBox='0 0 24 21'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    fill-rule='evenodd'
                    clip-rule='evenodd'
                    d='M0.000147127 20.2922V0H3.55951L8.83284 6.18205L14.2303 0H18.449C20.6698 0.340231 22.5699 1.17937 23.3611 4.45978C23.5032 6.18882 23.2647 8.60575 20.6824 9.68735C22.1291 10.4426 24.277 11.9262 23.9704 15.2709C23.6589 17.4356 22.5651 19.4923 18.6661 20.3891L7.12668 20.3271V17.3182L17.5803 17.2873C19.3465 17.2118 20.5762 16.0303 20.4962 14.3093C20.4316 12.8371 19.5602 11.772 17.7975 11.3934H14.2923V8.44655C15.2332 8.45685 16.1741 8.46723 17.1151 8.4776C19.6745 7.98987 19.8648 6.56392 19.9378 5.74788C19.8267 3.82346 19.0103 3.27446 17.2056 3.00308C16.7731 2.96645 16.1737 3.15675 15.8122 3.57651L8.95686 11.1763L3.49735 5.12745L3.43534 20.3582L0 20.2923L0.000147127 20.2922Z'
                    fill='white'
                  />
                </svg>
              </div>
              <span className='ml-2 text-xl font-bold'>MahaBisa</span>
            </div>
            <p className='text-gray-400 mb-6 w-full md:w-3/4 lg:w-1/2 text-lg'>
              Platform yang menghubungkan bakat mahasiswa dengan kesempatan
              profesional
            </p>
            <div className='flex space-x-4 mb-8'>
              <a
                href='https://facebook.com'
                className='bg-gray-800 p-2 rounded-full hover:bg-gray-700 transition-colors'
              >
                <svg
                  className='h-5 w-5'
                  fill='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path d='M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z'></path>
                </svg>
              </a>
              <a
                href='https://instagram.com'
                className='bg-gray-800 p-2 rounded-full hover:bg-gray-700 transition-colors'
              >
                <svg
                  className='h-5 w-5'
                  fill='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path d='M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z'></path>
                </svg>
              </a>
              <a
                href='https://twitter.com'
                className='bg-gray-800 p-2 rounded-full hover:bg-gray-700 transition-colors'
              >
                <svg
                  className='h-5 w-5'
                  fill='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path d='M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 9.99 9.99 0 01-3.127 1.195 4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.937 4.937 0 004.604 3.417 9.868 9.868 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.054 0 13.999-7.496 13.999-13.986 0-.209 0-.42-.015-.63a9.936 9.936 0 002.46-2.548l-.047-.02z'></path>
                </svg>
              </a>
            </div>
          </div>
          {/* Links Container */}
          <div className='col-span-1 md:col-span-6 lg:col-span-6'>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
              {' '}
              {/* For You */}
              <div className='text-left md:text-right'>
                <h3 className='text-lg font-semibold mb-4 border-b border-violet-600 pb-2 inline-block md:float-right'>
                  Untuk Kamu
                </h3>
                <ul className='space-y-3 clear-both'>
                  <li>
                    <a
                      href='/eksplorasi'
                      className='text-gray-400 hover:text-white transition-colors'
                    >
                      Jelajahi Jasa
                    </a>
                  </li>
                  <li>
                    <a
                      href='/talenta'
                      className='text-gray-400 hover:text-white transition-colors'
                    >
                      Cari Freelancer
                    </a>
                  </li>
                  <li>
                    <a
                      href='/cara-kerja'
                      className='text-gray-400 hover:text-white transition-colors'
                    >
                      Cara Kerja
                    </a>
                  </li>
                  <li>
                    <a
                      href='/harga'
                      className='text-gray-400 hover:text-white transition-colors'
                    >
                      Harga
                    </a>
                  </li>
                </ul>
              </div>
              {/* For Freelancer */}
              <div className='text-left md:text-right'>
                <h3 className='text-lg font-semibold mb-4 border-b border-violet-600 pb-2 inline-block md:float-right'>
                  Untuk Freelancer
                </h3>
                <ul className='space-y-3 clear-both'>
                  <li>
                    <a
                      href='/auth?form=register&type=freelancer'
                      className='text-gray-400 hover:text-white transition-colors'
                    >
                      Mulai Freelance
                    </a>
                  </li>
                  <li>
                    <a
                      href='/freelancer/portofolio'
                      className='text-gray-400 hover:text-white transition-colors'
                    >
                      Buat Portofolio
                    </a>
                  </li>
                  <li>
                    <a
                      href='/forum'
                      className='text-gray-400 hover:text-white transition-colors'
                    >
                      Forum Komunitas
                    </a>
                  </li>
                  <li>
                    <a
                      href='/resources'
                      className='text-gray-400 hover:text-white transition-colors'
                    >
                      Resources
                    </a>
                  </li>
                </ul>
              </div>
              {/* Company */}
              <div className='text-left md:text-right'>
                <h3 className='text-lg font-semibold mb-4 border-b border-violet-600 pb-2 inline-block md:float-right'>
                  Perusahaan
                </h3>
                <ul className='space-y-3 clear-both'>
                  <li>
                    <a
                      href='/tentang-kami'
                      className='text-gray-400 hover:text-white transition-colors'
                    >
                      Tentang Kami
                    </a>
                  </li>
                  <li>
                    <a
                      href='/karir'
                      className='text-gray-400 hover:text-white transition-colors'
                    >
                      Karir
                    </a>
                  </li>
                  <li>
                    <a
                      href='/blog'
                      className='text-gray-400 hover:text-white transition-colors'
                    >
                      Blog
                    </a>
                  </li>
                  <li>
                    <a
                      href='/kontak'
                      className='text-gray-400 hover:text-white transition-colors'
                    >
                      Kontak
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>{' '}
        {/* Bottom Section */}
        <div className='mt-16 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center'>
          <div className='text-gray-400 mb-4 md:mb-0 text-center md:text-left'>
            © 2025 MahaBisa. Hak Cipta Dilindungi.
          </div>
          <div className='flex flex-col md:flex-row space-y-3 md:space-y-0 md:space-x-6 items-center md:items-start'>
            <a
              href='/kebijakan-privasi'
              className='text-gray-400 hover:text-white transition-colors'
            >
              Kebijakan Privasi
            </a>
            <a
              href='/syarat-ketentuan'
              className='text-gray-400 hover:text-white transition-colors'
            >
              Syarat & Ketentuan
            </a>
            <a
              href='/aksesibilitas'
              className='text-gray-400 hover:text-white transition-colors'
            >
              Aksesibilitas
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
