import { useState, useEffect } from "react";
import { useBooks } from "../contexts/BookContext";
import { Button } from "../components/dashboard/CustomButton";
import Modal from "../components/dashboard/Modal";
import { useSidebarContext } from "../contexts/SidebarContext";
import React from "react";

const Sections = () => {
  const { books, addSectionToBook, updateBook } = useBooks();
  const [selectedSection, setSelectedSection] = useState<any>(null);
  const [isSectionModalOpen, setIsSectionModalOpen] = useState(false);
  const [isSubsectionModalOpen, setIsSubsectionModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false); // For editing
  const [sectionTitle, setSectionTitle] = useState("");
  const [sectionContent, setSectionContent] = useState("");
  const [selectedBook, setSelectedBook] = useState<any>(null);
  const [isEditDisabled, setIsEditDisabled] = useState(true);
  const { isCollapsed } = useSidebarContext();

  // Retrieve the selected book ID from localStorage
  useEffect(() => {
    const bookId = localStorage.getItem("selectedBookId");
    const book = books.find((book) => book.id === bookId);
    setSelectedBook(book || null); // Set selectedBook or null if not found
  }, [books]);

  // Handle opening the Add Section modal
  const handleAddSection = () => {
    setSectionTitle(""); // Reset values
    setSectionContent("");
    setIsSectionModalOpen(true);
  };

  // Handle opening the Add Subsection modal
  const handleAddSubsection = () => {
    setSectionTitle(""); // Reset values
    setSectionContent("");
    setIsSubsectionModalOpen(true);
  };

  // Handle Add Section form submission
  const handleAddSectionSubmit = (title: string, content: string) => {
    if (!title || !content) {
      alert("Please fill in both title and content.");
      return;
    }

    const newSection = {
      id: String(new Date().getTime()),
      title,
      content,
      createdBy: selectedBook?.createdBy || "",
      editableBy: [selectedBook?.createdBy || ""],
      subsections: [],
    };

    // Use addSectionToBook instead of updateBook
    addSectionToBook(selectedBook?.id, newSection);

    setIsSectionModalOpen(false);
  };

  // Handle Add Subsection form submission
  // const handleAddSubsectionSubmit = (title: string, content: string) => {
  //   if (!title || !content) {
  //     alert("Please fill in both title and content.");
  //     return;
  //   }

  //   const newSubsection = {
  //     id: String(new Date().getTime()),
  //     title,
  //     content,
  //     createdBy: selectedBook?.createdBy || "",
  //     editableBy: [selectedBook?.createdBy || ""],
  //   };

  //   selectedSection.subsections.push(newSubsection);
  //   addSectionToBook(selectedBook?.id, selectedSection); // Add the updated section with new subsection

  //   setIsSubsectionModalOpen(false);
  // };
  // Handle Add Subsection form submission
  const handleAddSubsectionSubmit = (title: string, content: string) => {
    if (!title || !content) {
      alert("Please fill in both title and content.");
      return;
    }

    const newSubsection = {
      id: String(new Date().getTime()),
      title,
      content,
      createdBy: selectedBook?.createdBy || "",
      editableBy: [selectedBook?.createdBy || ""],
    };

    selectedSection.subsections.push(newSubsection);

    setIsSubsectionModalOpen(false);
  };
  // Handle selecting a section
  const handleSelectSection = (section: any) => {
    setSelectedSection(section);
    setIsEditDisabled(false);
  };

  // Handle Edit Section
  const handleEditSection = () => {
    if (selectedSection) {
      setSectionTitle(selectedSection.title);
      setSectionContent(selectedSection.content);
      setIsEditModalOpen(true);
    }
  };

  // Handle Edit Section form submission
  const handleEditSectionSubmit = (title: string, content: string) => {
    if (selectedSection) {
      selectedSection.title = title;
      selectedSection.content = content;
      updateBook(
        selectedBook?.id,
        selectedBook?.title,
        selectedBook?.description
      );

      setIsEditModalOpen(false);
    }
  };

  // Handle Delete Section
  const handleDeleteSection = () => {
    if (selectedBook && selectedSection) {
      selectedBook.sections = selectedBook.sections.filter(
        (section: any) => section.id !== selectedSection.id
      );
      updateBook(selectedBook.id, selectedBook.title, selectedBook.description);
      setSelectedSection(null);
      setIsEditDisabled(true);
    }
  };

  return (
    <div style={{ marginLeft: isCollapsed ? "90px" : "325px" }}>
      <h2 className="text-2xl font-bold mb-4 text-center my-4">
        Section Management
      </h2>

      {/* Buttons at the top */}
      <div className="mb-4 flex space-x-4 ml-4">
        <Button className="bg-blue-600" onClick={handleAddSection}>
          Add Section
        </Button>
        <Button
          className="bg-blue-600"
          disabled={isEditDisabled}
          onClick={handleEditSection}
        >
          Edit Section
        </Button>
        <Button
          className="bg-red-600"
          disabled={isEditDisabled}
          onClick={handleDeleteSection}
        >
          Delete Section
        </Button>
        <Button
          className="bg-yellow-600"
          disabled={isEditDisabled}
          onClick={handleAddSubsection}
        >
          Add Subsection
        </Button>
      </div>

      {/* Sections Table */}
      <table className="min-w-full border-collapse border border-gray-200">
        <thead>
          <tr>
            <th className="border border-gray-300 p-4">Title</th>
            <th className="border border-gray-300 p-4">Content</th>
          </tr>
        </thead>
        <tbody>
          {selectedBook?.sections.map((section: any) => (
            <React.Fragment key={section.id}>
              <tr
                className={`cursor-pointer ${
                  selectedSection === section ? "bg-blue-100" : ""
                }`}
                onClick={() => handleSelectSection(section)}
              >
                <td className="border border-gray-300 p-4">{section.title}</td>
                <td className="border border-gray-300 p-4">
                  {section.content}
                </td>
              </tr>

              {/* Display subsections */}
              {section.subsections.map((subsection: any) => (
                <tr key={subsection.id} className="bg-gray-100">
                  <td className="border border-gray-300 p-4 pl-8">
                    {subsection.title} (Subsection)
                  </td>
                  <td className="border border-gray-300 p-4">
                    {subsection.content}
                  </td>
                </tr>
              ))}
            </React.Fragment>
          ))}
        </tbody>
      </table>

      {/* Add Section Modal */}
      {isSectionModalOpen && (
        <Modal
          title="Add New Section"
          onClose={() => setIsSectionModalOpen(false)}
          onSubmit={handleAddSectionSubmit}
          initialInput1={sectionTitle} // Pre-fill section title
          initialInput2={sectionContent} // Pre-fill section content
          input1Label="Section Title"
          input2Label="Section Content"
        />
      )}

      {/* Add Subsection Modal */}
      {isSubsectionModalOpen && (
        <Modal
          title="Add New Subsection"
          onClose={() => setIsSubsectionModalOpen(false)}
          onSubmit={handleAddSubsectionSubmit}
          initialInput1={sectionTitle}
          initialInput2={sectionContent}
          input1Label="Subsection Title"
          input2Label="Subsection Content"
        />
      )}

      {/* Edit Section Modal */}
      {isEditModalOpen && (
        <Modal
          title="Edit Section"
          onClose={() => setIsEditModalOpen(false)}
          onSubmit={handleEditSectionSubmit}
          initialInput1={sectionTitle}
          initialInput2={sectionContent}
          input1Label="Section Title"
          input2Label="Section Content"
        />
      )}
    </div>
  );
};

export default Sections;
