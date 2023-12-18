'use client';
import { format } from 'date-fns';
import { SafeUser, SafeListing, SafeReservation } from '@/types';
import { useMemo } from 'react';
import { useLoginModal } from '@/hooks/useLoginModal';
import Link from 'next/link';
import Image from 'next/image';
import useCountries from '@/hooks/useCountries';
import HeartButton from '../shared/HeartButton';
import Button from '../ui/Button';

interface ListingCardProps {
  listing: SafeListing;
  currentUser: SafeUser | null | undefined;
  reservation?: SafeReservation;
  actionLabel?: string;
  onAction?: (id: string) => void;
  disabled?: boolean;
  actionId?: string;
}

const ListingCard = ({
  listing,
  currentUser,
  reservation,
  actionLabel,
  onAction,
  actionId = '',
  disabled,
}: ListingCardProps) => {
  const loginModal = useLoginModal();
  const { getCountry } = useCountries();
  const location = getCountry(listing.location);
  const reservationDate = useMemo(() => {
    if (!reservation) {
      return null;
    }
    const start = new Date(reservation.startDate);
    const end = new Date(reservation.endDate);
    return `${format(start, 'PP')} - ${format(end, 'PP')}`;
  }, [reservation]);
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!currentUser) {
      return loginModal.onOpen();
    }
    if (disabled) {
      return;
    }
    onAction?.(actionId);
  };
  return (
    <Link
      className='w-full group col-span-1 cursor-pointer'
      // onClick={() => router.push(`/listings/${listing.id}`)}
      href={`/listings/${listing.id}`}
    >
      <div className='flex flex-col gap-2 w-full'>
        <div className='relative w-full aspect-square rounded-xl overflow-hidden'>
          <Image
            src={listing.image}
            alt='Listing'
            fill
            className='object-cover transition w-full h-full group-hover:opacity-90'
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
          <p className='font-semibold'>${listing.price}</p>
          {!reservationDate && <p className='font-light'>night</p>}
        </div>
        {actionLabel && onAction && (
          <Button
            label={actionLabel}
            onClick={handleClick}
            disabled={disabled}
          />
        )}
      </div>
    </Link>
  );
};

export default ListingCard;
