'use client';
import { format } from 'date-fns';
import { Listing, Reservation } from '@prisma/client';
import { useRouter } from 'next/navigation';
import { SafeUser } from '@/types';
import { useMemo } from 'react';
import Image from 'next/image';
import useCountries from '@/hooks/useCountries';
import HeartButton from '../shared/HeartButton';

interface ListingCardProps {
  listing: Listing;
  currentUser: SafeUser | null;
  reservation?: Reservation;
}

const ListingCard = ({
  listing,
  currentUser,
  reservation,
}: ListingCardProps) => {
  const router = useRouter();
  const { getCountry } = useCountries();
  const location = getCountry(listing.location);
  const reservationDate = useMemo(() => {
    if (!reservation) {
      return null;
    }
    const start = new Date(reservation.startDate);
    const end = new Date(reservation.endDate);
    return `${(format(start, 'PP'), format(end, 'PP'))}`;
  }, [reservation]);
  return (
    <div
      className='w-full group col-span-1 cursor-pointer'
      onClick={() => router.push(`/listings/${listing.id}`)}
    >
      <div className='flex flex-col gap-2 w-full'>
        <div className='relative w-full aspect-square group-hover:scale-110 rounded-xl overflow-hidden'>
          <Image
            src={listing.image}
            alt='Listing'
            fill
            className='object-cover transition w-full h-full'
          />
          <div className='absolute top-3 right-3'>
            <HeartButton listingId={listing.id} currentUser={currentUser} />
          </div>
        </div>
        <p className='text-medium-large'>
          {location?.region}, {location?.label}
        </p>
        <p className='text-neutral-500 font-light'>
          {reservationDate || listing.category}
        </p>
        <div className='flex gap-1'>
          <p className='font-semibold'>$ {listing.price}</p>
          {!reservationDate && <p className='font-light'>night</p>}
        </div>
      </div>
    </div>
  );
};

export default ListingCard;
