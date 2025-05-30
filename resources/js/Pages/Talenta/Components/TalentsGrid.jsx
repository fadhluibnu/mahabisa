import React, { useState } from 'react';
import TalentCard from './TalentCard';

const TalentsGrid = ({ filters, searchValue, activeSkill }) => {
  // Dummy data for talents
  const talentsData = [
    {
      id: 1,
      name: 'Ahmad Rizky',
      title: 'UI/UX Designer & Web Developer',
      image: 'https://randomuser.me/api/portraits/men/42.jpg',
      university: 'Universitas Indonesia',
      isVerified: true,
      skills: ['UI/UX', 'React', 'Figma'],
      rating: 4.9,
      projects: 38,
      education: 's1',
      experienceLevel: 'expert',
      mainSkill: 'design'
    },
    {
      id: 2,
      name: 'Putri Ariani',
      title: 'Video Editor & Motion Graphics',
      image: 'https://randomuser.me/api/portraits/women/33.jpg',
      university: 'Institut Teknologi Bandung',
      isVerified: true,
      skills: ['Video Editing', 'Motion Graphics', 'After Effects'],
      rating: 4.8,
      projects: 42,
      education: 's1',
      experienceLevel: 'expert',
      mainSkill: 'video'
    },
    {
      id: 3,
      name: 'Budi Santoso',
      title: 'Full Stack Developer',
      image: 'https://randomuser.me/api/portraits/men/32.jpg',
      university: 'Universitas Gadjah Mada',
      isVerified: false,
      skills: ['React', 'Node.js', 'MongoDB'],
      rating: 4.7,
      projects: 24,
      education: 's1',
      experienceLevel: 'intermediate',
      mainSkill: 'web'
    },
    {
      id: 4,
      name: 'Dina Fitriani',
      title: 'Content Writer & Translator',
      image: 'https://randomuser.me/api/portraits/women/22.jpg',
      university: 'Universitas Padjadjaran',
      isVerified: true,
      skills: ['Copywriting', 'Translation', 'SEO'],
      rating: 4.6,
      projects: 31,
      education: 's2',
      experienceLevel: 'intermediate',
      mainSkill: 'writing'
    },
    {
      id: 5,
      name: 'Eko Prasetyo',
      title: 'Mobile App Developer',
      image: 'https://randomuser.me/api/portraits/men/55.jpg',
      university: 'Universitas Diponegoro',
      isVerified: true,
      skills: ['Flutter', 'React Native', 'Firebase'],
      rating: 4.9,
      projects: 27,
      education: 's1',
      experienceLevel: 'expert',
      mainSkill: 'mobile'
    },
    {
      id: 6,
      name: 'Farah Diba',
      title: 'Digital Marketing Specialist',
      image: 'https://randomuser.me/api/portraits/women/65.jpg',
      university: 'Universitas Airlangga',
      isVerified: false,
      skills: ['Social Media', 'SEM', 'Analytics'],
      rating: 4.5,
      projects: 19,
      education: 's1',
      experienceLevel: 'beginner',
      mainSkill: 'marketing'
    },
    {
      id: 7,
      name: 'Gilang Ramadhan',
      title: 'Data Scientist',
      image: 'https://randomuser.me/api/portraits/men/67.jpg',
      university: 'Institut Teknologi Bandung',
      isVerified: true,
      skills: ['Python', 'Machine Learning', 'Data Analysis'],
      rating: 4.8,
      projects: 16,
      education: 's2',
      experienceLevel: 'intermediate',
      mainSkill: 'data'
    },
    {
      id: 8,
      name: 'Hana Kusuma',
      title: 'Music Producer & Composer',
      image: 'https://randomuser.me/api/portraits/women/77.jpg',
      university: 'Institut Seni Indonesia Yogyakarta',
      isVerified: true,
      skills: ['Music Production', 'Composition', 'Sound Design'],
      rating: 4.7,
      projects: 23,
      education: 'd3',
      experienceLevel: 'expert',
      mainSkill: 'music'
    }
  ];

  // Filter talents based on active filters and search
  const filteredTalents = talentsData.filter(talent => {
    // Filter by skill
    if (activeSkill !== 'all' && talent.mainSkill !== activeSkill) {
      return false;
    }
      // Filter by university
    if (filters.university) {
      const universityMap = {
        'ui': 'Universitas Indonesia',
        'ugm': 'Universitas Gadjah Mada',
        'itb': 'Institut Teknologi Bandung',
        'unpad': 'Universitas Padjadjaran',
        'undip': 'Universitas Diponegoro',
        'unair': 'Universitas Airlangga',
      };
      if (talent.university !== universityMap[filters.university]) {
        return false;
      }
    }
    
    // Filter by education
    if (filters.education && talent.education !== filters.education) {
      return false;
    }
    
    // Filter by experience level
    if (filters.experience && talent.experienceLevel !== filters.experience) {
      return false;
    }
    
    // Filter by search term
    if (searchValue) {
      const searchLower = searchValue.toLowerCase();
      const nameMatch = talent.name.toLowerCase().includes(searchLower);
      const titleMatch = talent.title.toLowerCase().includes(searchLower);
      const universityMatch = talent.university.toLowerCase().includes(searchLower);
      const skillsMatch = talent.skills.some(skill => skill.toLowerCase().includes(searchLower));
      
      if (!(nameMatch || titleMatch || universityMatch || skillsMatch)) {
        return false;
      }
    }
    
    return true;
  });
  
  // Sort talents based on selected sort option
  const sortedTalents = [...filteredTalents].sort((a, b) => {
    if (filters.sort === 'rating') {
      return b.rating - a.rating;
    } else if (filters.sort === 'projects') {
      return b.projects - a.projects;
    } else if (filters.sort === 'newest') {
      return b.id - a.id; // Using ID as a proxy for newest
    }
    
    // Default: recommended (no specific sort)
    return 0;
  });

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const talentsPerPage = 6;
  
  // Calculate pagination
  const indexOfLastTalent = currentPage * talentsPerPage;
  const indexOfFirstTalent = indexOfLastTalent - talentsPerPage;
  const currentTalents = sortedTalents.slice(indexOfFirstTalent, indexOfLastTalent);
  const totalPages = Math.ceil(sortedTalents.length / talentsPerPage);
  
  // Generate page numbers
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <section className="py-8 mb-16">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-lg font-medium text-slate-900 mb-6">
          {sortedTalents.length} talenta ditemukan
        </h2>
        
        {/* Talents Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {currentTalents.map(talent => (
            <TalentCard key={talent.id} talent={talent} />
          ))}
        </div>
        
        {/* Empty State */}
        {currentTalents.length === 0 && (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium text-slate-800 mb-2">Tidak ada talenta yang ditemukan</h3>
            <p className="text-slate-500">Coba mengubah filter atau kata kunci pencarian</p>
          </div>
        )}
        
        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center">
            <div className="flex space-x-2">
              {pageNumbers.map(number => (
                <button
                  key={number}
                  onClick={() => setCurrentPage(number)}
                  className={`w-10 h-10 flex items-center justify-center rounded-full transition-all ${
                    currentPage === number
                      ? 'bg-gradient-to-r from-violet-600 to-violet-800 text-white shadow-sm'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {number}
                </button>
              ))}
              
              {currentPage < totalPages && (
                <button
                  onClick={() => setCurrentPage(currentPage + 1)}
                  className="flex items-center justify-center px-3 rounded-full bg-slate-100 text-slate-700 hover:bg-slate-200 transition-all"
                >
                  <span className="mr-1">Next</span>
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default TalentsGrid;
