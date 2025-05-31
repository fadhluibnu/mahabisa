import React from 'react';
import CategoryCard from '@/Components/CategoryCard';

const CategorySection = () => {
  return (
    <section className='pt-8 pb-12 md:pb-16 lg:pb-20'>
      <h1 className='font-bold text-3xl md:text-4xl text-center'>
        Jelajahi Kategori
      </h1>
      <p className='text-md font-normal text-slate-400 text-center mt-3 px-4 md:px-0'>
        Temukan jasa yang kamu butuhkan dari berbagai kategori
      </p>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mt-8 px-4 md:px-0'>
        <CategoryCard
          category={{
            name: 'Desain Grafis',
            jasa: '128 Jasa',
            image: 'assets/design.png',
          }}
        />
        <CategoryCard
          category={{
            name: 'Web Development',
            jasa: '200 Jasa',
            image: 'assets/web.png',
          }}
        />
        <CategoryCard
          category={{
            name: 'Video & Animasi',
            jasa: '150 Jasa',
            image: 'assets/video.png',
          }}
        />
        <CategoryCard
          category={{
            name: 'Penulisan & translasi',
            jasa: '54 Jasa',
            image: 'assets/penulisan.png',
          }}
        />
        <CategoryCard
          category={{
            name: 'Digital Marketing',
            jasa: '54 Jasa',
            image: 'assets/digital_marketing.png',
          }}
        />
        <CategoryCard
          category={{
            name: 'Musik & Audio',
            jasa: '41 Jasa',
            image: 'assets/musik.png',
          }}
        />
      </div>
    </section>
  );
};

export default CategorySection;
