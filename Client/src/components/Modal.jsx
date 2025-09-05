import React from "react";

const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm border-white" >
      <div className="bg-card border-2 text-primary rounded-lg shadow-lg max-w-md w-full p-6 relative">
        <button
          className="absolute top-2 right-2 text-primary hover:text-primary-foreground h-8 w-8 text-2xl font-bold flex items-center justify-center"
          onClick={onClose}
          aria-label="Close modal"
        >
          &times;
        </button>
        {title && <h3 className="text-xl font-semibold mb-4">{title}</h3>}
        <div>{children}</div>
      </div>
    </div>
  );
};

export default Modal;
