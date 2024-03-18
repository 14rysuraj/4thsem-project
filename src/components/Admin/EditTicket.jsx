import React, { useState } from "react";
import "./EditTicket.scss";
import axios from "axios";
import {toast} from "react-toastify"

import { useNavigate } from "react-router-dom";

const EditTicket = () => {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [time, setTime] = useState("");
  const [seat, setSeat] = useState("");
  const navigate = useNavigate();
  const handleAddTicket = (e) => {
    e.preventDefault();
      console.log(from, to, time, seat);
     
      if(!from && !to && !time && !seat) return toast.error("Field is required")

    const response = axios.post("/api/v1/ticket/addTicket", {
      from: from,
      to: to,
      time: time,
      seat: seat,
    });

    if (response) {
      toast.success("Ticket added successfully");

      setFrom("");
      setTo("");
      setTime("");
      setSeat("");
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
          placeholder="Seat Number"
          value={seat}
          onChange={(e) => setSeat(e.target.value)}
        />
        <button onClick={handleAddTicket}>Save</button>
      </form>
    </div>
  );
};

export default EditTicket;
