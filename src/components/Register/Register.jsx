import React, { useContext, useState } from "react";
import "./Register.scss";
import { NavLink, Navigate } from "react-router-dom";
import {toast} from "react-toastify"

import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handlesignup = async (e) => {
    try {
      e.preventDefault();

      if (!name) return toast.error("Please enter your name!");
      if (!phoneNumber)
        return toast.error("Please provide a valid phone number!");
      if (phoneNumber.length !== 10) {
        return toast.error("Please enter a valid phone number!");
      }

      if (!email) return toast.error("Please enter your email address!");
      if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email))
        return toast.error("Invalid Email Address!");
      else if (!password || password.length < 8)
        return toast.error("Password must be at least 8 characters long.");

      const response = await axios.post(
        "/api/v1/users/new",
        {
          name,
          phoneNumber,
          address,
          email,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      if (response.data.success) {
        toast.success(response.data.message);
        navigate("/login");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);

    }
  };

  return (
    <>
      <div className="registerBody">
        <div className="container">
          <div className="img">
            <h1>New To Here</h1>

            <p>Register to stay connected with us.</p>
          </div>
          <div className="loginForm">
            <form action="">
              <h2>Sign Up</h2>

              <input
                type="text"
                required
                id="name"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />

              <input
                type="number"
                required
                id="number"
                placeholder="Phone Number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />

              <label htmlFor="address"> </label>
              <input
                type="text"
                required
                id="address"
                placeholder="Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />

              <label htmlFor="email"> </label>
              <input
                type="email"
                required
                id="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <label htmlFor="password"> </label>
              <div className="password">
                <input
                  id="password"
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <br />
              <br />
              <button onClick={handlesignup}>Sign Up</button>
              <p>
                Already Registered ? <NavLink to="/login">Log In </NavLink>
              </p>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Register;
