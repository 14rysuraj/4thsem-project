import axios from "axios";
import React, { useEffect, useState } from "react";

function Profile() {
  const [data, setData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get("/api/v1/users/me");

      setData(response.data);
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2>User Profile</h2>

      
      <p>Name: {data.user ? data.user.name : 'Loading...'} </p>
    </div>
  );
}

export default Profile;
