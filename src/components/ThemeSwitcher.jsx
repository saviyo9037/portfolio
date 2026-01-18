import React, { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { FaSun, FaMoon } from "react-icons/fa";

function ThemeSwitcher() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <button onClick={toggleTheme} className="p-2 rounded-full focus:outline-none">
      {theme === "dark" ? (
        <FaSun className="text-yellow-500" />
      ) : (
        <FaMoon className="text-gray-500" />
      )}
    </button>
  );
}

export default ThemeSwitcher;
