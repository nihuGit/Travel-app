import { PuffLoader } from 'react-spinners';

const Loader = () => {
  return (
    <div className='h-[70vh] w-full flex-center'>
      <PuffLoader color='#fd5c63' size={100} />
    </div>
  );
};

export default Loader;
