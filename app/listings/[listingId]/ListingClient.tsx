'use client';
import { useEffect, useMemo, useState } from 'react';
import { SafeUser, SafeListing, SafeReservation } from '@/types';
import { categories } from '@/constants';
import { Range } from 'react-date-range';
import { differenceInDays, eachDayOfInterval } from 'date-fns';
import { useLoginModal } from '@/hooks/useLoginModal';
import { createReservation } from '@/lib/actions/reservation.actions';
import { useRouter } from 'next/navigation';
import ListingHead from '@/components/shared/listings/ListingHead';
import ListingInfo from '@/components/shared/listings/ListingInfo';
import toast from 'react-hot-toast';
import ListingReservation from '@/components/shared/listings/ListingReservation';

const selectionRange = {
  startDate: new Date(),
  endDate: new Date(),
  key: 'selection',
};

interface ListingClientProps {
  listing: SafeListing & { user: SafeUser };
  currentUser?: SafeUser | null;
  reservations?: SafeReservation[];
}

const ListingClient = ({
  listing,
  currentUser,
  reservations,
}: ListingClientProps) => {
  const router = useRouter();
  const loginModal = useLoginModal();
  const [isLoading, setIsLoading] = useState(false);
  const [dateRange, setDateRange] = useState<Range>(selectionRange);
  const [totalAmount, setTotalAmount] = useState(listing.price);
  const disabledDates = useMemo(() => {
    let dates: Date[] = [];
    reservations?.forEach((reservation) => {
      const ranges = eachDayOfInterval({
        start: new Date(reservation.startDate),
        end: new Date(reservation.endDate),
      });
      dates = [...dates, ...ranges];
    });
    return dates;
  }, [reservations]);
  const category = useMemo(
    () => categories.find((item) => item.label === listing.category),
    [listing.category]
  );

  const onCreateReservation = async () => {
    if (!currentUser) {
      return loginModal.onOpen();
    }
    setIsLoading(true);
    try {
      await createReservation({
        listingId: listing.id,
        startDate: dateRange.startDate as Date,
        endDate: dateRange.endDate as Date,
        totalAmount,
      });
      toast.success('Listing Reserved!');
      setDateRange(selectionRange);
      router.push('/trips');
    } catch (error) {
      toast.error('Something went wrong!');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (dateRange.startDate && dateRange.endDate) {
      const daysCount = differenceInDays(
        dateRange.endDate,
        dateRange.startDate
      );
      if (daysCount) {
        setTotalAmount(daysCount * listing.price);
      } else {
        setTotalAmount(listing.price);
      }
    }
  }, [dateRange, listing.price]);
  return (
    <div className='main-container'>
      <div className='max-w-screen-lg mx-auto'>
        <div className='flex flex-col gap-6'>
          <ListingHead
            id={listing.id}
            title={listing.title}
            locationValue={listing.location}
            image={listing.image}
            currentUser={currentUser}
          />
          <div className='grid grid-cols-1 md:grid-cols-7 md:gap-10 mt-6'>
            <ListingInfo
              user={listing.user}
              roomsCount={listing.bedrooms}
              bathroomsCount={listing.bathrooms}
              guestsCount={listing.guests}
              category={category}
              description={listing.description}
              location={listing.location}
            />
            <div className='order-first mb-10 md:order-last md:col-span-3'>
              <ListingReservation
                disabledDates={disabledDates}
                disabled={isLoading}
                totalAmount={totalAmount}
                price={listing.price}
                dateRange={dateRange}
                onChange={(value) => setDateRange(value)}
                onSubmit={onCreateReservation}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListingClient;
