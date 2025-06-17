import React, { useRef, useState, useEffect } from 'react';
import PopulerCard from '@/Components/PopulerCard';
import { Link, usePage } from '@inertiajs/react';

const PopularSection = () => {
  const { featuredServices } = usePage().props;

  // Transform the API data to match the PopulerCard props
  const populerCards = featuredServices
    ? featuredServices.map(service => ({
        id: service.id,
        image: service.thumbnail || '/assets/default-service.png',
        isBestSeller: service.view_count > 100,
        label:
          service.view_count > 100
            ? 'Best Seller'
            : service.view_count > 50
              ? 'Popular'
              : '',
        userName: service.user?.name || 'Anonymous',
        userLevel: `Level ${Math.min(5, Math.floor((service.user?.freelancerOrders_count || 0) / 10) + 1)} Seller`,
        title: service.title,
        rating: service.avg_rating || 0,
        reviewCount: service.reviews_count || 0,
        price: service.price,
      }))
    : [];
  const scrollRef = useRef(null);
  const [activePage, setActivePage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(4);
  const [totalPages, setTotalPages] = useState(
    Math.ceil(populerCards.length / itemsPerPage)
  );
  const [cardWidth, setCardWidth] = useState('calc(25% - 15px)'); // Default card width

  // Update itemsPerPage and card width based on screen size
  useEffect(() => {
    const handleResize = () => {
      let newItemsPerPage = 4; // Default for large screens
      let newCardWidth = 'calc(25% - 12px)';

      if (window.innerWidth < 640) {
        newItemsPerPage = 1; // Mobile
        newCardWidth = '100%';
      } else if (window.innerWidth < 1024) {
        newItemsPerPage = 2; // Tablet
        newCardWidth = 'calc(50% - 8px)';
      } else if (window.innerWidth < 1280) {
        newItemsPerPage = 3; // Small desktop
        newCardWidth = 'calc(33.333% - 10px)';
      }

      setCardWidth(newCardWidth);
      setItemsPerPage(newItemsPerPage);
      setTotalPages(Math.ceil(populerCards.length / newItemsPerPage));

      // Reset to first page when layout changes
      if (activePage >= Math.ceil(populerCards.length / newItemsPerPage)) {
        setActivePage(0);
        if (scrollRef.current) {
          scrollRef.current.scrollTo({ left: 0, behavior: 'smooth' });
        }
      }
    };

    handleResize(); // Initial setup
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [populerCards.length, activePage]);

  const scrollByPage = () => {
    return scrollRef.current?.clientWidth || 0;
  };

  const handleNext = () => {
    if (scrollRef.current && activePage < totalPages - 1) {
      const newPage = activePage + 1;
      scrollRef.current.scrollTo({
        left: newPage * scrollByPage(),
        behavior: 'smooth',
      });
      setActivePage(newPage);
    }
  };

  const handlePrev = () => {
    if (scrollRef.current && activePage > 0) {
      const newPage = activePage - 1;
      scrollRef.current.scrollTo({
        left: newPage * scrollByPage(),
        behavior: 'smooth',
      });
      setActivePage(newPage);
    }
  };

  const handleDotClick = pageIndex => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        left: pageIndex * scrollByPage(),
        behavior: 'smooth',
      });
      setActivePage(pageIndex);
    }
  };

  return (
    <section className='pt-12 md:pt-16 lg:pt-20 pb-8 px-4 md:px-6 lg:px-0'>
      <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 md:mb-8 gap-4'>
        <div>
          <h1 className='font-bold text-2xl sm:text-3xl md:text-4xl'>
            Jasa Populer
          </h1>
          <p className='text-sm md:text-md font-normal text-slate-400 mt-2 md:mt-3'>
            Jasa dengan rating tinggi yang banyak dibutuhkan
          </p>
        </div>
        <a
          href='/eksplorasi'
          className='flex items-center hover:underline gap-2 md:gap-3 text-[#7C3AED] text-sm md:text-base'
        >
          Lihat Semua
          <svg
            width='14'
            height='14'
            viewBox='0 0 14 14'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M1.16663 6.68001H12.8333M12.8333 6.68001L6.99996 0.84668M12.8333 6.68001L6.99996 12.5133'
              stroke='#7C3AED'
              strokeWidth='1.66667'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
          </svg>
        </a>
      </div>
      <div className='w-full max-w-[1320px] mx-auto relative'>
        <div
          className='flex overflow-x-hidden scrollbar-hide scroll-smooth'
          ref={scrollRef}
          style={{ scrollbarWidth: 'none' }}
        >
          {Array.from({ length: totalPages }).map((_, pageIndex) => (
            <div
              key={`page-${pageIndex}`}
              className='flex justify-start flex-shrink-0 w-full'
              style={{ gap: '16px' }}
            >
              {populerCards
                .slice(pageIndex * itemsPerPage, (pageIndex + 1) * itemsPerPage)
                .map((card, cardIdx) => (
                  <div
                    key={card.title + cardIdx}
                    className='flex-shrink-0'
                    style={{ width: cardWidth }}
                  >
                    <Link href={`/jasa/${card.id}`} className='block'>
                      <PopulerCard
                        image={card.image}
                        isBestSeller={card.isBestSeller}
                        label={card.label}
                        userName={card.userName}
                        userLevel={card.userLevel}
                        title={card.title}
                        rating={card.rating}
                        reviewCount={card.reviewCount}
                        price={card.price}
                        isBookmarked={false}
                        onBookmarkClick={e => {
                          e.preventDefault(); // Prevent navigation when bookmark is clicked
                          // Handle bookmark logic here if needed
                        }}
                      />
                    </Link>
                  </div>
                ))}{' '}
            </div>
          ))}
        </div>
        <div className='flex flex-col items-center justify-center gap-3 mt-6 md:mt-8'>
          <div className='flex items-center gap-3 md:gap-4'>
            <button
              type='button'
              onClick={handlePrev}
              className='rounded-full p-1.5 md:p-2 border border-slate-300 hover:bg-slate-100 bg-white shadow transition disabled:opacity-50 disabled:cursor-not-allowed'
              disabled={activePage === 0}
            >
              <svg
                width='20'
                height='20'
                fill='none'
                viewBox='0 0 24 24'
                className='md:w-6 md:h-6'
              >
                <path
                  d='M15 19l-7-7 7-7'
                  stroke='#7C3AED'
                  strokeWidth='2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
              </svg>
            </button>

            <div className='flex items-center gap-1.5 md:gap-2'>
              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i}
                  type='button'
                  onClick={() => handleDotClick(i)}
                  className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-colors ${
                    i === activePage ? 'bg-[#7C3AED]' : 'bg-gray-200'
                  }`}
                  aria-label={`Halaman ${i + 1}`}
                />
              ))}
            </div>

            <button
              type='button'
              onClick={handleNext}
              className='rounded-full p-1.5 md:p-2 border border-slate-300 hover:bg-slate-100 bg-white shadow transition disabled:opacity-50 disabled:cursor-not-allowed'
              disabled={activePage === totalPages - 1}
            >
              <svg
                width='20'
                height='20'
                fill='none'
                viewBox='0 0 24 24'
                className='md:w-6 md:h-6'
              >
                <path
                  d='M9 5l7 7-7 7'
                  stroke='#7C3AED'
                  strokeWidth='2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PopularSection;
