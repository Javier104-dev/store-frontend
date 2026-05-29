import { type ReactNode, forwardRef } from 'react';

export type ModalProps = {
  children?: ReactNode;
  modalBoxClassName?: string;
  closeOnOutClick?: boolean;
  close?: () => void;
};

export const Modal = forwardRef<HTMLDialogElement, ModalProps>(
  ({ children, modalBoxClassName, closeOnOutClick = true, close }, ref) => {
    const handleBackdropPointerDown = (
      e: React.PointerEvent<HTMLDialogElement>,
    ) => {
      if (closeOnOutClick && e.target === e.currentTarget) {
        close?.();
      }
    };

    return (
      <dialog
        ref={ref}
        aria-modal="true"
        onPointerDown={handleBackdropPointerDown}
        className={`m-auto focus:outline-none p-4 rounded-md backdrop:bg-black/30 border border-grey-20 text-[#464646] ${
          modalBoxClassName ?? ''
        }`}
      >
        {children}
      </dialog>
    );
  },
);
