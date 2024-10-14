// import React, { createContext, useContext, useState, useEffect } from "react";

// // Define the Section interface
// interface Section {
//   id: string;
//   title: string;
//   children?: Section[];
//   level: string;
// }

// // Define the context value type
// interface SectionsContextType {
//   sections: Section[];
//   addSection: (parentId: string | null, title: string) => void;
//   deleteSection: (sectionId: string) => void;
//   updateSection: (sectionId: string, newTitle: string) => void;
// }

// // Create the context
// const SectionsContext = createContext<SectionsContextType | undefined>(
//   undefined
// );

// // Custom hook for using the context
// export const useSections = () => {
//   const context = useContext(SectionsContext);
//   if (!context) {
//     throw new Error("useSections must be used within a SectionsProvider");
//   }
//   return context;
// };

// // Sections Provider component
// export const SectionsProvider: React.FC<{ children: React.ReactNode }> = ({
//   children,
// }) => {
//   // Retrieve sections from localStorage if available
//   const initialSections = JSON.parse(localStorage.getItem("sections") || "[]");

//   const [sections, setSections] = useState<Section[]>(initialSections);

//   // Update localStorage whenever sections change
//   useEffect(() => {
//     localStorage.setItem("sections", JSON.stringify(sections));
//   }, [sections]);

//   // Function to add a section
//   const addSection = (parentId: string | null, title: string) => {
//     const newSection: Section = {
//       id: String(new Date().getTime()), // Generate a unique ID
//       title,
//       level: "", // Initialize the level to an empty string
//       children: [],
//     };

//     const updateSections = (
//       sections: Section[],
//       parentId: string | null,
//       parentLevel: string
//     ): Section[] => {
//       return sections.map((section) => {
//         if (section.id === parentId) {
//           // Found the parent section
//           newSection.level = `${parentLevel}.${
//             (section.children?.length || 0) + 1
//           }`; // Increment child level
//           return {
//             ...section,
//             children: [...(section.children || []), newSection],
//           };
//         } else if (section.children) {
//           // Check children recursively
//           const updatedChildren = updateSections(
//             section.children,
//             parentId,
//             section.level
//           );
//           return { ...section, children: updatedChildren };
//         }
//         return section; // Return unchanged section
//       });
//     };

//     setSections((prevSections) => {
//       if (parentId) {
//         const parentLevel =
//           sections.find((section) => section.id === parentId)?.level || "0";
//         return updateSections(prevSections, parentId, parentLevel);
//       } else {
//         newSection.level = "0"; // Set level to 0 for top-level sections
//         return [...sections, newSection]; // Add as top-level section
//       }
//     });
//   };

//   // Function to delete a section
//   const deleteSection = (sectionId: string) => {
//     const removeSection = (
//       sections: Section[],
//       sectionId: string
//     ): Section[] => {
//       return sections
//         .filter((section) => section.id !== sectionId)
//         .map((section) => ({
//           ...section,
//           children: section.children
//             ? removeSection(section.children, sectionId)
//             : [],
//         }));
//     };

//     setSections((prevSections) => removeSection(prevSections, sectionId));
//   };

//   // Function to update a section's title
//   const updateSection = (sectionId: string, newTitle: string) => {
//     const modifySection = (sections: Section[]): Section[] => {
//       return sections.map((section) => {
//         if (section.id === sectionId) {
//           return { ...section, title: newTitle };
//         } else if (section.children) {
//           return {
//             ...section,
//             children: modifySection(section.children),
//           };
//         }
//         return section;
//       });
//     };

//     setSections((prevSections) => modifySection(prevSections));
//   };

//   return (
//     <SectionsContext.Provider
//       value={{ sections, addSection, deleteSection, updateSection }}
//     >
//       {children}
//     </SectionsContext.Provider>
//   );
// };
import React, { createContext, useContext, useState, useEffect } from "react";

// Define the Section interface
interface Section {
  id: string;
  title: string;
  content: string;
  createdBy: string; // The user who created the section
  editableBy: string[]; // List of users who can edit this section
  subsections?: Section[]; // Nested subsections
}

// Define the context value type
interface SectionsContextType {
  sections: Section[];
  addSection: (
    parentId: string | null,
    title: string,
    content: string,
    createdBy: string,
    editableBy: string[]
  ) => void;
  deleteSection: (sectionId: string) => void;
  updateSection: (
    sectionId: string,
    newTitle: string,
    newContent: string
  ) => void;
}

// Create the context
const SectionsContext = createContext<SectionsContextType | undefined>(
  undefined
);

// Custom hook for using the context
export const useSections = () => {
  const context = useContext(SectionsContext);
  if (!context) {
    throw new Error("useSections must be used within a SectionsProvider");
  }
  return context;
};

// Sections Provider component
export const SectionsProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // Retrieve sections from localStorage if available
  const initialSections = JSON.parse(localStorage.getItem("sections") || "[]");

  const [sections, setSections] = useState<Section[]>(initialSections);

  // Update localStorage whenever sections change
  useEffect(() => {
    localStorage.setItem("sections", JSON.stringify(sections));
  }, [sections]);

  // Function to add a section or subsection
  const addSection = (
    parentId: string | null,
    title: string,
    content: string,
    createdBy: string,
    editableBy: string[]
  ) => {
    const newSection: Section = {
      id: String(new Date().getTime()), // Generate a unique ID
      title,
      content,
      createdBy,
      editableBy,
      subsections: [], // Initialize with empty subsections
    };

    const updateSections = (
      sections: Section[],
      parentId: string | null
    ): Section[] => {
      return sections.map((section) => {
        if (section.id === parentId) {
          // Found the parent section
          return {
            ...section,
            subsections: [...(section.subsections || []), newSection],
          };
        } else if (section.subsections) {
          // Check subsections recursively
          const updatedSubsections = updateSections(
            section.subsections,
            parentId
          );
          return { ...section, subsections: updatedSubsections };
        }
        return section; // Return unchanged section
      });
    };

    setSections((prevSections) => {
      if (parentId) {
        // Adding a subsection
        return updateSections(prevSections, parentId);
      } else {
        // Adding a top-level section
        return [...sections, newSection];
      }
    });
  };

  // Function to delete a section or subsection
  const deleteSection = (sectionId: string) => {
    const removeSection = (
      sections: Section[],
      sectionId: string
    ): Section[] => {
      return sections
        .filter((section) => section.id !== sectionId)
        .map((section) => ({
          ...section,
          subsections: section.subsections
            ? removeSection(section.subsections, sectionId)
            : [],
        }));
    };

    setSections((prevSections) => removeSection(prevSections, sectionId));
  };

  // Function to update a section's title and content
  const updateSection = (
    sectionId: string,
    newTitle: string,
    newContent: string
  ) => {
    const modifySection = (sections: Section[]): Section[] => {
      return sections.map((section) => {
        if (section.id === sectionId) {
          return { ...section, title: newTitle, content: newContent };
        } else if (section.subsections) {
          return {
            ...section,
            subsections: modifySection(section.subsections),
          };
        }
        return section;
      });
    };

    setSections((prevSections) => modifySection(prevSections));
  };

  return (
    <SectionsContext.Provider
      value={{ sections, addSection, deleteSection, updateSection }}
    >
      {children}
    </SectionsContext.Provider>
  );
};
