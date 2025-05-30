import React from 'react';
import { Link } from '@inertiajs/react';

const TalentCard = ({ talent }) => {
  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-lg border border-slate-100 overflow-hidden transition-all">
      <div className="p-5">
        {/* Talent Header */}
        <div className="flex items-center mb-4">
          <div className="relative mr-4">
            <img 
              src={talent.image} 
              alt={talent.name} 
              className="w-16 h-16 rounded-full object-cover border-2 border-slate-100"
            />
            {talent.isVerified && (
              <span className="absolute bottom-0 right-0 bg-violet-600 text-white p-0.5 rounded-full">
                <svg className="w-2.5 h-2.5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" />
                </svg>
              </span>
            )}
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900">{talent.name}</h3>
            <p className="text-sm text-violet-600">{talent.title}</p>
            <p className="text-xs text-slate-500">{talent.university}</p>
          </div>
        </div>
        
        {/* Skills */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {talent.skills.map((skill, index) => (
            <span 
              key={index}
              className="text-xs bg-violet-50 text-violet-700 px-2 py-0.5 rounded-md"
            >
              {skill}
            </span>
          ))}
        </div>
        
        {/* Meta Info */}
        <div className="flex justify-between mb-5">
          <div className="flex items-center">
            <svg className="w-4 h-4 text-amber-400 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="text-sm font-bold mr-1">{talent.rating}</span>
            <span className="text-xs text-slate-500">/5</span>
          </div>
          <div className="text-sm">
            <span className="font-bold">{talent.projects}</span>
            <span className="text-slate-500 ml-1">proyek</span>
          </div>
        </div>
        
        {/* Actions */}
        <div className="flex gap-2">
          <Link 
            href={`/talenta/${talent.id}`} 
            className="py-2 flex-1 text-center bg-gradient-to-r from-violet-600 to-violet-800 text-white text-sm rounded-lg font-medium hover:shadow-md transition-all"
          >
            Lihat Profil
          </Link>
          <Link 
            href={`/pesan/${talent.id}`}
            className="py-2 w-12 flex items-center justify-center border border-violet-600 text-violet-600 rounded-lg hover:bg-violet-50 transition-all"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TalentCard;
