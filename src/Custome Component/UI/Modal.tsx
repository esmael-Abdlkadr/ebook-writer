import React, { useState, useEffect } from "react";

interface ModalProps {
  title: string;
  onClose: () => void;
  onSubmit: (value: string) => void;
  initialValue?: string;
}

const Modal: React.FC<ModalProps> = ({
  title,
  onClose,
  onSubmit,
  initialValue = "",
}) => {
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  const handleSubmit = () => {
    onSubmit(value);
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-md w-80">
        <h3 className="text-lg font-bold mb-4">{title}</h3>
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="w-full border border-gray-300 px-4 py-2 rounded-md mb-4"
          placeholder="Enter section title"
        />
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="bg-gray-400 text-white px-4 py-2 rounded-md mr-2"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="bg-blue-500 text-white px-4 py-2 rounded-md"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
