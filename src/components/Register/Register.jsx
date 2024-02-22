import React, { useContext, useState } from "react";
import "./Register.css";
import { NavLink, Navigate } from "react-router-dom";
import { toast } from "react-hot-toast";
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
      if (password.length < 8) {
        return toast.error("Password must be  at least 8 characters long!");
      } else if (password.length > 16) {
        return toast.error("Password cannot exceed 16 characters!");
      }
      if (phoneNumber.length !== 10) { 
        return toast.error("Please enter a valid phone number!");
      }

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
      <div className="register-container">
        <form onSubmit={handlesignup}>
          <h2 className="register-title">Registration</h2>
          <br />
          <br />
          <label htmlFor="username">Name :</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="register-input"
            required
          />

          <label htmlFor="phoneNumber">Phone Number:</label>
          <input
            type="number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className="register-input"
            required
          />

          <label htmlFor="address">Address:</label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="register-input"
            required
          />

          <label htmlFor="email" className="register-input">
            Email Address :
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="register-input"
            required
          />
          <label htmlFor="password" className="register-input">
            Password :
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button className="signup-button">Sign up</button>
          <br />
          <br />
          <p>
            Already Registered ?
            <NavLink to="/login" className="reg-click-here">
              {" "}
              Login
            </NavLink>
          </p>
        </form>
      </div>
    </>
  );
}

export default Register;
