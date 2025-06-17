// // OrderService.jsx

// import React, { useState } from 'react';
// import { Head, useForm } from '@inertiajs/react';
// import ClientLayout from '@/Pages/Client/Components/ClientLayout';
// import { useToast } from '@/Components/Toast';

// const OrderService = ({ service, selectedPackage }) => {
//   const { showToast } = useToast();
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [files, setFiles] = useState([]);

//   // Inisialisasi useForm tanpa data attachments, karena akan ditambahkan ke FormData secara manual
//   const { data, setData, post, processing, errors } = useForm({
//     requirements: '',
//     delivery_date: '',
//   });

//   const handleFileChange = (e) => {
//     setFiles(Array.from(e.target.files));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     setIsSubmitting(true);
    
//     const formData = new FormData();
//     formData.append('requirements', data.requirements);
    
//     // Pastikan delivery_date tidak kosong sebelum ditambahkan
//     if (data.delivery_date) {
//       formData.append('delivery_date', data.delivery_date);
//     }
    
//     // Append files with 'attachments[]' to handle multiple files correctly
//     files.forEach((file) => {
//       formData.append('attachments[]', file); // <-- Perubahan penting di sini
//     });

//     // Gunakan post dengan formData langsung
//     post(`/client/services/${service.id}/order`, {
//       data: formData, // Menggunakan properti 'data' untuk mengirim FormData
//       onSuccess: () => {
//         showToast('Pesanan berhasil dibuat!', 'success');
//       },
//       onError: (errors) => {
//         console.error("Form errors:", errors); // Untuk debugging
//         showToast('Terjadi kesalahan. Silakan periksa form anda.', 'error');
//         setIsSubmitting(false);
//       },
//       onFinish: () => {
//         setIsSubmitting(false);
//       },
//       // Penting: Set header Content-Type secara otomatis oleh browser saat menggunakan FormData
//       // Tidak perlu menyertakan headers: { 'Content-Type': 'multipart/form-data' } secara eksplisit
//     });
//   };

//   return (
//     <ClientLayout>
//       <Head title={`Pesan Jasa - ${service.title}`} />
      
//       <div className="py-6">
//         <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
//           <h1 className="text-2xl font-semibold text-gray-900 mb-6">Pesan Jasa</h1>
          
//           <div className="bg-white rounded-lg shadow overflow-hidden">
//             {/* Service summary */}
//             <div className="px-6 py-4 border-b border-gray-200">
//               <div className="flex items-center space-x-4">
//                 <div className="flex-shrink-0 h-12 w-12">
//                   <img 
//                     className="h-12 w-12 rounded-full object-cover"
//                     src={service.user?.profile_photo_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(service.user?.name || 'User')}&background=7C3AED&color=fff`}
//                     alt={service.user?.name}
//                   />
//                 </div>
//                 <div className="flex-1 min-w-0">
//                   <p className="text-lg font-medium text-gray-900 truncate">
//                     {service.title}
//                   </p>
//                   <p className="text-sm text-gray-500 truncate">
//                     Oleh: {service.user?.name}
//                   </p>
//                 </div>
//                 <div className="flex-shrink-0 text-right">
//                   <p className="text-lg font-bold text-gray-900">
//                     {new Intl.NumberFormat('id-ID', {
//                       style: 'currency',
//                       currency: 'IDR',
//                       minimumFractionDigits: 0
//                     }).format(selectedPackage?.price || service.price)}
//                   </p>
//                   <p className="text-sm text-gray-500">
//                     {selectedPackage?.name || 'Paket Dasar'}
//                   </p>
//                 </div>
//               </div>
//             </div>
            
//             {/* Order form */}
//             <form onSubmit={handleSubmit} className="p-6" encType='multipart/form-data'>
//               <div className="mb-6">
//                 <label htmlFor="requirements" className="block text-sm font-medium text-gray-700 mb-2">
//                   Persyaratan & Detail Pesanan <span className="text-red-500">*</span>
//                 </label>
//                 <textarea
//                   id="requirements"
//                   name="requirements"
//                   rows="6"
//                   value={data.requirements}
//                   onChange={e => setData('requirements', e.target.value)}
//                   className="shadow-sm focus:ring-[#7C3AED] focus:border-[#7C3AED] block w-full sm:text-sm border-gray-300 rounded-md"
//                   placeholder="Jelaskan secara detail apa yang Anda inginkan dari jasa ini. Semakin jelas permintaan Anda, semakin baik hasil yang akan Anda dapatkan."
//                   required
//                 ></textarea>
//                 {errors.requirements && (
//                   <p className="mt-1 text-sm text-red-600">{errors.requirements}</p>
//                 )}
//                 <p className="mt-2 text-sm text-gray-500">
//                   Min. 10 karakter. Sertakan semua detail yang relevan untuk memastikan freelancer dapat memahami kebutuhan Anda dengan baik.
//                 </p>
//               </div>
              
