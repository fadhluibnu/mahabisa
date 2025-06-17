import React, { useState } from 'react';
import { Link } from '@inertiajs/react';
import FreelancerLayout from './Components/FreelancerLayout';

const Messages = () => {
  const [activeConversation, setActiveConversation] = useState(null);
  const [messageInput, setMessageInput] = useState('');

  // Dummy data for conversations
  const conversations = [
    {
      id: 1,
      client: {
        name: 'Budi Santoso',
        company: 'PT Maju Bersama',
        image:
          'https://ui-avatars.com/api/?name=Budi+Santoso&background=6366f1&color=fff',
        online: true,
      },
      lastMessage: {
        text: 'Bagaimana progres redesain website e-commerce kami?',
        time: '10:25',
        unread: true,
      },
      messages: [
        {
          id: 1,
          sender: 'client',
          text: 'Halo, apa kabar?',
          time: '09:30',
        },
        {
          id: 2,
          sender: 'freelancer',
          text: 'Baik, terima kasih. Ada yang bisa saya bantu?',
          time: '09:32',
        },
        {
          id: 3,
          sender: 'client',
          text: 'Saya ingin menanyakan tentang redesain website e-commerce kami.',
          time: '09:35',
        },
        {
          id: 4,
          sender: 'freelancer',
          text: 'Baik, apa yang ingin Anda ketahui?',
          time: '09:40',
        },
        {
          id: 5,
          sender: 'client',
          text: 'Bagaimana progres redesain website e-commerce kami?',
          time: '10:25',
        },
      ],
    },
    {
      id: 2,
      client: {
        name: 'Diana Putri',
        company: 'StartUp Inovasi',
        image:
          'https://ui-avatars.com/api/?name=Diana+Putri&background=ec4899&color=fff',
        online: false,
      },
      lastMessage: {
        text: 'Baik, ditunggu update-nya ya.',
        time: '9:15',
        unread: false,
      },
      messages: [
        {
          id: 1,
          sender: 'client',
          text: 'Halo, apa kabar?',
          time: '08:30',
        },
        {
          id: 2,
          sender: 'freelancer',
          text: 'Baik, terima kasih. Bagaimana dengan Anda?',
          time: '08:35',
        },
        {
          id: 3,
          sender: 'client',
          text: 'Baik juga. Saya ingin bertanya tentang progress aplikasi mobile kami.',
          time: '08:40',
        },
        {
          id: 4,
          sender: 'freelancer',
          text: 'Saat ini saya sedang mengerjakan fitur login dan register. Saya akan mengirimkan update progress besok.',
          time: '09:00',
        },
        {
          id: 5,
          sender: 'client',
          text: 'Baik, ditunggu update-nya ya.',
          time: '09:15',
        },
      ],
    },
    {
      id: 3,
      client: {
        name: 'Ahmad Rizal',
        company: 'Toko Online Sejahtera',
        image:
          'https://ui-avatars.com/api/?name=Ahmad+Rizal&background=8b5cf6&color=fff',
        online: true,
      },
      lastMessage: {
        text: 'Saya sudah mengirimkan dokumen yang Anda minta.',
        time: 'Kemarin',
        unread: false,
      },
      messages: [
        {
          id: 1,
          sender: 'freelancer',
          text: 'Untuk integrasi payment gateway, saya membutuhkan dokumen API key dan merchant ID.',
          time: '14:30',
        },
        {
          id: 2,
          sender: 'client',
          text: 'Baik, saya akan cek dulu.',
          time: '15:00',
        },
        {
          id: 3,
          sender: 'client',
          text: 'Saya sudah mengirimkan dokumen yang Anda minta.',
          time: '16:45',
        },
      ],
    },
  ];

  const handleSendMessage = () => {
    if (messageInput.trim() === '' || !activeConversation) return;

    // In a real app, you would send this to the backend
    console.log('Sending message:', messageInput);

    // Clear the input
    setMessageInput('');
  };

  return (
    <FreelancerLayout
      title='Pesan'
      subtitle='Kelola komunikasi dengan klien Anda'
    >
      <div className='bg-white rounded-xl shadow-sm overflow-hidden'>
        <div className='flex h-[calc(100vh-220px)]'>
          {/* Conversations list */}
          <div className='w-full md:w-1/3 border-r border-gray-200'>
            <div className='p-4 border-b border-gray-200'>
              <div className='relative'>
                <input
                  type='text'
                  placeholder='Cari pesan...'
                  className='w-full pl-10 pr-4 py-2 bg-gray-100 border border-transparent rounded-lg focus:outline-none focus:bg-white focus:border-indigo-300'
                />
                <svg
                  className='absolute left-3 top-2.5 h-5 w-5 text-gray-400'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
                  />
                </svg>
              </div>
            </div>

            <div className='overflow-y-auto h-[calc(100vh-280px)]'>
              {' '}
              {conversations.map(conversation => (
                <Link
                  key={conversation.id}
                  href={`/freelancer/messages/${conversation.id}`}
                  className={`p-4 block transition hover:bg-gray-50 ${
                    activeConversation &&
                    activeConversation.id === conversation.id
                      ? 'bg-indigo-50'
                      : ''
                  }`}
                >
                  <div className='flex items-start'>
                    <div className='relative mr-3'>
                      <img
                        className='w-12 h-12 rounded-full'
                        src={conversation.client.image}
                        alt={conversation.client.name}
                      />
                      {conversation.client.online && (
                        <span className='absolute bottom-0 right-0 w-3 h-3 bg-green-400 rounded-full border-2 border-white'></span>
                      )}
                    </div>
                    <div className='flex-1 min-w-0'>
                      <div className='flex justify-between items-center mb-1'>
                        <h4 className='text-sm font-medium text-gray-900 truncate'>
                          {conversation.client.name}
                        </h4>
                        <span className='text-xs text-gray-500'>
                          {conversation.lastMessage.time}
                        </span>
                      </div>
                      <p className='text-xs text-gray-500 truncate'>
                        {conversation.client.company}
                      </p>
                      <div className='flex justify-between items-center mt-1'>
                        <p
                          className={`text-sm truncate ${
                            conversation.lastMessage.unread
                              ? 'font-medium text-gray-900'
                              : 'text-gray-500'
                          }`}
                        >
                          {conversation.lastMessage.text}
                        </p>
                        {conversation.lastMessage.unread && (
                          <span className='w-2 h-2 bg-indigo-600 rounded-full'></span>
                        )}
                      </div>{' '}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Message content */}
          <div className='hidden md:flex md:flex-col md:w-2/3'>
            {activeConversation ? (
              <>
                {/* Chat header */}
                <div className='p-4 border-b border-gray-200 flex items-center'>
                  <div className='relative mr-3'>
                    <img
                      className='w-10 h-10 rounded-full'
                      src={activeConversation.client.image}
                      alt={activeConversation.client.name}
                    />
                    {activeConversation.client.online && (
                      <span className='absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-400 rounded-full border-2 border-white'></span>
                    )}
                  </div>
                  <div className='flex-1 min-w-0'>
                    <h4 className='text-sm font-medium text-gray-900'>
                      {activeConversation.client.name}
                    </h4>
                    <p className='text-xs text-gray-500'>
                      {activeConversation.client.company}
                    </p>
                  </div>
                  <div className='flex'>
                    <button className='text-gray-400 hover:text-gray-600 p-2'>
                      <svg
                        className='h-5 w-5'
                        fill='none'
                        stroke='currentColor'
                        viewBox='0 0 24 24'
                        xmlns='http://www.w3.org/2000/svg'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth={2}
                          d='M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z'
                        />
                      </svg>
                    </button>
                    <button className='text-gray-400 hover:text-gray-600 p-2'>
                      <svg
                        className='h-5 w-5'
                        fill='none'
                        stroke='currentColor'
                        viewBox='0 0 24 24'
                        xmlns='http://www.w3.org/2000/svg'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth={2}
                          d='M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z'
                        />
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Messages */}
                <div className='flex-1 overflow-y-auto p-4 bg-gray-50'>
                  {activeConversation.messages.map(message => (
                    <div
                      key={message.id}
                      className={`mb-4 flex ${
                        message.sender === 'freelancer'
                          ? 'justify-end'
                          : 'justify-start'
                      }`}
                    >
                      {message.sender === 'client' && (
                        <div className='mr-2'>
                          <img
                            className='w-8 h-8 rounded-full'
                            src={activeConversation.client.image}
                            alt={activeConversation.client.name}
                          />
                        </div>
                      )}
                      <div
                        className={`max-w-[70%] px-4 py-2 rounded-lg ${
                          message.sender === 'freelancer'
                            ? 'bg-indigo-600 text-white'
                            : 'bg-white text-gray-800 border border-gray-200'
                        }`}
                      >
                        <p className='text-sm'>{message.text}</p>
                        <span
                          className={`text-xs block text-right mt-1 ${
                            message.sender === 'freelancer'
                              ? 'text-indigo-100'
                              : 'text-gray-500'
                          }`}
                        >
                          {message.time}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Input field */}
                <div className='p-4 border-t border-gray-200'>
                  <div className='flex items-center'>
                    <button className='text-gray-400 hover:text-gray-600 mr-2'>
                      <svg
                        className='h-6 w-6'
                        fill='none'
                        stroke='currentColor'
                        viewBox='0 0 24 24'
                        xmlns='http://www.w3.org/2000/svg'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth={2}
                          d='M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13'
                        />
                      </svg>
                    </button>
                    <input
                      type='text'
                      placeholder='Ketik pesan...'
                      className='flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-indigo-400'
                      value={messageInput}
                      onChange={e => setMessageInput(e.target.value)}
                      onKeyPress={e => {
                        if (e.key === 'Enter') {
                          handleSendMessage();
                        }
                      }}
                    />
                    <button
                      className='ml-2 bg-indigo-600 text-white rounded-lg p-2 hover:bg-indigo-700'
                      onClick={handleSendMessage}
                    >
                      <svg
                        className='h-5 w-5'
                        fill='none'
                        stroke='currentColor'
                        viewBox='0 0 24 24'
                        xmlns='http://www.w3.org/2000/svg'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth={2}
                          d='M12 19l9 2-9-18-9 18 9-2zm0 0v-8'
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div className='flex-1 flex items-center justify-center'>
                <div className='text-center p-6'>
                  <svg
                    className='h-16 w-16 text-gray-300 mx-auto mb-4'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={1}
                      d='M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z'
                    />
                  </svg>
                  <h3 className='text-lg font-medium text-gray-900 mb-1'>
                    Pesan Anda
                  </h3>
                  <p className='text-gray-500'>
                    Pilih percakapan untuk mulai berkomunikasi dengan klien Anda
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </FreelancerLayout>
  );
};

export default Messages;
