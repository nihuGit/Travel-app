import { getCurrentUser } from '@/lib/actions/user.actions';
import { getFavouriteListings } from '@/lib/actions/listing.actions';
import ClientOnly from '@/components/shared/ClientOnly';
import EmptyState from '@/components/shared/EmptyState';
import FavouritesClient from './FavouritesClient';

const FavouritesPage = async () => {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return (
      <ClientOnly>
        <EmptyState title='Not Authorized' subtitle='Please Login!' />
      </ClientOnly>
    );
  }
  const favouriteListings = await getFavouriteListings();
  if (favouriteListings.length === 0) {
    return (
      <ClientOnly>
        <EmptyState
          title='No favourites found'
          subtitle='Looks like you have no favourite listings'
        />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <FavouritesClient
        currentUser={currentUser}
        listings={favouriteListings}
      />
    </ClientOnly>
  );
};

export default FavouritesPage;
