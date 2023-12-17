'use client';
interface HeadingProps {
  title: string;
  subtitle?: string;
  center?: boolean;
}
const Heading = ({ title, subtitle, center }: HeadingProps) => {
  return (
    <div className={`${center ? 'text-center' : 'text-start'}`}>
      <h2 className='font-bold text-2xl'>{title}</h2>
      <p className='text-neutral-800 mt-2'>{subtitle}</p>
    </div>
  );
};

export default Heading;
