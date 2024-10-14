import { useEffect } from "react";
import { IoIosClose } from "react-icons/io";
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  size?: "small" | "medium" | "large";
}
const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  footer,
  size = "medium",
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const sizeClasses = {
    small: "max-w-md sm:max-w-xs",
    medium: "max-w-xl sm:max-w-md",
    large: "max-w-5xl sm:max-w-2xl",
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-40 px-6 sm:px-2">
      <div className="fixed inset-0 bg-black opacity-50 -z-50"></div>
      <div
        className={`bg-white rounded-lg shadow-lg w-full ${sizeClasses[size]} z-50 max-h-[90vh]`}
      >
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b border-gray-200">
          {title && (
            <h3
              id="modal-title"
              className="text-xl font-semibold text-gray-800"
            >
              {title}
            </h3>
          )}
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-gray-300"
            aria-label="Close modal"
          >
            <IoIosClose size={27} />
          </button>
        </div>

        {/* Content */}
        <div id="modal-content" className="p-4 h-[300px] overflow-y-auto">
          {children}
        </div>

        {/* Footer */}
        {footer && (
          <div id="modal-footer" className="p-4 border-t border-gray-200">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
};

export default Modal;
