import { useEffect, useState } from "react";
import { Button } from "../components/dashboard/CustomButton";
import Dropdown from "../components/dashboard/DropDown";
import { useAuth } from "../contexts/AuthContext";
import Modal from "../components/dashboard/CustomeModal";
import toast from "react-hot-toast";
import { useSidebarContext } from "../contexts/SidebarContext";

function Admin() {
  const { user } = useAuth();
  const { isCollapsed } = useSidebarContext();
  interface User {
    id: string;
    fullName: string;
    email: string;
    role: string;
  }

  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [selectedRole, setSelectedRole] = useState<{
    value: string;
    label: string;
  } | null>(null);
  const [openAddRoleModal, setOpenAddRoleModal] = useState(false);
  const us = localStorage.getItem("user");
  console.log("user", us);
  const rolesOptions = [
    { value: "author", label: "Author" },
    { value: "collaborator", label: "Collaborator" },
  ];

  // Fetch users on component mount
  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch("http://localhost:3001/users");
      const data = await response.json();
      setUsers(data);
    };

    fetchUsers();
  }, []);

  const handleSelectUser = (user: User) => {
    setSelectedUser(user);
  };

  const handleRoleAssign = async () => {
    if (!selectedUser || !selectedRole) return;

    const updatedUser = { ...selectedUser, role: selectedRole.value.toLowerCase() };

    const response = await fetch(
      `http://localhost:3001/users/${selectedUser.id}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedUser),
      }
    );

    if (response.ok) {
      const data = await response.json();
      setUsers((prevUsers) =>
        prevUsers.map((user) => (user.id === data.id ? data : user))
      );
      localStorage.setItem("user", JSON.stringify(user));
      setSelectedUser(null); // Deselect after assignment
      setSelectedRole(null); // Reset the selected role
      toast.success(`Role assigned to ${data.fullName} successfully!`);
      setOpenAddRoleModal(false); // Close modal after assignment
    } else {
      toast.error("Failed to assign role."); // Display error message
    }
  };

  return (
    <div style={{ marginLeft: isCollapsed ? "90px" : "325px" }}>
      <h1 className="text-4xl text-slate-800 text-center my-4">
        User Management Dashboard
      </h1>

      <Button
        className="bg-blue-600 my-4 ml-4 hover:bg-blue-700"
        disabled={!selectedUser}
        onClick={() => {
          setOpenAddRoleModal(true);
        }}
      >
        Assign Permission
      </Button>

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
            onSelect={setSelectedRole}
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
                selectedUser === user ? "bg-blue-100" : ""
              }`}
              onClick={() => handleSelectUser(user)}
            >
              <td className="border border-gray-300 p-4">{user.fullName}</td>
              <td className="border border-gray-300 p-4">{user.email}</td>
              <td className="border border-gray-300 p-4">{user.role.toLowerCase()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Admin;