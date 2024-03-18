import React, { useContext, useState } from "react";
import "./Admin.scss";
import { HiBars3BottomLeft } from "react-icons/hi2";
import { IoIosArrowDown } from "react-icons/io";
import { NavLink, Outlet } from "react-router-dom";
import { MdHome } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { BiSolidUserDetail } from "react-icons/bi";
import { HiTicket } from "react-icons/hi2";
import { IoIosLogOut } from "react-icons/io";
import { useCookies } from "react-cookie";
import { adminContext } from "../../main";
import axios from "axios";
import {toast} from "react-toastify"
import { useNavigate } from "react-router-dom";

function Admin() {
  const [cookies, setCookies] = useCookies("admintoken");
  const [show, setShow] = useState(false);
  const { setIsAdminAuthenticated, isAdminAuthenticated } = useContext(adminContext);
  const navigate = useNavigate();

  const handleShowSideBar = (e) => {
    e.preventDefault();
  };

  const showDropDown = (e) => {
    e.preventDefault();
    setShow((prev) => !prev);
    console.log(show);
  };


  const handleLogout = async (e) => {

    try {
      const response = await axios.get("/api/v1/admin/logout", {
        withCredentials: true,
      });

      toast.success(response.data.message);
      localStorage.removeItem("admintoken");
      setIsAdminAuthenticated(false);
      navigate("/login");
      
    } catch (error) {
      toast.error("error occured");
      setIsAdminAuthenticated(true);
    }
  };
    
  

  return (
    <div className="admin">
      <header>
        <div className="one">
          <button onClick={handleShowSideBar}>
            <HiBars3BottomLeft />
          </button>
        </div>
        <div className="two" onClick={showDropDown}>
          <div className="img"></div>
          <p>suraj Chaudhary</p>
          <button>
            <IoIosArrowDown />
          </button>
        </div>

        {show ? (
          <div className="showingBar">
            <button onClick={handleLogout}>
              <IoIosLogOut />
              Log Out
            </button>
          </div>
        ) : (
          ""
        )}
      </header>

      <div className="hero">
        <aside>
          <div className="body">
            <p>Main</p>
            <NavLink to="/admin/dashboard">
              {" "}
              <MdHome />
              Dashboard
            </NavLink>
            <NavLink to="/adminProfile">
              <CgProfile />
              My Profile
            </NavLink>
            <NavLink to="/admin/userdetails">
              <BiSolidUserDetail />
              User Details
            </NavLink>
            <NavLink to="/admin/managetickets">
              <HiTicket />
              Manage Tickets
            </NavLink>
          </div>
        </aside>

        <div className="info">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Admin;
