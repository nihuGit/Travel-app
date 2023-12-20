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
      uploadPreset="z969vdop"
      onUpload={handleUpload}
      options={{ maxFiles: 1 }}
    >
      {({ open }) => {
        return (
          <div onClick={() => open?.()} className='upload-box'>
            <TbPhotoPlus size={50} />
            <p className='text-medium-extra'>Click to Upload</p>

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
