import React, { useState, useEffect } from 'react';
import ClientLayout from './Components/ClientLayout';
import { Link, useForm, router } from '@inertiajs/react';

const Messages = ({ auth_user, conversations, active_chat_other_user, active_chat_messages, initial_active_user_id }) => {
  // State untuk pesan baru
  const [newMessage, setNewMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  
  // Filtered conversations berdasarkan pencarian
  const filteredConversations = conversations.filter(conversation =>
    conversation.user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (conversation.last_message && conversation.last_message.toLowerCase().includes(searchTerm.toLowerCase()))
  );
  
  // Form untuk mengirim pesan
  const { data, setData, post, processing } = useForm({
    recipient_id: active_chat_other_user ? active_chat_other_user.id : '',
    content: ''
  });
  
  // Update recipient_id saat active_chat_other_user berubah
  useEffect(() => {
    if (active_chat_other_user) {
      setData('recipient_id', active_chat_other_user.id);
    }
  }, [active_chat_other_user]);
  
  // Function untuk mengirim pesan
  const sendMessage = (e) => {
    e.preventDefault();
    if (!data.content.trim()) return;
    
    post('/client/messages', {
      onSuccess: () => {
        setData('content', '');
      }
    });
  };

  return (
    <ClientLayout title="Pesan" subtitle="Kelola semua percakapan Anda dengan freelancer">
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="flex h-[75vh]">
          {/* Left sidebar - Conversation list */}
          <div className="w-1/3 border-r border-gray-200 flex flex-col">
            <div className="p-4 border-b border-gray-200">
              <div className="relative">
                <input
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
              {filteredConversations.map((conversation) => (
                <div
                  key={conversation.user.id}
                  className={`p-4 border-b border-gray-200 cursor-pointer hover:bg-gray-50 ${
                    initial_active_user_id === conversation.user.id ? 'bg-teal-50' : ''
                  }`}
                >
                  <Link href={`/client/messages?with=${conversation.user.id}`} className="block">
                    <div className="flex items-center">
                      <div className="relative flex-shrink-0">
                        <img
                          src={conversation.user.profile_photo_url}
                          alt={conversation.user.name}
                          className="w-12 h-12 rounded-full object-cover"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(conversation.user.name)}&background=8b5cf6&color=fff`;
                          }}
                        />
                      </div>
                      <div className="ml-3 flex-1">
                        <div className="flex items-center justify-between">
                          <h3 className="text-sm font-medium">{conversation.user.name}</h3>
                          <p className="text-xs text-gray-500">{new Date(conversation.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</p>
                        </div>
                        <div className="flex items-center justify-between">
                          <p className="text-xs text-gray-500 truncate" style={{ maxWidth: '150px' }}>
                            {conversation.last_message}
                          </p>
                          {conversation.unread_count > 0 && (
                            <span className="inline-flex items-center justify-center h-5 w-5 rounded-full bg-teal-500 text-white text-xs">
                              {conversation.unread_count}
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
            {active_chat_other_user ? (
              <>
                {/* Conversation header */}
                <div className="p-4 border-b border-gray-200 flex items-center">
                  <div className="relative">
                    <img
                      src={active_chat_other_user.profile_photo_url}
                      alt={active_chat_other_user.name}
                      className="w-10 h-10 rounded-full object-cover"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(active_chat_other_user.name)}&background=8b5cf6&color=fff`;
                      }}
                    />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium">{active_chat_other_user.name}</h3>
                  </div>
                </div>
                
                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
                  {active_chat_messages.map(message => (
                    <div key={message.id} className={`flex ${message.is_mine ? 'justify-end' : 'justify-start'}`}>
                      {!message.is_mine && (
                        <div className="flex-shrink-0 mr-3">
                          <img
                            src={active_chat_other_user.profile_photo_url}
                            alt={active_chat_other_user.name}
                            className="w-8 h-8 rounded-full object-cover"
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(active_chat_other_user.name)}&background=8b5cf6&color=fff`;
                            }}
                          />
                        </div>
                      )}
                      <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${message.is_mine ? 'bg-teal-500 text-white' : 'bg-white border border-gray-200'}`}>
                        <p className="text-sm">{message.content}</p>
                        <p className={`text-xs mt-1 ${message.is_mine ? 'text-teal-100' : 'text-gray-500'}`}>
                          {new Date(message.created_at).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Message input */}
                <div className="p-4 border-t border-gray-200">
                  <form onSubmit={sendMessage} className="flex items-center">
                    <input
                      type="text"
                      className="flex-1 border border-gray-300 rounded-lg py-2 px-4 focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder="Ketik pesan Anda..."
                      value={data.content}
                      onChange={(e) => setData('content', e.target.value)}
                      disabled={processing}
                    />
                    <button 
                      type="submit" 
                      className="ml-2 bg-teal-600 hover:bg-teal-700 text-white py-2 px-4 rounded-lg disabled:opacity-50"
                      disabled={processing || !data.content.trim()}
                    >
                      Kirim
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
                  <h3 className="mt-4 text-lg font-medium text-gray-900">Tidak ada pesan terpilih</h3>
                  <p className="mt-1 text-sm text-gray-500">Pilih percakapan dari daftar sebelah kiri</p>
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
