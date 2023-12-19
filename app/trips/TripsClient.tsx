'use client';

import { SafeReservation, SafeUser } from '@/types';
import { useState } from 'react';
import { deleteReservation } from '@/lib/actions/reservation.actions';
import { useRouter } from 'next/navigation';
import ListingCard from '@/components/cards/ListingCard';
import Heading from '@/components/shared/Heading';
import toast from 'react-hot-toast';

interface TripsClientProps {
  currentUser?: SafeUser | null;
  reservations?: SafeReservation[];
}

const TripsClient = ({ currentUser, reservations }: TripsClientProps) => {
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
      <Heading
        title='My Trips'
        subtitle='Where you have been and where you are going'
      />
      <div className='grid-container'>
        {reservations?.map((reservation: any) => (
          <ListingCard
            key={reservation.id}
            listing={reservation.listing}
            reservation={reservation}
            currentUser={currentUser}
            actionLabel='Cancel Reservation'
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
