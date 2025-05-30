import React, { useState, useEffect } from 'react';
import { Head, usePage } from '@inertiajs/react';
import AuthBackground from './Components/AuthBackground';
import AuthSidebar from './Components/AuthSidebar';
import AuthForms from './Components/AuthForms';

const Auth = () => {
  const { props } = usePage();
  const [activeForm, setActiveForm] = useState('login');

  useEffect(() => {
    // Check if formType is provided in URL parameters
    if (
      props.formType &&
      (props.formType === 'login' || props.formType === 'register')
    ) {
      setActiveForm(props.formType);
    }
  }, [props.formType]);

  const handleFormSwitch = formType => {
    setActiveForm(formType);
  };

  const { flash } = usePage().props;

  return (
    <>
      <Head title='MahaBisa | Masuk atau Daftar' />
      <div className='min-h-screen bg-slate-50 flex items-center justify-center p-4 relative overflow-hidden'>
        <AuthBackground />

        <div className='w-full max-w-6xl flex rounded-3xl shadow-2xl overflow-hidden bg-white relative z-10'>
          {flash.success && (
            <div className='absolute top-4 right-4 left-4 bg-green-50 border-l-4 border-green-500 p-4 z-20 rounded shadow-md'>
              <div className='flex'>
                <div className='flex-shrink-0'>
                  <svg
                    className='h-5 w-5 text-green-500'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth='2'
                      d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'
                    />
                  </svg>
                </div>
                <div className='ml-3'>
                  <p className='text-sm text-green-800'>{flash.success}</p>
                </div>
              </div>
            </div>
          )}
          {flash.error && (
            <div className='absolute top-4 right-4 left-4 bg-red-50 border-l-4 border-red-500 p-4 z-20 rounded shadow-md'>
              <div className='flex'>
                <div className='flex-shrink-0'>
                  <svg
                    className='h-5 w-5 text-red-500'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth='2'
                      d='M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z'
                    />
                  </svg>
                </div>
                <div className='ml-3'>
                  <p className='text-sm text-red-800'>{flash.error}</p>
                </div>
              </div>
            </div>
          )}

          <AuthSidebar />
          <AuthForms activeForm={activeForm} onFormSwitch={handleFormSwitch} />
        </div>
      </div>
    </>
  );
};

export default Auth;
