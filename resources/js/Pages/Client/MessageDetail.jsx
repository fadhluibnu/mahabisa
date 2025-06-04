import React, { useState, useRef, useEffect } from 'react';
import { Head } from '@inertiajs/react';
import ClientLayout from './Components/ClientLayout';

const MessageDetail = ({ id, user }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [conversation, setConversation] = useState(null);
  const messagesEndRef = useRef(null);

  // Mock conversation data
  const mockConversation = {
    id: id,
    recipient: {
      id: 101,
      name: 'Ricky Harahap',
      avatar: 'https://randomuser.me/api/portraits/men/36.jpg',
      role: 'freelancer',
      title: 'Full Stack Developer',
      isOnline: true,
      lastActive: 'Online'
    },
    project: {
      id: 1,
      title: 'Website E-Commerce MahaBisa',
      status: 'in_progress'
    },
    messages: [
      {
        id: 1,
        sender: 'recipient',
        text: 'Halo, terima kasih telah menghubungi saya tentang proyek Anda.',
        timestamp: '2024-06-01T09:30:00',
        isRead: true
      },
      {
        id: 2,
        sender: 'user',
        text: 'Saya tertarik dengan layanan pengembangan website yang Anda tawarkan. Bisakah kita membahas lebih detail?',
        timestamp: '2024-06-01T09:32:00',
        isRead: true
      },
      {
        id: 3,
        sender: 'recipient',
        text: 'Tentu saja, saya senang bisa membantu. Bisa tolong jelaskan lebih detail tentang proyek yang Anda inginkan?',
        timestamp: '2024-06-01T09:34:00',
        isRead: true
      },
      {
        id: 4,
        sender: 'user',
        text: 'Saya ingin membuat website e-commerce untuk bisnis saya dengan fitur pembayaran, keranjang belanja, dan panel admin.',
        timestamp: '2024-06-01T09:38:00',
        isRead: true
      },
      {
        id: 5,
        sender: 'recipient',
        text: 'Itu terdengar menarik. Saya sudah membuat beberapa proyek serupa sebelumnya. Berapa anggaran dan timeline yang Anda miliki untuk proyek ini?',
        timestamp: '2024-06-01T09:40:00',
        isRead: true
      },
      {
        id: 6,
        sender: 'user',
        text: 'Budget sekitar 8-10 juta dan perlu selesai dalam 2 bulan. Apakah itu cukup?',
        timestamp: '2024-06-01T09:42:00',
        isRead: true
      },
      {
        id: 7,
        sender: 'recipient',
        text: 'Itu masuk akal untuk proyek dengan cakupan yang Anda jelaskan. Saya bisa mulai pada minggu depan. Bisa tolong jelaskan lebih detail tentang produk yang akan dijual dan fitur spesifik yang Anda inginkan?',
        timestamp: '2024-06-01T09:45:00',
        isRead: true
      },
    ]
  };

  useEffect(() => {
    // Simulate API call to fetch conversation
    const fetchConversation = async () => {
      setIsLoading(true);
      try {
        // In a real app, this would be an API call
        await new Promise(resolve => setTimeout(resolve, 800)); // Simulate network delay
        setConversation(mockConversation);
        setMessages(mockConversation.messages);
      } catch (error) {
        console.error('Error fetching conversation:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchConversation();
  }, [id]);

  useEffect(() => {
    // Scroll to bottom when messages change
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    
    if (!newMessage.trim()) return;
    
    // Add new message to the list
    const newMessageObj = {
      id: messages.length + 1,
      sender: 'user',
      text: newMessage,
      timestamp: new Date().toISOString(),
      isRead: false,
    };
    
    setMessages([...messages, newMessageObj]);
    setNewMessage('');
    
    // Simulate reply after delay (for demo purposes)
    setTimeout(() => {
      const replyMessage = {
        id: messages.length + 2,
        sender: 'recipient',
        text: 'Terima kasih atas informasinya! Saya akan segera mengerjakan proposal untuk proyek Anda.',
        timestamp: new Date().toISOString(),
        isRead: false,
      };
      
      setMessages(prevMessages => [...prevMessages, replyMessage]);
    }, 3000);
  };

  // Format timestamp to readable format
  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString('id-ID', {
      hour: '2-digit',
      minute: '2-digit',
      day: 'numeric',
      month: 'short'
    });
  };

  return (
    <ClientLayout title="Pesan" subtitle="Komunikasi dengan freelancer">
      <Head title="Detail Pesan - MahaBisa Client" />
      
      <div className="bg-white rounded-xl shadow-sm overflow-hidden h-[calc(100vh-200px)] flex flex-col">
        {isLoading ? (
          <div className="flex-1 flex items-center justify-center">
            <svg className="animate-spin h-8 w-8 text-indigo-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </div>
        ) : (
          <>
            {/* Header */}
            <div className="px-6 py-4 border-b border-gray-200 flex items-center">
              <div className="relative mr-3">
                <img 
                  src={conversation.recipient.avatar} 
                  alt={conversation.recipient.name} 
                  className="w-10 h-10 rounded-full"
                />
                {conversation.recipient.isOnline && (
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
                )}
              </div>
              <div className="flex-1">
                <h2 className="text-lg font-semibold text-gray-900">{conversation.recipient.name}</h2>
                <p className="text-sm text-gray-500">{conversation.recipient.title} • {conversation.recipient.lastActive}</p>
              </div>
              {conversation.project && (
                <div className="bg-gray-100 px-3 py-1.5 rounded-lg">
                  <span className="text-xs font-medium text-gray-600">Proyek:</span>
                  <span className="text-sm ml-1 font-medium text-gray-800">{conversation.project.title}</span>
                </div>
              )}
            </div>
            
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-6 bg-gray-50">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div 
                    key={message.id} 
                    className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div 
                      className={`max-w-md px-4 py-2 rounded-lg ${
                        message.sender === 'user' 
                          ? 'bg-indigo-600 text-white rounded-br-none' 
                          : 'bg-white border border-gray-200 text-gray-800 rounded-bl-none'
                      }`}
                    >
                      <p>{message.text}</p>
                      <p 
                        className={`text-xs mt-1 ${
                          message.sender === 'user' ? 'text-indigo-200' : 'text-gray-500'
                        }`}
                      >
                        {formatTimestamp(message.timestamp)}
                      </p>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>
            </div>
            
            {/* Message Input */}
            <div className="px-4 py-3 border-t border-gray-200">
              <form onSubmit={handleSendMessage} className="flex items-center">
                <input
                  type="text"
                  placeholder="Ketik pesan Anda..."
                  className="flex-1 border border-gray-300 rounded-l-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                />
                <button
                  type="submit"
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-r-lg transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
                  </svg>
                </button>
              </form>
            </div>
          </>
        )}
      </div>
    </ClientLayout>
  );
};

export default MessageDetail;
