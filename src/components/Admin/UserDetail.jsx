import React, { useState, useEffect } from "react";
import "./UserDetail.scss";
import axios from "axios";
import {toast} from "react-toastify"


const UserDetail = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get("/api/v1/users/allusers");
      setUsers(response.data.users);
    };
    fetchData();
  }, []);

  const handledelete = (e, index) => {
    e.preventDefault();
    console.log(users[index]._id);

    const response = axios.delete(`/api/v1/users/delete/${users[index]._id}`);

    if (response) {
      toast.success("User deleted successfully");
      setTimeout(() => {
        window.location.reload();
      }, 2500);
    }
  };

  return (
    <div className="userDetail">
      <header>
        <div>Name</div>
        <div>Email</div>
        <div>Phone Number</div>
        <div>Address</div>
        <div>Edit</div>
      </header>

      {users.map((user, index) => (
        <div key={user._id} className="info">
          <h3>{user.name}</h3>
          <h3>{user.email}</h3>
          <h3>{user.phoneNumber}</h3>
          <h3>{user.address}</h3>
          <h3>
            <button onClick={(e) => handledelete(e, index)}>Suspend</button>
          </h3>
        </div>
      ))}
    </div>
  );
};

export default UserDetail;
