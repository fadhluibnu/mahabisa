import React, { useState } from 'react';
import axios from 'axios';
import { useToast } from '@/Components/Toast';

const FileUploader = ({ orderId, onUploadComplete }) => {
  const { showToast } = useToast();
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleFileSelect = e => {
    if (e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      showToast('Please select a file to upload.', 'error');
      return;
    }

    const maxFileSize = 50 * 1024 * 1024; // 50MB
    if (selectedFile.size > maxFileSize) {
      showToast('File size exceeds the 50MB limit.', 'error');
      return;
    }

    setUploading(true);
    setProgress(0);

    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      const response = await axios.post(`/file/upload/${orderId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: progressEvent => {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          setProgress(percentCompleted);
        },
      });

      setSelectedFile(null);
      showToast('File uploaded successfully!', 'success');

      if (typeof onUploadComplete === 'function') {
        onUploadComplete(response.data.file);
      }
    } catch (error) {
      console.error('Upload error:', error);
      showToast(
        error.response?.data?.message ||
          'An error occurred during file upload.',
        'error'
      );
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className='bg-white p-4 rounded-md shadow mb-4'>
      <h3 className='font-semibold text-lg mb-3'>Upload Deliverable</h3>

      <div className='space-y-4'>
        <div className='flex items-center justify-center w-full'>
          <label className='flex flex-col w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-all duration-200'>
            <div className='flex flex-col items-center justify-center pt-5 pb-6'>
              <svg
                className='w-8 h-8 mb-3 text-gray-500'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12'
                ></path>
              </svg>

              {selectedFile ? (
                <p className='mb-2 text-sm text-gray-700 font-semibold'>
                  {selectedFile.name} ({Math.round(selectedFile.size / 1024)}{' '}
                  KB)
                </p>
              ) : (
                <p className='mb-2 text-sm text-gray-500'>
                  <span className='font-semibold'>Click to upload</span> or drag
                  and drop
                </p>
              )}

              <p className='text-xs text-gray-500'>Max file size: 50MB</p>
            </div>
            <input
              type='file'
              className='hidden'
              onChange={handleFileSelect}
              disabled={uploading}
            />
          </label>
        </div>

        {uploading && (
          <div className='w-full bg-gray-200 rounded-full h-2.5'>
            <div
              className='bg-blue-600 h-2.5 rounded-full transition-all duration-300'
              style={{ width: `${progress}%` }}
            ></div>
            <p className='text-xs text-gray-600 text-right mt-1'>
              {progress}% uploaded
            </p>
          </div>
        )}

        <div className='flex justify-end'>
          <button
            type='button'
            onClick={handleUpload}
            disabled={!selectedFile || uploading}
            className={`px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors ${
              !selectedFile || uploading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {uploading ? 'Uploading...' : 'Upload File'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default FileUploader;
