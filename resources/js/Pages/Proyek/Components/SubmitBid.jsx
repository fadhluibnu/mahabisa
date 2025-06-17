import React, { useState } from 'react';

const SubmitBid = ({ project }) => {
  const [formData, setFormData] = useState({
    bidAmount: '',
    deliveryDays: '',
    proposal: '',
    attachments: [],
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    // Clear error when field is edited
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: '',
      });
    }
  };

  const handleFileChange = e => {
    setFormData({
      ...formData,
      attachments: Array.from(e.target.files),
    });
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = {};

    // Validate bid amount
    if (!formData.bidAmount) {
      newErrors.bidAmount = 'Jumlah penawaran harus diisi';
      valid = false;
    } else if (isNaN(formData.bidAmount) || formData.bidAmount <= 0) {
      newErrors.bidAmount = 'Jumlah penawaran harus berupa angka positif';
      valid = false;
    }

    // Validate delivery days
    if (!formData.deliveryDays) {
      newErrors.deliveryDays = 'Waktu pengerjaan harus diisi';
      valid = false;
    } else if (isNaN(formData.deliveryDays) || formData.deliveryDays <= 0) {
      newErrors.deliveryDays = 'Waktu pengerjaan harus berupa angka positif';
      valid = false;
    }

    // Validate proposal
    if (!formData.proposal) {
      newErrors.proposal = 'Proposal harus diisi';
      valid = false;
    } else if (formData.proposal.length < 100) {
      newErrors.proposal = 'Proposal minimal 100 karakter';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (validateForm()) {
      setIsSubmitting(true);

      // In a real app, you would send this data to the server
      console.log('Submitting bid:', formData);

      // Simulate API call
      setTimeout(() => {
        setIsSubmitting(false);
        setShowSuccess(true);
        // Reset form
        setFormData({
          bidAmount: '',
          deliveryDays: '',
          proposal: '',
          attachments: [],
        });

        // Hide success message after 5 seconds
        setTimeout(() => {
          setShowSuccess(false);
        }, 5000);
      }, 1500);
    }
  };

  // Format budget number with separator
  const formatNumber = value => {
    if (!value) return '';
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  };

  return (
    <div className='bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden'>
      <div className='p-6'>
        <h3 className='text-lg font-semibold text-slate-900 mb-4'>
          Ajukan Penawaran
        </h3>

        {showSuccess ? (
          <div className='bg-green-50 border border-green-200 rounded-lg p-4 mb-4'>
            <div className='flex'>
              <svg
                className='h-5 w-5 text-green-500 mr-2'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'
                />
              </svg>
              <div>
                <h4 className='text-sm font-medium text-green-800'>
                  Penawaran Terkirim!
                </h4>
                <p className='text-sm text-green-700 mt-1'>
                  Penawaran Anda telah berhasil terkirim. Kami akan memberi tahu
                  Anda jika klien merespons penawaran Anda.
                </p>
              </div>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className='space-y-4'>
              {/* Bid Amount */}
              <div>
                <label
                  htmlFor='bidAmount'
                  className='block text-sm font-medium text-slate-700 mb-1'
                >
                  Jumlah Penawaran (Rp)
                </label>
                <div className='relative'>
                  <span className='absolute inset-y-0 left-0 pl-3 flex items-center text-slate-500'>
                    Rp
                  </span>
                  <input
                    type='text'
                    name='bidAmount'
                    id='bidAmount'
                    value={formData.bidAmount}
                    onChange={handleChange}
                    className={`block w-full pl-10 pr-3 py-2 border ${errors.bidAmount ? 'border-red-300' : 'border-slate-300'} rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                    placeholder='Contoh: 2.500.000'
                  />
                </div>
                {errors.bidAmount && (
                  <p className='mt-1 text-sm text-red-600'>
                    {errors.bidAmount}
                  </p>
                )}
                <p className='mt-1 text-xs text-slate-500'>
                  Budget klien: {project.budget}
                </p>
              </div>

              {/* Delivery Days */}
              <div>
                <label
                  htmlFor='deliveryDays'
                  className='block text-sm font-medium text-slate-700 mb-1'
                >
                  Waktu Pengerjaan (Hari)
                </label>
                <input
                  type='number'
                  name='deliveryDays'
                  id='deliveryDays'
                  value={formData.deliveryDays}
                  onChange={handleChange}
                  min='1'
                  className={`block w-full px-3 py-2 border ${errors.deliveryDays ? 'border-red-300' : 'border-slate-300'} rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                  placeholder='Contoh: 30'
                />
                {errors.deliveryDays && (
                  <p className='mt-1 text-sm text-red-600'>
                    {errors.deliveryDays}
                  </p>
                )}
              </div>

              {/* Proposal */}
              <div>
                <label
                  htmlFor='proposal'
                  className='block text-sm font-medium text-slate-700 mb-1'
                >
                  Proposal
                </label>
                <textarea
                  name='proposal'
                  id='proposal'
                  rows='6'
                  value={formData.proposal}
                  onChange={handleChange}
                  className={`block w-full px-3 py-2 border ${errors.proposal ? 'border-red-300' : 'border-slate-300'} rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                  placeholder='Jelaskan pengalaman, pendekatan, dan timeline Anda untuk menyelesaikan proyek ini...'
                ></textarea>
                {errors.proposal && (
                  <p className='mt-1 text-sm text-red-600'>{errors.proposal}</p>
                )}
                <p className='mt-1 text-xs text-slate-500'>
                  Minimal 100 karakter. Jelaskan kualifikasi, pendekatan, dan
                  timeline Anda.
                </p>
              </div>

              {/* Attachments */}
              <div>
                <label
                  htmlFor='attachments'
                  className='block text-sm font-medium text-slate-700 mb-1'
                >
                  Lampiran (Opsional)
                </label>
                <div className='mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-slate-300 border-dashed rounded-md'>
                  <div className='space-y-1 text-center'>
                    <svg
                      className='mx-auto h-12 w-12 text-slate-400'
                      stroke='currentColor'
                      fill='none'
                      viewBox='0 0 48 48'
                      aria-hidden='true'
                    >
                      <path
                        d='M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02'
                        strokeWidth={2}
                        strokeLinecap='round'
                        strokeLinejoin='round'
                      />
                    </svg>
                    <div className='flex text-sm text-slate-600'>
                      <label
                        htmlFor='file-upload'
                        className='relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none'
                      >
                        <span>Upload file</span>
                        <input
                          id='file-upload'
                          name='attachments'
                          type='file'
                          multiple
                          className='sr-only'
                          onChange={handleFileChange}
                        />
                      </label>
                      <p className='pl-1'>atau drag and drop</p>
                    </div>
                    <p className='text-xs text-slate-500'>
                      PNG, JPG, PDF, DOC hingga 10MB
                    </p>
                  </div>
                </div>
                {formData.attachments.length > 0 && (
                  <div className='mt-2'>
                    <p className='text-sm text-slate-500'>
                      {formData.attachments.length} file dipilih
                    </p>
                    <ul className='mt-1 text-xs text-slate-500 list-disc pl-5'>
                      {formData.attachments.map((file, index) => (
                        <li key={index}>
                          {file.name} ({Math.round(file.size / 1024)} KB)
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              <div className='pt-2'>
                <button
                  type='submit'
                  disabled={isSubmitting}
                  className={`w-full py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${isSubmitting ? 'opacity-75 cursor-not-allowed' : ''}`}
                >
                  {isSubmitting ? (
                    <span className='flex items-center justify-center'>
                      <svg
                        className='animate-spin -ml-1 mr-2 h-4 w-4 text-white'
                        fill='none'
                        viewBox='0 0 24 24'
                      >
                        <circle
                          className='opacity-25'
                          cx='12'
                          cy='12'
                          r='10'
                          stroke='currentColor'
                          strokeWidth='4'
                        ></circle>
                        <path
                          className='opacity-75'
                          fill='currentColor'
                          d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
                        ></path>
                      </svg>
                      Mengirim Penawaran...
                    </span>
                  ) : (
                    'Kirim Penawaran'
                  )}
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default SubmitBid;
