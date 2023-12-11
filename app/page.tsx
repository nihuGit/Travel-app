import { getAllListings } from '@/lib/actions/listing.actions';
import { getCurrentUser } from '@/lib/actions/user.actions';
import EmptyState from '@/components/shared/EmptyState';
import ListingCard from '@/components/cards/ListingCard';

const Home = async () => {
  const listings = await getAllListings();
  const currentUser = await getCurrentUser();
  if (listings.length === 0) {
    return <EmptyState showReset />;
  }
  return (
    <div className='main-container w-full h-full'>
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
      w-full
      pt-28'
      >
        {listings?.map((listing) => (
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

export default Home;
