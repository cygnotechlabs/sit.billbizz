import React, { useEffect, useRef } from "react";

type Props = {
  onClose: () => void;
  open: boolean;
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  align?: 'top' | 'center' | 'left' | 'right';
  labelledBy?: string;
  describedBy?: string;
};

const Modal = ({ onClose, open, children, className, style, align = 'center', labelledBy, describedBy }: Props) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const previouslyFocusedElement = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    if (open) {
      previouslyFocusedElement.current = document.activeElement as HTMLElement;
      modalRef.current?.focus();
      document.addEventListener("keydown", handleEscape);
    } else {
      document.removeEventListener("keydown", handleEscape);
      previouslyFocusedElement.current?.focus();
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [open, onClose]);

  const handleModalClick = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
  };

  const getPositionStyles = () => {
    switch (align) {
      case 'top':
        return 'justify-center items-start';
      case 'center':
        return 'justify-center items-center';
      case 'left':
        return 'justify-start items-center';
      case 'right':
        return 'justify-end items-center';
      default:
        return 'justify-center items-center';
    }
  };

  return (
    <>
      {open && (
        <div
          className={`fixed inset-0 z-20 flex ${getPositionStyles()} bg-black/20`}
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-labelledby={labelledBy}
          aria-describedby={describedBy}
        >
          <div
            ref={modalRef}
            className={`bg-white rounded-lg h-auto ${className || 'w-[60%]'}`}
            onClick={handleModalClick}
            style={style}
            tabIndex={-1}
          >
            {children}
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
