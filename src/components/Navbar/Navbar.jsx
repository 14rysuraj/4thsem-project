import { useContext, useState } from "react";
import "./Navbar.css";
import { slide as Menu } from "react-burger-menu";
import { Link, NavLink } from "react-router-dom";
import { context } from "../../main";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const { isAuthenticated, setIsAuthenticated } = useContext(context);
  const [isAdmin, setIsAdmin] = useState(false);

  const navigate = useNavigate();
  const logoutHandler = async () => {
    try {
      const response = await axios.get("/api/v1/users/logout", {
        withCredentials: true,
      });

      toast.success(response.data.message);
      localStorage.removeItem("token");
      setIsAuthenticated(false);
      navigate("/book");
    } catch (error) {
      console.error(error);
      setIsAuthenticated(true);
    }
  };

  return (
    <>
      {!isAdmin ? (
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
      ) : null}
    </>
  );
}

export default Navbar;