//               <div className="mb-6">
//                 <label htmlFor="delivery_date" className="block text-sm font-medium text-gray-700 mb-2">
//                   Tanggal Pengiriman yang Diharapkan
//                 </label>
//                 <input
//                   type="date"
//                   id="delivery_date"
//                   name="delivery_date"
//                   value={data.delivery_date}
//                   onChange={e => setData('delivery_date', e.target.value)}
//                   min={new Date().toISOString().split('T')[0]}
//                   className="shadow-sm focus:ring-[#7C3AED] focus:border-[#7C3AED] block w-full sm:text-sm border-gray-300 rounded-md"
//                 />
//                 {errors.delivery_date && (
//                   <p className="mt-1 text-sm text-red-600">{errors.delivery_date}</p>
//                 )}
//                 <p className="mt-2 text-sm text-gray-500">
//                   Opsional. Jika tidak diisi, tanggal pengiriman akan otomatis ditetapkan sesuai waktu pengerjaan paket.
//                 </p>
//               </div>
              
//               <div className="mb-6">
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Lampiran
//                 </label>
//                 <input
//                   type="file"
//                   name="attachments[]" // <-- Perubahan penting di sini
//                   onChange={handleFileChange}
//                   multiple
//                   className="block w-full text-sm text-gray-500
//                     file:mr-4 file:py-2 file:px-4
//                     file:rounded-md file:border-0
//                     file:text-sm file:font-medium
//                     file:bg-[#7C3AED] file:text-white
//                     hover:file:bg-[#6025c9]
//                   "
//                 />
//                 {errors.attachments && (
//                   <p className="mt-1 text-sm text-red-600">{errors.attachments}</p>
//                 )}
//                 <p className="mt-2 text-sm text-gray-500">
//                   Opsional. Ukuran maksimal file: 5MB. Format yang didukung: PDF, DOC, DOCX, JPG, JPEG, PNG.
//                 </p>
//                 {files.length > 0 && (
//                   <div className="mt-2">
//                     <p className="text-sm font-medium text-gray-700">File terpilih:</p>
//                     <ul className="mt-1 text-sm text-gray-500 list-disc pl-5">
//                       {files.map((file, index) => (
//                         <li key={index}>{file.name} ({Math.round(file.size / 1024)} KB)</li>
//                       ))}
//                     </ul>
//                   </div>
//                 )}
//               </div>
              
//               <div className="mt-8 flex justify-end">
//                 <button
//                   type="button"
//                   onClick={() => window.history.back()}
//                   className="mr-3 px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#7C3AED]"
//                 >
//                   Batal
//                 </button>
//                 <button
//                   type="submit"
//                   className="px-4 py-2 bg-[#7C3AED] border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-[#6025c9] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#7C3AED]"
//                   disabled={processing || isSubmitting}
//                 >
//                   {processing || isSubmitting ? 'Memproses...' : 'Lanjut ke Pembayaran'}
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       </div>
//     </ClientLayout>
//   );
// };

// export default OrderService;

import React, { useState } from 'react';
import { Head, useForm } from '@inertiajs/react'; // Import useForm
import ClientLayout from '@/Pages/Client/Components/ClientLayout';
import { useToast } from '@/Components/Toast';

