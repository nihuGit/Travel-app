'use client';
import { useRouter } from 'next/navigation';
import Button from '../ui/Button';
import Heading from './Heading';

interface EmptyStateProps {
  title?: string;
  subtitle?: string;
  showReset?: boolean;
}

const EmptyState = ({
  title = 'No exact matches',
  subtitle = 'Try changing or removing some of your filters',
  showReset,
}: EmptyStateProps) => {
  const router = useRouter();
  return (
    <div className='w-full h-[60vh] flex flex-col gap-2 justify-center items-center'>
      <Heading center title={title} subtitle={subtitle} />
      {showReset && (
        <div className='mt-4 w-48'>
          <Button
            label='Remove all filters'
            outline
            onClick={() => router.push('/')}
          />
        </div>
      )}
    </div>
  );
};

export default EmptyState;
