import React, { useState, useEffect } from "react";
import "./Dashboard.scss";
import { FaUsers } from "react-icons/fa";
import axios from "axios";
import {toast} from "react-toastify"


const Dashboard = () => {
  const [user, setUser] = useState("");
  const [admin, setAdmin] = useState("");
  const [ticket, setTicket] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get("/api/v1/admin/count");
      setAdmin(response.data.admincount);
      setUser(response.data.usercount);
      setTicket(response.data.searchcount);
    };

    fetchData();
  }, []);

  return (
    <div className="dashboardBody">
      <Card count={user} h2="Total User" />
      <Card count={admin} h2="Total Admin" />
      <Card count={ticket} h2="Total Ticket" />
      <Card />
    </div>
  );
};

export default Dashboard;

const Card = ({ count, h2 }) => {
  return (
    <div className="card">
      <FaUsers />
      <div>
        <h2>{h2}</h2>
        <h2>{count}</h2>
      </div>
    </div>
  );
};