const OrderService = ({ service, selectedPackage }) => {
  const { showToast } = useToast();

  // Inisialisasi useForm. File attachments akan ditambahkan secara otomatis oleh useForm
  // ketika properti data yang sesuai adalah objek File atau array File.
  const { data, setData, post, processing, errors, reset } = useForm({
    requirements: '',
    delivery_date: '',
    attachments: [], // Ini akan menampung file objek
  });

  const handleFileChange = (e) => {
    // Set attachments ke array file yang dipilih.
    // useForm secara otomatis akan menangani ini sebagai FormData ketika submit.
    setData('attachments', Array.from(e.target.files));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Data yang dikumpulkan oleh 'data' dari useForm akan otomatis diubah menjadi FormData
    // oleh Inertia saat metode 'post' dipanggil. Ini termasuk file yang ada di 'data.attachments'.
    post(`/client/services/${service.id}/order`, {
      onSuccess: () => {
        showToast('Pesanan berhasil dibuat!', 'success');
        reset(); // Opsional: Reset form setelah sukses
      },
      onError: (serverErrors) => { // 'errors' di sini adalah dari useForm
        console.error('Form errors:', serverErrors);
        showToast('Terjadi kesalahan. Silakan periksa form anda.', 'error');
      },
      onFinish: () => {
        // Logika final setelah request selesai (sukses atau gagal)
      },
    });
  };

  return (
    <ClientLayout>
      <Head title={`Pesan Jasa - ${service.title}`} />
      
      <div className="py-6">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-semibold text-gray-900 mb-6">Pesan Jasa</h1>
          
          <div className="bg-white rounded-lg shadow overflow-hidden">
            {/* Service summary */}
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0 h-12 w-12">
                  <img 
                    className="h-12 w-12 rounded-full object-cover"
                    src={service.user?.profile_photo_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(service.user?.name || 'User')}&background=7C3AED&color=fff`}
                    alt={service.user?.name}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-lg font-medium text-gray-900 truncate">
                    {service.title}
                  </p>
                  <p className="text-sm text-gray-500 truncate">
                    Oleh: {service.user?.name}
                  </p>
                </div>
                <div className="flex-shrink-0 text-right">
                  <p className="text-lg font-bold text-gray-900">
                    {new Intl.NumberFormat('id-ID', {
                      style: 'currency',
                      currency: 'IDR',
                      minimumFractionDigits: 0
                    }).format(selectedPackage?.price || service.price)}
                  </p>
                  <p className="text-sm text-gray-500">
                    {selectedPackage?.name || 'Paket Dasar'}
                  </p>
                </div>
              </div>
            </div>
            
            {/* Order form */}
            <form onSubmit={handleSubmit} className="p-6"> {/* Hapus encType='multipart/form-data' di sini, Inertia akan menanganinya */}
              <div className="mb-6">
                <label htmlFor="requirements" className="block text-sm font-medium text-gray-700 mb-2">
                  Persyaratan & Detail Pesanan <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="requirements"
                  name="requirements"
                  rows="6"
                  value={data.requirements} // Gunakan data.requirements
                  onChange={e => setData('requirements', e.target.value)} // Gunakan setData
                  className="shadow-sm focus:ring-[#7C3AED] focus:border-[#7C3AED] block w-full sm:text-sm border-gray-300 rounded-md"
                  placeholder="Jelaskan secara detail apa yang Anda inginkan dari jasa ini. Semakin jelas permintaan Anda, semakin baik hasil yang akan Anda dapatkan."
                  required
                ></textarea>
                {errors.requirements && ( // Tampilkan error dari useForm
                  <p className="mt-1 text-sm text-red-600">{errors.requirements}</p>
                )}
                <p className="mt-2 text-sm text-gray-500">
                  Min. 10 karakter. Sertakan semua detail yang relevan untuk memastikan freelancer dapat memahami kebutuhan Anda dengan baik.
                </p>
              </div>
              
              <div className="mb-6">
                <label htmlFor="delivery_date" className="block text-sm font-medium text-gray-700 mb-2">
                  Tanggal Pengiriman yang Diharapkan
                </label>
                <input
                  type="date"
                  id="delivery_date"
                  name="delivery_date"
                  value={data.delivery_date} // Gunakan data.delivery_date
                  onChange={e => setData('delivery_date', e.target.value)} // Gunakan setData
                  min={new Date().toISOString().split('T')[0]}
                  className="shadow-sm focus:ring-[#7C3AED] focus:border-[#7C3AED] block w-full sm:text-sm border-gray-300 rounded-md"
                />
                {errors.delivery_date && ( // Tampilkan error dari useForm
                  <p className="mt-1 text-sm text-red-600">{errors.delivery_date}</p>
                )}
                <p className="mt-2 text-sm text-gray-500">
                  Opsional. Jika tidak diisi, tanggal pengiriman akan otomatis ditetapkan sesuai waktu pengerjaan paket.
                </p>
              </div>
              
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Lampiran
                </label>
                <input
                  type="file"
                  name="attachments[]" // Tetap 'attachments[]' untuk multi-file
                  onChange={handleFileChange}
                  multiple
                  className="block w-full text-sm text-gray-500
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-md file:border-0
                    file:text-sm file:font-medium
                    file:bg-[#7C3AED] file:text-white
                    hover:file:bg-[#6025c9]
                  "
                />
                {errors.attachments && ( // Tampilkan error dari useForm
                  <p className="mt-1 text-sm text-red-600">{errors.attachments}</p>
                )}
                {/* Anda mungkin juga ingin menampilkan error untuk setiap file jika ada validasi attachments.* */}
                {Object.keys(errors).filter(key => key.startsWith('attachments.')).map((key) => (
                    <p key={key} className="mt-1 text-sm text-red-600">{errors[key]}</p>
                ))}
                <p className="mt-2 text-sm text-gray-500">
                  Opsional. Ukuran maksimal file: 5MB. Format yang didukung: PDF, DOC, DOCX, JPG, JPEG, PNG.
                </p>
                {data.attachments.length > 0 && ( // Gunakan data.attachments
                  <div className="mt-2">
                    <p className="text-sm font-medium text-gray-700">File terpilih:</p>
                    <ul className="mt-1 text-sm text-gray-500 list-disc pl-5">
                      {data.attachments.map((file, index) => ( // Gunakan data.attachments
                        <li key={index}>{file.name} ({Math.round(file.size / 1024)} KB)</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
              
              <div className="mt-8 flex justify-end">
                <button
                  type="button"
                  onClick={() => window.history.back()}
                  className="mr-3 px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#7C3AED]"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#7C3AED] border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-[#6025c9] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#7C3AED]"
                  disabled={processing} // Gunakan processing dari useForm
                >
                  {processing ? 'Memproses...' : 'Lanjut ke Pembayaran'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </ClientLayout>
  );
};

export default OrderService;