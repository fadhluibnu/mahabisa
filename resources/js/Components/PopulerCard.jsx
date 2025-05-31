const PopulerCard = ({
  image,
  isBestSeller,
  isBookmarked,
  userName,
  userLevel,
  title,
  rating,
  reviewCount,
  price,
  onBookmarkClick,
}) => {
  return (
    <div className='bg-white rounded-2xl shadow-md overflow-hidden relative w-full h-full'>
      <div className='relative'>
        <img src={image} alt={title} className='w-full h-56 object-cover' />
        {isBestSeller && (
          <span className='absolute top-3 left-3 bg-[#7C3AED] text-white text-xs font-semibold px-3 py-1 rounded-full'>
            Best Seller
          </span>
        )}
        <button
          type='button'
          className='absolute top-3 right-3 bg-white/80 rounded-full p-2 shadow'
          onClick={onBookmarkClick}
        >
          <svg
            width='22'
            height='22'
            viewBox='0 0 22 22'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M6.41667 3.66667C5.26599 3.66667 4.33333 4.59933 4.33333 5.75V18.3333L11 15.125L17.6667 18.3333V5.75C17.6667 4.59933 16.734 3.66667 15.5833 3.66667H6.41667Z'
              stroke='#7C3AED'
              strokeWidth='1.5'
              strokeLinecap='round'
              strokeLinejoin='round'
              fill={isBookmarked ? '#7C3AED' : 'none'}
            />
          </svg>
        </button>
      </div>
      <div className='p-4'>
        <div className='flex items-center gap-2 mb-4'>
          <img
            src='https://randomuser.me/api/portraits/women/37.jpg'
            alt={userName}
            className='w-7 h-7 rounded-full object-cover'
          />
          <div>
            <div className='font-semibold text-sm text-slate-800 leading-tight'>
              {userName}
            </div>
            <div className='text-xs text-slate-400'>{userLevel}</div>
          </div>
        </div>
        <div className='font-bold text-base text-slate-900 mb-2 leading-snug'>
          {title}
        </div>
        <div className='flex items-center justify-between mt-4'>
          <div className='flex items-center gap-1 text-[#F59E42] text-sm font-semibold'>
            <svg width='16' height='16' fill='none' viewBox='0 0 16 16'>
              <path
                d='M8 1.333l2.06 4.177 4.607.67-3.334 3.25.787 4.583L8 11.177l-4.12 2.336.787-4.583-3.334-3.25 4.607-.67L8 1.333z'
                stroke='#F59E42'
                strokeWidth='1.2'
                strokeLinejoin='round'
              />
            </svg>
            {rating}
            <span className='text-slate-400 font-normal ml-1'>
              ({reviewCount})
            </span>
          </div>
          <div className='font-bold text-slate-900 text-base'>Rp{price}</div>
        </div>
      </div>
    </div>
  );
};

export default PopulerCard;
