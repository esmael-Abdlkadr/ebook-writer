import React from "react";
import { useSections } from "../../../contexts/SectionContext";

interface Section {
  id: string;
  title: string;
  children?: Section[];
}
interface SectionItemProps {
  section: Section;
  onAddSubsection: (parentId: string | null, level: number) => void;
  onEditSection: (sectionId: string, currentTitle: string) => void;
  level: number;
}

const SectionItem: React.FC<SectionItemProps> = ({
  section,
  onAddSubsection,
  level = 0,
  onEditSection,
}) => {
  const { deleteSection } = useSections();

  const userString = localStorage.getItem("user");
  const user = userString ? JSON.parse(userString) : null;
  const isAuthor = user?.role === "author";
  const isCollaborator = user?.role === "Collaborator";

  const handleDelete = () => {
    deleteSection(section.id);
  };

  return (
    <div className={`ml-${level * 4} relative`}>
      {/* Vertical line for hierarchy */}
      {level > 0 && (
        <div
          className="absolute left-[-16px] top-0 h-full border-l-2 border-gray-300"
          style={{ height: "100%" }}
        ></div>
      )}

      {/* Section content with horizontal line */}
      <div className="flex items-center gap-2">
        {level > 0 && (
          <div className="border-t-2 border-gray-300 w-4 mr-2"></div>
        )}
        <div className="flex items-center justify-between m-4 gap-4">
          <span className="section-title">{section.title}</span>
          <div className="flex items-center gap-3">
            {isAuthor && (
              <button
                className="bg-green-400 text-white px-3 py-1 rounded-md"
                onClick={() => onAddSubsection(section.id, level)}
              >
                Add
              </button>
            )}
            {isAuthor && (
              <button
                className="bg-yellow-400 text-white px-3 py-1 rounded-md"
                onClick={() => onEditSection(section.id, section.title)}
              >
                Edit
              </button>
            )}

            {(isAuthor || isCollaborator) && (
              <button
                className="bg-red-400 text-white px-3 py-1 rounded-lg"
                onClick={handleDelete}
              >
                Delete
              </button>
            )}
          </div>
        </div>
      </div>

      {section.children && section.children.length > 0 && (
        <div className="ml-4">
          {" "}
          {section.children.map((child) => (
            <SectionItem
              key={child.id}
              section={child}
              onAddSubsection={onAddSubsection}
              level={level + 1} // Increment the level for child sections
              onEditSection={onEditSection}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default SectionItem;
