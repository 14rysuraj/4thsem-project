import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { context } from "../../main";
import { NavLink } from "react-router-dom";
import "./Profile.css";

function Profile() {
  const [data, setData] = useState({});
  const { isAuthenticated, setIsAuthenticated } = useContext(context);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get("/api/v1/users/me");

      setData(response.data);
    };

    fetchData();
  }, []);

  console.log(data);

  return (
    <div className="profileBody">
      {isAuthenticated ? (
        <div className="profileContainer">
          <div className="userProfile"></div>

          <div className="infoContainer">
            <p>Name: {data.user ? data.user.name : "Loading..."} </p>
            <p>Phone number : {data.user ? data.user.phoneNumber : ""}</p>
            <p>Address : {data.user ? data.user.address : ""}</p>
            <p>Email: {data.user ? data.user.email : "Loading..."} </p>
            <div className="profileBtn">
              <NavLink className="editbtn" to={"/edit"}>
                Edit Profile
              </NavLink>
            </div>
          </div>
        </div>
      ) : (
        <div className="notProfile">
          <h1 className="loginPleaseMessage">Login Please</h1>
        </div>
      )}
    </div>
  );
}

export default Profile;
