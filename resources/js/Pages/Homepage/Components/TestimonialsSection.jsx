import React from 'react';
import TestimonialCard from '../../Components/TestimonialCard';

const TestimonialsSection = () => {
  // Testimonial data
  const testimonials = [
    {
      rating: 5,
      testimonial: "Sangat puas dengan hasil desain website dari talent MahaBisa. Proses komunikasi lancar dan hasil sesuai ekspektasi. Akan menggunakan jasa dari platform ini lagi di masa depan.",
      image: "https://randomuser.me/api/portraits/men/86.jpg",
      name: "Ahmad Fauzi",
      role: "Founder Startup Lokal"
    },
    {
      rating: 5,
      testimonial: "MahaBisa memberikan kesempatan bagi bisnis saya untuk mendapatkan bantuan dari mahasiswa berbakat dengan biaya yang terjangkau. Kualitas edit video yang saya dapatkan sangat profesional.",
      image: "https://randomuser.me/api/portraits/women/65.jpg",
      name: "Siti Nurhaliza",
      role: "Pemilik Online Shop"
    },
    {
      rating: 5,
      testimonial: "Sebagai mahasiswa yang ingin mencari penghasilan tambahan, MahaBisa adalah platform yang tepat. Saya bisa mendapatkan proyek yang sesuai dengan kemampuan dan jadwal kuliah saya.",
      image: "https://randomuser.me/api/portraits/men/35.jpg",
      name: "Rendra Pratama",
      role: "Mahasiswa Freelancer"
    }
  ];

  return (
    <section className="py-8 bg-slate-50">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-slate-900 mb-4">Apa Kata Mereka?</h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Berbagai pengalaman positif dari pengguna MahaBisa yang telah merasakan manfaat platform kami
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard 
              key={index}
              rating={testimonial.rating}
              testimonial={testimonial.testimonial}
              image={testimonial.image}
              name={testimonial.name}
              role={testimonial.role}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
