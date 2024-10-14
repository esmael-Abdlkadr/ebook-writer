import { useState } from "react";
import { useBooks } from "../contexts/BookContext";
import { Button } from "../components/dashboard/CustomButton";
import { useSidebarContext } from "../contexts/SidebarContext";
import { useNavigate } from "react-router-dom";
import Modal from "../components/dashboard/Modal";

interface Book {
  id: string;
  title: string;
  description: string;
}

const BookList = () => {
  const { books, deleteBook, updateBook } = useBooks();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const { isCollapsed } = useSidebarContext();
  const navigate = useNavigate();

  // Handle navigating to manage sections
  const handleManageSections = () => {
    if (selectedBook) {
      localStorage.setItem("selectedBookId", selectedBook.id);
      navigate("/dashboard/sections");
    }
  };

  // Handle Row Click (Selecting a Book)
  const handleSelectBook = (book: Book) => {
    setSelectedBook(book);
  };

  // Handle form submission from the modal
  const handleUpdateBook = (title: string, description: string) => {
    if (selectedBook) {
      updateBook(selectedBook.id, title, description); // Update the book with new values
      setIsModalOpen(false); // Close the modal after updating
    }
  };

  return (
    <div style={{ marginLeft: isCollapsed ? "90px" : "325px" }}>
      <h2 className="text-2xl font-bold mb-4  text-center">Book Management</h2>

      {/* Buttons at the top */}
      <div className="mb-4 flex space-x-4  ml-5">
        <Button
          className="bg-blue-600"
          disabled={!selectedBook}
          onClick={handleManageSections}
        >
          Manage Section
        </Button>
        <Button
          className="bg-blue-600"
          disabled={!selectedBook}
          onClick={() => setIsModalOpen(true)} // Open modal for editing
        >
          Edit
        </Button>
        <Button
          className="bg-red-600"
          disabled={!selectedBook}
          onClick={() => selectedBook && deleteBook(selectedBook.id)}
        >
          Delete
        </Button>
        <Button
          className="bg-yellow-600"
          disabled={!selectedBook}
          onClick={() => {
            localStorage.setItem("selectedBookId", selectedBook?.id || "");
            navigate("/dashboard/admin");
          }}
        >
          Add Collaborator
        </Button>
      </div>

      {/* Books Table */}
      <table className="min-w-full border-collapse border border-gray-200">
        <thead>
          <tr>
            <th className="border border-gray-300 p-4">Title</th>
            <th className="border border-gray-300 p-4">Description</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <tr
              key={book.id}
              className={`cursor-pointer ${
                selectedBook?.id === book.id ? "bg-blue-100" : ""
              }`}
              onClick={() => handleSelectBook(book)}
            >
              <td className="border border-gray-300 p-4">{book.title}</td>
              <td className="border border-gray-300 p-4">{book.description}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Edit Modal */}
      {isModalOpen && selectedBook && (
        <Modal
          title="Edit Book"
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleUpdateBook}
          initialInput1={selectedBook.title} // Pre-fill book title
          initialInput2={selectedBook.description} // Pre-fill book description
          input1Label="Book Title" // Dynamic label for the first input
          input2Label="Book Description" // Dynamic label for the second input
        />
      )}
    </div>
  );
};

export default BookList;
