import React, { useContext } from "react";
import "./login.scss";
import Register from "../Register/Register";
import { Link, NavLink } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import {toast} from "react-toastify"

import { adminContext, context } from "../../main";
import { Navigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { BiHide, BiShow } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

function Login() {
  const [cookies, setCookies] = useCookies("token");
  const { isAuthenticated, setIsAuthenticated } = useContext(context);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { isAdminAuthenticated, setIsAdminAuthenticated } =
    useContext(adminContext); //
  const navigate = useNavigate();
  const location = useLocation();

  const handleShowPassword = (e) => {
    e.preventDefault();

    setShowPassword((prev) => !prev);
  };

  const handleLogin = async (e) => {
    try {
      e.preventDefault();
      if (!email) return toast.error("Please enter your email address!");
      if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email))
        return toast.error("Invalid Email Address!");
      if (!password) return toast.error("Please enter your password!");

      const response = await axios.post(
        "/api/v1/users/login",
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
        toast.success("Logged in successfully");
        setCookies("token", response.data.token);
        setIsAuthenticated(true);
        localStorage.setItem("token", response.data.token);
        navigate("/book");
      } else {
        toast.error(response.data.message);
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="loginBody">
        <div className="container">
          <div className="img">
            <h2>Welcome Back</h2>
            <br />
            <p>Sign in to your account.</p>
            <br />
            <p>
              {!isAdminAuthenticated ? (
                <NavLink to="/adminlogin">Login as admin</NavLink>
              ) : (
                <NavLink to="/admin/dashboard">Dashboard</NavLink>
              )}
            </p>
          </div>
          <div className="loginForm">
            <form action="">
              <h2>Log in</h2>
              <label htmlFor="email"> </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                id="email"
                placeholder="Email"
              />

              <label htmlFor="password"> </label>
              <div className="password">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button onClick={handleShowPassword}>
                  {showPassword ? <BiShow /> : <BiHide />}
                </button>
              </div>
              <p>Forget Password ?</p>
              <button onClick={handleLogin}>Log In</button>
              <p>
                Don't have an account ?{" "}
                <NavLink to="/register">Sign up</NavLink>{" "}
              </p>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
