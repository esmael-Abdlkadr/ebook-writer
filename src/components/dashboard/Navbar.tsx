import { HiMiniUser, HiOutlineArrowRightOnRectangle } from "react-icons/hi2";
import { useEffect, useRef, useState } from "react";
import { HiOutlineChevronDown } from "react-icons/hi";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { useSidebarContext } from "../../contexts/SidebarContext";

const Navbar = () => {
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);
  interface User {
    id: string;
    fullName: string;
    email: string;
    role: string;
  }

  const [user, setUser] = useState<User | null>(null);

  const { logout } = useAuth();
  const { isCollapsed } = useSidebarContext();

  const dropDownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleLogoutClick = async (
    event: React.MouseEvent<HTMLLIElement, MouseEvent>
  ) => {
    event.preventDefault();
    await logout();
    navigate("/login", { replace: true });
    window.history.pushState(null, "", "/login"); // Clear history
  };

  // Global click event listener to close the dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropDownRef.current &&
        !dropDownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };
    document.addEventListener("keydown", handleEscapeKey);
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, []);

  // user data.
  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  return (
    <div
      style={{ marginLeft: isCollapsed ? "90px" : "280px" }}
      className={"bg-[#e2e8f0]  flex gap-5 justify-between"}
    >
      <div></div>

      {/*flex-2*/}
      <div className={"flex items-center  gap-4  flex-end"}>
        <div className="relative font-sans w-max mx-auto" ref={dropDownRef}>
          <button
            type="button"
            onClick={toggleDropdown}
            className="px-6 py-3 rounded text-white text-sm font-semibold border-none outline-none flex items-center gap-4 bg-white"
          >
            <HiMiniUser
              size={30}
              className={"text-white bg-[#2563eb] rounded-full"}
            />
            <div className={"flex flex-col"}>
              <span className={"text-xs text-[#3b82f6]"}>
                {user?.role.toLowerCase() === "user" ? "" : "Administrator"}
              </span>
              <span className={"text-slate-700 font-semibold"}>
                {user && <span>{user?.fullName}</span>}
              </span>
            </div>
            <HiOutlineChevronDown
              size={25}
              color={"white"}
              className={"mb-3"}
            />
          </button>

          <ul
            className={`absolute ${
              isOpen ? "block" : "hidden"
            } shadow-lg bg-white py-2 z-[1000] min-w-full w-max rounded max-h-96 overflow-auto`}
          >
            <li className="flex items-center py-3 px-6 bg-[#e2e8f0] hover:bg-blue-50 text-black text-sm cursor-pointer">
              <div className="flex flex-wrap items-center justify-center gap-4 cursor-pointer">
                <div>
                  <p className="text-[15px] text-gray-800 font-bold">
                    {user && <span>{user?.fullName}</span>}
                  </p>
                  <p className="text-xs text-gray-500 mt-0.5">
                    {user && user.email}
                  </p>
                </div>
              </div>
            </li>
            <div className="h-[1px] bg-gray-300 w-full"></div>

            <div className="h-[1px] bg-gray-300 w-full"></div>

            <div className="h-[1px] bg-gray-300 w-full"></div>
            <li
              onClick={handleLogoutClick}
              className="flex items-center gap-3 py-3 px-6 hover:bg-blue-50 cursor-pointer text-[#334155]"
            >
              <HiOutlineArrowRightOnRectangle size={25} />
              Log Out
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
