import { useBooks } from "../../contexts/BookContext";
import Modal from "./Modal";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Sidebar: React.FC = () => {
  const { addBook } = useBooks();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalDescription, setModalDescription] = useState("");

  const userString = localStorage.getItem("user");
  const user = userString ? JSON.parse(userString) : null;
  const navigate = useNavigate();

  const handleAddBook = (title: string, description: string) => {
    if (title && description) {
      addBook(title, description, user?.id || "", []);
      setIsModalOpen(false);
      navigate("/dashboard/books");
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
    setModalTitle("");
    setModalDescription("");
  };

  return (
    <div className="h-screen w-[330px] bg-gray-800 fixed left-0 top-0">
      <div className="flex flex-col text-white h-full">
        <div className="p-4 flex items-center border-b border-gray-700">
          <h1 className="text-lg font-bold">Cloud Book Writer Platform</h1>
        </div>
        <div className="flex-1 overflow-y-auto">
          <nav>{/* Assuming you have a way to display books */}</nav>
        </div>

        <div className="p-4 border-t border-gray-700">
          <button
            className="w-full text-white bg-blue-500 p-2"
            onClick={openModal}
          >
            Add New Book
          </button>
        </div>
      </div>
      {isModalOpen && (
        <Modal
          title="New Book"
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleAddBook}
          initialInput1={modalTitle}
          initialInput2={modalDescription}
          input1Label="Book Title"
          input2Label="Book Description"
        />
      )}
    </div>
  );
};

export default Sidebar;
