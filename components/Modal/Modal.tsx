'use client';

import css from './Modal.module.css'
import { createPortal } from 'react-dom';
import { useEffect } from 'react';

interface ModalProps {
  children: React.ReactNode;
  onClose: () => void;
}

export default function Modal({ children, onClose }: ModalProps) {
    const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEsc);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "";
    };
  }, [onClose]);

    return createPortal(
    <div 
    className={css.backdrop}
    onClick={handleBackdropClick}
    role="dialog"
    aria-modal="true"
>
  <div className={css.modal}>{children}
  </div>
</div>,
document.body
);
}