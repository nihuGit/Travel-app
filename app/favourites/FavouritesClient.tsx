import { SafeListing, SafeUser } from '@/types';
import Heading from '@/components/shared/Heading';
import ListingCard from '@/components/cards/ListingCard';

interface FavouritesClientProps {
  listings: SafeListing[];
  currentUser?: SafeUser | null;
}

const FavouritesClient = ({ listings, currentUser }: FavouritesClientProps) => {
  return (
    <div className='main-container'>
      <Heading
        title='My Favourites'
        subtitle='List of places you favourited!'
      />
      <div
        className='grid-container'
      >
        {listings.map((listing) => (
          <ListingCard
            key={listing.id}
            listing={listing}
            currentUser={currentUser}
          />
        ))}
      </div>
    </div>
  );
};

export default FavouritesClient;
