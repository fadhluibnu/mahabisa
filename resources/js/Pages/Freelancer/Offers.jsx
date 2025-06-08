import React, { useState } from 'react';
import FreelancerLayout from './Components/FreelancerLayout';

const Offers = () => {
  const [offers, setOffers] = useState([
    {
      id: 1,
      projectTitle: 'Website E-Commerce Pakaian',
      client: {
        name: 'PT Fashion Indonesia',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      },
      budget: 5000000,
      deadline: '2025-06-30',
      description: 'Membutuhkan website e-commerce untuk bisnis pakaian dengan fitur keranjang belanja, pembayaran online, dan manajemen inventaris.',
      status: 'pending',
      date: '2025-05-28',
      isNew: true,
    },
    {
      id: 2,
      projectTitle: 'Aplikasi Mobile Delivery',
      client: {
        name: 'Antar Cepat',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      },
      budget: 8000000,
      deadline: '2025-07-15',
      description: 'Pengembangan aplikasi mobile untuk layanan pengiriman barang dengan fitur tracking real-time, pembayaran digital, dan notifikasi.',
      status: 'pending',
      date: '2025-05-27',
      isNew: true,
    },
    {
      id: 3,
      projectTitle: 'Redesign Website Perusahaan',
      client: {
        name: 'Konstruksi Utama',
        avatar: 'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      },
      budget: 3500000,
      deadline: '2025-06-15',
      description: 'Redesign website perusahaan konstruksi untuk tampilan yang lebih modern, responsive, dan user-friendly.',
      status: 'accepted',
      date: '2025-05-20',
      isNew: false,
    },
    {
      id: 4,
      projectTitle: 'Logo dan Branding untuk Startup',
      client: {
        name: 'TechNow',
        avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      },
      budget: 2000000,
      deadline: '2025-06-05',
      description: 'Desain logo dan branding lengkap untuk startup teknologi yang berfokus pada solusi IoT.',
      status: 'declined',
      date: '2025-05-15',
      isNew: false,
    },
  ]);

  const [activeTab, setActiveTab] = useState('all');
  const [selectedOffer, setSelectedOffer] = useState(null);
  const [isPreparingResponse, setIsPreparingResponse] = useState(false);
  const [responseData, setResponseData] = useState({
    price: '',
    deliveryTime: '',
    message: '',
  });
  // Filter offers based on active tab
  const filteredOffers = offers.filter((offer) => {
    if (activeTab === 'all') return true;
    return offer.status === activeTab;
  });

  // Directly accept offer without modal
  const handleAcceptOffer = (offer) => {
    // Update offer status directly
    setOffers(
      offers.map((o) =>
        o.id === offer.id
          ? { ...o, status: 'accepted', isNew: false }
          : o
      )
    );
    
    // In a real app, you would send an API request here
    console.log(`Offer ${offer.id} accepted with default message`);
  };

  // Directly decline offer without modal
  const handleDeclineOffer = (offer) => {
    // Update offer status directly
    setOffers(
      offers.map((o) =>
        o.id === offer.id
          ? { ...o, status: 'declined', isNew: false }
          : o
      )
    );
    
    // In a real app, you would send an API request here
    console.log(`Offer ${offer.id} declined with default message`);
  };

  // Handle preparing response for acceptance (with modal) - keeping for future use
  const handlePrepareResponse = (offer) => {
    setSelectedOffer(offer);
    setResponseData({
      price: offer.budget,
      deliveryTime: new Date(offer.deadline).toISOString().split('T')[0],
      message: `Terima kasih atas penawaran proyeknya. Saya tertarik untuk mengerjakan proyek "${offer.projectTitle}" dan siap membantu Anda mewujudkannya sesuai kebutuhan.`,
    });
    setIsPreparingResponse(true);
  };

  // Handle preparing response for rejection (with modal) - keeping for future use
  const handlePrepareRejection = (offer) => {
    setSelectedOffer(offer);
    setResponseData({
      price: offer.budget,
      deliveryTime: new Date(offer.deadline).toISOString().split('T')[0],
      message: `Terima kasih atas penawaran proyeknya. Namun, saya tidak dapat menerima proyek "${offer.projectTitle}" saat ini karena jadwal yang padat.`,
    });
    setIsPreparingResponse(true);
  };

  // Handle sending the final response (accept or decline)
  const handleSendResponse = (action) => {
    // Update the offer status in the state
    setOffers(
      offers.map((o) =>
        o.id === selectedOffer.id
          ? { ...o, status: action, isNew: false }
          : o
      )
    );
    
    // In a real app, you would send an API request here
    console.log(`Offer ${selectedOffer.id} ${action === 'accepted' ? 'accepted' : 'declined'} with message: ${responseData.message}`);
    
    // Close the modal and reset selection
    setIsPreparingResponse(false);
    setSelectedOffer(null);
  };

  // Format date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('id-ID', options);
  };

  // Format price to Rupiah
  const formatRupiah = (price) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  // Get status badge
  const getStatusBadge = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'accepted':
        return 'bg-green-100 text-green-800';
      case 'declined':
        return 'bg-red-100 text-red-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Get status text
  const getStatusText = (status) => {
    switch (status) {
      case 'pending':
        return 'Menunggu';
      case 'accepted':
        return 'Diterima';
      case 'declined':
        return 'Ditolak';
      case 'completed':
        return 'Selesai';
      default:
        return 'Unknown';
    }
  };

  return (
    <FreelancerLayout
      title="Penawaran Proyek"
      subtitle="Kelola penawaran proyek dari klien"
    >
      {/* Tabs */}
      <div className="mb-6 border-b border-gray-200">
        <nav className="-mb-px flex space-x-8" aria-label="Tabs">
          <button
            onClick={() => setActiveTab('all')}
            className={`${
              activeTab === 'all'
                ? 'border-indigo-500 text-indigo-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
          >
            Semua
            <span className="ml-2 py-0.5 px-2 rounded-full text-xs bg-gray-100 text-gray-700">
              {offers.length}
            </span>
          </button>
          <button
            onClick={() => setActiveTab('pending')}
            className={`${
              activeTab === 'pending'
                ? 'border-indigo-500 text-indigo-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
          >
            Menunggu
            <span className="ml-2 py-0.5 px-2 rounded-full text-xs bg-yellow-100 text-yellow-700">
              {offers.filter((o) => o.status === 'pending').length}
            </span>
          </button>
          <button
            onClick={() => setActiveTab('accepted')}
            className={`${
              activeTab === 'accepted'
                ? 'border-indigo-500 text-indigo-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
          >
            Diterima
            <span className="ml-2 py-0.5 px-2 rounded-full text-xs bg-green-100 text-green-700">
              {offers.filter((o) => o.status === 'accepted').length}
            </span>
          </button>
          <button
            onClick={() => setActiveTab('declined')}
            className={`${
              activeTab === 'declined'
                ? 'border-indigo-500 text-indigo-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
          >
            Ditolak
            <span className="ml-2 py-0.5 px-2 rounded-full text-xs bg-red-100 text-red-700">
              {offers.filter((o) => o.status === 'declined').length}
            </span>
          </button>
        </nav>
      </div>

      {/* Offers list */}
      <div className="space-y-4">
        {filteredOffers.length > 0 ? (
          filteredOffers.map((offer) => (
            <div
              key={offer.id}
              className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
            >
              <div className="p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between">
                  <div className="flex-1">
                    <div className="flex items-center">
                      <h3 className="text-lg font-medium text-gray-900">{offer.projectTitle}</h3>
                      {offer.isNew && (
                        <span className="ml-2 px-2 py-0.5 text-xs rounded-full bg-red-100 text-red-800">
                          Baru
                        </span>
                      )}
                      <span
                        className={`ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadge(
                          offer.status
                        )}`}
                      >
                        {getStatusText(offer.status)}
                      </span>
                    </div>
                    <div className="mt-1 flex items-center">
                      <img
                        src={offer.client.avatar}
                        alt={offer.client.name}
                        className="h-6 w-6 rounded-full"
                      />
                      <span className="ml-2 text-sm text-gray-500">{offer.client.name}</span>
                    </div>
                    <p className="mt-3 text-sm text-gray-700">{offer.description}</p>
                    
                    <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-2">
                      <div>
                        <span className="text-xs text-gray-500">Budget:</span>
                        <p className="text-sm font-medium text-gray-900">{formatRupiah(offer.budget)}</p>
                      </div>
                      <div>
                        <span className="text-xs text-gray-500">Deadline:</span>
                        <p className="text-sm font-medium text-gray-900">{formatDate(offer.deadline)}</p>
                      </div>
                      <div>
                        <span className="text-xs text-gray-500">Tanggal Penawaran:</span>
                        <p className="text-sm font-medium text-gray-900">{formatDate(offer.date)}</p>
                      </div>
                    </div>
                  </div>                  {offer.status === 'pending' && (
                    <div className="mt-4 sm:mt-0 sm:ml-4 flex sm:flex-col sm:space-y-2 space-x-2 sm:space-x-0">                      <button                        onClick={(e) => {
                          e.stopPropagation(); // Prevent event bubbling
                          e.preventDefault(); // Prevent default behavior
                          console.log('Accept button clicked for offer:', offer.id);
                          handleAcceptOffer(offer);
                        }}
                        className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 cursor-pointer z-10"
                        type="button"
                      >
                        <svg
                          className="h-4 w-4 mr-1"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        Terima
                      </button>                      <button
                        onClick={(e) => {
                          e.stopPropagation(); // Prevent event bubbling
                          e.preventDefault(); // Prevent default behavior
                          console.log('Decline button clicked for offer:', offer.id);
                          handleDeclineOffer(offer);
                        }}
                        className="inline-flex items-center px-3 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 cursor-pointer z-10"
                        type="button"
                      >
                        <svg
                          className="h-4 w-4 mr-1"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                        Tolak
                      </button>
                    </div>
                  )}                  {offer.status === 'accepted' && (
                    <div className="mt-4 sm:mt-0 sm:ml-4">                      <a
                        href={`/freelancer/projects/${offer.id}`}
                        className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 cursor-pointer z-10"
                      >
                        <svg
                          className="h-4 w-4 mr-1"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                        Lihat Proyek
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6"
              />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900">Tidak ada penawaran</h3>
            <p className="mt-1 text-sm text-gray-500">
              Tidak ada penawaran proyek dengan status ini saat ini.
            </p>
          </div>
        )}
      </div>

      {/* Response modal */}
      {isPreparingResponse && selectedOffer && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                    <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                      {responseData.message.includes("tertarik") ? "Terima Penawaran" : "Tolak Penawaran"}
                    </h3>
                    <div className="mt-4">
                      <div className="mb-4">
                        <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                          Harga Penawaran (Rp)
                        </label>
                        <input
                          type="number"
                          id="price"
                          value={responseData.price}
                          onChange={(e) => setResponseData({ ...responseData, price: e.target.value })}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                      </div>
                      <div className="mb-4">
                        <label htmlFor="deliveryTime" className="block text-sm font-medium text-gray-700">
                          Estimasi Selesai
                        </label>
                        <input
                          type="date"
                          id="deliveryTime"
                          value={responseData.deliveryTime}
                          onChange={(e) => setResponseData({ ...responseData, deliveryTime: e.target.value })}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                          disabled={responseData.message.includes("tidak dapat menerima")}
                        />
                      </div>
                      <div className="mb-4">
                        <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                          Pesan
                        </label>
                        <textarea
                          id="message"
                          rows={4}
                          value={responseData.message}
                          onChange={(e) => setResponseData({ ...responseData, message: e.target.value })}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  onClick={() => handleSendResponse(responseData.message.includes("tertarik") ? 'accepted' : 'declined')}
                  className={`w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 ${
                    responseData.message.includes("tertarik") 
                      ? 'bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500' 
                      : 'bg-red-600 hover:bg-red-700 focus:ring-red-500'
                  } text-base font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm`}
                >
                  {responseData.message.includes("tertarik") ? 'Terima Penawaran' : 'Tolak Penawaran'}
                </button>
                <button
                  type="button"
                  onClick={() => setIsPreparingResponse(false)}
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Batal
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </FreelancerLayout>
  );
};

export default Offers;
