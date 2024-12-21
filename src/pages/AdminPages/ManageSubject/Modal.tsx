import React from 'react';

interface ModalProps {
  isVisible: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isVisible, onClose, children }) => {
  if (!isVisible) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      onClick={onClose} // Close modal when clicking outside
    >
      <div
        className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg h-auto max-h-[80vh] overflow-y-auto relative"
        onClick={(e) => e.stopPropagation()} // Prevent the modal from closing when clicking inside the modal
      >
        {/* Close Button */}
        <button
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-900 font-semibold text-xl"
          onClick={onClose} // Close modal when clicked
        >
          ✖
        </button>

        {/* Modal Content */}
        {children}
      </div>
      <div
        className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg h-auto max-h-[80vh] overflow-y-auto relative"
        onClick={(e) => e.stopPropagation()} // Prevent the modal from closing when clicking inside the modal
      >
        {/* Close Button */}
        <button
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-900 font-semibold text-xl"
          onClick={onClose} // Close modal when clicked
        >
          ✖
        </button>

        {/* Modal Content */}
        {children}
      </div>
    </div>
  );
};

export default Modal;
