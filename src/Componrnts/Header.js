import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSearch } from "../context/SearchContext";
import { useTheme } from "../context/ThemeContext";
import { FaBars, FaTimes} from "react-icons/fa";
import { useRef, useEffect } from "react";
export default function Header(){
  const { searchQuery, setSearchQuery } = useSearch();
  const { darkMode, toggleDarkMode } = useTheme();
  const [isFocused, setIsFocused] = useState(false);
  const [query, setQuery] = useState("");

  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => {
    // setIsOpen(!isOpen);
    setIsOpen((prev) => !prev);
  }
//   const navRef = useRef();

//   const showNavbar = () => {
//       navRef.current.classList.toggle("responsive_nav");  
// }
  return(
    <header className="header-comp">
      <Link to="/" className="logo">MY BLOG..</Link>
      {/* Search Bar */}
      <div className="container">
      <div
        className={`search-bar ${isFocused ? "focused" : ""}`}
      >
        <input
          type="text"
          className="search-input"
          placeholder="Search..."
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>
    </div>  
    <button
          onClick={toggleDarkMode}
          className="theme-toggler"
        >
          {darkMode ? "🌙" : "☀️"}
        </button>

      <nav className={`nav-link ${isOpen ? "open" : ""}`}>
        <Link to="" className="buttons" onClick={toggleMenu}>About</Link>
        <Link to="" className="buttons" onClick={toggleMenu}>Blog</Link>
        <Link to=""className="buttons" onClick={toggleMenu}>Contact</Link>
        <Link to="/login"className="buttons" onClick={toggleMenu}>Login</Link>       { /* link ke sath to rhta h .*/ }
        <Link to="/register"className="buttons" onClick={toggleMenu}>Register</Link>
      </nav>
      <button className="nav-btn" onClick={toggleMenu}>
      {isOpen ? <FaTimes /> : <FaBars />}
      </button> 
    </header>
    );
}