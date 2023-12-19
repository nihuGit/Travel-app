'use client';
import { useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { BiSearch } from 'react-icons/bi';
import { useSearchModal } from '@/hooks/useSearchModal';
import { differenceInDays } from 'date-fns';

const Search = () => {
  const searchModal = useSearchModal();
  const params = useSearchParams();
  const location = params?.get('location');
  const startDate = params?.get('startDate');
  const endDate = params?.get('endDate');
  const guestsCount = params?.get('guests');

  const locationLabel = useMemo(() => {
    return location ?? 'Anywhere';
  }, [location]);

  const durationLabel = useMemo(() => {
    if (startDate && endDate) {
      const start = new Date(startDate as string);
      const end = new Date(endDate as string);
      let diff = differenceInDays(start, end);
      if (diff === 0) {
        diff = 1;
      }
      return diff === 1 ? '1 Day' : `${diff} Days`;
    }
    return 'Any Week';
  }, [startDate, endDate]);

  const guestsLabel = useMemo(() => {
    if (guestsCount) {
      return +guestsCount === 1 ? '1 Guest' : `${guestsCount} Guests`;
    }
    return 'Add Guests';
  }, [guestsCount]);
  return (
    <div className='main-search' onClick={searchModal.onOpen}>
      <div className='flex-between'>
        <p className='text-medium-small px-6'>{locationLabel}</p>
        <div className='hidden sm:block border-x-[1px] text-medium-small px-6 border-x-neutral-200'>
          {durationLabel}
        </div>
        <div className='flex-center pl-6 pr-2 gap-4'>
          <p className='text-gray-600 text-medium-small hidden sm:block'>
            {guestsLabel}
          </p>
          <div className='flex-center rounded-full bg-rose-500 p-2 text-white font-bold'>
            <BiSearch size={18} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
