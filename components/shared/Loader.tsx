import {PuffLoader} from 'react-spinners'

const Loader = () => {
  return <div className='h-[60vh] w-full flex-center'>
    <PuffLoader color='red' />
  </div>
}

export default Loader