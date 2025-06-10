import React, { useState } from 'react';
import ClientLayout from './Components/ClientLayout';
import { Link } from '@inertiajs/react';

const Messages = () => {
  // State for active conversation and search
  const [activeConversation, setActiveConversation] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  // Dummy data for conversations
  const conversations = [
    {
      id: 1,
      name: 'Ahmad Fauzi',
      avatar: 'https://ui-avatars.com/api/?name=Ahmad+Fauzi&background=6366f1&color=fff',
      lastMessage: 'Baik, saya akan mengirimkan desainnya segera',
      time: '10:23',
      unread: 2,
      isOnline: true,
      role: 'Graphic Designer',
      messages: [
        {
          id: 1,
          sender: 'them',
          content: 'Halo, saya sudah melihat detail proyek Anda',
          time: '10:15',
          date: 'Kemarin'
        },
        {
          id: 2,
          sender: 'you',
          content: 'Terima kasih, kapan kira-kira desain awalnya bisa saya lihat?',
          time: '10:18',
          date: 'Kemarin'
        },
        {
          id: 3,
          sender: 'them',
          content: 'Saya akan mengerjakannya hari ini, besok pagi harusnya sudah bisa saya kirimkan',
          time: '10:20',
          date: 'Kemarin'
        },
        {
          id: 4,
          sender: 'you',
          content: 'Bagus, saya tunggu ya',
          time: '10:21',
          date: 'Kemarin'
        },
        {
          id: 5,
          sender: 'them',
          content: 'Baik, saya akan mengirimkan desainnya segera',
          time: '10:23',
          date: 'Kemarin'
        }
      ]
    },    {
      id: 2,
      name: 'Siti Nurhaliza',
      avatar: 'https://ui-avatars.com/api/?name=Siti+Nurhaliza&background=f59e0b&color=fff',
      lastMessage: 'Revisi sudah saya kirim ke email Anda',
      time: '09:45',
      unread: 0,
      isOnline: false,
      role: 'Content Writer',
      messages: [
        {
          id: 1,
          sender: 'them',
          content: 'Selamat pagi, revisi artikel sudah saya selesaikan',
          time: '09:30',
          date: 'Hari Ini'
        },
        {
          id: 2,
          sender: 'you',
          content: 'Bisa tolong kirimkan ke email saya?',
          time: '09:40',
          date: 'Hari Ini'
        },
        {
          id: 3,
          sender: 'them',
          content: 'Revisi sudah saya kirim ke email Anda',
          time: '09:45',
          date: 'Hari Ini'
        }
      ]
    },    {
      id: 3,
      name: 'Budi Santoso',
      avatar: 'https://ui-avatars.com/api/?name=Budi+Santoso&background=10b981&color=fff',
      lastMessage: 'Saya akan membuat update terbaru untuk aplikasi tersebut',
      time: 'Kemarin',
      unread: 0,
      isOnline: true,
      role: 'Mobile Developer',
      messages: [
        {
          id: 1,
          sender: 'you',
          content: 'Apakah ada update untuk aplikasi mobile kita?',
          time: '19:20',
          date: 'Kemarin'
        },
        {
          id: 2,
          sender: 'them',
          content: 'Saya akan membuat update terbaru untuk aplikasi tersebut',
          time: '19:45',
          date: 'Kemarin'
        }
      ]
    },    {
      id: 4,
      name: 'Diana Putri',
      avatar: 'https://ui-avatars.com/api/?name=Diana+Putri&background=ec4899&color=fff',
      lastMessage: 'Logo sudah final, saya lampirkan file SVG dan PNG',
      time: '15 Jun',
      unread: 0,
      isOnline: false,
      role: 'Logo Designer',
      messages: [
        {
          id: 1,
          sender: 'them',
          content: 'Logo sudah final, saya lampirkan file SVG dan PNG',
          time: '15:30',
          date: '15 Jun'
        }
      ]
    },    {
      id: 5,
      name: 'Eko Prasetyo',
      avatar: 'https://ui-avatars.com/api/?name=Eko+Prasetyo&background=3b82f6&color=fff',
      lastMessage: 'Website sudah live, silakan cek dan berikan feedback',
      time: '10 Jun',
      unread: 0,
      isOnline: false,
      role: 'Web Developer',
      messages: [
        {
          id: 1,
          sender: 'them',
          content: 'Website sudah live, silakan cek dan berikan feedback',
          time: '14:20',
          date: '10 Jun'
        }
      ]
    }
  ];

  // Filtered conversations based on search term
  const filteredConversations = conversations.filter(conversation =>
    conversation.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    conversation.lastMessage.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Function to send a new message
  const [newMessage, setNewMessage] = useState('');
  const sendMessage = (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;
    
    // In a real app, you would send this to the server
    // For now, we'll just clear the input
    setNewMessage('');
  };

  return (
    <ClientLayout title="Pesan" subtitle="Kelola semua percakapan Anda dengan freelancer">
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="flex h-[75vh]">
          {/* Left sidebar - Conversation list */}
          <div className="w-1/3 border-r border-gray-200 flex flex-col">
            <div className="p-4 border-b border-gray-200">
              <div className="relative">                <input
                  type="text"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Cari percakapan..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <div className="absolute top-3 left-3 text-gray-400">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>
            </div>
            
            <div className="overflow-y-auto flex-1">
              {filteredConversations.map((conversation, index) => (
                <div
                  key={conversation.id}
                  className={`p-4 border-b border-gray-200 cursor-pointer hover:bg-gray-50 ${
                    activeConversation === index ? 'bg-teal-50' : ''
                  }`}
                >
                  <Link href={`/client/messages/${conversation.id}`} className="block">
                    <div className="flex items-center">
                      <div className="relative flex-shrink-0">
                        <img
                          src={conversation.avatar}
                          alt={conversation.name}
                          className="w-12 h-12 rounded-full object-cover"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = 'https://via.placeholder.com/40?text=' + conversation.name.charAt(0);
                          }}
                        />
                        {conversation.isOnline && (
                          <span className="absolute bottom-0 right-0 block h-3 w-3 rounded-full ring-2 ring-white bg-green-400"></span>
                        )}
                      </div>
                      <div className="ml-3 flex-1">
                        <div className="flex items-center justify-between">
                          <h3 className="text-sm font-medium">{conversation.name}</h3>
                          <p className="text-xs text-gray-500">{conversation.time}</p>
                        </div>
                        <div className="flex items-center justify-between">
                          <p className="text-xs text-gray-500 truncate" style={{ maxWidth: '150px' }}>
                            {conversation.lastMessage}
                          </p>
                          {conversation.unread > 0 && (
                            <span className="inline-flex items-center justify-center h-5 w-5 rounded-full bg-teal-500 text-white text-xs">
                              {conversation.unread}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
          
          {/* Right side - Conversation */}
          <div className="w-2/3 flex flex-col">
            {filteredConversations.length > 0 ? (
              <>
                {/* Conversation header */}
                <div className="p-4 border-b border-gray-200 flex items-center">
                  <div className="relative">
                    <img
                      src={filteredConversations[activeConversation].avatar}
                      alt={filteredConversations[activeConversation].name}
                      className="w-10 h-10 rounded-full object-cover"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = 'https://via.placeholder.com/40?text=' + filteredConversations[activeConversation].name.charAt(0);
                      }}
                    />
                    {filteredConversations[activeConversation].isOnline && (
                      <span className="absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full ring-2 ring-white bg-green-400"></span>
                    )}
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium">{filteredConversations[activeConversation].name}</h3>
                    <p className="text-xs text-gray-500">{filteredConversations[activeConversation].role}</p>
                  </div>
                  <div className="ml-auto flex">
                    <button className="text-gray-400 hover:text-gray-600 p-1">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </button>
                    <button className="text-gray-400 hover:text-gray-600 p-1 ml-2">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                      </svg>
                    </button>
                  </div>
                </div>
                
                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
                  {filteredConversations[activeConversation].messages.map(message => (
                    <div key={message.id} className={`flex ${message.sender === 'you' ? 'justify-end' : 'justify-start'}`}>
                      {message.sender === 'them' && (
                        <div className="flex-shrink-0 mr-3">
                          <img
                            src={filteredConversations[activeConversation].avatar}
                            alt={filteredConversations[activeConversation].name}
                            className="w-8 h-8 rounded-full object-cover"
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = 'https://via.placeholder.com/40?text=' + filteredConversations[activeConversation].name.charAt(0);
                            }}
                          />
                        </div>
                      )}
                      <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${message.sender === 'you' ? 'bg-teal-500 text-white' : 'bg-white border border-gray-200'}`}>
                        <p className="text-sm">{message.content}</p>
                        <p className={`text-xs mt-1 ${message.sender === 'you' ? 'text-teal-100' : 'text-gray-500'}`}>{message.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Message input */}
                <div className="p-4 border-t border-gray-200">
                  <form onSubmit={sendMessage} className="flex items-center">
                    <button type="button" className="text-gray-400 hover:text-gray-600 p-2">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                      </svg>
                    </button>
                    <input
                      type="text"
                      className="flex-1 border-0 focus:ring-0 mx-2"
                      placeholder="Ketik pesan Anda..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                    />
                    <button type="submit" className="text-teal-600 hover:text-teal-700 p-2">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                      </svg>
                    </button>
                  </form>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center bg-gray-50 text-center p-6">
                <div>
                  <svg className="w-16 h-16 mx-auto text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                  </svg>
                  <h3 className="mt-4 text-lg font-medium text-gray-900">Tidak ada pesan</h3>
                  <p className="mt-1 text-sm text-gray-500">Pilih percakapan atau mulai pesan baru</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </ClientLayout>
  );
};

export default Messages;
