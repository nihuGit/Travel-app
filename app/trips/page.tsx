import { getReservations } from '@/lib/actions/reservation.actions';
import { getCurrentUser } from '@/lib/actions/user.actions';
import ClientOnly from '@/components/shared/ClientOnly';
import EmptyState from '@/components/shared/EmptyState';
import TripsClient from './TripsClient';

const TripsPage = async () => {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return (
      <ClientOnly>
        <EmptyState title='Not Authorized' subtitle='Please Login!' />
      </ClientOnly>
    );
  }
  const reservations = await getReservations({ userId: currentUser?.id });
  if (reservations.length === 0) {
    return (
      <ClientOnly>
        <EmptyState
          title='No trips found'
          subtitle="Looks like you haven't reserved any trips"
        />
      </ClientOnly>
    );
  }
  return (
    <ClientOnly>
      <TripsClient currentUser={currentUser} reservations={reservations} />
    </ClientOnly>
  );
};

export default TripsPage;
