'use client';

import { ReactElement, useEffect, useState } from 'react';
import { IoMdClose } from 'react-icons/io';
import Button from '@/components/ui/Button';

interface ModalProps {
  isOpen?: boolean;
  onClose: () => void;
  onSubmit: () => void;
  title?: string;
  body?: ReactElement;
  footer?: ReactElement;
  actionLabel: string;
  disabled?: boolean;
  secondaryAction?: () => void;
  secondaryActionLabel?: string;
}

const Modal = ({
  isOpen,
  onClose,
  onSubmit,
  title,
  body,
  footer,
  actionLabel,
  disabled,
  secondaryAction,
  secondaryActionLabel,
}: ModalProps) => {
  const [showModal, setShowModal] = useState(isOpen);

  useEffect(() => {
    setShowModal(isOpen);
  }, [isOpen]);

  const handleClose = () => {
    if (disabled) {
      return;
    }
    setShowModal(false);
    setTimeout(() => {
      onClose();
    }, 300);
  };
  if (!isOpen) {
    return null;
  }
  return (
    <div className='modal-overlay'>
      <div className='modal-container'>
        <div
          className={`translate duration-300 h-full ${
            showModal ? 'translate-y-0' : 'translate-y-full'
          } ${showModal ? 'opacity-100' : 'opacity-0'}`}
        >
          <div className='modal-content'>
            <div
              className='
            p-6 
            flex-center 
            border-b 
            relative 
            rounded-t
            '
            >
              <button
                className='
                absolute 
                left-9 
                cursor-pointer 
                transition 
                hover:opacity-70 
                border-0 
                p-1'
                onClick={handleClose}
              >
                <IoMdClose size={18} />
              </button>
              <p className='text-bold-large'>{title}</p>
            </div>
            <div className='relative p-6'>{body}</div>
            <div className='flex-col-start gap-2 p-6'>
              <div className='flex items-center gap-4 w-full'>
                {secondaryAction && secondaryActionLabel && (
                  <Button
                    outline
                    disabled={disabled}
                    label={secondaryActionLabel}
                    onClick={secondaryAction}
                  />
                )}
                <Button
                  disabled={disabled}
                  label={actionLabel}
                  onClick={onSubmit}
                />
              </div>
              {footer}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
