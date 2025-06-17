import React, { useState, useRef, useEffect } from 'react';
import { Link } from '@inertiajs/react';
import FreelancerLayout from './Components/FreelancerLayout';

const MessageDetail = () => {
  const [message, setMessage] = useState('');
  const [isAttaching, setIsAttaching] = useState(false);
  const [attachments, setAttachments] = useState([]);
  const messagesEndRef = useRef(null);

  // This would be fetched from the backend in a real application
  const [conversation, setConversation] = useState({
    id: 1,
    client: {
      id: 101,
      name: 'Budi Santoso',
      company: 'PT Maju Bersama',
      image:
        'https://ui-avatars.com/api/?name=Budi+Santoso&background=6366f1&color=fff',
      online: true,
      lastSeen: '5 menit yang lalu',
    },
    project: {
      id: 201,
      title: 'Redesain Website E-commerce',
      status: 'in-progress',
      deadline: '2023-07-15',
    },
    messages: [
      {
        id: 1,
        sender: 'client',
        text: 'Halo, apa kabar?',
        time: '09:30',
        date: '2023-06-10',
      },
      {
        id: 2,
        sender: 'freelancer',
        text: 'Baik, terima kasih. Ada yang bisa saya bantu?',
        time: '09:32',
        date: '2023-06-10',
      },
      {
        id: 3,
        sender: 'client',
        text: 'Saya ingin menanyakan tentang redesain website e-commerce kami.',
        time: '09:35',
        date: '2023-06-10',
      },
      {
        id: 4,
        sender: 'freelancer',
        text: 'Baik, apa yang ingin Anda ketahui?',
        time: '09:40',
        date: '2023-06-10',
      },
      {
        id: 5,
        sender: 'client',
        text: 'Bagaimana progres redesain website e-commerce kami?',
        time: '10:25',
        date: '2023-06-10',
      },
      {
        id: 6,
        sender: 'client',
        text: 'Apakah ada kendala yang dihadapi?',
        time: '10:26',
        date: '2023-06-10',
      },
      {
        id: 7,
        sender: 'freelancer',
        text: 'Progres saat ini sudah mencapai 70%. Saya sedang mengerjakan bagian checkout dan payment integration. Sejauh ini tidak ada kendala yang signifikan. Saya akan mengirimkan update visual besok.',
        time: '10:30',
        date: '2023-06-10',
      },
      {
        id: 8,
        sender: 'client',
        text: 'Baik, terima kasih atas updatenya. Saya tunggu update visualnya besok.',
        time: '10:35',
        date: '2023-06-10',
      },
      {
        id: 9,
        sender: 'client',
        text: 'Oh ya, untuk bagian product filtering, tolong ditambahkan filter berdasarkan ukuran juga ya.',
        time: '10:36',
        date: '2023-06-10',
        attachment: {
          type: 'image',
          url: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
          name: 'filter_example.jpg',
        },
      },
      {
        id: 10,
        sender: 'freelancer',
        text: 'Siap, akan saya tambahkan filter berdasarkan ukuran. Terima kasih atas contohnya.',
        time: '10:40',
        date: '2023-06-10',
      },
    ],
  });

  // Scroll to bottom of messages
  useEffect(() => {
    scrollToBottom();
  }, [conversation.messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = () => {
    if (message.trim() || attachments.length > 0) {
      const newMessage = {
        id: Date.now(),
        sender: 'freelancer',
        text: message,
        time: new Date().toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        }),
        date: new Date().toISOString().split('T')[0],
        attachments: attachments.length > 0 ? [...attachments] : undefined,
      };

      setConversation({
        ...conversation,
        messages: [...conversation.messages, newMessage],
      });

      setMessage('');
      setAttachments([]);
      setIsAttaching(false);
    }
  };

  const handleKeyPress = e => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleFileChange = e => {
    const files = Array.from(e.target.files);

    // Create preview URLs for the files
    const newAttachments = files.map(file => ({
      name: file.name,
      type: file.type.startsWith('image/') ? 'image' : 'file',
      size: file.size,
      url: URL.createObjectURL(file),
    }));

    setAttachments([...attachments, ...newAttachments]);
  };

  const removeAttachment = index => {
    const newAttachments = [...attachments];
    URL.revokeObjectURL(newAttachments[index].url);
    newAttachments.splice(index, 1);
    setAttachments(newAttachments);

    if (newAttachments.length === 0) {
      setIsAttaching(false);
    }
  };

  const formatFileSize = bytes => {
    if (bytes < 1024) return bytes + ' B';
    else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
    else return (bytes / 1048576).toFixed(1) + ' MB';
  };

  // Group messages by date
  const groupMessagesByDate = () => {
    const groups = {};

    conversation.messages.forEach(message => {
      if (!groups[message.date]) {
        groups[message.date] = [];
      }
      groups[message.date].push(message);
    });

    return groups;
  };

  const formatDate = dateString => {
    const options = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };
    return new Date(dateString).toLocaleDateString('id-ID', options);
  };

  return (
    <FreelancerLayout title='Pesan' subtitle='Komunikasi dengan klien Anda'>
      <div className='grid grid-cols-1 md:grid-cols-4 gap-6'>
        {/* Sidebar - Conversation List */}
        <div className='md:col-span-1'>
          <div className='bg-white shadow-sm rounded-xl overflow-hidden mb-6'>
            <div className='p-4 bg-gray-50 border-b border-gray-200'>
              <div className='relative'>
                <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                  <svg
                    className='h-5 w-5 text-gray-400'
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 20 20'
                    fill='currentColor'
                    aria-hidden='true'
                  >
                    <path
                      fillRule='evenodd'
                      d='M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z'
                      clipRule='evenodd'
                    />
                  </svg>
                </div>
                <input
                  type='text'
                  className='focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 pr-3 py-2 sm:text-sm border-gray-300 rounded-md'
                  placeholder='Cari pesan...'
                />
              </div>
            </div>

            <div className='overflow-y-auto max-h-96'>
              <Link
                href={`/freelancer/messages/1`}
                className='block px-4 py-3 border-b border-gray-100 hover:bg-gray-50 bg-indigo-50'
              >
                <div className='flex items-center space-x-3'>
                  <div className='relative flex-shrink-0'>
                    <img
                      src='https://ui-avatars.com/api/?name=Budi+Santoso&background=6366f1&color=fff'
                      alt='Budi Santoso'
                      className='h-10 w-10 rounded-full'
                    />
                    <span className='absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full ring-2 ring-white bg-green-400'></span>
                  </div>
                  <div className='min-w-0 flex-1'>
                    <div className='flex items-center justify-between'>
                      <p className='text-sm font-medium text-gray-900 truncate'>
                        Budi Santoso
                      </p>
                      <p className='text-xs text-gray-500'>10:40</p>
                    </div>
                    <p className='text-xs text-gray-500 truncate'>
                      Redesain Website E-commerce
                    </p>
                    <p className='text-xs text-gray-600 truncate'>
                      Siap, akan saya tambahkan filter berdasarkan ukuran...
                    </p>
                  </div>
                </div>
              </Link>

              <Link
                href={`/freelancer/messages/2`}
                className='block px-4 py-3 border-b border-gray-100 hover:bg-gray-50'
              >
                <div className='flex items-center space-x-3'>
                  <div className='relative flex-shrink-0'>
                    <img
                      src='https://ui-avatars.com/api/?name=Diana+Putri&background=ec4899&color=fff'
                      alt='Diana Putri'
                      className='h-10 w-10 rounded-full'
                    />
                  </div>
                  <div className='min-w-0 flex-1'>
                    <div className='flex items-center justify-between'>
                      <p className='text-sm font-medium text-gray-900 truncate'>
                        Diana Putri
                      </p>
                      <p className='text-xs text-gray-500'>Kemarin</p>
                    </div>
                    <p className='text-xs text-gray-500 truncate'>
                      Pengembangan Aplikasi Mobile
                    </p>
                    <p className='text-xs text-gray-600 truncate'>
                      Baik, ditunggu update-nya ya.
                    </p>
                  </div>
                </div>
              </Link>

              <Link
                href={`/freelancer/messages/3`}
                className='block px-4 py-3 border-b border-gray-100 hover:bg-gray-50'
              >
                <div className='flex items-center space-x-3'>
                  <div className='relative flex-shrink-0'>
                    <img
                      src='https://ui-avatars.com/api/?name=Ahmad+Rizal&background=8b5cf6&color=fff'
                      alt='Ahmad Rizal'
                      className='h-10 w-10 rounded-full'
                    />
                  </div>
                  <div className='min-w-0 flex-1'>
                    <div className='flex items-center justify-between'>
                      <p className='text-sm font-medium text-gray-900 truncate'>
                        Ahmad Rizal
                      </p>
                      <p className='text-xs text-gray-500'>08/06</p>
                    </div>
                    <p className='text-xs text-gray-500 truncate'>
                      Integrasi Payment Gateway
                    </p>
                    <p className='text-xs text-gray-600 truncate'>
                      Terima kasih atas bantuannya.
                    </p>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>

        {/* Main Content - Conversation */}
        <div className='md:col-span-3'>
          <div className='bg-white shadow-sm rounded-xl overflow-hidden mb-6 flex flex-col h-[calc(100vh-13rem)]'>
            {/* Conversation Header */}
            <div className='p-4 bg-white border-b border-gray-200 flex items-center justify-between'>
              <div className='flex items-center'>
                <div className='relative flex-shrink-0'>
                  <img
                    src={conversation.client.image}
                    alt={conversation.client.name}
                    className='h-10 w-10 rounded-full'
                  />
                  {conversation.client.online && (
                    <span className='absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full ring-2 ring-white bg-green-400'></span>
                  )}
                </div>
                <div className='ml-3'>
                  <p className='text-sm font-medium text-gray-900'>
                    {conversation.client.name}
                  </p>
                  <p className='text-xs text-gray-500'>
                    {conversation.client.online
                      ? 'Online'
                      : `Terakhir dilihat: ${conversation.client.lastSeen}`}
                  </p>
                </div>
              </div>
              <div>
                <Link
                  href={`/freelancer/projects/${conversation.project.id}`}
                  className='inline-flex items-center px-3 py-1 border border-gray-300 text-xs font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50'
                >
                  <span className='truncate max-w-[150px]'>
                    {conversation.project.title}
                  </span>
                </Link>
              </div>
            </div>

            {/* Messages */}
            <div className='flex-1 p-4 overflow-y-auto bg-gray-50'>
              {Object.entries(groupMessagesByDate()).map(([date, messages]) => (
                <div key={date}>
                  <div className='flex justify-center my-4'>
                    <span className='px-3 py-1 text-xs font-medium bg-gray-100 text-gray-700 rounded-full'>
                      {formatDate(date)}
                    </span>
                  </div>

                  {messages.map(msg => (
                    <div
                      key={msg.id}
                      className={`flex mb-4 ${
                        msg.sender === 'freelancer'
                          ? 'justify-end'
                          : 'justify-start'
                      }`}
                    >
                      {msg.sender === 'client' && (
                        <img
                          src={conversation.client.image}
                          alt={conversation.client.name}
                          className='h-8 w-8 rounded-full mr-2 self-end'
                        />
                      )}

                      <div
                        className={`max-w-[70%] ${
                          msg.sender === 'freelancer'
                            ? 'bg-indigo-600 text-white rounded-l-lg rounded-tr-lg'
                            : 'bg-white text-gray-800 rounded-r-lg rounded-tl-lg'
                        } p-3 shadow-sm`}
                      >
                        {msg.text && (
                          <p className='text-sm whitespace-pre-wrap'>
                            {msg.text}
                          </p>
                        )}

                        {msg.attachment && (
                          <div className='mt-2'>
                            {msg.attachment.type === 'image' ? (
                              <a
                                href={msg.attachment.url}
                                target='_blank'
                                rel='noopener noreferrer'
                                className='block'
                              >
                                <img
                                  src={msg.attachment.url}
                                  alt='Attachment'
                                  className='max-w-full h-auto max-h-40 rounded-md'
                                />
                                <p className='text-xs mt-1 opacity-75'>
                                  {msg.attachment.name}
                                </p>
                              </a>
                            ) : (
                              <a
                                href={msg.attachment.url}
                                target='_blank'
                                rel='noopener noreferrer'
                                className='flex items-center p-2 rounded-md bg-opacity-10 bg-gray-200'
                              >
                                <svg
                                  className='h-5 w-5 mr-2'
                                  xmlns='http://www.w3.org/2000/svg'
                                  fill='none'
                                  viewBox='0 0 24 24'
                                  stroke='currentColor'
                                >
                                  <path
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                    strokeWidth={2}
                                    d='M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z'
                                  />
                                </svg>
                                <span className='text-sm'>
                                  {msg.attachment.name}
                                </span>
                              </a>
                            )}
                          </div>
                        )}

                        {msg.attachments && msg.attachments.length > 0 && (
                          <div className='mt-2 space-y-2'>
                            {msg.attachments.map((attachment, index) => (
                              <div key={index}>
                                {attachment.type === 'image' ? (
                                  <a
                                    href={attachment.url}
                                    target='_blank'
                                    rel='noopener noreferrer'
                                    className='block'
                                  >
                                    <img
                                      src={attachment.url}
                                      alt='Attachment'
                                      className='max-w-full h-auto max-h-40 rounded-md'
                                    />
                                    <p className='text-xs mt-1 opacity-75'>
                                      {attachment.name}
                                    </p>
                                  </a>
                                ) : (
                                  <a
                                    href={attachment.url}
                                    target='_blank'
                                    rel='noopener noreferrer'
                                    className={`flex items-center p-2 rounded-md ${
                                      msg.sender === 'freelancer'
                                        ? 'bg-indigo-700'
                                        : 'bg-gray-100 text-gray-800'
                                    }`}
                                  >
                                    <svg
                                      className='h-5 w-5 mr-2'
                                      xmlns='http://www.w3.org/2000/svg'
                                      fill='none'
                                      viewBox='0 0 24 24'
                                      stroke='currentColor'
                                    >
                                      <path
                                        strokeLinecap='round'
                                        strokeLinejoin='round'
                                        strokeWidth={2}
                                        d='M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z'
                                      />
                                    </svg>
                                    <span className='text-sm'>
                                      {attachment.name}
                                    </span>
                                  </a>
                                )}
                              </div>
                            ))}
                          </div>
                        )}

                        <span
                          className={`text-xs block mt-1 ${msg.sender === 'freelancer' ? 'text-indigo-100' : 'text-gray-500'}`}
                        >
                          {msg.time}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Attachments Preview */}
            {isAttaching && attachments.length > 0 && (
              <div className='bg-gray-50 border-t border-gray-200 p-2'>
                <div className='flex flex-wrap gap-2'>
                  {attachments.map((file, index) => (
                    <div
                      key={index}
                      className='relative bg-white border border-gray-200 rounded-md p-2 w-32'
                    >
                      {file.type === 'image' ? (
                        <img
                          src={file.url}
                          alt={file.name}
                          className='h-20 w-full object-cover rounded-md'
                        />
                      ) : (
                        <div className='h-20 w-full flex items-center justify-center bg-gray-100 rounded-md'>
                          <svg
                            className='h-10 w-10 text-gray-400'
                            xmlns='http://www.w3.org/2000/svg'
                            fill='none'
                            viewBox='0 0 24 24'
                            stroke='currentColor'
                          >
                            <path
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              strokeWidth={2}
                              d='M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z'
                            />
                          </svg>
                        </div>
                      )}
                      <button
                        type='button'
                        onClick={() => removeAttachment(index)}
                        className='absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1'
                      >
                        <svg
                          className='h-3 w-3'
                          xmlns='http://www.w3.org/2000/svg'
                          fill='none'
                          viewBox='0 0 24 24'
                          stroke='currentColor'
                        >
                          <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth={2}
                            d='M6 18L18 6M6 6l12 12'
                          />
                        </svg>
                      </button>
                      <p className='text-xs truncate mt-1'>{file.name}</p>
                      <p className='text-xs text-gray-500'>
                        {formatFileSize(file.size)}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Message Input */}
            <div className='bg-white border-t border-gray-200 p-4'>
              <div className='flex items-end'>
                <div className='flex-grow'>
                  <textarea
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder='Tulis pesan Anda...'
                    className='block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                    rows={1}
                  />
                </div>
                <div className='flex ml-3'>
                  <div className='relative'>
                    <input
                      type='file'
                      id='file-upload'
                      multiple
                      onChange={handleFileChange}
                      className='sr-only'
                    />
                    <label
                      htmlFor='file-upload'
                      onClick={() => setIsAttaching(true)}
                      className='inline-flex items-center justify-center p-2 border border-transparent rounded-full text-gray-500 hover:text-gray-700 focus:outline-none'
                    >
                      <svg
                        className='h-5 w-5'
                        xmlns='http://www.w3.org/2000/svg'
                        fill='none'
                        viewBox='0 0 24 24'
                        stroke='currentColor'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth={2}
                          d='M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13'
                        />
                      </svg>
                    </label>
                  </div>
                  <button
                    type='button'
                    onClick={handleSendMessage}
                    className='inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ml-2'
                  >
                    <svg
                      className='h-5 w-5'
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 24 24'
                      stroke='currentColor'
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
            </div>
          </div>
        </div>
      </div>
    </FreelancerLayout>
  );
};

export default MessageDetail;
