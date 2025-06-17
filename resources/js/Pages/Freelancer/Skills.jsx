import React, { useState } from 'react';
import FreelancerLayout from './Components/FreelancerLayout';

const Skills = () => {
  const [skills, setSkills] = useState([
    { id: 1, name: 'Web Development', level: 'Expert', verified: true },
    { id: 2, name: 'UI/UX Design', level: 'Advanced', verified: true },
    { id: 3, name: 'React', level: 'Expert', verified: true },
    { id: 4, name: 'Laravel', level: 'Intermediate', verified: false },
    { id: 5, name: 'TailwindCSS', level: 'Advanced', verified: true },
    { id: 6, name: 'Node.js', level: 'Intermediate', verified: false },
  ]);

  const [isAddingSkill, setIsAddingSkill] = useState(false);
  const [newSkill, setNewSkill] = useState({ name: '', level: 'Beginner' });

  // Function to get background color based on skill level
  const getLevelColor = level => {
    switch (level) {
      case 'Expert':
        return 'bg-indigo-600';
      case 'Advanced':
        return 'bg-indigo-500';
      case 'Intermediate':
        return 'bg-indigo-400';
      default:
        return 'bg-indigo-300';
    }
  };

  // Function to translate level to Indonesian
  const translateLevel = level => {
    switch (level) {
      case 'Expert':
        return 'Ahli';
      case 'Advanced':
        return 'Mahir';
      case 'Intermediate':
        return 'Menengah';
      default:
        return 'Pemula';
    }
  };

  const handleAddSkill = () => {
    if (newSkill.name.trim()) {
      setSkills([
        ...skills,
        {
          id: Date.now(),
          name: newSkill.name,
          level: newSkill.level,
          verified: false,
        },
      ]);
      setNewSkill({ name: '', level: 'Beginner' });
      setIsAddingSkill(false);
    }
  };

  const handleRemoveSkill = skillId => {
    setSkills(skills.filter(skill => skill.id !== skillId));
  };

  const handleUpdateLevel = (skillId, newLevel) => {
    setSkills(
      skills.map(skill =>
        skill.id === skillId ? { ...skill, level: newLevel } : skill
      )
    );
  };

  return (
    <FreelancerLayout
      title='Kemampuan & Keahlian'
      subtitle='Kelola kemampuan dan keahlian Anda untuk meningkatkan profil'
    >
      <div className='bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mb-6'>
        <div className='p-4 sm:p-6 border-b border-gray-100 flex justify-between items-center'>
          <h3 className='text-lg font-semibold text-gray-900'>
            Daftar Kemampuan
          </h3>
          <button
            onClick={() => setIsAddingSkill(true)}
            className='inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
          >
            <svg
              className='h-4 w-4 mr-1'
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M12 6v6m0 0v6m0-6h6m-6 0H6'
              />
            </svg>
            Tambah Kemampuan
          </button>
        </div>

        {isAddingSkill && (
          <div className='p-4 sm:p-6 border-b border-gray-100 bg-gray-50'>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
              <div className='col-span-2'>
                <label
                  htmlFor='skillName'
                  className='block text-sm font-medium text-gray-700 mb-1'
                >
                  Nama Kemampuan
                </label>
                <input
                  type='text'
                  id='skillName'
                  value={newSkill.name}
                  onChange={e =>
                    setNewSkill({ ...newSkill, name: e.target.value })
                  }
                  className='block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
                  placeholder='Contoh: JavaScript, Graphic Design, dll.'
                />
              </div>
              <div>
                <label
                  htmlFor='skillLevel'
                  className='block text-sm font-medium text-gray-700 mb-1'
                >
                  Tingkat Keahlian
                </label>
                <select
                  id='skillLevel'
                  value={newSkill.level}
                  onChange={e =>
                    setNewSkill({ ...newSkill, level: e.target.value })
                  }
                  className='block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
                >
                  <option value='Beginner'>Pemula</option>
                  <option value='Intermediate'>Menengah</option>
                  <option value='Advanced'>Mahir</option>
                  <option value='Expert'>Ahli</option>
                </select>
              </div>
            </div>
            <div className='mt-4 flex justify-end space-x-3'>
              <button
                type='button'
                onClick={() => setIsAddingSkill(false)}
                className='inline-flex items-center px-3 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
              >
                Batal
              </button>
              <button
                type='button'
                onClick={handleAddSkill}
                className='inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
              >
                Simpan
              </button>
            </div>
          </div>
        )}

        <div className='p-4 sm:p-6'>
          {skills.length > 0 ? (
            <div className='space-y-4'>
              {skills.map(skill => (
                <div
                  key={skill.id}
                  className='flex items-center justify-between p-3 bg-gray-50 rounded-lg'
                >
                  <div className='flex items-center'>
                    <span
                      className={`px-3 py-1 text-white ${getLevelColor(skill.level)} rounded-full`}
                    >
                      {translateLevel(skill.level)}
                    </span>
                    <span className='ml-3 font-medium text-gray-700'>
                      {skill.name}
                    </span>
                    {skill.verified && (
                      <span className='ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800'>
                        <svg
                          className='h-3 w-3 mr-1'
                          fill='currentColor'
                          viewBox='0 0 20 20'
                          xmlns='http://www.w3.org/2000/svg'
                        >
                          <path
                            fillRule='evenodd'
                            d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
                            clipRule='evenodd'
                          />
                        </svg>
                        Terverifikasi
                      </span>
                    )}
                  </div>
                  <div className='flex items-center space-x-2'>
                    <select
                      value={skill.level}
                      onChange={e =>
                        handleUpdateLevel(skill.id, e.target.value)
                      }
                      className='rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
                    >
                      <option value='Beginner'>Pemula</option>
                      <option value='Intermediate'>Menengah</option>
                      <option value='Advanced'>Mahir</option>
                      <option value='Expert'>Ahli</option>
                    </select>
                    <button
                      onClick={() => handleRemoveSkill(skill.id)}
                      className='p-1 text-red-600 hover:text-red-800 rounded-full hover:bg-red-100'
                      disabled={skill.verified}
                      title={
                        skill.verified
                          ? 'Kemampuan terverifikasi tidak dapat dihapus'
                          : 'Hapus kemampuan'
                      }
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
                          d='M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16'
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className='text-center py-6'>
              <svg
                className='mx-auto h-12 w-12 text-gray-400'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z'
                />
              </svg>
              <h3 className='mt-2 text-sm font-medium text-gray-900'>
                Belum ada kemampuan
              </h3>
              <p className='mt-1 text-sm text-gray-500'>
                Mulai tambahkan kemampuan Anda untuk meningkatkan profil.
              </p>
              <div className='mt-4'>
                <button
                  type='button'
                  onClick={() => setIsAddingSkill(true)}
                  className='inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                >
                  Tambah Kemampuan
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className='bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden'>
        <div className='p-4 sm:p-6 border-b border-gray-100'>
          <h3 className='text-lg font-semibold text-gray-900'>
            Tip Meningkatkan Profil
          </h3>
        </div>
        <div className='p-4 sm:p-6'>
          <div className='space-y-4'>
            <div className='flex'>
              <div className='flex-shrink-0'>
                <svg
                  className='h-6 w-6 text-green-500'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'
                  />
                </svg>
              </div>
              <div className='ml-3'>
                <h4 className='text-sm font-medium text-gray-900'>
                  Tambahkan Kemampuan yang Relevan
                </h4>
                <p className='mt-1 text-sm text-gray-500'>
                  Fokus pada kemampuan yang relevan dengan layanan yang Anda
                  tawarkan untuk meningkatkan peluang mendapatkan proyek.
                </p>
              </div>
            </div>
            <div className='flex'>
              <div className='flex-shrink-0'>
                <svg
                  className='h-6 w-6 text-green-500'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'
                  />
                </svg>
              </div>
              <div className='ml-3'>
                <h4 className='text-sm font-medium text-gray-900'>
                  Jujur Dalam Menilai Kemampuan
                </h4>
                <p className='mt-1 text-sm text-gray-500'>
                  Berikan penilaian yang jujur terhadap tingkat keahlian Anda
                  untuk membangun kepercayaan dengan klien.
                </p>
              </div>
            </div>
            <div className='flex'>
              <div className='flex-shrink-0'>
                <svg
                  className='h-6 w-6 text-green-500'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'
                  />
                </svg>
              </div>
              <div className='ml-3'>
                <h4 className='text-sm font-medium text-gray-900'>
                  Dapatkan Verifikasi Kemampuan
                </h4>
                <p className='mt-1 text-sm text-gray-500'>
                  Kemampuan terverifikasi akan meningkatkan kredibilitas profil
                  Anda. Lengkapi tes keahlian untuk mendapatkan verifikasi.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </FreelancerLayout>
  );
};

export default Skills;
