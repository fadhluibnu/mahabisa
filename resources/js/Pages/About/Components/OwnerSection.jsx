import React from 'react';
import { FaLinkedin, FaGithub, FaInstagram, FaEnvelope } from 'react-icons/fa';

const OwnerSection = () => {
  const owners = [
    {
    name: "Fadhlu Ibnu 'Abbad",
    role: 'CEO - Founder',
    image: '/images/owners/ibnu.png', // Placeholder - ganti dengan path gambar yang sebenarnya
    bio: 'Mahasiswa Teknik Informatika dengan pengalaman 4 tahun dalam pengembangan web dan manajemen proyek.',
    social: [
        { icon: FaLinkedin, link: 'https://linkedin.com/in/fadhluibnu', label: 'LinkedIn' },
        { icon: FaGithub, link: 'https://github.com/fadhluibnu', label: 'GitHub' },
        { icon: FaInstagram, link: 'https://instagram.com/iybnuw', label: 'Instagram' },
        { icon: FaEnvelope, link: 'mailto:fadhluibnua@gmail.com', label: 'Email' },
    ],
    },
    {
    name: 'Muhammad Sulthonul Izza',
    role: 'Co-Founder',
    image: '/images/owners/izza.png', // Placeholder - ganti dengan path gambar yang sebenarnya
    bio: 'Mahasiswa Teknik Informatika dengan keahlian dalam Machine Learning dan pengembangan web.',
    social: [
        { icon: FaLinkedin, link: 'https://linkedin.com/in/m-s-izza', label: 'LinkedIn' },
        { icon: FaGithub, link: 'https://github.com/msikkc21', label: 'GitHub' },
        { icon: FaInstagram, link: 'https://instagram.com/m.s.ikkc21', label: 'Instagram' },
        { icon: FaEnvelope, link: 'mailto:izzaaida21@gmail.com', label: 'Email' },
    ],
    },
    {
      name: 'Muhammad Zakariyya',
      role: 'Co-Founder',
      image: '/images/owners/zaka.png', // Placeholder - ganti dengan path gambar yang sebenarnya
      bio: 'Mahasiswa Teknik Informatika dengan keahlian di bidang UI/UX Designer dan Software Engineer.',
      social: [
        { icon: FaLinkedin, link: 'https://www.linkedin.com/in/muhammad-zakariyya-946551284/', label: 'LinkedIn' },
        { icon: FaGithub, link: 'https://github.com/muhammadzakariyya13', label: 'GitHub' },
        { icon: FaInstagram, link: 'https://instagram.com/zkaryya.m', label: 'Instagram' },
        { icon: FaEnvelope, link: 'mailto:zakariyyam20@gmail.com', label: 'Email' },
      ],
    },
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-indigo-600 font-medium uppercase tracking-wider mb-2 block text-sm">
            Tim Kami
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
            Pendiri <span className="bg-gradient-to-r from-indigo-600 to-pink-500 bg-clip-text text-transparent">MahaBisa</span>
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Kenali pendiri di balik MahaBisa, mahasiswa dengan visi untuk membantu sesama mahasiswa
            menemukan peluang freelance dan mengembangkan keterampilan profesional mereka.
          </p>
        </div>        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {owners.map((owner, index) => (
            <div 
              key={index} 
              className={`bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${
                index === 0 ? 'order-1 md:order-2' : index === 1 ? 'order-2 md:order-1' : 'order-3'
              }`}
            >
              <div className="relative h-80 overflow-hidden">
                <img
                  src={owner.image}
                  alt={owner.name}
                  className="w-full h-full object-cover object-center"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/400x400?text=Foto+Owner';
                  }}
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-slate-900">{owner.name}</h3>
                <p className="text-indigo-600 font-medium mb-3">{owner.role}</p>
                <p className="text-slate-600 mb-4">{owner.bio}</p>
                
                <div className="flex space-x-3 mt-4">
                  {owner.social.map((item, idx) => {
                    const Icon = item.icon;
                    return (
                      <a 
                        key={idx}
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-slate-600 hover:text-indigo-600 transition-colors duration-200"
                        aria-label={item.label}
                      >
                        <Icon className="text-xl" />
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OwnerSection;
