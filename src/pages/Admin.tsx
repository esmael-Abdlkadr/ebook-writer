import { useEffect, useState } from "react";
import { Button } from "../components/dashboard/CustomButton";
import Dropdown from "../components/dashboard/DropDown";
import Modal from "../components/dashboard/CustomeModal";
import toast from "react-hot-toast";
import { useBooks } from "../contexts/BookContext";
import { useSidebarContext } from "../contexts/SidebarContext";

function Admin() {
  const { isCollapsed } = useSidebarContext();
  const { addCollaborator, books, isAuthor } = useBooks();

  interface User {
    id: string;
    fullName: string;
    email: string;
    role: string;
  }

  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User[]>([]);
  const [openAddRoleModal, setOpenAddRoleModal] = useState(false);
  const rolesOptions = [{ value: "collaborator", label: "Collaborator" }];

  // Get selected book ID from localStorage (this is the book the user is adding a collaborator to)
  const selectedBookId = localStorage.getItem("selectedBookId");
  const selectedBook = books.find((book) => book.id === selectedBookId);

  // Get the logged-in user from localStorage
  const userString = localStorage.getItem("user");
  const currentUser = userString ? JSON.parse(userString) : null;

  // Fetch users on component mount
  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch("http://localhost:3001/users");
      const data = await response.json();
      const filteredUsers = data.filter((user: User) => {
        // Filter out users who are already collaborators in the selected book
        const isAlreadyCollaborator = selectedBook?.collaborators.some(
          (collaborator) => collaborator.userId === user.id
        );
        return !isAlreadyCollaborator && user.role === "user"; // Keep only 'user' roles that are not collaborators
      });
      setUsers(filteredUsers);
    };

    fetchUsers();
  }, [selectedBook]);

  const handleSelectUser = (user: User) => {
    setSelectedUser((prevSelectedUsers) => [...prevSelectedUsers, user]);
  };

  // Updated function to add collaborator to the selected book only
  const handleRoleAssign = () => {
    if (selectedUser.length === 0 || !selectedBookId) return;

    // Call the addCollaborator function to add this user as a collaborator for the selected book
    selectedUser.forEach((user) => {
      addCollaborator(selectedBookId, user.id);
      toast.success(`${user.fullName} added as a collaborator!`);
    });
    setSelectedUser([]); // Reset the selected users
  };

  return (
    <div style={{ marginLeft: isCollapsed ? "90px" : "325px" }}>
      <h1 className="text-4xl text-slate-800 text-center my-4">
        User Management Dashboard
      </h1>

      {/* Check if the current user is the author of the selected book */}
      {selectedBook &&
        currentUser &&
        isAuthor(selectedBook, currentUser.id) && (
          <Button
            className="bg-blue-600 my-4 ml-4 hover:bg-blue-700"
            disabled={selectedUser.length === 0}
            onClick={() => {
              setOpenAddRoleModal(true);
            }}
          >
            Assign Permission
          </Button>
        )}

      {openAddRoleModal && (
        <Modal
          isOpen={openAddRoleModal}
          onClose={() => setOpenAddRoleModal(false)}
          title="Add New Role"
          size="medium"
        >
          <Dropdown
            options={rolesOptions}
            title="Assign Role"
            onSelect={() => {}}
          />
          <Button className="bg-green-600 mt-4" onClick={handleRoleAssign}>
            Confirm Assignment
          </Button>
        </Modal>
      )}

      <table className="min-w-full border-collapse border border-gray-200">
        <thead>
          <tr>
            <th className="border border-gray-300 p-4">Full Name</th>
            <th className="border border-gray-300 p-4">Email</th>
            <th className="border border-gray-300 p-4">Role</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr
              key={user.email}
              className={`cursor-pointer ${
                selectedUser.includes(user) ? "bg-blue-100" : ""
              }`}
              onClick={() => handleSelectUser(user)}
            >
              <td className="border border-gray-300 p-4">{user.fullName}</td>
              <td className="border border-gray-300 p-4">{user.email}</td>
              <td className="border border-gray-300 p-4">
                {user.role.toLowerCase()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Admin;
