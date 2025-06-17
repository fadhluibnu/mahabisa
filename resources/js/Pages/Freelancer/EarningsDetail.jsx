import React, { useState, useEffect } from 'react';
import { Link } from '@inertiajs/react';
import FreelancerLayout from './Components/FreelancerLayout';

const EarningsDetail = () => {
  const [activeTab, setActiveTab] = useState('overview');

  // This would be fetched from the backend in a real application
  const [earning, setEarning] = useState({
    id: 1,
    client: {
      id: 101,
      name: 'PT Maju Bersama',
      image:
        'https://ui-avatars.com/api/?name=PT+Maju+Bersama&background=6366f1&color=fff',
      contact: 'contact@ptmajubersama.com',
      phone: '+62812345678',
    },
    project: {
      id: 201,
      title: 'Redesain Website E-commerce',
      description:
        'Mengubah tampilan dan meningkatkan performa website e-commerce untuk meningkatkan konversi penjualan.',
      status: 'completed',
      startDate: '2023-05-15',
      endDate: '2023-06-10',
    },
    amount: 1500000,
    tax: 150000,
    serviceFee: 75000,
    netAmount: 1275000,
    status: 'paid',
    paymentMethod: 'bank_transfer',
    bankDetails: {
      accountName: 'John Doe',
      accountNumber: '123456789',
      bankName: 'Bank Central Asia',
    },
    transactionId: 'TRX-12345',
    invoiceNumber: 'INV-2023-06-001',
    paymentDate: '2023-06-15',
    createdAt: '2023-06-10',
    transactions: [
      {
        id: 1,
        type: 'milestone',
        description: 'Pembayaran Milestone 1: Desain UI/UX',
        amount: 500000,
        date: '2023-05-20',
        status: 'paid',
      },
      {
        id: 2,
        type: 'milestone',
        description: 'Pembayaran Milestone 2: Frontend Development',
        amount: 500000,
        date: '2023-06-01',
        status: 'paid',
      },
      {
        id: 3,
        type: 'milestone',
        description: 'Pembayaran Milestone 3: Revisi & Finalisasi',
        amount: 500000,
        date: '2023-06-10',
        status: 'paid',
      },
    ],
  });

  // Format price to Rupiah
  const formatRupiah = price => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  // Format date
  const formatDate = dateString => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('id-ID', options);
  };

  const handleDownloadInvoice = () => {
    // In a real application, this would trigger an API call to generate and download the invoice
    alert('Downloading invoice...');
  };

  const PaymentStatusBadge = ({ status }) => {
    let bgColor = '';
    let textColor = '';
    let label = '';

    switch (status) {
      case 'paid':
        bgColor = 'bg-green-100';
        textColor = 'text-green-800';
        label = 'Terbayar';
        break;
      case 'pending':
        bgColor = 'bg-yellow-100';
        textColor = 'text-yellow-800';
        label = 'Menunggu Pembayaran';
        break;
      case 'failed':
        bgColor = 'bg-red-100';
        textColor = 'text-red-800';
        label = 'Gagal';
        break;
      default:
        bgColor = 'bg-gray-100';
        textColor = 'text-gray-800';
        label = 'Lainnya';
    }

    return (
      <span
        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${bgColor} ${textColor}`}
      >
        {label}
      </span>
    );
  };

  return (
    <FreelancerLayout
      title='Detail Pembayaran'
      subtitle='Informasi lengkap mengenai pembayaran'
    >
      <div className='bg-white shadow-sm rounded-xl overflow-hidden mb-6'>
        <div className='p-6 border-b border-gray-200'>
          <div className='flex flex-col md:flex-row md:items-center md:justify-between'>
            <div>
              <h2 className='text-xl font-bold text-gray-900'>
                {earning.project.title}
              </h2>
              <p className='mt-1 text-sm text-gray-500'>
                Invoice #{earning.invoiceNumber}
              </p>
            </div>
            <div className='mt-4 md:mt-0 flex flex-col sm:flex-row gap-3'>
              <button
                onClick={handleDownloadInvoice}
                className='inline-flex items-center justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='h-4 w-4 mr-2'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z'
                  />
                </svg>
                Download Invoice
              </button>
              <Link
                href='/freelancer/messages'
                className='inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='h-4 w-4 mr-2'
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
                Hubungi Klien
              </Link>
            </div>
          </div>
        </div>

        <div className='border-b border-gray-200'>
          <nav className='flex -mb-px'>
            <button
              className={`py-4 px-6 text-sm font-medium ${
                activeTab === 'overview'
                  ? 'text-indigo-600 border-b-2 border-indigo-500'
                  : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
              onClick={() => setActiveTab('overview')}
            >
              Ringkasan
            </button>
            <button
              className={`py-4 px-6 text-sm font-medium ${
                activeTab === 'transactions'
                  ? 'text-indigo-600 border-b-2 border-indigo-500'
                  : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
              onClick={() => setActiveTab('transactions')}
            >
              Transaksi
            </button>
            <button
              className={`py-4 px-6 text-sm font-medium ${
                activeTab === 'client'
                  ? 'text-indigo-600 border-b-2 border-indigo-500'
                  : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
              onClick={() => setActiveTab('client')}
            >
              Informasi Klien
            </button>
          </nav>
        </div>

        {activeTab === 'overview' && (
          <div className='p-6'>
            <div className='mb-8'>
              <h3 className='text-lg font-medium text-gray-900 mb-4'>
                Detail Pembayaran
              </h3>
              <div className='bg-gray-50 p-4 rounded-lg'>
                <dl className='grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-5'>
                  <div>
                    <dt className='text-sm font-medium text-gray-500'>
                      Status Pembayaran
                    </dt>
                    <dd className='mt-1 text-sm text-gray-900'>
                      <PaymentStatusBadge status={earning.status} />
                    </dd>
                  </div>
                  <div>
                    <dt className='text-sm font-medium text-gray-500'>
                      Tanggal Pembayaran
                    </dt>
                    <dd className='mt-1 text-sm text-gray-900'>
                      {formatDate(earning.paymentDate)}
                    </dd>
                  </div>
                  <div>
                    <dt className='text-sm font-medium text-gray-500'>
                      Metode Pembayaran
                    </dt>
                    <dd className='mt-1 text-sm text-gray-900'>
                      {earning.paymentMethod === 'bank_transfer'
                        ? 'Transfer Bank'
                        : earning.paymentMethod}
                    </dd>
                  </div>
                  <div>
                    <dt className='text-sm font-medium text-gray-500'>
                      ID Transaksi
                    </dt>
                    <dd className='mt-1 text-sm text-gray-900'>
                      {earning.transactionId}
                    </dd>
                  </div>
                </dl>
              </div>
            </div>

            <div className='mb-8'>
              <h3 className='text-lg font-medium text-gray-900 mb-4'>
                Ringkasan Pembayaran
              </h3>
              <div className='bg-gray-50 p-4 rounded-lg'>
                <dl className='space-y-3'>
                  <div className='flex justify-between'>
                    <dt className='text-sm font-medium text-gray-500'>
                      Total Pembayaran
                    </dt>
                    <dd className='text-sm font-medium text-gray-900'>
                      {formatRupiah(earning.amount)}
                    </dd>
                  </div>
                  <div className='flex justify-between'>
                    <dt className='text-sm font-medium text-gray-500'>
                      Pajak Penghasilan (10%)
                    </dt>
                    <dd className='text-sm font-medium text-gray-900'>
                      - {formatRupiah(earning.tax)}
                    </dd>
                  </div>
                  <div className='flex justify-between'>
                    <dt className='text-sm font-medium text-gray-500'>
                      Biaya Layanan (5%)
                    </dt>
                    <dd className='text-sm font-medium text-gray-900'>
                      - {formatRupiah(earning.serviceFee)}
                    </dd>
                  </div>
                  <div className='border-t border-gray-200 pt-3 flex justify-between'>
                    <dt className='text-base font-bold text-gray-900'>
                      Total Diterima
                    </dt>
                    <dd className='text-base font-bold text-green-600'>
                      {formatRupiah(earning.netAmount)}
                    </dd>
                  </div>
                </dl>
              </div>
            </div>

            <div>
              <h3 className='text-lg font-medium text-gray-900 mb-4'>
                Detail Proyek
              </h3>
              <div className='bg-gray-50 p-4 rounded-lg'>
                <dl className='grid grid-cols-1 gap-y-3'>
                  <div>
                    <dt className='text-sm font-medium text-gray-500'>
                      Judul Proyek
                    </dt>
                    <dd className='mt-1 text-sm text-gray-900'>
                      {earning.project.title}
                    </dd>
                  </div>
                  <div>
                    <dt className='text-sm font-medium text-gray-500'>
                      Deskripsi
                    </dt>
                    <dd className='mt-1 text-sm text-gray-900'>
                      {earning.project.description}
                    </dd>
                  </div>
                  <div className='grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-3'>
                    <div>
                      <dt className='text-sm font-medium text-gray-500'>
                        Tanggal Mulai
                      </dt>
                      <dd className='mt-1 text-sm text-gray-900'>
                        {formatDate(earning.project.startDate)}
                      </dd>
                    </div>
                    <div>
                      <dt className='text-sm font-medium text-gray-500'>
                        Tanggal Selesai
                      </dt>
                      <dd className='mt-1 text-sm text-gray-900'>
                        {formatDate(earning.project.endDate)}
                      </dd>
                    </div>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'transactions' && (
          <div className='p-6'>
            <h3 className='text-lg font-medium text-gray-900 mb-4'>
              Riwayat Transaksi
            </h3>
            <div className='overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg'>
              <table className='min-w-full divide-y divide-gray-300'>
                <thead className='bg-gray-50'>
                  <tr>
                    <th
                      scope='col'
                      className='py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6'
                    >
                      Deskripsi
                    </th>
                    <th
                      scope='col'
                      className='px-3 py-3.5 text-left text-sm font-semibold text-gray-900'
                    >
                      Tanggal
                    </th>
                    <th
                      scope='col'
                      className='px-3 py-3.5 text-left text-sm font-semibold text-gray-900'
                    >
                      Status
                    </th>
                    <th
                      scope='col'
                      className='px-3 py-3.5 text-right text-sm font-semibold text-gray-900'
                    >
                      Jumlah
                    </th>
                  </tr>
                </thead>
                <tbody className='divide-y divide-gray-200 bg-white'>
                  {earning.transactions.map(transaction => (
                    <tr key={transaction.id}>
                      <td className='whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6'>
                        {transaction.description}
                      </td>
                      <td className='whitespace-nowrap px-3 py-4 text-sm text-gray-500'>
                        {formatDate(transaction.date)}
                      </td>
                      <td className='whitespace-nowrap px-3 py-4 text-sm text-gray-500'>
                        <PaymentStatusBadge status={transaction.status} />
                      </td>
                      <td className='whitespace-nowrap px-3 py-4 text-sm font-medium text-gray-900 text-right'>
                        {formatRupiah(transaction.amount)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'client' && (
          <div className='p-6'>
            <h3 className='text-lg font-medium text-gray-900 mb-4'>
              Informasi Klien
            </h3>
            <div className='bg-gray-50 p-4 rounded-lg'>
              <div className='flex items-center mb-6'>
                <img
                  src={earning.client.image}
                  alt={earning.client.name}
                  className='h-16 w-16 rounded-full'
                />
                <div className='ml-4'>
                  <h4 className='text-lg font-medium text-gray-900'>
                    {earning.client.name}
                  </h4>
                  <Link
                    href={`/freelancer/clients/${earning.client.id}`}
                    className='text-sm text-indigo-600 hover:text-indigo-700'
                  >
                    Lihat Profil
                  </Link>
                </div>
              </div>

              <dl className='grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-3'>
                <div>
                  <dt className='text-sm font-medium text-gray-500'>Email</dt>
                  <dd className='mt-1 text-sm text-gray-900'>
                    {earning.client.contact}
                  </dd>
                </div>
                <div>
                  <dt className='text-sm font-medium text-gray-500'>Telepon</dt>
                  <dd className='mt-1 text-sm text-gray-900'>
                    {earning.client.phone}
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        )}
      </div>
    </FreelancerLayout>
  );
};

export default EarningsDetail;
