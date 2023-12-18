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
        className='
      grid 
      grid-cols-1 
      sm:grid-cols-2
      md:grid-cols-3 
      lg:grid-cols-4 
      xl:grid-cols-5 
      2xl:grid-cols-6 
      gap-8 
      mt-10'
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
