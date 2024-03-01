import { useContext } from "react";
import "./Navbar.css";
import { slide as Menu } from "react-burger-menu";
import { Link, NavLink } from "react-router-dom";
import { context } from "../../main";
import axios from "axios";
import toast from "react-hot-toast";

function Navbar() {
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
    <Menu>
      <NavLink to="/book" className="menu-item">
        Book
      </NavLink>
      <NavLink to="/mytickets" className="menu-item">
        My Ticket
      </NavLink>
      <NavLink to="/about" className="menu-item">
        About
      </NavLink>

      <NavLink to="/contact" className="menu-item">
        Contact
      </NavLink>

      {isAuthenticated ? (
        <button onClick={logoutHandler} className="menu-item logout">
          Logout
        </button>
      ) : (
        <NavLink to="/login" className="menu-item">
          Login
        </NavLink>
      )}
    </Menu>
  );
}

export default Navbar;
