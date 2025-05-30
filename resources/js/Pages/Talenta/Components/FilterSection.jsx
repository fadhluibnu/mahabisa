import React from 'react';

const FilterSection = ({ filters, onFilterChange }) => {
  return (
    <section className="py-6">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl shadow-md p-4 md:p-6 lg:p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-slate-700">Universitas</label>
              <select
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-violet-600 focus:border-violet-600"
                value={filters.university}
                onChange={(e) => onFilterChange('university', e.target.value)}
              >
                <option value="">Semua Universitas</option>
                <option value="ui">Universitas Indonesia</option>
                <option value="ugm">Universitas Gadjah Mada</option>
                <option value="itb">Institut Teknologi Bandung</option>
                <option value="unpad">Universitas Padjadjaran</option>
                <option value="undip">Universitas Diponegoro</option>
                <option value="unair">Universitas Airlangga</option>
              </select>
            </div>
            
            <div className="space-y-2">
              <label className="block text-sm font-medium text-slate-700">Pendidikan</label>
              <select
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-violet-600 focus:border-violet-600"
                value={filters.education}
                onChange={(e) => onFilterChange('education', e.target.value)}
              >
                <option value="">Semua Tingkat</option>
                <option value="d3">D3</option>
                <option value="s1">S1</option>
                <option value="s2">S2</option>
                <option value="s3">S3</option>
              </select>
            </div>
            
            <div className="space-y-2">
              <label className="block text-sm font-medium text-slate-700">Pengalaman</label>
              <select
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-violet-600 focus:border-violet-600"
                value={filters.experience}
                onChange={(e) => onFilterChange('experience', e.target.value)}
              >
                <option value="">Semua Level</option>
                <option value="beginner">Pemula (0-1 tahun)</option>
                <option value="intermediate">Menengah (1-3 tahun)</option>
                <option value="expert">Ahli (3+ tahun)</option>
              </select>
            </div>
            
            <div className="space-y-2">
              <label className="block text-sm font-medium text-slate-700">Urutkan</label>
              <select
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-violet-600 focus:border-violet-600"
                value={filters.sort}
                onChange={(e) => onFilterChange('sort', e.target.value)}
              >
                <option value="recommended">Direkomendasikan</option>
                <option value="rating">Rating Tertinggi</option>
                <option value="projects">Proyek Terbanyak</option>
                <option value="newest">Terbaru</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FilterSection;
