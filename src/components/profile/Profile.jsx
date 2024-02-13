import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { context } from "../../main";
import "./Profile.css"

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

 



  return (


    
    <div className="profileBody">

      {isAuthenticated ? (<div className="profileContainer">
      <h2 className="profileHeading">User Profile</h2>
      
      <p>Name: {data.user ? data.user.name : 'Loading...'} </p>
        <p>Email: {data.user ? data.user.email : 'Loading...'} </p>
        
      </div>) :
        
        <div className="notProfile">


        <h1 className="loginPleaseMessage">Login Please</h1>
      
      
      
      </div>}
    
      
    </div>
  );
}

export default Profile;
