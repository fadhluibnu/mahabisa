import React from 'react';

const SkillTagsSection = ({ activeSkill, onSkillClick, skills = [] }) => {
  // Include 'all' option and transform database skills
  const allSkills = [
    { id: 'all', name: 'Semua' },
    ...(skills || []).map(skill => ({ 
      id: skill.id.toString(), 
      name: skill.name,
      count: skill.freelancers_count 
    }))
  ];

  return (
    <section className='py-4 md:py-6'>
      <div className='container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
        <div className='flex overflow-x-auto pb-2 md:pb-0 md:flex-wrap gap-2 md:gap-3'>
          {allSkills.map(skill => (
            <button
              key={skill.id}
              className={`py-2 px-4 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                activeSkill === skill.id || 
                (activeSkill === 'all' && skill.id === 'all') ||
                (skill.id === activeSkill)
                  ? 'bg-gradient-to-r from-violet-600 to-violet-800 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-800'
              }`}
              onClick={() => onSkillClick(skill.id)}
            >
              {skill.name} {skill.count > 0 && skill.id !== 'all' ? `(${skill.count})` : ''}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillTagsSection;
