import { getCurrentUser } from '@/lib/actions/user.actions';
import { getAllListings } from '@/lib/actions/listing.actions';
import ClientOnly from '@/components/shared/ClientOnly';
import EmptyState from '@/components/shared/EmptyState';
import PropertiesClient from './PropertiesClient';

const PropertiesPage = async () => {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return (
      <ClientOnly>
        <EmptyState title='Not Authorized' subtitle='Please Login' />
      </ClientOnly>
    );
  }

  const listings = await getAllListings({ userId: currentUser.id });
  if (listings.length === 0) {
    return (
      <ClientOnly>
        <EmptyState
          title='No properties found'
          subtitle='Looks like you have no properties.'
        />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <PropertiesClient listings={listings} currentUser={currentUser} />
    </ClientOnly>
  );
};

export default PropertiesPage;
