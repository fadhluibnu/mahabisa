import React from 'react';

const FilterSection = ({ filters, onFilterChange, onSearchChange }) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
      <div className="flex flex-col md:flex-row gap-4 md:items-center">
        {/* Search Box */}
        <div className="relative flex-grow">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg className="h-5 w-5 text-slate-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
            </svg>
          </div>
          <input
            type="text"
            value={filters.search}
            onChange={onSearchChange}
            className="pl-10 pr-4 py-3 w-full rounded-lg border border-slate-200 focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 bg-slate-50 focus:bg-white transition-all"
            placeholder="Cari proyek berdasarkan kata kunci..."
          />
        </div>

        {/* Category Filter */}
        <div className="md:w-48">
          <select
            value={filters.category}
            onChange={(e) => onFilterChange('category', e.target.value)}
            className="w-full py-3 px-4 rounded-lg border border-slate-200 focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 bg-slate-50 focus:bg-white transition-all"
          >
            <option value="">Semua Kategori</option>
            <option value="web">Pengembangan Web</option>
            <option value="mobile">Aplikasi Mobile</option>
            <option value="design">Desain</option>
            <option value="writing">Penulisan</option>
            <option value="marketing">Marketing</option>
            <option value="video">Video & Animasi</option>
            <option value="music">Musik & Audio</option>
          </select>
        </div>

        {/* Budget Filter */}
        <div className="md:w-48">
          <select
            value={filters.budget}
            onChange={(e) => onFilterChange('budget', e.target.value)}
            className="w-full py-3 px-4 rounded-lg border border-slate-200 focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 bg-slate-50 focus:bg-white transition-all"
          >
            <option value="">Semua Budget</option>
            <option value="low">Dibawah Rp500k</option>
            <option value="medium">Rp500k - Rp2jt</option>
            <option value="high">Rp2jt - Rp5jt</option>
            <option value="very-high">Diatas Rp5jt</option>
          </select>
        </div>

        {/* Status Filter */}
        <div className="md:w-48">
          <select
            value={filters.status}
            onChange={(e) => onFilterChange('status', e.target.value)}
            className="w-full py-3 px-4 rounded-lg border border-slate-200 focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 bg-slate-50 focus:bg-white transition-all"
          >
            <option value="">Semua Status</option>
            <option value="open">Terbuka</option>
            <option value="in-progress">Sedang Dikerjakan</option>
            <option value="review">Dalam Review</option>
            <option value="completed">Selesai</option>
          </select>
        </div>

        {/* Sort By */}
        <div className="md:w-48">
          <select
            value={filters.sort}
            onChange={(e) => onFilterChange('sort', e.target.value)}
            className="w-full py-3 px-4 rounded-lg border border-slate-200 focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 bg-slate-50 focus:bg-white transition-all"
          >
            <option value="terbaru">Terbaru</option>
            <option value="tertua">Terlama</option>
            <option value="budget-asc">Budget: Rendah ke Tinggi</option>
            <option value="budget-desc">Budget: Tinggi ke Rendah</option>
            <option value="bids">Jumlah Penawaran</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default FilterSection;
