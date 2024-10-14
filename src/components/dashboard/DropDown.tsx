import React, { useState } from "react";

interface Option {
  value: string;
  label: string;
}

interface DropdownProps {
  options: Option[];
  errorMessage?: string;
  title: string;
  onSelect: (option: Option) => void;
}

const Dropdown: React.FC<DropdownProps> = ({
  options,
  errorMessage,
  title,
  onSelect,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedOption, setSelectedOption] = useState<Option | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelect = (option: Option) => {
    setSelectedOption(option);
    setIsOpen(false);
    setSearchTerm("");
    onSelect(option); // Call the onSelect function with the selected option
  };

  return (
    <div className="relative ">
      <label
        htmlFor={title}
        className="block text-sm font-semibold text-gray-500 mb-2"
      >
        {title}
      </label>
      <div
        className="px-4 py-3 bg-gray-100 w-full text-sm outline-none border-b-2 border-primary-100 rounded mt-4 cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        {selectedOption ? selectedOption.label : `Select  ${title}`}
      </div>
      {isOpen && (
        <div className="absolute z-10 mt-2 w-full bg-white border border-gray-300 rounded shadow-lg max-h-60 overflow-y-auto">
          <ul>
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option) => (
                <li
                  key={option.value}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                  onClick={() => handleSelect(option)}
                >
                  {option.label}
                </li>
              ))
            ) : (
              <li className="px-4 py-2 text-gray-500 text-sm">
                No results found
              </li>
            )}
          </ul>
        </div>
      )}
      {errorMessage && (
        <p className="text-red-500 text-sm mt-1">{errorMessage}</p>
      )}
    </div>
  );
};

export default Dropdown;
