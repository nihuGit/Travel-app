'use client';
import { CldUploadWidget } from 'next-cloudinary';
import { TbPhotoPlus } from 'react-icons/tb';
import Image from 'next/image';

declare global {
  var cloudinary: any;
}

interface ImageUploadProps {
  value?: string;
  onChange: (value: string) => void;
}

const ImageUpload = ({ value, onChange }: ImageUploadProps) => {
  const handleUpload = (data: any) => {
    onChange(data.info.secure_url);
  };
  return (
    <CldUploadWidget
      uploadPreset='z969vdop'
      onUpload={handleUpload}
      options={{ maxFiles: 1 }}
    >
      {({ open }) => {
        return (
          <div
            onClick={() => open?.()}
            className='
            relative 
            cursor-pointer 
            flex 
            flex-col 
            gap-3 
            justify-center 
            items-center 
            p-20 
            border 
            border-dashed 
            border-neutral-300 
            transition 
            rounded-lg 
            hover:opacity-70'
          >
            <TbPhotoPlus size={50} />
            <p className='text-neutral-800 font-medium text-xl'>
              Click to Upload
            </p>

            {value && (
              <div className='absolute inset-0 z-10 w-full h-full'>
                <Image src={value} alt='House' fill className='object-cover' />
              </div>
            )}
          </div>
        );
      }}
    </CldUploadWidget>
  );
};

export default ImageUpload;
