import React, { useState } from "react";
import { useSections } from "../../contexts/SectionContext";
import SectionItem from "./sections/SectionItem";
import Modal from "./Modal";

const Sidebar: React.FC = () => {
  const { sections, addSection, updateSection } = useSections();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [parentSectionId, setParentSectionId] = useState<string | null>(null);
  const [, setParentSectionLevel] = useState<number | null>(null);
  const [currentSectionId, setCurrentSectionId] = useState<string | null>(null);
  const [currentSectionTitle, setCurrentSectionTitle] = useState("");

  const handleAddSection = (title: string) => {
    addSection(parentSectionId, title);
    setIsModalOpen(false);
  };

  const handleEditSection = (title: string) => {
    if (currentSectionId) {
      updateSection(currentSectionId, title);
    }
    setIsModalOpen(false);
  };

  const openModalForSection = (parentId: string | null, level: number) => {
    setParentSectionId(parentId);
    setParentSectionLevel(level);
    setModalTitle(parentId ? "Add Subsection" : "Add New Section");
    setIsModalOpen(true);
  };

  const openModalForEdit = (sectionId: string, currentTitle: string) => {
    setCurrentSectionId(sectionId);
    setCurrentSectionTitle(currentTitle);
    setModalTitle("Edit Section");
    setIsModalOpen(true);
  };

  return (
    <div className="h-screen w-[330px] bg-gray-800 fixed left-0 top-0">
      <div className="flex flex-col text-white h-full">
        <div className="p-4 flex items-center border-b border-gray-700">
          <h1 className="text-lg font-bold">Cloud Book Writer Platform</h1>
        </div>
        <div className="flex-1 overflow-y-auto">
          <nav>
            {sections.map((section) => (
              <SectionItem
                key={section.id}
                section={section}
                onAddSubsection={(parentId: string | null, level: number) =>
                  openModalForSection(parentId, level)
                }
                onEditSection={(sectionId: string, currentTitle: string) =>
                  openModalForEdit(sectionId, currentTitle)
                }
                level={0} // Initial level is 0 for top-level sections
              />
            ))}
          </nav>
        </div>
        <div className="p-4 border-t border-gray-700">
          <button
            className="w-full text-white bg-blue-500 p-2"
            onClick={() => openModalForSection(null, 0)}
          >
            Add New Section
          </button>
        </div>
      </div>
      {isModalOpen && (
        <Modal
          title={modalTitle}
          onClose={() => setIsModalOpen(false)}
          onSubmit={
            modalTitle === "Edit Section" ? handleEditSection : handleAddSection
          }
          initialValue={
            modalTitle === "Edit Section" ? currentSectionTitle : ""
          }
        />
      )}
    </div>
  );
};

export default Sidebar;
