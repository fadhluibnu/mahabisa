import React from 'react';
import { Link } from '@inertiajs/react';

const MessagesCard = ({ messages }) => {
  // Format time
  const formatTime = (dateString) => {
    const now = new Date();
    const date = new Date(dateString);
    
    // If it's today, show time
    if (date.toDateString() === now.toDateString()) {
      return date.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
    }
    
    // If it's within the last week, show day name
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    if (date > oneWeekAgo) {
      return date.toLocaleDateString('id-ID', { weekday: 'long' });
    }
    
    // Otherwise show date
    return date.toLocaleDateString('id-ID', { day: 'numeric', month: 'short' });
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="p-4 sm:p-6 border-b border-gray-100 flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-900">
          Pesan Terbaru
          {messages.filter(m => !m.read).length > 0 && (
            <span className="ml-2 px-2 py-0.5 text-xs rounded-full bg-red-100 text-red-800">
              {messages.filter(m => !m.read).length} Baru
            </span>
          )}
        </h3>
      </div>
      <div className="divide-y divide-gray-100">
        {messages.map((message, index) => (
          <Link
            key={index}
            href={`/freelancer/messages/${message.id}`}
            className={`block p-4 sm:p-5 hover:bg-gray-50 transition duration-150 ${!message.read ? 'bg-indigo-50' : ''}`}
          >
            <div className="flex items-start">
              <img
                src={message.sender.avatar}
                alt={message.sender.name}
                className="h-10 w-10 rounded-full flex-shrink-0"
              />
              <div className="ml-3 flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {message.sender.name}
                  </p>
                  <p className="text-xs text-gray-500">
                    {formatTime(message.date)}
                  </p>
                </div>
                <p className={`text-sm ${!message.read ? 'font-semibold text-gray-900' : 'text-gray-500'} line-clamp-1`}>
                  {message.subject}
                </p>
                <p className="text-sm text-gray-500 line-clamp-1">
                  {message.preview}
                </p>
                {message.project && (
                  <span className="inline-flex items-center px-2 py-0.5 mt-1 rounded text-xs font-medium bg-indigo-100 text-indigo-800">
                    {message.project}
                  </span>
                )}
              </div>
            </div>
          </Link>
        ))}
        
        {messages.length === 0 && (
          <div className="p-6 text-center">
            <svg
              className="mx-auto h-10 w-10 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900">Tidak ada pesan</h3>
            <p className="mt-1 text-sm text-gray-500">
              Anda belum memiliki pesan apa pun.
            </p>
          </div>
        )}
      </div>
      
      <div className="p-4 sm:p-5 border-t border-gray-100">
        <Link
          href="/freelancer/messages"
          className="inline-flex items-center text-sm font-medium text-indigo-600 hover:text-indigo-500"
        >
          Lihat Semua Pesan
          <svg
            className="ml-1 h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M14 5l7 7m0 0l-7 7m7-7H3"
            />
          </svg>
        </Link>
      </div>
    </div>
  );
};

export default MessagesCard;
