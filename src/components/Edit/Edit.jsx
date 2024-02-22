import React, { useEffect, useState } from "react";
import "./Edit.css";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
function Edit() {
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  
  const [address, setAddress] = useState("");
  const navigate = useNavigate();

  const fetchUserData = async () => {
    const profileResponse = await axios.get("/api/v1/users/me");
    setName(profileResponse.data.user.name)
    setAddress(profileResponse.data.user.address);
    setPhoneNumber(profileResponse.data.user.phoneNumber);
  }

  const handleEdit = async (e) => {
    e.preventDefault();

    if (phoneNumber.length !== 10) {
      return toast.error("Invalid Phone Number");
    }
    

    const response = await axios.post(
      "/api/v1/users/edit",
      {
        name: name,
        phoneNumber: phoneNumber,
        address: address,
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
      setAddress("");
      setName("");
      setPhoneNumber("");
    } else {
      toast.error("Error in Updating Profile");
    }
  };

  useEffect(() => {
    fetchUserData();
  }, [])

  return (
    <div className="editBody">
      <div className="editContainer">
        Name :
        <input
          type="text"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <br />
        Phone Number :
        <input
          type="number"
          name="number"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
        <br />
        Address :
        <input
          type="text"
          name="address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <br />
        <button onClick={handleEdit}>Update Profile</button>
      </div>
    </div>
  );
}

export default Edit;
