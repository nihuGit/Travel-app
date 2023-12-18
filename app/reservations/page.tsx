import { getReservations } from '@/lib/actions/reservation.actions';
import { getCurrentUser } from '@/lib/actions/user.actions';
import ClientOnly from '@/components/shared/ClientOnly';
import EmptyState from '@/components/shared/EmptyState';
import ReservationsClient from './ReservationsClient';

const ReservationsPage = async () => {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return (
      <ClientOnly>
        <EmptyState title='Not Authorized' subtitle='Please Login!' />
      </ClientOnly>
    );
  }
  const reservations = await getReservations({ authorId: currentUser.id });
  if (reservations.length === 0) {
    return (
      <ClientOnly>
        <EmptyState
          title='No reservations found'
          subtitle='Looks like you have no reservations on your properties'
        />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <ReservationsClient
        currentUser={currentUser}
        reservations={reservations}
      />
    </ClientOnly>
  );
};

export default ReservationsPage;
