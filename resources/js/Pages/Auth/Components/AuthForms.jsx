import React from 'react';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import FormSwitcher from './FormSwitcher';

const AuthForms = ({ activeForm, onFormSwitch }) => {
  return (
    <div className="flex-1 p-8 flex flex-col">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-heading font-bold text-slate-900 mb-2">Selamat Datang di MahaBisa</h2>
        <p className="text-slate-600">Platform freelancing khusus untuk mahasiswa</p>
      </div>
      
      <FormSwitcher activeForm={activeForm} onFormSwitch={onFormSwitch} />
      
      {activeForm === 'login' ? (
        <LoginForm onSwitchToRegister={() => onFormSwitch('register')} />
      ) : (
        <RegisterForm onSwitchToLogin={() => onFormSwitch('login')} />
      )}
    </div>
  );
};

export default AuthForms;
