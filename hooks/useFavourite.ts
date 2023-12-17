import { SafeUser } from '@/types';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useLoginModal } from './useLoginModal';
import {
  setAsFavouriteListing,
  unsetAsFavouriteListing,
} from '@/lib/actions/listing.actions';
import toast from 'react-hot-toast';

interface IUserFavourite {
  listingId: string;
  currentUser?: SafeUser | null;
}

const useFavourite = ({ listingId, currentUser }: IUserFavourite) => {
  const router = useRouter();
  const loginModal = useLoginModal();
  const [isFavourite, setIsFavourite] = useState(false);
  useEffect(() => {
    const listingIds = currentUser?.favouriteIds || [];
    if (listingIds.includes(listingId)) {
      setIsFavourite(true);
    } else {
      setIsFavourite(false);
    }
  }, [listingId, currentUser?.favouriteIds]);

  const toggleFavourite = async (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (!currentUser) {
      return loginModal.onOpen();
    }
    try {
      if (isFavourite) {
        await unsetAsFavouriteListing(listingId);
      } else {
        await setAsFavouriteListing(listingId);
      }
      router.refresh();
      toast.success('Success');
    } catch (error: any) {
      toast.error('Something went wrong!');
    }
  };

  return { isFavourite, toggleFavourite };
};

export default useFavourite;
