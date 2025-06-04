import React, { useState } from 'react';
import { Link } from '@inertiajs/react';
import ClientLayout from './Components/ClientLayout';

const ReviewCreate = ({ projectId, freelancerId }) => {
  // In a real app, you would fetch project and freelancer data
  // This is dummy data for demonstration
  const [project] = useState({
    id: projectId || 1,
    title: 'Pengembangan Website E-commerce',
    freelancer: {
      id: freelancerId || 101,
      name: 'Alex Suryanto',
      avatar: 'https://ui-avatars.com/api/?name=Alex+Suryanto&background=8b5cf6&color=fff',
    }
  });

  // Form state
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Handle rating change
  const handleRatingChange = (newRating) => {
    setRating(newRating);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate form
    if (comment.trim().length < 10) {
      alert('Silakan berikan ulasan yang lebih mendetail (minimal 10 karakter)');
      return;
    }
    
    // In a real app, you would submit to the server
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1000);
  };

  return (
    <ClientLayout
      title="Beri Ulasan"
      subtitle="Berikan penilaian untuk freelancer"
    >
      <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-6">
        <div className="p-6">
          {/* Breadcrumb */}
          <nav className="flex mb-6 text-sm" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-3">
              <li className="inline-flex items-center">
                <Link href="/client/projects" className="text-gray-500 hover:text-indigo-600">
                  Proyek
                </Link>
              </li>
              <li>
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path></svg>
                  <Link href={`/client/projects/${project.id}`} className="ml-1 text-gray-500 hover:text-indigo-600 md:ml-2">
                    {project.title}
                  </Link>
                </div>
              </li>
              <li aria-current="page">
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path></svg>
                  <span className="ml-1 text-gray-500 md:ml-2 font-medium">Beri Ulasan</span>
                </div>
              </li>
            </ol>
          </nav>

          {isSubmitted ? (
            <div className="text-center py-12">
              <div className="h-24 w-24 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                <svg className="h-12 w-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Terima Kasih atas Ulasan Anda!</h2>
              <p className="text-gray-600 mb-6">Umpan balik Anda sangat berarti bagi kami dan freelancer.</p>
              <Link
                href={`/client/projects/${project.id}`}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Kembali ke Proyek
              </Link>
            </div>
          ) : (
            <div>
              {/* Review Form */}
              <div className="max-w-3xl mx-auto">
                <div className="flex items-center mb-6">
                  <img 
                    src={project.freelancer.avatar} 
                    alt={project.freelancer.name} 
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  <div>
                    <h2 className="text-xl font-bold text-gray-900 mb-1">Beri Ulasan untuk {project.freelancer.name}</h2>
                    <p className="text-gray-600">Proyek: {project.title}</p>
                  </div>
                </div>
                
                <form onSubmit={handleSubmit}>
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Rating
                    </label>
                    <div className="flex items-center">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => handleRatingChange(star)}
                          className="p-1 focus:outline-none focus:ring-0"
                        >
                          <svg 
                            className={`w-8 h-8 ${star <= rating ? 'text-yellow-400' : 'text-gray-300'}`}
                            fill="currentColor" 
                            viewBox="0 0 20 20" 
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.538-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        </button>
                      ))}
                      <span className="ml-2 text-sm text-gray-600">
                        {rating === 1 && 'Buruk'}
                        {rating === 2 && 'Kurang'}
                        {rating === 3 && 'Cukup'}
                        {rating === 4 && 'Baik'}
                        {rating === 5 && 'Sangat Baik'}
                      </span>
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-2">
                      Ulasan Anda
                    </label>
                    <textarea
                      id="comment"
                      rows={5}
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      placeholder="Bagaimana pengalaman Anda bekerja dengan freelancer ini? Apa yang Anda sukai atau yang perlu ditingkatkan?"
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      required
                    />
                    <p className="mt-2 text-sm text-gray-500">
                      Min. 10 karakter
                    </p>
                  </div>
                  
                  <div className="flex justify-end">
                    <Link
                      href={`/client/projects/${project.id}`}
                      className="mr-3 inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Batal
                    </Link>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      {isSubmitting ? 'Mengirim...' : 'Kirim Ulasan'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </ClientLayout>
  );
};

export default ReviewCreate;
