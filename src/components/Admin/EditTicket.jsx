import React, { useState } from "react";
import "./EditTicket.scss";
import axios from "axios";
import {toast} from "react-toastify"

import { useNavigate } from "react-router-dom";

const EditTicket = () => {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [time, setTime] = useState("");
  const [flightNumber, setflightNumber] = useState("air88");
  const navigate = useNavigate();
  const handleAddTicket = (e) => {
    e.preventDefault();
      console.log(from, to, time, flightNumber);
     
      if(!from && !to && !time && !flightNumber) return toast.error("Field is required")

    const response = axios.post("/api/v1/ticket/addTicket", {
      from: from,
      to: to,
      time: time,
      flightNumber: flightNumber,
    });

    if (response) {
      toast.success("Ticket added successfully");

      setFrom("");
      setTo("");
      setTime("");
      setflightNumber("");
    }
  };

  return (
    <div className="addTicketForm">
      <form>
        <input
          type="text"
          placeholder="from"
          value={from}
          onChange={(e) => setFrom(e.target.value)}
        />
        <input
          type="text"
          placeholder="Destination"
          value={to}
          onChange={(e) => setTo(e.target.value)}
        />
        <input
          type="text"
          placeholder="Time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
        />
        <input
          type="text"
          placeholder="flightNumber Number"
          value={flightNumber}
          onChange={(e) => setflightNumber(e.target.value)}
        />
        <button onClick={handleAddTicket}>Save</button>
      </form>
    </div>
  );
};

export default EditTicket;
