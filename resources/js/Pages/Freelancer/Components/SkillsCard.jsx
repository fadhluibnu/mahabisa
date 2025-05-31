import React from 'react';
import { Link } from '@inertiajs/react';

const SkillsCard = ({ skills }) => {
  // Function to get background color based on skill level
  const getLevelColor = (level) => {
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
  const translateLevel = (level) => {
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

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="p-4 sm:p-6 border-b border-gray-100 flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-900">Kemampuan & Keahlian</h3>
        <Link
          href="/freelancer/skills"
          className="inline-flex items-center text-sm font-medium text-indigo-600 hover:text-indigo-500"
        >
          <svg
            className="h-5 w-5 mr-1"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
            />
          </svg>
          Edit
        </Link>
      </div>
      <div className="p-4 sm:p-6">
        <div className="flex flex-wrap gap-2">
          {skills.map((skill, index) => (
            <div
              key={index}
              className="flex items-center bg-gray-100 rounded-full overflow-hidden pr-3"
            >
              <span
                className={`px-3 py-1 text-white ${getLevelColor(skill.level)}`}
              >
                {translateLevel(skill.level)}
              </span>
              <span className="ml-2 text-sm font-medium text-gray-700">
                {skill.name}
              </span>
            </div>
          ))}
        </div>
        {skills.length === 0 && (
          <div className="text-center py-4">
            <svg
              className="mx-auto h-10 w-10 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
              />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900">
              Belum ada kemampuan
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Mulai tambahkan kemampuan Anda untuk meningkatkan profil.
            </p>
            <div className="mt-4">
              <Link
                href="/freelancer/skills"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Tambah Kemampuan
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SkillsCard;
