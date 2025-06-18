import React, { useState } from 'react';
import axios from 'axios';

const AISearchComponent = ({ onSearchResults, onLoading, initialData, filters }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [error, setError] = useState(null);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setError(null);
  };

  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    
    if (!searchQuery.trim()) {
      return;
    }

    try {
      // Indicate loading state
      onLoading(true);      // Convert filters to the format expected by AISearchController
      const formattedFilters = {
        kategori: filters.category || '',
        harga: filters.min_price ? 
          `${filters.min_price} - ${filters.max_price || 'unlimited'}` : '',
        rating: filters.rating || '',
        sort_by: filters.sort_by || 'newest'
      };
      
      // Make API call to the AI search endpoint
      const response = await axios.post('/search/ai', {
        query: searchQuery,
        filters: formattedFilters,
        initialData: initialData
      });
      
      // Handle successful response
      if (response.data.success) {
        onSearchResults(response.data.results);
      } else {
        setError(response.data.message || 'Pencarian tidak dapat diproses, silakan coba lagi.');
      }
    } catch (err) {
      console.error('AI Search error:', err);
      
      // More detailed error handling
      if (err.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        if (err.response.status === 500) {
          setError('Server error: ' + (err.response.data.message || 'Terjadi kesalahan pada server.'));
        } else if (err.response.status === 429) {
          setError('Terlalu banyak permintaan. Silakan coba lagi setelah beberapa saat.');
        } else {
          setError(err.response.data.message || 'Terjadi kesalahan saat melakukan pencarian AI.');
        }
      } else if (err.request) {
        // The request was made but no response was received
        setError('Tidak dapat terhubung ke server. Periksa koneksi internet Anda.');
      } else {
        // Something happened in setting up the request
        setError('Terjadi kesalahan saat melakukan pencarian AI.');
      }
    } finally {
      // Stop loading state
      onLoading(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <form onSubmit={handleSearchSubmit} className="relative">
        <div className="flex gap-2">
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
              <svg
                className="h-5 w-5 text-slate-400"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <input
              type="text"
              className="w-full py-4 pl-12 pr-4 bg-white border border-slate-200 rounded-xl shadow-md focus:ring-2 focus:ring-violet-600 focus:border-violet-600 focus:outline-none transition-all"
              placeholder="Cari dengan AI (contoh: jasa desain logo modern untuk bisnis kuliner)"
              value={searchQuery}
              onChange={handleSearchChange}
              disabled={onLoading}
            />
          </div>
          <button
            type="submit"
            className={`px-6 py-4 bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-medium rounded-xl shadow-md hover:shadow-lg transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500 flex items-center justify-center ${onLoading ? 'opacity-75 cursor-not-allowed' : ''}`}
            disabled={onLoading}
          >
            {onLoading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Mencari...
              </>
            ) : (
              "Cari AI"
            )}
          </button>
        </div>
        {error && <p className="text-red-500 mt-2 text-sm">{error}</p>}
      </form>
    </div>
  );
};

export default AISearchComponent;
