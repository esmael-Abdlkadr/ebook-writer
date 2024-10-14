import React, { useState, useEffect } from "react";

interface ModalProps {
  title: string; // Title for the modal (e.g., "Edit Book" or "Add Section")
  onClose: () => void; // Function to handle modal close
  onSubmit: (input1: string, input2: string) => void; // Function to handle form submission
  initialInput1?: string; // Initial value for the first input (e.g., book title or section title)
  initialInput2?: string; // Initial value for the second input (e.g., book description or section content)
  input1Label?: string; // Label for the first input (e.g., "Title" or "Section Title")
  input2Label?: string; // Label for the second input (e.g., "Description" or "Section Content")
}

const Modal: React.FC<ModalProps> = ({
  title,
  onClose,
  onSubmit,
  initialInput1 = "",
  initialInput2 = "",
  input1Label = "Input 1", // Default label for the first input
  input2Label = "Input 2", // Default label for the second input
}) => {
  const [input1, setInput1] = useState(initialInput1);
  const [input2, setInput2] = useState(initialInput2);

  useEffect(() => {
    setInput1(initialInput1);
    setInput2(initialInput2);
  }, [initialInput1, initialInput2]);

  const handleSubmit = () => {
    if (!input1 || !input2) {
      alert("Please fill in both fields.");
      return;
    }
    onSubmit(input1, input2);
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-md w-80">
        <h3 className="text-lg font-bold mb-4">{title}</h3>
        <input
          type="text"
          value={input1}
          onChange={(e) => setInput1(e.target.value)}
          className="w-full border border-gray-300 px-4 py-2 rounded-md mb-4"
          placeholder={`Enter ${input1Label.toLowerCase()}`}
        />
        <input
          type="text"
          value={input2}
          onChange={(e) => setInput2(e.target.value)}
          className="w-full border border-gray-300 px-4 py-2 rounded-md mb-4"
          placeholder={`Enter ${input2Label.toLowerCase()}`}
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
            className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
