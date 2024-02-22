import React, { useContext } from "react";
import "./Login.css";
import Register from "../Register/Register";
import { Link, NavLink } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { context } from "../../main";
import { Navigate } from "react-router-dom";
import { useCookies } from "react-cookie";

function Login() {
  const [cookies, setCookies] = useCookies("token");
  const { isAuthenticated, setIsAuthenticated } = useContext(context);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    try {
      e.preventDefault();
      console.log(email + password);
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
        toast.success(response.data.message);
        setCookies("token", response.data.token);
        setIsAuthenticated(true);
      } else {
        toast.error(response.data.message);
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (isAuthenticated) return <Navigate to={"/"} />;

  return (
    <div className="body">
      <div className="Lcontainer">
        <div className="profile"></div>

        <form onSubmit={handleLogin} className="login">
          <label htmlFor="email">Email:</label>
          <input
            type="text"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <br />

          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <br />

          <p id="forget-password">
            <a
              href="#"
              onClick={() => {
                alert("Pagal hai kya yaad kara kar bhai password ");
              }}
            >
              forget Password?
            </a>
          </p>
          <br />
          <button className="login-btn">Log In</button>
          <br />
          <p id="or">OR</p>
          <br />

          <p id="CA">
            <NavLink to="/register">Create New Account </NavLink>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
