'use client';

import { SafeReservation, SafeUser } from '@/types';
import { useState } from 'react';
import { deleteReservation } from '@/lib/actions/reservation.actions';
import { useRouter } from 'next/navigation';
import ListingCard from '@/components/cards/ListingCard';
import Heading from '@/components/shared/Heading';
import toast from 'react-hot-toast';

interface ReservationsClientProps {
  currentUser?: SafeUser | null;
  reservations?: SafeReservation[];
}

const TripsClient = ({
  currentUser,
  reservations,
}: ReservationsClientProps) => {
  const [deletingId, setDeletingId] = useState('');
  const router = useRouter();
  const onCancel = async (id: string) => {
    try {
      setDeletingId(id);
      await deleteReservation(id);
      toast.success('Reservation Cancelled');
      router.refresh();
    } catch (error) {
      toast.error('Something went wrong!');
    } finally {
      setDeletingId('');
    }
  };
  return (
    <div className='main-container'>
      <Heading title='My Reservations' subtitle='Bookings on your properties' />
      <div
        className='
      grid
      grid-cols-1
      sm:grid-cols-2
      md:grid-cols-3
      lg:grid-cols-4
      xl:grid-cols-5
      2xl:grid-cols-6
      gap-6
      mt-10
      '
      >
        {reservations?.map((reservation: any) => (
          <ListingCard
            key={reservation.id}
            listing={reservation.listing}
            reservation={reservation}
            currentUser={currentUser}
            actionLabel='Cancel Guest Reservation'
            actionId={reservation.id}
            disabled={deletingId === reservation.id}
            onAction={onCancel}
          />
        ))}
      </div>
    </div>
  );
};

export default TripsClient;
