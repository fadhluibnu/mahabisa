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
    if (props.formType && (props.formType === 'login' || props.formType === 'register')) {
      setActiveForm(props.formType);
    }
  }, [props.formType]);

  const handleFormSwitch = (formType) => {
    setActiveForm(formType);
  };

  return (
    <>
      <Head title="MahaBisa | Masuk atau Daftar" />
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 relative overflow-hidden">
        <AuthBackground />
        
        <div className="w-full max-w-6xl flex rounded-3xl shadow-2xl overflow-hidden bg-white relative z-10">
          <AuthSidebar />
          <AuthForms activeForm={activeForm} onFormSwitch={handleFormSwitch} />
        </div>
      </div>
    </>
  );
};

export default Auth;
