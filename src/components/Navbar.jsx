import { useState } from "react";

const Navbar = ({ setActiveSection }) => {
  return (
    <nav className="bg-gray-900 text-white p-4 fixed w-full top-0 shadow-lg flex justify-center space-x-6">
      {["Home", "Projects", "Skills", "Experience", "Hobbies", "Location", "Contact"].map((section) => (
        <button
          key={section}
          className="hover:bg-gray-700 px-4 py-2 rounded transition"
          onClick={() => setActiveSection(section)}
        >
          {section}
        </button>
      ))}
    </nav>
  );
};

export default Navbar;
