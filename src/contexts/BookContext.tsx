// BookContext.tsx
import React, { createContext, useContext, useState, useEffect } from "react";

interface Collaborator {
  userId: string;
}

interface Section {
  id: string;
  title: string;
  content: string;
  createdBy: string;
  editableBy: string[];
  subsections?: Section[];
}

interface Book {
  id: string;
  title: string;
  description: string;
  createdBy: string;
  collaborators: Collaborator[];
  sections: Section[];
}

interface BookContextType {
  books: Book[];
  addBook: (
    title: string,
    description: string,
    createdBy: string,
    collaborators: Collaborator[]
  ) => void;
  deleteBook: (bookId: string) => void;
  updateBook: (
    bookId: string,
    newTitle: string,
    newDescription: string
  ) => void;
  addCollaborator: (bookId: string, userId: string) => void;
  addSectionToBook: (bookId: string, section: Section) => void;
  isAuthor: (book: Book, userId: string) => boolean; // Helper function
}

// Create the context
const BookContext = createContext<BookContextType | undefined>(undefined);
export const useBooks = () => {
  const context = useContext(BookContext);
  if (!context) {
    throw new Error("useBooks must be used within a BookProvider");
  }
  return context;
};

// Book Provider component
export const BookProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const initialBooks = JSON.parse(localStorage.getItem("books") || "[]");
  const [books, setBooks] = useState<Book[]>(initialBooks);

  // Update localStorage whenever books change
  useEffect(() => {
    localStorage.setItem("books", JSON.stringify(books));
  }, [books]);

  // Helper function to check if the user is the author of a specific book
  const isAuthor = (book: Book, userId: string): boolean => {
    return book.createdBy === userId;
  };

  // Function to add a book
  const addBook = (
    title: string,
    description: string,
    createdBy: string,
    collaborators: Collaborator[]
  ) => {
    const newBook: Book = {
      id: String(new Date().getTime()), // Generate a unique ID
      title,
      description,
      createdBy,
      collaborators: [...collaborators, { userId: createdBy }],
      sections: [], // Initialize with empty sections
    };
    setBooks((prevBooks) => [...prevBooks, newBook]); // Update state
  };

  // Function to delete a book
  const deleteBook = (bookId: string) => {
    setBooks((prevBooks) => prevBooks.filter((book) => book.id !== bookId));
  };

  // Function to update a book's title and description
  const updateBook = (
    bookId: string,
    newTitle: string,
    newDescription: string
  ) => {
    setBooks((prevBooks) =>
      prevBooks.map((book) =>
        book.id === bookId
          ? { ...book, title: newTitle, description: newDescription }
          : book
      )
    );
  };

  // Function to add a collaborator to a specific book
  const addCollaborator = (bookId: string, userId: string) => {
    setBooks((prevBooks) =>
      prevBooks.map((book) =>
        book.id === bookId
          ? { ...book, collaborators: [...book.collaborators, { userId }] }
          : book
      )
    );
  };

  // Function to add a section to a book's `sections` array
  const addSectionToBook = (bookId: string, section: Section) => {
    setBooks((prevBooks) =>
      prevBooks.map((book) =>
        book.id === bookId
          ? { ...book, sections: [...book.sections, section] } // Add section to the book
          : book
      )
    );
  };

  return (
    <BookContext.Provider
      value={{
        books,
        addBook,
        deleteBook,
        updateBook,
        addCollaborator,
        addSectionToBook,
        isAuthor, // Include helper in context
      }}
    >
      {children}
    </BookContext.Provider>
  );
};
