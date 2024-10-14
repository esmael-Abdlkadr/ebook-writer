import React from "react";
import { useSections } from "../../../contexts/SectionContext";

interface Section {
  id: string;
  title: string;
  subsections?: Section[];
}

interface SectionItemProps {
  section: Section;
  onAddSubsection: (parentId: string) => void;
  onEditSection: (sectionId: string, currentTitle: string) => void;
  level: number;
}

const SectionItem: React.FC<SectionItemProps> = ({
  section,
  onAddSubsection,
  onEditSection,
  level = 0,
}) => {
  const { deleteSection } = useSections();

  const handleDelete = () => {
    deleteSection(section.id);
  };

  return (
    <div className={`ml-${level * 4} relative`}>
      <div className="flex items-center gap-2">
        {level > 0 && (
          <div className="border-t-2 border-gray-300 w-4 mr-2"></div>
        )}
        <div className="flex items-center justify-between m-4 gap-4">
          <span className="section-title">{section.title}</span>
          <div className="flex items-center gap-3">
            <button
              className="bg-green-400 text-white px-3 py-1 rounded-md"
              onClick={() => onAddSubsection(section.id)}
            >
              Add Subsection
            </button>
            <button
              className="bg-yellow-400 text-white px-3 py-1 rounded-md"
              onClick={() => onEditSection(section.id, section.title)}
            >
              Edit
            </button>
            <button
              className="bg-red-400 text-white px-3 py-1 rounded-lg"
              onClick={handleDelete}
            >
              Delete
            </button>
          </div>
        </div>
      </div>

      {/* Render subsections recursively */}
      {section.subsections && section.subsections.length > 0 && (
        <div className="ml-4">
          {section.subsections.map((subsection) => (
            <SectionItem
              key={subsection.id}
              section={subsection}
              onAddSubsection={onAddSubsection}
              onEditSection={onEditSection}
              level={level + 1} // Increment level for nested subsections
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default SectionItem;
