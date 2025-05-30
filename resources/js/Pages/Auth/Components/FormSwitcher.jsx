import React from 'react';

const FormSwitcher = ({ activeForm, onFormSwitch }) => {
  return (
    <div className="flex bg-slate-100 rounded-full p-1 mb-8">
      <button
        className={`flex-1 py-2 px-4 text-center font-semibold rounded-full transition-all ${
          activeForm === 'login'
            ? 'bg-white text-slate-900 shadow-sm'
            : 'text-slate-500'
        }`}
        onClick={() => onFormSwitch('login')}
      >
        Masuk
      </button>
      <button
        className={`flex-1 py-2 px-4 text-center font-semibold rounded-full transition-all ${
          activeForm === 'register'
            ? 'bg-white text-slate-900 shadow-sm'
            : 'text-slate-500'
        }`}
        onClick={() => onFormSwitch('register')}
      >
        Daftar
      </button>
    </div>
  );
};

export default FormSwitcher;
