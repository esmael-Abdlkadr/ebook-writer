import { useState, useEffect } from "react";
import { LuMenu, LuX } from "react-icons/lu";

import { Link } from "react-router-dom";

function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [openNav, setOpenNav] = useState(false);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);

  return (
    <nav className="bg-white fixed w-full z-20 top-0 start-0 border-b border-gray-200  mb-6">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link to={"/"}>
          <h1 className="text-3xl  font-bold text-nowrap text-[#404040]">
            <span className="text-[#0284c7]"> Ebook </span> Writer
          </h1>
        </Link>
        <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          <Link
            to={"/sign-up"}
            className="text-white bg-[#0EA5E9] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center  hidden sm:block"
          >
            Sign up
          </Link>
          <button
            data-collapse-toggle="navbar-sticky"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200  "
            aria-controls="navbar-sticky"
            aria-expanded="false"
            onClick={handleClick}
          >
            {isOpen ? <LuX size={25} /> : <LuMenu size={25} />}
          </button>
        </div>
        <div
          className={`items-center justify-between ${
            isOpen ? "flex" : "hidden"
          } w-full md:flex md:w-auto md:order-1`}
          id="navbar-sticky"
        >
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
