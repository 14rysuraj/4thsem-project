import React, { useContext, useState } from "react";
import "./AdminLogin.scss";
import {toast} from "react-toastify"

import axios from "axios";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { adminContext } from "../../main";

const AdminLogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cookies, setCookies] = useCookies("admintoken");
  const { isAdminAuthenticated, setIsAdminAuthenticated } =
    useContext(adminContext);

  const handleLogin = async (e) => {
    try {
      e.preventDefault();

      if (!email) return toast.error("Please enter your email address!");
      if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email))
        if (!password) return toast.error("Please enter your password!");

      const response = await axios.post(
        "/api/v1/admin/login",
        {
          email,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true, // this is to make the cookie available for cross domain access
        }
      );

      if (response.data.success) {
        toast.success("Logged In Successfully");
        localStorage.setItem("admintoken", response.data.admintoken);

        setIsAdminAuthenticated(true);
      } else {
        toast.error(response.data.message);
        setIsAdminAuthenticated(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  if (isAdminAuthenticated) return navigate("/admin/dashboard");

  return (
    <div className="adminLoginBody">
      <div className="container">
        <h2>Admin Login</h2>
        <form>
          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={handleLogin}>Log In</button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
