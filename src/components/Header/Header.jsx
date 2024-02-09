import React from "react";
import "./Header.css";
import { NavLink } from "react-router-dom";

function Header() {
  return (
    <div className="Hbody">
      <div className="nav-title">
        <h1 id="Header-title">Airlines System</h1>
      </div>

      <div className="nav-lists">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `${isActive ? " px-2 text-white bg-blue-600 rounded dark:bg-blue-500" : "text-black-700"}`
          }
        >
          Home
        </NavLink>
        <NavLink
          to="/book"
          className={({ isActive }) =>
            `${isActive ? "px-5 text-white bg-blue-600 rounded dark:bg-blue-500" : "text-black-700"}`
          }
        >
          Book
        </NavLink>
        <NavLink
          to="/ticketstatus"
          className={({ isActive }) =>
            `${isActive ? "px-2 text-white bg-blue-600 rounded dark:bg-blue-500" : "text-black-700"}`
          }
        >
          Ticket Status
        </NavLink>
        <NavLink
          to="/about"
          className={({ isActive }) =>
            `${isActive ? "px-2 text-white bg-blue-600 rounded dark:bg-blue-500" : "text-black-700"}`
          }
        >
          About
        </NavLink>

        <NavLink
          to="/contact"
          className={({ isActive }) =>
            `${isActive ? "px-2 text-white bg-blue-600 rounded dark:bg-blue-500" : "text-black-700"}`
          }
        >
          Contact
        </NavLink>
        <div className=" login-tag">
          <NavLink to="/login">Login/Register</NavLink>
        </div>
      </div>
    </div>
  );
}

export default Header;
