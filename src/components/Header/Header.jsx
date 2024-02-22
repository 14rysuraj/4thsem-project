import React, { useContext } from "react";
import "./Header.css";
import { NavLink } from "react-router-dom";
import { context } from "../../main";
import axios from "axios";
import toast from "react-hot-toast";

function Header() {
  const { isAuthenticated, setIsAuthenticated } = useContext(context);

  const logoutHandler = async () => {
    try {
      const response = await axios.get("/api/v1/users/logout", {
        withCredentials: true,
      });

      toast.success(response.data.message);
      setIsAuthenticated(false);
    } catch (error) {
      toast.error("error occured");
      setIsAuthenticated(true);
    }
  };

  return (
    <div className="Hbody">
      <div className="nav-title">
        <h1 id="Header-title">Airlines System</h1>
      </div>

      <div className="nav-lists">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `${
              isActive
                ? " px-2 text-white bg-blue-600 rounded dark:bg-blue-500"
                : "text-black-700"
            }`
          }
        >
          Home
        </NavLink>
        <NavLink
          to="/book"
          className={({ isActive }) =>
            `${
              isActive
                ? "px-5 text-white bg-blue-600 rounded dark:bg-blue-500"
                : "text-black-700"
            }`
          }
        >
          Book
        </NavLink>
        <NavLink
          to="/mytickets"
          className={({ isActive }) =>
            `${
              isActive
                ? "px-2 text-white bg-blue-600 rounded dark:bg-blue-500"
                : "text-black-700"
            }`
          }
        >
          My Ticket
        </NavLink>
        <NavLink
          to="/about"
          className={({ isActive }) =>
            `${
              isActive
                ? "px-2 text-white bg-blue-600 rounded dark:bg-blue-500"
                : "text-black-700"
            }`
          }
        >
          About
        </NavLink>

        <NavLink
          to="/contact"
          className={({ isActive }) =>
            `${
              isActive
                ? "px-2 text-white bg-blue-600 rounded dark:bg-blue-500"
                : "text-black-700"
            }`
          }
        >
          Contact
        </NavLink>

        <NavLink
          to="/myprofile"
          className={({ isActive }) =>
            `${
              isActive
                ? "px-2 text-white bg-blue-600 rounded dark:bg-blue-500"
                : "text-black-700"
            }`
          }
        >
          myprofile
        </NavLink>
        </div>

        {isAuthenticated ? (
       
            <button onClick={logoutHandler} className="login-tag  logout">
              Logout
            </button>
           
        
        ) : (
          <div className=" login-tag">
            <NavLink to="/login">Login/Register</NavLink>
          </div>
        )}
     
    </div>
  );
}

export default Header;
