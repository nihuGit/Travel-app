import { getListing } from '@/lib/actions/listing.actions';
import { getCurrentUser } from '@/lib/actions/user.actions';
import { getReservations } from '@/lib/actions/reservation.actions';
import ListingClient from './ListingClient';
import EmptyState from '@/components/shared/EmptyState';
import ClientOnly from '@/components/shared/ClientOnly';

const ListingDetails = async ({
  params,
}: {
  params: { listingId: string };
}) => {
  const listing = await getListing(params.listingId);
  const currentUser = await getCurrentUser();
  const reservations = await getReservations(params);
  if (!listing) {
    return (
      <ClientOnly>
        <EmptyState />
      </ClientOnly>
    );
  }
  return (
    <ClientOnly>
      <ListingClient
        listing={listing}
        currentUser={currentUser}
        reservations={reservations}
      />
    </ClientOnly>
  );
};

export default ListingDetails;
