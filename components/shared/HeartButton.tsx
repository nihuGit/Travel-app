import { SafeUser } from '@/types';
import { AiOutlineHeart } from 'react-icons/ai';

interface HeartButtonProps {
  listingId: string;
  currentUser: SafeUser | null;
}

const HeartButton = ({ listingId, currentUser }: HeartButtonProps) => {
  return (
    <div>
      <AiOutlineHeart size={18} />
    </div>
  );
};

export default HeartButton;
