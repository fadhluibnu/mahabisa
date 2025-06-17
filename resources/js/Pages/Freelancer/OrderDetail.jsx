// resources/js/Pages/Freelancer/OrderDetail.jsx

import React, { useState, useRef, useEffect } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import FreelancerLayout from '@/Pages/Freelancer/Components/FreelancerLayout';
import { useToast } from '@/Components/Toast';
import Button from '@/Components/Button';
import Modal from '@/Components/Modal';
import axios from 'axios';

export default function OrderDetail({
  order,
  files,
  messages,
  user,
  timeRemaining,
  paymentInfo,
  canDeliver,
  hasDeliverableFiles,
}) {
  const { showToast } = useToast();
  const fileInputRef = useRef();
  const fileUploadSectionRef = useRef();
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [showRevisionModal, setShowRevisionModal] = useState(false);
  const [deliveryMessage, setDeliveryMessage] = useState('');
  const [revisionMessage, setRevisionMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [messageText, setMessageText] = useState('');
  const [messageAttachments, setMessageAttachments] = useState([]);
  const [deliverableFiles, setDeliverableFiles] = useState([]);
  const [uploadProgress, setUploadProgress] = useState(0);
  const messagesEndRef = useRef(null);

  // Format currency
  const formatCurrency = amount => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  // Format date
  const formatDate = dateString => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  // Scroll to an element with smooth behavior
  const scrollToElement = (ref, highlightEffect = false) => {
    if (ref && ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth', block: 'center' });

      // Optional highlight effect to draw attention
      if (highlightEffect) {
        ref.current.classList.add('bg-green-50');
        setTimeout(() => {
          ref.current.classList.remove('bg-green-50');
        }, 1500);
      }
    }
  };

  // Scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  React.useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Ensure CSRF token is available
  React.useEffect(() => {
    // Check if CSRF token exists
    const token = document
      .querySelector('meta[name="csrf-token"]')
      ?.getAttribute('content');
    if (!token) {
      console.error('CSRF token meta tag not found in document.');
      showToast(
        'Halaman tidak memiliki CSRF token. Coba muat ulang halaman.',
        'error'
      );
    } else {
      console.log('CSRF token is available');

      // Make sure axios is configured with the CSRF token
      if (!axios.defaults.headers.common['X-CSRF-TOKEN']) {
        axios.defaults.headers.common['X-CSRF-TOKEN'] = token;
        console.log('Set CSRF token in axios defaults');
      }
    }
  }, []);

  // Handle file selection for delivery
  const handleFileChange = e => {
    // Convert FileList to Array to make it easier to work with
    const fileArray = Array.from(e.target.files);

    if (fileArray.length === 0) {
      showToast('Tidak ada file yang dipilih', 'error');
      return;
    }

    // Check for any files larger than 50MB
    const tooLargeFiles = fileArray.filter(
      file => file.size > 50 * 1024 * 1024
    );

    if (tooLargeFiles.length > 0) {
      showToast(
        `File ${tooLargeFiles[0].name} terlalu besar. Ukuran maksimum adalah 50MB.`,
        'error'
      );
      return;
    }

    // Check for allowed file types
    const allowedTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'image/jpeg',
      'image/png',
      'image/gif',
      'application/zip',
      'application/x-rar-compressed',
      'audio/mpeg',
      'video/mp4',
      'video/x-msvideo',
      'video/quicktime',
    ];

    // This is a backup check - we already use accept attribute on the input element
    const invalidFiles = fileArray.filter(file => {
      // Also include common extensions check in case MIME type is not properly detected
      const ext = file.name.split('.').pop().toLowerCase();
      const validExtensions = [
        'pdf',
        'doc',
        'docx',
        'jpg',
        'jpeg',
        'png',
        'gif',
        'zip',
        'rar',
        'mp3',
        'mp4',
        'avi',
        'mov',
      ];
      return (
        !allowedTypes.includes(file.type) && !validExtensions.includes(ext)
      );
    });

    if (invalidFiles.length > 0) {
      showToast(
        `File ${invalidFiles[0].name} memiliki format yang tidak didukung.`,
        'error'
      );
      return;
    }

    // Update state with selected files
    setSelectedFiles(fileArray);

    // Show success message
    if (fileArray.length > 0) {
      showToast(`${fileArray.length} file siap diunggah`, 'success');
    }
  };

  // Format file size
  const formatFileSize = bytes => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  // Handle delivery form submission
  const handleDeliverySubmit = async e => {
    e.preventDefault();

    if (selectedFiles.length === 0) {
      showToast('Silakan pilih setidaknya satu file untuk diunggah', 'error');
      return;
    }

    if (deliveryMessage.length < 10) {
      showToast(
        'Harap berikan pesan pengiriman yang lebih detail (minimal 10 karakter)',
        'error'
      );
      return;
    }

    setIsSubmitting(true);
    setUploadProgress(0);

    try {
      // Show initial upload status
      showToast('Memulai proses unggah file...', 'info');

      // Prepare FormData
      const formData = new FormData();
      formData.append('message', deliveryMessage);

      // Add files to FormData with correct name format for Laravel
      selectedFiles.forEach(file => {
        formData.append('files[]', file);
      });

      // Get CSRF token from meta tag
      const token = document
        .querySelector('meta[name="csrf-token"]')
        ?.getAttribute('content');

      // Print CSRF token for debugging (will be removed in production)
      console.log('CSRF token:', token);

      // CSRF token should be automatically included by axios config, but we'll add it again to be sure

      // Send request with progress tracking
      const response = await axios.post(
        `/freelancer/orders/${order.id}/deliver`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            'X-CSRF-TOKEN': token,
          },
          onUploadProgress: progressEvent => {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setUploadProgress(percentCompleted);

            // Show progress updates at reasonable intervals
            if (
              percentCompleted === 25 ||
              percentCompleted === 50 ||
              percentCompleted === 75
            ) {
              showToast(`Unggah file: ${percentCompleted}% selesai`, 'info');
            }
          },
        }
      );

      // Handle successful response
      if (response.data.success) {
        showToast('Hasil pengerjaan berhasil dikirim ke klien!', 'success');

        // Clear form data
        setSelectedFiles([]);
        setDeliveryMessage('');

        // Reload the page after short delay to show the updated file list
        setTimeout(() => window.location.reload(), 1500);
      } else {
        // Handle server-side error with specific message
        showToast(
          response.data.message || 'Terjadi kesalahan saat mengirim hasil',
          'error'
        );
      }
    } catch (error) {
      console.error('Error delivering order:', error);

      // Detailed error handling with user-friendly messages
      if (error.response) {
        // Server responded with error status code
        const errorMessage =
          error.response.data.message ||
          `Error ${error.response.status}: Gagal mengirim hasil pengerjaan`;

        // Log full error response for debugging
        console.error('Full error response:', error.response.data);

        // Check for SQL errors that might be in the response
        if (
          error.response.data &&
          typeof error.response.data === 'string' &&
          error.response.data.includes('SQLSTATE')
        ) {
          showToast(
            'Database error: Terjadi kesalahan pada database. Hubungi administrator.',
            'error'
          );
        }
        // More specific error messages based on status codes
        else if (error.response.status === 422) {
          // Validation error
          const validationErrors = error.response.data.errors || {};
          const firstError = Object.values(validationErrors)[0];
          showToast(
            firstError
              ? firstError[0]
              : 'Validasi gagal, periksa kembali data Anda',
            'error'
          );
        } else if (error.response.status === 413) {
          showToast(
            'File yang diunggah terlalu besar. Maksimal 50MB per file.',
            'error'
          );
        } else if (error.response.status === 500) {
          showToast(
            `Error server: ${errorMessage}. Coba lagi atau hubungi administrator.`,
            'error'
          );
        } else {
          showToast(errorMessage, 'error');
        }
      } else if (error.request) {
        // No response received (network issue)
        showToast(
          'Tidak ada respon dari server. Periksa koneksi internet Anda dan coba lagi.',
          'error'
        );
      } else {
        // Error in request setup
        showToast('Gagal mengirim hasil: ' + error.message, 'error');
      }
    } finally {
      setIsSubmitting(false);
      setUploadProgress(0);
    }
  };

  // Handle revision request submission
  const handleRevisionSubmit = async e => {
    e.preventDefault();

    if (revisionMessage.length < 10) {
      showToast(
        'Harap berikan detail permintaan revisi yang jelas (minimal 10 karakter)',
        'error'
      );
      return;
    }

    setIsSubmitting(true);

    try {
      await axios.post(`/freelancer/orders/${order.id}/request-revision`, {
        revision_message: revisionMessage,
      });

      showToast('Permintaan revisi berhasil dikirim', 'success');
      window.location.reload();
    } catch (error) {
      console.error('Error requesting revision:', error);
      showToast(
        error.response?.data?.message || 'Gagal mengirim permintaan revisi',
        'error'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle message form submission
  const handleMessageSubmit = async e => {
    e.preventDefault();

    if (!messageText && messageAttachments.length === 0) {
      showToast('Silakan masukkan pesan atau lampirkan file', 'error');
      return;
    }

    setIsUploading(true);

    const formData = new FormData();
    formData.append('content', messageText);
    formData.append('recipient_id', order.client_id);
    formData.append('order_id', order.id);

    messageAttachments.forEach(file => {
      formData.append('attachments[]', file);
    });

    try {
      await axios.post('/messages/send', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setMessageText('');
      setMessageAttachments([]);
      window.location.reload();
    } catch (error) {
      console.error('Error sending message:', error);
      showToast('Gagal mengirim pesan', 'error');
    } finally {
      setIsUploading(false);
    }
  };

  // Get status badge style
  const getStatusBadge = status => {
    const statusMap = {
      pending: 'bg-yellow-100 text-yellow-800',
      in_progress: 'bg-blue-100 text-blue-800',
      delivered: 'bg-purple-100 text-purple-800',
      completed: 'bg-green-100 text-green-800',
      cancelled: 'bg-red-100 text-red-800',
      pending_payment: 'bg-yellow-100 text-yellow-800',
      revision: 'bg-orange-100 text-orange-800',
    };

    return statusMap[status] || 'bg-gray-100 text-gray-800';
  };

  // Get status label
  const getStatusLabel = status => {
    const statusLabels = {
      pending: 'Menunggu Konfirmasi',
      in_progress: 'Dalam Proses',
      delivered: 'Hasil Dikirimkan',
      completed: 'Selesai',
      cancelled: 'Dibatalkan',
      pending_payment: 'Menunggu Pembayaran',
      revision: 'Perlu Revisi',
    };

    return statusLabels[status] || status;
  };

  // Get file icon based on extension
  const getFileIcon = fileName => {
    const extension = fileName.split('.').pop().toLowerCase();

    switch (extension) {
      case 'pdf':
        return (
          <svg
            className='w-6 h-6 text-red-500'
            fill='currentColor'
            viewBox='0 0 20 20'
          >
            <path
              fillRule='evenodd'
              d='M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z'
              clipRule='evenodd'
            />
          </svg>
        );
      case 'doc':
      case 'docx':
        return (
          <svg
            className='w-6 h-6 text-blue-500'
            fill='currentColor'
            viewBox='0 0 20 20'
          >
            <path
              fillRule='evenodd'
              d='M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z'
              clipRule='evenodd'
            />
          </svg>
        );
      case 'jpg':
      case 'jpeg':
      case 'png':
      case 'gif':
        return (
          <svg
            className='w-6 h-6 text-green-500'
            fill='currentColor'
            viewBox='0 0 20 20'
          >
            <path
              fillRule='evenodd'
              d='M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z'
              clipRule='evenodd'
            />
          </svg>
        );
      case 'zip':
      case 'rar':
        return (
          <svg
            className='w-6 h-6 text-yellow-500'
            fill='currentColor'
            viewBox='0 0 20 20'
          >
            <path
              fillRule='evenodd'
              d='M4 4a2 2 0 012-2h8a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 2v2h2V6H6zm2 2v2h2V8H8zm2 2v2h2v-2h-2zm2 2v2h-2v-2h2z'
              clipRule='evenodd'
            />
          </svg>
        );
      default:
        return (
          <svg
            className='w-6 h-6 text-gray-500'
            fill='currentColor'
            viewBox='0 0 20 20'
          >
            <path
              fillRule='evenodd'
              d='M4 4a2 2 0 012-2h8a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V4z'
              clipRule='evenodd'
            />
          </svg>
        );
    }
  };

  return (
    <FreelancerLayout>
      <Head title={`Order #${order.order_number}`} />

      {/* We've replaced the modal with an inline form in the "File Hasil Pekerjaan" section */}

      {/* Revision Request Modal */}
      <Modal
        show={showRevisionModal}
        onClose={() => setShowRevisionModal(false)}
      >
        <div className='p-6'>
          <h3 className='text-lg font-bold mb-4'>
            Minta Revisi atau Klarifikasi
          </h3>
          <p className='mb-4 text-sm text-gray-600'>
            Minta informasi tambahan atau klarifikasi dari klien untuk
            menyelesaikan pesanan ini.
          </p>

          <form onSubmit={handleRevisionSubmit}>
            <div className='mb-4'>
              <label className='block text-sm font-medium text-gray-700 mb-1'>
                Pesan untuk Klien
              </label>
              <textarea
                value={revisionMessage}
                onChange={e => setRevisionMessage(e.target.value)}
                rows={4}
                className='w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500'
                placeholder='Jelaskan informasi tambahan yang Anda butuhkan dari klien...'
                required
                minLength={10}
              ></textarea>
            </div>

            <div className='flex justify-end space-x-3'>
              <button
                type='button'
                onClick={() => setShowRevisionModal(false)}
                className='px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300'
                disabled={isSubmitting}
              >
                Batal
              </button>
              <button
                type='submit'
                className='px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 disabled:opacity-50'
                disabled={isSubmitting || revisionMessage.length < 10}
              >
                {isSubmitting ? 'Mengirim...' : 'Kirim Permintaan Revisi'}
              </button>
            </div>
          </form>
        </div>
      </Modal>

      <div className='py-6 px-4 sm:px-6 lg:px-8'>
        {/* Order Header */}
        <div className='mb-6'>
          <div className='flex flex-wrap items-center justify-between'>
            <div>
              <h1 className='text-2xl font-bold text-gray-900'>
                Order #{order.order_number}
              </h1>
              <div className='mt-1 flex items-center'>
                <span
                  className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadge(order.status)}`}
                >
                  {getStatusLabel(order.status)}
                </span>
                <span className='ml-3 text-sm text-gray-500'>
                  Dibuat pada {formatDate(order.created_at)}
                </span>
              </div>
            </div>

            <div className='mt-4 sm:mt-0 flex flex-wrap gap-2'>
              {/* Status check removed as requested */}
              <>
                <Button
                  onClick={() => scrollToElement(fileUploadSectionRef, true)}
                  className='bg-green-600 hover:bg-green-700 flex items-center'
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='h-4 w-4 mr-1'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10'
                    />
                  </svg>
                  Kirim Hasil Pekerjaan
                </Button>

                <Button
                  onClick={() => setShowRevisionModal(true)}
                  className='bg-orange-500 hover:bg-orange-600 flex items-center'
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='h-4 w-4 mr-1'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
                    />
                  </svg>
                  Minta Klarifikasi
                </Button>
              </>

              {/* Status indicator removed as requested */}
            </div>
          </div>
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
          {/* Order Information and Files */}
          <div className='lg:col-span-2'>
            {/* Order Details Card */}
            <div className='bg-white shadow-sm rounded-lg mb-6'>
              <div className='px-4 py-5 sm:p-6'>
                <h3 className='text-lg font-medium text-gray-900 mb-4'>
                  Detail Pesanan
                </h3>

                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                  <div>
                    <h4 className='text-sm font-medium text-gray-500'>Klien</h4>
                    <p className='mt-1 text-sm text-gray-900'>
                      {order.client?.name || 'N/A'}
                    </p>
                  </div>

                  <div>
                    <h4 className='text-sm font-medium text-gray-500'>
                      Layanan
                    </h4>
                    <p className='mt-1 text-sm text-gray-900'>
                      {order.service?.title ||
                        order.project?.title ||
                        'Layanan Kustom'}
                    </p>
                  </div>

                  <div>
                    <h4 className='text-sm font-medium text-gray-500'>
                      Jumlah
                    </h4>
                    <p className='mt-1 text-sm text-gray-900'>
                      {formatCurrency(order.total_amount || order.amount || 0)}
                    </p>
                  </div>

                  <div>
                    <h4 className='text-sm font-medium text-gray-500'>
                      Tanggal Jatuh Tempo
                    </h4>
                    <p className='mt-1 text-sm text-gray-900'>
                      {formatDate(order.due_date) || 'Tidak ditentukan'}
                    </p>
                  </div>
                </div>

                {timeRemaining && (
                  <div className='mt-4 p-3 bg-blue-50 rounded-md'>
                    <h4 className='text-sm font-medium text-blue-800'>
                      Sisa Waktu
                    </h4>
                    {timeRemaining.overdue ? (
                      <p className='mt-1 text-sm text-red-600 font-medium'>
                        Terlambat {timeRemaining.days} hari
                      </p>
                    ) : (
                      <p className='mt-1 text-sm text-blue-600'>
                        {timeRemaining.days} hari, {timeRemaining.hours} jam,{' '}
                        {timeRemaining.minutes} menit
                      </p>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Order Requirements */}
            <div className='bg-white shadow-sm rounded-lg mb-6'>
              <div className='px-4 py-5 sm:p-6'>
                <h3 className='text-lg font-medium text-gray-900 mb-4'>
                  Persyaratan Pesanan
                </h3>
                <div className='prose prose-sm max-w-none text-gray-800'>
                  {order.requirements ? (
                    <p style={{ whiteSpace: 'pre-wrap' }}>
                      {order.requirements}
                    </p>
                  ) : (
                    <p className='text-gray-500 italic'>
                      Tidak ada persyaratan khusus yang diberikan.
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Files Section */}
            <div className='bg-white shadow-sm rounded-lg mb-6'>
              <div className='px-4 py-5 sm:p-6'>
                <h3 className='text-lg font-medium text-gray-900 mb-4'>File</h3>

                {/* Deliverable Files */}
                <div className='mb-6'>
                  <h4 className='text-sm font-medium text-gray-700 mb-3'>
                    File Hasil Pekerjaan
                  </h4>
                  {files.filter(file => file.file_type === 'deliverable')
                    .length > 0 ? (
                    <ul className='divide-y divide-gray-200'>
                      {files
                        .filter(file => file.file_type === 'deliverable')
                        .map(file => (
                          <li
                            key={file.id}
                            className='py-3 flex items-center justify-between'
                          >
                            <div className='flex items-center'>
                              <div className='flex-shrink-0'>
                                {getFileIcon(file.original_name)}
                              </div>
                              <div className='ml-3'>
                                <p className='text-sm font-medium text-gray-900'>
                                  {file.original_name}
                                </p>
                                <p className='text-xs text-gray-500'>
                                  {file.formatted_size} • Diunggah{' '}
                                  {formatDate(file.created_at)}
                                </p>
                              </div>
                            </div>
                            {file.can_download && (
                              <a
                                href={file.download_url}
                                className='ml-2 text-sm font-medium text-indigo-600 hover:text-indigo-900'
                                target='_blank'
                              >
                                Unduh
                              </a>
                            )}
                          </li>
                        ))}
                    </ul>
                  ) : (
                    <p className='text-sm text-gray-500'>
                      Belum ada file hasil pekerjaan yang diunggah.
                    </p>
                  )}
                </div>

                {/* Attachment Files */}
                <div>
                  <h4 className='text-sm font-medium text-gray-700 mb-3'>
                    Lampiran
                  </h4>
                  {files.filter(file => file.file_type === 'attachment')
                    .length > 0 ? (
                    <ul className='divide-y divide-gray-200'>
                      {files
                        .filter(file => file.file_type === 'attachment')
                        .map(file => (
                          <li
                            key={file.id}
                            className='py-3 flex items-center justify-between'
                          >
                            <div className='flex items-center'>
                              <div className='flex-shrink-0'>
                                {getFileIcon(file.original_name)}
                              </div>
                              <div className='ml-3'>
                                <p className='text-sm font-medium text-gray-900'>
                                  {file.original_name}
                                  {file.uploaded_by_me && (
                                    <span className='ml-2 text-xs text-blue-600'>
                                      (Unggahan Anda)
                                    </span>
                                  )}
                                </p>
                                <p className='text-xs text-gray-500'>
                                  {file.formatted_size} • Diunggah oleh{' '}
                                  {file.uploaded_by_name} •{' '}
                                  {formatDate(file.created_at)}
                                </p>
                              </div>
                            </div>
                            {file.can_download && (
                              <a
                                href={file.download_url}
                                className='ml-2 text-sm font-medium text-indigo-600 hover:text-indigo-900'
                                target='_blank'
                              >
                                Unduh
                              </a>
                            )}
                          </li>
                        ))}
                    </ul>
                  ) : (
                    <p className='text-sm text-gray-500'>
                      Tidak ada file lampiran yang tersedia.
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Deliverable Files Card - Menampilkan file yang sudah diupload */}
            <div className='bg-white shadow-sm rounded-lg mb-6'>
              <div className='px-4 py-5 sm:p-6'>
                <h3 className='text-lg font-medium text-gray-900 mb-4'>
                  File Hasil Pekerjaan
                </h3>

                {files &&
                files.filter(file => file.file_type === 'deliverable').length >
                  0 ? (
                  <>
                    <p className='text-sm text-gray-500 mb-4'>
                      File hasil pekerjaan yang telah Anda unggah:
                    </p>
                    <ul className='divide-y divide-gray-200'>
                      {files
                        .filter(file => file.file_type === 'deliverable')
                        .map(file => (
                          <li
                            key={file.id}
                            className='py-3 flex justify-between items-center'
                          >
                            <div className='flex items-center'>
                              <div className='mr-3 text-gray-500'>
                                {getFileIcon(file.original_name)}
                              </div>
                              <div>
                                <p className='text-sm font-medium text-gray-900'>
                                  {file.original_name}
                                </p>
                                <p className='text-xs text-gray-500'>
                                  {file.formatted_size ||
                                    formatFileSize(file.file_size)}{' '}
                                  • Diunggah pada {formatDate(file.created_at)}
                                </p>
                              </div>
                            </div>
                            <div>
                              <span className='bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded'>
                                Terkirim
                              </span>
                            </div>
                          </li>
                        ))}
                    </ul>
                  </>
                ) : (
                  <div className='text-center py-4'>
                    <div className='mx-auto w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-3'>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        className='h-6 w-6 text-gray-400'
                        fill='none'
                        viewBox='0 0 24 24'
                        stroke='currentColor'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth={2}
                          d='M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10'
                        />
                      </svg>
                    </div>
                    <p className='text-sm text-gray-500'>
                      Anda belum mengunggah file hasil pekerjaan. Gunakan form
                      di bawah untuk mengunggahnya.
                    </p>
                  </div>
                )}

                {/* Form Upload Inline */}
                <div
                  ref={fileUploadSectionRef}
                  className='mt-6 bg-gray-50 p-4 border border-gray-200 rounded-md transition-colors duration-500'
                >
                  <h4 className='font-medium text-gray-800 mb-3'>
                    Unggah Hasil Pekerjaan
                  </h4>

                  <form onSubmit={handleDeliverySubmit} className='space-y-4'>
                    {/* CSRF Token */}
                    <input
                      type='hidden'
                      name='_token'
                      value={
                        document.head.querySelector('meta[name="csrf-token"]')
                          ?.content
                      }
                    />

                    {/* File Upload */}
                    <div>
                      <label className='block text-sm font-medium text-gray-700 mb-1'>
                        Pilih File
                      </label>
                      <div className='flex flex-col space-y-2'>
                        <input
                          type='file'
                          onChange={handleFileChange}
                          className='block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-green-50 file:text-green-700 hover:file:bg-green-100'
                          multiple
                          accept='.pdf,.doc,.docx,.jpg,.jpeg,.png,.gif,.zip,.rar,.mp3,.mp4,.avi,.mov'
                          disabled={isSubmitting}
                        />
                        <p className='text-xs text-gray-500'>
                          Format yang didukung: PDF, DOC, JPG, PNG, ZIP, dll
                          (max: 50MB)
                        </p>
                      </div>

                      {selectedFiles.length > 0 && (
                        <div className='mt-2'>
                          <p className='text-sm text-gray-700'>
                            {selectedFiles.length} file dipilih:
                          </p>
                          <ul className='mt-1 text-sm text-gray-500 space-y-1 max-h-24 overflow-y-auto'>
                            {selectedFiles.map((file, index) => (
                              <li key={index} className='flex items-center'>
                                {getFileIcon(file.name)}
                                <span className='ml-1 truncate max-w-xs'>
                                  {file.name}
                                </span>
                                <span className='ml-1 text-xs'>
                                  ({formatFileSize(file.size)})
                                </span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>

                    {/* Pesan */}
                    <div>
                      <label className='block text-sm font-medium text-gray-700 mb-1'>
                        Pesan untuk Klien
                      </label>
                      <textarea
                        value={deliveryMessage}
                        onChange={e => setDeliveryMessage(e.target.value)}
                        name='message'
                        rows={3}
                        className='w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500'
                        placeholder='Jelaskan detail hasil pekerjaan Anda dan instruksi penggunaan untuk klien...'
                        required
                        minLength={10}
                        disabled={isSubmitting}
                      ></textarea>
                    </div>

                    {/* Progress Bar */}
                    {isSubmitting && (
                      <div className='my-2'>
                        <div className='w-full bg-gray-200 rounded-full h-2'>
                          <div
                            className='bg-green-600 h-2 rounded-full'
                            style={{ width: `${uploadProgress}%` }}
                          ></div>
                        </div>
                        <p className='mt-1 text-xs text-gray-500 text-right'>
                          {uploadProgress}% selesai
                        </p>
                      </div>
                    )}

                    {/* Submit Button */}
                    <div className='flex justify-end'>
                      <button
                        type='submit'
                        className='inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50'
                        disabled={
                          isSubmitting ||
                          selectedFiles.length === 0 ||
                          deliveryMessage.length < 10
                        }
                      >
                        {isSubmitting ? (
                          <>
                            <svg
                              className='animate-spin -ml-1 mr-2 h-4 w-4 text-white'
                              xmlns='http://www.w3.org/2000/svg'
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
                            Mengirim...
                          </>
                        ) : (
                          <>
                            <svg
                              xmlns='http://www.w3.org/2000/svg'
                              className='h-4 w-4 mr-1'
                              fill='none'
                              viewBox='0 0 24 24'
                              stroke='currentColor'
                            >
                              <path
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                strokeWidth={2}
                                d='M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10'
                              />
                            </svg>
                            Kirim Hasil Pekerjaan
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>

          {/* Communication */}
          <div className='lg:col-span-1'>
            {/* Message Chat Box */}
            <div className='bg-white shadow-sm rounded-lg h-full flex flex-col'>
              <div className='px-4 py-5 sm:px-6 border-b border-gray-200'>
                <h3 className='text-lg font-medium text-gray-900'>
                  Komunikasi
                </h3>
                <p className='mt-1 text-sm text-gray-500'>
                  Chat dengan klien mengenai pesanan ini
                </p>
              </div>

              <div
                className='flex-grow overflow-y-auto p-4'
                style={{ maxHeight: '500px' }}
              >
                {messages.length > 0 ? (
                  <div className='space-y-4'>
                    {messages.map(message => (
                      <div
                        key={message.id}
                        className={`flex ${message.is_mine ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-[80%] rounded-lg px-4 py-2 ${
                            message.is_mine
                              ? 'bg-indigo-100 text-indigo-900'
                              : 'bg-gray-100 text-gray-900'
                          }`}
                        >
                          <div className='flex items-center space-x-2'>
                            <div className='flex-shrink-0'>
                              <img
                                className='h-8 w-8 rounded-full'
                                src={message.sender_avatar}
                                alt={message.sender_name}
                              />
                            </div>
                            <div>
                              <p className='text-xs font-medium'>
                                {message.sender_name}
                              </p>
                              <p className='text-xs text-gray-500'>
                                {formatDate(message.created_at)}
                              </p>
                            </div>
                          </div>

                          {message.message && (
                            <div
                              className='mt-2 text-sm'
                              style={{ whiteSpace: 'pre-wrap' }}
                            >
                              {message.message}
                            </div>
                          )}

                          {message.attachments &&
                            message.attachments.length > 0 && (
                              <div className='mt-2'>
                                <p className='text-xs font-medium text-gray-500 mb-1'>
                                  Lampiran:
                                </p>
                                <ul className='space-y-1'>
                                  {message.attachments.map(
                                    (attachment, idx) => (
                                      <li
                                        key={idx}
                                        className='flex items-center'
                                      >
                                        <div className='flex-shrink-0'>
                                          {getFileIcon(
                                            attachment.original_name
                                          )}
                                        </div>
                                        <a
                                          href={attachment.url}
                                          target='_blank'
                                          rel='noopener noreferrer'
                                          className='ml-2 text-xs text-indigo-600 hover:text-indigo-900 truncate max-w-[200px]'
                                        >
                                          {attachment.original_name}
                                        </a>
                                      </li>
                                    )
                                  )}
                                </ul>
                              </div>
                            )}
                        </div>
                      </div>
                    ))}
                    <div ref={messagesEndRef} />
                  </div>
                ) : (
                  <div className='text-center py-10'>
                    <svg
                      className='mx-auto h-12 w-12 text-gray-400'
                      fill='none'
                      viewBox='0 0 24 24'
                      stroke='currentColor'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z'
                      />
                    </svg>
                    <h3 className='mt-2 text-sm font-medium text-gray-900'>
                      Belum ada pesan
                    </h3>
                    <p className='mt-1 text-sm text-gray-500'>
                      Mulai berkomunikasi dengan klien Anda sekarang.
                    </p>
                  </div>
                )}
              </div>

              <div className='border-t border-gray-200 p-4'>
                <form onSubmit={handleMessageSubmit}>
                  <div>
                    <label htmlFor='message' className='sr-only'>
                      Pesan
                    </label>
                    <textarea
                      id='message'
                      rows={3}
                      className='block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
                      placeholder='Ketik pesan Anda di sini...'
                      value={messageText}
                      onChange={e => setMessageText(e.target.value)}
                      disabled={isUploading}
                    ></textarea>
                  </div>

                  <div className='mt-3 flex items-center justify-between'>
                    <div>
                      <input
                        type='file'
                        id='message-attachments'
                        multiple
                        className='sr-only'
                        onChange={e =>
                          setMessageAttachments(Array.from(e.target.files))
                        }
                        disabled={isUploading}
                      />
                      <label
                        htmlFor='message-attachments'
                        className='inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-sm font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                      >
                        <svg
                          className='-ml-1 mr-2 h-5 w-5 text-gray-400'
                          xmlns='http://www.w3.org/2000/svg'
                          viewBox='0 0 24 24'
                          fill='currentColor'
                        >
                          <path
                            fillRule='evenodd'
                            d='M8 4a3 3 0 00-3 3v4a5 5 0 0010 0V7a1 1 0 112 0v4a7 7 0 11-14 0V7a5 5 0 0110 0v4a3 3 0 11-6 0V7a1 1 0 012 0v4a1 1 0 102 0V7a3 3 0 00-3-3z'
                            clipRule='evenodd'
                          />
                        </svg>
                        Lampirkan File
                      </label>
                      {messageAttachments.length > 0 && (
                        <span className='ml-3 text-xs text-gray-500'>
                          {messageAttachments.length} file(s) dipilih
                        </span>
                      )}
                    </div>

                    <button
                      type='submit'
                      className='inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                      disabled={
                        (!messageText && messageAttachments.length === 0) ||
                        isUploading
                      }
                    >
                      {isUploading ? 'Mengirim...' : 'Kirim'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>

        {/* The upload form is now integrated directly into the File Hasil Pekerjaan section above */}
      </div>
    </FreelancerLayout>
  );
}
